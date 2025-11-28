/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Skills.css";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const [windowsWidth, setWindowsWidth] = useState<number>(0);
  const containerRef = useRef<HTMLElement>(null);
  const hiddenBlocksCount = useRef<number>(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowsWidth(window.innerWidth);
      hiddenBlocksCount.current = 0;
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getBlocks = () => {
    if (windowsWidth <= 0) return null;
    const blockSize = windowsWidth * 0.05;
    const nbOfBlocks = Math.ceil(window.innerHeight / blockSize) + 2;

    return [...Array(nbOfBlocks).keys()].map((_, index) => (
      <div
        key={`block-${index}`}
        className="pixel-block"
        data-cursor="disable"
        onMouseEnter={(e) => colorize(e.target)}
      ></div>
    ));
  };

  const colorize = (el: any) => {

    const currentOpacity = gsap.getProperty(el, "opacity");

    if (currentOpacity as number < 0.01) return;

    gsap.killTweensOf(el);

    gsap.set(el, {
      backgroundColor: "#004cf1",
      opacity: 1, 
      boxShadow: "0 0 10px #004cf1, 0 0 20px #004cf1",
    });

    gsap.to(el, {
      backgroundColor: "transparent",
      boxShadow: "none",
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.1,

      onComplete: () => {
        hiddenBlocksCount.current += 1;
        const allBlocks =
          containerRef.current?.querySelectorAll(".pixel-block");
        const totalBlocks = allBlocks?.length || 0;

        if (totalBlocks > 0 && hiddenBlocksCount.current >= totalBlocks * 0.9) {
          resetGrid(allBlocks);
        }
      },
    });
  };

  const resetGrid = (blocks: any) => {
    hiddenBlocksCount.current = 0;
    gsap.to(blocks, {
      opacity: 1,
      backgroundColor: "transparent",
      duration: 0.5,
      stagger: {
        amount: 0.5, 
        grid: "auto", 
        from: "random", 
      },
      clearProps: "transition", 
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from("h2", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        ".skill-item",
        {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="skills" id="skills">
      <div className="skills-grid" data-cursor="disable">
        {windowsWidth > 0 &&
          [...Array(20).keys()].map((_, index) => (
            <div key={"column_" + index} className="skills-column">
              {getBlocks()}
            </div>
          ))}
      </div>

      <div className="skills-content-wrapper">
        <h2>My Techstack</h2>
        <div className="skills-list">
          {[
            "React",
            "TypeScript",
            "Three.js",
            "GSAP",
            "Tailwind",
            "Next.js",
            "Node.js",
            "PostgreSQL",
          ].map((skill, index) => (
            <div key={index} className="skill-item">
              <span className="text-xl font-medium text-gray-300">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
