import { useRef, useLayoutEffect } from "react"; // Gunakan useLayoutEffect
import "../styles/Portfolio.css";
import PortfolioImage from "./component/PortfolioImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { data } from "../../data";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const flexContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const flexContainer = flexContainerRef.current;

      if (!section || !flexContainer) return;

      const getScrollAmount = () => {
        return -(flexContainer.scrollWidth - window.innerWidth);
      };

      const tween = gsap.to(flexContainer, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="portfolio-section" id="work">
      <div className="portfolio-container section-container">
        <h2 data-cursor="scale">
          My <span>Work</span>
        </h2>

        <div ref={flexContainerRef} className="portfolio-flex">
          {data.projects.map((project, index) => (
            <div className="portfolio-box" key={project.id}>
              <div className="portfolio-info">
                <div className="portfolio-title" data-cursor="scale">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4 data-cursor="scale">Tools and features</h4>
                <p data-cursor="scale">{project.technologies}</p>
              </div>
              <PortfolioImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
