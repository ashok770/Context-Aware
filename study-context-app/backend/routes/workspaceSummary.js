const express = require("express");
const router = express.Router();
const { generateAISummary } = require("../utils/aiHelper");

router.post("/workspace-summary", async (req, res) => {
  try {
    const { subject, topics, notes, sessionCount, totalTime } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

    const prompt = `I am a CSE student. Provide a comprehensive progress summary for my "${subject}" workspace.
    
    I have completed ${sessionCount} study sessions with a total of ${totalTime} minutes.
    Topics covered: ${topics}
    
    Based on these notes: ${notes.substring(0, 1000)}
    
    Provide:
    1. Overall progress assessment (2-3 sentences)
    2. Key concepts mastered
    3. Suggested next steps for improvement`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("AI API Error");
    }

    const summary = data.candidates[0].content.parts[0].text;
    res.json({ summary });
  } catch (error) {
    console.error("Workspace summary error:", error);
    res.status(500).json({ summary: "Unable to generate summary." });
  }
});

module.exports = router;
