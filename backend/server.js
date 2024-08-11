const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bedrockService = require('./bedrockService'); // Import the Bedrock service

const app = express();
const port = 5000; // or any port you prefer

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/api/analyze-report', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Read the file and encode it in base64
    const filePath = path.join(__dirname, file.path);
    const fileData = fs.readFileSync(filePath);
    const base64File = fileData.toString('base64');

    // Analyze the report using the Bedrock service
    const analysisResult = await bedrockService.analyzeReport(base64File);

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    // Send response back to the client
    res.json({ result: analysisResult });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing file.');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
