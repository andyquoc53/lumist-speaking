# Lumist IELTS Speaking Practice

AI-powered IELTS Speaking practice application with real-time transcription and feedback.

## Features

- 🎤 Voice recording with real-time transcription
- 🤖 AI-powered scoring on 4 IELTS criteria
- 📝 50+ practice questions (Part 1, 2, 3)
- 🏆 Full mock test simulation (11-14 minutes)
- 🌐 Bilingual UI (English/Vietnamese)
- 🎮 Gamification (coins, streaks, quests)
- 🇬🇧🇺🇸 British/American voice toggle
- 🎯 ElevenLabs premium voices

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Set up your API key
cp .env.example .env.local
# Then edit .env.local and add your ElevenLabs API key

# 3. Run the app
npm run dev
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_ELEVENLABS_API_KEY` | ElevenLabs API key (TTS & STT) | Yes |
| `GEMINI_API_KEY` | Google Gemini API key (AI grading) - FREE! | Yes |

### Get your API keys:

1. **ElevenLabs**: [elevenlabs.io](https://elevenlabs.io) → Developers → API Keys
   - Enable: Text to Speech, Speech to Text

2. **Google Gemini** (FREE!): [aistudio.google.com](https://aistudio.google.com) → Get API Key

## Deploy to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/lumist-ielts-speaking.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. **Add Environment Variables:**
   - `VITE_ELEVENLABS_API_KEY` = your ElevenLabs key
   - `GEMINI_API_KEY` = your Google Gemini key
4. Click **Deploy**

### Step 3: Done! 🎉
Your app is live at `https://your-project.vercel.app`

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- ElevenLabs (TTS + STT)
- Claude AI (grading)

## Security

⚠️ **Never commit your `.env.local` file!** It contains your API key.

The `.gitignore` file is already configured to exclude it.

## License

MIT - Lumist.ai
