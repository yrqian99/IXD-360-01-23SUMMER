// script.js
// Declare pinchScale as a global variable
var pinchScale = 1;
var prevTouchDistance = 0;

window.onload = function() {
    var svgCanvas = document.getElementById('svgCanvas');

    var svgCanvasWidth = window.innerWidth;
    var svgCanvasHeight = window.innerHeight;
    svgCanvas.setAttribute('viewBox', `0 0 ${svgCanvasWidth} ${svgCanvasHeight}`);

    // Initial control points
    var controlPoint1 = 0;
    var controlPoint2 = svgCanvasWidth;

    // Offset for the control points
    var offset1 = 0;
    var offset2 = 0;

    // Get the height of the SVG canvas
    var svgCanvasHeight = svgCanvas.getBoundingClientRect().height;

    // Define the vertical space between the paths
    var verticalSpace = 10;

    // Calculate how many paths to create
    var numPaths = Math.floor(svgCanvasHeight / verticalSpace) + 6;

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
    function updatePaths(pinchScale) {
        paths.forEach(function(path, i) {
            var yOffset = i * verticalSpace;
            var startEndOffset = pinchScale * svgCanvasWidth / 2;
            var controlPoint1WithOffset = controlPoint1 + startEndOffset;
            var controlPoint2WithOffset = controlPoint2 - startEndOffset;
            path.setAttribute('d', `M${-startEndOffset} ${yOffset} Q${controlPoint1WithOffset} ${yOffset} ${svgCanvasWidth / 2} ${yOffset - 70} Q${controlPoint2WithOffset} ${yOffset} ${svgCanvasWidth + startEndOffset} ${yOffset}`);
        });
    }

    // Assign the touch events
    document.body.addEventListener("touchstart", function(e) {
        var touches = e.touches;

        if (touches.length > 1) {
            // Sort touches by clientX from smallest to largest
            [touch1, touch2] = Array.from(touches).sort((a, b) => a.clientX - b.clientX);

            offset1 = controlPoint1 - touch1.clientX;
            offset2 = controlPoint2 - touch2.clientX;
        } else if (touches.length === 1) {
            // If there is only one touch, use it for both control points
            offset1 = controlPoint1 - touches[0].clientX;
            offset2 = controlPoint2 - touches[0].clientX;
        }

        prevTouchDistance = 0;
    });

    document.body.addEventListener("touchmove", function(e) {
        handleTouch(e.touches);
    });

    function handleTouch(touches) {
        var touch1, touch2;
        var pinchScaleMin = 0.1; // Set the minimum pinch scale
        var pinchScaleMax = 3; // Set the maximum pinch scale

        if (touches.length > 1) {
            // Sort touches by clientX from smallest to largest
            [touch1, touch2] = Array.from(touches).sort((a, b) => a.clientX - b.clientX);

            controlPoint1 = Math.min(Math.max(0, touch1.clientX + offset1), svgCanvasWidth / 2);
            controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, touch2.clientX + offset2), svgCanvasWidth);

            // Calculate pinch scale based on the change in touch points distance
            var touchDistance = Math.abs(touch1.clientX - touch2.clientX);
            var pinchScaleChange = touchDistance - prevTouchDistance;

            pinchScale *= (1 + pinchScaleChange / svgCanvasWidth);
            pinchScale = Math.max(pinchScaleMin, Math.min(pinchScaleMax, pinchScale));

            prevTouchDistance = touchDistance;
        } else if (touches.length === 1) {
            // If there is only one touch, use it for both control points
            controlPoint1 = Math.min(Math.max(0, touches[0].clientX + offset1), svgCanvasWidth / 2);
            controlPoint2 = Math.min(Math.max(svgCanvasWidth / 2, touches[0].clientX + offset2), svgCanvasWidth);

            // Reset prevTouchDistance
            prevTouchDistance = 0;
        }

        // Update paths according to pinchScale
        updatePaths(pinchScale);
        console.log(pinchScale);
    }

    // Initial update
    updatePaths(pinchScale);
}
