import { data } from "../../data";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me" data-cursor="scale">
        <h3 className="title">{data.about.title}</h3>
        <p className="para">{data.about.description}</p>
      </div>
    </div>
  );
};

export default About;
