import React from "react";

function AstroPooja({ dos }) {
  console.log(dos);

  const renderDosDonts = (dosAndDonts) => {
    return (
      <div className="mb-6 text-left">
        <div className="m-2">
          <strong>Explanation: </strong>{dosAndDonts.Explanation}
        </div>
        <div className="m-2">
          <strong>Do's: </strong> <span>✅ {dosAndDonts["Do's and Don'ts"].split(",")[0]}</span>
        </div>
        <div className="m-2">
          <strong>Don'ts: </strong> <span>❌ {dosAndDonts["Do's and Don'ts"].split(",")[1]}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8 border-[1px] border-gray-300 p-5">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Pooja Do's And Don'ts
      </h2>
      <hr />
      <div className="pt-5">
        {dos.map((ritual, index) => (
          <div key={index} className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">{ritual["Ritual Name"]}</h3>
            {renderDosDonts(ritual)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AstroPooja;
