function AstroForm(response) {
    return (  <div className="border-[1px] border-gray-30 p-5">
        <h2 className="text-xl font-bold mb-4 text-gray-700 0">
          Form Data
        </h2>
        <hr />
        <div className="space-y-6 m-2">
          {/* Field 1 */}
          <div className="grid grid-cols-2">
            <label className="text-lg font-medium text-gray-600">
              Name
            </label>
            <p className="text-lg text-gray-800 font-semibold">Sujal</p>
          </div>
          {/* Field 2 */}
          <div className="grid grid-cols-2">
            <label className="text-lg font-medium text-gray-600">
              Latitude
            </label>
            <p className="text-lg text-gray-800 font-semibold">68.6</p>
          </div>
          {/* Add more fields as needed */}
          <div className="grid grid-cols-2">
            <label className="text-lg font-medium text-gray-600">Age</label>
            <p className="text-lg text-gray-800 font-semibold">25</p>
          </div>
        </div>
      </div> );
}

export default AstroForm;