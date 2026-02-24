# Your Gemini API Key is Leaked and Disabled

## The Problem
Your API key (AIzaSyBc8gKV0aPJln88nKbT7YqvLXqlngMqKz0) was exposed publicly and Google has disabled it for security.

## Solution - Get a New API Key

1. Visit: https://aistudio.google.com/app/apikey
2. Delete the old key
3. Click "Create API Key"
4. Copy the new key
5. Update backend/.env file:
   GEMINI_API_KEY=YOUR_NEW_KEY_HERE

## Important
- Never commit .env files to GitHub
- Never share API keys publicly
- Add .env to .gitignore

After getting the new key, your AI summary feature will work!
