document.addEventListener("DOMContentLoaded", function() {

    let circle1 = document.querySelector("#finger1");
    let circle2 = document.querySelector("#finger2");

    let container = document.querySelector("#container");

    let circleRadius = 37.5; // radius of a circle.

    // Position the circles in their initial locations
    circle1.style.left = "75vw";
    circle1.style.top = "25vh";
    circle2.style.left = "25vw";
    circle2.style.top = "75vh";

    // Define the minimum and maximum distances between the two circles
    let minDistance = 0;
    let maxDistance = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2)); 

    // Color stop initial values
    const initialPinkStop = 5;
    const initialWhiteStop = 10;

    // Listen for touchmove events
    container.addEventListener("touchmove", function (event) {

        event.preventDefault();

        let touches = event.changedTouches;

        if (touches.length > 1) {
            let circle1Pos = { x: touches[0].clientX, y: touches[0].clientY };
            let circle2Pos = { x: touches[1].clientX, y: touches[1].clientY };

            // Position the circles at the touch points
            circle1.style.left = circle1Pos.x - circleRadius + "px";
            circle1.style.top = circle1Pos.y - circleRadius + "px";
            circle2.style.left = circle2Pos.x - circleRadius + "px";
            circle2.style.top = circle2Pos.y - circleRadius + "px";

            // Calculate the distance between the two touch points
            let distance = Math.hypot(circle1Pos.x - circle2Pos.x, circle1Pos.y - circle2Pos.y);

            // Normalize the distance to a value between 1% and initialPinkStop for pink color stop
            // and between initialPinkStop and initialWhiteStop for white color stop
            let normalizedDistance = 1 + (initialPinkStop - 1) * ((distance - minDistance) / (maxDistance - minDistance));
            let whiteNormalizedDistance = initialPinkStop + (initialWhiteStop - initialPinkStop) * ((distance - minDistance) / (maxDistance - minDistance));

            // Set the color stop for the radial gradient
            container.style.background = `radial-gradient(circle at center, red 1%, pink ${normalizedDistance}%, white ${whiteNormalizedDistance}%)`;

            console.log(`Normalized distance for gradient (pink color stop): ${normalizedDistance}%`);
            console.log(`Normalized distance for gradient (white color stop): ${whiteNormalizedDistance}%`);
        }
    });

    // Function to check if the two circles are colliding
    function checkCircleCollision(pos1, pos2, radius) {
        // Since the circles have a radius of 37.5, we'll check if the distance between their centers is less than their combined diameters
        return Math.hypot(pos1.x - pos2.x, pos1.y - pos2.y) <= 4*radius;
    }
});
