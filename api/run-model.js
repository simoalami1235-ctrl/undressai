export default async function handler(request, response) {
  try {
    // 1. Get the user's input from the request
    const { input_text } = await request.json();
    
    // 2. Get the secret token from Vercel's environment variable
    const HF_TOKEN = process.env.HF_TOKEN;
    const API_URL = "https://medalami1-my-ai-api.hf.space";

    // 3. Forward the request to Hugging Face
    const hf_response = await fetch(API_URL + "/predict/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + HF_TOKEN
      },
      body: JSON.stringify({ input_text: input_text }),
    });

    // 4. Check if the Hugging Face API responded correctly
    if (!hf_response.ok) {
      throw new Error(`Hugging Face API error: ${hf_response.status}`);
    }

    // 5. Get the response from Hugging Face
    const data = await hf_response.json();

    // 6. Send that response back to your website
    response.status(200).json(data);
    
  } catch (error) {
    // 7. Handle any errors
    response.status(500).json({ error: error.message });
  }
}
