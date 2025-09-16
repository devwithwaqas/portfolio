/* __HX ICON ENGINE GLOBAL GUARD PRELUDE__ */
(function(){
  try{
    // Force older engines (v5/v6) to no-op if they are present later in the file
    // We want v7 (or the latest block) to be the only one that runs.
    window.__hxIconEngineV5 = true;
    window.__hxIconEngineV6 = true;
  }catch(e){}
})();
// hx-inline.js — concatenated from inline <script> blocks of hx-SUPERFINAL-DIAG3.html




/* ===== [INLINE SCRIPT INDEX 4] ===== */
document.addEventListener('DOMContentLoaded', function () {
                          const swiper = new Swiper('#gallery-swiper', {
                            loop: true,
                            speed: 1500,
                            autoplay: {
                              delay: 3500,
                              disableOnInteraction: false,
                              pauseOnMouseEnter: true,
                              waitForTransition: true,
                            },
                            slidesPerView: 1,
                            spaceBetween: 0,
                            effect: 'creative',
                            creativeEffect: {
                              prev: {
                                shadow: true,
                                translate: ['-120%', 0, -500],
                                rotate: [0, 0, -15],
                                opacity: 0,
                              },
                              next: {
                                shadow: true,
                                translate: ['120%', 0, -500],
                                rotate: [0, 0, 15],
                                opacity: 0,
                              },
                            },
                            navigation: {
                              nextEl: '.swiper-button-next',
                              prevEl: '.swiper-button-prev',
                            },
                            pagination: {
                              el: '.swiper-pagination',
                              type: 'progressbar',
                              clickable: true,
                            },
                            on: {
                              init: function () {
                                console.log('Swiper initialized with awesome effects!');
                                this.autoplay.start();
                              },
                              slideChange: function () {
                                console.log('Slide changed to:', this.realIndex);
                                // Add awesome active slide styling
                                const activeSlide = this.slides[this.activeIndex];
                                const allSlides = this.slides;

                                allSlides.forEach(slide => {
                                  const container = slide.querySelector('.slide-container');
                                  if (container) {
                                    container.style.transform = 'scale(0.85) rotateY(0deg)';
                                    container.style.filter = 'brightness(0.6) blur(1px)';
                                    container.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                                  }
                                });

                                if (activeSlide) {
                                  const activeContainer = activeSlide.querySelector('.slide-container');
                                  if (activeContainer) {
                                    activeContainer.style.transform = 'scale(1.05) rotateY(0deg)';
                                    activeContainer.style.filter = 'brightness(1.1) blur(0px)';
                                    activeContainer.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.5)';
                                  }
                                }
                              }
                            }
                          });
                        });

