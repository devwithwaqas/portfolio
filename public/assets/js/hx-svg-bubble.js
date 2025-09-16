/**
 * HX SVG Bubble - Shared Library
 * 
 * SVG-native narration bubble system for Heat Exchanger Portal projects
 * 
 * Features:
 * - SVG-native bubble that scales and moves with diagram
 * - Local-first icon integration
 * - Smart positioning and viewport clamping
 * - Professional styling with glow effects
 * - Responsive text sizing and wrapping
 */

(function() {
  'use strict';

  // Configuration
  var BUBBLE_CONFIG = {
    paddingX: 32,
    paddingY: 24,
    gapX: 16,
    gapY: 16,
    baseline: 60,
    maxWidth: 0.45, // 45% of viewport width
    minWidth: 200,
    iconSize: 28,
    iconGap: 6,
    safeMargin: 200
  };

  var bubbleGroup = null;
  var isInitialized = false;

  /**
   * Initialize SVG bubble system
   * @param {SVGElement} svgElement - The main SVG element
   */
  function initialize(svgElement) {
    if (isInitialized) return;
    
    try {
      bubbleGroup = ensureSvgBubble(svgElement);
      isInitialized = true;
      console.log('HX SVG Bubble initialized');
    } catch (error) {
      console.error('Failed to initialize SVG bubble:', error);
    }
  }

  /**
   * Ensure SVG bubble elements exist
   * @param {SVGElement} svg - SVG element
   * @returns {SVGElement} - Bubble group element
   */
  function ensureSvgBubble(svg) {
    if (!svg) return null;

    var existing = svg.querySelector('#hx-bubble');
    if (existing) return existing;

    // Create bubble group
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.id = 'hx-bubble';
    g.style.display = 'none';
    g.style.pointerEvents = 'none';

    // Background rectangle
    var bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.id = 'hx-bubble-bg';
    bg.setAttribute('rx', '12');
    bg.setAttribute('ry', '12');
    g.appendChild(bg);

    // Icon container
    var icoWrap = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    icoWrap.id = 'hx-bubble-ico-wrap';
    g.appendChild(icoWrap);

    // Main icon image
    var icoImg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    icoImg.id = 'hx-bubble-ico-img';
    icoImg.setAttribute('x', '16');
    icoImg.setAttribute('y', '16');
    icoImg.setAttribute('width', String(BUBBLE_CONFIG.iconSize));
    icoImg.setAttribute('height', String(BUBBLE_CONFIG.iconSize));
    icoImg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    icoImg.style.display = 'none';
    icoWrap.appendChild(icoImg);

    // Text container
    var textFo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    textFo.id = 'hx-bubble-body-fo';
    textFo.setAttribute('x', String(BUBBLE_CONFIG.paddingX + BUBBLE_CONFIG.iconSize + BUBBLE_CONFIG.gapX));
    textFo.setAttribute('y', String(BUBBLE_CONFIG.paddingY));
    g.appendChild(textFo);

    // Title text
    var title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.id = 'hx-bubble-title';
    title.setAttribute('x', String(BUBBLE_CONFIG.paddingX + BUBBLE_CONFIG.iconSize + BUBBLE_CONFIG.gapX));
    title.setAttribute('y', String(BUBBLE_CONFIG.baseline));
    title.style.fontFamily = 'Raleway, sans-serif';
    title.style.fontWeight = '600';
    title.style.fontSize = '18px';
    title.style.fill = '#ffffff';
    g.appendChild(title);

    // Description text
    var desc = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    desc.id = 'hx-bubble-desc';
    desc.setAttribute('x', String(BUBBLE_CONFIG.paddingX + BUBBLE_CONFIG.iconSize + BUBBLE_CONFIG.gapX));
    desc.setAttribute('y', String(BUBBLE_CONFIG.baseline + 24));
    desc.style.fontFamily = 'Roboto, sans-serif';
    desc.style.fontSize = '14px';
    desc.style.fill = '#f8f9fa';
    g.appendChild(desc);

    // Tip/arrow
    var tip = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    tip.id = 'hx-bubble-tip';
    tip.setAttribute('points', '0,0 12,6 0,12');
    g.appendChild(tip);

    svg.appendChild(g);
    return g;
  }

  /**
   * Show SVG bubble at screen coordinates
   * @param {number} sx - Screen X coordinate
   * @param {number} sy - Screen Y coordinate
   * @param {string} titleText - Title text
   * @param {string} descText - Description text
   * @param {string} iconText - Icon text for resolution
   */
  function showAtScreen(sx, sy, titleText, descText, iconText) {
    if (!bubbleGroup) return;

    try {
      var bg = bubbleGroup.querySelector('#hx-bubble-bg');
      var icoImg = bubbleGroup.querySelector('#hx-bubble-ico-img');
      var icoWrap = bubbleGroup.querySelector('#hx-bubble-ico-wrap');
      var title = bubbleGroup.querySelector('#hx-bubble-title');
      var desc = bubbleGroup.querySelector('#hx-bubble-desc');
      var tip = bubbleGroup.querySelector('#hx-bubble-tip');

      // Set text content
      title.textContent = titleText || '';
      desc.textContent = descText || '';

      // Resolve and set icon
      if (window.hxIconResolver) {
        var asset = window.hxIconResolver.resolveIconAsset(titleText, iconText);
        if (asset && asset.imgUrls && asset.imgUrls.length > 0) {
          icoImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', asset.imgUrls[0]);
          icoImg.style.display = 'block';
          
          // Clear and add additional icons
          while (icoWrap.children.length > 1) {
            icoWrap.removeChild(icoWrap.lastChild);
          }
          
          if (asset.imgUrls.length > 1) {
            for (var i = 1; i < asset.imgUrls.length && i < 3; i++) {
              var extraImg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
              extraImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', asset.imgUrls[i]);
              extraImg.setAttribute('x', '16');
              extraImg.setAttribute('y', String(16 + i * (BUBBLE_CONFIG.iconSize + BUBBLE_CONFIG.iconGap)));
              extraImg.setAttribute('width', String(BUBBLE_CONFIG.iconSize));
              extraImg.setAttribute('height', String(BUBBLE_CONFIG.iconSize));
              extraImg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
              icoWrap.appendChild(extraImg);
            }
          }
        } else {
          icoImg.style.display = 'none';
        }
      }

      // Calculate bubble dimensions
      var textWidth = Math.max(
        title.getComputedTextLength(),
        desc.getComputedTextLength()
      );
      
      var bubbleWidth = Math.max(
        BUBBLE_CONFIG.minWidth,
        Math.min(
          window.innerWidth * BUBBLE_CONFIG.maxWidth,
          textWidth + BUBBLE_CONFIG.paddingX * 2 + BUBBLE_CONFIG.iconSize + BUBBLE_CONFIG.gapX
        )
      );
      
      var bubbleHeight = BUBBLE_CONFIG.paddingY * 2 + 40; // Approximate text height

      // Position and size bubble
      var position = computeClampedPosition(sx, sy, bubbleWidth, bubbleHeight);
      
      bg.setAttribute('x', position.x);
      bg.setAttribute('y', position.y);
      bg.setAttribute('width', bubbleWidth);
      bg.setAttribute('height', bubbleHeight);
      
      // Position tip
      tip.setAttribute('transform', 'translate(' + position.tipX + ',' + position.tipY + ')');
      
      // Show bubble
      bubbleGroup.style.display = 'block';
      
    } catch (error) {
      console.error('Error showing SVG bubble:', error);
    }
  }

  /**
   * Compute clamped position for bubble
   * @param {number} sx - Screen X
   * @param {number} sy - Screen Y
   * @param {number} width - Bubble width
   * @param {number} height - Bubble height
   * @returns {Object} - Position object
   */
  function computeClampedPosition(sx, sy, width, height) {
    var margin = BUBBLE_CONFIG.safeMargin;
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;
    
    var x = sx + 20; // Offset from target
    var y = sy - height / 2;
    
    // Clamp X position
    if (x + width > viewWidth - margin) {
      x = sx - width - 20; // Show on left side
    }
    if (x < margin) {
      x = margin;
    }
    
    // Clamp Y position
    if (y < margin) {
      y = margin;
    }
    if (y + height > viewHeight - margin) {
      y = viewHeight - height - margin;
    }
    
    // Calculate tip position
    var tipX, tipY;
    if (x > sx) {
      // Bubble on right, tip on left
      tipX = x - 12;
      tipY = sy;
    } else {
      // Bubble on left, tip on right
      tipX = x + width;
      tipY = sy;
    }
    
    return { x: x, y: y, tipX: tipX, tipY: tipY };
  }

  /**
   * Hide SVG bubble
   */
  function hide() {
    if (bubbleGroup) {
      bubbleGroup.style.display = 'none';
    }
  }

  /**
   * Show bubble for specific SVG element
   * @param {SVGElement} element - Target SVG element
   * @param {string} titleText - Title text
   * @param {string} descText - Description text
   * @param {string} iconText - Icon text
   */
  function showForElement(element, titleText, descText, iconText) {
    if (!element || !element.getBBox) return;
    
    try {
      var bbox = element.getBBox();
      var ctm = element.getScreenCTM();
      var centerX = bbox.x + bbox.width / 2;
      var centerY = bbox.y + bbox.height / 2;
      
      var point = element.ownerSVGElement.createSVGPoint();
      point.x = centerX;
      point.y = centerY;
      
      var screenPoint = point.matrixTransform(ctm);
      showAtScreen(screenPoint.x, screenPoint.y, titleText, descText, iconText);
    } catch (error) {
      console.error('Error showing bubble for element:', error);
    }
  }

  // Public API
  window.hxSvgBubble = {
    initialize: initialize,
    showAtScreen: showAtScreen,
    showForElement: showForElement,
    hide: hide,
    ensureSvgBubble: ensureSvgBubble,
    BUBBLE_CONFIG: BUBBLE_CONFIG
  };

  // Auto-initialize if SVG is already present
  document.addEventListener('DOMContentLoaded', function() {
    var svg = document.querySelector('svg');
    if (svg) {
      initialize(svg);
    }
  });

  console.log('HX SVG Bubble library loaded');

})();
