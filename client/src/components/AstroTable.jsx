import PropTypes from "prop-types";

function AstroTable({ kundaliData }) {
  if (!kundaliData || kundaliData.length === 0) {
    return (
      <div className="mt-8 border-[1px] border-gray-300 p-5">
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Kundali Data Table
        </h2>
        <p className="text-gray-500">No data available to display.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 border-[1px] border-gray-300 p-5">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Kundali Data Table
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full p-5 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-4 text-left text-gray-600">
                House Number
              </th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">
                Nakshatra Name
              </th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">
                Nakshatra Vimsottari Lord
              </th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">
                Planet
              </th>
            </tr>
          </thead>
          <tbody>
            {kundaliData.map((data, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-4">
                  {data["House Number"]}
                </td>
                <td className="border border-gray-300 p-4">
                  {data["Nakshatra Name"]}
                </td>
                <td className="border border-gray-300 p-4">
                  {data["Nakshatra Vimsottari Lord"]}
                </td>
                <td className="border border-gray-300 p-4">{data["Planet"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AstroTable;
