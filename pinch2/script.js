document.addEventListener("DOMContentLoaded", function(){

    let circle1 = document.querySelector("#circle1");
    let circle2 = document.querySelector("#circle2");

    let container = document.querySelector("#container");

    let circleRadius = 50; // Since the circles have a diameter of 50px, their radius is half that amount.
    let containerRect = container.getBoundingClientRect();

    let circle1Pos = { x: containerRect.right - circleRadius*2, y: containerRect.top}; // upper right corner
    let circle2Pos = { x: containerRect.left, y: containerRect.bottom - circleRadius*2 }; // bottom left corner


    // Position the circles in their initial locations
    circle1.style.left = circle1Pos.x + "px";
    circle1.style.top = circle1Pos.y + "px";
    circle2.style.left = circle2Pos.x + "px";
    circle2.style.top = circle2Pos.y - 2* circleRadius + "px";

    // Listen for touchmove events
    container.addEventListener("touchmove", function (event) {
        let touches = event.changedTouches;

        if (touches.length > 1) {
            circle1Pos.x = touches[0].clientX - circleRadius;
            circle1Pos.y = touches[0].clientY - circleRadius;
            circle1.style.left = circle1Pos.x + "px";
            circle1.style.top = circle1Pos.y + "px";

            circle2Pos.x = touches[1].clientX - circleRadius;
            circle2Pos.y = touches[1].clientY - circleRadius;
            circle2.style.left = circle2Pos.x + "px";
            circle2.style.top = circle2Pos.y + "px";

            // Check for circle collision
            if (checkCircleCollision(circle1Pos, circle2Pos)) {
                container.style.backgroundColor = "red";
            } else {
                container.style.backgroundColor = "white";
            }
        }
    });

    // Function to check if the two circles are colliding
    function checkCircleCollision(pos1, pos2) {
        // Since the circles have a radius of 25 (half of their 50px diameter), we'll check if the distance between their centers is less than 50
        return Math.hypot(pos1.x - pos2.x, pos1.y - pos2.y) <= 2*circleRadius;
    }


});
