gsap.to(".square", {
  x: 1000,
  duration: 3,
  ease: "bounce",
  scrollTrigger: {
    trigger: ".square",
    start: "top 30%",
    end: "bottom 30%",
    markers: true,
    toggleClass: "red",
    toggleActions: "restart reverse restart reverse",
    //          onEnter, onLeave, onEnterBack, onLeaveBack
    // options: play, pause, resume, reset, restart, complete, reverse, none
  },
});
