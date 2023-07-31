// window.onload = function() {
//   // Get the path element
//   var pathElement = document.getElementById('animatedPath');

//   // Initial control points
//   var controlPoint1 = 10;
//   var controlPoint2 = 220;

//   // Offset for the control points
//   var offset1 = 0;
//   var offset2 = 0;

//   // Define the function to update the path
//   function updatePath() {
//     pathElement.setAttribute('d', `M10 80 Q${controlPoint1} 80 120 20 Q${controlPoint2} 80 230 80`);
//   }

//   // Assign the touch events
//   document.body.addEventListener("touchstart", function(e) {
//     // Calculate the offset at the start of the touch
//     if (e.touches[0]) {
//       offset1 = controlPoint1 - e.touches[0].clientX;
//     }

//     if (e.touches[1]) {
//       offset2 = controlPoint2 - e.touches[1].clientX;
//     }
//   });

//   document.body.addEventListener("touchmove", function(e) {
//     // Use the touch position to change the control points, adding the offset
//     if (e.touches[0]) {
//       controlPoint1 = Math.min(Math.max(10, e.touches[0].clientX + offset1), 140);
//     }

//     if (e.touches[1]) {
//       controlPoint2 = Math.min(Math.max(150, e.touches[1].clientX + offset2), 220);
//     }

//     // Update the path
//     updatePath();
//   });
// }



// window.onload = function() {
//   // Get the path element and svg canvas
//   var pathElement = document.getElementById('animatedPath');
//   var svgCanvas = document.getElementById('svgCanvas');

//   // Set SVG viewbox to ensure it scales correctly
//   svgCanvas.setAttribute('viewBox', '0 0 300 200');

//   // Initial control points
//   var controlPoint1 = 10;
//   var controlPoint2 = 230;

//   // Offset for the control points
//   var offset1 = 0;
//   var offset2 = 0;

//   // Define the function to update the path
//   function updatePath() {
//     pathElement.setAttribute('d', `M10 80 Q${controlPoint1} 80 120 20 Q${controlPoint2} 80 230 80`);
//   }

//   // Assign the touch events
//   document.body.addEventListener("touchstart", function(e) {
//     // Calculate the offset at the start of the touch
//     if (e.touches[0]) {
//       offset1 = controlPoint1 - e.touches[0].clientX;
//     }

//     if (e.touches[1]) {
//       offset2 = controlPoint2 - e.touches[1].clientX;
//     }
//   });

//   document.body.addEventListener("touchmove", function(e) {
//     // Use the touch position to change the control points, adding the offset
//     if (e.touches[0]) {
//       controlPoint1 = Math.min(Math.max(10, e.touches[0].clientX + offset1), 140);
//     }

//     if (e.touches[1]) {
//       controlPoint2 = Math.min(Math.max(150, e.touches[1].clientX + offset2), 230);
//     }

//     // Update the path
//     updatePath();
//   });
// }

// ---------------------three lines---------------------------------

// window.onload = function() {
//   // Get the path element and svg canvas
//   var pathElement = document.getElementById('animatedPath');
//   var pathElement1 = document.getElementById('animatedPath1');
//   var pathElement2 = document.getElementById('animatedPath2');
//   var svgCanvas = document.getElementById('svgCanvas');

//   // // Set SVG viewbox to ensure it scales correctly
//   // svgCanvas.setAttribute('viewBox', '0 0 300 200');

//   // Initial control points
//   var controlPoint1 = 0;
//   var controlPoint2 = 230;

//   // Offset for the control points
//   var offset1 = 0;
//   var offset2 = 0;

//   // Define the function to update the path
//   function updatePath() {
//     pathElement.setAttribute('d', `M0 80 Q${controlPoint1} 80 120 0 Q${controlPoint2} 80 230 80`);
//   }

//   function updatePath1() {
//     pathElement1.setAttribute('d', `M0 120 Q${controlPoint1} 120 120 10 Q${controlPoint2} 120 230 120`);
//   }

//   function updatePath2() {
//     pathElement2.setAttribute('d', `M0 160 Q${controlPoint1} 160 120 20 Q${controlPoint2} 160 230 160`);
//   }

//   // Assign the touch events
//   document.body.addEventListener("touchstart", function(e) {
//     if (e.touches.length > 1) {
//         // If there are two touches, decide which one is on the left
//         if (e.touches[0].clientX < e.touches[1].clientX) {
//             // touch[0] is on the left
//             offset1 = controlPoint1 - e.touches[0].clientX;
//             offset2 = controlPoint2 - e.touches[1].clientX;
//         } else {
//             // touch[1] is on the left
//             offset1 = controlPoint1 - e.touches[1].clientX;
//             offset2 = controlPoint2 - e.touches[0].clientX;
//         }
//     } else if (e.touches.length == 1) {
//         // If there is only one touch, use it for both control points
//         offset1 = controlPoint1 - e.touches[0].clientX;
//         offset2 = controlPoint2 - e.touches[0].clientX;
//     }
//   });

