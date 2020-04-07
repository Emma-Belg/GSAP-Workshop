/*1: ADVERTISEMENT*/

gsap.fromTo('.headline p', {x: 1700}, {x: -500, duration: 15, repeat: -1});

/*2: BOOKS + EYE ICON */


// make timeline for books
let tlBooks = gsap.timeline({paused: true});

// decide the animation
tlBooks.to(".first", {
    duration: 1.5,
    x: -600,
    ease: "bounce"
});

tlBooks.to(".second", {
    duration: 1.5,
    x: -500,
    ease: "ExpoInOut"
});

tlBooks.to(".third", {
    duration: 1.5,
    x: -400,
    ease: "ExpoInOut"
});

// select divs to be moved
const BOOKS = document.getElementById("eyes");

//add eventlisteners to it

BOOKS.addEventListener("mouseenter", function () {
    tlBooks.play();
});

//open and close eye (as in javascript hills)

let img = document.getElementById("eyes");
let imgSrc = img.src;
let imgHover = img.getAttribute("data-hover");

img.addEventListener("mouseenter", function () {
    img.setAttribute("src", imgHover);
});

img.addEventListener("mouseout", function () {
    img.setAttribute("src", imgSrc);
    tlBooks.reverse();
});

/*3: DUMMY TEXT: SCROLLMAGIC ANIMATION */


// ANIMATION FOR DUMMY TEXT
/*const dummyTitle = gsap.from(".dummytext", {
    y: "100%",
    duration: 1,
    opacity: 0
});*/


// INIT CONTROLLER  -- The controller is to connect the gsap with the scollmagic
let controller = new ScrollMagic.Controller();

// CREATE TRIGGER
//this must be put into an array otherwise it doesn't work for some reason
const trigger = Array.from(document.querySelectorAll(".dummytext"));
console.log(trigger);
//element represents the array element
trigger.forEach(function (element) {
    const TEXTTWEEN = gsap.from(element, {
        y: "20%",
        duration: 1,
        opacity: 0
    });


    // CREATE SCENE : A Scene defines where the controller should react and how.
    let DummyAnimation = new ScrollMagic.Scene({
        triggerElement: element, //this is from the array
        reverse: true
    })
        .setTween(TEXTTWEEN) //ADD SCENE TO CONTROLLER
        .addTo(controller)

        //ADD INDICATORS -- so you can see what it sees
        .addIndicators({
            colorStart: "orange"
        });

});
/*4: MOTIONPATH SMILEY + CONTROLLING IT
* -- dont forget the motion path PLUGIN!!!*/


//register the plugin (only once)
gsap.registerPlugin(MotionPathPlugin);

//centers the smiley div on path --otherwise it it sitting from the top left hand corner
gsap.set("#smiley", {xPercent: -50, yPercent: -50});

//The animation: smiley travels through path
let animation = gsap.to("#smiley", {
    duration: 9,
    motionPath: {
        path: "#path",
        autoRotate: true //head rotates with path
    }
});

// click handlers for controlling the tween instance...

document.querySelector("#play").onclick = () => animation.play();
document.querySelector("#pause").onclick = () => animation.pause();
document.querySelector("#resume").onclick = () => animation.resume();
document.querySelector("#reverse").onclick = () => animation.reverse();
document.querySelector("#restart").onclick = () => animation.restart();
