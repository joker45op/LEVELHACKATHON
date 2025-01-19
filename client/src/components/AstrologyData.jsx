import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AstroForm from "./AstroForm";
import AstroImage from "./AstroImage";
import AstroTable from "./AstroTable";
import AstroHoro from "./AstroHoro";
import AstroInsighte from "./AstroInsighte";
import AstroGem from "./AstroGem";
import AstroPooja from "./AstroPooja";
import AstroSCR from "./AstroSCR";
import jsonData from "./j.json";
import { useAppContext } from "../context/AppContext";

const AstrologyData = ({ data }) => {

  const { responseData } = useAppContext();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const result = responseData;
        console.log(result);
        setResult(result);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData(); // Call the function inside useEffect
  }, [data]); // Add 'data' as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full">
        <div className="grid grid-cols-2 gap-8">
          <AstroForm jsonData={jsonData} />
          <AstroImage name={jsonData.svg_path} />
        </div>
        <AstroTable kundaliData={jsonData.kundali_data} />
        {console.log(jsonData)}
        <AstroHoro horoscopes={jsonData.horoscopes} />
        <AstroInsighte insi={jsonData.astro_insights["Astrological Insights"]} />
        <AstroGem gemstones={jsonData.astro_insights["Gemstone Suggestions"]} />
        <AstroPooja dos={jsonData.astro_insights["Pooja Suggestions"]} />
        <AstroSCR scr={jsonData.astro_insights["Spiritual Content Recommendations"]} />
      </div>
    </div>
  );
};

AstrologyData.propTypes = {
  data: PropTypes.shape({
    fname: PropTypes.string.isRequired,
    lname: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    city: PropTypes.string.isRequired,
    output_dir: PropTypes.string.isRequired,
  }).isRequired,
};

export default AstrologyData;