//   document.body.addEventListener("touchmove", function(e) {
//     if (e.touches.length > 1) {
//         if (e.touches[0].clientX < e.touches[1].clientX) {
//             // touch[0] is on the left
//             controlPoint1 = Math.min(Math.max(0, e.touches[0].clientX + offset1), 120);
//             controlPoint2 = Math.min(Math.max(120, e.touches[1].clientX + offset2), 230);
//         } else {
//             // touch[1] is on the left
//             controlPoint1 = Math.min(Math.max(0, e.touches[1].clientX + offset1), 120);
//             controlPoint2 = Math.min(Math.max(120, e.touches[0].clientX + offset2), 230);
//         }
//     } else if (e.touches.length == 1) {
//         // If there is only one touch, use it for both control points
//         controlPoint1 = Math.min(Math.max(0, e.touches[0].clientX + offset1), 120);
//         controlPoint2 = Math.min(Math.max(120, e.touches[0].clientX + offset2), 230);
//     }

//     // Update the path
//     updatePath();
//     updatePath1();
//     updatePath2();
//   });
// }


// ---------------------generated lines---------------------------------


window.onload = function() {
  var svgCanvas = document.getElementById('svgCanvas');

  var svgCanvasWidth = window.innerWidth;
  var svgCanvasHeight = window.innerHeight;
  svgCanvas.setAttribute('viewBox', `0 0 ${svgCanvasWidth} ${svgCanvasHeight}`);


  // // Set SVG viewbox to ensure it scales correctly
  // svgCanvas.setAttribute('viewBox', '0 0 230 160');

  // Initial control points
  var controlPoint1 = 0;
  var controlPoint2 = svgCanvasWidth;

  // Offset for the control points
  var offset1 = 0;
  var offset2 = 0;

  // Get the height of the SVG canvas
  var svgCanvasHeight = svgCanvas.getBoundingClientRect().height;

  // Define the vertical space between the paths
  var verticalSpace = 5;

  // Calculate how many paths to create
  var numPaths = Math.floor(svgCanvasHeight / verticalSpace) + 12 ;

  // Define the slope of the curve
  var curveSlope = 300;

  // Add a randomizeFactor
  var randomizeFactor = (Math.random() - 0.5) * 2; // -1 to 1

  // Create the paths
  var paths = [];
  for (var i = 0; i < numPaths; i++) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke', 'black');
    path.setAttribute('fill', 'transparent');
    svgCanvas.appendChild(path);
    paths.push(path);
  }

  // Define the function to update the paths
  function updatePaths() {
    paths.forEach(function(path, i) {
      var yOffset = i * verticalSpace;
      var randomYOffset = yOffset + randomizeFactor;
      path.setAttribute('d', `M0 ${yOffset} Q${controlPoint1} ${yOffset} ${svgCanvasWidth / 2 } ${yOffset - curveSlope + randomYOffset} Q${controlPoint2} ${yOffset} ${svgCanvasWidth} ${yOffset}`);
      // path.setAttribute('d', `M0 ${yOffset} Q${controlPoint1} ${yOffset} ${svgCanvasWidth / 2} ${yOffset - curveSlope} Q${controlPoint2} ${yOffset} ${svgCanvasWidth} ${yOffset}`);
      // path.setAttribute('d', `M0 ${yOffset} Q${controlPoint1} ${yOffset} 120 ${yOffset - 70} Q${controlPoint2} ${yOffset} 230 ${yOffset}`);
    });
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

  document.body.addEventListener("touchmove", function(e) {
    if (e.touches.length > 1) {
        if (e.touches[0].clientX < e.touches[1].clientX) {
            // touch[0] is on the left
            controlPoint1 = Math.min(Math.max(0, e.touches[0].clientX + offset1), svgCanvasWidth / 2);
            controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, e.touches[1].clientX + offset2), svgCanvasWidth);
        } else {
            // touch[1] is on the left
            controlPoint1 = Math.min(Math.max(0, e.touches[1].clientX + offset1), svgCanvasWidth / 2);
            controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, e.touches[0].clientX + offset2), svgCanvasWidth);
        }
    } else if (e.touches.length == 1) {
        // If there is only one touch, use it for both control points
        controlPoint1 = Math.min(Math.max(0, e.touches[0].clientX + offset1), svgCanvasWidth / 2);
        controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, e.touches[0].clientX + offset2), svgCanvasWidth);
    }

    // Update the paths
    updatePaths();
  });

  // Initial update
  updatePaths();
}

