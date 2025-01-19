// function AstroGem({ gemstones }) {
//   return (
//     <div className="mt-8 border-[1px] border-gray-30 p-5">
//       <h2 className="text-xl font-bold mb-4 text-gray-700">Gemstones</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full p-5 border-collapse border border-gray-300">
//           <tr className="">
//             {gemstones[0]["Gemstone Name"]}
//             <td className="w-1/4 border border-gray-300 bg-gray-100 p-4 text-left text-gray-600 ">
//               {gemstones[0].Explanation}
//             </td>
//             {gemstones[1]["Gemstone Name"]}
//             <td className="w-1/4 border border-gray-300 bg-gray-100 p-4 text-left text-gray-600 ">
//               {gemstones[1].Explanation}
//             </td>
//             <td className=" w-3/4 border p-4 text-left">Column 2</td>
//           </tr>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default AstroGem;



function AstroGem({ gemstones }) {
  if (!gemstones || gemstones.length === 0) {
    return (
      <div className="mt-8 border-[1px] border-gray-300 p-5">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Gemstones</h2>
        <p className="text-gray-500">No gemstone data available to display.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 border-[1px] border-gray-300 p-5">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Gemstones</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full p-5 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-4 text-left text-gray-600">
                Gemstone Name
              </th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">
                Explanation
              </th>
            </tr>
          </thead>
          <tbody>
            {gemstones.map((gem, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-4">
                  {gem["Gemstone Name"]}
                </td>
                <td className="border border-gray-300 p-4">{gem.Explanation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AstroGem;
