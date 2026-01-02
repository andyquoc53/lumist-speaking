// Vercel Serverless Function for IELTS Speaking Grading
// Uses Google Gemini API (FREE!)

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
    const { question, transcript, duration, language } = req.body;

    if (!question || !transcript) {
      return res.status(400).json({ error: 'Missing question or transcript' });
    }

    const prompt = `You are an expert IELTS Speaking examiner. Evaluate this response using official IELTS Band Descriptors.

IMPORTANT: The transcript may contain errors - these are REAL mistakes the student made. Do NOT assume they meant to say something else. Grade based on EXACTLY what they said.

Question: "${question}"
Student's Response (raw transcript): "${transcript}"
Speaking Duration: ${duration || 'Unknown'}

Evaluate using IELTS official criteria and provide detailed feedback in ${language === 'vi' ? 'Vietnamese' : 'English'}.

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
    "fluency": "<What band descriptor matches this score?>",
    "vocabulary": "<Band descriptor>",
    "grammar": "<Band descriptor>",
    "pronunciation": "<Band descriptor>"
  },
  "errors": {
    "grammar": [
      {"original": "<exact phrase student said>", "corrected": "<correct version>", "explanation": "<why it's wrong>"}
    ],
    "vocabulary": [
      {"original": "<word/phrase used>", "better": "<better alternative>", "explanation": "<why it's better>"}
    ],
    "pronunciation": [
      {"word": "<word>", "issue": "<what's wrong>", "howToFix": "<how to pronounce correctly>"}
    ],
    "fluency": [
      {"issue": "<e.g., 'too many pauses', 'repetition'>", "example": "<specific example from speech>", "tip": "<how to improve>"}
    ]
  },
  "strengths": ["<specific strength with example from their speech>"],
  "improvements": ["<specific actionable improvement>"],
  "sampleAnswer": "<A model Band 8-9 answer excerpt (2-3 sentences) showing ideal response>",
  "encouragement": "<Personalized encouraging message based on their performance>",
  "quickTips": [
    "<Tip 1: Most important thing to practice>",
    "<Tip 2: Quick win they can implement now>",
    "<Tip 3: Long-term improvement suggestion>"
  ]
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
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
      return res.status(response.status).json({ error: 'AI service error' });
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
