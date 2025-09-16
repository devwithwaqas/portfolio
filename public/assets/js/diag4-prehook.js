/* diag4-prehook.js — v18
   - DO NOT strip logs until we confirm fix in place.
   - Intercepts: <image href/xlink:href>, Element.setAttribute('href'), <img src>
   - Maps Devicon/simple-icons/CDN -> local /assets/img/Icons/*
   - For <img>: immediate local HTTP swap ONLY (no data: upgrade; avoids CSP puzzles)
   - For SVG <image>: immediate local HTTP swap + async data: upgrade
   - Scans & observes: document, open ShadowRoots, same-origin iframes
   - Guards overlay #hx-bubble-ico-img in all roots with load/error + anti-tamper latch
   - Exposes window.__diag4Status()
*/

(function () {
  'use strict';

  const LOG = '[bubble-ultra:diag4]';
  const XLINK = 'http://www.w3.org/1999/xlink';
  const ICON_DIR = '/assets/img/Icons/';
  const SAFE_FALLBACK = 'web.svg';
  const MAX_CACHE = 128;

  const RE_EXT = /\.(svg|png|jpg|jpeg|gif|webp)$/i;
  const RE_CDN = /devicon|cdn\.jsdelivr|unpkg\.com|raw\.githubusercontent|github\.com\/devicons|simple-icons@/i;

  const cache = new Map();     // file -> dataURL
  const inflight = new Map();  // file -> Promise
  let lastRewrite = null;

  const info = (msg, ...a) => console.log(LOG, msg, ...a);
  const warn = (msg, ...a) => console.warn(LOG, msg, ...a);

  // ==================== MAP (expanded) ====================
  const MAP = {
    // working ones
    azure: 'Azure.svg',
    angular: 'Angular.svg',
    angularjs: 'Angular.svg',
    nginx: 'nginx.svg',
    docker: 'Docker.svg',
    grafana: 'Grafana.svg',
    prometheus: 'Prometheus.svg',
    jquery: 'jquery.svg',
    swagger: 'Swagger.svg',
    sonatype: 'sonatype.svg',

    // NET family & DB
    net: 'NET core.svg',
    netcore: 'NET core.svg',
    dotnet: 'NET core.svg',
    dotnetcore: 'NET core.svg',
    mssql: 'sql server.svg',
    sqlserver: 'sql server.svg',
    microsoftsqlserver: 'sql server.svg',
    linq2sql: 'linq2sql.svg',

    // data + infra
    redis: 'Redis.svg',
    mongodb: 'MongoDB.svg',
    mysql: 'MySQL.svg',
    postgres: 'PostgresSQL.svg',
    postgresql: 'PostgresSQL.svg',
    kubernetes: 'kubernetes.svg',
    ingress: 'ingress.svg',
    nexus: 'nexus.svg',

    // build/devops
    azuredevops: 'Azure Devops.svg',
    ci: 'CI CD.svg',
    cicd: 'CI CD.svg',
    bootstrap: 'bootstrap.svg',
    primeng: 'primeng.svg',
    openapi: 'OpenAPI.svg',

    // extras
    openshift: 'openshift1.png',
    openshiftgateway: 'openshift gateway.png',
    entityframework: 'linq2sql.svg',

    // generic API
    api: 'api.svg',
    apigateway: 'api gateway.svg',
    webapi: 'web api.svg',
    'mongodb-original': 'MongoDB.svg'
  };

  const openRoots = new Set(); // Document / ShadowRoots / iframe docs we’re watching

  function norm(s){return (s||'').toLowerCase().replace(/[^a-z0-9]+/g,'');}

  function pickLocalFromUrl(uStr) {
    try {
      const u = new URL(uStr, location.href);
      const last = (u.pathname.split('/').pop() || '').toLowerCase();
      const base = last.replace(RE_EXT, '');

      const tries = [
        base,
        base.replace(/-original(-wordmark)?$/,''),
        base.replace(/-plain(-wordmark)?$/,''),
        base.replace(/-line(-wordmark)?$/,''),
        base.replace(/-wordmark$/,''),
        base.split('-')[0]
      ];

      for (const t of tries) {
        const k = norm(t);
        if (MAP[k]) return MAP[k];
      }

      const hostKey = norm(u.hostname.split('.')[0]);
      if (MAP[hostKey]) return MAP[hostKey];

    } catch {}
    return SAFE_FALLBACK;
  }

  function httpUrl(file){ return new URL(ICON_DIR + file, location.href).href; }

  function fetchAsDataURL(file) {
    if (cache.has(file)) return Promise.resolve(cache.get(file));
    if (inflight.has(file)) return inflight.get(file);

    const url = httpUrl(file);
    const ext = (file.split('.').pop() || '').toLowerCase();

    const p = (ext === 'svg'
      ? fetch(url, {cache:'no-store'}).then(r => { if(!r.ok) throw new Error('HTTP '+r.status); return r.text(); })
          .then(txt => {
            const clean = txt.replace(/<\?xml[^>]*\?>/i,'').trim();
            const data = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(clean);
            if (cache.size >= MAX_CACHE) cache.clear();
            cache.set(file, data);
            return data;
          })
      : fetch(url, {cache:'no-store'}).then(r => { if(!r.ok) throw new Error('HTTP '+r.status); return r.blob(); })
          .then(blob => new Promise((res,rej)=>{
            const fr = new FileReader(); fr.onload=()=>res(fr.result); fr.onerror=rej; fr.readAsDataURL(blob);
          })).then(data => { if (cache.size >= MAX_CACHE) cache.clear(); cache.set(file, data); return data; })
    );

    inflight.set(file, p);
    return p.finally(()=>inflight.delete(file));
  }

  // ---- attribute helpers
  const Orig_setAttributeNS = (window.SVGImageElement && SVGImageElement.prototype.setAttributeNS) || null;
  const Orig_setAttribute = Element.prototype.setAttribute;
  const ImgSrcDesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');

  function setHrefAll(img, value) {
    try { Orig_setAttributeNS && Orig_setAttributeNS.call(img, null, 'href', value); } catch {}
    try { Orig_setAttributeNS && Orig_setAttributeNS.call(img, XLINK, 'href', value); } catch {}
    try { img.setAttribute('href', value); } catch {}
    try { img.setAttributeNS(XLINK, 'xlink:href', value); } catch {}
    if (img.href && typeof img.href.baseVal === 'string') { try { img.href.baseVal = value; } catch {} }
  }
  function getHref(img) {
    return img.getAttribute('href')
        || img.getAttributeNS(XLINK,'href')
        || img.getAttributeNS(XLINK,'xlink:href')
        || (img.href && img.href.baseVal) || null;
  }

  function forceVisible(el) {
    if (!el) return;
    try { el.removeAttribute('display'); } catch {}
    el.style.display = 'block';
    el.style.visibility = 'visible';
    el.style.opacity = '1';
    el.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    if (!el.getAttribute('width'))  el.setAttribute('width', '90');
    if (!el.getAttribute('height')) el.setAttribute('height', '90');
    const svg = el.closest && el.closest('svg');
    if (svg) {
      svg.style.display = 'block';
      svg.style.visibility = 'visible';
      svg.style.opacity = '1';
      svg.removeAttribute('hidden');
      svg.style.pointerEvents = 'none';
    }
  }

  // record last-good per element
  function setLastGood(el, val) { try { el.dataset.lastGoodHref = val; } catch {} }
  function getLastGood(el) { return (el && el.dataset && el.dataset.lastGoodHref) || null; }

  // guards for normal <img>
  function attachImgGuards(img, preferredFile) {
    if (!img || img.__diag4ImgGuarded) return;
    img.__diag4ImgGuarded = true;

    img.addEventListener('load', () => {
      try { setLastGood(img, img.currentSrc || img.src || ''); } catch {}
      info('img-load-ok', { src: img.currentSrc || img.src });
      img.style.visibility = 'visible';
      img.style.opacity = '1';
    }, { passive: true });

    img.addEventListener('error', () => {
      warn('img-load-error', { src: img.src, preferredFile });
      // Try hard fallback to SAFE_FALLBACK local HTTP (not data:)
      const http = httpUrl(SAFE_FALLBACK);
      try { ImgSrcDesc.set.call(img, http); } catch {}
      setLastGood(img, http);
      img.style.visibility = 'visible';
      img.style.opacity = '1';
    }, { passive: true });
  }

  // Guard flag
  const FLAG = Symbol('diag4-setting');

  function handleSwap(el, incomingUrl, via) {
    const localFile = pickLocalFromUrl(incomingUrl);
    const localHttp = httpUrl(localFile);

    lastRewrite = { ts: new Date().toISOString(), via, from: incomingUrl, localFile, localHttp, toData: null };
    info('trap-rewrite — FROM=', incomingUrl, ' TO(LOCAL)=', localHttp, ' VIA=', via);

    // Async upgrade: ONLY for SVG <image>
    if (el instanceof SVGImageElement) {
      fetchAsDataURL(localFile).then(dataUrl => {
        lastRewrite.toData = (dataUrl || '').slice(0, 64) + '…';
        info('upgrade-to-dataurl —', localFile);
        setHrefAll(el, dataUrl);
        setLastGood(el, dataUrl);
        forceVisible(el);
      }).catch(err => {
        warn('dataurl-upgrade-failed', localFile, String(err));
      });
    }

    // Immediate local set
    if (el instanceof SVGImageElement) {
      setHrefAll(el, localHttp);
      setLastGood(el, localHttp);
      forceVisible(el);
      if (el.id === 'hx-bubble-ico-img') attachOverlayGuards(el, localFile);
    } else if (el instanceof HTMLImageElement) {
      // For <img>: keep local HTTP (NO data: upgrade -> avoids CSP puzzle)
      try { ImgSrcDesc.set.call(el, localHttp); } catch {}
      setLastGood(el, localHttp);
      el.style.visibility = 'visible';
      el.style.opacity = '1';
      attachImgGuards(el, localFile);
    }

    return localHttp;
  }

  // ========== Interceptors ==========
  if (Orig_setAttributeNS) {
    SVGImageElement.prototype.setAttributeNS = function(ns, name, value) {
      const isHref = name === 'href' || name === 'xlink:href';
      if (!isHref || !value || this[FLAG]) {
        return Orig_setAttributeNS.call(this, ns, name, value);
      }
      try {
        if (RE_CDN.test(String(value))) {
          info('setAttributeNS(href) — incoming=', value, '\nTAG:', this.outerHTML, '\nHREF:', this.getAttribute('href') || '(none)', '\nSTACK:\n', new Error().stack);
          this[FLAG] = true;
          handleSwap(this, String(value), 'setAttributeNS');
          this[FLAG] = false;
          return;
        }
      } catch (e) { warn('intercept-error(setAttributeNS)', e); }
      return Orig_setAttributeNS.call(this, ns, name, value);
    };
  }

  Element.prototype.setAttribute = function(name, value) {
    if (name === 'href' && value && this instanceof SVGImageElement && !this[FLAG]) {
      try {
        if (RE_CDN.test(String(value))) {
          info('setAttribute(href) — incoming=', value);
          this[FLAG] = true;
          handleSwap(this, String(value), 'setAttribute');
          this[FLAG] = false;
          return;
        }
      } catch (e) { warn('intercept-error(setAttribute)', e); }
    }
    return Orig_setAttribute.call(this, name, value);
  };

  if (ImgSrcDesc && ImgSrcDesc.set) {
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
      configurable: true,
      enumerable: ImgSrcDesc.enumerable,
      get: ImgSrcDesc.get,
      set: function(v) {
        if (!this[FLAG] && typeof v === 'string' && RE_CDN.test(v)) {
          info('img.src — incoming=', v);
          this[FLAG] = true;
          try { handleSwap(this, v, 'img.src'); } finally { this[FLAG] = false; }
          return;
        }
        return ImgSrcDesc.set.call(this, v);
      }
    });
  }

  // ========== Overlay guards (SVG <image id="hx-bubble-ico-img">) ==========
  function attachOverlayGuards(el, preferredFile) {
    if (!el || el.__diag4OverlayGuarded) return;
    el.__diag4OverlayGuarded = true;

    el.addEventListener('load', () => {
      const h = getHref(el);
      setLastGood(el, h || '');
      info('overlay-load-ok', { href: h });
    }, { passive: true });

    el.addEventListener('error', () => {
      warn('overlay-load-error', { href: getHref(el), preferredFile });
      fetchAsDataURL(SAFE_FALLBACK).then(data => {
        setHrefAll(el, data);
        setLastGood(el, data);
        forceVisible(el);
        info('overlay-fallback-applied', { file: SAFE_FALLBACK });
      }).catch(err => warn('fallback-dataurl-failed', String(err)));
    }, { passive: true });

    // Anti-tamper
    const mo = new MutationObserver(() => {
      const hrefNow = getHref(el) || '';
      if (!hrefNow || RE_CDN.test(hrefNow)) {
        const best = getLastGood(el);
        if (best) {
          info('overlay-restore', { from: hrefNow, to: best });
          setHrefAll(el, best);
          forceVisible(el);
        }
      }
    });
    mo.observe(el, { attributes: true, attributeFilter: ['href', 'xlink:href'] });
  }

  function findOverlaysInRoot(root) {
    const list = [];
    try {
      const q = root.querySelectorAll ? root.querySelectorAll('#hx-bubble-ico-img') : [];
      q.forEach(el => { if (el instanceof SVGImageElement) list.push(el); });
    } catch {}
    return list;
  }

  function latchAllOverlays() {
    const overlays = [];
    openRoots.forEach(root => {
      const found = findOverlaysInRoot(root);
      found.forEach(el => {
        forceVisible(el);
        attachOverlayGuards(el, null);
        overlays.push({
          where: root === document ? 'document' :
                 (root && root.host ? `shadow#${root.host.tagName || 'host'}` : 'unknown'),
          href: getHref(el),
          lastGood: getLastGood(el)
        });
      });
    });
    return overlays;
  }

  // ========== Boot-scan & observers across roots ==========
  function rewriteNode(root) {
    if (!root || !root.querySelectorAll) return 0;
    let count = 0;

    // <img>
    root.querySelectorAll('img').forEach(img => {
      try {
        const src = img.getAttribute('src') || '';
        if (RE_CDN.test(src)) {
          count++; handleSwap(img, src, 'boot-scan(img)');
        } else {
          attachImgGuards(img, null);
        }
      } catch(e){}
    });

    // SVG <image>
    root.querySelectorAll('image').forEach(im => {
      try {
        const href = getHref(im) || '';
        if (RE_CDN.test(href)) {
          count++; handleSwap(im, href, 'boot-scan(image)');
        }
        if (im.id === 'hx-bubble-ico-img') attachOverlayGuards(im, null);
      } catch(e){}
    });

    return count;
  }

  function observeRoot(root, label) {
    if (!root || root.__diag4Observed) return;
    root.__diag4Observed = true;
    openRoots.add(root);

    const rewritten = rewriteNode(root);
    info('boot-scan complete', { rewritten, node: label });

    const mo = new MutationObserver(muts => {
      for (const m of muts) {
        if (m.type === 'childList') {
          m.addedNodes && m.addedNodes.forEach(n => {
            if (n.nodeType === 1) { // ELEMENT_NODE
              if (n.querySelectorAll) rewriteNode(n);
              // direct element may be <img> or <image>
              if (n instanceof HTMLImageElement) {
                const s = n.getAttribute('src') || '';
                if (RE_CDN.test(s)) handleSwap(n, s, 'observer(img)');
                else attachImgGuards(n, null);
              } else if (n instanceof SVGImageElement) {
                const h = getHref(n) || '';
                if (RE_CDN.test(h)) handleSwap(n, h, 'observer(image)');
                if (n.id === 'hx-bubble-ico-img') attachOverlayGuards(n, null);
              }
            }
          });
        } else if (m.type === 'attributes') {
          const t = m.target;
          if (t instanceof HTMLImageElement && m.attributeName === 'src') {
            const s = t.getAttribute('src') || '';
            if (RE_CDN.test(s)) handleSwap(t, s, 'attr(img.src)');
          } else if (t instanceof SVGImageElement && (m.attributeName === 'href' || m.attributeName === 'xlink:href')) {
            const h = getHref(t) || '';
            if (RE_CDN.test(h)) handleSwap(t, h, 'attr(image.href)');
          }
        }
      }
    });

    mo.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'href', 'xlink:href']
    });

    info('observer-installed', { root: label });
  }

  // Patch attachShadow to watch open shadows
  const Orig_attachShadow = Element.prototype.attachShadow;
  Element.prototype.attachShadow = function(init) {
    const sr = Orig_attachShadow.call(this, init);
    // only open roots are observable
    const label = `shadow#${this.tagName || 'host'}`;
    if (init && init.mode === 'open') {
      setTimeout(() => { observeRoot(sr, label); info('installed', { ts: new Date().toISOString(), where: 'shadow-attach' }); }, 0);
    }
    return sr;
  };

  // watch same-origin iframes
  function hookIframes(rootDoc) {
    try {
      const ifr = rootDoc.querySelectorAll('iframe');
      ifr.forEach(f => {
        try {
          const doc = f.contentDocument;
          if (doc) observeRoot(doc, 'iframe-document');
        } catch {}
      });
    } catch {}
  }

  // Kickoff on top document
  observeRoot(document, 'document');
  hookIframes(document);
  info('installed', { ts: new Date().toISOString(), where: 'top-document' });

  // Periodically try to latch overlays (e.g., created late). Limited attempts.
  let tries = 0;
  const iv = setInterval(() => {
    tries++;
    const overlays = latchAllOverlays();
    info('overlay-scan', { overlays: overlays.length });
    if (tries > 40) clearInterval(iv);
  }, 300);

  // Global observer to catch late iframes and extra roots
  new MutationObserver(() => {
    hookIframes(document);
    latchAllOverlays();
  }).observe(document.documentElement, { childList: true, subtree: true });

  // debug helper
  window.__diag4Status = function() {
    const overlays = [];
    openRoots.forEach(root => {
      findOverlaysInRoot(root).forEach(el => {
        overlays.push({
          where: root === document ? 'document' :
                 (root && root.host ? `shadow#${root.host.tagName || 'host'}` : 'unknown'),
          href: getHref(el),
          lastGood: getLastGood(el)
        });
      });
    });
    return {
      lastRewrite,
      cacheSize: cache.size,
      inflight: Array.from(inflight.keys()),
      overlays
    };
  };

})();
