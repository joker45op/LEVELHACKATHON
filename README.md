# Astrology and Horoscope Project

## Overview
This project is a comprehensive Astrology and Horoscope platform built using Python Flask, AstraDB, LangFlow, React, and various external APIs. The application provides users with detailed insights into astrology, including Kundali, birth charts, daily and monthly horoscopes, natal charts, and gemstone recommendations.

---

## Features

1. **Kundali (Covering 12 Houses)**
   - Integrated with the [FreeAstrologyAPI](https://freeastrologyapi.com/api-reference/planets/extended) to fetch detailed Kundali data for users.

2. **Birth Chart**
   - Utilizes the `kerykeion` Python package to generate detailed astrological birth charts.

3. **Daily and Monthly Horoscopes**
   - Fetches horoscopes using the [Horoscope App API](https://horoscope-app-api.vercel.app/get).

4. **Natal Chart**
   - Provides personalized natal charts with integrations like:
     - [Co–Star: Hyper-Personalized, Real-Time Horoscopes](https://www.costarastrology.com/)
     - `hoishing/natal`: A tool for creating natal charts easily.

5. **Gemstone Recommendations**
   - Leverages information from [Zodiac Birthstones Jewellery](https://www.naj.co.uk/zodiac-birthstones-jewellery) to provide users with personalized gemstone recommendations based on their zodiac signs.

---

## Technology Stack

### Backend
- **Python Flask**: Handles API requests and business logic.
- **AstraDB**: Cloud-native database for storing user data and horoscope details.
- **LangFlow**: Powers AI-driven horoscope interpretations and responses.

### Frontend
- **React**: Delivers a seamless and interactive user experience.

### Integrations
- **External APIs**:
  - FreeAstrologyAPI for Kundali data.
  - Horoscope App API for daily and monthly horoscopes.
  - Co–Star and `hoishing/natal` for natal chart generation.
  - Zodiac Birthstones Jewellery for gemstone recommendations.

---

## Installation

### Prerequisites
- Python 3.9+
- Node.js 14+
- AstraDB account
- API keys for the integrated services (store them in `.env`):
  ```
  CHAT_API_KEY=<Your LangFlow API Key>
  ASTRA_DB_APPLICATION_TOKEN=<Your AstraDB Token>
  ```

### Steps

#### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Install the `kerykeion` package for birth chart generation:
   ```bash
   pip install kerykeion
   ```
4. Start the Flask server:
   ```bash
   flask run
   ```

#### Frontend Setup
1. Navigate to the `frontend` directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

---

## API Usage

### Kundali Data
Fetch detailed Kundali data covering 12 houses:
```python
import requests

url = "https://freeastrologyapi.com/api-reference/planets/extended"
response = requests.get(url, params={"date": "YYYY-MM-DD", "place": "City"})
data = response.json()
```

### Birth Chart
Generate a birth chart using `kerykeion`:
```python
from kerykeion import KrInstance

birth_data = KrInstance(
    name="John Doe",
    day=15, month=8, year=1990,
    hour=10, minute=30, lat=28.6139, lon=77.2090
)
birth_data.plot_chart()
```

### Daily and Monthly Horoscopes
Fetch daily horoscopes:
```python
import requests

url = "https://horoscope-app-api.vercel.app/get"
response = requests.get(url, params={"sign": "Aries", "day": "today"})
data = response.json()
```

### Natal Chart
Generate a natal chart using `hoishing/natal`:
```bash
git clone https://github.com/hoishing/natal
cd natal
python setup.py install
```

### Gemstone Recommendations
Fetch gemstone data from [Zodiac Birthstones Jewellery](https://www.naj.co.uk/zodiac-birthstones-jewellery).

---

## Environment Variables
Create a `.env` file in the root directory with the following keys:
```env
CHAT_API_KEY=<Your LangFlow API Key>
ASTRA_DB_APPLICATION_TOKEN=<Your AstraDB Token>
```

---

## Contact
For queries, reach out to the project maintainer at [abhiguj13579@gmail.com].
