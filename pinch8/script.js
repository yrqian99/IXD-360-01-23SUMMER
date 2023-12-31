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

  var verticalSpace = 20;

  var numPaths = Math.floor(svgCanvasHeight / verticalSpace) + 12 ;

  var curveSlope = 200;

  var randomizeFactor = (Math.random() - 0.5) * 2;
  

  var paths = [];
  for (var i = 0; i < numPaths; i++) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // path.setAttribute('stroke', 'rgba(255, 255, 255, 0.05)');
    path.setAttribute('fill', 'rgba(0, 0, 255, 0.05)');
    // path.setAttribute('stroke-width', '1');
    svgCanvas.appendChild(path);
    paths.push(path);
  }

  var currentColor = 'rgba(0, 0, 255, 0.05)'; // default color
  var lastNumTouches = 0; // track last number of touches

  function updatePaths(color) {
    paths.forEach(function(path, i) {
      var yOffset = i * verticalSpace;
      var randomYOffset = yOffset + randomizeFactor;
      path.setAttribute('d', `M0 ${yOffset + randomYOffset} Q${controlPoint1} ${yOffset} ${svgCanvasWidth / 2 } ${yOffset - curveSlope} Q${controlPoint2} ${yOffset} ${svgCanvasWidth} ${yOffset+ randomYOffset}`);
      path.setAttribute('fill', color)
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

        // currentColor = `rgba(${Math.floor((1 - normalizedDistance) * 255)}, 0, ${Math.floor(normalizedDistance * 255)}, ${0.05 + Math.sqrt(0.5 *(1 - normalizedDistance))})`;
        currentColor = `rgba(${Math.floor((1 - normalizedDistance) * 255)}, 10, ${Math.floor(normalizedDistance * 255)}, ${0.05 + (1 - normalizedDistance) * 0.35})`;
        // currentWeight = (1 - normalizedDistance)* 10;

        currentBGColor = `rgba(${Math.floor(normalizedDistance * 255)}, ${Math.floor(normalizedDistance * 255)}, ${Math.floor(normalizedDistance * 255)}, 0.8)`;
        document.body.style.backgroundColor = currentBGColor;



        if (e.touches[0].clientX < e.touches[1].clientX) {
            controlPoint1 = Math.min(Math.max(0, e.touches[0].clientX + offset1), svgCanvasWidth / 2);
            controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, e.touches[1].clientX + offset2), svgCanvasWidth);
        } else {
            controlPoint1 = Math.min(Math.max(0, e.touches[1].clientX + offset1), svgCanvasWidth / 2);
            controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, e.touches[0].clientX + offset2), svgCanvasWidth);
        }

        updatePaths(currentColor);
    }   else if (e.touches.length == 1) {
      controlPoint1 = Math.min(Math.max(0, e.touches[0].clientX + offset1), svgCanvasWidth / 2);
      controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, e.touches[0].clientX + offset2), svgCanvasWidth);
      updatePaths(currentColor);
  }

  lastNumTouches = e.touches.length; // update last number of touches
});

updatePaths(currentColor);
}
