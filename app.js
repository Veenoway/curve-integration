gsap.to(".square", {
  x: 1000,
  duration: 3,
  scrollTrigger: {
    trigger: ".square",
    start: "top 80%",
    end: "top 30%",
    markers: true,
    toggleClass: "red",
    scrub: true,
    toggleActions: "restart none none none",
    //          onEnter, onLeave, onEnterBack, onLeaveBack
    // options: play, pause, resume, reset, restart, complete, reverse, none
  },
});
