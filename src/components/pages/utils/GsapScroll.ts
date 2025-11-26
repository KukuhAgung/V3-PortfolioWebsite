import gsap from "gsap";

export function setAllTimeline() {
  const ctx = gsap.context(() => {
    const experienceTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".experience-section",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    experienceTimeline
      .fromTo(
        ".experience-timeline",
        { maxHeight: "0%" },
        { maxHeight: "100%", duration: 1, ease: "none" },
        0
      )
      .fromTo(
        ".experience-timeline",
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        0
      )
      .fromTo(
        ".experience-info-box",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 },
        0.1
      );

    if (window.innerWidth > 1024) {
      gsap.to(".experience-section", {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: ".experience-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  });

  return ctx;
}
