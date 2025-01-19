import os
import json
import requests
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

from geopy.geocoders import Nominatim
import logging

from kerykeion import AstrologicalSubject, KerykeionChartSVG


working_directory = os.getcwd()

# Pass the full path including the working directory
# output_path = os.path.join(working_directory)
KUNDALI_API_KEY = os.getenv("KUNDALI_API_KEY")

def _get_cords(city):
    """
    Fetches the geographic coordinates (latitude and longitude) and address of a given city.

    Args:
        city (str): The name of the city to fetch the coordinates for.

    Returns:
        dict: A dictionary containing either the address and coordinates or an error message.
              The dictionary may contain:
                - "address" (str): The full address of the city.
                - "latitude" (float): The latitude of the city.
                - "longitude" (float): The longitude of the city.
                - "error" (str): A descriptive error message if the city is not found or an exception occurs.
    
    Raises:
        Exception: If there is an issue while fetching the coordinates, an exception is caught and logged.
    
    Logging:
        - Logs a warning if the city is not found.
        - Logs an error if an exception occurs while fetching coordinates.

    Example:
        >>> _get_cords("New York")
        {'address': 'New York, USA', 'latitude': 40.712776, 'longitude': -74.005974}

        >>> _get_cords("Nonexistent City")
        {'error': "City 'Nonexistent City' not found."}
    """
    try:
        geolocator = Nominatim(user_agent="joker45op")
        
        location = geolocator.geocode(city)
        
        if location:
            return {
                "city":city,
                "address": location.address,
                "latitude": location.latitude,
                "longitude": location.longitude
            }
        else:
            logging.warning(f"City '{city}' not found.")
            return {"error": f"City '{city}' not found."}
    
    except Exception as e:
        logging.error(f"Error occurred while fetching coordinates: {e}")
        return {"error": f"An error occurred: {e}"}


def generate_birth_chart_svg(name, year, month, day, hour=12, minute=0, lng=0.0, lat=0.0,city="Mumbai", tz_str="Asia/Tokyo" , output_dir="imgs"):
    """
    Generates and saves the astrological birth chart SVG for the given inputs.
    
    Args:
        name (str): Name of the individual.
        year (int): Birth year.
        month (int): Birth month.
        day (int): Birth day.
        hour (int): Birth hour.
        minute (int): Birth minute.
        lng (float): Longitude of the birth city.
        lat (float): Latitude of the birth city.
        tz_str (str): Time zone string (e.g., "Europe/Rome").
        city (str): Name of the birth city.
        output_dir (str): Directory where the SVG file will be saved. Default is "imgs".

    Returns:
        str: Path to the saved SVG file.
    
    Raises:
        Exception: If an error occurs during SVG generation or file saving.
    """
    
    try:
        # Ensure the output directory exists
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        # Create an AstrologicalSubject instance (Assuming the class exists)
        birth_chart = AstrologicalSubject(name, year, month, day, hour, minute, lng=lng, lat=lat, tz_str=tz_str, city=city)
        
        # Generate the SVG using the KerykeionChartSVG (Assuming the class exists)
        birth_chart_svg = KerykeionChartSVG(birth_chart)
        svg_data = birth_chart_svg.makeSVG()

        # Define the full path for the SVG file
        svg_path = os.path.join(output_dir, f"{name}_BirthChart.svg")
        
        # Write the SVG data to a file
        with open(svg_path, "w") as f:
            f.write(svg_data)

        # Return the path of the saved file
        return svg_path

    except Exception as e:
        # Log the error and raise it again
        logging.error(f"Error generating birth chart SVG for {name}: {e}")
        raise


