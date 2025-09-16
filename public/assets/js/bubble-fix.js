/* bubble-fix.js — v13
   - Keeps tracking ON
   - On each slide change: repairs any devicon/simple-icons in the active slide
   - If #hx-bubble-ico-img exists: ensure it stays mapped/visible (and revert if tampered)
   - Mirrors the MAP used in diag4
   - Exposes window.__bubbleFixStatus()
*/

(function(){
  'use strict';

  const LOG='[bubble-fix]';
  const XLINK='http://www.w3.org/1999/xlink';
  const ICON_DIR='/assets/img/Icons/';
  const SAFE_FALLBACK='web.svg';
  const RE_CDN=/devicon|cdn\.jsdelivr|unpkg\.com|raw\.githubusercontent|github\.com\/devicons|simple-icons@/i;

  const info=(...a)=>console.log(LOG, ...a);

  const MAP={
    azure:'Azure.svg',
    angular:'Angular.svg',
    angularjs:'Angular.svg',
    nginx:'nginx.svg',
    docker:'Docker.svg',
    grafana:'Grafana.svg',
    prometheus:'Prometheus.svg',
    jquery:'jquery.svg',
    swagger:'Swagger.svg',
    sonatype:'sonatype.svg',

    net:'NET core.svg',
    netcore:'NET core.svg',
    dotnet:'NET core.svg',
    dotnetcore:'NET core.svg',
    mssql:'sql server.svg',
    sqlserver:'sql server.svg',
    microsoftsqlserver:'sql server.svg',
    linq2sql:'linq2sql.svg',

    redis:'Redis.svg',
    mongodb:'MongoDB.svg',
    mysql:'MySQL.svg',
    postgres:'PostgresSQL.svg',
    postgresql:'PostgresSQL.svg',
    kubernetes:'kubernetes.svg',
    ingress:'ingress.svg',
    nexus:'nexus.svg',

    azuredevops:'Azure Devops.svg',
    ci:'CI CD.svg',
    cicd:'CI CD.svg',
    bootstrap:'bootstrap.svg',
    primeng:'primeng.svg',
    openapi:'OpenAPI.svg',

    openshift:'openshift1.png',
    openshiftgateway:'openshift gateway.png',
    entityframework:'linq2sql.svg',

    api:'api.svg',
    apigateway:'api gateway.svg',
    webapi:'web api.svg',
    'mongodb-original':'MongoDB.svg'
  };

  function norm(s){return (s||'').toLowerCase().replace(/[^a-z0-9]+/g,'');}
  function localUrl(file){return new URL(ICON_DIR+file, location.href).href;}
  function setHrefAll(img,val){
    try{img.setAttribute('href',val);}catch{}
    try{img.setAttributeNS(XLINK,'xlink:href',val);}catch{}
    if (img.href && typeof img.href.baseVal==='string'){try{img.href.baseVal=val;}catch{}}
  }
  function getHref(img){
    return img.getAttribute('href') ||
      img.getAttributeNS(XLINK,'href') ||
      img.getAttributeNS(XLINK,'xlink:href') ||
      (img.href && img.href.baseVal) || null;
  }
  function mapFromUrl(uStr){
    try{
      const u=new URL(uStr, location.href);
      const last=(u.pathname.split('/').pop()||'').toLowerCase();
      const base=last.replace(/\.(svg|png|jpg|jpeg|gif|webp)$/i,'');
      const cands=[base,
        base.replace(/-original(-wordmark)?$/,''),
        base.replace(/-plain(-wordmark)?$/,''),
        base.replace(/-line(-wordmark)?$/,''),
        base.replace(/-wordmark$/,''),
        base.split('-')[0]];
      for (const c of cands){const k=norm(c); if (MAP[k]) return MAP[k];}
      const hostKey=norm(u.hostname.split('.')[0]); if (MAP[hostKey]) return MAP[hostKey];
    }catch{}
    return SAFE_FALLBACK;
  }
  function forceVisible(img){
    if(!img) return;
    try{img.removeAttribute('display');}catch{}
    img.style.display='block';
    img.style.visibility='visible';
    img.style.opacity='1';
    img.setAttribute('preserveAspectRatio','xMidYMid meet');
    if(!img.getAttribute('width')) img.setAttribute('width','90');
    if(!img.getAttribute('height')) img.setAttribute('height','90');
    const svg=img.closest && img.closest('svg');
    if(svg){
      svg.style.display='block';
      svg.style.visibility='visible';
      svg.style.opacity='1';
      svg.removeAttribute('hidden');
      svg.style.pointerEvents='none';
    }
  }
  function activeIndex(){
    const a=document.querySelector('.swiper-slide.swiper-slide-active');
    if(!a) return 0;
    const all=Array.from(document.querySelectorAll('.swiper-slide'));
    const i=all.indexOf(a);
    return i<0?0:i;
  }

  function fixOverlay(){
    const el=document.getElementById('hx-bubble-ico-img');
    if(!el) return false;
    forceVisible(el);
    const href=getHref(el)||'';
    if (RE_CDN.test(href) || !href){
      const file=mapFromUrl(href||'angular.svg'); // default bias
      const local=localUrl(file);
      setHrefAll(el, local);
      forceVisible(el);
      info('overlay-fixed', {from: href, to: local});
    } else {
      info('overlay-present', {href});
    }
    return true;
  }

  function fixSlide(){
    const slide=document.querySelector('.swiper-slide.swiper-slide-active')||document;
    // SVG <image>
    slide.querySelectorAll('image').forEach(img=>{
      const href=getHref(img)||'';
      if (RE_CDN.test(href)){
        const file=mapFromUrl(href);
        const local=localUrl(file);
        setHrefAll(img, local);
        forceVisible(img);
        info('slide-image-fixed', {from: href, to: local, slide: activeIndex()});
      }
    });
    // HTML <img>
    slide.querySelectorAll('img[src]').forEach(img=>{
      const src=img.getAttribute('src')||'';
      if (RE_CDN.test(src)){
        const file=mapFromUrl(src);
        const local=localUrl(file);
        img.setAttribute('src', local);
        img.style.visibility='visible';
        img.style.opacity='1';
        info('slide-img-fixed', {from: src, to: local, slide: activeIndex()});
      }
    });
  }

  function drive(){
    const had=fixOverlay();
    fixSlide();
    if(!had) setTimeout(fixOverlay, 200);
  }

  // Boot passes
  let boot=0;
  const iv=setInterval(()=>{boot++;drive(); if(boot>=24) clearInterval(iv);}, 400);

  // Observe slide churn
  const mo=new MutationObserver(muts=>{
    for(const m of muts){
      if (m.type==='attributes' && m.attributeName==='class' && m.target.classList && m.target.classList.contains('swiper-slide')){
        info('slide-change-detected', {idx: activeIndex()}); drive(); break;
      }
      if (m.type==='childList'){ drive(); break; }
    }
  });
  mo.observe(document.body, {attributes:true, childList:true, subtree:true});

  // Bring back when tab refocuses
  document.addEventListener('visibilitychange', ()=>{ if(!document.hidden) drive(); });

  window.__bubbleFixStatus=function(){
    const el=document.getElementById('hx-bubble-ico-img');
    return {slide: activeIndex(), overlayPresent: !!el, overlayHref: el? (getHref(el)||null) : null};
  };

  info('ready');
})();
