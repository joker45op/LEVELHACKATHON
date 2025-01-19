import React from "react";

function AstroSCR({ scr }) {

  // Helper function to render each content with title and description
  const renderContent = (title, description) => {
    return (
      <div className="border-[1px] border-gray-300 p-5 flex flex-col justify-center items-center">
        <h3 className="text-xl font-bold mb-4 text-gray-700">{title}</h3>
        <div className="text-center text-gray-700 mb-4">
          <p className="text-black">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8 border-[1px] border-gray-300 p-5">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Spiritual Content Recommendations</h2>
      
      {/* Grid for content display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {Object.entries(scr).map(([title, description], index) => (
          <div key={index}>
            {renderContent(title, description)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AstroSCR;
