import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { data } from "../../data";
import "../styles/MaskText.css";

gsap.registerPlugin(ScrollTrigger);

export function MaskText() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".lineMask p"); 

      gsap.fromTo(
        lines,
        {
          yPercent: 100,
          opacity: 0, 
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.1,

          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="masktext-container">
      {data.about.description.map((phrase, index) => {
        return (
          <div key={index} className="lineMask">
            <p>{phrase}</p>
          </div>
        );
      })}
    </div>
  );
}
