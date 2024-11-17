// descriptionController.js
const dotenv = require('dotenv');
dotenv.config();
const OpenAI = require("openai");

// Initialize the OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate a detailed description for a charity item
const generateDescription = async (req, res) => {
    try {
        const { briefDescription } = req.body;

        // Prompt for the OpenAI API
        const prompt = `Create an appealing description for the following charity item: "${briefDescription}". 
        Make it sound enticing but not too overwhelming for potential beneficiaries.
        Keep it short and concise, but include all relevant details.
        Format the response as a single paragraph of easily readable plain text.
        Ensure the response is at most 50 words long.`;

        // Generate description using the OpenAI API and the prompt above
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.9,
            max_tokens: 75,
        });

        // Extract the detailed description from the API response
        const detailedDescription = response.choices[0].message.content;
        res.json({ description: detailedDescription });
    } catch (error) {
        console.error('Error generating description:', error);
        res.status(500).json({ message: 'Failed to generate description.' });
    }
};

module.exports = { generateDescription };
