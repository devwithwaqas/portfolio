(function(){
  function initDiagram(opts){
    const {
      stage,            // HTMLElement or selector for the visible container
      svg,              // SVGElement or selector
      pad = 120,        // viewBox pad used when you set the viewBox from ELK
      minZoom = 0.2,
      maxZoom = 8,
      zoomStep = 1.12,  // 12% in/out
      buttons = {}      // { zoomIn, zoomOut, fit, reset }
    } = opts || {};

    const stageEl = typeof stage === 'string' ? document.querySelector(stage) : stage;
    const svgEl   = typeof svg   === 'string' ? document.querySelector(svg)   : svg;
    if(!stageEl || !svgEl || typeof window.svgPanZoom !== 'function') return null;

    let panZoom = window.svgPanZoom(svgEl, {
      zoomEnabled:true, controlIconsEnabled:false, fit:true, center:true,
      minZoom, maxZoom, zoomScaleSensitivity:0.2, panEnabled:true,
      dblClickZoomEnabled:true, mouseWheelZoomEnabled:false, // we’ll handle wheel
      preventMouseEventsDefault:false
    });

    function fitAndCenter(){
      try{
        if(panZoom.resize) panZoom.resize();
        if(panZoom.fit)    panZoom.fit();
        if(panZoom.getSizes && panZoom.pan){
          const s = panZoom.getSizes();
          const targetX = (s.width  - s.viewBox.width  * s.realZoom) / 2;
          const targetY = (s.height - s.viewBox.height * s.realZoom) / 2;
          panZoom.pan({ x: Math.round(targetX), y: Math.round(targetY) });
        } else if (panZoom.center){
          panZoom.center();
        }
      }catch(e){}
    }
    fitAndCenter();
    let initial = { zoom: panZoom.getZoom(), pan: panZoom.getPan() };

    let active = false;
    const io = new IntersectionObserver((entries)=>{
      const e = entries[0];
      active = !!(e && e.isIntersecting && e.intersectionRatio >= 0.6);
    }, { threshold:[0, .6, 1] });
    io.observe(stageEl);

    svgEl.addEventListener('wheel', (e)=>{
      const intendsZoom = e.ctrlKey || e.metaKey || e.altKey;
      if(!intendsZoom || !active) return;
      e.preventDefault();
      const delta = (e.deltaY < 0) ? zoomStep : (1 / zoomStep);
      if(panZoom.zoomAtPoint && panZoom.getZoom){
        panZoom.zoomAtPoint(panZoom.getZoom() * delta, { x:e.clientX, y:e.clientY });
      }else if(panZoom.zoomAtPointBy){
        panZoom.zoomAtPointBy(delta, { x:e.clientX, y:e.clientY });
      }else{
        if(delta > 1 && panZoom.zoomIn) panZoom.zoomIn();
        else if (panZoom.zoomOut)       panZoom.zoomOut();
      }
    }, { passive:false });

    svgEl.addEventListener('mousedown', ()=>{ try{ panZoom.enablePan(); }catch(e){} });
    svgEl.addEventListener('mouseup',   ()=>{ try{ panZoom.disablePan(); }catch(e){} });
    svgEl.addEventListener('mouseleave',()=>{ try{ panZoom.disablePan(); }catch(e){} });
    svgEl.addEventListener('touchstart',()=>{ try{ panZoom.enablePan(); }catch(e){} }, { passive:true });
    svgEl.addEventListener('touchend',  ()=>{ try{ panZoom.disablePan(); }catch(e){} });

    const api = {
      zoomIn(){  try { panZoom.zoom(panZoom.getZoom() * zoomStep); }catch(e){} },
      zoomOut(){ try { panZoom.zoom(panZoom.getZoom() / zoomStep); }catch(e){} },
      fitToView(){ try { fitAndCenter(); initial = { zoom: panZoom.getZoom(), pan: panZoom.getPan() }; }catch(e){} },
      resetView(){ try { panZoom.zoom(initial.zoom); panZoom.pan(initial.pan); }catch(e){} },