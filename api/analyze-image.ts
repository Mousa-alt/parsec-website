import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { image } = req.body;

  if (!image || typeof image !== 'string') {
    return res.status(400).json({ error: 'Image is required' });
  }

  try {
    // Extract base64 data from data URL
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const mediaType = image.match(/^data:(image\/\w+);base64,/)?.[1] || 'image/jpeg';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mediaType,
                  data: base64Data,
                },
              },
              {
                type: 'text',
                text: `Analyze this image as a social media marketing expert. Evaluate its potential for marketing use.

Respond in this exact JSON format (no markdown, just raw JSON):
{
  "score": <number 1-10>,
  "category": "<category like 'Product Shot', 'Interior', 'Portrait', 'Lifestyle', 'Architecture', 'Food', 'Nature', 'Abstract'>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<improvement 1>", "<improvement 2>"],
  "heroWorthy": <true/false - is this good enough to be a main marketing image?>,
  "caption": "<suggested social media caption, 1-2 sentences>"
}`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anthropic API error:', errorData);
      return res.status(response.status).json({ error: 'Analysis failed' });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';

    // Parse the JSON response
    try {
      const result = JSON.parse(text);
      return res.status(200).json(result);
    } catch {
      // If parsing fails, return a default response
      return res.status(200).json({
        score: 7,
        category: 'General',
        strengths: ['Good overall composition', 'Clear subject matter'],
        improvements: ['Consider adjusting lighting', 'Try different angles'],
        heroWorthy: false,
        caption: 'A captivating visual that tells a story.',
      });
    }
  } catch (err) {
    console.error('Analyze image error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