/* ===== [INLINE SCRIPT INDEX 5] ===== */
(function () {
                    // ===== Diagram Narrator Pro v2 (nodes + flows) =====
                    (function () {
                      var stage = document.getElementById('hx-static-stage');
                      var obj = document.getElementById('hx-svg-obj');
                      var inline = document.getElementById('hx-svg-inline');
                      var synth = window.speechSynthesis;
                      var isFile = location.protocol === 'file:';
                      var svgEl = null;
                      var pzInst = window.pz || null;

                      // devicon (optional)
                      (function () { if (!document.querySelector('link[href*="devicon.min.css"]')) { var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://cdn.jsdelivr.net/npm/devicon@2.15.1/devicon.min.css'; l.crossOrigin = 'anonymous'; document.head.appendChild(l); } })();
                      (function () { var css = '\n.hx-focus, .hx-narrate-focus{ outline:3px solid #f59e0b; outline-offset:2px; stroke:#f59e0b!important; stroke-width:3!important; filter:drop-shadow(0 0 6px rgba(245,158,11,.6)); }\n.hx-flow{ stroke:#22c55e!important; stroke-width:3!important; fill:none!important; }\n.hx-flow-anim{ stroke-dasharray:6 6; animation:hx-dash 1.2s linear infinite; }\n@keyframes hx-dash{ to{ stroke-dashoffset:-12; } }\n#hx-devicon-badge{ position:absolute; z-index:120; display:none; pointer-events:none; background:#0f172a; color:#fff; border-radius:10px; padding:8px 10px; box-shadow:0 8px 24px rgba(0,0,0,.25); font:600 12px/1.3 ui-sans-serif,system-ui; align-items:center; gap:8px; }\n#hx-devicon-badge .ico{ font-size:20px; display:inline-flex; width:20px; height:20px; align-items:center; justify-content:center; }\n#hx-devicon-badge .title{ font-size:12px; opacity:.95; }\n#hx-devicon-badge .desc{ font-weight:500; font-size:11px; opacity:.85; margin-top:2px; max-width:240px; }\n'; var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); })();

                      // Ensure Iconify loader (for simple-icons/tabler/etc.)
                      (function () { if (!document.querySelector('script[src*="iconify-icon"]')) { var sc = document.createElement('script'); sc.src = 'https://cdn.jsdelivr.net/npm/iconify-icon@2.1.0/dist/iconify-icon.min.js'; sc.defer = true; document.head.appendChild(sc); } })();

                      function getSvgInline() { try { return inline ? inline.querySelector('svg') : null; } catch (_) { return null; } }
                      function getSvgFromObject() { try { var d = obj && obj.contentDocument; return d ? d.querySelector('svg') : null; } catch (_) { return null; } }
                      function resolveSvg() { return getSvgInline() || getSvgFromObject(); }
                      // Inject highlight styles inside embedded SVG (for <object> documents)
                      function ensureSvgStyles(svg) {
                        try {
                          if (!svg) return;
                          var doc = svg.ownerDocument || (svg.getRootNode && svg.getRootNode()) || null;
                          if (!doc) return;
                          if (doc.querySelector && doc.querySelector('style[data-hx]')) return;
                          var css = '.hx-focus,.hx-narrate-focus{outline:3px solid #f59e0b;outline-offset:2px;stroke:#f59e0b!important;stroke-width:3!important;filter:drop-shadow(0 0 6px rgba(245,158,11,.6));}'
                            + '.hx-flow{stroke:#22c55e!important;stroke-width:3!important;fill:none!important;}'
                            + '.hx-flow-anim{stroke-dasharray:6 6;animation:hx-dash 1.2s linear infinite;}'
                            + '@keyframes hx-dash{to{stroke-dashoffset:-12;}}';
                          var st = (doc.createElement ? doc.createElement('style') : document.createElement('style'));
                          st.setAttribute('data-hx', '1');
                          st.textContent = css;
                          if (doc.head && doc.head.appendChild) { doc.head.appendChild(st); }
                          else if (svg.insertBefore) { svg.insertBefore(st, svg.firstChild); }
                        } catch (_) { }
                      }

                      var badge = (function () { var el = document.createElement('div'); el.id = 'hx-devicon-badge'; el.innerHTML = '<div class="ico" id="hx-badge-ico">🧩</div><div><div class="title" id="hx-badge-title"></div><div class="desc" id="hx-badge-desc"></div></div>'; stage.appendChild(el); return el; })();
                      var focusRect = (function () { var el = document.createElement('div'); el.id = 'hx-focus-rect'; el.style.cssText = 'position:absolute;z-index:110;display:none;pointer-events:none;border:3px solid #f59e0b;box-shadow:0 0 0 4px rgba(245,158,11,.25),0 0 16px rgba(245,158,11,.45);border-radius:8px;'; stage.appendChild(el); return el; })();
                      var bIco = badge.querySelector('#hx-badge-ico'), bTit = badge.querySelector('#hx-badge-title'), bDesc = badge.querySelector('#hx-badge-desc');
                      var _badgeTargetEl = null;
                      function showBadge(x, y, ico, title, desc) {
                        try {
                          var key = (title || '') + ' ' + (desc || '');
                          key = key.trim();

                          var ICON_BASE = 'assets/img/icons/';
                          var MAP = [
                            { rx: [/\.net(?:\s*core)?/i, /web\s*api/i, /\bapi\b/i], file: 'dotnetcore.svg' },
                            { rx: [/angular/i], file: 'angular.svg' },
                            { rx: [/openshift/i], file: 'openshift.svg' },
                            { rx: [/grafana/i], file: 'grafana.svg' },
                            { rx: [/prometheus/i], file: 'prometheus.svg' },
                            { rx: [/\bnexus\b/i], file: 'nexus.svg' },
                            { rx: [/\bsql\b/i, /sql\s*server/i, /database/i], file: 'azuresqldatabase.svg' },
                            { rx: [/\bredis\b/i], file: 'redis.svg' },
                            { rx: [/\bdocker\b/i], file: 'docker.svg' },
                            { rx: [/ci\/cd/i, /pipeline/i], file: 'cicd.svg' },
                            { rx: [/swagger/i], file: 'swagger.svg' },
                            { rx: [/\bn[\-\s]?unit\b/i], file: 'NUnit.svg' },
                            { rx: [/\bmvc\b/i, /entity\s*framework/i, /\bframework\b/i], file: 'framework.svg' },
                            { rx: [/background\s*jobs?/i, /\bjobs?\b/i], file: 'background-jobs.svg' },
                            { rx: [/integration/i, /gateway/i], file: 'integration-gateway.svg' },
                            { rx: [/security/i, /compliance/i], file: 'security.svg' }
                          ];
                          var GENERIC = ICON_BASE + 'framework.svg';
                          var EMOJI = '🧭';

                          function tokenize(s) {
                            var t = (s || '').toLowerCase().match(/[a-z0-9+.-]+/g) || [];
                            t.sort(function (a, b) { return b.length - a.length; });
                            return t.map(function (w) {
                              return w.replace(/^\.net$/, 'dotnet')
                                .replace(/^netcore$/, 'dotnetcore')
                                .replace(/^webapi$/, 'dotnetcore')
                                .replace(/^ci$/, 'cicd');
                            });
                          }
                          function mappedCandidate(s) {
                            for (var i = 0; i < MAP.length; i++) {
                              var m = MAP[i];
                              for (var j = 0; j < m.rx.length; j++) {
                                if (m.rx[j].test(s)) return ICON_BASE + m.file;
                              }
                            }
                            return null;
                          }
                          function buildCandidates(s) {
                            var c = [];
                            var m = mappedCandidate(s);
                            if (m) c.push(m);
                            var toks = tokenize(s);
                            for (var i = 0; i < toks.length; i++) {
                              var t = toks[i];
                              c.push(ICON_BASE + t + '.svg');
                              c.push(ICON_BASE + t + '.png');
                            }
                            c.push(GENERIC);
                            var out = [], seen = {};
                            for (var k = 0; k < c.length; k++) { var v = c[k]; if (!seen[v]) { seen[v] = 1; out.push(v); } }
                            return out;
                          }

                          // Set icon and text
                          bIco.innerHTML = '';
                          var img = document.createElement('img');
                          img.width = 28; img.height = 28; img.alt = (key || '') + ' icon';
                          var seq = buildCandidates(key);
                          console.log('[bubble-icon] key=', key, '→', seq[0] || 'emoji');
                          var idx = 0;
                          function next() {
                            if (idx >= seq.length) {
                              // devicon fallback only if devicon css exists
                              if (document.querySelector('link[href*="devicon"]') || document.querySelector('link[href*="devicon.min.css"]')) {
                                var toks = tokenize(key);
                                var pref = toks[0] || 'code';
                                var cls = 'devicon-' + pref + '-plain colored';
                                bIco.innerHTML = '<i class="' + cls + '"></i>';
                                console.log('[bubble-icon] key=', key, '→', cls);
                              } else {
                                bIco.textContent = EMOJI;
                              }
                              return;
                            }
                            var href = seq[idx++];
                            img.onerror = function () { console.warn('[bubble-icon] load fail', href, '→ fallback'); next(); };
                            img.onload = function () { /* ok */ };
                            img.src = href;
                          }
                          next();
                          bIco.appendChild(img);
                          bTit.textContent = title || '';
                          bDesc.textContent = desc || '';

                          badge.style.display = 'flex';

                          // Clamp to stage
                          var r = stage.getBoundingClientRect();
                          var bb = badge.getBoundingClientRect();
                          var bw = bb.width || 320;
                          var bh = bb.height || 84;
                          var margin = 12;

                          var lx = x - r.left + margin;
                          var ly = y - r.top + margin;

                          if (lx + bw > r.width) lx = x - r.left - bw - margin;
                          if (lx + bw > r.width - margin) lx = r.width - bw - margin;
                          if (lx < margin) lx = margin;

                          if (ly + bh > r.height) ly = y - r.top - bh - margin;
                          if (ly + bh > r.height - margin) ly = r.height - bh - margin;
                          if (ly < margin) ly = margin;

                          badge.style.left = lx + 'px';
                          badge.style.top = ly + 'px';
                        } catch (e) {
                          bIco.textContent = '🧭';
                          bTit.textContent = title || '';
                          bDesc.textContent = desc || '';
                          badge.style.display = 'flex';
                        }
                      }
                      function setBadgeTarget(el) { _badgeTargetEl = el || null; }
                      function repositionBadge() {
                        if (badge.style.display === 'none') return;
                        try {
                          var icoHTML = bIco.innerHTML || bIco.textContent || '';
                          var t = bTit.textContent || '';
                          var d = bDesc.textContent || '';
                          var anchorX = 0, anchorY = 0;
                          if (_badgeTargetEl && typeof _badgeTargetEl.getBBox === 'function') {
                            try {
                              var b = _badgeTargetEl.getBBox();
                              var m = _badgeTargetEl.getScreenCTM && _badgeTargetEl.getScreenCTM();
                              if (m) { anchorX = (b.x + b.width / 2) * m.a + m.e; anchorY = (b.y + b.height / 2) * m.d + m.f; }
                            } catch (_) { }
                          }
                          if (!(anchorX || anchorY) && _badgeTargetEl && typeof centerPointFor === 'function') {
                            var c = centerPointFor(_badgeTargetEl);
                            anchorX = c.x; anchorY = c.y;
                          }
                          showBadge(anchorX, anchorY, icoHTML, t, d);
                        } catch (_) { }
                      }
                      function hideBadge() { badge.style.display = 'none'; }
                      // SVG-native overlay that follows pan/zoom automatically
                      function ensureSvgOverlay() {
                        try {
                          if (!svgEl) return null;
                          var viewport = svgEl.querySelector('.svg-pan-zoom_viewport') || svgEl;
                          var overlay = viewport.querySelector('#hx-overlay-layer');
                          if (!overlay) {
                            overlay = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                            overlay.setAttribute('id', 'hx-overlay-layer');
                            overlay.setAttribute('pointer-events', 'none');
                            viewport.appendChild(overlay);
                          }
                          var rect = overlay.querySelector('#hx-focus-rect-svg');
                          if (!rect) {
                            rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                            rect.setAttribute('id', 'hx-focus-rect-svg');
                            rect.setAttribute('fill', 'none');
                            rect.setAttribute('stroke', '#f59e0b');
                            rect.setAttribute('stroke-width', '3');
                            rect.setAttribute('rx', '8');
                            rect.setAttribute('ry', '8');
                            rect.setAttribute('style', 'vector-effect:non-scaling-stroke;filter:drop-shadow(0 0 6px rgba(245,158,11,0.6))');
                            overlay.appendChild(rect);
                          }
                          return rect;
                        } catch (_) { return null; }
                      }
                      // Convert screen (client) point to SVG coordinates
                      function screenToSvgPoint(sx, sy) {
                        try {
                          if (!svgEl) return null;
                          var pt = (svgEl.createSVGPoint ? svgEl.createSVGPoint() : { x: 0, y: 0 });
                          pt.x = sx; pt.y = sy;
                          var m = svgEl.getScreenCTM && svgEl.getScreenCTM();
                          if (m && m.inverse) { var p = pt.matrixTransform(m.inverse()); return { x: p.x, y: p.y }; }
                          return null;
                        } catch (_) { return null; }
                      }
                      // Stage viewport rectangle in screen coords
                      function getStageRect() {
                        try { return stage.getBoundingClientRect(); } catch (_) { return { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight, width: window.innerWidth, height: window.innerHeight }; }
                      }
                      // Compute bubble top-left screen position with flip and clamp using a safe margin
                      function computeClampedPosition(anchorX, anchorY, wScreen, hScreen, stageRect, safe) {
                        safe = Math.max(0, safe || 200);
                        var rightBound = stageRect.right - safe;
                        var leftBound = stageRect.left + safe;
                        var bottomBound = stageRect.bottom - safe;
                        var topBound = stageRect.top + safe;
                        // Default position to the right and below anchor
                        var left = anchorX + 12;
                        var top = anchorY + 12;
                        // Flip horizontally if it would clip at right bound
                        if (left + wScreen > rightBound) { left = anchorX - wScreen - 12; }
                        // Flip vertically if it would clip at bottom bound
                        if (top + hScreen > bottomBound) { top = anchorY - hScreen - 12; }
                        // Final clamp inside bounds
                        left = Math.min(Math.max(left, leftBound), rightBound - wScreen);
                        top = Math.min(Math.max(top, topBound), bottomBound - hScreen);
                        return { left: left, top: top };
                      }
                      // Ensure SVG-native narration bubble elements exist in the overlay
                      function ensureSvgBubble() {
                        try {
                          if (!svgEl) return null;
                          var viewport = svgEl.querySelector('.svg-pan-zoom_viewport') || svgEl;
                          var overlay = viewport.querySelector('#hx-overlay-layer');
                          if (!overlay) { overlay = document.createElementNS('http://www.w3.org/2000/svg', 'g'); overlay.setAttribute('id', 'hx-overlay-layer'); overlay.setAttribute('pointer-events', 'none'); viewport.appendChild(overlay); }
                          var g = overlay.querySelector('#hx-bubble');
                          if (!g) {
                            g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                            g.setAttribute('id', 'hx-bubble');
                            g.setAttribute('style', 'display:none');
                            g.setAttribute('pointer-events', 'none');
                            var bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                            bg.setAttribute('id', 'hx-bubble-bg');
                            bg.setAttribute('rx', '16'); bg.setAttribute('ry', '16');
                            bg.setAttribute('fill', '#0f172a');
                            bg.setAttribute('stroke', '#a855f7');
                            bg.setAttribute('stroke-width', '10');
                            bg.setAttribute('style', 'vector-effect:non-scaling-stroke;filter:drop-shadow(0 0 28px rgba(168,85,247,0.9)) drop-shadow(0 0 56px rgba(168,85,247,0.5))');
                            var icoWrap = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                            icoWrap.setAttribute('id', 'hx-bubble-ico-wrap');
                            var ico = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                            ico.setAttribute('id', 'hx-bubble-ico');
                            ico.setAttribute('fill', '#ffffff'); ico.setAttribute('font-size', '90'); ico.setAttribute('font-weight', '700');
                            var icoImg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                            icoImg.setAttribute('id', 'hx-bubble-ico-img');
                            icoImg.setAttribute('width', '90'); icoImg.setAttribute('height', '90');
                            var icoFo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
                            icoFo.setAttribute('id', 'hx-bubble-ico-fo');
                            icoFo.setAttribute('width', '90'); icoFo.setAttribute('height', '90');
                            var bodyFo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
                            bodyFo.setAttribute('id', 'hx-bubble-body-fo');
                            bodyFo.setAttribute('width', '200'); bodyFo.setAttribute('height', '200');
                            var tip = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                            tip.setAttribute('id', 'hx-bubble-tip');
                            tip.setAttribute('fill', '#0f172a'); tip.setAttribute('stroke', '#a855f7'); tip.setAttribute('stroke-width', '10');
                            tip.setAttribute('style', 'vector-effect:non-scaling-stroke;filter:drop-shadow(0 0 28px rgba(168,85,247,0.9)) drop-shadow(0 0 56px rgba(168,85,247,0.5))');
                            g.appendChild(bg);
                            g.appendChild(icoWrap);
                            icoWrap.appendChild(icoImg);
                            icoWrap.appendChild(icoFo);
                            icoWrap.appendChild(ico);
                            g.appendChild(bodyFo);
                            g.appendChild(tip);
                            overlay.appendChild(g);
                          }
                          return overlay.querySelector('#hx-bubble');
                        } catch (_) { return null; }
                      }
                      function hideSvgBadge() {
                        try { var g = svgEl && svgEl.querySelector && svgEl.querySelector('#hx-overlay-layer #hx-bubble'); if (g) g.style.display = 'none'; } catch (_) { }
                      }
                      // Resolve icon asset from provided text/title. Returns one of:
                      // { imgUrl: string }  -> use <image href>
                      // { deviconClass: string } -> use foreignObject font
                      // { emoji: string } -> fallback
                      function resolveIconAsset(titleText, iconText) {
                        function normalizeDevicon(cls) { if (!/^devicon-/.test(cls)) return null; return /\bcolored\b/.test(cls) ? cls : cls + ' colored'; }
                        function deviconSvgUrl(cls) { try { var m = cls.match(/^devicon-([a-z0-9]+)-(original|original|line)/); var name = m && m[1]; var variant = (m && m[2]) || 'original'; if (!name) return null; return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/' + name + '/' + name + '-' + variant + '.svg'; } catch (_) { return null; } }
                        function simpleIconUrl(slug) { return 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/' + slug + '.svg'; }
                        var s = (iconText || titleText || '').toLowerCase();
                        // Explicit keyword mappings
                        var map = [
                          { test: /\b(prometheus)\b/, dev: 'devicon-prometheus-original colored', simple: 'prometheus' },
                          { test: /\b(grafana)\b/, dev: 'devicon-grafana-original colored', simple: 'grafana' },
                          { test: /\b(dotnet|\.net)\b/, dev: 'devicon-dotnetcore-original colored' },
                          { test: /\b(kubernetes|openshift|k8s)\b/, dev: 'devicon-kubernetes-original colored', simple: 'kubernetes' },
                          { test: /\b(ingress)\b/, dev: 'devicon-kubernetes-original colored', simple: 'kubernetes' },
                          { test: /\b(gateway|api\s*gateway|integration gateway|integration)\b/, dev: 'devicon-openapi-original colored', simple: 'openapiinitiative' },
                          { test: /\b(nginx|waf)\b/, dev: 'devicon-nginx-original colored', simple: 'nginx' },
                          { test: /\b(azure|aks|cosmos|service bus|event hub|key vault)\b/, dev: 'devicon-azure-original colored', simple: 'microsoftazure' },
                          { test: /\b(docker)\b/, dev: 'devicon-docker-original colored', simple: 'docker' },
                          { test: /\b(redis)\b/, dev: 'devicon-redis-original colored', simple: 'redis' },
                          { test: /\b(postgres|postgresql)\b/, dev: 'devicon-postgresql-original colored', simple: 'postgresql' },
                          { test: /\b(mysql|mariadb)\b/, dev: 'devicon-mysql-original colored', simple: 'mysql' },
                          { test: /\b(mongodb|mongo)\b/, dev: 'devicon-mongodb-original colored', simple: 'mongodb' }
                        ];
                        for (var i = 0; i < map.length; i++) {
                          if (map[i].test.test(s)) {
                            var d = normalizeDevicon(map[i].dev || '');
                            if (d) { var u = deviconSvgUrl(d); if (u) return { imgUrl: u }; else return { deviconClass: d }; }
                            if (map[i].simple) return { imgUrl: simpleIconUrl(map[i].simple) };
                          }
                        }
                        // If iconText is a devicon class, prefer it
                        var direct = normalizeDevicon(iconText || ''); if (direct) { var du = deviconSvgUrl(direct); if (du) return { imgUrl: du }; return { deviconClass: direct }; }
                        // Try simple-icons by sanitized token
                        var token = (s.match(/[a-z0-9]+/) || [''])[0]; if (token) { return { imgUrl: simpleIconUrl(token) }; }
                        return { emoji: '🧩' };
                      }
                      function showSvgBadgeAtScreen(sx, sy, titleText, descText, iconText, skipResolve) {
                        try {
                          var g = ensureSvgBubble(); if (!g) return;
                          var bg = g.querySelector('#hx-bubble-bg');
                          var ico = g.querySelector('#hx-bubble-ico');
                          var icoImg = g.querySelector('#hx-bubble-ico-img');
                          var icoFo = g.querySelector('#hx-bubble-ico-fo');
                          var icoWrap = g.querySelector('#hx-bubble-ico-wrap');
                          var bodyFo = g.querySelector('#hx-bubble-body-fo');
                          var tip = g.querySelector('#hx-bubble-tip');
                          // If Smart Icon Resolver is available and not skipped, resolve asynchronously then relayout once
                          try {
                            if (!skipResolve && window.renderIconNode) {
                              (async function () {
                                var node = await window.renderIconNode(String(titleText || '') + ' ' + String(descText || ''));
                                icoImg.setAttribute('display', 'none');
                                while (icoFo.firstChild) icoFo.removeChild(icoFo.firstChild);
                                icoFo.appendChild(node);
                                icoFo.setAttribute('display', 'block');
                                ico.textContent = '';
                                // Relayout once after icon is injected to reflect its actual size
                                requestAnimationFrame(function () { try { showSvgBadgeAtScreen(sx, sy, titleText, descText, iconText, true); } catch (_) { } });
                              })(); return;
                            }
                          } catch (_) { }
                          // Fallback: synchronous heuristic asset
                          try {
                            var asset = resolveIconAsset(titleText, iconText);
                            if (asset && asset.imgUrl) {
                              icoImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', asset.imgUrl);
                              icoImg.setAttribute('display', 'block');
                              icoImg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                              icoFo.setAttribute('display', 'none'); while (icoFo.firstChild) icoFo.removeChild(icoFo.firstChild);
                              ico.textContent = '';
                            } else if (asset && asset.deviconClass) {
                              icoImg.setAttribute('display', 'none');
                              while (icoFo.firstChild) icoFo.removeChild(icoFo.firstChild);
                              var wrapper = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
                              wrapper.setAttribute('style', 'width:90px;height:90px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:80px;line-height:1');
                              var iEl = document.createElementNS('http://www.w3.org/1999/xhtml', 'i');
                              iEl.setAttribute('class', asset.deviconClass);
                              wrapper.appendChild(iEl);
                              icoFo.appendChild(wrapper);
                              icoFo.setAttribute('display', 'block');
                              ico.textContent = '';
                            } else {
                              icoImg.setAttribute('display', 'none');
                              while (icoFo.firstChild) icoFo.removeChild(icoFo.firstChild);
                              icoFo.setAttribute('display', 'none');
                              ico.textContent = (asset && asset.emoji) || '🧩';
                            }
                          } catch (_) { }
                          // Layout using separate scaleX/scaleY to avoid stretch
                          var padX = 32, padY = 24;
                          var gapX = 16, gapY = 16;
                          var baseline = 60;
                          g.style.display = 'block';
                          var m = svgEl.getScreenCTM && svgEl.getScreenCTM();
                          var scaleX = Math.abs((m && m.a) || 1);
                          var scaleY = Math.abs((m && m.d) || 1);
                          // Children icon elements stay at 0,0; wrapper handles translate+scale
                          icoFo.setAttribute('x', '0');
                          icoImg.setAttribute('x', '0');
                          ico.setAttribute('x', '0');
                          var iconBlockWidth = (icoImg.getAttribute('display') === 'block' || icoFo.getAttribute('display') !== 'none') ? 90 : (ico.textContent ? ico.getBBox().width : 90);
                          var ib = { x: padX, width: iconBlockWidth, height: 90 };
                          var stageRect = getStageRect();
                          var maxWidthScreen = Math.max(300, Math.floor(stageRect.width * 0.45));
                          var maxWidthSvg = maxWidthScreen / Math.max(0.01, scaleX);
                          var bodyX = padX + ib.width + gapX;
                          var bodyWidthSvg = Math.max(280, maxWidthSvg - bodyX - padX);
                          var bodyWidthCssPx = Math.round(bodyWidthSvg * scaleX);
                          while (bodyFo.firstChild) bodyFo.removeChild(bodyFo.firstChild);
                          var bodyDiv = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
                          bodyDiv.setAttribute('style', 'width:' + bodyWidthCssPx + 'px; color:#fff; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto;');
                          var h = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
                          h.setAttribute('style', 'font-size:54px; font-weight:800; margin:0 0 ' + Math.round(gapY * scaleY) + 'px; line-height:1.2; word-wrap:break-word; white-space:normal;');
                          h.textContent = titleText || '';
                          var p = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
                          p.setAttribute('style', 'font-size:40px; font-weight:600; opacity:0.95; line-height:1.55; word-wrap:break-word; white-space:normal;');
                          p.textContent = descText || '';
                          bodyDiv.appendChild(h); bodyDiv.appendChild(p);
                          bodyFo.appendChild(bodyDiv);
                          bodyFo.setAttribute('x', String(bodyX));
                          bodyFo.setAttribute('y', String(padY));
                          bodyFo.setAttribute('width', String(bodyWidthSvg));
                          // Measure and convert using separate scales
                          var contentRect = bodyDiv.getBoundingClientRect();
                          var contentWidthSvg = contentRect.width / Math.max(0.01, scaleX);
                          var contentHeightSvg = Math.max(baseline, contentRect.height / Math.max(0.01, scaleY));
                          // Add extra reserve to avoid clipping last line (~0.75em of desc font)
                          var extraReserveSvg = (30 /*px*/) / Math.max(0.01, scaleY);
                          var totalWSvg = Math.min(maxWidthSvg, bodyX + contentWidthSvg + padX);
                          var totalHSvg = contentHeightSvg + padY * 2 + extraReserveSvg;
                          // Vertically center icon and apply aspect ratio compensation
                          var iconY = Math.max(padY, (totalHSvg - ib.height) / 2);
                          icoImg.setAttribute('y', '0');
                          icoFo.setAttribute('y', '0');
                          ico.setAttribute('y', String(baseline));
                          var avg = (scaleX + scaleY) / 2; var compX = avg / Math.max(0.01, scaleX); var compY = avg / Math.max(0.01, scaleY);
                          icoWrap.setAttribute('transform', 'translate(' + padX + ',' + iconY + ') scale(' + compX + ',' + compY + ')');
                          // Apply bg and tip
                          bg.setAttribute('x', '0'); bg.setAttribute('y', '0'); bg.setAttribute('width', String(totalWSvg)); bg.setAttribute('height', String(totalHSvg));
                          bodyFo.setAttribute('height', String(contentHeightSvg + extraReserveSvg));
                          tip.setAttribute('points', '24,' + totalHSvg + ' 48,' + totalHSvg + ' 36,' + (totalHSvg + 24));
                          // Flip-and-clamp with helpers
                          var wScreen = totalWSvg * Math.max(0.01, scaleX);
                          var hScreen = totalHSvg * Math.max(0.01, scaleY);
                          var pos = computeClampedPosition(sx, sy, wScreen, hScreen, stageRect, 200);
                          var pTL = screenToSvgPoint(pos.left, pos.top);
                          var gx = pTL ? pTL.x : (sx);
                          var gy = pTL ? pTL.y : (sy);
                          g.setAttribute('transform', 'translate(' + gx + ',' + gy + ')');
                          g.style.display = 'block';
                        } catch (_) { }
                      }
                      function showSvgBadgeForEl(el, titleText, descText, iconText) {
                        try {
                          if (el) {
                            // Anchor relative to element's screen rect for better clamping
                            var r = el.getBoundingClientRect ? el.getBoundingClientRect() : null;
                            if (r) { showSvgBadgeAtScreen(r.left + r.width + 8, r.top + 8, titleText, descText, iconText); return; }
                          }
                          var c = centerPointFor(el);
                          showSvgBadgeAtScreen(c.x, c.y, titleText, descText, iconText);
                        } catch (_) { }
                      }
                      function showSvgFocusRectFor(el) {
                        try {
                          var rect = ensureSvgOverlay();
                          if (!rect || !el || !el.getBBox) { return; }
                          var b = el.getBBox();
                          rect.setAttribute('x', String(b.x - 6));
                          rect.setAttribute('y', String(b.y - 6));
                          rect.setAttribute('width', String(Math.max(0, b.width + 12)));
                          rect.setAttribute('height', String(Math.max(0, b.height + 12)));
                          rect.style.display = 'block';
                        } catch (_) { }
                      }
                      function hideSvgFocusRect() {
                        try { var r = svgEl && (svgEl.querySelector('#hx-overlay-layer #hx-focus-rect-svg')); if (r) r.style.display = 'none'; } catch (_) { }
                      }
                      var _focusEl = null; function setFocusTarget(el) { _focusEl = el || null; repositionFocusRect(); }
                      function repositionFocusRect() {
                        // If SVG-native overlay exists, keep HTML focusRect hidden
                        try { var hasSvgOverlay = svgEl && svgEl.querySelector && svgEl.querySelector('#hx-overlay-layer #hx-focus-rect-svg'); if (hasSvgOverlay) { focusRect.style.display = 'none'; return; } } catch (_) { }
                        if (!_focusEl) { focusRect.style.display = 'none'; return; }
                        var box = elBoxScreen(_focusEl); if (!box) { focusRect.style.display = 'none'; return; }
                        var r = stage.getBoundingClientRect(); var left = Math.round(box.left - r.left - 6), top = Math.round(box.top - r.top - 6); var w = Math.round(box.width + 12), h = Math.round(box.height + 12);
                        if (!isFinite(left) || !isFinite(top) || !isFinite(w) || !isFinite(h) || w <= 0 || h <= 0) { focusRect.style.display = 'none'; return; }
                        focusRect.style.left = left + 'px'; focusRect.style.top = top + 'px'; focusRect.style.width = w + 'px'; focusRect.style.height = h + 'px'; focusRect.style.display = 'block';
                      }

                      function elBoxScreen(el) {
                        try {
                          if (!el) return null;
                          // Preferred: DOM rect (handles transforms and zoom reliably)
                          var r = el.getBoundingClientRect && el.getBoundingClientRect();
                          if (r && isFinite(r.left) && isFinite(r.top)) {
                            var left = r.left, top = r.top, width = r.width, height = r.height;
                            // If inside <object> (separate document), offset by object's rect
                            try {
                              var ownerDoc = el.ownerDocument || null;
                              if (ownerDoc && ownerDoc !== document) {
                                var objEl = document.getElementById('hx-svg-obj');
                                if (objEl && objEl.getBoundingClientRect) { var or = objEl.getBoundingClientRect(); left += or.left; top += or.top; }
                              }
                            } catch (_) { }
                            return { left: left, top: top, width: width, height: height, cx: left + width / 2, cy: top + height / 2 };
                          }
                        } catch (_) { }
                        // Fallback: approximate via getBBox + getScreenCTM using full matrix
                        try {
                          if (!el.getBBox) return null; var b = el.getBBox(); var m = el.getScreenCTM(); if (!m) return null;
                          var to = function (x, y) { return { x: x * m.a + y * m.c + m.e, y: x * m.b + y * m.d + m.f }; };
                          var p1 = to(b.x, b.y), p2 = to(b.x + b.width, b.y + b.height), p3 = to(b.x + b.width, b.y), p4 = to(b.x, b.y + b.height);
                          var xs = [p1.x, p2.x, p3.x, p4.x], ys = [p1.y, p2.y, p3.y, p4.y];
                          var left = Math.min.apply(null, xs), right = Math.max.apply(null, xs), top = Math.min.apply(null, ys), bottom = Math.max.apply(null, ys);
                          var width = Math.max(0, right - left), height = Math.max(0, bottom - top);
                          return { left: left, top: top, width: width, height: height, cx: left + width / 2, cy: top + height / 2 };
                        } catch (_) { }
                        return null;
                      }
                      function ptDistToBox(px, py, box) { var dx = Math.max(box.left - px, 0, px - (box.left + box.width)); var dy = Math.max(box.top - py, 0, py - (box.top + box.height)); return Math.hypot(dx, dy); }
                      function clearNodeHighlight() { if (!svgEl) return; svgEl.querySelectorAll('.hx-focus').forEach(function (n) { n.classList.remove('hx-focus'); }); hideSvgFocusRect(); setFocusTarget(null); }
                      function focusNode(el) { clearNodeHighlight(); if (el) { try { el.classList.add('hx-focus'); } catch (_) { } showSvgFocusRectFor(el); setFocusTarget(el); } }
                      function zoomTo(el, pad) { if (!el || !pzInst) return; pad = pad || 48; try { var vp = stage.getBoundingClientRect(); var box = elBoxScreen(el); if (!box) { pzInst.centerOn(el); return; } var targetW = Math.max(60, vp.width - pad * 2), targetH = Math.max(60, vp.height - pad * 2); var ratio = Math.min(targetW / Math.max(1, box.width), targetH / Math.max(1, box.height)); var newZoom = Math.max(0.2, Math.min(8, (pzInst.getZoom ? pzInst.getZoom() : 1) * ratio)); pzInst.zoomAtPoint(newZoom, { x: box.cx, y: box.cy }); setTimeout(function () { try { pzInst.centerOn(el); } catch (_) { } }, 0); } catch (_) { try { pzInst.centerOn(el); } catch (_) { } } }
                      function zoomToPair(a, b, pad) { if (!a || !b || !pzInst) return; pad = pad || 72; var ba = elBoxScreen(a), bb = elBoxScreen(b); if (!ba || !bb) { try { pzInst.centerOn(a || b); } catch (_) { } return; } var left = Math.min(ba.left, bb.left), top = Math.min(ba.top, bb.top), right = Math.max(ba.left + ba.width, bb.left + bb.width), bottom = Math.max(ba.top + ba.height, bb.top + bb.height); var vp = stage.getBoundingClientRect(); var w = right - left, h = bottom - top; var targetW = Math.max(60, vp.width - pad * 2), targetH = Math.max(60, vp.height - pad * 2); var ratio = Math.min(targetW / Math.max(1, w), targetH / Math.max(1, h)); var newZoom = Math.max(0.2, Math.min(8, (pzInst.getZoom ? pzInst.getZoom() : 1) * ratio)); var cx = left + w / 2, cy = top + h / 2; try { pzInst.zoomAtPoint(newZoom, { x: cx, y: cy }); setTimeout(function () { try { pzInst.center({ x: cx, y: cy }); } catch (_) { } }, 0); } catch (_) { try { pzInst.center({ x: cx, y: cy }); } catch (__) { } } }
                      function addNodeFocus(el) { if (!el) return; try { el.classList.add('hx-focus'); } catch (_) { } }
                      function pickVoice() { var vs = synth.getVoices(); return vs.find(function (v) { return /^en/i.test(v.lang) && v.localService; }) || vs.find(function (v) { return /^en/i.test(v.lang); }) || vs[0] || null; }
                      function speak(text, cb) { var u = new SpeechSynthesisUtterance(text || ''); u.rate = 1.0; u.pitch = 1.0; u.volume = 1.0; var v = pickVoice(); if (v) u.voice = v; u.onend = function () { cb && cb(); }; u.onerror = function () { cb && cb(); }; synth.speak(u); }

                      var NODE_SEL = ['[data-narrate]', '[aria-label]', 'g[id^="entity_"]', 'g[id^="cluster_"]', 'g[id^="node_"]', 'g[id^="svc_"]', 'g[id^="db_"]', '[id^="entity_"]', '[id^="cluster_"]', '[id^="node_"]', '[id^="svc_"]', '[id^="db_"]'].join(',');
                      var EDGE_SEL = ['g[id^="link_"] path', 'g[id^="link_"] polyline', 'g[id^="link_"] line', 'path[data-edge]', 'polyline[data-edge]', 'line[data-edge]', 'path[marker-end]', 'polyline[marker-end]', 'line[marker-end]'].join(',');
                      function getPathEndpoints(el) { try { if (el.tagName === 'LINE') { var x1 = +el.getAttribute('x1'), y1 = +el.getAttribute('y1'), x2 = +el.getAttribute('x2'), y2 = +el.getAttribute('y2'); var m = el.getScreenCTM(); if (!m) return null; var to = function (x, y) { return { x: x * m.a + m.e, y: y * m.d + m.f } }; return { p1: to(x1, y1), p2: to(x2, y2) }; } if (el.tagName === 'POLYLINE' || el.tagName === 'PATH') { var path = el; var len = (path.getTotalLength ? path.getTotalLength() : 0) || 0; if (len <= 0 && el.tagName === 'POLYLINE') { var pts = (el.getAttribute('points') || '').trim().split(/[ ,]+/).map(Number); if (pts.length >= 4) { var x1 = pts[0], y1 = pts[1], x2 = pts[pts.length - 2], y2 = pts[pts.length - 1]; var m = el.getScreenCTM(); if (!m) return null; var to = function (x, y) { return { x: x * m.a + m.e, y: y * m.d + m.f } }; return { p1: to(x1, y1), p2: to(x2, y2) }; } return null; } var p1 = path.getPointAtLength(0), p2 = path.getPointAtLength(Math.max(0, len - 0.1)); var m = el.getScreenCTM(); if (!m) return null; var to = function (p) { return { x: p.x * m.a + m.e, y: p.y * m.d + m.f } }; return { p1: to(p1), p2: to(p2) }; } } catch (_) { } return null; }
                      function primaryStroke(el) { if (!el) return null; if (/^(PATH|LINE|POLYLINE)$/i.test(el.tagName)) return el; var hit = el.querySelector && el.querySelector('path, line, polyline'); return hit || el; }
                      function innerTextLabel(edgeEl) { var label = edgeEl.getAttribute && edgeEl.getAttribute('data-label'); if (label) return label; var g = edgeEl.closest('g') || edgeEl.parentElement; var t = g && g.querySelector && g.querySelector('text'); if (t && t.textContent) return t.textContent.trim(); var id = (g && g.id) || edgeEl.id || ''; if (id.startsWith('link_')) return id.replace(/^link_/, '').replace(/_/g, ' → '); return ''; }
                      function buildGraph(svg) {
                        var nodes = Array.from(svg.querySelectorAll(NODE_SEL)); if (!nodes.length) return null; var nodeInfo = nodes.map(function (el) { var box = elBoxScreen(el); return box ? { el: el, box: box, id: el.id || el.getAttribute('aria-label') || el.getAttribute('data-narrate') || '' } : null; }).filter(Boolean); function nearestNode(px, py) { var best = null, bestD = Infinity; for (var i = 0; i < nodeInfo.length; i++) { var n = nodeInfo[i]; var d = ptDistToBox(px, py, n.box); if (d < bestD) { bestD = d; best = n; } } return (bestD < 120 ? best : null); } var edges = []; var raw = Array.from(svg.querySelectorAll(EDGE_SEL)); for (var i = 0; i < raw.length; i++) { var candidate = raw[i]; var seg = primaryStroke(candidate); var ends = getPathEndpoints(seg); if (!ends) continue; var from = nearestNode(ends.p1.x, ends.p1.y); var to = nearestNode(ends.p2.x, ends.p2.y); if (!from || !to || from === to) continue; edges.push({ el: seg, g: candidate.closest('g') || candidate, from: from.el, to: to.el, label: innerTextLabel(candidate) }); } var outMap = new Map(), inMap = new Map(); for (var j = 0; j < nodeInfo.length; j++) { outMap.set(nodeInfo[j].el, []); inMap.set(nodeInfo[j].el, []); } for (var k = 0; k < edges.length; k++) { var e = edges[k]; outMap.get(e.from).push(e); inMap.get(e.to).push(e); } return { nodes: nodeInfo, edges: edges, outMap: outMap, inMap: inMap };
                      }
                      function markEdge(e, on) { try { var path = primaryStroke(e.g || e.el); if (!path) return; if (on) { path.classList.add('hx-flow', 'hx-flow-anim'); } else { path.classList.remove('hx-flow', 'hx-flow-anim'); } } catch (_) { } }
                      // Primary end-to-end interactions (explicit edges)
                      var flowSteps = [
                        { sel: '#entity_user', title: 'User entry', icon: '👤', speak: 'Operators authenticate and enter via the SPA. Subsequent calls carry a JWT for identity.' },
                        { sel: '#entity_spa', title: 'SPA calls and realtime', icon: 'devicon-angularjs-original colored', speak: 'The SPA issues API calls and maintains a realtime channel for live telemetry and alarms.' },
                        { sel: '#entity_osgw', title: 'Ingress & policy', icon: 'devicon-nginx-original colored', speak: 'Ingress terminates TLS, validates JWT, applies WAF/rate limits, and routes traffic inward.' },
                        { sel: '#entity_webapi', title: 'Orchestration', icon: 'devicon-dotnetcore-original colored', speak: 'The Web API authorizes, orchestrates, caches, and dispatches heavy workloads to the processing engine.' },
                        { sel: '#entity_dpe', title: 'Pipelines', icon: '⚙️', speak: 'DPE runs pipelines, producing artifacts and derived data stored durably in object storage.' },
                        { sel: '#entity_sql', title: 'Transactions', icon: 'devicon-microsoftsqlserver-original colored', speak: 'Transactional reads/writes persist to SQL with indexes and partitioning for throughput.' },
                        { sel: '#entity_redis', title: 'Caching', icon: 'devicon-redis-original colored', speak: 'Sessions and hot-path data are served from Redis to reduce latency and load.' },
                        { sel: '#entity_blob', title: 'Object storage', icon: 'devicon-azure-original colored', speak: 'Large artifacts and historical exports land in object storage for cost‑effective retention.' },
                        { sel: '#entity_prom', title: 'Metrics', icon: 'devicon-prometheus-original colored', speak: 'Prometheus scrapes service metrics for SLOs, capacity planning, and alerting.' },
                        { sel: '#entity_graf', title: 'Dashboards', icon: 'devicon-grafana-original colored', speak: 'Grafana presents KPIs, trends, and health dashboards to operators and leadership.' }
                      ];

                      var tours = {
                        overview: [
                          { sel: '#cluster_portal', title: 'Portal Overview', icon: 'devicon-azure-original colored', speak: 'This is the Heat Exchanger Portal architecture. We\'ll walk tier by tier.' },
                          { sel: '#cluster_pkg_front', title: 'Frontend Tier', icon: 'devicon-angularjs-original colored', speak: 'Angular S-P-A and realtime channel drive the user experience.' },
                          { sel: '#cluster_pkg_gw', title: 'Gateway Tier', icon: 'devicon-nginx-original colored', speak: 'Edge gateway and cluster gateway enforce authentication, authorization, and routing.' },
                          { sel: '#cluster_pkg_app', title: 'Application Tier', icon: '🔧', speak: 'Core services: .NET Web API, processing, integrations, and analytics.' },
                          { sel: '#cluster_pkg_data', title: 'Data Tier', icon: '🗄️', speak: 'SQL for durable state, Redis for low latency, blob for large payloads.' }
                        ],
                        deep: [
                          // Scope and tiers
                          { sel: '#cluster_portal', title: 'Portal Scope', icon: 'devicon-azure-original colored', speak: 'Overall enterprise portal scope hosting frontend, gateways, services, data, and platform layers.' },
                          { sel: '#cluster_pkg_front', title: 'Frontend', icon: 'devicon-angularjs-original colored', speak: 'User-facing Angular single-page app with a realtime telemetry component.' },
                          // Actors
                          { sel: '#entity_user', title: 'User Operators', icon: '👤', speak: 'Operators interact with the SPA to monitor and control heat exchanger operations.' },
                          // Frontend nodes
                          { sel: '#entity_spa', title: 'Angular SPA', icon: 'devicon-angularjs-original colored', speak: 'Primary UI built in Angular; handles auth, dashboards, and orchestration of user flows.' },
                          { sel: '#entity_realtime', title: 'Realtime Integration', icon: '🔌', speak: 'WebSocket or SignalR channel for live telemetry updates and push notifications.' },
                          // Gateway tier
                          { sel: '#cluster_pkg_gw', title: 'Gateways', icon: 'devicon-nginx-original colored', speak: 'Ingress and API gateways enforce policies, SSL termination, and route traffic.' },
                          { sel: '#entity_extgw', title: 'Integration Gateway', icon: 'devicon-nginx-original colored', speak: 'External partner routes and traffic shaping for B2B connectivity.' },
                          { sel: '#entity_osgw', title: 'OpenShift API Gateway', icon: 'devicon-redhat-original colored', speak: 'Cluster ingress with WAF, TLS, JWT validation, and rate limits.' },
                          // Application services
                          { sel: '#cluster_pkg_app', title: 'Application Services', icon: '🔧', speak: 'Business services: Web API, processing, integrations, and analytics.' },
                          { sel: '#entity_webapi', title: '.NET Core Web API', icon: 'devicon-dotnetcore-original colored', speak: 'Orchestrates requests, applies authorization, caching, and triggers background jobs.' },
                          { sel: '#entity_dpe', title: 'Data Processing Engine', icon: '⚙️', speak: 'ETL and stream jobs for ingest, enrichment, and batch computations.' },
                          { sel: '#entity_intsvc', title: 'Integration Services', icon: '🔗', speak: 'Adapters and integration bus for SAP and partner systems.' },
                          { sel: '#entity_analytics', title: 'Analytics Engine', icon: '📈', speak: 'KPIs, aggregations, and reports for operations and leadership.' },
                          // Data tier
                          { sel: '#cluster_pkg_data', title: 'Data Layer', icon: '🗄️', speak: 'Durable storage, low-latency cache, and object storage for large files.' },
                          { sel: '#entity_sql', title: 'SQL Server Enterprise', icon: 'devicon-microsoftsqlserver-original colored', speak: 'Primary OLTP store with views, backups, and transactional guarantees.' },
                          { sel: '#entity_redis', title: 'Redis Cache', icon: 'devicon-redis-original colored', speak: 'Session storage and hot-path caching to reduce latency and load.' },
                          { sel: '#entity_blob', title: 'Object Storage', icon: 'devicon-azure-original colored', speak: 'Blob storage for large payloads, binaries, and archival data.' },
                          // Observability
                          { sel: '#cluster_pkg_obs', title: 'Observability', icon: '👁️', speak: 'Unified monitoring, metrics, and dashboards for reliability.' },
                          { sel: '#entity_graf', title: 'Grafana', icon: 'devicon-grafana-original colored', speak: 'Dashboards and visualizations for KPIs and system health.' },
                          { sel: '#entity_prom', title: 'Prometheus', icon: 'devicon-prometheus-original colored', speak: 'Metrics scraping, alerting, and time-series storage.' },
                          // Platform & delivery
                          { sel: '#cluster_pkg_platform', title: 'Platform & Delivery', icon: '🛠️', speak: 'CI/CD, artifact registry, and OpenShift platform runtime.' },
                          { sel: '#entity_cicd', title: 'CI/CD Pipeline', icon: '🧪', speak: 'Automated build, test, and deploy for safe, repeatable releases.' },
                          { sel: '#entity_nexus', title: 'Artifact/Image Registry', icon: '📦', speak: 'Container images and artifacts distributed to the platform.' },
                          { sel: '#entity_ocp', title: 'OpenShift (K8s)', icon: 'devicon-redhat-original colored', speak: 'Kubernetes platform for deployment, scaling, and rollouts.' },
                          // Ecosystem & security
                          { sel: '#entity_partners', title: 'External Partners', icon: '🤝', speak: 'B2B consumers and producers via partner routes.' },
                          { sel: '#entity_sec', title: 'Security & Compliance', icon: '🔐', speak: 'Policies, secrets, JWT, and audit—governing access end to end.' }
                        ]
                      };
                      // Ensure order: individual components first, then overall flows
                      tours.deep = tours.deep.concat(flowSteps);

                      // Auto-annotate common nodes/edges so narration has content even without editing SVG
                      function annotateDiagram(svg) {
                        try {
                          var hints = {
                            '#cluster_portal': 'Enterprise portal scope and shared capabilities.',
                            '#cluster_pkg_front': 'Frontend: Angular S-P-A and realtime telemetry channel.',
                            '#cluster_pkg_gw': 'Gateways: security, routing, and ingress controls.',
                            '#cluster_pkg_app': 'Application services: API, processing, integrations, analytics.',
                            '#cluster_pkg_data': 'Data tier: SQL, Redis cache, and object storage.',
                            '#entity_webapi': '.NET Web API: orchestration, auth, caching, and routing.',
                            '#entity_sql': 'SQL Server: durable state, OLTP, and views for reporting.',
                            '#entity_redis': 'Redis Cache: sessions and hot data.',
                            '#entity_blob': 'Blob Storage: large payloads and files.'
                          };
                          Object.keys(hints).forEach(function (sel) { var el = svg.querySelector(sel); if (el && !el.getAttribute('data-narrate')) el.setAttribute('data-narrate', hints[sel]); });
                          // Edge labels: prefer existing <text>, mirror onto stroke element
                          svg.querySelectorAll('g[id^="link_"]').forEach(function (g) {
                            var t = g.querySelector('text'); var label = t && t.textContent ? t.textContent.trim() : '';
                            var s = g.querySelector('path, polyline, line'); if (s) { s.setAttribute('data-edge', '1'); if (label && !s.getAttribute('data-label')) s.setAttribute('data-label', label); }
                          });
                        } catch (_) { }
                      }
                      var playing = false, idx = -1, steps = [], escHandler = null, nextTimer = null, graph = null;
                      function ensureSvg() { svgEl = resolveSvg(); pzInst = window.pz || pzInst; return !!svgEl; }
                      function centerPointFor(el) { var box = elBoxScreen(el); if (!box) { var r = stage.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; } return { x: box.cx, y: box.cy }; }
                      function runNodeStep(step, done) { if (!svgEl) { done(); return; } var el = step.sel ? svgEl.querySelector(step.sel) : null; focusNode(el); try { if (el && pzInst) zoomTo(el, 64); } catch (_) { } var c = el ? centerPointFor(el) : centerPointFor(null); try { hideBadge(); } catch (_) { } try { if (el) showSvgBadgeForEl(el, step.title || '', step.speak || '', step.icon || '🧩'); else showSvgBadgeAtScreen(c.x, c.y, step.title || '', step.speak || '', step.icon || '🧩'); } catch (_) { } repositionFocusRect(); speak(step.speak || '', function () { try { hideSvgBadge(); } catch (_) { } hideBadge(); setBadgeTarget(null); done(); }); }
                      function runEdgeStep(step, done) {
                        if (!svgEl) { done(); return; } var edgeSel = step.edge || step.edgeSel; var g = edgeSel ? svgEl.querySelector(edgeSel) : null; if (!g) {
                          // Fallback: narrate flows from a node selector if provided
                          if (step.sel) { var node = svgEl.querySelector(step.sel); if (node && graph) { runFlowsFor(node, function () { done(); }); return; } }
                          done(); return;
                        }
                        var seg = primaryStroke(g.closest('g') || g); var ends = getPathEndpoints(seg);
                        // Try to identify source/target nodes for better zoom and focus
                        var fromEl = null, toEl = null; if (ends && graph && graph.nodes) { var bestF = 1e9, bestT = 1e9; for (var i = 0; i < graph.nodes.length; i++) { var n = graph.nodes[i]; var df = ptDistToBox(ends.p1.x, ends.p1.y, n.box); if (df < bestF) { bestF = df; fromEl = n.el; } var dt = ptDistToBox(ends.p2.x, ends.p2.y, n.box); if (dt < bestT) { bestT = dt; toEl = n.el; } } }
                        if (fromEl && toEl) { try { zoomToPair(fromEl, toEl, 80); } catch (_) { } addNodeFocus(fromEl); addNodeFocus(toEl); setFocusTarget(toEl); }
                        markEdge({ g: seg }, true);
                        var mid = ends ? { x: (ends.p1.x + ends.p2.x) / 2, y: (ends.p1.y + ends.p2.y) / 2 } : centerPointFor(null);
                        setBadgeTarget(null); showBadge(mid.x, mid.y, step.icon || '➡️', step.title || 'Flow', step.speak || ''); repositionFocusRect();
                        speak(step.speak || '', function () { hideBadge(); markEdge({ g: seg }, false); clearNodeHighlight(); done(); });
                      }
                      function humanize(id) { return String(id).replace(/^(entity_|cluster_|node_|svc_|db_)/, '').replace(/[_-]+/g, ' ').replace(/\b\w/g, function (m) { return m.toUpperCase(); }); }
                      function runFlowsFor(el, done) { if (!el || !graph) { done(); return; } var outgoing = graph.outMap.get(el) || [], incoming = graph.inMap.get(el) || []; var queue = []; outgoing.forEach(function (e) { var toName = e.to.id || e.to.getAttribute('aria-label') || e.to.getAttribute('data-narrate') || (e.to.id || 'target'); var label = e.label ? (' via ' + e.label) : ''; queue.push({ edge: e, text: 'Sends data to ' + humanize(toName) + label + '.', focus: e.to }); }); incoming.forEach(function (e) { var fromName = e.from.id || e.from.getAttribute('aria-label') || e.from.getAttribute('data-narrate') || (e.from.id || 'source'); var label = e.label ? (' via ' + e.label) : ''; queue.push({ edge: e, text: 'Receives data from ' + humanize(fromName) + label + '.', focus: e.from }); }); if (!queue.length) { done(); return; } (function stepEdge(i) { if (i >= queue.length) { done(); return; } var it = queue[i]; markEdge(it.edge, true); try { if (pzInst && it.focus) zoomTo(it.focus, 72); } catch (_) { } var sPt = centerPointFor(it.focus || el); try { hideBadge(); } catch (_) { } try { showSvgBadgeAtScreen(sPt.x, sPt.y, 'Flow', it.text, step.icon || '🧩'); } catch (_) { } speak(it.text, function () { try { hideSvgBadge(); } catch (_) { } hideBadge(); markEdge(it.edge, false); nextTimer = setTimeout(function () { stepEdge(i + 1); }, 160); }); })(0); }
                      function next() {
                        if (!playing) return; idx += 1; if (idx >= steps.length) { api.stop(); return; } var step = steps[idx]; if (!ensureSvg()) { speak(step.speak || '', function () { next(); }); return; } try { ensureSvgStyles(svgEl); annotateDiagram(svgEl); } catch (_) { } if (!graph) { try { graph = buildGraph(svgEl); } catch (_) { graph = null; } }
                        if (step.edge || step.edgeSel) { runEdgeStep(step, function () { nextTimer = setTimeout(next, 250); }); return; }
                        // For flow steps expressed as nodes, we still narrate their outgoing/incoming edges to guarantee highlighting
                        runNodeStep(step, function () { var el = step.sel ? svgEl.querySelector(step.sel) : null; if (!graph || !el) { nextTimer = setTimeout(next, 250); return; } runFlowsFor(el, function () { nextTimer = setTimeout(next, 250); }); });
                      }
                      var api = { start: function (which) { steps = Array.isArray(which) ? which : (tours[which] || tours.overview); playing = true; idx = -1; escHandler = function (e) { if (e.key === 'Escape') api.stop(); }; document.addEventListener('keydown', escHandler); next(); }, pause: function () { try { synth.pause(); } catch (_) { } }, resume: function () { try { synth.resume(); } catch (_) { } }, stop: function () { playing = false; clearTimeout(nextTimer); nextTimer = null; try { synth.cancel(); } catch (_) { } hideBadge(); clearNodeHighlight(); if (graph && graph.edges) graph.edges.forEach(function (e) { markEdge(e, false); }); graph = null; if (escHandler) { document.removeEventListener('keydown', escHandler); escHandler = null; } } };
                      window.hxNarratorPro = api;
                    })();
                    // ==== Diagram Narrator (Web Speech API) ====
                    (function () {
                      var stage = document.getElementById('hx-static-stage');
                      var obj = document.getElementById('hx-svg-obj');
                      var inline = document.getElementById('hx-svg-inline');
                      var synth = window.speechSynthesis;
                      var svgEl = null, steps = [], idx = -1, currentUtter = null, playing = false;

                      function getSvgInline() { try { return inline ? inline.querySelector('svg') : null; } catch (_) { return null; } }
                      function getSvgFromObject() { try { var d = obj && obj.contentDocument; return d ? d.querySelector('svg') : null; } catch (_) { return null; } }
                      function resolveSvg() { return getSvgInline() || getSvgFromObject(); }

                      function collectSteps() {
                        steps = []; svgEl = resolveSvg(); if (!svgEl) return steps;
                        var candidates = svgEl.querySelectorAll('[data-narrate], [aria-label], g, title, desc');
                        var seen = new Set();
                        candidates.forEach(function (el) {
                          var text = el.getAttribute && (el.getAttribute('data-narrate') || el.getAttribute('aria-label'));
                          if (!text && (el.tagName === 'title' || el.tagName === 'desc')) { text = (el.textContent || '').trim(); el = el.parentElement || el; }
                          if (!text) return; if (el && el.tagName && !seen.has(el)) { seen.add(el); steps.push({ el: el, text: text }); }
                        });
                        if (!steps.length) { steps = [{ el: null, text: 'This is a guided tour of the Heat Exchanger Portal diagram.' }, { el: null, text: 'Add data-narrate attributes on key groups to customize this narration.' }]; }
                        return steps;
                      }

                      function clearHighlight() { if (!svgEl) return; svgEl.querySelectorAll('.hx-narrate-focus').forEach(function (n) { n.classList.remove('hx-narrate-focus'); }); }
                      function focusElement(el) { clearHighlight(); if (!el) return; try { el.classList.add('hx-narrate-focus'); } catch (_) { } try { if (window.pz && typeof pz.centerOn === 'function') pz.centerOn(el); if (window.pz && pz.getZoom && pz.zoom) { var target = Math.max(1.0, Math.min(2.0, pz.getZoom())); pz.zoom(target); } } catch (_) { } }

                      function pickVoice() { var voices = synth.getVoices(); return voices.find(function (v) { return /^en(-|_)?/i.test(v.lang) && v.localService; }) || voices.find(function (v) { return /^en(-|_)?/i.test(v.lang); }) || voices[0] || null; }
                      function speakStep(step, ondone) { var utter = new SpeechSynthesisUtterance(step.text); utter.rate = 1.0; utter.pitch = 1.0; utter.volume = 1.0; var voice = pickVoice(); if (voice) utter.voice = voice; utter.onend = function () { currentUtter = null; ondone && ondone(); }; utter.onerror = function () { currentUtter = null; ondone && ondone(); }; currentUtter = utter; synth.speak(utter); }
                      function next() { if (!playing) return; idx += 1; if (idx >= steps.length) { api.stop(); return; } var step = steps[idx]; focusElement(step.el || null); speakStep(step, function () { setTimeout(next, 350); }); }

                      var api = {
                        start: function (customScript) { if (playing) api.stop(); collectSteps(); if (customScript && Array.isArray(customScript) && customScript.length) { steps = customScript.map(function (s) { var el = s.el || null; if (!el && s.selector && svgEl) el = svgEl.querySelector(s.selector); return { el: el, text: s.text }; }).filter(function (x) { return x.text; }); } if (!steps.length) { alert('No narration content found. Add data-narrate attributes to your SVG.'); return; } playing = true; idx = -1; next(); },
                        pause: function () { try { synth.pause(); } catch (_) { } },
                        resume: function () { try { synth.resume(); } catch (_) { } },
                        stop: function () { playing = false; try { synth.cancel(); } catch (_) { } idx = -1; currentUtter = null; clearHighlight(); }
                      };
                      window.hxNarrator = api;
                      if (typeof speechSynthesis !== 'undefined' && typeof speechSynthesis.onvoiceschanged !== 'undefined') { speechSynthesis.onvoiceschanged = function () { }; }
                    })();
                    function loadScript(src) { return new Promise(function (res, rej) { var s = document.createElement('script'); s.src = src; s.async = true; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
                    function ensureLibs() { return window.svgPanZoom ? Promise.resolve() : loadScript('https://unpkg.com/svg-pan-zoom/dist/svg-pan-zoom.min.js'); }

                    var stage = document.getElementById('hx-static-stage');
                    var surface = document.getElementById('hx-gesture-layer');
                    var inline = document.getElementById('hx-svg-inline');
                    var obj = document.getElementById('hx-svg-obj');
                    var lens = document.getElementById('hx-static-lens');
                    var lensSvg = lens.querySelector('svg');
                    var svgEl = null, pz = null, lensOn = false, initial = { zoom: null, pan: null };
                    var isFile = location.protocol === 'file:';
                    // Fallback transform state when svgPanZoom isn't available
                    var host = inline; // element we transform in fallback (inline SVG container or <object>)
                    var objScale = 1, objTx = 0, objTy = 0, objInit = { scale: 1, tx: 0, ty: 0 };
                    function applyObjTransform() { try { (host || inline).style.transform = 'translate(' + objTx + 'px,' + objTy + 'px) scale(' + objScale + ')'; (host || inline).style.transformOrigin = '0 0'; } catch (e) { } try { if (typeof repositionBadge === 'function') repositionBadge(); if (typeof repositionFocusRect === 'function') repositionFocusRect(); } catch (_) { } }
                    // Improve touch interactions
                    try { stage.style.touchAction = 'none'; } catch (e) { }
                    try { inline.style.touchAction = 'none'; } catch (e) { }
                    try { obj.style.touchAction = 'none'; } catch (e) { }

                    function fit() { try { pz && pz.resize(); pz && pz.fit(); pz && pz.center(); } catch (e) { } }

                    // ======== MAGNIFIER: cursor-following, toggle on button, ESC to hide ========
                    var lensImg = null; // <img> fallback for file://
                    var lensMode = 'svg'; // 'svg' | 'img'
                    var escHandler = null;
                    var moveHandler = null;

                    async function ensureSvgEl() {
                      if (svgEl) return true;
                      try { svgEl = inline ? inline.querySelector('svg') : null; } catch (_) { }
                      if (svgEl) return true;
                      try {
                        var doc = obj && obj.contentDocument;
                        if (doc && doc.querySelector) {
                          svgEl = doc.querySelector('svg');
                          if (svgEl) return true;
                        }
                      } catch (_) { }
                      return false;
                    }

                    function buildLensSvg() {
                      if (!lens || !lensSvg || !svgEl) return false;
                      lensSvg.innerHTML = '';
                      var defs = svgEl.querySelector('defs');
                      if (defs) lensSvg.appendChild(defs.cloneNode(true));
                      var NS = 'http://www.w3.org/2000/svg';
                      var g = document.createElementNS(NS, 'g');
                      Array.prototype.forEach.call(svgEl.childNodes, function (n) { if (n.nodeType === 1 && n.tagName !== 'defs') { g.appendChild(n.cloneNode(true)); } });
                      lensSvg.appendChild(g);
                      var vb = svgEl.getAttribute('viewBox');
                      if (vb) lensSvg.setAttribute('viewBox', vb);
                      else { var r = svgEl.getBoundingClientRect(); lensSvg.setAttribute('viewBox', '0 0 ' + r.width + ' ' + r.height); }
                      lensMode = 'svg';
                      return true;
                    }

                    function buildLensImage() {
                      if (!lens) return false;
                      var url = obj ? obj.getAttribute('data') : null; if (!url) return false;
                      lensMode = 'img';
                      if (!lensImg) {
                        lensImg = new Image();
                        lensImg.id = 'hx-lens-img'; lensImg.alt = '';
                        lensImg.style.position = 'absolute'; lensImg.style.left = '0'; lensImg.style.top = '0'; lensImg.style.willChange = 'transform';
                        lens.appendChild(lensImg);
                      }
                      lensImg.src = url;
                      if (lensSvg) { lensSvg.innerHTML = ''; lensSvg.style.display = 'none'; }
                      return true;
                    }

                    function positionLensAroundPointer(clientX, clientY) {
                      var hostRect = stage.getBoundingClientRect();
                      var ow = lens.clientWidth, oh = lens.clientHeight;
                      var ox = clientX - hostRect.left + 18; var oy = clientY - hostRect.top + 18;
                      if (ox + ow > hostRect.width) ox = clientX - hostRect.left - ow - 18;
                      if (oy + oh > hostRect.height) oy = clientY - hostRect.top - oh - 18;
                      lens.style.left = ox + 'px'; lens.style.top = oy + 'px';
                    }

                    function updateLensContent(clientX, clientY) {
                      var ow = lens.clientWidth, oh = lens.clientHeight, mag = 3.0;
                      if (lensMode === 'svg' && svgEl && lensSvg) {
                        var ctm = svgEl.getScreenCTM(); if (!ctm) return; var inv = ctm.inverse();
                        var pt = svgEl.createSVGPoint(); pt.x = clientX; pt.y = clientY; var p = pt.matrixTransform(inv);
                        var unitsPerPxX = 1 / ctm.a, unitsPerPxY = 1 / ctm.d; var winW = (ow * unitsPerPxX) / mag, winH = (oh * unitsPerPxY) / mag;
                        lensSvg.setAttribute('viewBox', (p.x - winW / 2) + ' ' + (p.y - winH / 2) + ' ' + winW + ' ' + winH);
                      } else if (lensMode === 'img' && lensImg && obj) {
                        var r = obj.getBoundingClientRect(); var px = clientX - r.left, py = clientY - r.top; var w = r.width * mag, h = r.height * mag;
                        lensImg.style.width = w + 'px'; lensImg.style.height = h + 'px'; var left = -(px * mag - ow / 2), top = -(py * mag - oh / 2);
                        lensImg.style.transform = 'translate(' + left + 'px,' + top + 'px)';
                      }
                    }

                    function handleMove(ev) { var t = (ev.touches && ev.touches[0]) ? ev.touches[0] : ev; positionLensAroundPointer(t.clientX, t.clientY); updateLensContent(t.clientX, t.clientY); }

                    async function showLens() {
                      var hasSvg = await ensureSvgEl(); if (hasSvg) { if (!buildLensSvg()) hasSvg = false; }
                      if (!hasSvg) { if (!buildLensImage()) { if (isFile) alert('Magnifier needs access to the SVG. Open via http(s) for best results.'); return false; } }
                      // ensure only one lens is visible
                      try { var existing = document.querySelectorAll('#hx-static-stage #hx-static-lens'); existing.forEach(function (n, i) { if (i > 0) n.parentNode.removeChild(n); }); } catch (_) { }
                      lens.style.display = 'block';
                      moveHandler = function (e) { handleMove(e); };
                      surface.addEventListener('mousemove', moveHandler, { passive: true }); surface.addEventListener('touchmove', moveHandler, { passive: true });
                      var r = stage.getBoundingClientRect(); handleMove({ clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 });
                      escHandler = function (e) { if (e.key === 'Escape') hideLens(); }; document.addEventListener('keydown', escHandler);
                      return true;
                    }

                    function hideLens() {
                      lens.style.display = 'none'; if (lensSvg) { lensSvg.innerHTML = ''; lensSvg.style.display = 'block'; } if (lensImg) { lensImg.style.width = '0px'; lensImg.style.height = '0px'; lensImg.style.transform = 'translate(0,0)'; }
                      if (moveHandler) { try { surface.removeEventListener('mousemove', moveHandler); } catch (_) { } try { surface.removeEventListener('touchmove', moveHandler); } catch (_) { } moveHandler = null; }
                      if (escHandler) { try { document.removeEventListener('keydown', escHandler); } catch (_) { } escHandler = null; }
                    }

                    window.hxDiagram1 = window.hxDiagram1 || {};
                    window.hxDiagram1.toggleMagnifier = async function () { if (!lensOn) { var ok = await showLens(); lensOn = !!ok; } else { hideLens(); lensOn = false; } };

                    function gateWheel(svg) {
                      var ioActive = true; try { var io = new IntersectionObserver(function (entries) { var en = entries[0]; ioActive = !!(en && en.isIntersecting && en.intersectionRatio >= 0.6); }, { threshold: [0, 0.6, 1] }); io.observe(stage); } catch (e) { ioActive = true; }
                      var target = surface || svg || stage;
                      // Capture-phase guard to stop page zoom
                      [surface, stage].forEach(function (el) { if (!el) return; el.addEventListener('wheel', function (e) { if (e.ctrlKey || e.metaKey || e.altKey) { e.preventDefault(); } }, { passive: false, capture: true }); });
                      target.addEventListener('wheel', function (e) { var intends = e.ctrlKey || e.metaKey || e.altKey; if (!intends || !ioActive) return; e.preventDefault(); try { var d = (e.deltaY < 0) ? 1.12 : 0.89; if (pz && pz.zoomAtPoint && pz.getZoom) { pz.zoomAtPoint(pz.getZoom() * d, { x: e.clientX, y: e.clientY }); } else if (pz && pz.zoomAtPointBy) { pz.zoomAtPointBy(d, { x: e.clientX, y: e.clientY }); } else { if (d > 1 && pz.zoomIn) pz.zoomIn(); else if (pz.zoomOut) pz.zoomOut(); } } catch (err) { } }, { passive: false });
                    }
                    function bindDrag(svg) { }

                    Object.assign(window.hxDiagram1, {
                      zoomIn: function () {
                        try {
                          if (pz) { pz.zoomIn(); return; }
                          var rect = stage.getBoundingClientRect(); var cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2; var f = 1.12;
                          var newScale = Math.max(0.2, Math.min(8, objScale * f)); var ratio = newScale / objScale;
                          objTx = cx - (cx - objTx) * ratio; objTy = cy - (cy - objTy) * ratio; objScale = newScale; applyObjTransform();
                        } catch (e) { }
                      },
                      zoomOut: function () {
                        try {
                          if (pz) { pz.zoomOut(); return; }
                          var rect = stage.getBoundingClientRect(); var cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2; var f = 0.89;
                          var newScale = Math.max(0.2, Math.min(8, objScale * f)); var ratio = newScale / objScale;
                          objTx = cx - (cx - objTx) * ratio; objTy = cy - (cy - objTy) * ratio; objScale = newScale; applyObjTransform();
                        } catch (e) { }
                      },
                      fitToView: function () {
                        try {
                          if (pz) { fit(); initial.zoom = pz.getZoom(); initial.pan = pz.getPan(); return; }
                          objScale = 1; objTx = 0; objTy = 0; applyObjTransform(); objInit = { scale: objScale, tx: objTx, ty: objTy };
                        } catch (e) { }
                      },
                      resetView: function () {
                        try {
                          if (pz) { if (initial.zoom != null) pz.zoom(initial.zoom); if (initial.pan) pz.pan(initial.pan); else { pz.resetZoom && pz.resetZoom(); pz.center && pz.center(); } return; }
                          objScale = objInit.scale; objTx = objInit.tx; objTy = objInit.ty; applyObjTransform();
                        } catch (e) { }
                      },
                    });

                    // (object-based loader removed; using inline loader below)
                    // Rebuild lens content if already toggled on once SVG is available
                    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lensOn) { if (window.hxDiagram1 && window.hxDiagram1.toggleMagnifier) { window.hxDiagram1.toggleMagnifier(); } } });
                    // Fallback wheel zoom and drag pan if svgPanZoom unavailable (bind to <object>)
                    (surface || host).addEventListener('wheel', function (e) {
                      if (pz) return; var intends = e.ctrlKey || e.metaKey || e.altKey; if (!intends) return; e.preventDefault();
                      var rect = stage.getBoundingClientRect(); var cx = e.clientX, cy = e.clientY; var f = (e.deltaY < 0) ? 1.12 : 0.89;
                      var newScale = Math.max(0.2, Math.min(8, objScale * f)); var ratio = newScale / objScale; objTx = cx - (cx - objTx) * ratio; objTy = cy - (cy - objTy) * ratio; objScale = newScale; applyObjTransform();
                    }, { passive: false });
                    (function () {
                      var dragging = false, sx = 0, sy = 0;
                      var pinch = false, startDist = 0, startScale = 1, midX = 0, midY = 0, startTx = 0, startTy = 0;
                      function dist(a, b) { var dx = a.clientX - b.clientX, dy = a.clientY - b.clientY; return Math.hypot(dx, dy); }
                      function midpoint(a, b) { return { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 }; }

                      (surface || host).addEventListener('mousedown', function (e) { if (pz) return; dragging = true; sx = e.clientX; sy = e.clientY; stage.style.cursor = 'grabbing'; });
                      window.addEventListener('mouseup', function () { if (!dragging) return; dragging = false; stage.style.cursor = 'grab'; });
                      (surface || host).addEventListener('mouseleave', function () { if (!dragging) return; dragging = false; stage.style.cursor = 'grab'; });
                      (surface || host).addEventListener('mousemove', function (e) { if (pz || pinch) return; if (!dragging) return; var dx = e.clientX - sx, dy = e.clientY - sy; sx = e.clientX; sy = e.clientY; objTx += dx; objTy += dy; applyObjTransform(); });

                      (surface || host).addEventListener('touchstart', function (e) { if (pz) return; if (e.touches.length === 2) { pinch = true; dragging = false; startDist = dist(e.touches[0], e.touches[1]); startScale = objScale; startTx = objTx; startTy = objTy; var m = midpoint(e.touches[0], e.touches[1]); midX = m.x; midY = m.y; } else if (e.touches.length === 1) { pinch = false; dragging = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY; } }, { passive: true });
                      (surface || host).addEventListener('touchend', function (e) { if (e.touches.length < 2) { pinch = false; } if (e.touches.length === 0) { dragging = false; stage.style.cursor = 'grab'; } }, { passive: true });
                      (surface || host).addEventListener('touchmove', function (e) { if (pz) return; if (pinch && e.touches.length === 2) { e.preventDefault(); var d = dist(e.touches[0], e.touches[1]); var newScale = Math.max(0.2, Math.min(8, startScale * (d / startDist))); var ratio = newScale / objScale; var cx = midX, cy = midY; objTx = cx - (cx - startTx) * ratio; objTy = cy - (cy - startTy) * ratio; objScale = newScale; applyObjTransform(); } else if (dragging && e.touches.length === 1) { e.preventDefault(); var t = e.touches[0]; var dx = t.clientX - sx, dy = t.clientY - sy; sx = t.clientX; sy = t.clientY; objTx += dx; objTy += dy; applyObjTransform(); } }, { passive: false });
                    })();
                    // Initialize fallback transform
                    applyObjTransform(); objInit = { scale: objScale, tx: objTx, ty: objTy };

                    // Inject inline SVG via TemplateLoader and initialize interactions
                    function initInlineSvg() {
                      ensureSvgEl().then(function () {
                        if (!svgEl) {
                          // No inline SVG available (likely file://). Use <object> as host for fallback interactions
                          host = obj;
                          try { inline.style.display = 'none'; } catch (e) { }
                          try { obj.style.display = 'block'; } catch (e) { }
                          return;
                        }
                        // Inline SVG available → switch host to inline, hide object
                        host = inline;
                        try { inline.style.display = 'block'; } catch (e) { }
                        try { obj.style.display = 'none'; } catch (e) { }
                        try { svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet'); } catch (e) { }
                        try { svgEl.style.touchAction = 'none'; } catch (e) { }
                        ensureLibs().then(function () {
                          try {
                            pz = window.svgPanZoom(svgEl, { panEnabled: true, zoomEnabled: true, controlIconsEnabled: false, fit: true, center: true, minZoom: 0.2, maxZoom: 8, zoomScaleSensitivity: 0.2, mouseWheelZoomEnabled: false, dblClickZoomEnabled: false, onZoom: function () { try { repositionBadge(); repositionFocusRect(); } catch (_) { } }, onPan: function () { try { repositionBadge(); repositionFocusRect(); } catch (_) { } } });
                            try { window.pz = pz; } catch (_) { }
                            new ResizeObserver(function () { try { pz.resize(); pz.fit(); pz.center(); } catch (e) { } }).observe(stage);
                            try { initial.zoom = pz.getZoom(); initial.pan = pz.getPan(); } catch (e) { }
                          } catch (e) { }
                          gateWheel(svgEl);
                        });
                      });
                    }

                    if (window.TemplateLoader && typeof TemplateLoader.loadHxDiagramSvg === 'function') {
                      TemplateLoader.loadHxDiagramSvg('hx-svg-inline', initInlineSvg);
                    } else {
                      // Fallback: inline immediately from existing file content if present in DOM elsewhere
                      initInlineSvg();
                    }
                  })();

/* ===== [INLINE SCRIPT INDEX 11] ===== */
document.addEventListener('DOMContentLoaded', function () {
      // Wait a bit for the page to fully load
      setTimeout(function () {
        // Data Processing Distribution Chart
        const dataProcessingCtx = document.getElementById('dataProcessingChart');
        if (dataProcessingCtx) {
          new Chart(dataProcessingCtx, {
            type: 'doughnut',
            data: {
              labels: ['Real-time Processing (35%)', 'Batch Analytics (25%)', 'Predictive Maintenance (25%)', 'Data Storage (15%)'],
              datasets: [{
                data: [35, 25, 25, 15],
                backgroundColor: [
                  '#FFD700',
                  '#FF6B9D',
                  '#4ECDC4',
                  '#45B7D1'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    padding: 15,
                    usePointStyle: true,
                    font: {
                      size: 11
                    }
                  }
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return context.label + ': ' + context.parsed + '%';
                    }
                  }
                }
              },
              animation: {
                animateRotate: true,
                duration: 1500
              }
            }
          });
        }

        // Performance Optimization Impact Chart
        const performanceCtx = document.getElementById('performanceChart');
        if (performanceCtx) {
          new Chart(performanceCtx, {
            type: 'doughnut',
            data: {
              labels: ['Response Time Improvement (40%)', 'Throughput Increase (30%)', 'Resource Optimization (20%)', 'Scalability Gains (10%)'],
              datasets: [{
                data: [40, 30, 20, 10],
                backgroundColor: [
                  '#FF6B9D',
                  '#4ECDC4',
                  '#FFD700',
                  '#45B7D1'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    padding: 15,
                    usePointStyle: true,
                    font: {
                      size: 11
                    }
                  }
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return context.label + ': ' + context.parsed + '%';
                    }
                  }
                }
              },
              animation: {
                animateRotate: true,
                duration: 1500
              }
            }
          });
        }

        // System Load Trends Chart (Line Chart)
        const loadTrendsCtx = document.getElementById('loadTrendsChart');
        if (loadTrendsCtx) {
          new Chart(loadTrendsCtx, {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [{
                label: 'CPU Usage (%)',
                data: [65, 72, 68, 75, 82, 78, 85, 88, 92, 87, 83, 89],
                borderColor: '#0ea2bd',
                backgroundColor: 'rgba(14, 162, 189, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
              }, {
                label: 'Memory Usage (%)',
                data: [58, 62, 59, 65, 71, 68, 74, 77, 81, 76, 72, 78],
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    padding: 15,
                    usePointStyle: true,
                    font: {
                      size: 11
                    }
                  }
                },
                tooltip: {
                  mode: 'index',
                  intersect: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    callback: function (value) {
                      return value + '%';
                    }
                  }
                }
              },
              animation: {
                duration: 1500
              }
            }
          });
        }

        // Error Rate Analysis Chart (Bar Chart)
        const errorRateCtx = document.getElementById('errorRateChart');
        if (errorRateCtx) {
          new Chart(errorRateCtx, {
            type: 'bar',
            data: {
              labels: ['API Errors', 'Database Errors', 'Network Errors', 'Authentication Errors', 'Validation Errors'],
              datasets: [{
                label: 'Error Rate (%)',
                data: [0.15, 0.08, 0.12, 0.05, 0.10],
                backgroundColor: [
                  '#ff6b35',
                  '#dc3545',
                  '#fd7e14',
                  '#6f42c1',
                  '#e83e8c'
                ],
                borderWidth: 1,
                borderColor: '#ffffff'
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return 'Error Rate: ' + context.parsed.y.toFixed(2) + '%';
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 0.2,
                  ticks: {
                    callback: function (value) {
                      return (value * 100).toFixed(1) + '%';
                    }
                  }
                }
              },
              animation: {
                duration: 1500
              }
            }
          });
        }

        // Monthly Performance Metrics Chart (Mixed Chart)
        const monthlyMetricsCtx = document.getElementById('monthlyMetricsChart');
        if (monthlyMetricsCtx) {
          new Chart(monthlyMetricsCtx, {
            type: 'bar',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [{
                label: 'Response Time (ms)',
                data: [2800, 2650, 2400, 2200, 2100, 1950, 1850, 1750, 1650, 1550, 1450, 1350],
                backgroundColor: 'rgba(14, 162, 189, 0.8)',
                borderColor: '#0ea2bd',
                borderWidth: 2,
                yAxisID: 'y'
              }, {
                label: 'Throughput (req/sec)',
                data: [1200, 1350, 1500, 1650, 1800, 1950, 2100, 2250, 2400, 2550, 2700, 2850],
                type: 'line',
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                yAxisID: 'y1'
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    padding: 15,
                    usePointStyle: true,
                    font: {
                      size: 11
                    }
                  }
                },
                tooltip: {
                  mode: 'index',
                  intersect: false
                }
              },
              scales: {
                y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  title: {
                    display: true,
                    text: 'Response Time (ms)'
                  }
                },
                y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  title: {
                    display: true,
                    text: 'Throughput (req/sec)'
                  },
                  grid: {
                    drawOnChartArea: false
                  }
                }
              },
              animation: {
                duration: 1500
              }
            }
          });
        }
      }, 500);
    });

