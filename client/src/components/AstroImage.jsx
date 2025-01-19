import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function AstroImage({ name }) {
  const [svgData, setSvgData] = useState(null);

  useEffect(() => {
    // Fetch the raw SVG image data from the API
    const fetchSvgData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${name}`); // Replace with your API URL
        const data = await response.text(); // Use .text() to get raw SVG content
        setSvgData(data);
      } catch (error) {
        console.error('Error fetching SVG data:', error);
      }
    };

    fetchSvgData();
  }, [name]); // Trigger fetch when `name` changes

  return (
    <div className="border-[1px] border-gray-300 p-5 flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Birth Chart</h2>
      <div className="w-96 h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
        {/* Render SVG if data is available */}
        {svgData ? (
          <div
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: svgData }} // Inject raw SVG content
          />
        ) : (
          <span className="text-gray-400 text-center">Image Placeholder</span>
        )}
      </div>
    </div>
  );
}

// PropTypes validation for name prop
AstroImage.propTypes = {
  name: PropTypes.string.isRequired, // The name prop should be a string
};

export default AstroImage;
