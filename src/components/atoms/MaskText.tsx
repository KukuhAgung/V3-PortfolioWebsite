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
      gsap.fromTo(
        ".lineMask p",
        {
          y: "100%",
        },
        {
          y: "0%",
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.075,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
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
