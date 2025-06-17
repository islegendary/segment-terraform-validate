export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const { code } = req.body;
  if (!process.env.NEXT_PUBLIC_OPENAI_KEY) {
    res.status(200).json({ fixed: code });
    return;
  }
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Fix this HCL: ${code}` }],
      }),
    });
    const data = await response.json();
    const fixed = data.choices?.[0]?.message?.content || code;
    res.status(200).json({ fixed });
  } catch (err) {
    res.status(500).json({ error: 'Failed to contact Codex' });
  }
}
