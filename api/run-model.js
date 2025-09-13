// Add this import at the top
import fetch from 'node-fetch';

export default async function handler(request, response) {
  try {
    const { input_text } = await request.json();
    const HF_TOKEN = process.env.HF_TOKEN;
    const API_URL = "https://medalami1-my-ai-api.hf.space/predict/";

    // Check if token is available
    if (!HF_TOKEN) {
      throw new Error("HF_TOKEN environment variable is not set");
    }

    const hf_response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + HF_TOKEN
      },
      body: JSON.stringify({ input_text: input_text }),
    });

    if (!hf_response.ok) {
      throw new Error(`Hugging Face API error: ${hf_response.status}`);
    }

    const data = await hf_response.json();
    response.status(200).json(data);
    
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
