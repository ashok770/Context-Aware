const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateAISummary = async (topic, notes) => {
  try {
    console.log("Starting AI summary generation...");

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not found");
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

    const prompt = `I am a CSE student. Summarize my study session for the topic "${topic}". 
    My notes are: "${notes}". 
    Provide a 2-sentence summary and one "Key Concept" I learned. 
    If notes are empty, just provide a brief overview of the topic.`;

    console.log("Calling Gemini API...");
    console.log("API URL:", apiUrl.replace(apiKey, 'API_KEY_HIDDEN'));
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    const data = await response.json();
    console.log("API Response Status:", response.status);
    
    if (!response.ok) {
      console.log("API Error Response:", JSON.stringify(data, null, 2));
      throw new Error(`API Error: ${response.status} - ${JSON.stringify(data)}`);
    }

    console.log("API Response Data:", JSON.stringify(data, null, 2));

    const text = data.candidates[0].content.parts[0].text;

    console.log("AI Summary generated successfully:", text);
    return text;
  } catch (error) {
    console.error("Gemini Error Details:", error.message);
    console.error("Full Error:", error);
    return "AI Summary currently unavailable.";
  }
};

module.exports = { generateAISummary };
