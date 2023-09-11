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
  
    var verticalSpace = 50;
  
    var numPaths = Math.floor(svgCanvasHeight / verticalSpace) + 11 ;
  
    var curveSlope = 200;
  
    var randomizeFactor = (Math.random() - 0.5) * 2;
    
    var stopOpacity1 = 0.8; // default stop opacity for stop1
    var stopOpacity2 = 0.2; // default stop opacity for stop2
    


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
  
   // Interpolation function
    function interpolate(start, end, factor) {
      return start + (end - start) * factor;
  }


    // var HOST = "172.20.10.8";
    var HOST = "192.168.1.66";
  
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
          
          
          stopOpacity1 = 0.8 + (1 - normalizedDistance)* 0.2;
          stopOpacity2 = 0.2 + (1 - normalizedDistance)* 0.2;


          // Interpolate each RGB channel separately
          var r = Math.floor(interpolate(0, 255, (1 - normalizedDistance)));
          var g = Math.floor(interpolate(0, 255, (1 - normalizedDistance)));
          var b = Math.floor(interpolate(0, 255, (1 - normalizedDistance)));

          currentBGColor = `rgba(${r}, ${g}, ${b}, 1)`;
          document.body.style.backgroundColor = currentBGColor;
  
          // currentBGColor = `rgba(${Math.floor(normalizedDistance * 255)}, ${Math.floor(normalizedDistance * 255)}, ${Math.floor(normalizedDistance * 255)}, 1)`;
          // document.body.style.backgroundColor = currentBGColor;
  
  
          if (e.touches[0].clientX < e.touches[1].clientX) {
              controlPoint1 = Math.min(Math.max(0, e.touches[0].clientX + offset1), svgCanvasWidth / 2);
              controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, e.touches[1].clientX + offset2), svgCanvasWidth);
          } else {
              controlPoint1 = Math.min(Math.max(0, e.touches[1].clientX + offset1), svgCanvasWidth / 2);
              controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, e.touches[0].clientX + offset2), svgCanvasWidth);
          }

          if(normalizedDistance === 0){
            console.log('Normalized distance is zero, starting delay.');
            setTimeout(function() {
                console.log('Delay over, starting redirect.');
                window.location.href = `http://${HOST}:5500/sequence/dotted/index.html`;
            }, 2000);
          }
    
          updatePaths();

        //   //jump to page 8 to create sequence
        //   console.log(normalizedDistance)
        //   if(normalizedDistance < 0.01){
        //     window.location.href = "http://192.168.1.66:5500/pinch8/index.html";
        // }
      }   else if (e.touches.length == 1) {
        controlPoint1 = Math.min(Math.max(0, e.touches[0].clientX + offset1), svgCanvasWidth / 2);
        controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, e.touches[0].clientX + offset2), svgCanvasWidth);
        updatePaths();
    }
  
    lastNumTouches = e.touches.length; // update last number of touches
  });
  
  updatePaths();
  }
  