from flask import Flask, request, jsonify
import boto3
import json
import base64
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure Bedrock runtime client with AWS credentials
bedrock_runtime = boto3.client(
    service_name="bedrock-runtime",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name="us-east-1",
)

# Model configuration
model_id = "anthropic.claude-3-sonnet-20240229-v1:0"
model_kwargs = {
    "max_tokens": 2048,
    "temperature": 0.1,
    "top_k": 250,
    "top_p": 1,
    "stop_sequences": ["\n\nHuman"],
}

def get_base64_encoded_image(image_file):
    image_data = image_file.read()
    base_64_encoded_data = base64.b64encode(image_data)
    base64_string = base_64_encoded_data.decode('utf-8')
    return base64_string

@app.route('/api/analyze-report', methods=['POST'])
def analyze_report():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    base64_image = get_base64_encoded_image(file)

    # Input configuration
    prompt = (
        "Analyze the provided image based on data and values it has, predict possible disease conditions based on values in the report and generate 4-5 MCQ questions related to the possible condition to confirm the disease. "
        "If the disease is present, suggest reasons for it and how it can be cured."
    )
    body = {
        "anthropic_version": "bedrock-2023-05-31",
        "system": prompt,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/png",
                            "data": base64_image
                        },
                    },
                ],
            },
        ],
    }
    body.update(model_kwargs)

    try:
        # Invoke the model
        response = bedrock_runtime.invoke_model(
            modelId=model_id,
            body=json.dumps(body),
        )

        # Process the response
        result = json.loads(response.get("body").read()).get("content", [])[0].get("text", "")
        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
