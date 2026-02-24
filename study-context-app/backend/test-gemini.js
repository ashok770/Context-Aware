require("dotenv").config();

const testGemini = async () => {
  const apiKey = process.env.GEMINI_API_KEY;
  
  // Test 1: List available models
  console.log("Testing available models...");
  try {
    const listResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    const models = await listResponse.json();
    console.log("Available models:", JSON.stringify(models, null, 2));
  } catch (error) {
    console.error("Error listing models:", error.message);
  }

  // Test 2: Try gemini-pro
  console.log("\n\nTesting gemini-pro...");
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Say hello" }] }],
        }),
      }
    );
    const data = await response.json();
    console.log("gemini-pro response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error with gemini-pro:", error.message);
  }
};

testGemini();
