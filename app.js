gsap.to(".square", {
  x: 1000,
  duration: 8,
  scrollTrigger: {
    trigger: ".square2",
    start: "top 80%",
    end: "top 30%",
    markers: true,
    toggleClass: "red",
    scrub: true,
    pin: ".square",
    pinSpacing: true,
    toggleActions: "restart none none none",
    //          onEnter, onLeave, onEnterBack, onLeaveBack
    // options: play, pause, resume, reset, restart, complete, reverse, none
  },
});
