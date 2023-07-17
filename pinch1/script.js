document.addEventListener("DOMContentLoaded", function(){

    let circle = document.getElementById("gradient-circle");
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener("touchstart", e => {
        console.log("start");
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener("touchmove", e => {
        let touchMoveX = e.touches[0].clientX;
        let touchMoveY = e.touches[0].clientY;
    
        // Calculate the hue based on the touch position, transitioning from pink (330) to red (0)
        let hue = Math.floor(330 + touchMoveX / window.innerWidth * 330);
    
        // Construct the HSL strings for the gradient
        let color1 = `hsl(${hue}, 100%, 50%)`;
        let color2 = hue >= 60 ? `hsl(${hue - 60}, 100%, 50%)` : `hsl(${hue + 300}, 100%, 50%)`;
    
        // Apply the gradient to the circle
        let gradient = `radial-gradient(circle at center, ${color1}, ${color2})`;
        circle.style.background = gradient;

        // Change scaleX based on touch position difference from the start position
        let scaleX = 1 + (touchMoveX - touchStartX) / window.innerWidth;

        // Apply the scaleX transform to the circle
        circle.style.transform = `scaleX(${Math.max(0.5, scaleX)})`;
    });

    document.addEventListener("touchend", e => {
        console.log("end");
    });

});
