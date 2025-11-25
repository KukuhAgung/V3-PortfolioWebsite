/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect } from "react";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../templates/Loading";

export default function HeroSection() {
  const { setLoading } = useLoading();

  const progress = setProgress((value) => setLoading(value));

  useEffect(() => {
    setTimeout(() => {
      progress.loaded().then(() => {});
    }, 2000);

    return () => {
      progress.clear();
    };
  }, []);

  return (
    <>
      <div className="person-container">
        <img
          className="landing-image"
          src="/src/assets/images/person.webp"
          alt="person"
          loading="lazy"
        />
      </div>
    </>
  );
}
