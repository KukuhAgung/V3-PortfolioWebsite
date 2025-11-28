import "../styles/Experience.css";
import { data } from "../../data";

const Experience = () => {
  return (
    <div className="experience-section section-container">
      <div className="experience-container">
        <h2 data-cursor="scale">
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="experience-info">
          <div className="experience-timeline">
            <div className="experience-dot"></div>
          </div>
          {data.experiences.map((exp, index) => (
            <div key={index} className="experience-info-box">
              <div className="experience-info-in" data-cursor="scale">
                <div className="experience-role">
                  <h4>{exp.position}</h4>
                  <h5>{exp.company}</h5>
                </div>
                <h3>
                  {exp.period.includes("Present")
                    ? "NOW"
                    : exp.period.split(" - ")[1]}
                </h3>
              </div>
              <p data-cursor="scale">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
