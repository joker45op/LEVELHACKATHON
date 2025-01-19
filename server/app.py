import csv
from flask import Flask, request, jsonify,send_from_directory
from flask_cors import CORS
import utils as uti
from langflow_funcs import get_astrological_insights
import logging
import json
import os

app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app)

# Enable logging for the app
logging.basicConfig(level=logging.DEBUG)

@app.route("/")
def home():
    return jsonify({
        "message": "Working successfully",
        "test": {
            "fname": "Kanye",
            "lname": "West",
            "gender": "Male",
            "year": 1977,
            "month": 6,
            "date": 8,
            "hours": 8,
            "minutes": 45,
            "seconds": 0,
            "city": "Rajkot",
            "tz_str": "5.5",
            "output_dir": "imgs"
        }
    }), 200


@app.route('/generate', methods=['POST'])
def generate():
    """
    API endpoint to generate an astrological birth chart SVG for the given inputs.
    Body parameters (JSON):
        {
            "fname": "string",
            "lname": "string",
            "gender": "string",
            "year": int,        # Year of Birth
            "month": int,       # Month of Birth
            "date": int,        # Date of Birth
            "hours": int,       # Hour of Birth
            "minutes": int,     # Minute of Birth
            "seconds": int,     # Second of Birth
            "city": "string",
            "tz_str": "string", # Time zone string (e.g., "UTC" or "5.5")
            "output_dir": "string"
        }
    Returns:
        JSON response with the SVG file path or error message.
    """
    # Get input data from the request JSON body
    data = request.get_json()

    # Required fields to validate in the incoming request
    required_fields = ['fname', 'lname', 'gender', 'year', 'month', 'date', 'hours', 'minutes', 'seconds', 'city']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400  # Bad request

    try:
        # Fetch coordinates for the city
        cords = uti._get_cords(data["city"])
        longitude, latitude = cords["longitude"], cords["latitude"]

        # Get the zodiac sign using the provided date and month
        zodiac_sign = uti._get_zodiac_sign(data["date"], data["month"])

        # Fetch horoscopes for the given zodiac sign
        horoscopes = uti.get_horoscopes(zodiac_sign)

        # Fetch horoscopes for the given zodiac sign
        gemstones = uti.get_gemstones_by_zodiac(zodiac_sign)

        # Call the function to get kundali data
        kundali_data = uti.get_kundali(
            year=data["year"],
            month=data["month"],
            date=data["date"],
            hours=data["hours"],
            minutes=data["minutes"],
            seconds=data["seconds"],
            longitude=longitude,
            latitude=latitude # Timezone as float
        )

        if isinstance(kundali_data, dict) and "error" in kundali_data:
            return jsonify({"error": kundali_data["error"]}), 500

        # Generate the birth chart SVG
        svg_path = uti.generate_birth_chart_svg(
            name=f"{data['fname']} {data['lname']}",
            year=data["year"],
            month=data["month"],
            day=data["date"],
            hour=data["hours"],
            minute=data["minutes"],
            lng=longitude,
            lat=latitude,
            city=data["city"],
            output_dir=data.get("output_dir", "imgs")
        )

        astro_insights = get_astrological_insights("message")
        # astro_insights = {}
        with open("data.csv", "w", newline='') as f:
            # Ensure `astro_insights`, `cords`, `horoscopes`, and `gemstones` are defined correctly
            data = {
                "cords": cords,
                "astro_insights": astro_insights,  # Ensure this is a dictionary
                "kundali_data": kundali_data.to_dict(orient="records"),  # Convert DataFrame to JSON
                "horoscopes": horoscopes,
                "gemstones": gemstones
            }
            
            # Flatten the dictionary if needed (this depends on the structure of the data)
            # If you need to include lists (like `kundali_data`), you may want to convert them to strings or handle them accordingly
            flat_data = {
                "cords": str(data['cords']),
                "astro_insights": str(data['astro_insights']),
                "kundali_data": str(data['kundali_data']),
                "horoscopes": str(data['horoscopes']),
                "gemstones": str(data['gemstones'])
            }

            # Create a CSV writer object
            writer = csv.DictWriter(f, fieldnames=flat_data.keys())

            # Write the header (fieldnames) and the data (as a single row)
            writer.writeheader()  # Write column headers
            writer.writerow(flat_data)

        return jsonify({
            "message": "All Data Generated Successfully..............!",
            "cords": cords,
            "astro_insights":astro_insights,
            "kundali_data": kundali_data.to_dict(orient="records"),  # Convert DataFrame to JSON
            "svg_path": svg_path,
            "horoscopes": horoscopes,
            "gemstones":gemstones
        }), 200

    except Exception as e:
        logging.error(f"Error generating birth chart: {e}")
        return jsonify({"error": str(e)}), 500  # Internal Server Error

@app.route('/imgs/<filename>')
def serve_svg(filename):
    print(filename)
    return send_from_directory('imgs', filename)


if __name__ == "__main__":
    app.run(port=3000, debug=True)
