# Upload the file and print a confirmation.
import os 
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


sample_file = genai.upload_file(path="blood1.pdf",
                            display_name="Jetpack drawing")

print(f"Uploaded file '{sample_file.display_name}' as: {sample_file.uri}")
print("working")
model = genai.GenerativeModel(model_name="gemini-1.5-pro")

prompt = "Extract information from file uploaded of the attributes and there values in JSON format."


# //prompt = "Analyze the provided image based on data and values it have, predict possible disease conditions based on values in report and generate 4-5 questions related to the possible condition to confirm the diesease"  "If disease is there suggest reason for it and how can it be cured."

response = model.generate_content([prompt, sample_file])
print(response)