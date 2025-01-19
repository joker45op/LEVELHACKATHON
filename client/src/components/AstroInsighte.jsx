import React from "react";

function AstroInsighte({ insi }) {
  console.log(insi);

  const renderSection = (title, content) => {
    return (
      <div className="mb-6">
        <p className="text-xl font-medium mb-4 text-[17px] text-gray-700">{title}</p>
        <div className="overflow-x-auto text-justify m-2">
          {Object.keys(content).map((key) => (
            <div key={key}>
              <strong>{key}: </strong> {content[key]}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8 border-[1px] border-gray-300 p-5">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Astrological Insights</h2>
      <hr />
      <div className="pt-5">
        {Object.keys(insi).map((category) => {
          const content = insi[category];
          return renderSection(category, content);
        })}
      </div>
    </div>
  );
}

export default AstroInsighte;
