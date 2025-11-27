/* eslint-disable prefer-const */
import "../styles/Portfolio.css";
import PortfolioImage from "./component/PortfolioImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { data } from "../../data";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  useEffect(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("portfolio-box");
      if (box.length === 0) return;
      const rectLeft = document
        .querySelector(".portfolio-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".portfolio-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "portfolio",
      },
    });

    timeline.to(".portfolio-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("portfolio")?.kill();
    };
  }, []);
  return (
    <div className="portfolio-section" id="portfolio">
      <div className="portfolio-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="portfolio-flex">
          {data.projects.map((project, index) => (
            <div className="portfolio-box" key={project.id}>
              <div className="portfolio-info">
                <div className="portfolio-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.technologies}</p>
              </div>
              <PortfolioImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
