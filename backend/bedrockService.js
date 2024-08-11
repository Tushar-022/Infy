const AWS = require('aws-sdk');
const axios = require('axios');

// AWS Bedrock configuration
const bedrockRuntime = new AWS.BedrockRuntime({
  region: 'us-east-1',
  accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY',
});

const analyzeReport = async (base64File) => {
  // AWS Bedrock request body
  const requestBody = {
    anthropic_version: "bedrock-2023-05-31",
    system: "Analyze the provided image based on data and values it has, predict possible disease conditions based on values in the report and generate 4-5 questions related to the possible condition to confirm the disease. If a disease is detected, suggest the reason for it and how it can be cured.",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: base64File,
            },
          },
        ],
      },
    ],
    max_tokens: 2048,
    temperature: 0.1,
    top_k: 250,
    top_p: 1,
    stop_sequences: ["\n\nHuman"],
  };

  try {
    // Send request to AWS Bedrock
    const response = await axios.post('https://bedrock-runtime.amazonaws.com', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'YOUR_API_KEY', // If required
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error during Bedrock API request:', error);
    throw new Error('Failed to analyze the report');
  }
};

module.exports = { analyzeReport };
