/**
 * HX Icon Resolver - Shared Library
 * Local-first icon resolution for Heat Exchanger Portal projects
 * 
 * Usage: Include this file and call window.hxIconResolver.resolveIconAsset(titleText, iconText)
 * 
 * Features:
 * - Local-first icon strategy (prioritizes assets/img/icons/ folder)
 * - Comprehensive technology mapping (30+ technologies)
 * - Professional fallback (framework.png instead of emoji)
 * - Multiple icon support (up to 3 icons per technology)
 */

(function() {
  'use strict';

  // Configuration
  var ICON_BASE = 'assets/img/icons/';
  var ABS_ICON_BASE = (location.origin || '') + '/' + ICON_BASE.replace(/^\/+/, '');
  var FALLBACK_FILE = 'framework.png';

  // Comprehensive technology mapping - LOCAL FIRST STRATEGY
  var TECHNOLOGY_MAP = [
    // Core Technologies
    [/\.net|dotnetcore|dotnet|c#|web api\b|api\b/i, ['NET core.svg','web api.svg','api.svg']],
    [/angular|angularjs/i, ['Angular.svg']],
    [/openshift.*gateway|gateway.*openshift/i, ['openshift gateway.png']],
    [/openshift|redhat/i, ['openshift1.png']],
    [/grafana/i, ['Grafana.svg']],
    [/prometheus/i, ['Prometheus.svg']],
    [/\b(nexus|sonatype)\b/i, ['nexus.svg','sonatype.svg']],
    [/\bsql server\b|\bdatabase\b|\bsql\b/i, ['sql server.svg','Azure SQL Database.svg']],
    [/redis\b/i, ['Redis.svg']],
    [/docker\b/i, ['Docker.svg']],
    
    // DevOps & Integration
    [/\b(ci\/?cd|pipeline|pipelines)\b/i, ['pipelines.png','CI CD.svg']],
    [/\bswagger\b/i, ['Swagger.svg']],
    [/\bopenapi\b/i, ['OpenAPI.svg']],
    [/\bnunit\b/i, ['nunit.svg']],
    [/\bmvc\b|\bentity framework\b|\bframework\b/i, ['framework.png','mvc.png']],
    [/\bbackground jobs?\b/i, ['background jobs.png']],
    [/\bintegration\b|\bgateway\b/i, ['integration gateway.svg','gateway.png','api gateway.svg']],
    
    // Security & Compliance
    [/\bsecurity\b/i, ['security.png']],
    [/\bcompliance\b/i, ['compliance.png']],
    
    // Cloud & Infrastructure
    [/\bazure dev ?ops\b/i, ['Azure Devops.svg']],
    [/\bapp services?\b/i, ['app services.svg']],
    [/\bazure\b/i, ['Azure.svg']],
    [/\bkubernetes\b/i, ['kubernetes.svg']],
    [/\bingress\b/i, ['ingress.svg']],
    [/\bnginx\b/i, ['nginx.svg']],
    
    // Databases
    [/\bmongodb\b/i, ['MongoDB.svg']],
    [/\bmysql\b/i, ['MySQL.svg']],
    [/\bpostgres|postgresql\b/i, ['PostgresSQL.svg']],
    
    // Frontend Technologies
    [/\bjquery\b/i, ['jquery.svg']],
    [/\bjson\b/i, ['JSON.svg']],
    [/\bbootstrap\b/i, ['bootstrap.svg']],
    [/\bprimeng\b/i, ['primeng.svg']],
    
    // Monitoring & Analytics
    [/\binsights?\b|\bobservability\b|\bmonitoring\b/i, ['insights.png','monitoring.png']],
    [/\bperformance\b/i, ['performance_11670215.png']],
    [/\bnetwork\b/i, ['network_traffic.png']],
    [/\bload\b|\bbalance\b/i, ['load_balancing.png']],
    
    // General Categories
    [/\bartifacts?\b/i, ['artifacts.png']],
    [/\brepository\b/i, ['repository.png']],
    [/\bportal\b/i, ['portal.png']],
    [/\buser\b/i, ['user.png']],
    [/\bservices?\b/i, ['services.png']],
    [/\bfrontend\b/i, ['frontend.png']],
    [/\bdata\b|\banalytics\b|\bmetrics\b/i, ['analytics.png','data.png']],
    [/\bpartners?\b/i, ['partners.png']]
  ];

  /**
   * Convert relative icon path to absolute URL
   */
  function toAbsLocal(file) {
    var f = (file || FALLBACK_FILE).replace(/^\/+/, '');
    try { 
      f = encodeURIComponent(decodeURIComponent(f)); 
    } catch(_) { 
      f = encodeURIComponent(f); 
    }
    return ABS_ICON_BASE + f;
  }

  /**
   * Main icon resolution function
   * @param {string} titleText - Title or heading text
   * @param {string} iconText - Icon-specific text
   * @returns {Object} - { imgUrls: string[] } or { imgUrls: ['/assets/img/icons/framework.png'] }
   */
  function resolveIconAsset(titleText, iconText) {
    var key = (String(iconText||'') + ' ' + String(titleText||'')).toLowerCase();
    var files = [];
    
    function push(name) {
      if (!name) return;
      if (files.indexOf(name) === -1) files.push(name);
    }
    
    // Search through technology mapping
    for (var i = 0; i < TECHNOLOGY_MAP.length; i++) {
      var entry = TECHNOLOGY_MAP[i];
      var regex = entry[0];
      var icons = entry[1];
      
      if (regex.test(key)) {
        for (var j = 0; j < icons.length; j++) {
          push(icons[j]);
        }
      }
    }
    
    // Special case: API + .NET combination
    if (/\bapi\b/i.test(key) && /\.net|dotnet|c#/i.test(key)) {
      push('web api.svg');
      push('api.svg');
    }
    
    // Limit to 3 icons and return
    files = files.slice(0, 3);
    
    if (files.length === 0) {
      // Professional fallback - no more ugly emoji!
      return { imgUrls: ['/assets/img/icons/framework.png'] };
    }
    
    return { imgUrls: files.map(function(f) { return '/assets/img/icons/' + f; }) };
  }

  /**
   * Create icon element for HTML insertion
   * @param {string} titleText - Title text
   * @param {string} iconText - Icon text
   * @returns {HTMLElement} - Icon element ready for insertion
   */
  function createIconElement(titleText, iconText) {
    var asset = resolveIconAsset(titleText, iconText);
    var container = document.createElement('span');
    container.className = 'hx-manual-icon';
    
    if (asset.imgUrls && asset.imgUrls.length > 0) {
      var img = document.createElement('img');
      img.alt = titleText || 'Icon';
      img.src = asset.imgUrls[0];
      img.style.width = '22px';
      img.style.height = '22px';
      container.appendChild(img);
    }
    
    return container;
  }

  // Public API
  window.hxIconResolver = {
    resolveIconAsset: resolveIconAsset,
    createIconElement: createIconElement,
    toAbsLocal: toAbsLocal,
    TECHNOLOGY_MAP: TECHNOLOGY_MAP,
    ICON_BASE: ICON_BASE,
    ABS_ICON_BASE: ABS_ICON_BASE,
    FALLBACK_FILE: FALLBACK_FILE
  };

  // Log initialization
  console.log('HX Icon Resolver loaded - Local-first strategy active');

})();