/* ===== [INLINE SCRIPT INDEX 12] ===== */
(function () {
      if (window.hxBubbleSvg && window.hxBubbleSvg._injected) return;
      var stage = document.getElementById('hx-static-stage') || document.getElementById('hx-stage') || document.body;
      var badge = document.createElement('div');
      badge.id = 'hx-badge-overlay';
      badge.style.cssText = 'position:absolute;display:none;pointer-events:none;z-index:9999;background:#0f172a;color:#fff;border:2px solid #a855f7;box-shadow:0 10px 40px rgba(0,0,0,.35),0 0 60px rgba(168,85,247,.35) inset;border-radius:14px;padding:12px;min-width:240px;max-width:360px;font:500 13px/1.5 ui-sans-serif,system-ui;';
      badge.innerHTML = '<div style="display:flex;gap:10px;align-items:center;"><div id="hx-badge-ico" style="width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,.06);border-radius:10px;"></div><div><div id="hx-badge-title" style="font-weight:800;margin-bottom:2px;"></div><div id="hx-badge-desc" style="opacity:.9;"></div></div></div>';
      (stage === document.body ? document.body : stage).appendChild(badge);

      function iconUrl(kind) {
        var k = String(kind || '').toLowerCase();
        function dev(name, variant) { return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/' + name + '/' + name + '-' + (variant || 'original') + '.svg'; }
        function si(slug) { return 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/' + slug + '.svg'; }
        if (/^(jquery|jq)$/.test(k)) return dev('jquery', 'original');
        if (/^(dotnet|\\.net|netcore|dotnetcore)$/.test(k)) return dev('dotnetcore', 'original');
        if (/^(swagger|openapi)$/.test(k)) return si('swagger');
        if (/^(grafana)$/.test(k)) return dev('grafana', 'original');
        if (/^(prometheus)$/.test(k)) return dev('prometheus', 'original');
        if (/^(openshift)$/.test(k)) return si('openshift');
        if (/^(docker)$/.test(k)) return dev('docker', 'original');
        if (/^(bootstrap)$/.test(k)) return dev('bootstrap', 'original');
        if (/^(nunit)$/.test(k)) return si('nunit');
        if (/^(entityframework|ef)$/.test(k)) return si('entityframework');
        if (/^(sqlserver|mssql|sql)$/.test(k)) return si('microsoftsqlserver');
        if (/^(nexus|sonatype)$/.test(k)) return si('sonatype');
        if (/^(linq2sql|linq)$/.test(k)) return si('microsoftsqlserver');
        if (/^(dapper)$/.test(k)) return si('nuget');
        return null;
      }

      function showAtScreen(sx, sy, title, desc, kind) {
        var ico = document.getElementById('hx-badge-ico');
        var t = document.getElementById('hx-badge-title');
        var d = document.getElementById('hx-badge-desc');
        t.textContent = title || 'Technology';
        d.textContent = desc || '';

        // set icon
        var url = iconUrl(kind) || iconUrl(title) || iconUrl(desc);
        ico.innerHTML = '';
        if (url) {
          var img = new Image();
          img.src = url;
          img.alt = kind || title || '';
          img.style.width = '36px'; img.style.height = '36px';
          ico.appendChild(img);
        } else {
          var i = document.createElement('i');
          i.className = 'bi bi-puzzle';
          ico.appendChild(i);
        }

        badge.style.display = 'block';
        var r = (stage === document.body ? document.body.getBoundingClientRect() : stage.getBoundingClientRect());
        // First paint to get dimensions
        var bb = badge.getBoundingClientRect(); var bw = bb.width || 280, bh = bb.height || 80;
        var left = sx - r.left + 12, top = sy - r.top + 12;
        if (left + bw > r.width) left = sx - r.left - bw - 12;
        if (top + bh > r.height) top = sy - r.top - bh - 12;
        left = Math.max(8, Math.min(left, r.width - bw - 8));
        top = Math.max(8, Math.min(top, r.height - bh - 8));
        badge.style.left = left + 'px';
        badge.style.top = top + 'px';
      }
      function hide() { badge.style.display = 'none'; }
      window.hxBubbleSvg = { showAtScreen: showAtScreen, hide: hide, _injected: true };
      document.addEventListener('click', function (e) { if (!badge.contains(e.target)) hide(); });
    })();

/* ===== [INLINE SCRIPT INDEX 13] ===== */
/**
     * Keyword-driven icon resolver with preference for colored Devicon SVGs,
     * then Simple Icons, then Bootstrap Icons, then graceful fallback.
     */
    (function () {
      // Registry: patterns -> candidates (ordered by preference)
      const REGISTRY = [
        {
          pat: /(^|[\s\-_/])(dotnet|\.net|netcore|dotnetcore)([\s\-_/]|$)/i, candidates: [
            { type: 'devicon', name: 'dotnetcore', variant: 'original' }
          ]
        },
        { pat: /openshift/i, candidates: [{ type: 'simple', slug: 'openshift' }] },
        { pat: /grafana/i, candidates: [{ type: 'devicon', name: 'grafana', variant: 'original' }] },
        { pat: /prometheus/i, candidates: [{ type: 'devicon', name: 'prometheus', variant: 'original' }] },
        { pat: /(nexus|sonatype)/i, candidates: [{ type: 'simple', slug: 'sonatype' }] },
        { pat: /(entity\s*framework|^ef$)/i, candidates: [{ type: 'simple', slug: 'entityframework' }] },
        { pat: /(sql\s*server|mssql|^sql$)/i, candidates: [{ type: 'simple', slug: 'microsoftsqlserver' }] },
        { pat: /docker/i, candidates: [{ type: 'devicon', name: 'docker', variant: 'original' }] },
        { pat: /(ci\/?cd|pipeline|pipelines)/i, candidates: [{ type: 'bootstrap', cls: 'bi-arrow-repeat' }] },
        { pat: /bootstrap/i, candidates: [{ type: 'devicon', name: 'bootstrap', variant: 'original' }] },
        { pat: /primeng/i, candidates: [{ type: 'simple', slug: 'primeng' }] },
        { pat: /jquery/i, candidates: [{ type: 'devicon', name: 'jquery', variant: 'original' }] },
        { pat: /ajax/i, candidates: [{ type: 'bootstrap', cls: 'bi-lightning-fill' }] },
        { pat: /(linq2sql|linq)/i, candidates: [{ type: 'simple', slug: 'microsoftsqlserver' }] },
        { pat: /dapper/i, candidates: [{ type: 'simple', slug: 'nuget' }] },
        { pat: /(swagger|openapi)/i, candidates: [{ type: 'simple', slug: 'swagger' }] },
        { pat: /(n[-\s]?unit|^nunit$)/i, candidates: [{ type: 'simple', slug: 'nunit' }] },
        { pat: /(multi[-\s]?thread(ing)?|concurrency|threads?)/i, candidates: [{ type: 'bootstrap', cls: 'bi-cpu' }] },
        { pat: /(mvc|architecture|layers?)/i, candidates: [{ type: 'bootstrap', cls: 'bi-diagram-3' }] }
      ];

      function deviconUrl(name, variant) {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant || 'original'}.svg`;
      }
      function simpleIconUrl(slug) {
        return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`;
      }

      function resolveIconFor(text) {
        const t = String(text || '').trim();
        if (!t) return null;
        for (const rule of REGISTRY) {
          if (rule.pat.test(t)) {
            for (const cand of rule.candidates) {
              if (cand.type === 'devicon') {
                return { kind: 'img', url: deviconUrl(cand.name, cand.variant || 'original'), title: t };
              } else if (cand.type === 'simple') {
                return { kind: 'img', url: simpleIconUrl(cand.slug), title: t };
              } else if (cand.type === 'bootstrap') {
                return { kind: 'html', html: `<i class="bi ${cand.cls}" aria-hidden="true"></i>`, title: t };
              }
            }
          }
        }
        return null;
      }

      function gracefulFallback(text) {
        // 1) letter pill with first A-Z
        const ch = (String(text || '').match(/[A-Za-z0-9]/) || ['?'])[0].toUpperCase();
        return { kind: 'html', html: `<span class="hx-fallback-pill" aria-hidden="true">${ch}</span>` };
      }

      /**
       * Create icon node from a solution object
       */
      function createIconNode(sol) {
        const wrap = document.createElement('span');
        wrap.className = 'hx-icon';
        if (!sol) { sol = gracefulFallback(''); }
        if (sol.kind === 'img') {
          const img = new Image();
          img.src = sol.url;
          img.alt = sol.title || 'icon';
          wrap.appendChild(img);
        } else if (sol.kind === 'html') {
          wrap.innerHTML = sol.html;
        }
        return wrap;
      }

      /**
       * Apply icons to list items under a section header that matches certain keywords.
       * - Finds the nearest card/container after the header
       * - Replaces/Prepends icons for each <li> based on its text
       */
      function applyIconsUnderHeader(headerEl) {
        const container = headerEl.closest('.text-card') || headerEl.parentElement || document;
        const lis = container.querySelectorAll('li');
        lis.forEach(li => {
          // mark class for alignment
          li.classList.add('hx-li');
          // remove any existing icon slot to avoid duplicates
          const old = li.querySelector(':scope > .hx-icon');
          if (old) old.remove();
          // choose text basis: prefer <strong>...</strong> inside li if present
          let basis = '';
          const strong = li.querySelector('strong');
          if (strong && strong.textContent) basis = strong.textContent;
          if (!basis) basis = li.firstChild && li.firstChild.nodeType === 3 ? li.firstChild.nodeValue : li.textContent;
          // resolve and insert
          const sol = resolveIconFor(basis) || resolveIconFor(li.textContent);
          const node = createIconNode(sol);
          li.insertBefore(node, li.firstChild);
          // small space after icon if next is text
          if (li.childNodes[1] && li.childNodes[1].nodeType === 3) {
            li.insertBefore(document.createTextNode(' '), li.childNodes[1]);
          }
        });
      }

      /**
       * Apply globally: find headers with 'Technology Stack' or tech clusters
       */
      function applyAll() {
        const headers = Array.from(document.querySelectorAll('h2, h3, h4'))
          .filter(h => /technology stack/i.test(h.textContent) || /core technologies/i.test(h.textContent) || /devops & integration/i.test(h.textContent));
        headers.forEach(applyIconsUnderHeader);
      }

      // Run on DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyAll);
      } else {
        applyAll();
      }

      // ===== Unify the SVG bubble with the same resolver =====
      function bestIconUrlFor(kind, title, desc) {
        const seq = [kind, title, desc].filter(Boolean);
        for (const s of seq) {
          const sol = resolveIconFor(s);
          if (sol && sol.kind === 'img') return sol.url;
        }
        // Bootstrap or fallback -> render dynamically as data URL
        const sol = resolveIconFor(kind || title || desc) || gracefulFallback(kind || title || desc);
        if (sol.kind === 'html') {
          const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
        <rect x='4' y='4' width='56' height='56' rx='12' fill='#0f172a' stroke='#334155' stroke-width='2'/>
        <text x='32' y='40' font-family='system-ui,Segoe UI,Roboto,Arial' font-weight='900' font-size='28' fill='#e5e7eb' text-anchor='middle'>${(kind || '?')[0] || '?'}</text>
      </svg>`;
          return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
        }
        return null;
      }

      // Provide/augment hxBubbleSvg using this resolver
      (function ensureBubble() {
        const stage = document.getElementById('hx-stage') || document.body;
        // If a prior overlay exists, keep it; else create one
        let badge = document.getElementById('hx-badge-overlay');
        if (!badge) {
          badge = document.createElement('div');
          badge.id = 'hx-badge-overlay';
          badge.style.cssText = 'position:absolute;display:none;pointer-events:none;z-index:9999;background:#0f172a;color:#fff;border:2px solid #a855f7;box-shadow:0 10px 40px rgba(0,0,0,.35),0 0 60px rgba(168,85,247,.35) inset;border-radius:14px;padding:12px;min-width:240px;max-width:360px;font:500 13px/1.5 ui-sans-serif,system-ui;';
          badge.innerHTML = '<div style="display:flex;gap:10px;align-items:center;"><div id="hx-badge-ico" style="width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,.06);border-radius:10px;"></div><div><div id="hx-badge-title" style="font-weight:800;margin-bottom:2px;"></div><div id="hx-badge-desc" style="opacity:.9;"></div></div></div>';
          (stage === document.body ? document.body : stage).appendChild(badge);
        }
        const ico = () => document.getElementById('hx-badge-ico');
        const t = () => document.getElementById('hx-badge-title');
        const d = () => document.getElementById('hx-badge-desc');

        function showAtScreen(sx, sy, title, desc, kind) {
          t().textContent = title || 'Technology';
          d().textContent = desc || '';
          const url = bestIconUrlFor(kind, title, desc);
          const iconHost = ico();
          iconHost.innerHTML = '';
          if (url) {
            const img = new Image();
            img.src = url; img.alt = kind || title || 'icon'; img.style.width = '36px'; img.style.height = '36px';
            iconHost.appendChild(img);
          } else {
            // Ultimate graceful fallback
            const span = document.createElement('span');
            span.className = 'hx-fallback-pill';
            span.textContent = (String(kind || title || '?')[0] || '?').toUpperCase();
            iconHost.appendChild(span);
          }
          // position
          const r = (stage === document.body ? document.body.getBoundingClientRect() : stage.getBoundingClientRect());
          badge.style.display = 'block';
          const bb = badge.getBoundingClientRect();
          let left = sx - r.left + 12, top = sy - r.top + 12;
          if (left + bb.width > r.width) left = sx - r.left - bb.width - 12;
          if (top + bb.height > r.height) top = sy - r.top - bb.height - 12;
          left = Math.max(8, Math.min(left, r.width - bb.width - 8));
          top = Math.max(8, Math.min(top, r.height - bb.height - 8));
          badge.style.left = left + 'px';
          badge.style.top = top + 'px';
        }
        function hide() { badge.style.display = 'none'; }
        window.hxBubbleSvg = { showAtScreen, hide };
        document.addEventListener('click', (e) => { if (!badge.contains(e.target)) hide(); });
      })();
    })();

/* ===== [INLINE SCRIPT INDEX 14] ===== */
(function () {
      // Brand colors for Simple Icons (subset; expand as needed)
      const BRAND = {
        openshift: "#EE0000",
        sonatype: "#1B1C20",
        entityframework: "#68217A",
        microsoftsqlserver: "#CC2927",
        swagger: "#85EA2D",
        nunit: "#2DAAE1",
        nuget: "#004880",
        primeng: "#0C7DBE",
        nginx: "#009639",
        kubernetes: "#326CE5",
        docker: "#2496ED",
        grafana: "#F46800",
        prometheus: "#E6522C",
        redis: "#DC382D",
        postgresql: "#4169E1",
        mysql: "#4479A1",
        mongodb: "#47A248",
        azure: "#0078D4",
        openapiinitiative: "#6BA539",
      };

      // Canonical patterns → ordered icon candidates
      const RULES = [
        [/dotnet|\.net|net\s*core|dotnetcore/i, [{ dev: "dotnetcore", variant: "original" }]],
        [/openshift/i, [{ simple: "openshift" }]],
        [/grafana/i, [{ dev: "grafana", variant: "original" }]],
        [/prometheus/i, [{ dev: "prometheus", variant: "original" }]],
        [/nexus|sonatype/i, [{ simple: "sonatype" }]],
        [/entity\s*framework|^ef$/i, [{ simple: "entityframework" }]],
        [/sql\s*server|mssql|^sql$/i, [{ simple: "microsoftsqlserver" }]],
        [/docker/i, [{ dev: "docker", variant: "original" }]],
        [/ci\/?cd|pipelines?/i, [{ bootstrap: "bi-arrow-repeat" }]],
        [/bootstrap/i, [{ dev: "bootstrap", variant: "original" }]],
        [/primeng/i, [{ simple: "primeng" }]],
        [/jquery/i, [{ dev: "jquery", variant: "original" }]],
        [/ajax/i, [{ bootstrap: "bi-lightning-fill" }]],
        [/linq2sql|linq/i, [{ simple: "microsoftsqlserver" }]],
        [/dapper/i, [{ simple: "nuget" }]],
        [/swagger|openapi/i, [{ simple: "swagger" }]],
        [/n[\-\s]?unit|^nunit$/i, [{ simple: "nunit" }]],
        [/multi[\-\s]?thread|concurrency|threads?/i, [{ bootstrap: "bi-cpu" }]],
        [/mvc|architecture|layers?/i, [{ bootstrap: "bi-diagram-3" }]],
        // Extras commonly seen in diagrams
        [/nginx|waf/i, [{ dev: "nginx", variant: "original" }, { simple: "nginx" }]],
        [/kubernetes|k8s|ingress/i, [{ dev: "kubernetes", variant: "original" }, { simple: "kubernetes" }]],
        [/redis/i, [{ dev: "redis", variant: "original" }]],
        [/postgres|postgresql/i, [{ dev: "postgresql", variant: "original" }]],
        [/mysql|mariadb/i, [{ dev: "mysql", variant: "original" }]],
        [/mongo(db)?/i, [{ dev: "mongodb", variant: "original" }]],
        [/azure|aks|cosmos|service\s*bus|event\s*hub|key\s*vault/i, [{ dev: "azure", variant: "original" }, { simple: "microsoftazure" }]],
      ];

      function deviconUrl(name, variant) {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant || "original"}.svg`;
      }
      function simpleUrl(slug) {
        return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`;
      }

      function resolveIcon(text) {
        const t = (text || "").trim();
        if (!t) return null;
        for (const [regex, candidates] of RULES) {
          if (regex.test(t)) {
            for (const c of candidates) {
              if (c.dev) return { type: "img", url: deviconUrl(c.dev, c.variant || "original") };
              if (c.simple) return { type: "simple", slug: c.simple };
              if (c.bootstrap) return { type: "html", html: `<i class="bi ${c.bootstrap}" aria-hidden="true"></i>` };
            }
          }
        }
        return null;
      }

      function brandColorFor(slug) {
        return BRAND[slug] || "#6b7280";
      }

      async function renderIconNode(text) {
        const sol = resolveIcon(text);
        const wrap = document.createElement("span");
        wrap.className = "hx-icon";
        if (!sol) {
          const span = document.createElement("span");
          span.className = "hx-fallback-pill";
          span.textContent = (String(text || "?").match(/[A-Za-z0-9]/) || ["?"])[0].toUpperCase();
          wrap.appendChild(span);
          return wrap;
        }
        if (sol.type === "img") {
          const img = new Image();
          img.src = sol.url;
          img.alt = text || "icon";
          wrap.appendChild(img);
          return wrap;
        }
        if (sol.type === "simple") {
          const ic = document.createElement("iconify-icon");
          ic.setAttribute("icon", `simple-icons:${sol.slug}`);
          ic.style.color = brandColorFor(sol.slug);
          wrap.appendChild(ic);
          return wrap;
        }
        if (sol.type === "html") {
          wrap.innerHTML = sol.html;
          return wrap;
        }
      }

      // Replace icons for list items under tech headers
      function applyIconsInScope(scope) {
        const items = scope.querySelectorAll("li");
        items.forEach(async (li) => {
          li.classList.add("hx-li");
          // remove any leading emoji / old icon span
          const first = li.firstElementChild;
          if (first && (first.classList.contains("hx-icon") || first.tagName.toLowerCase() === "span")) {
            // if it's an emoji-only span (common earlier), drop it
            if (first.classList.contains("hx-icon") || first.textContent.trim().length <= 2) first.remove();
          }
          var __b1 = li.querySelector("strong"); var __b2 = li.childNodes[0]; const basis = (((__b1 && __b1.textContent) || (__b2 && __b2.textContent) || li.textContent) || "").trim();
          const iconNode = await renderIconNode(basis);
          li.insertBefore(iconNode, li.firstChild);
          if (li.childNodes[1] && li.childNodes[1].nodeType === 3) {
            li.insertBefore(document.createTextNode(" "), li.childNodes[1]);
          }
        });
      }

      function applyAll() {
        const headers = Array.from(document.querySelectorAll("h2,h3,h4")).filter(h =>
          /technology stack/i.test(h.textContent) ||
          /core technologies/i.test(h.textContent) ||
          /devops & integration/i.test(h.textContent)
        );
        headers.forEach(h => {
          const scope = h.closest(".text-card") || h.parentElement;
          if (scope) applyIconsInScope(scope);
        });
      }

      // Expose for debugging / future use
      window.__hxIconStrategy = { resolveIcon, renderIconNode, applyAll };

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", applyAll);
      } else {
        applyAll();
      }

      // ==== Upgrade hxBubbleSvg to share the resolver ====
      (function ensureBubble() {
        const stage = document.getElementById("hx-stage") || document.getElementById("hx-static-stage") || document.body;
        let badge = document.getElementById("hx-badge-overlay");
        if (!badge) {
          badge = document.createElement("div");
          badge.id = "hx-badge-overlay";
          badge.style.cssText = "position:absolute;display:none;pointer-events:none;z-index:9999;background:#0f172a;color:#fff;border:2px solid #a855f7;box-shadow:0 10px 40px rgba(0,0,0,.35),0 0 60px rgba(168,85,247,.35) inset;border-radius:14px;padding:12px;min-width:240px;max-width:360px;font:500 13px/1.5 ui-sans-serif,system-ui;";
          badge.innerHTML = '<div style="display:flex;gap:10px;align-items:center;"><div id="hx-badge-ico" style="width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,.06);border-radius:10px;"></div><div><div id="hx-badge-title" style="font-weight:800;margin-bottom:2px;"></div><div id="hx-badge-desc" style="opacity:.9;"></div></div></div>';
          (stage === document.body ? document.body : stage).appendChild(badge);
        }
        const elIco = () => document.getElementById("hx-badge-ico");
        const elTit = () => document.getElementById("hx-badge-title");
        const elDesc = () => document.getElementById("hx-badge-desc");

        async function showAtScreen(sx, sy, title, desc, kind) {
          elTit().textContent = title || "Technology";
          elDesc().textContent = desc || "";
          const node = await renderIconNode(kind || title || desc || "?");
          const icoHost = elIco();
          icoHost.innerHTML = "";
          icoHost.appendChild(node.firstChild ? node.firstChild : node);

          badge.style.display = "block";
          const r = (stage === document.body ? document.body.getBoundingClientRect() : stage.getBoundingClientRect());
          const bb = badge.getBoundingClientRect();
          let left = sx - r.left + 16, top = sy - r.top + 16;
          if (left + bb.width > r.width) left = sx - r.left - bb.width - 16;
          if (top + bb.height > r.height) top = sy - r.top - bb.height - 16;
          left = Math.max(8, Math.min(left, r.width - bb.width - 8));
          top = Math.max(8, Math.min(top, r.height - bb.height - 8));
          badge.style.left = left + "px";
          badge.style.top = top + "px";
        }
        function hide() { badge.style.display = "none"; }
        window.hxBubbleSvg = { showAtScreen, hide };
        document.addEventListener("click", (e) => { if (!badge.contains(e.target)) hide(); });
      })();
    })();

/* ===== [INLINE SCRIPT INDEX 15] ===== */
(function () {
      // Preferred brand color for Simple Icons
      const BRAND = {
        openshift: "#EE0000", sonatype: "#1B1C20", entityframework: "#68217A", microsoftsqlserver: "#CC2927",
        swagger: "#85EA2D", nunit: "#2DAAE1", primeng: "#0C7DBE", nuget: "#004880",
        nginx: "#009639", kubernetes: "#326CE5", docker: "#2496ED", grafana: "#F46800",
        prometheus: "#E6522C", redis: "#DC382D", postgresql: "#4169E1", mysql: "#4479A1",
        mongodb: "#47A248", microsoftazure: "#0078D4", openapiinitiative: "#6BA539"
      };

      // Ordered rules: Devicon first (colored), then Simple Icons (with BRAND color), then Bootstrap.
      const RULES = [
        // Core
        { re: /dotnet|\.net|net\s*core|dotnetcore/i, c: [{ dev: "dotnetcore", v: "original" }] },
        { re: /openshift/i, c: [{ simple: "openshift" }] },
        { re: /grafana/i, c: [{ dev: "grafana", v: "original" }] },
        { re: /prometheus/i, c: [{ dev: "prometheus", v: "original" }] },
        { re: /nexus|sonatype/i, c: [{ simple: "sonatype" }] },
        { re: /entity\s*framework|^ef$/i, c: [{ simple: "entityframework" }] },
        { re: /sql\s*server|mssql|^sql$/i, c: [{ simple: "microsoftsqlserver" }] },
        { re: /docker/i, c: [{ dev: "docker", v: "original" }] },
        { re: /bootstrap\b/i, c: [{ dev: "bootstrap", v: "original" }] },
        { re: /primeng/i, c: [{ simple: "primeng" }] },
        { re: /jquery/i, c: [{ dev: "jquery", v: "original" }] },
        { re: /ajax/i, c: [{ bs: "bi-lightning-fill" }] },
        { re: /ci\/?cd|pipeline|pipelines/i, c: [{ bs: "bi-arrow-repeat" }] },
        { re: /linq2sql|linq\b/i, c: [{ simple: "microsoftsqlserver" }] },
        { re: /dapper/i, c: [{ simple: "nuget" }] },
        { re: /swagger|openapi/i, c: [{ simple: "swagger" }] },
        { re: /n[\-\s]?unit|^nunit$/i, c: [{ simple: "nunit" }] },
        { re: /multi[\-\s]?thread|concurrency|threads?/i, c: [{ bs: "bi-cpu" }] },
        { re: /mvc\b|architecture|layer(ed)?/i, c: [{ bs: "bi-diagram-3" }] },
        // Infra / extras
        { re: /nginx|waf/i, c: [{ dev: "nginx", v: "original" }, { simple: "nginx" }] },
        { re: /kubernetes|k8s|ingress/i, c: [{ dev: "kubernetes", v: "original" }, { simple: "kubernetes" }] },
        { re: /redis/i, c: [{ dev: "redis", v: "original" }] },
        { re: /postgres|postgresql/i, c: [{ dev: "postgresql", v: "original" }] },
        { re: /mysql|mariadb/i, c: [{ dev: "mysql", v: "original" }] },
        { re: /mongo(db)?/i, c: [{ dev: "mongodb", v: "original" }] },
        { re: /azure|aks|cosmos|service\s*bus|event\s*hub|key\s*vault/i, c: [{ simple: "microsoftazure" }] },
      ];

      function deviconUrl(name, v) { return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${v || "original"}.svg`; }
      function simpleUrl(slug) { return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`; }

      function resolveIcon(text) {
        const t = String(text || "").trim();
        if (!t) return null;
        for (const rule of RULES) {
          if (rule.re.test(t)) {
            for (const cand of rule.c) {
              if (cand.dev) return { kind: "img", url: deviconUrl(cand.dev, cand.v || "original") };
              if (cand.simple) return { kind: "simple", slug: cand.simple };
              if (cand.bs) return { kind: "html", html: `<i class="bi ${cand.bs}" aria-hidden="true"></i>` };
            }
          }
        }
        return null;
      }

      function fallback(text) {
        const ch = (String(text || "?").match(/[A-Za-z0-9]/) || ["?"])[0].toUpperCase();
        return { kind: "html", html: `<span class="hx-fallback-pill">${ch}</span>` };
      }

      function makeNode(solution, text) {
        const wrap = document.createElement("span");
        wrap.className = "hx-icon";
        const sol = solution || fallback(text);
        if (sol.kind === "img") {
          const img = new Image();
          img.src = sol.url; img.alt = text || "icon";
          wrap.appendChild(img);
        } else if (sol.kind === "simple") {
          const ic = document.createElement("iconify-icon");
          ic.setAttribute("icon", `simple-icons:${sol.slug}`);
          if (BRAND[sol.slug]) ic.style.color = BRAND[sol.slug];
          wrap.appendChild(ic);
        } else if (sol.kind === "html") {
          wrap.innerHTML = sol.html;
        }
        return wrap;
      }

      // Apply to lists under headers
      
      
      // Helper: classify an icon-ish element
      function __hxClassifyIcon(node) {
        try {
          if (!node) return "none";
          const tag = (node.tagName || "").toLowerCase();
          // unwrap if it's our wrapper
          let el = node;
          if (tag === "span" && node.classList && node.classList.contains("hx-icon") && node.firstElementChild) {
            el = node.firstElementChild;
          }
          const t = (el.tagName || "").toLowerCase();
          const src = (el.getAttribute && (el.getAttribute("src") || el.getAttribute("href"))) || "";
          const iconAttr = (el.getAttribute && (el.getAttribute("icon") || "")) || "";
          const dataLocal = el.getAttribute && (el.getAttribute("data-local-icon") || (el.dataset && el.dataset.localIcon));
          if (t === "img" || t === "image") {
            if (dataLocal) return "local";
            if (src.includes("/assets/img/Icons/")) return "local";
            if (/devicons\/devicon/.test(src)) return "dev";
            if (/simple-icons@/i.test(src)) return "simple";
          }
          if (t === "iconify-icon") {
            if (/^simple-icons:/.test(iconAttr)) return "simple";
          }
          if (t === "svg" && (el.hasAttribute("data-local-icon") || (el.dataset && el.dataset.localIcon))) return "local";
          return "unknown";
        } catch (e) { return "unknown"; }
      }

      // Helper: ensure a node is wrapped by <span class="hx-icon"> and placed first
      function __hxNormalizeAndPlace(li, nodeToKeep) {
        // If node is wrapped already, use wrapper; else wrap
        let keep = nodeToKeep;
        if (keep) {
          const isWrapper = keep.tagName && keep.tagName.toLowerCase() === "span" && keep.classList && keep.classList.contains("hx-icon");
          if (!isWrapper) {
            if (keep.parentElement && keep.parentElement.classList && keep.parentElement.classList.contains("hx-icon")) {
              keep = keep.parentElement;
            } else {
              const wrap = document.createElement("span");
              wrap.className = "hx-icon";
              if (keep.parentNode) keep.parentNode.insertBefore(wrap, keep);
              wrap.appendChild(keep);
              keep = wrap;
            }
          }
        }
        // Move to first child
        if (keep && li.firstChild !== keep) li.insertBefore(keep, li.firstChild);
        // Space between icon and text
        if (li.childNodes[1] && li.childNodes[1].nodeType === 3) {
          if (!/^\s/.test(li.childNodes[1].nodeValue || "")) {
            li.insertBefore(document.createTextNode(" "), li.childNodes[1]);
          }
        } else {
          li.insertBefore(document.createTextNode(" "), li.childNodes[1] || null);
        }
      }

      // Root fix: prefer local icon, otherwise single devicon, otherwise single simple icon
      function applyIconsUnder(header) {
        const scope = header.closest(".text-card") || header.parentElement || document;
        scope.querySelectorAll("li").forEach(li => {
          li.classList.add("hx-li");

          // Collect any direct "icon-like" elements at start of the LI
          const candidates = Array.from(li.querySelectorAll(':scope > .hx-icon, :scope > img, :scope > svg, :scope > iconify-icon, :scope > span > img, :scope > span > svg, :scope > span > iconify-icon'));
          let locals = [], devs = [], simples = [], others = [];

          for (const c of candidates) {
            const kind = __hxClassifyIcon(c);
            if (kind === "local") locals.push(c);
            else if (kind === "dev") devs.push(c);
            else if (kind === "simple") simples.push(c);
            else if (kind !== "none") others.push(c);
          }

          const removeAllExcept = (keepNode) => {
            for (const arr of [locals, devs, simples, others]) {
              for (const n of arr) {
                if (n === keepNode) continue;
                const wrap = n.parentElement && n.parentElement.classList && n.parentElement.classList.contains("hx-icon") ? n.parentElement : null;
                (wrap || n).remove();
              }
            }
          };

          let preferred = locals[0] || devs[0] || simples[0] || null;

          if (preferred) {
            removeAllExcept(preferred);
            __hxNormalizeAndPlace(li, preferred);
            return;
          }

          var __b1 = li.querySelector("strong"); var __b2 = li.childNodes[0]; const basis = (((__b1 && __b1.textContent) || (__b2 && __b2.textContent) || li.textContent) || "").trim();
          const sol = resolveIcon(basis) || resolveIcon(li.textContent);
          const node = makeNode(sol, basis);
          li.insertBefore(node, li.firstChild);
          if (li.childNodes[1] && li.childNodes[1].nodeType === 3) {
            li.insertBefore(document.createTextNode(" "), li.childNodes[1]);
          }
        });
      }
function applyAll() {
        const targets = Array.from(document.querySelectorAll("h2,h3,h4")).filter(h =>
          /technology stack/i.test(h.textContent) ||
          /core technologies/i.test(h.textContent) ||
          /devops & integration/i.test(h.textContent)
        );
        targets.forEach(applyIconsUnder);
      }

      // Expose for testing/debug
      window.hxIconEngine = { resolveIcon, makeNode, applyAll };

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", applyAll);
      } else {
        applyAll();
      }

      // === Bubble: same resolver ===
      (function () {
        const stage = document.getElementById("hx-static-stage") || document.getElementById("hx-stage") || document.body;
        let badge = document.getElementById("hx-badge-overlay");
        if (!badge) {
          badge = document.createElement("div");
          badge.id = "hx-badge-overlay";
          badge.style.cssText = "position:absolute;display:none;pointer-events:none;z-index:9999;background:#0f172a;color:#fff;border:2px solid #a855f7;box-shadow:0 10px 40px rgba(0,0,0,.35),0 0 60px rgba(168,85,247,.35) inset;border-radius:14px;padding:12px;min-width:240px;max-width:360px;font:500 13px/1.5 ui-sans-serif,system-ui;";
          badge.innerHTML = '<div style="display:flex;gap:10px;align-items:center;"><div id="hx-badge-ico" style="width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,.06);border-radius:10px;"></div><div><div id="hx-badge-title" style="font-weight:800;margin-bottom:2px;"></div><div id="hx-badge-desc" style="opacity:.9;"></div></div></div>';
          (stage === document.body ? document.body : stage).appendChild(badge);
        }
        const elIco = () => document.getElementById("hx-badge-ico");
        const elTit = () => document.getElementById("hx-badge-title");
        const elDesc = () => document.getElementById("hx-badge-desc");

        function showAtScreen(sx, sy, title, desc, kind) {
          elTit().textContent = title || "Technology";
          elDesc().textContent = desc || "";
          const sol = resolveIcon(kind || title || desc) || fallback(kind || title || desc);
          const node = makeNode(sol, title || kind || desc);
          const host = elIco(); host.innerHTML = ""; host.appendChild(node.firstChild ? node.firstChild : node);

          badge.style.display = "block";
          const r = (stage === document.body ? document.body.getBoundingClientRect() : stage.getBoundingClientRect());
          const bb = badge.getBoundingClientRect();
          let left = sx - r.left + 16, top = sy - r.top + 16;
          if (left + bb.width > r.width) left = sx - r.left - bb.width - 16;
          if (top + bb.height > r.height) top = sy - r.top - bb.height - 16;
          left = Math.max(8, Math.min(left, r.width - bb.width - 8));
          top = Math.max(8, Math.min(top, r.height - bb.height - 8));
          badge.style.left = left + "px"; badge.style.top = top + "px";
        }
        function hide() { badge.style.display = "none"; }
        window.hxBubbleSvg = { showAtScreen, hide };
        document.addEventListener("click", (e) => { if (!badge.contains(e.target)) hide(); });
      })();
    })();

/* ===== [INLINE SCRIPT INDEX 16] ===== */
(function () {
      if (window.__hxIconEngineV5) return; // guard
      window.__hxIconEngineV5 = true;

      const BRAND = {
        openshift: "#EE0000", sonatype: "#1B1C20", entityframework: "#68217A", microsoftsqlserver: "#CC2927",
        swagger: "#85EA2D", nunit: "#2DAAE1", primeng: "#0C7DBE", nuget: "#004880",
        nginx: "#009639", kubernetes: "#326CE5", docker: "#2496ED", grafana: "#F46800",
        prometheus: "#E6522C", redis: "#DC382D", postgresql: "#4169E1", mysql: "#4479A1",
        mongodb: "#47A248", microsoftazure: "#0078D4", openapiinitiative: "#6BA539"
      };

      const RULES = [
        // Dev first (colored), then Simple (brand color), then Bootstrap generic
        { re: /dotnet|\.net|net\s*core|dotnetcore/i, c: [{ dev: "dotnetcore", v: "original" }] },
        { re: /openshift/i, c: [{ simple: "openshift" }] },
        { re: /grafana/i, c: [{ dev: "grafana", v: "original" }] },
        { re: /prometheus/i, c: [{ dev: "prometheus", v: "original" }] },
        { re: /nexus|sonatype/i, c: [{ simple: "sonatype" }] },
        { re: /entity\s*framework|^ef$/i, c: [{ simple: "entityframework" }] },
        { re: /sql\s*server|mssql|^sql$/i, c: [{ simple: "microsoftsqlserver" }] },
        { re: /docker/i, c: [{ dev: "docker", v: "original" }] },
        { re: /bootstrap\b/i, c: [{ dev: "bootstrap", v: "original" }] },
        { re: /primeng/i, c: [{ simple: "primeng" }] },
        { re: /jquery/i, c: [{ dev: "jquery", v: "original" }] },
        { re: /ajax/i, c: [{ bs: "bi-lightning-fill" }] },
        { re: /ci\/?cd|pipeline|pipelines/i, c: [{ bs: "bi-arrow-repeat" }] },
        { re: /linq2sql|linq\b/i, c: [{ simple: "microsoftsqlserver" }] },
        { re: /dapper/i, c: [{ simple: "nuget" }] },
        { re: /swagger|openapi/i, c: [{ simple: "swagger" }] },
        { re: /n[\-\s]?unit|^nunit$/i, c: [{ simple: "nunit" }] },
        { re: /multi[\-\s]?thread|concurrency|threads?/i, c: [{ bs: "bi-cpu" }] },
        { re: /mvc\b|architecture|layer(ed)?/i, c: [{ bs: "bi-diagram-3" }] },
        // Infra / extras
        { re: /nginx|waf/i, c: [{ dev: "nginx", v: "original" }, { simple: "nginx" }] },
        { re: /kubernetes|k8s|ingress/i, c: [{ dev: "kubernetes", v: "original" }, { simple: "kubernetes" }] },
        { re: /redis/i, c: [{ dev: "redis", v: "original" }] },
        { re: /postgres|postgresql/i, c: [{ dev: "postgresql", v: "original" }] },
        { re: /mysql|mariadb/i, c: [{ dev: "mysql", v: "original" }] },
        { re: /mongo(db)?/i, c: [{ dev: "mongodb", v: "original" }] },
        { re: /azure|aks|cosmos|service\s*bus|event\s*hub|key\s*vault/i, c: [{ simple: "microsoftazure" }] },
      ];

      function deviconUrl(name, v) { return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${v || "original"}.svg`; }
      function simpleUrl(slug) { return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`; }

      function resolveIcon(text) {
        const t = String(text || "").trim();
        if (!t) return null;
        for (const rule of RULES) {
          if (rule.re.test(t)) {
            for (const cand of rule.c) {
              if (cand.dev) return { kind: "img", url: deviconUrl(cand.dev, cand.v || "original") };
              if (cand.simple) return { kind: "simple", slug: cand.simple };
              if (cand.bs) return { kind: "html", html: `<i class="bi ${cand.bs}" aria-hidden="true"></i>` };
            }
          }
        }
        return null;
      }

      function fallback(text) {
        const ch = (String(text || "?").match(/[A-Za-z0-9]/) || ["?"])[0].toUpperCase();
        return { kind: "html", html: `<span class="hx-fallback-pill">${ch}</span>` };
      }

      function makeNode(solution, text) {
        const wrap = document.createElement("span");
        wrap.className = "hx-icon";
        const sol = solution || fallback(text);
        if (sol.kind === "img") {
          const img = new Image();
          img.src = sol.url; img.alt = text || "icon";
          wrap.appendChild(img);
        } else if (sol.kind === "simple") {
          const ic = document.createElement("iconify-icon");
          ic.setAttribute("icon", `simple-icons:${sol.slug}`);
          if (BRAND[sol.slug]) ic.style.color = BRAND[sol.slug];
          wrap.appendChild(ic);
        } else if (sol.kind === "html") {
          wrap.innerHTML = sol.html;
        }
        return wrap;
      }

      // Decide basis text for an <li>
      function liBasis(li) {
        const strong = li.querySelector("strong");
        if (strong && strong.textContent) return strong.textContent;
        // fallback: first text node
        for (const n of li.childNodes) { if (n.nodeType === 3 && n.nodeValue.trim()) { return n.nodeValue.trim(); } }
        return li.textContent.trim();
      }

      // Apply to ALL lists in main content + sidebars (not just tech sections)
      function applyIconsEverywhere() {
        const scopes = document.querySelectorAll(".portfolio-details, .portfolio-description, .text-card, aside, .col-lg-3, .hero-card");
        scopes.forEach(scope => {
          scope.querySelectorAll("li").forEach(li => {
            if (li.dataset.hxIconized === "1") return;
            li.dataset.hxIconized = "1";
            li.classList.add("hx-li");
            // remove any pre-existing inline emoji marker at left
            const firstSpan = li.querySelector(':scope > span');
            if (firstSpan && /position:\s*absolute/i.test(firstSpan.getAttribute("style") || "")) {
              firstSpan.remove();
            }
            const oldIcon = li.querySelector(':scope > .hx-icon');
            const hasManualImg = oldIcon && oldIcon.querySelector('img');
            if (!oldIcon || !hasManualImg) {
              if (oldIcon) oldIcon.remove();
              const key = liBasis(li);
              const sol = resolveIcon(key) || resolveIcon(li.textContent);
              const node = makeNode(sol, key);
              li.insertBefore(node, li.firstChild);
              if (li.childNodes[1] && li.childNodes[1].nodeType === 3) {
                li.insertBefore(document.createTextNode(" "), li.childNodes[1]);
              }
            } else {
              if (li.firstChild !== oldIcon) {
                li.insertBefore(oldIcon, li.firstChild);
              }
            }
          });
        });
      }

      // Re-run if content is dynamically inserted
      const obs = new MutationObserver(() => applyIconsEverywhere());
      obs.observe(document.documentElement, { childList: true, subtree: true });

      // Boot
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", applyIconsEverywhere);
      } else {
        applyIconsEverywhere();
      }

      // === SVG Bubble uses same resolver ===
      (function () {
        const stage = document.getElementById("hx-static-stage") || document.getElementById("hx-stage") || document.body;
        let badge = document.getElementById("hx-badge-overlay");
        if (!badge) {
          badge = document.createElement("div");
          badge.id = "hx-badge-overlay";
          badge.style.cssText = "position:absolute;display:none;pointer-events:none;z-index:9999;background:#0f172a;color:#fff;border:2px solid #a855f7;box-shadow:0 10px 40px rgba(0,0,0,.35),0 0 60px rgba(168,85,247,.35) inset;border-radius:14px;padding:12px;min-width:240px;max-width:360px;font:500 13px/1.5 ui-sans-serif,system-ui;";
          badge.innerHTML = '<div style="display:flex;gap:10px;align-items:center;"><div id="hx-badge-ico" style="width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,.06);border-radius:10px;"></div><div><div id="hx-badge-title" style="font-weight:800;margin-bottom:2px;"></div><div id="hx-badge-desc" style="opacity:.9;"></div></div></div>';
          (stage === document.body ? document.body : stage).appendChild(badge);
        }
        const elIco = () => document.getElementById("hx-badge-ico");
        const elTit = () => document.getElementById("hx-badge-title");
        const elDesc = () => document.getElementById("hx-badge-desc");

        function showAtScreen(sx, sy, title, desc, kind) {
          elTit().textContent = title || "Technology";
          elDesc().textContent = desc || "";
          const sol = resolveIcon(kind || title || desc) || fallback(kind || title || desc);
          const node = makeNode(sol, title || kind || desc);
          const host = elIco(); host.innerHTML = ""; host.appendChild(node.firstChild ? node.firstChild : node);

          badge.style.display = "block";
          const r = (stage === document.body ? document.body.getBoundingClientRect() : stage.getBoundingClientRect());
          const bb = badge.getBoundingClientRect();
          let left = sx - r.left + 16, top = sy - r.top + 16;
          if (left + bb.width > r.width) left = sx - r.left - bb.width - 16;
          if (top + bb.height > r.height) top = sy - r.top - bb.height - 16;
          left = Math.max(8, Math.min(left, r.width - bb.width - 8));
          top = Math.max(8, Math.min(top, r.height - bb.height - 8));
          badge.style.left = left + "px"; badge.style.top = top + "px";
        }
        function hide() { badge.style.display = "none"; }
        window.hxBubbleSvg = { showAtScreen, hide };
        document.addEventListener("click", (e) => { if (!badge.contains(e.target)) hide(); });
      })();
    })();

/* ===== [INLINE SCRIPT INDEX 17] ===== */
(function () {
      if (window.__hxIconEngineV6) return; window.__hxIconEngineV6 = true;

      // Brand palette for Simple Icons and custom duotones
      const BRAND = {
        openshift: "#EE0000", sonatype: "#1B1C20", entityframework: "#68217A", microsoftsqlserver: "#CC2927",
        swagger: "#85EA2D", nunit: "#2DAAE1", primeng: "#0C7DBE", nuget: "#004880",
        nginx: "#009639", kubernetes: "#326CE5", docker: "#2496ED", grafana: "#F46800",
        prometheus: "#E6522C", redis: "#DC382D", postgresql: "#4169E1", mysql: "#4479A1",
        mongodb: "#47A248", microsoftazure: "#0078D4"
      };

      const THEME = {
        primary: "#6b75d6",
        accent: "#a855f7",
        info: "#0ea5e9",
        ok: "#22c55e",
        warn: "#f59e0b"
      };

      function deviconUrl(name, v) { return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${v || "original"}.svg`; }
      function simpleUrl(slug) { return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`; }

      // === Resolver rules ===
      // 1) Tech/brand (Devicon first, then Simple)
      const TECH_RULES = [
        [/dotnet|\.net|net\s*core|dotnetcore/i, [{ dev: "dotnetcore", v: "original" }]],
        [/openshift/i, [{ simple: "openshift" }]],
        [/grafana/i, [{ dev: "grafana", v: "original" }]],
        [/prometheus/i, [{ dev: "prometheus", v: "original" }]],
        [/nexus|sonatype/i, [{ simple: "sonatype" }]],
        [/entity\s*framework|^ef$/i, [{ simple: "entityframework" }]],
        [/sql\s*server|mssql|^sql$/i, [{ simple: "microsoftsqlserver" }]],
        [/docker/i, [{ dev: "docker", v: "original" }]],
        [/bootstrap\b/i, [{ dev: "bootstrap", v: "original" }]],
        [/primeng/i, [{ simple: "primeng" }]],
        [/jquery/i, [{ dev: "jquery", v: "original" }]],
        [/ajax/i, [{ bs: "bi-lightning-fill" }]],
        [/ci\/?cd|pipeline|pipelines/i, [{ bs: "bi-arrow-repeat" }]],
        [/linq2sql|linq\b/i, [{ simple: "microsoftsqlserver" }]],
        [/dapper/i, [{ simple: "nuget" }]],
        [/swagger|openapi/i, [{ simple: "swagger" }]],
        [/n[\-\s]?unit|^nunit$/i, [{ simple: "nunit" }]],
        [/multi[\-\s]?thread|concurrency|threads?/i, [{ bs: "bi-cpu" }]],
        [/mvc\b|architecture|layer(ed)?/i, [{ bs: "bi-diagram-3" }]],
        [/nginx|waf/i, [{ dev: "nginx", v: "original" }, { simple: "nginx" }]],
        [/kubernetes|k8s|ingress/i, [{ dev: "kubernetes", v: "original" }, { simple: "kubernetes" }]],
        [/redis/i, [{ dev: "redis", v: "original" }]],
        [/postgres|postgresql/i, [{ dev: "postgresql", v: "original" }]],
        [/mysql|mariadb/i, [{ dev: "mysql", v: "original" }]],
        [/mongo(db)?/i, [{ dev: "mongodb", v: "original" }]],
        [/azure|aks|cosmos|service\s*bus|event\s*hub|key\s*vault/i, [{ simple: "microsoftazure" }]],
      ];

      // 2) Business/metadata terms → colorful Iconify duotones (keeps everything non-black/white)
      const BIZ_RULES = [
        [/^(category|type|domain)$/i, [{ ico: "ph:buildings-duotone", color: THEME.primary }]],
        [/(client|customer|company|organi[sz]ation)/i, [{ ico: "ph:buildings-duotone", color: "#0ea5e9" }]],
        [/(confidential|secure|restricted|nda)/i, [{ ico: "ph:lock-duotone", color: "#e11d48" }]],
        [/(project\s*date|date|timeline|period|duration)/i, [{ ico: "ph:calendar-duotone", color: "#22c55e" }]],
        [/(project\s*url|url|website|portal|link)/i, [{ ico: "ph:globe-duotone", color: THEME.accent }]],
        [/(company\s*size|headcount|fortune|scale)/i, [{ ico: "ph:trophy-duotone", color: "#f59e0b" }]],
        [/(mission\s*critical|uptime|availability)/i, [{ ico: "ph:shield-check-duotone", color: "#16a34a" }]],
        [/(real[-\s]?time|stream)/i, [{ ico: "ph:pulse-duotone", color: "#22c55e" }]],
        [/(security|protection|auth)/i, [{ ico: "ph:shield-duotone", color: "#ef4444" }]],
        [/(performance|latency|throughput)/i, [{ ico: "ph:speedometer-duotone", color: "#f97316" }]],
        [/(scalability|scale|microservices)/i, [{ ico: "ph:squares-four-duotone", color: "#6366f1" }]],
      ];

      function resolveIcon(text) {
        const t = String(text || "").trim();

        // Brand/tech first
        for (const [re, list] of TECH_RULES) {
          if (re.test(t)) {
            for (const c of list) {
              if (c.dev) return { kind: "img", url: deviconUrl(c.dev, c.v || "original") };
              if (c.simple) return { kind: "simple", slug: c.simple, color: BRAND[c.simple] || "#6b7280" };
              if (c.bs) return { kind: "html", html: `<i class="bi ${c.bs}" aria-hidden="true"></i>` };
            }
          }
        }
        // Business terms next (iconify duotones w/ color)
        for (const [re, list] of BIZ_RULES) {
          if (re.test(t)) {
            const c = list[0];
            return { kind: "iconify", name: c.ico, color: c.color };
          }
        }
        return null;
      }

      function fallback(text) {
        // Instead of B/W letter pill, use a nice duotone dot-grid
        const ch = (String(text || "?").match(/[A-Za-z0-9]/) || ["?"])[0].toUpperCase();
        return { kind: "iconify", name: "ph:dot-outline-duotone", color: "#64748b", label: ch };
      }

      // Render icon for HTML lists/rows
      function makeNode(solution, text) {
        const wrap = document.createElement("span");
        wrap.className = "hx-icon";
        const sol = solution || fallback(text);
        if (sol.kind === "img") {
          const img = new Image(); img.src = sol.url; img.alt = text || "icon"; wrap.appendChild(img);
        } else if (sol.kind === "simple") {
          const ic = document.createElement("iconify-icon");
          ic.setAttribute("icon", `simple-icons:${sol.slug}`);
          if (sol.color) ic.style.color = sol.color;
          wrap.appendChild(ic);
        } else if (sol.kind === "iconify") {
          const ic = document.createElement("iconify-icon");
          ic.setAttribute("icon", sol.name);
          if (sol.color) ic.style.color = sol.color;
          wrap.appendChild(ic);
        } else if (sol.kind === "html") {
          wrap.innerHTML = sol.html;
        }
        return wrap;
      }

      // Apply icons to "Project Information" card values
      function patchProjectInfo() {
        const card = Array.from(document.querySelectorAll(".text-card")).find(c => /project information/i.test(c.textContent || ""));
        if (!card) return;
        const rows = card.querySelectorAll("li");
        rows.forEach(li => {
          const label = (li.querySelector("span") && li.querySelector("span").textContent.trim()) || "";
          let valueEl = null;
          // Prefer the second span or link text as basis
          const spans = li.querySelectorAll("span");
          if (spans.length > 1) valueEl = spans[1];
          if (!valueEl) { valueEl = li.querySelector("a") || li.querySelector("span:last-child") || li; }
          // wrap value with hx-info-row
          if (!valueEl) return;
          if (!valueEl.classList.contains("hx-info-row")) {
            const wrap = document.createElement("div");
            wrap.className = "hx-info-row";
            valueEl.parentNode.insertBefore(wrap, valueEl);
            wrap.appendChild(valueEl);
          }
          // remove existing emoji at start of value
          if (valueEl.firstChild && valueEl.firstChild.nodeType === 3) {
            const t = valueEl.firstChild.nodeValue;
            if (/^[^\w\s]/.test(t)) valueEl.firstChild.nodeValue = t.replace(/^[^\w\s]+/, "").trimStart();
          }
          const basis = label || valueEl.textContent;
          const sol = resolveIcon(label) || resolveIcon(basis);
          const node = makeNode(sol, basis);
          // Insert icon to the left if not present
          const row = valueEl.closest(".hx-info-row");
          if (row && !row.querySelector(":scope > .hx-icon")) {
            row.insertBefore(node, row.firstChild);
          }
        });
      }

      // Apply icons to ALL list items (keeps prior colorful tech icons; only fills missing)
      function patchAllLists() {
        const lists = document.querySelectorAll(".portfolio-description, .portfolio-details, .text-card, aside, .hero-card, .col-lg-3");
        lists.forEach(scope => {
          scope.querySelectorAll("li").forEach(li => {
            // If already has hx-icon (from previous run) keep it
            if (li.querySelector(":scope > .hx-icon")) return;
            li.classList.add("hx-li");
            const key = (li.querySelector("strong")?.textContent || li.childNodes[0]?.textContent || li.textContent || "").trim();
            const sol = resolveIcon(key) || resolveIcon(li.textContent);
            const node = makeNode(sol, key);
            li.insertBefore(node, li.firstChild);
            if (li.childNodes[1] && li.childNodes[1].nodeType === 3) {
              li.insertBefore(document.createTextNode(" "), li.childNodes[1]);
            }
          });
        });
      }

      // === Upgrade hxBubbleSvg to show colorful icons (including Iconify) ===
      (function () {
        const stage = document.getElementById("hx-static-stage") || document.getElementById("hx-stage") || document.body;
        let badge = document.getElementById("hx-badge-overlay");
        if (!badge) {
          badge = document.createElement("div");
          badge.id = "hx-badge-overlay";
          badge.style.cssText = "position:absolute;display:none;pointer-events:none;z-index:9999;background:#0f172a;color:#fff;border:2px solid #a855f7;box-shadow:0 10px 40px rgba(0,0,0,.35),0 0 60px rgba(168,85,247,.35) inset;border-radius:14px;padding:12px;min-width:240px;max-width:360px;font:500 13px/1.5 ui-sans-serif,system-ui;";
          badge.innerHTML = '<div style="display:flex;gap:10px;align-items:center;"><div id="hx-badge-ico" style="width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,.06);border-radius:10px;"></div><div><div id="hx-badge-title" style="font-weight:800;margin-bottom:2px;"></div><div id="hx-badge-desc" style="opacity:.9;"></div></div></div>';
          (stage === document.body ? document.body : stage).appendChild(badge);
        }
        const elIco = () => document.getElementById("hx-badge-ico");
        const elTit = () => document.getElementById("hx-badge-title");
        const elDesc = () => document.getElementById("hx-badge-desc");

        function showAtScreen(sx, sy, title, desc, kind) {
          elTit().textContent = title || "Technology";
          elDesc().textContent = desc || "";
          const sol = resolveIcon(kind || title || desc) || fallback(kind || title || desc);
          const host = elIco(); host.innerHTML = "";
          // Render iconify/simple/devicon inside HTML badge
          if (sol.kind === "img") {
            const img = new Image(); img.src = sol.url; img.alt = title || "icon"; img.style.width = "36px"; img.style.height = "36px"; host.appendChild(img);
          } else if (sol.kind === "simple") {
            const ic = document.createElement("iconify-icon"); ic.setAttribute("icon", `simple-icons:${sol.slug}`); if (sol.color) ic.style.color = sol.color; host.appendChild(ic);
          } else if (sol.kind === "iconify") {
            const ic = document.createElement("iconify-icon"); ic.setAttribute("icon", sol.name); if (sol.color) ic.style.color = sol.color; host.appendChild(ic);
          } else if (sol.kind === "html") {
            host.innerHTML = sol.html;
          }

          // Positioning (flip+clamp)
          badge.style.display = "block";
          const r = (stage === document.body ? document.body.getBoundingClientRect() : stage.getBoundingClientRect());
          const bb = badge.getBoundingClientRect();
          let left = sx - r.left + 16, top = sy - r.top + 16;
          if (left + bb.width > r.width) left = sx - r.left - bb.width - 16;
          if (top + bb.height > r.height) top = sy - r.top - bb.height - 16;
          left = Math.max(8, Math.min(left, r.width - bb.width - 8));
          top = Math.max(8, Math.min(top, r.height - bb.height - 8));
          badge.style.left = left + "px"; badge.style.top = top + "px";
        }
        function hide() { badge.style.display = "none"; }
        // Override globally
        window.hxBubbleSvg = { showAtScreen, hide };
        document.addEventListener("click", (e) => { if (!badge.contains(e.target)) hide(); });
      })();

      // Boot patches
      function boot() {
        patchProjectInfo();
        patchAllLists();
      }
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
      else boot();

    })();

/* ===== [INLINE SCRIPT INDEX 18] ===== */
(function () {
      if (window.__hxIconEngineV7) return; window.__hxIconEngineV7 = true;

      const BRAND = {
        openshift: "#EE0000", sonatype: "#1B1C20", entityframework: "#68217A", microsoftsqlserver: "#CC2927",
        swagger: "#85EA2D", nunit: "#2DAAE1", primeng: "#0C7DBE", nuget: "#004880",
        nginx: "#009639", kubernetes: "#326CE5", docker: "#2496ED", grafana: "#F46800",
        prometheus: "#E6522C", redis: "#DC382D", postgresql: "#4169E1", mysql: "#4479A1",
        mongodb: "#47A248", microsoftazure: "#0078D4"
      };
      const THEME = { primary: "#6b75d6", accent: "#a855f7", info: "#0ea5e9", ok: "#22c55e", warn: "#f59e0b" };

      function deviconUrlPref(name) {
        // Prefer original → original → line
        const variants = ["original", "original", "line"];
        for (const v of variants) {
          // Some devicons use original-wordmark; we stick to base colored glyphs
          const url = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${v}.svg`;
          // We cannot HEAD-check offline; return the first candidate and let browser fetch
          return url;
        }
      }
      function simpleUrl(slug) { return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`; }

      const TECH_RULES = [
        [/dotnet|\.net|net\s*core|dotnetcore/i, [{ dev: "dotnetcore" }]],
        [/openshift/i, [{ simple: "openshift" }]],
        [/grafana/i, [{ dev: "grafana" }]],
        [/prometheus/i, [{ dev: "prometheus" }]],
        [/nexus|sonatype/i, [{ simple: "sonatype" }]],
        [/entity\s*framework|^ef$/i, [{ simple: "entityframework" }]],
        [/sql\s*server|mssql|^sql$/i, [{ simple: "microsoftsqlserver" }]],
        [/docker/i, [{ dev: "docker" }]],
        [/bootstrap\b/i, [{ dev: "bootstrap" }]],
        [/primeng/i, [{ simple: "primeng" }]],
        [/jquery/i, [{ dev: "jquery" }]],
        [/ajax/i, [{ bs: "bi-lightning-fill" }]],
        [/ci\/?cd|pipeline|pipelines/i, [{ bs: "bi-arrow-repeat" }]],
        [/linq2sql|linq\b/i, [{ simple: "microsoftsqlserver" }]],
        [/dapper/i, [{ simple: "nuget" }]],
        [/swagger|openapi/i, [{ simple: "swagger" }]],
        [/n[\-\s]?unit|^nunit$/i, [{ simple: "nunit" }]],
        [/multi[\-\s]?thread|concurrency|threads?/i, [{ bs: "bi-cpu" }]],
        [/mvc\b|architecture|layer(ed)?/i, [{ bs: "bi-diagram-3" }]],
        // Extras
        [/nginx|waf/i, [{ dev: "nginx" }, { simple: "nginx" }]],
        [/kubernetes|k8s|ingress/i, [{ dev: "kubernetes" }, { simple: "kubernetes" }]],
        [/redis/i, [{ dev: "redis" }]],
        [/postgres|postgresql/i, [{ dev: "postgresql" }]],
        [/mysql|mariadb/i, [{ dev: "mysql" }]],
        [/mongo(db)?/i, [{ dev: "mongodb" }]],
        [/azure|aks|cosmos|service\s*bus|event\s*hub|key\s*vault/i, [{ simple: "microsoftazure" }]],
      ];

      const BIZ_RULES = [
        [/^(category|type|domain)$/i, [{ ico: "ph:buildings-duotone", color: THEME.primary }]],
        [/(client|customer|company|organi[sz]ation)/i, [{ ico: "ph:buildings-duotone", color: "#0ea5e9" }]],
        [/(confidential|secure|restricted|nda)/i, [{ ico: "ph:lock-duotone", color: "#e11d48" }]],
        [/(project\s*date|date|timeline|period|duration)/i, [{ ico: "ph:calendar-duotone", color: "#22c55e" }]],
        [/(project\s*url|url|website|portal|link)/i, [{ ico: "ph:globe-duotone", color: THEME.accent }]],
        [/(company\s*size|headcount|fortune|scale)/i, [{ ico: "ph:trophy-duotone", color: "#f59e0b" }]],
        [/(mission\s*critical|uptime|availability)/i, [{ ico: "ph:shield-check-duotone", color: "#16a34a" }]],
        [/(real[-\s]?time|stream)/i, [{ ico: "ph:pulse-duotone", color: "#22c55e" }]],
        [/(security|protection|auth)/i, [{ ico: "ph:shield-duotone", color: "#ef4444" }]],
        [/(performance|latency|throughput)/i, [{ ico: "ph:speedometer-duotone", color: "#f97316" }]],
        [/(scalability|scale|microservices)/i, [{ ico: "ph:squares-four-duotone", color: "#6366f1" }]],
      ];

      function resolveIcon(text) {
        const t = String(text || "").trim();
        // Tech first
        for (const [re, list] of TECH_RULES) {
          if (re.test(t)) {
            for (const c of list) {
              if (c.dev) return { kind: "img", url: deviconUrlPref(c.dev) };
              if (c.simple) return { kind: "simple", slug: c.simple, color: BRAND[c.simple] || "#6b7280" };
              if (c.bs) return { kind: "html", html: `<i class="bi ${c.bs}" aria-hidden="true"></i>` };
            }
          }
        }
        // Business next
        for (const [re, list] of BIZ_RULES) {
          if (re.test(t)) {
            const c = list[0];
            return { kind: "iconify", name: c.ico, color: c.color };
          }
        }
        return null;
      }

      function colorfulFallback(text) {
        // Colorful default (duotone) instead of letter pill
        return { kind: "iconify", name: "ph:dot-outline-duotone", color: "#64748b" };
      }

      function makeNode(solution, text) {
        const wrap = document.createElement("span");
        wrap.className = "hx-icon";
        const sol = solution || colorfulFallback(text);
        if (sol.kind === "img") {
          const img = new Image(); img.src = sol.url; img.alt = text || "icon"; wrap.appendChild(img);
        } else if (sol.kind === "simple") {
          const ic = document.createElement("iconify-icon");
          ic.setAttribute("icon", `simple-icons:${sol.slug}`);
          if (sol.color) ic.style.color = sol.color;
          wrap.appendChild(ic);
        } else if (sol.kind === "iconify") {
          const ic = document.createElement("iconify-icon");
          ic.setAttribute("icon", sol.name);
          if (sol.color) ic.style.color = sol.color;
          wrap.appendChild(ic);
        } else if (sol.kind === "html") {
          wrap.innerHTML = sol.html;
        }
        return wrap;
      }

      function liBasis(li) {
        const strong = li.querySelector("strong");
        if (strong && strong.textContent) return strong.textContent.trim();
        for (const n of li.childNodes) { if (n.nodeType === 3 && n.nodeValue.trim()) { return n.nodeValue.trim(); } }
        return li.textContent.trim();
      }

      // Patch "Project Information" card: add icons to value rows (no letters)
      function patchProjectInfo() {
        const card = Array.from(document.querySelectorAll(".text-card")).find(c => /project information/i.test(c.textContent || ""));
        if (!card) return;
        const rows = card.querySelectorAll("li");
        rows.forEach(li => {
          const label = (li.querySelector("span") && li.querySelector("span").textContent.trim()) || "";
          let valueEl = null;
          const spans = li.querySelectorAll("span");
          if (spans.length > 1) valueEl = spans[1];
          if (!valueEl) { valueEl = li.querySelector("a") || li.querySelector("span:last-child") || li; }
          if (!valueEl) return;
          if (!valueEl.classList.contains("hx-info-row")) {
            const wrap = document.createElement("div");
            wrap.className = "hx-info-row";
            valueEl.parentNode.insertBefore(wrap, valueEl);
            wrap.appendChild(valueEl);
          }
          const basis = label || valueEl.textContent;
          const sol = resolveIcon(label) || resolveIcon(basis) || colorfulFallback(basis);
          const node = makeNode(sol, basis);
          const row = valueEl.closest(".hx-info-row");
          const existing = row && row.querySelector(":scope > .hx-icon");
          if (existing) existing.remove();
          if (row) row.insertBefore(node, row.firstChild);
        });
      }

      // Replace icons across ALL lists; remove any legacy letter pills
      function patchAllLists() {
        const scopes = document.querySelectorAll(".portfolio-description, .portfolio-details, .text-card, aside, .hero-card, .col-lg-3");
        scopes.forEach(scope => {
          scope.querySelectorAll("li").forEach(li => {
            const oldIcon = li.querySelector(":scope > .hx-icon");
            const hasPill = li.querySelector(":scope > .hx-icon .hx-fallback-pill");
            if (oldIcon && !hasPill) return; // keep colorful icons; replace only pills or missing
            if (oldIcon) oldIcon.remove();
            li.classList.add("hx-li");
            const key = liBasis(li);
            const sol = resolveIcon(key) || resolveIcon(li.textContent) || colorfulFallback(key);
            const node = makeNode(sol, key);
            li.insertBefore(node, li.firstChild);
            if (li.childNodes[1] && li.childNodes[1].nodeType === 3) {
              li.insertBefore(document.createTextNode(" "), li.childNodes[1]);
            }
          });
        });
      }

      // SVG bubble uses same resolver with colorful fallback
      (function () {
        const stage = document.getElementById("hx-static-stage") || document.getElementById("hx-stage") || document.body;
        let badge = document.getElementById("hx-badge-overlay");
        if (!badge) {
          badge = document.createElement("div");
          badge.id = "hx-badge-overlay";
          badge.style.cssText = "position:absolute;display:none;pointer-events:none;z-index:9999;background:#0f172a;color:#fff;border:2px solid #a855f7;box-shadow:0 10px 40px rgba(0,0,0,.35),0 0 60px rgba(168,85,247,.35) inset;border-radius:14px;padding:12px;min-width:240px;max-width:360px;font:500 13px/1.5 ui-sans-serif,system-ui;";
          badge.innerHTML = '<div style="display:flex;gap:10px;align-items:center;"><div id="hx-badge-ico" style="width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,.06);border-radius:10px;"></div><div><div id="hx-badge-title" style="font-weight:800;margin-bottom:2px;"></div><div id="hx-badge-desc" style="opacity:.9;"></div></div></div>';
          (stage === document.body ? document.body : stage).appendChild(badge);
        }
        const elIco = () => document.getElementById("hx-badge-ico");
        const elTit = () => document.getElementById("hx-badge-title");
        const elDesc = () => document.getElementById("hx-badge-desc");

        function showAtScreen(sx, sy, title, desc, kind) {
          elTit().textContent = title || "Technology";
          elDesc().textContent = desc || "";
          const sol = resolveIcon(kind || title || desc) || colorfulFallback(kind || title || desc);
          const host = elIco(); host.innerHTML = "";
          if (sol.kind === "img") {
            const img = new Image(); img.src = sol.url; img.alt = title || "icon"; img.style.width = "36px"; img.style.height = "36px"; host.appendChild(img);
          } else if (sol.kind === "simple") {
            const ic = document.createElement("iconify-icon"); ic.setAttribute("icon", `simple-icons:${sol.slug}`); if (sol.color) ic.style.color = sol.color; host.appendChild(ic);
          } else if (sol.kind === "iconify") {
            const ic = document.createElement("iconify-icon"); ic.setAttribute("icon", sol.name); if (sol.color) ic.style.color = sol.color; host.appendChild(ic);
          } else if (sol.kind === "html") {
            host.innerHTML = sol.html;
          }
          // position
          const r = (stage === document.body ? document.body.getBoundingClientRect() : stage.getBoundingClientRect());
          badge.style.display = "block";
          const bb = badge.getBoundingClientRect();
          let left = sx - r.left + 16, top = sy - r.top + 16;
          if (left + bb.width > r.width) left = sx - r.left - bb.width - 16;
          if (top + bb.height > r.height) top = sy - r.top - bb.height - 16;
          left = Math.max(8, Math.min(left, r.width - bb.width - 8));
          top = Math.max(8, Math.min(top, r.height - bb.height - 8));
          badge.style.left = left + "px"; badge.style.top = top + "px";
        }
        function hide() { badge.style.display = "none"; }
        window.hxBubbleSvg = { showAtScreen, hide };
        document.addEventListener("click", (e) => { if (!badge.contains(e.target)) hide(); });
      })();

      function boot() { patchProjectInfo(); patchAllLists(); }
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
      else boot();
    })();

/* ===== [INLINE SCRIPT INDEX 19] ===== */
(function () {
      if (window.__hxBubbleUpdaterV4) return; window.__hxBubbleUpdaterV4 = true;

      // --- Brand palette for Simple Icons ---
      const BRAND = {
        openshift: "#EE0000", sonatype: "#1B1C20", entityframework: "#68217A", microsoftsqlserver: "#CC2927",
        primeng: "#0C7DBE", swagger: "#85EA2D", nunit: "#2DAAE1", nuget: "#004880", microsoftazure: "#0078D4"
      };

      // --- Helpers ---
      function deviconUrl(name) {
        // Prefer original colorful; browser fetches
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;
      }

      // ===== Priority 1: Devicon colored =====
      const DEVICON = [
        { re: /\b(dotnet|\.net|net\s*core|dotnetcore)\b/i, name: "dotnetcore" },
        { re: /\basp\.?net\b|\basp\.?net\s*core\b/i, name: "dotnetcore" },
        { re: /\bc#\b|\bcsharp\b/i, name: "csharp" },
        { re: /\bweb\s*api\b/i, name: "dotnetcore" },  // .NET Web API
        { re: /\bgrafana\b/i, name: "grafana" },
        { re: /\bprometheus\b/i, name: "prometheus" },
        { re: /\bdocker\b/i, name: "docker" },
        { re: /\bbootstrap\b/i, name: "bootstrap" },
        { re: /\bjquery\b/i, name: "jquery" },
        { re: /\bkubernetes\b|\bk8s\b|\bingress\b/i, name: "kubernetes" },
        { re: /\bnginx\b|\bwaf\b/i, name: "nginx" },
        { re: /\bredis\b/i, name: "redis" },
        { re: /\bpostgres\b|\bpostgresql\b/i, name: "postgresql" },
        { re: /\bmysql\b|\bmariadb\b/i, name: "mysql" },
        { re: /\bmongo(db)?\b/i, name: "mongodb" }
      ];

      // ===== Priority 2: Simple Icons (brand you liked) =====
      const SIMPLE = [
        { re: /\bopenshift\b/i, slug: "openshift" },
        { re: /\bnexus\b|\bsonatype\b/i, slug: "sonatype" },
        { re: /\bentity\s*framework\b|\bef\b/i, slug: "entityframework" },
        { re: /\bsql\s*server\b|\bmssql\b|\b\bsql\b/i, slug: "microsoftsqlserver" },
        { re: /\bprimeng\b/i, slug: "primeng" },
        { re: /\bswagger\b|\bopenapi\b/i, slug: "swagger" },
        { re: /\bn[\-\s]?unit\b|\bnunit\b/i, slug: "nunit" },
        { re: /\bdapper\b/i, slug: "nuget" },
        // Gateways / Azure
        { re: /\bapplication(\s+services?)?\s+gateway\b|\bapp\s*gateway\b/i, slug: "microsoftazure" },
        { re: /\bapi\s*gateway\b|\bgateway(s)?\b|\bintegration\s+gateway(s)?\b/i, slug: "microsoftazure" }
      ];

      // ===== Priority 3: Business/Concept duotones (covers your phrases) =====
      const CONCEPT = [
        // Integration themes
        { re: /\breal[\-\s]?time\s+integration\b|\brealtime\s+integration\b/i, icon: "ph:arrows-left-right-duotone", color: "#22c55e" },
        { re: /\bintegration(s)?\b/i, icon: "ph:arrows-left-right-duotone", color: "#60a5fa" },
        { re: /\bservices?\b|\bapplication\s+services?\b/i, icon: "ph:squares-four-duotone", color: "#a78bfa" },
        // Roles/operators
        { re: /\buser\s+operators?\b|\boperators?\b/i, icon: "ph:user-gear-duotone", color: "#f59e0b" },
        // General realtime
        { re: /\breal[\-\s]?time\b/i, icon: "ph:pulse-duotone", color: "#22c55e" },
      ];

      // ===== Priority 4: Generic tech duotones =====
      const GENERIC = [
        { re: /\bmvc\b|\barchitecture\b|\blayer(ed)?\b/i, icon: "ph:flow-arrow-duotone", color: "#22d3ee" },
        { re: /\bci\/?cd\b|\bpipeline(s)?\b/i, icon: "ph:arrows-clockwise-duotone", color: "#60a5fa" },
        { re: /\bthreads?\b|\bmulti[\-\s]?thread\b|\bconcurrency\b|\bbackground\s*jobs?\b/i, icon: "ph:cpu-duotone", color: "#34d399" },
        { re: /\bajax\b/i, icon: "ph:lightning-duotone", color: "#f59e0b" },
        { re: /\banalytics?\b|\bmetrics?\b|\binsights?\b/i, icon: "ph:chart-line-up-duotone", color: "#a78bfa" }
      ];

      function pick(basis) {
        const t = String(basis || "").toLowerCase();
        // Devicon first
        for (const r of DEVICON) { if (r.re.test(t)) return { kind: "img", url: deviconUrl(r.name) }; }
        // Simple brand second
        for (const r of SIMPLE) { if (r.re.test(t)) return { kind: "iconify", name: `simple-icons:${r.slug}`, color: (BRAND[r.slug] || "#6b7280") }; }
        // Conceptual duotones
        for (const r of CONCEPT) { if (r.re.test(t)) return { kind: "iconify", name: r.icon, color: r.color }; }
        // Generic duotones
        for (const r of GENERIC) { if (r.re.test(t)) return { kind: "iconify", name: r.icon, color: r.color }; }
        // Fallback (colorful)
        return { kind: "iconify", name: "ph:circles-four-duotone", color: "#94a3b8" };
      }

      // ==== Core: get SVG bubble and paint icon ====
      function getSvg() {
        try { const obj = document.getElementById('hx-svg-obj'); if (obj && obj.contentDocument) return obj.contentDocument.querySelector('svg'); } catch (_) { }
        try { return document.querySelector('#hx-svg-inline svg'); } catch (_) { }
        return null;
      }
      function findBubble(svg) {
        if (!svg) return null;
        return svg.querySelector('#hx-bubble, g[data-bubble], g[id*="bubble"]');
      }
      function ensureSlots(bubble) {
        let icoImg = bubble.querySelector('#hx-bubble-ico-img') || bubble.querySelector('image[id*="ico"]');
        let icoFO = bubble.querySelector('#hx-bubble-ico-fo') || bubble.querySelector('foreignObject[id*="ico"]');
        if (!icoImg) {
          icoImg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
          icoImg.setAttribute('id', 'hx-bubble-ico-img'); icoImg.setAttribute('width', '90'); icoImg.setAttribute('height', '90');
          bubble.insertBefore(icoImg, bubble.firstChild);
        }
        if (!icoFO) {
          icoFO = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
          icoFO.setAttribute('id', 'hx-bubble-ico-fo'); icoFO.setAttribute('width', '90'); icoFO.setAttribute('height', '90');
          bubble.insertBefore(icoFO, bubble.firstChild);
        }
        return { icoImg, icoFO };
      }
      function iconifyIntoFO(fo, name, color) {
        if (!fo) return;
        while (fo.firstChild) fo.removeChild(fo.firstChild);
        const div = document.createElement('div'); div.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
        div.style.width = '90px'; div.style.height = '90px'; div.style.display = 'flex'; div.style.alignItems = 'center'; div.style.justifyContent = 'center';
        const ic = document.createElement('iconify-icon'); ic.setAttribute('icon', name); ic.style.width = '90px'; ic.style.height = '90px'; if (color) ic.style.color = color;
        div.appendChild(ic); fo.appendChild(div);
      }
      function paint(basis) {
        const svg = getSvg(); if (!svg) return;
        const bubble = findBubble(svg); if (!bubble) return;
        const { icoImg, icoFO } = ensureSlots(bubble);
        const sol = pick(basis);
        if (sol.kind === 'img') {
          icoImg.setAttribute('href', sol.url); icoImg.setAttribute('xlink:href', sol.url);
          while (icoFO.firstChild) icoFO.removeChild(icoFO.firstChild);
        } else {
          iconifyIntoFO(icoFO, sol.name, sol.color);
          icoImg.removeAttribute('href'); icoImg.removeAttribute('xlink:href');
        }
      }

      // ---- Safe wrapper: repaint after narrator shows bubble ----
      (function bridge() {
        const prev = window.hxBubbleSvg && window.hxBubbleSvg.showAtScreen;
        window.hxBubbleSvg = window.hxBubbleSvg || {};
        window.hxBubbleSvg.showAtScreen = function (sx, sy, title, desc, kind) {
          let ret;
          if (typeof prev === 'function') {
            try { ret = prev.call(window.hxBubbleSvg, sx, sy, title, desc, kind); } catch (e) { ret = undefined; }
          }
          const basis = (kind || title || desc || '').trim();
          // microtask + small delay to catch async body content
          Promise.resolve().then(() => paint(basis));
          setTimeout(() => paint(basis), 80);
          return ret;
        };
      })();

      // ---- Gentle poller fallback (in case narrator doesn't call showAtScreen) ----
      let last = "";
      setInterval(function () {
        const svg = getSvg(); if (!svg) return;
        const bubble = findBubble(svg); if (!bubble) return;
        const body = bubble.querySelector('#hx-bubble-body-fo, foreignObject, text, tspan');
        const txt = (body && body.textContent ? body.textContent.trim() : '').slice(0, 240);
        if (!txt || txt === last) return;
        last = txt;
        paint(txt);
      }, 333);
    })();

/* ===== [INLINE SCRIPT INDEX 20] ===== */
(function () {
      const IMG = 'assets/img/icons/NUnit.svg';
      function needsFix(wrap) {
        if (!wrap) return true;
        const img = wrap.querySelector('img');
        if (!img) return true;
        const src = (img.getAttribute('src') || '').toLowerCase();
        return !(src.endsWith('/nunit.svg') || src.endsWith('nunit.svg'));
      }
      function ensureNUnitOnce(li) {
        const txt = (li.textContent || '').toLowerCase();
        if (!/\bn-?unit\b/.test(txt)) return false;
        let wrap = li.querySelector(':scope > .hx-icon');
        if (!wrap) {
          wrap = document.createElement('span');
          wrap.className = 'hx-icon';
          li.insertBefore(wrap, li.firstChild);
        }
        if (!needsFix(wrap)) return false; // already correct
        // replace any existing icon children with our local image
        while (wrap.firstChild) wrap.removeChild(wrap.firstChild);
        const img = new Image(); img.src = IMG; img.alt = 'NUnit';
        wrap.appendChild(img);
        // spacing: make sure there is a text node after icon
        if (!(li.childNodes[1] && li.childNodes[1].nodeType === 3)) {
          li.insertBefore(document.createTextNode(" "), li.childNodes[1] || null);
        }
        return true;
      }
      function scan() {
        document.querySelectorAll('li.hx-li').forEach(ensureNUnitOnce);
      }
      function ready(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true }); else fn(); }
      ready(scan);
      // Debounced observer to avoid loops
      let scheduled = false;
      const mo = new MutationObserver(() => {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => { scheduled = false; scan(); });
      });
      mo.observe(document.body || document.documentElement, { childList: true, subtree: true });
      console.log('[nunit-safe-override] installed');
    })();

/* ===== [INLINE SCRIPT INDEX 21] ===== */
(function () {
      try {
        const ICON_BASE = "assets/img/icons/";
        const MAP = [
          { rx: [/\.net(?:\s*core)?/i, /web\s*api/i, /\bapi\b/i], file: "dotnetcore.svg" },
          { rx: [/angular/i], file: "angular.svg" },
          { rx: [/openshift/i], file: "openshift.svg" },
          { rx: [/grafana/i], file: "grafana.svg" },
          { rx: [/prometheus/i], file: "prometheus.svg" },
          { rx: [/\bnexus\b/i], file: "nexus.svg" },
          { rx: [/\bsql\b/i, /sql\s*server/i, /database/i], file: "azuresqldatabase.svg" },
          { rx: [/\bredis\b/i], file: "redis.svg" },
          { rx: [/\bdocker\b/i], file: "docker.svg" },
          { rx: [/ci\/cd/i, /pipeline/i], file: "cicd.svg" },
          { rx: [/swagger/i], file: "swagger.svg" },
          { rx: [/\bn[\-\s]?unit\b/i], file: "NUnit.svg" },
          { rx: [/\bmvc\b/i, /entity\s*framework/i, /\bframework\b/i], file: "framework.svg" },
          { rx: [/background\s*jobs?/i, /\bjobs?\b/i], file: "background-jobs.svg" },
          { rx: [/integration/i, /gateway/i], file: "integration-gateway.svg" },
          { rx: [/security/i, /compliance/i], file: "security.svg" }
        ];
        const GENERIC = ICON_BASE + "framework.svg";
        const EMOJI = "🧭";

        function tokens(key) {
          return (key || "").toString().match(/[A-Za-z0-9+.-]+/g)?.map(t => t.toLowerCase()) || [];
        }

        function buildCandidates(key) {
          const out = [];
          const keyStr = (key || "").toString();
          // 1) explicit mapping
          for (const m of MAP) {
            if (m.rx.some(rx => rx.test(keyStr))) { out.push(ICON_BASE + m.file); break; }
          }
          // 2) token-based: if any word matches an existing icon name
          const toks = tokens(keyStr).sort((a, b) => b.length - a.length);
          for (const t of toks) {
            const tt = t.replace(/^\.net$/, "dotnet").replace(/^netcore$/, "dotnetcore").replace(/^webapi$/, "dotnetcore");
            out.push(ICON_BASE + tt + ".svg");
            out.push(ICON_BASE + tt + ".png");
          }
          // 3) generic local fallback
          out.push(GENERIC);
          // unique
          return out.filter((v, i, a) => a.indexOf(v) === i);
        }

        function deviconClassFor(key) {
          const t = tokens(key);
          // choose the first meaningful token
          const pref = t.find(w => w.length >= 3) || "code";
          // Some mappings
          const map = { ".net": "dotnet", "web": "dotnetcore", "api": "dotnetcore" };
          const c = map[pref] || pref;
          return "devicon-" + c + "-plain colored";
        }

        // Update badge icon based on badge title/desc
        function updateBadgeIcon() {
          const badge = document.getElementById("hx-badge");
          const ico = document.getElementById("hx-badge-ico");
          const tit = document.getElementById("hx-badge-title");
          const desc = document.getElementById("hx-badge-desc");
          if (!badge || !ico || !tit || !desc) return;

          // Only when badge is visible
          if (badge.style && badge.style.display === "none") return;

          const key = [tit.textContent || "", desc.textContent || ""].join(" ").trim();
          if (!key) return;

          // Avoid thrash: only re-render if content changed
          if (ico.getAttribute("data-hx-last-key") === key && ico.querySelector("img")) return;

          // Build candidate image list
          const candidates = buildCandidates(key);
          console.log('[bubble-icon] key=', key, '→', candidates[0] || 'emoji');

          // Prepare <img> with cascading onerror
          ico.setAttribute("data-hx-last-key", key);
          ico.innerHTML = "";
          const img = document.createElement("img");
          img.width = 28; img.height = 28; img.alt = (key || "") + " icon";
          img.style.verticalAlign = "middle";

          let i = 0;
          function tryNext() {
            if (i >= candidates.length) {
              // fallback to devicon only if stylesheet present
              const hasDevicon = !!document.querySelector('link[href*="devicon"]');
              if (hasDevicon) {
                const cls = deviconClassFor(key);
                ico.innerHTML = '<i class="' + cls + '"></i>';
                console.log('[bubble-icon] key=', key, '→', cls);
              } else {
                ico.textContent = EMOJI;
              }
              return;
            }
            const href = candidates[i++];
            img.onerror = function () { console.warn('[bubble-icon] load fail', href, '→ fallback'); tryNext(); };
            img.onload = function () { /* ok */ };
            img.src = href;
          }
          tryNext();
          ico.appendChild(img);
        }

        // Lightweight refresher: ensure our icon wins even if narrator writes '#'/devicon later
        let lastVisible = '';
        setInterval(function () {
          try {
            updateBadgeIcon();
          } catch (e) { }
        }, 180);
      } catch (e) { }
    })();

/* ===== [INLINE SCRIPT INDEX 22] ===== */
(function () {
      'use strict';

      // Root-absolute, full-URL lock for bubble icons (prevents any base href doubling)
      var ROOT_BASE = '/assets/img/Icons/';
      var ORIGIN_BASE = (location.origin || '') + ROOT_BASE;
      var DEFAULT_FILE = 'framework.png';

      function absUrl(filename) {
        var f = String(filename || '').split('/').pop() || DEFAULT_FILE;
        try { f = encodeURIComponent(decodeURIComponent(f)); } catch (_) { f = encodeURIComponent(f); }
        return ORIGIN_BASE + f;
      }

      function setImgAbs(el, filename) {
        var url = absUrl(filename);
        el.setAttributeNS('http://www.w3.org/1999/xlink', 'href', url);
        el.setAttribute('href', url);
        el.onerror = function () {
          var fb = absUrl(DEFAULT_FILE);
          el.setAttributeNS('http://www.w3.org/1999/xlink', 'href', fb);
          el.setAttribute('href', fb);
          el.onerror = null;
        };
      }

      // Canonicalize any later changes under #hx-bubble to absolute URLs
      function installCanonicalizer() {
        try {
          var proto = window.SVGImageElement && window.SVGImageElement.prototype;
          if (!proto || proto.__hxAbsPatched) return;
          var _setAttr = proto.setAttribute;
          var _setAttrNS = proto.setAttributeNS;
          function isBubbleImg(el) { try { return !!(el && el.closest && el.closest('#hx-bubble')); } catch (_) { return false; } }
          proto.setAttribute = function (name, value) {
            if ((name === 'href' || name === 'xlink:href') && isBubbleImg(this)) {
              value = absUrl(value);
            }
            return _setAttr.call(this, name, value);
          };
          proto.setAttributeNS = function (ns, name, value) {
            if (name === 'href' && isBubbleImg(this)) {
              value = absUrl(value);
            }
            return _setAttrNS.call(this, ns, name, value);
          };
          proto.__hxAbsPatched = true;
        } catch (_) { }
      }

      function ensureSvgBubble() {
        var svgs = Array.prototype.slice.call(document.querySelectorAll('svg'));
        var target = null, maxA = -1;
        for (var i = 0; i < svgs.length; i++) {
          var bb = svgs[i].getBoundingClientRect();
          var area = Math.max(0, bb.width) * Math.max(0, bb.height);
          if (area > maxA && bb.width > 0 && bb.height > 0) { target = svgs[i]; maxA = area; }
        }
        if (!target) {
          try { var obj = document.getElementById('hx-svg-obj'); if (obj && obj.contentDocument) target = obj.contentDocument.querySelector('svg'); } catch (_) { }
        }
        if (!target) return null;
        var doc = target.ownerDocument || document;
        var overlay = target.querySelector('#hx-overlay-layer');
        if (!overlay) {
          overlay = doc.createElementNS('http://www.w3.org/2000/svg', 'g');
          overlay.setAttribute('id', 'hx-overlay-layer');
          overlay.setAttribute('pointer-events', 'none');
          (target.querySelector('.svg-pan-zoom_viewport') || target).appendChild(overlay);
        }
        var g = target.querySelector('#hx-bubble');
        if (!g) {
          g = doc.createElementNS('http://www.w3.org/2000/svg', 'g');
          g.setAttribute('id', 'hx-bubble'); g.style.display = 'none'; overlay.appendChild(g);

          var bg = doc.createElementNS('http://www.w3.org/2000/svg', 'rect');
          bg.setAttribute('id', 'hx-bubble-bg'); bg.setAttribute('rx', '10'); bg.setAttribute('ry', '10');
          bg.setAttribute('fill', '#111827'); bg.setAttribute('stroke', '#0ea5e9'); bg.setAttribute('stroke-width', '1.25'); bg.setAttribute('opacity', '0.96');
          g.appendChild(bg);

          var wrap = doc.createElementNS('http://www.w3.org/2000/svg', 'g');
          wrap.setAttribute('id', 'hx-bubble-ico-wrap'); g.appendChild(wrap);

          var ico = doc.createElementNS('http://www.w3.org/2000/svg', 'image');
          ico.setAttribute('id', 'hx-bubble-ico-img');
          ico.setAttribute('x', '16'); ico.setAttribute('y', '16');
          ico.setAttribute('width', '28'); ico.setAttribute('height', '28');
          ico.setAttribute('preserveAspectRatio', 'xMidYMid meet');
          wrap.appendChild(ico);

          var txt = doc.createElementNS('http://www.w3.org/2000/svg', 'text');
          txt.setAttribute('id', 'hx-bubble-ico'); txt.setAttribute('x', '20'); txt.setAttribute('y', '38');
          txt.setAttribute('fill', '#fff'); txt.setAttribute('font-size', '20'); txt.setAttribute('font-family', 'system-ui,Segoe UI,Roboto,Arial');
          txt.setAttribute('display', 'none'); wrap.appendChild(txt);

          var body = doc.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
          body.setAttribute('id', 'hx-bubble-body-fo'); body.setAttribute('x', '64'); body.setAttribute('y', '12');
          body.setAttribute('width', '320'); body.setAttribute('height', '120');
          var div = doc.createElementNS('http://www.w3.org/1999/xhtml', 'div'); div.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
          div.style.cssText = 'color:#e5e7eb;font:500 14px/1.45 ui-sans-serif,system-ui;'; body.appendChild(div);
          g.appendChild(body);

          var tip = doc.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          tip.setAttribute('id', 'hx-bubble-tip'); tip.setAttribute('fill', '#111827'); tip.setAttribute('stroke', '#0ea5e9'); tip.setAttribute('stroke-width', '1.25');
          g.appendChild(tip);
        }
        return g;
      }

      function resolveIconAsset(titleText, iconText) {
        var key = ((iconText || '') + ' ' + (titleText || '')).toLowerCase();
        var out = [];
        function has(s) { return key.indexOf(s) !== -1; }
        function add() { for (var i = 0; i < arguments.length && out.length < 3; i++) { if (out.indexOf(arguments[i]) === -1) out.push(arguments[i]); } }

        if (has('openshift') && has('gateway')) add('openshift gateway.png');
        if (has('.net') || has(' net ') || has('net core') || has('dotnet') || has('framework')) add('NET core.svg');
        if (has('web api') || has('openapi') || has('swagger') || has(' api ')) add('web api.svg', 'api.svg');

        var MAP = [
          [['angular'], ['Angular.svg']],
          [['grafana'], ['Grafana.svg']],
          [['prometheus'], ['Prometheus.svg']],
          [[' nexus ', 'nexus', 'sonatype'], ['nexus.svg', 'sonatype.svg']],
          [['sql server', ' database ', ' azure sql ', ' sql '], ['sql server.svg', 'Azure SQL Database.svg']],
          [['redis'], ['Redis.svg']],
          [['docker'], ['Docker.svg']],
          [['ci/cd', 'pipeline', 'pipelines'], ['pipelines.png', 'CI CD.svg']],
          [['swagger', 'openapi'], ['Swagger.svg', 'OpenAPI.svg']],
          [['nunit', 'n-unit', ' n unit '], ['nunit.svg']],
          [['mvc', 'entity framework', ' framework '], ['framework.png', 'mvc.png']],
          [['background job', 'background', 'jobs'], ['background jobs.png']],
          [['integration', 'gateway'], ['integration gateway.svg', 'gateway.png', 'api gateway.svg']],
          [['security', ' compliance '], ['security.png', 'compliance.png']],
          [['azure devops'], ['Azure Devops.svg']],
          [['app services'], ['app services.svg']],
          [[' azure '], ['Azure.svg']],
          [['kubernetes'], ['kubernetes.svg']],
          [['ingress'], ['ingress.svg']],
          [['nginx'], ['nginx.svg']],
          [['mongodb'], ['MongoDB.svg']],
          [['mysql'], ['MySQL.svg']],
          [['postgres', 'postgresql'], ['PostgresSQL.svg']],
          [['jquery'], ['jquery.svg']],
          [[' json '], ['JSON.svg']],
          [['bootstrap'], ['bootstrap.svg']],
          [['insights', 'observability'], ['insights.png']],
          [['monitoring'], ['monitoring.png']],
          [['performance'], ['performance_11670215.png']],
          [['network'], ['network_traffic.png']],
          [['load'], ['load_balancing.png']],
          [['artifact'], ['artifacts.png']],
          [['repository'], ['repository.png']],
          [['portal'], ['portal.png']],
          [[' user '], ['user.png']],
          [['services'], ['services.png']],
          [['frontend'], ['frontend.png']],
          [['data', 'analytics', 'metrics'], ['analytics.png', 'data.png']],
          [['partners'], ['partners.png']],
          [['primeng'], ['primeng.svg']],
          [['linq2sql', 'linq'], ['linq2sql.svg']],
          [['dapper'], ['dapper.png']],
          [[' web '], ['web.svg', 'web.png']],
          [['openshift'], ['openshift1.png']]
        ];
        for (var i = 0; i < MAP.length && out.length < 3; i++) {
          var kws = MAP[i][0], files = MAP[i][1];
          for (var j = 0; j < kws.length; j++) {
            if (has(kws[j])) { for (var t = 0; t < files.length && out.length < 3; t++) { add(files[t]); } break; }
          }
        }
        if (!out.length) { out.push(DEFAULT_FILE); }
        return { files: out.slice(0, 3) }; // return filenames only
      }

      function showSvgBadgeAtScreen(sx, sy, title, desc, iconText) {
        installCanonicalizer();
        var g = ensureSvgBubble(); if (!g) return null;
        var svg = g.ownerSVGElement || (g.closest && g.closest('svg')); if (!svg) return null;

        var vb = svg.viewBox && svg.viewBox.baseVal;
        var svgW = vb ? vb.width : (svg.getBoundingClientRect().width || 1200);
        var svgH = vb ? vb.height : (svg.getBoundingClientRect().height || 600);
        sx = (typeof sx === 'number' && isFinite(sx)) ? sx : svgW / 2;
        sy = (typeof sy === 'number' && isFinite(sy)) ? sy : svgH / 2;

        var bg = g.querySelector('#hx-bubble-bg'), tip = g.querySelector('#hx-bubble-tip'), body = g.querySelector('#hx-bubble-body-fo');
        var wrap = g.querySelector('#hx-bubble-ico-wrap'), ico = g.querySelector('#hx-bubble-ico-img'), txt = g.querySelector('#hx-bubble-ico');

        // Resolve icons (filenames), set absolute URLs
        var asset = resolveIconAsset(title || desc || '', iconText);
        // Remove previous stacked
        Array.prototype.slice.call(wrap.querySelectorAll('image[data-bubble-icon="1"]'))
          .forEach(function (n) { if (n !== ico) n.remove(); });

        if (asset && asset.files && asset.files.length) {
          txt.setAttribute('display', 'none');
          ico.setAttribute('display', 'block');
          setImgAbs(ico, asset.files[0]);
          var x = parseFloat(ico.getAttribute('x') || '16');
          var y = parseFloat(ico.getAttribute('y') || '16');
          var h = 28, w = 28, gap = 7;
          for (var i = 1; i < Math.min(3, asset.files.length); i++) {
            var im = svg.createElementNS('http://www.w3.org/2000/svg', 'image');
            im.setAttribute('x', String(x));
            im.setAttribute('y', String(y + i * (h + gap)));
            im.setAttribute('width', String(w));
            im.setAttribute('height', String(h));
            im.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            im.setAttribute('data-bubble-icon', '1');
            setImgAbs(im, asset.files[i]);
            wrap.appendChild(im);
          }
        } else {
          txt.setAttribute('display', 'none');
          ico.setAttribute('display', 'block');
          setImgAbs(ico, DEFAULT_FILE);
        }

        // Text content
        var div = body && body.firstChild;
        if (div) {
          div.innerHTML = '<div style="font-weight:700;margin-bottom:6px;color:#fff;">' + (title || '') +
            '</div><div style="opacity:.9;">' + (desc || '') + '</div>';
        }

        // Layout & clamping
        var minW = 320, bubbleW = minW + 72;
        body.setAttribute('x', '64'); body.setAttribute('width', String(minW)); body.setAttribute('y', '12');
        var bubbleH = 120; try { var bb = body.getBBox(); bubbleH = Math.max(64, bb.height + 24); } catch (_) { }
        bg.setAttribute('x', '8'); bg.setAttribute('y', '8'); bg.setAttribute('width', String(bubbleW)); bg.setAttribute('height', String(bubbleH));
        var tipY = bubbleH / 2; tip.setAttribute('points', (8) + ',' + (tipY - 8) + ' ' + (8) + ',' + (tipY + 8) + ' ' + (24) + ',' + (tipY));

        var left = sx + 14, top = sy - 20;
        var gx = Math.max(0, Math.min(svgW - bubbleW - 4, left));
        var gy = Math.max(0, Math.min(svgH - bubbleH - 4, top));
        g.setAttribute('transform', 'translate(' + gx + ',' + gy + ')');
        g.style.display = 'block'; g.removeAttribute('visibility'); g.removeAttribute('opacity');
        return g;
      }

      function showSvgBadgeForEl(el, title, desc, iconText) {
        if (!el) return null;
        var g = ensureSvgBubble(); if (!g) return null;
        var svg = g.ownerSVGElement || document.querySelector('svg'); if (!svg) return null;
        var pt = svg.createSVGPoint();
        var r = el.getBoundingClientRect();
        var cX = r.left + (r.width / 2);
        var cY = r.top + (r.height / 2);
        var ct = svg.getScreenCTM();
        if (ct && ct.inverse) {
          pt.x = cX; pt.y = cY;
          var svgP = pt.matrixTransform(ct.inverse());
          return showSvgBadgeAtScreen(svgP.x, svgP.y, title, desc, iconText);
        }
        return null;
      }

      // Expose only the bubble helpers
      window.ensureSvgBubble = ensureSvgBubble;
      window.showSvgBadgeAtScreen = showSvgBadgeAtScreen;
      window.showSvgBadgeForEl = showSvgBadgeForEl;
      window.resolveIconAsset = resolveIconAsset;
    })();

/* ===== [INLINE SCRIPT INDEX 23] ===== */
/* ultratrace disabled by FINAL patch */

/* ===== [INLINE SCRIPT INDEX 24] ===== */
(function () {
      'use strict';
      var XLINK = 'http://www.w3.org/1999/xlink';
      var ICON_BASE = '/assets/img/Icons/';
      var DEFAULT_FILE = 'framework.png';

      function absUrl(name) {
        var f = String(name || '').split('/').pop() || DEFAULT_FILE;
        try { f = encodeURIComponent(decodeURIComponent(f)); } catch (_) { f = encodeURIComponent(f); }
        return (location.origin || '') + ICON_BASE + f;
      }
      function serializeNode(el) {
        try { if (el && el.outerHTML) return el.outerHTML; return new XMLSerializer().serializeToString(el); } catch (_) { return '<node/>'; }
      }
      function stack() { try { return new Error().stack || ''; } catch (_) { return ''; } }
      function isBubbleImage(el) { try { return !!(el && el.tagName && el.tagName.toLowerCase() === 'image' && el.closest && el.closest('#hx-bubble')); } catch (_) { return false; } }

      var SLUG2LOCAL = {
        'azure': 'Azure.svg', 'azuredevops': 'Azure Devops.svg', 'angular': 'Angular.svg', 'angularjs': 'Angular.svg',
        'docker': 'Docker.svg', 'grafana': 'Grafana.svg', 'prometheus': 'Prometheus.svg', 'kubernetes': 'kubernetes.svg',
        'nginx': 'nginx.svg', 'redis': 'Redis.svg', 'mysql': 'MySQL.svg', 'mongodb': 'MongoDB.svg', 'postgres': 'PostgresSQL.svg',
        'postgresql': 'PostgresSQL.svg', 'jquery': 'jquery.svg', 'bootstrap': 'bootstrap.svg', 'swagger': 'Swagger.svg',
        'openapi': 'OpenAPI.svg', 'nunit': 'nunit.svg', 'primeng': 'primeng.svg', 'portal': 'portal.png', 'pipelines': 'pipelines.png',
        'cicd': 'CI CD.svg', 'ingress': 'ingress.svg'
      };
      function localFromExternal(url, keyText) {
        try {
          var u = String(url || '').toLowerCase();
          if (!(u.startsWith('http://') || u.startsWith('https://'))) return null;
          var last = (u.split('/').pop() || '').split('?')[0].split('#')[0];
          var slug = last.replace(/\.(svg|png|jpg|jpeg|webp)$/, '').split('-')[0].split('_')[0];
          if (SLUG2LOCAL[slug]) return SLUG2LOCAL[slug];
          var key = (keyText || '').toLowerCase();
          for (var k in SLUG2LOCAL) { if (Object.prototype.hasOwnProperty.call(SLUG2LOCAL, k) && key.indexOf(k) !== -1) return SLUG2LOCAL[k]; }
        } catch (_) { }
        return DEFAULT_FILE;
      }

      function log(kind, el, note) {
        try {
          var href = el.getAttribute('href') || (el.getAttributeNS && el.getAttributeNS(XLINK, 'href')) || '(none)';
          console.warn('[bubble-ultra]', kind, note ? ('— ' + note) : '', '\nTAG:', serializeNode(el), '\nHREF:', href, '\nSTACK:\n' + stack());
        } catch (_) { }
      }

      // ---- 1) Proto trap with REWRITE on-the-fly ----
      (function trapSetters() {
        var P = window.SVGImageElement && window.SVGImageElement.prototype;
        if (!P || P.__hxTrapRewrite) return;
        var _setA = P.setAttribute, _setANS = P.setAttributeNS;
        P.setAttribute = function (name, val) {
          if (isBubbleImage(this) && (name === 'href' || name === 'xlink:href')) {
            log('setAttribute(' + name + ')', this, 'incoming=' + val);
            if (/^https?:\/\//i.test(String(val || ''))) {
              var local = localFromExternal(val, '');
              var abs = absUrl(local);
              _setANS.call(this, XLINK, 'href', abs);
              _setA.call(this, 'href', abs);
              log('trap-rewrite', this, 'FROM=' + val + ' TO=' + abs);
              return;
            }
          }
          return _setA.call(this, name, val);
        };
        P.setAttributeNS = function (ns, name, val) {
          if (isBubbleImage(this) && name === 'href') {
            log('setAttributeNS(' + name + ')', this, 'incoming=' + val);
            if (/^https?:\/\//i.test(String(val || ''))) {
              var local = localFromExternal(val, '');
              var abs = absUrl(local);
              _setANS.call(this, XLINK, 'href', abs);
              _setA.call(this, 'href', abs);
              log('trap-rewrite', this, 'FROM=' + val + ' TO=' + abs);
              return;
            }
          }
          return _setANS.call(this, ns, name, val);
        };
        P.__hxTrapRewrite = true;
      })();

      // ---- 2) Wrap future assignments to window.showSvgBadgeAtScreen ----
      (function wrapShowSetter() {
        var _orig = Object.getOwnPropertyDescriptor(window, 'showSvgBadgeAtScreen');
        var current = window.showSvgBadgeAtScreen;
        function wrap(fn) {
          if (typeof fn !== 'function') return fn;
          if (fn.__hxWrapped) return fn;
          var w = function (sx, sy, title, desc, iconText) {
            var g = fn.apply(this, arguments);
            try {
              var imgs = g && g.querySelectorAll ? g.querySelectorAll('#hx-bubble image') : null;
              if (imgs) { for (var i = 0; i < imgs.length; i++) { log('after-draw', imgs[i], 'key="' + [iconText || '', title || '', desc || ''].join(' ').trim() + '"'); } }
            } catch (_) { }
            return g;
          };
          w.__hxWrapped = true;
          return w;
        }
        var initial = wrap(current);
        if (initial && initial !== current) window.showSvgBadgeAtScreen = initial;
        try {
          Object.defineProperty(window, 'showSvgBadgeAtScreen', {
            configurable: true,
            enumerable: true,
            get: function () { return initial || current || undefined; },
            set: function (v) {
              current = v;
              initial = wrap(v);
              return true;
            }
          });
        } catch (_) { /* defineProperty may fail in some environments; ignore */ }
      })();

      // ---- 3) MutationObserver for #hx-bubble to log adds/changes ----
      (function observeBubble() {
        function attach(g) {
          if (!g || g.__hxObs) return;
          var mo = new MutationObserver(function (muts) {
            for (var i = 0; i < muts.length; i++) {
              var m = muts[i];
              if (m.type === 'attributes' && (m.attributeName === 'href' || m.attributeName === 'xlink:href')) {
                if (isBubbleImage(m.target)) log('mo-attr:' + m.attributeName, m.target);
              } else if (m.type === 'childList') {
                var add = m.addedNodes || [];
                for (var j = 0; j < add.length; j++) {
                  var n = add[j];
                  if (!n) continue;
                  if (isBubbleImage(n)) log('mo-add', n);
                  else if (n.querySelectorAll) {
                    var imgs = n.querySelectorAll('image');
                    for (var k = 0; k < imgs.length; k++) { if (isBubbleImage(imgs[k])) log('mo-add', imgs[k]); }
                  }
                }
              }
            }
          });
          mo.observe(g, { subtree: true, attributes: true, attributeFilter: ['href', 'xlink:href'], childList: true });
          g.__hxObs = mo;
        }
        var gNow = document.querySelector('#hx-bubble'); if (gNow) attach(gNow);
        new MutationObserver(function (muts) {
          for (var i = 0; i < muts.length; i++) {
            var m = muts[i];
            if (m.type !== 'childList') continue;
            for (var j = 0; j < (m.addedNodes || []).length; j++) {
              var n = m.addedNodes[j]; if (!n) continue;
              if (n.id === 'hx-bubble') attach(n);
              else if (n.querySelector) { var gb = n.querySelector('#hx-bubble'); if (gb) attach(gb); }
            }
          }
        }).observe(document.documentElement || document.body, { subtree: true, childList: true });
      })();

      // Manual helper for you
      window.hxBubbleDump = function () {
        var imgs = document.querySelectorAll('#hx-bubble image');
        for (var i = 0; i < imgs.length; i++) { log('dump', imgs[i]); }
        return imgs.length;
      };
    })();

/* ===== [INLINE SCRIPT INDEX 25] ===== */
/* ===== BUBBLE-ONLY FINAL OVERRIDE (icons+positioning) ===== */
    (function () {
      'use strict';
      var XLINK = 'http://www.w3.org/1999/xlink';
      var ICON_BASE = 'assets/img/Icons/'; // RELATIVE, same-origin
      var ABS_ICON_BASE = (location.origin || '') + '/' + ICON_BASE.replace(/^\/+/, '');
      var FALLBACK_FILE = 'framework.png';

      function toAbsLocal(file) {
        var f = (file || FALLBACK_FILE).replace(/^\/+/, '');
        try { f = encodeURIComponent(decodeURIComponent(f)); } catch (_) { f = encodeURIComponent(f); }
        return ABS_ICON_BASE + f;
      }

      function ensureSvgBubble() {
        // pick the largest visible <svg>
        var svgs = Array.prototype.slice.call(document.querySelectorAll('svg'));
        var best = null, bestArea = -1;
        for (var i = 0; i < svgs.length; i++) {
          var s = svgs[i];
          if (!s || !s.getBoundingClientRect) continue;
          var r = s.getBoundingClientRect();
          var area = (r.width || 0) * (r.height || 0);
          if (area > bestArea && r.width > 0 && r.height > 0 && s.offsetParent !== null) { best = s; bestArea = area; }
        }
        if (!best) return null;

        // overlay layer on panzoom group if present
        var vp = best.querySelector('.svg-pan-zoom_viewport') || best;
        var overlay = best.querySelector('#hx-overlay-layer');
        if (!overlay) {
          overlay = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          overlay.setAttribute('id', 'hx-overlay-layer');
          overlay.setAttribute('pointer-events', 'none');
          (vp || best).appendChild(overlay);
        }

        var g = best.querySelector('#hx-bubble');
        if (!g) {
          g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          g.setAttribute('id', 'hx-bubble');
          overlay.appendChild(g);

          var bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          bg.setAttribute('id', 'hx-bubble-bg');
          bg.setAttribute('rx', '10'); bg.setAttribute('ry', '10');
          bg.setAttribute('fill', '#111'); bg.setAttribute('fill-opacity', '0.88');
          bg.setAttribute('stroke', '#2b8cff'); bg.setAttribute('stroke-opacity', '0.6');
          g.appendChild(bg);

          var icoWrap = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          icoWrap.setAttribute('id', 'hx-bubble-ico-wrap');
          g.appendChild(icoWrap);

          var ico = document.createElementNS('http://www.w3.org/2000/svg', 'image');
          ico.setAttribute('id', 'hx-bubble-ico-img');
          icoWrap.appendChild(ico);

          var tip = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          tip.setAttribute('id', 'hx-bubble-tip');
          tip.setAttribute('points', '0,0 10,10 -10,10');
          tip.setAttribute('fill', '#111'); tip.setAttribute('fill-opacity', '0.88');
          tip.setAttribute('stroke', '#2b8cff'); tip.setAttribute('stroke-opacity', '0.6');
          g.appendChild(tip);

          var body = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
          body.setAttribute('id', 'hx-bubble-body-fo');
          body.setAttribute('requiredExtensions', 'http://www.w3.org/1999/xhtml');
          g.appendChild(body);

          var bodyDiv = document.createElement('div');
          bodyDiv.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
          bodyDiv.style.font = '500 14px/1.42 system-ui, -apple-system, Segoe UI, Roboto, Arial';
          bodyDiv.style.color = '#eef';
          bodyDiv.style.padding = '0';
          bodyDiv.style.margin = '0';
          bodyDiv.innerHTML = ''; // existing narration renderer will fill if it wants; we keep empty-safe
          body.appendChild(bodyDiv);
        } else {
          // re-parent to overlay to ensure it's inside svg, not fixed to screen
          if (g.parentNode !== overlay) overlay.appendChild(g);
        }
        return g;
      }

      // Map keywords -> file names (case-insensitive contains)
      var MAP = [
        [/\.net|dotnetcore|dotnet|c#|web api\b|api\b/i, ['NET core.svg', 'web api.svg', 'api.svg']],
        [/angular|angularjs/i, ['Angular.svg']],
        [/openshift.*gateway|gateway.*openshift/i, ['openshift gateway.png']],
        [/openshift|redhat/i, ['openshift1.png']],
        [/grafana/i, ['Grafana.svg']],
        [/prometheus/i, ['Prometheus.svg']],
        /\b(nexus|sonatype)\b/i, ['nexus.svg', 'sonatype.svg'],
        /\bsql server\b|\bdatabase\b|\bsql\b/i, ['sql server.svg', 'Azure SQL Database.svg'],
        [/redis\b/i, ['Redis.svg']],
        [/docker\b/i, ['Docker.svg']],
        /\b(ci\/?cd|pipeline|pipelines)\b/i, ['pipelines.png', 'CI CD.svg'],
        /\bswagger\b/i, ['Swagger.svg'],
        /\bopenapi\b/i, ['OpenAPI.svg'],
        /\bnunit\b/i, ['nunit.svg'],
        /\bmvc\b|\bentity framework\b|\bframework\b/i, ['framework.png', 'mvc.png'],
        /\bbackground jobs?\b/i, ['background jobs.png'],
        /\bintegration\b|\bgateway\b/i, ['integration gateway.svg', 'gateway.png', 'api gateway.svg'],
        /\bsecurity\b/i, ['security.png'],
        /\bcompliance\b/i, ['compliance.png'],
        /\bazure dev ?ops\b/i, ['Azure Devops.svg'],
        /\bapp services?\b/i, ['app services.svg'],
        /\bazure\b/i, ['Azure.svg'],
        /\bkubernetes\b/i, ['kubernetes.svg'],
        /\bingress\b/i, ['ingress.svg'],
        /\bnginx\b/i, ['nginx.svg'],
        /\bmongodb\b/i, ['MongoDB.svg'],
        /\bmysql\b/i, ['MySQL.svg'],
        /\bpostgres|postgresql\b/i, ['PostgresSQL.svg'],
        /\bjquery\b/i, ['jquery.svg'],
        /\bjson\b/i, ['JSON.svg'],
        /\bbootstrap\b/i, ['bootstrap.svg'],
        /\binsights?\b|\bobservability\b|\bmonitoring\b/i, ['insights.png', 'monitoring.png'],
        /\bperformance\b/i, ['performance_11670215.png'],
        /\bnetwork\b/i, ['network_traffic.png'],
        /\bload\b|\bbalance\b/i, ['load_balancing.png'],
        /\bartifacts?\b/i, ['artifacts.png'],
        /\brepository\b/i, ['repository.png'],
        /\bportal\b/i, ['portal.png'],
        /\buser\b/i, ['user.png'],
        /\bservices?\b/i, ['services.png'],
        /\bfrontend\b/i, ['frontend.png'],
        /\bdata\b|\banalytics\b|\bmetrics\b/i, ['analytics.png', 'data.png'],
        /\bpartners?\b/i, ['partners.png'],
        /\bprimeng\b/i, ['primeng.svg']
      ];

      function resolveIconAsset(titleText, iconText) {
        var key = (String(iconText || '') + ' ' + String(titleText || '')).toLowerCase();
        var files = [];
        function push(name) {
          if (!name) return;
          if (files.indexOf(name) === -1) files.push(name);
        }
        for (var i = 0; i < MAP.length; i++) {
          var entry = MAP[i];
          var rx = entry[0], arr = entry[1];
          if (rx.test(key)) {
            for (var j = 0; j < arr.length; j++) push(arr[j]);
          }
        }
        // Special: if key mentions api and .net, ensure api icon is included
        if (/\bapi\b/i.test(key) && /\.net|dotnet|c#/i.test(key)) {
          push('web api.svg'); push('api.svg');
        }
        // Limit to 3
        files = files.slice(0, 3);
        if (files.length === 0) {
          return { emoji: '🔧' };
        }
        return { imgUrls: files.map(toAbsLocal) };
      }

      // Create onerror fallback handler for SVG <image>
      function attachImgFallback(img) {
        if (!img || img.__hxOnErr) return;
        img.addEventListener('error', function (ev) {
          try {
            var fb = toAbsLocal(FALLBACK_FILE);
            console.warn('[bubble-icon] load fail', (img.href && img.href.baseVal) || img.getAttribute('href'), '→ fallback');
            img.setAttributeNS(XLINK, 'href', fb);
            img.setAttribute('href', fb);
            img.removeAttribute('onerror');
          } catch (_) { }
        }, { once: false });
        img.__hxOnErr = true;
      }

      function normalizeBubble(g, title, desc, iconText, opt) {
        opt = opt || {};
        if (!g) return null;
        var svg = g.closest('svg'); if (!svg) return null;

        // ensure structure
        var bg = g.querySelector('#hx-bubble-bg');
        var icoWrap = g.querySelector('#hx-bubble-ico-wrap');
        var ico = g.querySelector('#hx-bubble-ico-img');
        var bodyFo = g.querySelector('#hx-bubble-body-fo');
        var tip = g.querySelector('#hx-bubble-tip');
        if (!bg || !icoWrap || !ico || !bodyFo || !tip) return g; // keep safe

        // Resolve local icons only
        var res = resolveIconAsset(title || '', iconText || '');
        var urls = (res && res.imgUrls) ? res.imgUrls : [];
        var useEmoji = (!urls || urls.length === 0);

        // Widen bubble & padding
        var MIN_W = 320;        // min width
        var PAD_L = 16;         // outer left padding
        var PAD_R = 16;         // outer right padding
        var COL_W = 28;         // icon column width
        var GAP_I = 8;          // gap between stacked icons
        var GAP_COL_TXT = 12;   // gap between icon column and text
        var TXT_X = PAD_L + COL_W + GAP_COL_TXT; // ≥64 as requested

        // Icon placement
        ico.setAttribute('x', String(PAD_L));
        ico.setAttribute('y', String(PAD_L));
        ico.setAttribute('width', String(COL_W));
        ico.setAttribute('height', String(COL_W));
        ico.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        // assign primary image
        if (!useEmoji) {
          ico.removeAttribute('display');
          var u0 = urls[0];
          ico.setAttributeNS(XLINK, 'href', u0);
          ico.setAttribute('href', u0);
          attachImgFallback(ico);
        } else {
          // fallback emoji: render as plain text inside body
          ico.setAttribute('display', 'none');
        }

        // Remove old stacked icons
        Array.prototype.slice.call(icoWrap.querySelectorAll('image[data-bubble-icon="1"]')).forEach(function (n) { n.parentNode && n.parentNode.removeChild(n); });

        // Add stacked icons (up to 2 more)
        for (var i = 1; !useEmoji && i < urls.length && i < 3; i++) {
          var extra = document.createElementNS('http://www.w3.org/2000/svg', 'image');
          extra.setAttribute('data-bubble-icon', '1');
          extra.setAttribute('x', String(PAD_L));
          extra.setAttribute('y', String(PAD_L + i * (COL_W + GAP_I)));
          extra.setAttribute('width', String(COL_W));
          extra.setAttribute('height', String(COL_W));
          extra.setAttribute('preserveAspectRatio', 'xMidYMid meet');
          extra.setAttributeNS(XLINK, 'href', urls[i]);
          extra.setAttribute('href', urls[i]);
          attachImgFallback(extra);
          icoWrap.appendChild(extra);
        }

        // Position and size the body foreignObject
        var bodyWidth = Math.max(MIN_W - TXT_X - PAD_R, 220);
        bodyFo.setAttribute('x', String(TXT_X));
        bodyFo.setAttribute('y', String(PAD_L));
        bodyFo.setAttribute('width', String(bodyWidth));

        // Compute approximate height: use existing body content bbox if possible
        var bodyDiv = bodyFo.firstElementChild;
        var txtH = 60;
        try {
          if (bodyDiv && bodyDiv.getBoundingClientRect) {
            var r = bodyDiv.getBoundingClientRect();
            txtH = Math.max(40, Math.ceil(r.height));
          }
        } catch (_) { }
        var iconsColHeight = PAD_L + Math.max(COL_W, (urls ? (urls.length * (COL_W + GAP_I) - GAP_I) : COL_W)) + PAD_L;
        var contentH = Math.max(iconsColHeight, PAD_L + txtH + PAD_L);
        var W = Math.max(MIN_W, TXT_X + bodyWidth + PAD_R);
        var H = contentH;

        // Apply bg/size
        bg.setAttribute('x', '0'); bg.setAttribute('y', '0');
        bg.setAttribute('width', String(W));
        bg.setAttribute('height', String(H));

        // Tip under bubble
        var tipW = 16, tipH = 10;
        tip.setAttribute('points', '0,0 ' + tipW + ',' + tipH + ' ' + (-tipW) + ',' + tipH);
        tip.__hxW = W; tip.__hxH = H; tip.__hxTW = tipW; tip.__hxTH = tipH;

        // Make sure shown
        g.style.display = 'block'; g.removeAttribute('visibility'); g.removeAttribute('opacity');

        // Add a tiny observer to keep our icon visible & local-only (bubble scope)
        if (!g.__hxLock) {
          var mo = new MutationObserver(function (muts) {
            muts.forEach(function (m) {
              var t = m.target;
              if (t && t.tagName && t.tagName.toLowerCase() === 'image' && t.closest('#hx-bubble')) {
                var href = (t.getAttribute('href') || (t.href && t.href.baseVal) || '');
                if (/^https?:\/\//i.test(href) && href.indexOf(ABS_ICON_BASE) !== 0) {
                  var f = toAbsLocal(FALLBACK_FILE);
                  t.setAttributeNS(XLINK, 'href', f);
                  t.setAttribute('href', f);
                }
                if (t.getAttribute('display') === 'none') t.removeAttribute('display');
              }
            });
          });
          mo.observe(g, { subtree: true, attributes: true, attributeFilter: ['href', 'xlink:href', 'display'] });
          g.__hxLock = mo;
        }

        return { W: W, H: H, TXT_X: TXT_X };
      }

      function clampPlace(svg, g, targetScreenX, targetScreenY, size) {
        if (!svg || !g) return;
        var W = size.W, H = size.H, tipW = 16, tipH = 10;
        // Convert screen -> svg coords
        var pt = svg.createSVGPoint ? svg.createSVGPoint() : null;
        var ctm = svg.getScreenCTM ? svg.getScreenCTM() : null;
        var x = 0, y = 0;
        if (pt && ctm) {
          pt.x = Number(targetScreenX); pt.y = Number(targetScreenY);
          try {
            var inv = ctm.inverse();
            var p2 = pt.matrixTransform(inv);
            x = p2.x; y = p2.y;
          } catch (_) {
            // fallback: use client rect
            var r = svg.getBoundingClientRect();
            x = (Number(targetScreenX) - r.left);
            y = (Number(targetScreenY) - r.top);
          }
        } else {
          var r2 = svg.getBoundingClientRect();
          x = (Number(targetScreenX) - r2.left);
          y = (Number(targetScreenY) - r2.top);
        }

        // Clamp to viewBox if present, else to client box size in svg units (best effort)
        var vb = svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal : null;
        var maxX = (vb ? (vb.x + vb.width) : (svg.width && svg.width.baseVal ? svg.width.baseVal.value : x + 1000)) - W - 4;
        var maxY = (vb ? (vb.y + vb.height) : (svg.height && svg.height.baseVal ? svg.height.baseVal.value : y + 1000)) - (H + tipH) - 4;
        var minX = (vb ? vb.x : 0) + 4;
        var minY = (vb ? vb.y : 0) + 4;

        var finalX = Math.max(minX, Math.min(isFinite(x) ? x : 0, maxX));
        var finalY = Math.max(minY, Math.min(isFinite(y) ? y : 0, maxY));

        // Tip under the bubble
        var tip = g.querySelector('#hx-bubble-tip');
        if (tip) {
          var ty = finalY + H;
          tip.setAttribute('transform', 'translate(' + (finalX) + ',' + (ty) + ')');
        }

        g.setAttribute('transform', 'translate(' + Math.round(finalX) + ',' + Math.round(finalY) + ')');
      }

      // Wrap showSvgBadgeAtScreen so we can normalize icons, widen, and clamp placement
      (function wrapShows() {
        function wrap(fn) {
          if (typeof fn !== 'function' || fn.__hxFinalWrap) return fn;
          var w = function (sx, sy, title, desc, iconText) {
            var g = fn.apply(this, arguments);
            // Ensure right container & structure
            var g2 = ensureSvgBubble() || g;
            if (!g2) return g;
            // If original returned a different bubble, prefer existing #hx-bubble in DOM
            g = document.querySelector('#hx-bubble') || g2;
            var svg = g.closest('svg');
            // Normalize icons & layout
            var size = normalizeBubble(g, title, desc, iconText, {});
            if (size) {
              // Place relative to SVG coords so scrolling doesn't break alignment
              clampPlace(svg, g, Number(sx), Number(sy), size);
            }
            console.log('[bubble-icon] key=', (iconText || title || '').toString().trim(), '→', (size ? 'ok' : 'n/a'));
            return g;
          };
          w.__hxFinalWrap = true;
          return w;
        }
        // immediate wrap if functions already exist
        if (window.showSvgBadgeAtScreen) window.showSvgBadgeAtScreen = wrap(window.showSvgBadgeAtScreen);
        if (window.showSvgBadgeForEl) {
          var origEl = window.showSvgBadgeForEl;
          window.showSvgBadgeForEl = function (el, title, desc, iconText) {
            var svg = (el && el.ownerSVGElement) || (el && el.closest && el.closest('svg'));
            var r = el && el.getBoundingClientRect ? el.getBoundingClientRect() : null;
            var sx = r ? (r.left + r.width / 2) : (window.innerWidth / 2);
            var sy = r ? (r.top + r.height / 2) : (window.innerHeight / 2);
            var g = origEl.apply(this, arguments);
            if (window.showSvgBadgeAtScreen) window.showSvgBadgeAtScreen(sx, sy, title, desc, iconText);
            return g;
          }
        }
        // future assignments also get wrapped
        try {
          var _d = Object.getOwnPropertyDescriptor(window, 'showSvgBadgeAtScreen');
          if (!_d || !_d.configurable) {
            var cur = window.showSvgBadgeAtScreen;
            window.showSvgBadgeAtScreen = wrap(cur);
          } else {
            var cur2 = window.showSvgBadgeAtScreen;
            var wrapped = wrap(cur2);
            Object.defineProperty(window, 'showSvgBadgeAtScreen', {
              configurable: true, enumerable: true,
              get: function () { return wrapped; },
              set: function (v) { wrapped = wrap(v); }
            });
          }
        } catch (_) { }
      })();

    })();

/* ===== [INLINE SCRIPT INDEX 26] ===== */
(function () {
      var stage = document.getElementById('hx-static-stage');
      if (!stage) { return; }

      // Ensure a single badge element that lives INSIDE the stage overlay
      var badge = document.getElementById('hx-devicon-badge');
      if (!badge) {
        badge = document.createElement('div');
        badge.id = 'hx-devicon-badge';
        stage.appendChild(badge);
      }
      badge.setAttribute('data-hotfix', '1');
      badge.innerHTML = ''
        + '<div class="col-ico" id="hx-bico"></div>'
        + '<div class="col-txt">'
        + '<div class="title" id="hx-badge-title"></div>'
        + '<div class="desc" id="hx-badge-desc"></div>'
        + '</div>'
        + '<div id="hx-badge-ico" style="display:none"></div>'; // legacy placeholder (hidden)

      var titleEl = badge.querySelector('#hx-badge-title');
      var descEl = badge.querySelector('#hx-badge-desc');
      var iconsCol = badge.querySelector('#hx-bico');

      var targetEl = null;
      var rafId = 0;

      function pickIcons(keys) {
        keys = (keys || '').toString();
        var dirs = ['assets/img/icons/', 'assets/img/Icons/'];
        var generic = ['framework.svg', 'framework.png'];

        var table = [
          { rx: /azure|sql server|database/i, files: ['Azure.svg', 'azuresqldatabase.svg'] },
          { rx: /openshift/i, files: ['openshift.svg', 'openshift1.png'] },
          { rx: /grafana/i, files: ['grafana.svg'] },
          { rx: /prometheus/i, files: ['prometheus.svg'] },
          { rx: /\bnexus\b/i, files: ['nexus.svg'] },
          { rx: /\bdocker\b/i, files: ['docker.svg'] },
          { rx: /swagger/i, files: ['Swagger.svg'] },
          { rx: /n[\s-]?unit/i, files: ['NUnit.svg'] },
          { rx: /entity framework|framework/i, files: ['framework.svg', 'framework.png'] },
          { rx: /ci\/?cd|pipeline/i, files: ['CI CD.svg', 'cicd.svg'] },
          { rx: /\bredis\b/i, files: ['redis.svg'] }
        ];

        var chosen = [];
        for (var i = 0; i < table.length && chosen.length < 3; i++) {
          if (table[i].rx.test(keys)) {
            for (var j = 0; j < table[i].files.length && chosen.length < 3; j++) {
              // push with preferred dir (first one wins; we don't double-prefix)
              chosen.push(dirs[0] + table[i].files[j]);
            }
          }
        }
        if (chosen.length === 0) {
          for (var g = 0; g < generic.length && chosen.length < 1; g++) {
            chosen.push(dirs[0] + generic[g]);
          }
        }
        return chosen.slice(0, 3);
      }

      function renderIcons(srcs) {
        iconsCol.innerHTML = '';
        for (var i = 0; i < srcs.length; i++) {
          (function (src) {
            var img = new Image();
            img.width = 28; img.height = 28; img.alt = '';
            img.src = src;
            img.onerror = function () {
              // Try alternate local casing/dirs, then final local generic; no emoji/CDN unless absolutely nothing local
              var tried = [src];
              var altDir = src.replace('/icons/', '/Icons/');
              if (tried.indexOf(altDir) < 0) { tried.push(altDir); img.src = altDir; return; }
              var altDir2 = src.replace('/Icons/', '/icons/');
              if (tried.indexOf(altDir2) < 0) { tried.push(altDir2); img.src = altDir2; return; }
              var genericList = ['assets/img/icons/framework.svg', 'assets/img/Icons/framework.svg', 'assets/img/icons/framework.png', 'assets/img/Icons/framework.png'];
              for (var k = 0; k < genericList.length; k++) {
                if (tried.indexOf(genericList[k]) < 0) { img.src = genericList[k]; return; }
              }
              console.warn('[bubble-icon] load fail (no local matches) →', src);
            };
            iconsCol.appendChild(img);
          })(srcs[i]);
        }
      }

      function clampAndPlace(x, y) {
        // measure to clamp
        badge.style.left = '0px';
        badge.style.top = '0px';
        var bw = badge.offsetWidth || 320;
        var bh = badge.offsetHeight || 60;

        var pad = 8;
        var sw = stage.clientWidth;
        var sh = stage.clientHeight;

        if (x + bw > sw - pad) x = Math.max(pad, sw - pad - bw);
        if (y + bh > sh - pad) y = Math.max(pad, sh - pad - bh);
        if (x < pad) x = pad;
        if (y < pad) y = pad;

        badge.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      }

      function reflow() {
        if (!badge || badge.style.display === 'none') { return; }
        if (targetEl) {
          var sRect = stage.getBoundingClientRect();
          var tRect = targetEl.getBoundingClientRect();
          var x = (tRect.right - sRect.left) + 12;
          var y = (tRect.top - sRect.top);
          clampAndPlace(x, y);
        } else {
          // if no target, keep current transform but still ensure clamping (in case of resize)
          var sRect = stage.getBoundingClientRect();
          var matrix = getComputedStyle(badge).transform;
          // parse translate from matrix if possible
          var tx = 16, ty = 16;
          try {
            if (matrix && matrix.startsWith('matrix')) {
              var parts = matrix.replace('matrix(', '').replace(')', '').split(',');
              tx = parseFloat(parts[4]) || 16;
              ty = parseFloat(parts[5]) || 16;
            }
          } catch (_) { }
          clampAndPlace(tx, ty);
        }
      }

      function queueReflow() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(reflow);
      }

      function showForElement(el, title, desc) {
        if (!el) { return; }
        targetEl = el;
        titleEl.textContent = (title || el.getAttribute('data-title') || el.id || '').trim();
        descEl.textContent = (desc || el.getAttribute('data-desc') || '').trim();
        var key = (titleEl.textContent + ' ' + descEl.textContent).trim();
        console.log('[bubble-icon] key=', key);
        renderIcons(pickIcons(key));
        badge.style.display = 'flex';
        queueReflow();
      }

      function showAtScreen(x, y, ico, title, desc) {
        targetEl = null;
        titleEl.textContent = (title || '').trim();
        descEl.textContent = (desc || '').trim();
        var keys = (ico ? (ico + ' ') : '') + titleEl.textContent + ' ' + descEl.textContent;
        console.log('[bubble-icon] key=', keys.trim());
        renderIcons(pickIcons(keys));
        badge.style.display = 'flex';
        // convert viewport coords to stage coords
        var sRect = stage.getBoundingClientRect();
        var lx = (x - sRect.left);
        var ly = (y - sRect.top);
        clampAndPlace(lx, ly);
      }

      function hide() {
        badge.style.display = 'none';
        targetEl = null;
      }

      // keep in sync with scroll/resize/gestures
      ['scroll', 'resize', 'orientationchange'].forEach(function (ev) {
        window.addEventListener(ev, queueReflow, { passive: true });
      });
      stage.addEventListener('wheel', queueReflow, { passive: true });
      stage.addEventListener('pointermove', queueReflow, { passive: true });

      // Expose overrides compatible with existing calls
      window.showSvgBadgeForEl = showForElement;
      window.showSvgBadgeAtScreen = showAtScreen;
      window.hideSvgBadge = hide;
    })();

/* ===== [INLINE SCRIPT INDEX 27] ===== */
(function () {
      // ===== restore native Element.prototype.setAttribute / setAttributeNS (kills noisy logger) =====
      try {
        var ifr = document.createElement('iframe');
        ifr.style.display = 'none';
        document.documentElement.appendChild(ifr);
        var w = ifr.contentWindow;
        if (w && w.Element && w.Element.prototype) {
          Element.prototype.setAttribute = w.Element.prototype.setAttribute;
          Element.prototype.setAttributeNS = w.Element.prototype.setAttributeNS;
        }
        ifr.remove();
      } catch (e) { /* ignore */ }

      // ===== remove accessor wrappers if any =====
      try {
        var d1 = Object.getOwnPropertyDescriptor(window, 'showSvgBadgeAtScreen');
        if (d1 && (d1.get || d1.set)) { delete window.showSvgBadgeAtScreen; }
      } catch (e) { }
      try {
        var d2 = Object.getOwnPropertyDescriptor(window, 'showSvgBadgeForEl');
        if (d2 && (d2.get || d2.set)) { delete window.showSvgBadgeForEl; }
      } catch (e) { }

      // ===== helpers =====
      function getOverlaySvg() {
        var svg = document.getElementById('hx-overlay-layer');
        if (svg) return svg;
        var stage = document.querySelector('svg');
        if (!stage) return null;
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('id', 'hx-overlay-layer');
        svg.setAttribute('class', 'overlay');
        svg.setAttribute('style', 'position:absolute; left:0; top:0; width:100%; height:100%; pointer-events:none; overflow:visible;');
        stage.parentNode.insertBefore(svg, stage.nextSibling);
        return svg;
      }

      function ensureBadgeEl() {
        var overlay = getOverlaySvg();
        if (!overlay) return null;
        var badge = document.getElementById('hx-devicon-badge');
        if (badge) return badge;
        // HTML badge inside <foreignObject> to keep it inside the SVG overlay
        var fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        fo.setAttribute('id', 'hx-devicon-badge-fo');
        fo.setAttribute('x', '0'); fo.setAttribute('y', '0');
        fo.setAttribute('width', '10'); fo.setAttribute('height', '10');
        overlay.appendChild(fo);

        var div = document.createElement('div');
        div.id = 'hx-devicon-badge';
        div.setAttribute('data-hotfix', '1');
        div.setAttribute('data-alive', '0');
        div.setAttribute('style', 'position:absolute; pointer-events:auto;');
        div.innerHTML = ''
          + '<div class="twin-row">'
          + '  <div class="col-ico"><div class="icon-stack"></div></div>'
          + '  <div class="col-txt"><div class="tt"></div><div class="ds"></div></div>'
          + '</div>'
          + '<div class="tip"></div>';
        fo.appendChild(div);
        return div;
      }

      // local icon map (try these first)
      var FILES = {
        azure: 'assets/img/Icons/Azure.svg',
        angular: 'assets/img/Icons/Angular.svg',
        nginx: 'assets/img/Icons/nginx.svg',
        docker: 'assets/img/Icons/docker.svg',
        kubernetes: 'assets/img/Icons/kubernetes.svg',
        k8s: 'assets/img/Icons/kubernetes.svg',
        dotnet: 'assets/img/Icons/dotnetcore.svg',
        '.net': 'assets/img/Icons/dotnetcore.svg',
        redhat: 'assets/img/Icons/redhatopenshift1.png',
        openshift: 'assets/img/Icons/openshift1.png',
        sql: 'assets/img/Icons/sql.svg',
        mysql: 'assets/img/Icons/mysql.svg',
        postgres: 'assets/img/Icons/postgresql.svg',
        node: 'assets/img/Icons/nodejs.png',
        react: 'assets/img/Icons/react.svg'
      };
      var FALLBACK = 'assets/img/Icons/framework.png';

      function tokenize(a, b, c) {
        var s = [a || '', b || '', c || ''].join(' ').toLowerCase();
        s = s.replace(/[^a-z0-9\+\.\- ]+/g, ' ');
        var uniq = [];
        s.split(/\s+/).forEach(function (tok) {
          if (!tok) return;
          if (!uniq.includes(tok)) uniq.push(tok);
        });
        return uniq;
      }
      function resolveLocalIcons(a, b, c) {
        var toks = tokenize(a, b, c);
        var picks = [];
        // prefer iconText exact matches first
        [c, a, b].forEach(function (part) {
          if (!part) return;
          var key = part.trim().toLowerCase();
          if (FILES[key] && !picks.includes(FILES[key])) picks.push(FILES[key]);
        });
        toks.forEach(function (t) {
          if (FILES[t] && !picks.includes(FILES[t])) picks.push(FILES[t]);
        });
        if (!picks.length) picks.push(FILES.azure || FALLBACK); // one safe default
        return picks.slice(0, 3);
      }

      function sizeBadgeToContent(badge) {
        // measure and set FO to the badge bounds, so it clamps inside overlay
        var fo = badge.parentNode && badge.parentNode.nodeName.toLowerCase() === 'foreignobject' ? badge.parentNode : null;
        if (!fo) return;
        // ensure layout
        badge.style.visibility = 'hidden';
        badge.style.transform = 'translate3d(0,0,0)';
        // let the browser compute size
        var r = badge.getBoundingClientRect();
        var w = Math.ceil(r.width), h = Math.ceil(r.height);
        if (w < 320) w = 320;
        fo.setAttribute('width', String(w));
        fo.setAttribute('height', String(h));
        badge.style.visibility = 'visible';
      }

      function clamp(x, min, max) { return Math.max(min, Math.min(max, x)); }

      function placeBadgeAtScreen(sx, sy) {
        var overlay = getOverlaySvg();
        var fo = document.getElementById('hx-devicon-badge-fo');
        var badge = document.getElementById('hx-devicon-badge');
        if (!overlay || !fo || !badge) return;

        var orect = overlay.getBoundingClientRect();
        var br = badge.getBoundingClientRect();
        var W = orect.width, H = orect.height;
        var bx = sx - orect.left;
        var by = sy - orect.top;
        // keep a margin
        var M = 8;
        // prefer below-right
        var x = bx + 16, y = by + 16;
        x = clamp(x, M, W - br.width - M);
        y = clamp(y, M, H - br.height - M);
        // move FO itself (so it stays inside overlay coords)
        fo.setAttribute('x', String(Math.max(0, Math.floor(x))));
        fo.setAttribute('y', String(Math.max(0, Math.floor(y))));
      }

      function showAtScreen(sx, sy, titleText, descText, iconText) {
        var badge = ensureBadgeEl();
        if (!badge) return;
        var alive = badge.getAttribute('data-alive') === '1';
        var stack = badge.querySelector('.icon-stack');
        stack.innerHTML = '';
        var urls = resolveLocalIcons(titleText, descText, iconText);
        urls.forEach(function (u, i) {
          var img = document.createElement('img');
          img.setAttribute('alt', '');
          img.setAttribute('aria-hidden', 'true');
          img.setAttribute('loading', 'eager');
          img.setAttribute('src', u);
          img.setAttribute('style', 'display:block;width:36px;height:36px;object-fit:contain;margin:0;');
          stack.appendChild(img);
          if (i < urls.length - 1) {
            var spacer = document.createElement('div');
            spacer.setAttribute('style', 'height:8px;width:1px;');
            stack.appendChild(spacer);
          }
          try { console.log('[bubble-icon] key=%s → %s', iconText || titleText || descText || '', u); } catch (_) { }
        });
        badge.querySelector('.tt').textContent = titleText || '';
        badge.querySelector('.ds').textContent = descText || '';
        badge.setAttribute('data-alive', '1');

        sizeBadgeToContent(badge);
        placeBadgeAtScreen(sx, sy);
      }

      function showForElement(el, titleText, descText, iconText) {
        if (!el) return;
        var r = el.getBoundingClientRect();
        var sx = r.left + r.width / 2;
        var sy = r.top + r.height;
        showAtScreen(sx, sy, titleText, descText, iconText);
      }

      function hide() {
        var badge = document.getElementById('hx-devicon-badge');
        if (badge) badge.setAttribute('data-alive', '0');
      }

      // ===== wire exports =====
      window.showSvgBadgeAtScreen = showAtScreen;
      window.showSvgBadgeForEl = showForElement;
      window.hideSvgBadge = hide;

      // keep badge in sync on scroll/resize
      (function () {
        var last = { x: 0, y: 0, have: false };
        var orig = showAtScreen;
        window.showSvgBadgeAtScreen = function (x, y, t, d, i) {
          last.x = x; last.y = y; last.have = true;
          return orig(x, y, t, d, i);
        };
        var onScroll = function () {
          if (!last.have) return;
          placeBadgeAtScreen(last.x, last.y);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
      })();

    })();

/* ===== [INLINE SCRIPT INDEX 28] ===== */
(function () {
      // Avoid double install
      if (window.__bubbleIconDiagnosticsInstalled) return;
      window.__bubbleIconDiagnosticsInstalled = true;

      const XLINK_NS = "http://www.w3.org/1999/xlink";

      function nowTs() { try { return new Date().toISOString(); } catch (e) { return "" + Date.now(); } }

      function logDiag(kind, msg, extra) {
        try {
          const tag = "[bubble-icon:diag]";
          if (extra !== undefined) {
            console.log(tag, kind, msg, extra);
          } else {
            console.log(tag, kind, msg);
          }
        } catch (e) { }
      }

      function warnDiag(kind, msg, extra) {
        try {
          const tag = "[bubble-icon:warn]";
          if (extra !== undefined) {
            console.warn(tag, kind, msg, extra);
          } else {
            console.warn(tag, kind, msg);
          }
        } catch (e) { }
      }

      function errorDiag(kind, msg, extra) {
        try {
          const tag = "[bubble-icon:error]";
          if (extra !== undefined) {
            console.error(tag, kind, msg, extra);
          } else {
            console.error(tag, kind, msg);
          }
        } catch (e) { }
      }

      // Map a few known CDN names to local icons (soft mapping, only used on error as fallback)
      const softMap = {
        "azure": "assets/img/Icons/Azure.svg",
        "angular": "assets/img/Icons/Angular.svg",
        "angularjs": "assets/img/Icons/Angular.svg",
        "nginx": "assets/img/Icons/nginx.svg",
        "dotnet": "assets/img/Icons/framework.png",
        "dotnetcore": "assets/img/Icons/framework.png",
        "redhat": "assets/img/Icons/framework.png"
      };

      function guessLocalFromUrl(u) {
        try {
          const raw = (u || "").toLowerCase();
          // try to detect a key in the path
          const match = raw.match(/(azure|angularjs?|nginx|dotnetcore|dotnet|redhat)/);
          if (match) {
            const key = match[1] === "angularjs" ? "angularjs" : match[1];
            return softMap[key] || null;
          }
        } catch (e) { }
        return null;
      }

      // Force set both href and xlink:href to the same value
      function setBothHref(img, url) {
        try {
          if (!img) return;
          // Careful: SVG2 prefers plain "href"; some engines still look at xlink:href
          img.setAttributeNS(XLINK_NS, "xlink:href", url);
          img.setAttribute("href", url);
          // Store lastUrl for diagnostics
          img.__lastHref = url;
          logDiag("setBothHref", { url, id: img.id || "(no-id)" });
        } catch (e) {
          errorDiag("setBothHref-ex", e && (e.stack || e + ""), { url });
        }
      }

      // Attach load/error probes using a hidden HTMLImageElement so we get reliable events.
      function probeUrl(url, cb) {
        try {
          const probe = new Image();
          probe.crossOrigin = "anonymous";
          const startedAt = performance && performance.now ? performance.now() : Date.now();
          probe.onload = function () {
            const dt = (performance && performance.now ? performance.now() : Date.now()) - startedAt;
            cb && cb({ ok: true, url, naturalWidth: probe.naturalWidth, naturalHeight: probe.naturalHeight, ms: Math.round(dt) });
          };
          probe.onerror = function (ev) {
            const dt = (performance && performance.now ? performance.now() : Date.now()) - startedAt;
            cb && cb({ ok: false, url, event: "error", ms: Math.round(dt) });
          };
          probe.src = url;
        } catch (e) {
          cb && cb({ ok: false, url, event: "exception", ex: e && (e.stack || e + "") });
        }
      }

      function onSvgImageAttach(img) {
        if (!img || img.__bubbleDiagInstalled) return;
        img.__bubbleDiagInstalled = true;

        const id = img.id || "(no-id)";
        logDiag("attach", { id, tagName: img.tagName, ts: nowTs() });

        // Attribute observer — mirrors any href/xlink change to both attributes and probes the URL
        const obs = new MutationObserver(muts => {
          for (const m of muts) {
            if (m.type === "attributes" && (m.attributeName === "href" || m.attributeName === "xlink:href")) {
              const rawHref = img.getAttribute("href") || img.getAttributeNS(XLINK_NS, "href") || img.getAttributeNS(XLINK_NS, "xlink:href");
              logDiag("mut-attr", { attr: m.attributeName, value: rawHref });
              if (!rawHref) continue;
              setBothHref(img, rawHref);
              // Probe
              probeUrl(rawHref, (res) => {
                if (res.ok) {
                  logDiag("probe-ok", res);
                  img.__lastLoadOk = true;
                } else {
                  warnDiag("probe-fail", res);
                  img.__lastLoadOk = false;
                  // Try soft fallback only if URL looks external OR probe failed
                  const maybeLocal = guessLocalFromUrl(rawHref);
                  if (maybeLocal && maybeLocal !== rawHref) {
                    warnDiag("fallback-try", { from: rawHref, to: maybeLocal });
                    setBothHref(img, maybeLocal);
                    probeUrl(maybeLocal, (r2) => {
                      if (r2.ok) {
                        logDiag("fallback-ok", r2);
                      } else {
                        errorDiag("fallback-fail", r2);
                      }
                    });
                  }
                }
              });
            }
          }
        });
        obs.observe(img, { attributes: true, attributeFilter: ["href", "xlink:href"] });

        // Also hook direct error/load on the SVG <image> element (supported on modern browsers)
        function onLoad() { logDiag("svg-image-load", { id, href: img.__lastHref || img.getAttribute("href") || img.getAttributeNS(XLINK_NS, "xlink:href") }); }
        function onError(ev) { warnDiag("svg-image-error", { id, href: img.__lastHref || img.getAttribute("href") || img.getAttributeNS(XLINK_NS, "xlink:href"), ev: (ev && ev.type) || "error" }); }

        img.addEventListener("load", onLoad);
        img.addEventListener("error", onError);

        // Kick a first pass if it already has an href
        const initial = img.getAttribute("href") || img.getAttributeNS(XLINK_NS, "xlink:href");
        if (initial) {
          logDiag("initial-href", { id, href: initial });
          setBothHref(img, initial);
          probeUrl(initial, (res) => {
            if (!res.ok) {
              warnDiag("initial-probe-fail", res);
              const maybeLocal = guessLocalFromUrl(initial);
              if (maybeLocal && maybeLocal !== initial) {
                warnDiag("initial-fallback-try", { from: initial, to: maybeLocal });
                setBothHref(img, maybeLocal);
              }
            } else {
              logDiag("initial-probe-ok", res);
            }
          });
        } else {
          warnDiag("initial-href-missing", { id });
        }
      }

      function scanAndAttach() {
        try {
          const imgs = document.querySelectorAll('svg image#hx-bubble-ico-img, svg image.hx-bubble-ico-img, image#hx-bubble-ico-img, image.hx-bubble-ico-img');
          if (!imgs || !imgs.length) {
            logDiag("scan", "no bubble svg <image> found yet");
            return;
          }
          imgs.forEach(onSvgImageAttach);
          logDiag("scan", "attached to " + imgs.length + " <image> node(s)");
        } catch (e) {
          errorDiag("scan-ex", e && (e.stack || e + ""));
        }
      }

      // Observe DOM for dynamically created bubbles/images
      const domObs = new MutationObserver((muts) => {
        for (const m of muts) {
          if (m.type === "childList") {
            m.addedNodes && m.addedNodes.forEach(node => {
              try {
                if (!node || !node.querySelectorAll) return;
                const imgs = node.querySelectorAll('svg image#hx-bubble-ico-img, svg image.hx-bubble-ico-img, image#hx-bubble-ico-img, image.hx-bubble-ico-img');
                imgs && imgs.forEach(onSvgImageAttach);
              } catch (e) { }
            });
          }
        }
      });
      try {
        domObs.observe(document.documentElement || document.body, { childList: true, subtree: true });
      } catch (e) {
        errorDiag("domObs-ex", e && (e.stack || e + ""));
      }

      if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(scanAndAttach, 0);
      } else {
        document.addEventListener("DOMContentLoaded", scanAndAttach);
      }

      // Expose a tiny helper to manually set the bubble icon in consoles if needed
      window.__setBubbleIconHref = function (url) {
        const img = document.querySelector('image#hx-bubble-ico-img') || document.querySelector('image.hx-bubble-ico-img');
        if (!img) { errorDiag("manual-set", "no bubble image found"); return; }
        setBothHref(img, url);
      };
      logDiag("installed", { ts: nowTs() });
    })();

/* ===== [INLINE SCRIPT INDEX 29] ===== */
(function () {
      try {
        const NS_XLINK = 'http://www.w3.org/1999/xlink';
        const LOGP = '[bubble-icon:diag2]';
        const WARN = '[bubble-icon:warn2]';
        const ERRP = '[bubble-icon:error2]';

        const state = {
          installedAt: '2025-09-13T03:11:36.135314Z',
          attached: false,
          img: null,
          attrObserver: null,
          docObserver: null,
          scanTimer: null
        };

        function log(...args) { try { console.log(LOGP, ...args); } catch (_) { } }
        function warn(...args) { try { console.warn(WARN, ...args); } catch (_) { } }
        function error(...args) { try { console.error(ERRP, ...args); } catch (_) { } }

        function getImg() {
          return document.getElementById('hx-bubble-ico-img') ||
            (document.querySelector && document.querySelector('image#hx-bubble-ico-img'));
        }

        function getHref(el) {
          if (!el) return '';
          const h1 = el.getAttribute('href');
          const h2 = el.getAttribute('xlink:href');
          const h3 = el.getAttributeNS && el.getAttributeNS(NS_XLINK, 'href');
          return h1 || h2 || h3 || '';
        }

        function setBoth(el, url) {
          let ok = false;
          try { el.setAttributeNS(NS_XLINK, 'xlink:href', url); ok = true; } catch (e) { }
          try { el.setAttribute('xlink:href', url); ok = true; } catch (e) { }
          try { el.setAttribute('href', url); ok = true; } catch (e) { }
          return ok;
        }

        function absoluteUrl(url) {
          try { return new URL(url, location.href).href; } catch (e) { return url; }
        }

        function iconMap(url) {
          // Extracts likely key and suggests local fallback
          try {
            const u = url.toLowerCase();
            if (u.includes('azure')) return 'assets/img/Icons/Azure.svg';
            if (u.includes('angular')) return 'assets/img/Icons/Angular.svg';
            if (u.includes('angularjs')) return 'assets/img/Icons/Angular.svg';
            if (u.includes('nginx')) return 'assets/img/Icons/nginx.svg';
            if (u.includes('dotnet') || u.includes('csharp') || u.includes('c#')) return 'assets/img/Icons/framework.png';
            if (u.includes('redhat') || u.includes('rhel')) return 'assets/img/Icons/framework.png';
          } catch (_) { }
          return null;
        }

        function probe(url, cb) {
          const test = new Image();
          test.onload = function () { cb(true, { w: test.naturalWidth, h: test.naturalHeight }); };
          test.onerror = function () { cb(false); };
          test.src = url;
        }

        function syncAndProbe(img, why) {
          if (!img) return;
          // mirror both attributes
          const raw = getHref(img);
          const url = absoluteUrl(raw);
          if (!raw) { warn('no-href-yet', { why }); return; }
          const mirrored = setBoth(img, url);
          log('sync', { why, raw, url, mirrored });

          // attach onerror/onload for the <image> itself (not super reliable cross-browser but helps)
          try {
            img.addEventListener('error', function (ev) { warn('svg-image-error', { url, evType: ev.type }); }, { once: false });
            img.addEventListener('load', function (ev) { log('svg-image-load', { url, evType: ev.type }); }, { once: false });
          } catch (_) { }

          // external probe via HTMLImageElement
          probe(url, function (ok, meta) {
            if (ok) {
              log('probe-ok', { url, meta });
            } else {
              warn('probe-fail', { url });
              const fb = iconMap(url);
              if (fb) {
                warn('fallback-try', { from: url, to: fb });
                probe(fb, function (ok2, meta2) {
                  if (ok2) {
                    setBoth(img, fb);
                    log('fallback-ok', { from: url, to: fb, meta: meta2 });
                  } else {
                    error('fallback-fail', { from: url, to: fb });
                  }
                });
              }
            }
          });
        }

        function attachTo(img) {
          if (!img || state.attached) return;
          state.img = img;
          state.attached = true;
          log('attach', { found: true, tag: img && img.outerHTML && img.outerHTML.slice(0, 200) });

          // Attribute observer
          state.attrObserver = new MutationObserver(muts => {
            for (const m of muts) {
              if (m.type === 'attributes' && (m.attributeName === 'href' || m.attributeName === 'xlink:href')) {
                log('mut-attr', { name: m.attributeName, newVal: getHref(img) });
                syncAndProbe(img, 'attr-change:' + m.attributeName);
              }
            }
          });
          state.attrObserver.observe(img, { attributes: true, attributeFilter: ['href', 'xlink:href'] });

          // initial sync
          syncAndProbe(img, 'attach-initial');
        }

        function scanNow() {
          const el = getImg();
          if (el) attachTo(el);
          else log('scan no bubble svg <image> found yet');
        }

        // DOM observer to detect element insertion
        state.docObserver = new MutationObserver(muts => {
          for (const m of muts) {
            for (const node of m.addedNodes || []) {
              if (!(node && node.nodeType === 1)) continue;
              if (node.id === 'hx-bubble-ico-img') attachTo(node);
              const q = node.querySelector && node.querySelector('image#hx-bubble-ico-img');
              if (q) attachTo(q);
            }
          }
        });
        state.docObserver.observe(document.documentElement || document.body, { childList: true, subtree: true });

        // periodic scan as a backup
        state.scanTimer = setInterval(scanNow, 500);

        // Expose a helper to force-set
        window.__setBubbleIconHref2 = function (url) {
          const img = getImg();
          if (!img) { warn('force-set failed, image not found'); return; }
          setBoth(img, url);
          syncAndProbe(img, 'force');
        };

        log('installed', { ts: new Date().toISOString() });
        // immediate scan
        scanNow();
      } catch (e) {
        try { console.error('[bubble-icon:diag2] init-error', e); } catch (_) { }
      }
    })();

/* ===== [INLINE SCRIPT INDEX 30] ===== */
(() => {
      const tag = '[bubble-icon:diag3]';
      const xns = 'http://www.w3.org/1999/xlink';
      const log = (...a) => console.log(tag, ...a);
      const warn = (...a) => console.warn('[bubble-icon:warn3]', ...a);
      const err = (...a) => console.error('[bubble-icon:err3]', ...a);
      const now = () => new Date().toISOString();
      log('installed', { ts: now() });

      // Keep handles we discover
      const state = {
        img: null,
        svg: null,
        lastUrl: null,
        seen: 0,
      };

      function getHref(el) {
        if (!el) return null;
        // SVG2 prefers href; legacy uses xlink:href
        return el.getAttribute('href') || el.getAttributeNS(xns, 'href') || el.getAttribute('xlink:href') || el.getAttributeNS(xns, 'xlink:href');
      }

      function setBothHrefs(img, url) {
        try {
          // Try both modern and legacy forms
          img.setAttribute('href', url);
        } catch (e) { }
        try {
          img.setAttributeNS(xns, 'href', url);
        } catch (e) { }
        try {
          img.setAttribute('xlink:href', url);
        } catch (e) { }
        try {
          img.setAttributeNS(xns, 'xlink:href', url);
        } catch (e) { }
      }

      async function probeUrl(url) {
        if (!url) return;
        try {
          const r = await fetch(url, { cache: 'no-store', mode: 'no-cors' });
          // In no-cors we can't read headers; do a second try with cors, may fail but log status if available
          log('probe(fetch) started', { url });
          try {
            const r2 = await fetch(url, { cache: 'no-store' });
            const ct = r2.headers.get('content-type');
            log('probe(fetch) result', { url, ok: r2.ok, status: r2.status, contentType: ct });
          } catch (e2) {
            warn('probe(fetch) CORS-limited', { url, message: String(e2) });
          }
          // Also try rasterizing via HTMLImageElement (works for SVG too)
          await new Promise((resolve, reject) => {
            const im = new Image();
            im.onload = () => { log('probe(image) ok', { url, naturalWidth: im.naturalWidth, naturalHeight: im.naturalHeight }); resolve(); };
            im.onerror = (ev) => { warn('probe(image) failed', { url, ev }); resolve(); };
            im.src = url + (url.includes('?') ? '&' : '?') + '_t=' + Date.now();
          });
        } catch (e) {
          warn('probe exception', { url, message: String(e) });
        }
      }

      function collect(el) {
        state.img = el;
        state.svg = el.ownerSVGElement || el.closest('svg');
        state.lastUrl = getHref(el);
        state.seen++;
        const info = bubbleInfo();
        log('collect', info);
        // kick a probe on the URL
        probeUrl(state.lastUrl);
      }

      function bubbleInfo() {
        const el = state.img;
        const svg = state.svg;
        const docHas = !!document.getElementById('hx-bubble-ico-img');
        const attrs = (node) => {
          if (!node) return null;
          const o = {};
          for (const a of node.attributes) {
            o[a.name] = a.value;
          }
          return o;
        };
        let rect = null;
        let cstyle = null;
        try {
          if (el) {
            rect = el.getBoundingClientRect();
            cstyle = getComputedStyle(el);
          }
        } catch { }
        return {
          present: !!el,
          inDocById: docHas,
          href: el ? getHref(el) : null,
          id: el ? el.id : null,
          display: cstyle ? cstyle.display : null,
          visibility: cstyle ? cstyle.visibility : null,
          opacity: cstyle ? cstyle.opacity : null,
          width: el ? el.getAttribute('width') : null,
          height: el ? el.getAttribute('height') : null,
          rect,
          imgAttrs: attrs(el),
          svgAttrs: attrs(svg),
          seenCount: state.seen,
          ts: now(),
        };
      }

      // Expose helpers
      window.__bubbleInfo = bubbleInfo;
      window.__setBubbleIconHref3 = function (url) {
        if (!state.img) {
          warn('force-set failed, image not captured yet');
          return;
        }
        setBothHrefs(state.img, url);
        state.lastUrl = url;
        log('force-set applied', { url, info: bubbleInfo() });
        probeUrl(url);
      };

      // Prototype hooks: intercept ANY <image> href changes anywhere (light DOM or shadow)
      const origSetAttr = Element.prototype.setAttribute;
      const origSetAttrNS = Element.prototype.setAttributeNS;

      function isBubbleImage(el) {
        return el && el.namespaceURI === 'http://www.w3.org/2000/svg' && el.tagName && el.tagName.toLowerCase() === 'image';
      }
      function isHrefAttr(name) {
        if (!name) return false;
        name = String(name).toLowerCase();
        return name === 'href' || name.endsWith(':href');
      }

      Element.prototype.setAttribute = function (name, value) {
        if (isBubbleImage(this) && isHrefAttr(name)) {
          const prev = getHref(this);
          const ctx = { kind: 'setAttribute', name, value, prev, id: this.id, hasIdMatch: this.id === 'hx-bubble-ico-img' };
          console.log('[bubble-ultra:diag3 intercept]', ctx);
          try { const r = origSetAttr.apply(this, arguments); collect(this); setBothHrefs(this, value); return r; }
          finally { log('synced-attrs', bubbleInfo()); }
        }
        return origSetAttr.apply(this, arguments);
      };

      Element.prototype.setAttributeNS = function (ns, name, value) {
        if (isBubbleImage(this) && isHrefAttr(name)) {
          const prev = getHref(this);
          const ctx = { kind: 'setAttributeNS', ns, name, value, prev, id: this.id, hasIdMatch: this.id === 'hx-bubble-ico-img' };
          console.log('[bubble-ultra:diag3 intercept]', ctx);
          try { const r = origSetAttrNS.apply(this, arguments); collect(this); setBothHrefs(this, value); return r; }
          finally { log('synced-attrs', bubbleInfo()); }
        }
        return origSetAttrNS.apply(this, arguments);
      };

      // Periodic visibility watcher for the captured element
      setInterval(() => {
        if (!state.img) return;
        const info = bubbleInfo();
        console.debug('[bubble-icon:diag3 watch]', info);
        // Auto-heal visibility without changing layout intent
        if (info.display === 'none') {
          state.img.style.display = 'block';
          log('auto-visibility', { fixed: 'display:block' });
        }
        if (info.visibility === 'hidden') {
          state.img.style.visibility = 'visible';
          log('auto-visibility', { fixed: 'visibility:visible' });
        }
        if (info.opacity === '0') {
          state.img.style.opacity = '1';
          log('auto-visibility', { fixed: 'opacity:1' });
        }
      }, 1000);

      // As a last resort, also scan for id if someone already created it before our hooks
      function fallbackScan() {
        const el = document.getElementById('hx-bubble-ico-img') || document.querySelector('svg image#hx-bubble-ico-img');
        if (el && !state.img) {
          log('fallback matched existing image by id');
          collect(el);
        } else {
          log('no bubble svg <image> found yet (fallback)');
        }
      }
      setTimeout(fallbackScan, 500);
      setTimeout(fallbackScan, 1500);
      setInterval(fallbackScan, 3000);
    })();



/* __HX ICON ENGINE SAFETY PASS__ */
(function(){
  function ready(fn){if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',fn,{once:true});}else{fn();}}
  function isLocalImg(img){
    if(!img) return false;
    var src=(img.getAttribute('src')||'')+(img.getAttribute('xlink:href')||'')+(img.getAttribute('href')||'');
    return /\/assets\/img\/Icons\//i.test(src) || img.hasAttribute('data-local-icon');
  }
  function collapseOne(li){
    try{
      // If row explicitly has a manual icon or is locked, keep only that
      var manual = li.querySelector(':scope > .hx-manual-icon img, :scope > .hx-icon.hx-manual-icon img');
      if(manual || li.hasAttribute('data-hx-lock') || li.classList.contains('hx-lock-icon')){
        // Remove any auto icons that might have been injected
        li.querySelectorAll(':scope > .hx-icon:not(.hx-manual-icon)').forEach(function(w){
          w.remove();
        });
        return;
      }
      // Prefer an existing local img inside .hx-icon if present
      var wraps = Array.from(li.querySelectorAll(':scope > .hx-icon'));
      if(!wraps.length){
        return; // nothing to do
      }
      var keepWrap = wraps[0];
      // If multiple wrappers exist, pick the first that contains a local <img>, else first with devicon, else first
      for (var i=0;i<wraps.length;i++){
        var w = wraps[i];
        var img = w.querySelector('img');
        if(isLocalImg(img)){ keepWrap = w; break; }
      }
      // Remove all other wrappers
      wraps.forEach(function(w){ if(w!==keepWrap){ w.remove(); } });
      // Inside keepWrap, keep at most one child: prefer local <img>, then i.devicon, then iconify-icon, then img, then firstElementChild
      var cand = keepWrap.querySelector('img[data-local-icon],img[src*="/assets/img/Icons/"]') ||
                 keepWrap.querySelector('i[class*="devicon-"], i.bi') ||
                 keepWrap.querySelector('iconify-icon') ||
                 keepWrap.querySelector('img') ||
                 keepWrap.firstElementChild;
      if(cand){
        Array.from(keepWrap.children).forEach(function(ch){ if(ch!==cand){ ch.remove(); } });
      }
    }catch(e){}
  }
  function run(){
    document.querySelectorAll('li.hx-li').forEach(collapseOne);
  }
  ready(run);
})();
