/* eslint-disable prefer-const */
import { type PropsWithChildren } from "react";
import "../styles/Landing.css";
import { data } from "../../data";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = data.developer.fullName.split(" ");
  const firstName = nameParts[0] || data.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {firstName.toUpperCase()}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
          </div>
          <div className="landing-info">
            <h3>Front End</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Website</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Developer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
