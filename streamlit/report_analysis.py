import streamlit as st
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure the API key for Google Generative AI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Streamlit app for uploading and analyzing a report
st.title("Blood Report Analysis")

# File upload widget
uploaded_file = st.file_uploader("Upload your blood report", type=["pdf"])

if uploaded_file:
    # Save the uploaded file
    with open("uploaded_report.pdf", "wb") as f:
        f.write(uploaded_file.getbuffer())

    st.success("File uploaded successfully!")

    # Upload the file to the Google Generative AI service
    sample_file = genai.upload_file(path="uploaded_report.pdf", display_name="Blood Report")

    # Define the prompt for analyzing the blood report
    prompt = "Extract information from the uploaded blood report in JSON format, including attributes and values."

    # Get the response from the Gemini model
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")
    response = model.generate_content([prompt, sample_file])

    # Display the analysis results
    st.subheader("Analysis Results")
    st.json(response)

    # Optionally, you can also display the raw JSON or any other relevant information
