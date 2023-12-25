// gsap.to(".square", {
//   x: 1000,
//   duration: 8,
//   scrollTrigger: {
//     trigger: ".square2",
//     start: "top 80%",
//     end: "top 30%",
//     markers: true,
//     toggleClass: "red",
//     scrub: true,
//     pin: ".square",
//     pinSpacing: true,
//     toggleActions: "restart none none none",
//     //          onEnter, onLeave, onEnterBack, onLeaveBack
//     // options: play, pause, resume, reset, restart, complete, reverse, none
//   },
// });

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".second-box",
    start: "top 100%",
    end: "bottom 100%",
    markers: true,
    scrub: true,
    toggleActions: "restart none none none",
    //          onEnter, onLeave, onEnterBack, onLeaveBack
    // options: play, pause, resume, reset, restart, complete, reverse, none
  },
});

tl.to(".logo", {
  y: 500,
  scale: 1.6,
  rotate: 240,
  duration: 10,
});

tl.to(
  ".logo",
  {
    y: 850,
    x: 350,
    scale: 1.9,
    rotate: 360,
    duration: 6,
  },
  "+=0"
);

gsap.to(".title", {
  y: 0,
  duration: 10,
  scale: 1.5,
  delay: 0,
  scrollTrigger: {
    trigger: ".first-box",
    start: "bottom 100%",
    end: "bottom 80%",
    scrub: true,
    pin: ".title",
    pinSpacing: false,
    toggleActions: "restart none none none",
    //          onEnter, onLeave, onEnterBack, onLeaveBack
    // options: play, pause, resume, reset, restart, complete, reverse, none
  },
});
