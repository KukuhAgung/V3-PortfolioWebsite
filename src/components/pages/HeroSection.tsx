/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useEffect } from "react";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../templates/Loading";
import { setAllTimeline } from "./utils/GsapScroll";

export default function HeroSection() {
  const { setLoading } = useLoading();

  useEffect(() => {
    const timelineContext = setAllTimeline();

    const progressControl = setProgress((value) => setLoading(value));

    setTimeout(() => {
      progressControl.loaded().then(() => {
        setAllTimeline();
      });
    }, 2000);
    
    return () => {
      timelineContext && timelineContext.revert();
    };
  }, []);

  return (
    <>
      <div className="person-container">
        <img
          className="landing-image"
          src="/images/person.webp"
          alt="person"
          loading="lazy"
        />
      </div>
    </>
  );
}
