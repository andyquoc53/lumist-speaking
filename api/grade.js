// Vercel Serverless Function for IELTS Speaking Grading
// Uses Google Gemini API with AUDIO analysis for accurate pronunciation grading!

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
  }

  try {
    const { question, transcript, duration, language, audioBase64, audioMimeType } = req.body;

    if (!question || !transcript) {
      return res.status(400).json({ error: 'Missing question or transcript' });
    }

    const promptText = `You are an expert IELTS Speaking examiner. 

${audioBase64 ? 'I am providing you with the AUDIO RECORDING of the student speaking. Listen carefully to assess:' : 'Evaluate this transcript:'}
- PRONUNCIATION: Listen for clarity, word stress, intonation, connected speech
- FLUENCY: Listen for pauses, hesitations, filler words (um, uh, like), speech rhythm
- GRAMMAR: Check for errors in the speech
- VOCABULARY: Assess word choice and range

Question: "${question}"
Transcript (for reference): "${transcript}"
Speaking Duration: ${duration || 'Unknown'}

Provide detailed IELTS feedback in ${language === 'vi' ? 'Vietnamese' : 'English'}.

${audioBase64 ? '⚠️ IMPORTANT: Base your pronunciation and fluency scores on what you HEAR in the audio, not just the transcript!' : ''}

Return ONLY valid JSON (no markdown, no code blocks):
{
  "scores": {
    "fluency": <1-9, use 0.5 increments>,
    "vocabulary": <1-9>,
    "grammar": <1-9>,
    "pronunciation": <1-9>,
    "overall": <1-9>
  },
  "bandDescriptors": {
    "fluency": "<What band descriptor matches this score based on what you heard>",
    "vocabulary": "<Band descriptor>",
    "grammar": "<Band descriptor>",
    "pronunciation": "<Band descriptor based on actual pronunciation heard>"
  },
  "errors": {
    "grammar": [
      {"original": "<exact phrase student said>", "corrected": "<correct version>", "explanation": "<why it's wrong>"}
    ],
    "vocabulary": [
      {"original": "<word/phrase used>", "better": "<better alternative>", "explanation": "<why it's better>"}
    ],
    "pronunciation": [
      {"word": "<word mispronounced>", "issue": "<what you heard wrong>", "howToFix": "<correct pronunciation with phonetic hint>"}
    ],
    "fluency": [
      {"issue": "<e.g., 'long pause at 0:03', 'filler word um'>", "example": "<specific example>", "tip": "<how to improve>"}
    ]
  },
  "strengths": ["<specific strength with example from their speech>"],
  "improvements": ["<specific actionable improvement>"],
  "sampleAnswer": "<A model Band 8-9 answer excerpt (2-3 sentences)>",
  "encouragement": "<Personalized encouraging message>",
  "quickTips": [
    "<Tip 1: Most important thing to practice>",
    "<Tip 2: Quick win they can implement now>",
    "<Tip 3: Long-term improvement suggestion>"
  ]
}`;

    // Build the request parts
    const parts = [];
    
    // Add audio if provided
    if (audioBase64) {
      parts.push({
        inlineData: {
          mimeType: audioMimeType || "audio/webm",
          data: audioBase64
        }
      });
    }
    
    // Add text prompt
    parts.push({ text: promptText });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2500,
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return res.status(response.status).json({ error: 'AI service error', details: errorText });
    }

    const data = await response.json();
    
    // Extract text from Gemini response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (text) {
      // Clean the response - remove markdown code blocks if present
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      const match = cleanText.match(/\{[\s\S]*\}/);
      if (match) {
        const feedback = JSON.parse(match[0]);
        return res.status(200).json(feedback);
      }
    }

    return res.status(500).json({ error: 'Failed to parse AI response' });

  } catch (error) {
    console.error('Grade API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
