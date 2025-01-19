import React from "react";
import { motion } from "framer-motion";
import "./HeroSection.css";
import MyImage from "../assets/a.png"; // Replace with your image file path
import MyBackground from "../assets/b.png"; // Replace with your image file path
import LOGO from "../assets/logo.png"; // Replace with your image file path

const HeroSection = () => {
  return (
    <section
      className="hero-section relative text-white"
      style={{
        backgroundImage: `url(${MyBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        opacity: 0.88,
      }}
    >
      <nav className="fixed top-0 left-0 w-full bg-opacity-90 bg-black py-4 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-end px-6">
          {/* Logo */}
          <div className="flex items-center h-5">
            <span className="text-xl font-bold text-white">Astro Insights</span>
          </div>
        </div>
      </nav>
      {/* Container for Grid Layout */}
      <div className="h-[40vh] ">
        <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 h-full px-6">
          {/* Left Section: Text Content */}
          <div
            style={{
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            <h1 className="text-4xl font-bold text-white leading-tight">
              Discover Your Astrological Path
            </h1>
            <p className="mt-4 text-white text-lg">
              Unlock the mysteries of the stars and gain insights into your
              destiny with personalized astrology readings. Explore your zodiac
              sign, horoscope, and numerology to align with the universe’s
              energy.
            </p>
          </div>

          {/* Right Section: Animated Image */}
          <div className="flex justify-center">
            <motion.img
              src={MyImage}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              alt="Zodiac Wheel"
              className="w-[600px] lg:w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;