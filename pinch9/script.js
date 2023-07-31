window.onload = function() {
    var svgCanvas = document.getElementById('svgCanvas');
  
    var svgCanvasWidth = window.innerWidth;
    var svgCanvasHeight = window.innerHeight;
    svgCanvas.setAttribute('viewBox', `0 0 ${svgCanvasWidth} ${svgCanvasHeight}`);
  
    var controlPoint1 = 0;
    var controlPoint2 = svgCanvasWidth;
  
    var offset1 = 0;
    var offset2 = 0;
  
    var svgCanvasHeight = svgCanvas.getBoundingClientRect().height;
  
    var verticalSpace = 30;
  
    var numPaths = Math.floor(svgCanvasHeight / verticalSpace) + 12 ;
  
    var curveSlope = 80;
  
    var randomizeFactor = (Math.random() - 0.5) * 2;
    
    var stopOpacity1 = 0.3; // default stop opacity for stop1
    var stopOpacity2 = 0.08; // default stop opacity for stop2
    


    var paths = [];
    for (var i = 0; i < numPaths; i++) {
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      // path.setAttribute('stroke', 'rgba(255, 255, 255, 0.05)');
      path.setAttribute('fill', 'rgba(0, 0, 255, 0.05)');
      // path.setAttribute('stroke-width', '1');
      svgCanvas.appendChild(path);
      paths.push(path);
    }
  

    var lastNumTouches = 0; // track last number of touches
  
    function updatePaths() {
      paths.forEach(function(path, i) {
        var yOffset = i * verticalSpace;
        var randomYOffset = yOffset + randomizeFactor;
        path.setAttribute('d', `M -100 ${yOffset + randomYOffset} Q${controlPoint1} ${yOffset} ${svgCanvasWidth / 2 } ${yOffset - curveSlope} Q${controlPoint2} ${yOffset} ${svgCanvasWidth + 100} ${yOffset+ randomYOffset}`);
        path.setAttribute('fill', 'url(#myGradient)')
        document.getElementById('stop1').setAttribute('stop-opacity', stopOpacity1);
        document.getElementById('stop2').setAttribute('stop-opacity', stopOpacity2);
      });
    }
  
    document.body.addEventListener("touchstart", function(e) {
      
      if (e.touches.length > 1) {
          if (e.touches[0].clientX < e.touches[1].clientX) {
              offset1 = controlPoint1 - e.touches[0].clientX;
              offset2 = controlPoint2 - e.touches[1].clientX;
          } else {
              offset1 = controlPoint1 - e.touches[1].clientX;
              offset2 = controlPoint2 - e.touches[0].clientX;
          }
      } else if (e.touches.length == 1) {
          offset1 = controlPoint1 - e.touches[0].clientX;
          offset2 = controlPoint2 - e.touches[0].clientX;
      }
  
      lastNumTouches = e.touches.length; // update last number of touches
    });
  
  
    document.body.addEventListener("touchmove", function(e) {
  
      // Do not update control points when transitioning from two fingers to one
      if (lastNumTouches === 2 && e.touches.length === 1) {
          console.log(" 2 to 1 ");
          lastNumTouches = e.touches.length;
          return;
      }
  
      if (e.touches.length > 1) {
          var dx = controlPoint2 - controlPoint1;
          var normalizedDistance = Math.min(Math.abs(dx) / svgCanvasWidth, 1);
          
          
          stopOpacity1 = 0.3 + (1 - normalizedDistance)* 0.2;
          stopOpacity2 = 0.08 + (1 - normalizedDistance)* 0.2;
  
          currentBGColor = `rgba(${Math.floor(normalizedDistance * 255)}, ${Math.floor(normalizedDistance * 255)}, ${Math.floor(normalizedDistance * 255)}, 1)`;
          document.body.style.backgroundColor = currentBGColor;
  
  
  
          if (e.touches[0].clientX < e.touches[1].clientX) {
              controlPoint1 = Math.min(Math.max(0, e.touches[0].clientX + offset1), svgCanvasWidth / 2);
              controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, e.touches[1].clientX + offset2), svgCanvasWidth);
          } else {
              controlPoint1 = Math.min(Math.max(0, e.touches[1].clientX + offset1), svgCanvasWidth / 2);
              controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, e.touches[0].clientX + offset2), svgCanvasWidth);
          }
  
          updatePaths();
      }   else if (e.touches.length == 1) {
        controlPoint1 = Math.min(Math.max(0, e.touches[0].clientX + offset1), svgCanvasWidth / 2);
        controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, e.touches[0].clientX + offset2), svgCanvasWidth);
        updatePaths();
    }
  
    lastNumTouches = e.touches.length; // update last number of touches
  });
  
  updatePaths();
  }
  