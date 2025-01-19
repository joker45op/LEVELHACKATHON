import requests
import json
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()


import os
import json
import requests

def send_request(input_value):
    """
    Sends a POST request to the LangFlow API to generate astrological insights based on input value.

    Args:
        input_value (str): The message or input value for the request.

    Returns:
        dict: Parsed JSON response containing astrological insights or an error message.
    """
    url = "https://api.langflow.astra.datastax.com/lf/295f3a38-98fc-4fa1-aef0-da80634023aa/api/v1/run/58c77131-3491-48f0-811e-b3f29f4febe4?stream=false"

    # Get API key from environment variable
    api_key = os.getenv('INSIGHTS_API_KEY')

    if not api_key:
        return {"error": "INSIGHTS_API_KEY is not set in the environment variables."}

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }

    payload = {
        "input_value": input_value,
        "output_type": "chat",
        "input_type": "chat",
        "tweaks": {
            "Prompt-Se8rP": {},
            "ChatOutput-s0SGr": {},
            "TextInput-dGKXT": {},
            "GoogleGenerativeAIModel-Rjwbr": {}
        }
    }

    try:
        # Make the POST request
        response = requests.post(url, headers=headers, json=payload)
        print(response.json())
        # Check for a successful response
        if response.status_code == 200:
            return response.json()  # Return the JSON response
        else:
            return {
                "error": f"Request failed with status code {response.status_code}",
                "details": response.text  # Include server's response in case of failure
            }
    except requests.exceptions.RequestException as e:
        # Catch and handle request errors
        return {"error": f"An error occurred: {str(e)}"}


def process_response(response_data):
    """
    Processes the response from the LangFlow API, extracts and parses the 'text' field into JSON.

    Args:
        response_data (dict): The response data from send_request().

    Returns:
        dict: Parsed JSON data from the response, or an error message.
    """
    # Extract the 'text' field from the response
    text_data = response_data.get("outputs", [{}])[0].get("outputs", [{}])[0].get(
        "results", {}).get("message", {}).get("data", {}).get("text", "")

    if text_data:
        # Clean the string to remove the code block (```json\n and \n```)
        clean_text = text_data.strip("```json\n").strip("\n```")

        # Parse the cleaned text data into JSON
        try:
            parsed_json = json.loads(clean_text)
            return parsed_json  # Return the parsed JSON
        except json.JSONDecodeError as e:
            return {"error": f"Error parsing JSON: {e}"}
    else:
        return {"error": "No 'text' field found in the response data."}

# Example usage


def get_astrological_insights(input_value):
    """
    Wrapper function to get astrological insights.

    Args:
        input_value (str): The input value for the request.

    Returns:
        dict: Parsed JSON response with astrological insights or an error message.
    """
    response_data = send_request(input_value)
    return process_response(response_data)


def call_langflow_api(input_value: str, context_value: str):
    """
    Calls the LangFlow API with predefined parameters and retrieves the response.

    Args:
        input_value (str): The input message to send to the API.
        context_value (str): The context to use for answering the question.

    Returns:
        Dict[str, Any]: The JSON response from the API.
    """
    # Define the API URL
    api_url = "https://api.langflow.astra.datastax.com/lf/49ae15d5-1b17-4732-a1e2-f0c3d37c367a/api/v1/run/7125e316-83f7-44d4-a408-14ae7c979fd0?stream=false"

    # Prepare the payload dynamically based on the input and context
    payload = {
        "input_value": "message",
        "output_type": "chat",
        "input_type": "chat",
        "tweaks": {
            "TextInput-vJNUf": {
                "input_value": "will my week be good or bad ?\n"
            },
            "OpenAIModel-nhKlX": {
            },
            "Prompt-ot5yT": {
                "template": "Using Context Answer the Question. You are a rag model that is used as chatbot on user data. Data is Astrology and horoscopes. so reply accordingly. if you question is asked about things outside of the context then reply with 'Out Of Context' but dont answer outside context questions."
            },
            "ChatOutput-TW93z": {
                "background_color": "",
                "chat_icon": "",
                "data_template": "{text}",
                "input_value": "",
                "sender": "Machine",
                "sender_name": "AI",
                "session_id": "",
                "should_store_message": True,
                "text_color": ""
            },
            "Prompt-ZQpW8": {
                "template": "Answer this question = {question}, using context = {context}.",
                "question": input_value
            }
        }
    }

    # Read the token from the environment variable (defaulting to None)
    auth_token = os.getenv("CHAT_API_KEY")
    if not auth_token:
        return {"error": "API token not found. Please set CHAT_API_KEY in the environment."}

    # Set up the request headers, using the API token from the environment
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {auth_token}",
    }

    try:
        # Make the API call
        response = requests.post(api_url, json=payload, headers=headers)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        return response.json()  # Parse and return the JSON response
    except requests.exceptions.RequestException as e:
        # Handle request errors
        return {"error": str(e), "status_code": response.status_code if 'response' in locals() else None}
