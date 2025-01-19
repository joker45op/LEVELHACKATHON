function AstroHoro({ horoscopes }) {
  console.log(horoscopes.daily.horoscope_data);
  return (
    <div className="mt-8 border border-gray-300 p-5 rounded-md shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Horoscope</h2>
      <hr className="mb-4" />
      <div className="pt-5 space-y-6">
        {/* Daily Horoscope */}
        <div>
          <p className="text-lg font-medium mb-2 text-gray-700">Daily</p>
          <div className="text-justify">
            <p className="text-black">
              <strong className="text-black">Date:</strong>{" "}
              {horoscopes.daily.date}
            </p>
            <p className="text-black">{horoscopes.daily.horoscope_data}</p>
          </div>
        </div>

        {/* Weekly Horoscope */}
        <div>
          <p className="text-lg font-medium mb-2 text-gray-700">Weekly</p>
          <div className="text-justify">
            <p className="text-black">
              <strong>Week:</strong> {horoscopes.weekly.week}
            </p>
            <p className="text-black">{horoscopes.weekly.horoscope_data}</p>
          </div>
        </div>

        {/* Monthly Horoscope */}
        <div>
          <p className="text-lg font-medium mb-2 text-gray-700">Monthly</p>
          <div className="text-justify">
            <p className="text-black">
              <strong>Month:</strong> {horoscopes.monthly.month}
            </p>
            <p className="text-black">{horoscopes.monthly.horoscope_data}</p>
            <p className="text-black">
              <strong>Challenging Days:</strong>{" "}
              {horoscopes.monthly.challenging_days}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AstroHoro;
