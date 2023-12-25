gsap.to(".square", {
  x: 700,
  duration: 3,
  ease: "bounce",
  scrollTrigger: {
    trigger: ".square",
    start: "top center",
    end: "bottom center",
    markers: true,
    toggleClass: "red",
  },
});
