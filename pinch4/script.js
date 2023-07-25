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
            container.style.background = `radial-gradient(circle at center, rgba(248, 75, 75, 0.956) 1%, rgb(246, 196, 185) ${normalizedDistance}% , rgb(255, 223, 211) ${whiteNormalizedDistance}%)`;
            console.log(`Normalized distance for gradient (pink color stop): ${normalizedDistance}%`);
            console.log(`Normalized distance for gradient (white color stop): ${whiteNormalizedDistance}%`);

            // Check for collision
            if (checkCircleCollision(circle1Pos, circle2Pos, circleRadius)) {
                triggerBloodEffect((circle1Pos.x + circle2Pos.x) / 2, (circle1Pos.y + circle2Pos.y) / 2);
            }
        }
    });

    // Function to check if the two circles are colliding
    function checkCircleCollision(pos1, pos2, radius) {
        // Since the circles have a radius of 37.5, we'll check if the distance between their centers is less than their combined diameters
        let collide = Math.hypot(pos1.x - pos2.x, pos1.y - pos2.y) <= 3*radius;
        return collide;
    }

    // Function to trigger the blood exploding effect
    function triggerBloodEffect(x, y) {
        for (let i = 0; i < 50; i++) {
            // Create a new blood particle
            let particle = document.createElement("div");

            // Style the particle as a small, red circle
            particle.style.position = "absolute";
            particle.style.width = "8px";
            particle.style.height = "8px";
            particle.style.borderRadius = "50%";
            particle.style.backgroundColor = "rgba(247, 98, 98, 0.5)";
            
            // Position the particle at the collision point
            particle.style.left = x + "px";
            particle.style.top = y + "px";

            // Append the particle to the body of the document
            document.body.appendChild(particle);
            
            // Animate the particle to move outwards in a random direction
            let angle = Math.random() * 2 * Math.PI;
            let speed = Math.random() * 50;
            let vx = speed * Math.cos(angle);
            let vy = speed * Math.sin(angle);

            let particleAnimation = particle.animate([
                // keyframes
                { transform: `translate(0, 0)` },
                { transform: `translate(${vx}px, ${vy}px)` }
            ], { 
                // timing options
                duration: 1000,
                iterations: 1,
                easing: 'ease-out',
                fill: 'forwards'
            });

            // Remove the particle once the animation is done
            particleAnimation.onfinish = function() {
                particle.remove();
            };
        }
    }
});
