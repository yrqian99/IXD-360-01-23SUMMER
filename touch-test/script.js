<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function(){
    let topHalf = document.getElementById("top-half");
    let circles = document.getElementsByClassName("circle");


    let touchStartX;

    document.addEventListener("touchstart", e => {
        console.log("start")
        touchStartX = e.touches[0].clientX;
    })

    document.addEventListener("touchmove", e => {
        console.log("move");
        let touchMoveX = e.touches[0].clientX;
    
        if (touchMoveX > touchStartX) {
            // Moved right, increase radius and decrease scaleX
            let newRadius = Math.min(100, 25 + (touchMoveX - touchStartX) / 10);
            topHalf.style.borderRadius = newRadius + "px";
            
            for(let i=0; i<circles.length; i++){
                circles[i].style.transform = `scaleX(${Math.max(0.5, 1 - (touchMoveX - touchStartX) / 100)})`;
            }
        } else if (touchMoveX < touchStartX) {
            // Moved left, decrease radius and scale
            let newRadius = Math.max(0, 25 - (touchStartX - touchMoveX) / 10);
            topHalf.style.borderRadius = newRadius + "px";
            
            for(let i=0; i<circles.length; i++){
                circles[i].style.transform = `scaleX(${Math.min(2, 1 + (touchStartX - touchMoveX) / 100)})`;
            }
        }
    });


    document.addEventListener("touchend", e => {
        console.log("end")
    })
});
=======
// document.addEventListener("touchstart", e => {
//     console.log("start")
// });

// document.addEventListener("touchmove", e => {
//     console.log("move")
// });

// document.addEventListener("touchend", e => {
//     console.log("end")
// });

document.addEventListener('click', e => {
    console.log("clicked")
});
>>>>>>> da5dc09a297c6c26aa261cbc747b2ebdd1354284
