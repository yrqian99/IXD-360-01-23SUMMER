// dashed lines

window.onload = function() {
    var svgCanvas = document.getElementById('svgCanvas');
  
    var svgCanvasWidth = window.innerWidth;
    var svgCanvasHeight = window.innerHeight;
    svgCanvas.setAttribute('viewBox', `0 0 ${svgCanvasWidth} ${svgCanvasHeight}`);
  
  
    // // Set SVG viewbox to ensure it scales correctly
    // svgCanvas.setAttribute('viewBox', '0 0 230 160');
  
    // Initial control points
    var controlPoint1 = 0;
    var controlPoint2 = svgCanvasWidth - 0;
  
    // Offset for the control points
    var offset1 = 0;
    var offset2 = 0;
  
    // Get the height of the SVG canvas
    var svgCanvasHeight = svgCanvas.getBoundingClientRect().height;
  
    // Define the vertical space between the paths
    var verticalSpace = 20;
  
    // Calculate how many paths to create
    var numPaths = Math.floor(svgCanvasHeight / verticalSpace) + 20 ;
  
    // Define the slope of the curve
    var curveSlope = 120;
  
    // Add a randomizeFactor
    var randomizeFactor = (Math.random() - 0.5) * 2; // -1 to 1

    //declare stroke colorRGB

    var rs = 0;
    var bs = 0;
    var gs = 0;

  
    // Create the paths
    var paths = [];
    for (var i = 0; i < numPaths; i++) {
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('stroke', 'rgba(255, 0, 0, 0.8)');
      path.setAttribute('fill', 'transparent');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('stroke-dasharray', '1, 10');
      path.setAttribute("stroke-linecap", "round");
      svgCanvas.appendChild(path);
      paths.push(path);
    }
  
    // Define the function to update the paths
    function updatePaths() {
  
        //create a gradient of line widths
        paths.forEach(function(path, i) {
        var strokeWidth = i * 0.05; 
        path.setAttribute('stroke-width', strokeWidth);
        path.setAttribute('stroke', `rgba(${rs}, ${bs}, ${gs}, 0.8)`);

  
        var yOffset = i * verticalSpace;
        var randomYOffset = yOffset + randomizeFactor;
        path.setAttribute('d', `M -100 ${yOffset + randomYOffset} Q${controlPoint1} ${yOffset} ${svgCanvasWidth / 2 } ${yOffset - curveSlope} Q${controlPoint2} ${yOffset} ${svgCanvasWidth + 100} ${yOffset + randomYOffset}`);
        // path.setAttribute('d', `M0 ${yOffset} Q${controlPoint1} ${yOffset} ${svgCanvasWidth / 2} ${yOffset - curveSlope} Q${controlPoint2} ${yOffset} ${svgCanvasWidth} ${yOffset}`);
        // path.setAttribute('d', `M0 ${yOffset} Q${controlPoint1} ${yOffset} 120 ${yOffset - 70} Q${controlPoint2} ${yOffset} 230 ${yOffset}`);
      });
    }
  
     // Interpolation function
     function interpolate(start, end, factor) {
      return start + (end - start) * factor;
  }


    // Assign the touch events
    document.body.addEventListener("touchstart", function(e) {
      if (e.touches.length > 1) {
          // If there are two touches, decide which one is on the left
          if (e.touches[0].clientX < e.touches[1].clientX) {
              // touch[0] is on the left
              offset1 = controlPoint1 - e.touches[0].clientX;
              offset2 = controlPoint2 - e.touches[1].clientX;
          } else {
              // touch[1] is on the left
              offset1 = controlPoint1 - e.touches[1].clientX;
              offset2 = controlPoint2 - e.touches[0].clientX;
          }
      } else if (e.touches.length == 1) {
          // If there is only one touch, use it for both control points
          offset1 = controlPoint1 - e.touches[0].clientX;
          offset2 = controlPoint2 - e.touches[0].clientX;
      }
    });
  

    // var HOST = "172.20.10.8";
    var HOST = "192.168.1.66";
    

    document.body.addEventListener("touchmove", function(e) {
      if (e.touches.length > 1) {
        var dx = controlPoint2 - controlPoint1;
        var normalizedDistance = Math.min(Math.abs(dx) / svgCanvasWidth, 1);

        // Interpolate each RGB channel separately
        var r = Math.floor(interpolate(255, 0, (1 - normalizedDistance)));
        var g = Math.floor(interpolate(255, 0, (1 - normalizedDistance)));
        var b = Math.floor(interpolate(255, 0, (1 - normalizedDistance)));

        rs = 255 - r;
        gs = 255 - g;
        bs = 255 - b;

        currentBGColor = `rgba(${r}, ${g}, ${b}, 1)`;
        document.body.style.backgroundColor = currentBGColor;

          if (e.touches[0].clientX < e.touches[1].clientX) {
              // touch[0] is on the left
              controlPoint1 = Math.min(Math.max(0, e.touches[0].clientX + offset1), svgCanvasWidth / 2);
              controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, e.touches[1].clientX + offset2), svgCanvasWidth);
          } else {
              // touch[1] is on the left
              controlPoint1 = Math.min(Math.max(0, e.touches[1].clientX + offset1), svgCanvasWidth / 2);
              controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, e.touches[0].clientX + offset2), svgCanvasWidth);
          }
      } 
    //   else if (e.touches.length == 1) {
    //       // If there is only one touch, use it for both control points
    //       controlPoint1 = Math.min(Math.max(0, e.touches[0].clientX + offset1), svgCanvasWidth / 2);
    //       controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, e.touches[0].clientX + offset2), svgCanvasWidth);
    //   }
  
      // Update the paths

      console.log(normalizedDistance)
      if(normalizedDistance === 0){
        console.log('Normalized distance is zero, starting delay.');
        setTimeout(function() {
            console.log('Delay over, starting redirect.');
            window.location.href = `http://${HOST}:5500/sequence/dotLine1/index.html`;
        }, 2000);
    }
      updatePaths();
    });
  
    // Initial update
    updatePaths();
  }
  
  