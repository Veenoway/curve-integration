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
  duration: 6,
});

tl.to(
  ".logo",
  {
    y: () => {
      const secondBox = document.querySelector(".second-box");
      const logo = document.querySelector(".logo");

      const secondBoxCenterY = secondBox.offsetTop + secondBox.offsetHeight / 2;
      const logoCenterY = logo.offsetTop + logo.offsetHeight / 2;

      return secondBoxCenterY - logoCenterY;
    },
    x: 350,
    scale: "+=0.3",
    rotate: 360,
    duration: 6,
  },
  ">=0"
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
    toggleActions: "restart none none none",
    //          onEnter, onLeave, onEnterBack, onLeaveBack
    // options: play, pause, resume, reset, restart, complete, reverse, none
  },
});

gsap.fromTo(
  ".subtitle",
  {
    x: -200,
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    duration: 4,
    scrollTrigger: {
      trigger: ".second-box",
      start: "top center",
      end: "center center",
      scrub: true,
      toggleActions: "restart none none none",
      //          onEnter, onLeave, onEnterBack, onLeaveBack
      // options: play, pause, resume, reset, restart, complete, reverse, none
    },
  }
);

gsap.fromTo(
  ".description",
  { x: -100, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 4,
    delay: 4,
    scrollTrigger: {
      trigger: ".second-box",
      start: "top+=100 center",
      end: "center+=100 center",
      scrub: true,
      toggleActions: "restart none none none",
    },
  }
);
