import React from "react";
import HeroSection from './HeroSection';
import SecondSection from './SecondSection';
import AstrologyForm from "./AstrologyForm";
import BackgroundTwo from "../assets/g.png";

function Home() {
  return (
    <>
      {/* <LandPage /> */}
      {/* <Works /> */}
      <HeroSection />
      <section
      className="hero-section relative text-white"
      style={{
        backgroundImage: `url(${BackgroundTwo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.88,
      }}
    >
      <SecondSection />
      
      <AstrologyForm />
      
      </section>
    </>
  );
}


export default Home;