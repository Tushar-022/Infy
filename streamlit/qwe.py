
# -----------------------------------------------
# Setting up Amazon Bedrock with AWS SDK Boto3 🐍️
# -----------------------------------------------

import boto3, json,base64
bedrock_runtime=boto3.client(service_name="bedrock-runtime",
                             aws_access_key_id="AKIAZAI4G2JAX2QLD3BG",
                             aws_secret_access_key="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",
                             region_name="us-east-1",
                             )
# Model configuration
model_id = "anthropic.claude-3-sonnet-20240229-v1:0"
model_kwargs =  {
    "max_tokens": 2048, "temperature": 0.1,
    "top_k": 250, "top_p": 1, "stop_sequences": ["\n\nHuman"],
}
# Input configuration
def get_base64_encoded_image(image_path):
    with open(image_path, "rb") as image_file:
        binary_data = image_file.read()
        base_64_encoded_data = base64.b64encode(binary_data)
        base64_string = base_64_encoded_data.decode('utf-8')
        return base64_string

prompt = "Act as a Shakespeare and write a poem on Genertaive AI"
body = {
    "anthropic_version": "bedrock-2023-05-31",
    "system": "Analyze the provided image based on data and values it have, predict possible disease conditions based on values in report and generate 4-5 questions related to the possible condition to confirm the diesease"
    "If disease is there suggest reason for it and how can it be cured.",
    "messages": [
        {"role": "user", "content": [ {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": get_base64_encoded_image("./large.png")}},]},
    ],
}
body.update(model_kwargs)
# Invoke
response = bedrock_runtime.invoke_model(
    modelId=model_id,
    body=json.dumps(body),
)
# Process and print the response
result = json.loads(response.get("body").read()).get("content", [])[0].get("text", "")
print(result)






















body.update(model_kwargs)

# Invoke the model
response = bedrock_runtime.invoke_model(
    modelId=model_id,
    body=json.dumps(body),
)

# Process and print the generated questions
result = json.loads(response.get("body").read()).get("content", [])[0].get("text", "")
print("Generated Questions:\n", result)

# Simulating user interaction to confirm the disease
print("\nPlease answer the following questions to confirm the disease:")

# In a real-world scenario, you would capture user inputs here. For this example, we simulate it.
user_responses = [
    input("Answer to Question 1: "),
    input("Answer to Question 2: "),
    input("Answer to Question 3: "),
    input("Answer to Question 4: "),
    input("Answer to Question 5: "),
]

# Sending user responses to the model for disease confirmation
followup_body = {
    "anthropic_version": "bedrock-2023-05-31",
    "system": (
        "Based on the user's responses to the generated questions, confirm the disease "
        "and provide further guidance."
    ),
    "messages": [
        {"role": "user", "content": " ".join(user_responses)},
    ],
}
followup_body.update(model_kwargs)

# Invoke the model again with user responses
followup_response = bedrock_runtime.invoke_model(
    modelId=model_id,
    body=json.dumps(followup_body),
)

# Process and print the confirmation of the disease
final_result = json.loads(followup_response.get("body").read()).get("content", [])[0].get("text", "")
print("\nDisease Confirmation and Guidance:\n", final_result)