def get_kundali(year, month, date, hours, minutes, seconds, longitude, latitude, timezone=5.5, observation_point="topocentric", ayanamsha="lahiri", language="en"):
    """
    Fetches planetary positions for a given date, time, and location from the Astro API.

    Args:
        year (int): Year of the observation.
        month (int): Month of the observation.
        date (int): Date of the observation.
        hours (int): Hour of the observation.
        minutes (int): Minute of the observation.
        seconds (int): Second of the observation.
        latitude (float): Latitude of the observation point.
        longitude (float): Longitude of the observation point.
        timezone (float): Time zone offset (e.g., 5.5 for India Standard Time).
        observation_point (str): The observation point ("topocentric" or "geocentric"). Default is "topocentric".
        ayanamsha (str): The ayanamsha to use. Default is "lahiri".
        language (str): The language for the response. Default is "en".

    Returns:
        pandas.DataFrame: A DataFrame containing planetary positions or an error message.
    """
    
    # Set up logging
    logging.basicConfig(level=logging.INFO)
    
    # Fetch API key from environment variable
    api_key = os.getenv("KUNDALI_API_KEY")
    if not api_key:
        logging.error("API key is missing. Please set the KUNDALI_API_KEY environment variable.")
        return {"error": "API key is required"}

    url = "https://json.apiastro.com/planets/extended"

    payload = json.dumps({
        "year": year,
        "month": month,
        "date": date,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds,
        "latitude": latitude,
        "longitude": longitude,
        "timezone": timezone,
        "settings": {
            "observation_point": observation_point,
            "ayanamsha": ayanamsha,
            "language": language
        }
    })

    headers = {
        'Content-Type': 'application/json',
        'x-api-key': api_key
    }

    try:
        # Make the API request
        response = requests.post(url, headers=headers, data=payload)

        # Check for a successful response
        if response.status_code == 200:
            data = response.json()
            planetary_positions = data.get("output", {})
            
            # Create a DataFrame from the planetary positions
            planets_data = []
            for planet, details in planetary_positions.items():
                planet_info = {
                    "Planet": planet,
                    "Current Sign": details.get("zodiac_sign_name"),
                    "Full Degree": details.get("fullDegree"),
                    "Normalized Degree": details.get("normDegree"),
                    "Is Retrograde": details.get("isRetro"),
                    "Nakshatra Name": details.get("nakshatra_name"),
                    "Nakshatra Pada": details.get("nakshatra_pada"),
                    "Nakshatra Vimsottari Lord": details.get("nakshatra_vimsottari_lord"),
                    "House Number":details.get("house_number")
                }
                planets_data.append(planet_info)
            
            # Convert list of dictionaries into DataFrame
            df = pd.DataFrame(planets_data)
            df = df[["Planet", "Nakshatra Name", "Nakshatra Vimsottari Lord", "House Number"]]
            df = df.dropna()
            df["House Number"] = df["House Number"].astype(int)
            return df
            
        else:
            logging.error(f"Error {response.status_code}: {response.text}")
            return {"error": f"Request failed with status code {response.status_code}"}

    except requests.exceptions.RequestException as e:
        # Handle any request-related errors
        logging.error(f"Error occurred while making the API request: {e}")
        return {"error": f"An error occurred: {str(e)}"}


def _get_zodiac_sign(day: int, month: int) -> str:
    """
    Determines the zodiac sign based on the birth date.

    Args:
        day (int): Day of the month (1-31).
        month (int): Month of the year (1-12).

    Returns:
        str: The zodiac sign.

    Raises:
        ValueError: If the input day or month is invalid.
    """
    # Validate input
    if month < 1 or month > 12:
        raise ValueError("Invalid month. Must be between 1 and 12.")
    if day < 1 or day > 31:
        raise ValueError("Invalid day. Must be between 1 and 31.")

    # List of zodiac signs with their end dates
    zodiac_signs = [
        ("Capricorn", (1, 19)),  # Ends January 19
        ("Aquarius", (2, 18)),   # Ends February 18
        ("Pisces", (3, 20)),     # Ends March 20
        ("Aries", (4, 19)),      # Ends April 19
        ("Taurus", (5, 20)),     # Ends May 20
        ("Gemini", (6, 20)),     # Ends June 20
        ("Cancer", (7, 22)),     # Ends July 22
        ("Leo", (8, 22)),        # Ends August 22
        ("Virgo", (9, 22)),      # Ends September 22
        ("Libra", (10, 22)),     # Ends October 22
        ("Scorpio", (11, 21)),   # Ends November 21
        ("Sagittarius", (12, 21)),  # Ends December 21
        ("Capricorn", (12, 31))  # Ends December 31
    ]

    # Determine the zodiac sign
    for i, (sign, (end_month, end_day)) in enumerate(zodiac_signs):
        start_month, start_day = zodiac_signs[i - 1][1] if i > 0 else (12, 22)  # Handle wrap-around
        if ((month == start_month and day >= start_day) or
                (month == end_month and day <= end_day)):
            return sign

    # Fallback for unexpected cases (shouldn't occur with valid input)
    raise ValueError("Unable to determine zodiac sign. Please check the inputs.")


