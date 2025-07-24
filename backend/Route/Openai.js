const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ Make sure this is correct
});

router.post('/predict-disease', async (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms) {
    return res.status(400).json({ error: 'Symptoms are required' });
  }

  try {
    const prompt = `The user has the following symptoms: ${symptoms}. Based on this, suggest the most likely diseases and possible doctors/specialists.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or gpt-4 if you have access
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 150,
    });

    const result = completion.choices[0].message.content;

    res.json({ result });
  } catch (err) {
    console.error('❌ OpenAI error:', err);
    res.status(500).json({ error: 'Failed to fetch prediction from OpenAI' });
  }
});

module.exports = router;
