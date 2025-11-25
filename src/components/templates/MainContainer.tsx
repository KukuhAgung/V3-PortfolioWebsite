import { type PropsWithChildren, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Cursor from "../atoms/Cursor";
import SocialIcons from "../fragments/SocialIcon";
import Landing from "./Landing";
import About from "../pages/AboutSection";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div className="container-main">
        <Landing>{children}</Landing>
      <About/>
      </div>
    </div>
  );
};

export default MainContainer;