def get_horoscopes(sign: str) -> dict:
    """
    Fetches the daily, weekly, and monthly horoscopes for the given zodiac sign.

    Args:
        sign (str): The zodiac sign (e.g., 'Aries', 'Taurus', etc.).

    Returns:
        dict: A dictionary with the horoscope data for each period (daily, weekly, monthly).
    """
    # Base API URL
    base_url = 'https://horoscope-app-api.vercel.app/api/v1/get-horoscope/'

    # Endpoints for daily, weekly, and monthly horoscopes
    endpoints = {
        "daily": f"daily?sign={sign}&day=TODAY",
        "weekly": f"weekly?sign={sign}",
        "monthly": f"monthly?sign={sign}"
    }

    headers = {
        'accept': 'application/json'
    }

    horoscopes = {}
    
    # Fetch data for daily, weekly, and monthly horoscopes
    for period, endpoint in endpoints.items():
        url = base_url + endpoint
        try:
            # Send GET request
            response = requests.get(url, headers=headers)
            
            # Check if response is successful
            if response.status_code == 200:
                data = response.json()

                # Check if the API response contains 'data' key
                if "data" in data:
                    horoscopes[period] = data["data"]
                else:
                    horoscopes[period] = {"error": "No horoscope data found"}
            else:
                horoscopes[period] = {"error": f"Failed to fetch {period} horoscope. Status code: {response.status_code}"}
        
        except requests.exceptions.RequestException as e:
            horoscopes[period] = {"error": f"An error occurred: {str(e)}"}

    return horoscopes

def get_gemstones_by_zodiac(sign):
    """
    Returns the traditional and alternative gemstones for a given zodiac sign.
    
    Reference: 
    Zodiac birthstones chart based on information from:
    https://www.naj.co.uk/zodiac-birthstones-jewellery

    Args:
        sign (str): The zodiac sign (e.g., 'Aries', 'Taurus', etc.)
    
    Returns:
        dict: A dictionary with 'traditional' and 'alternative' gemstones, or an error message if sign is invalid.
    """
    zodiac_gemstones = {
        "Capricorn": {"1": "Garnet", "2": "Rose Quartz"},
        "Aquarius": {"1": "Amethyst", "2": "Amber"},
        "Pisces": {"1": "Aquamarine", "2": "Jade"},
        "Aries": {"1": "Diamond", "2": "Clear Quartz / Rock Crystal"},
        "Taurus": {"1": "Emerald", "2": "Chrysoprase"},
        "Gemini": {"1": "Pearl", "2": "Moonstone"},
        "Cancer": {"1": "Ruby", "2": "Carnelian"},
        "Leo": {"1": "Peridot", "2": "Spinel"},
        "Virgo": {"1": "Sapphire (blue)", "2": "Lapis Lazuli"},
        "Libra": {"1": "Opal", "2": "Pink Tourmaline"},
        "Scorpio": {"1": "Topaz", "2": "Citrine"},
        "Sagittarius": {"1": "Tanzanite", "2": "Blue Topaz"}
    }
    
    sign = sign.capitalize()
    
    if sign in zodiac_gemstones:
        return zodiac_gemstones[sign]
    else:
        return {"error": "Invalid zodiac sign"}

if __name__ == "__main__":
    cords = _get_cords("Rajkot")
    # print(cords)
    # print(generate_birth_chart_svg(name="abhishek", year=2005, month=5, day=19, hour=12, minute=0, lng=cords["longitude"], lat=cords["latitude"], city=cords["city"]))

    # kundali = get_kundali(1977, 6, 8, 8, 45,0, cords["longitude"], cords["latitude"])
    # print(kundali)

    # zodiac = _get_zodiac_sign(19, 5)
    # print(get_horoscopes(_get_zodiac_sign(19, 5)))

    gemstones = get_gemstones_by_zodiac(_get_zodiac_sign(19, 5))
    print(gemstones)

    