// recipeController.js
const dotenv = require('dotenv');
dotenv.config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let lastRequestTime = 0;
const REQUEST_INTERVAL = 3000; // 3-second interval to avoid excessive requests

const generateRecipe = async (req, res) => {
    const currentTime = Date.now();

    // Rate limit check
    if (currentTime - lastRequestTime < REQUEST_INTERVAL) {
        return res.status(429).json({ message: 'Please wait a moment before making another request.' });
    }
    
    lastRequestTime = currentTime;
    
    try {
        const { ingredients } = req.body; // Expecting an array of ingredients

        // Construct a dynamic prompt for ChatGPT
        const prompt = `Create a detailed recipe that incorporates the following ingredients: ${ingredients.join(', ')}. 
        Format the response as HTML with the following structure:
        - An <h2> tag for the recipe title.
        - A horizontal rule <hr>.
        - An <h4> tag for the "Ingredients" heading, followed by each ingredient in a <li> inside a <ul>.
        - An <h4> tag for the "Instructions" heading, followed by each instruction step in a <li> inside an <ol>.
        If the prompt is not related to food or is empty, do not generate anything and ask for food ingredients.
        Make sure to remove the code fencing from the response.
        Ensure the response is only formated as well-formed HTML and uses readable english.
        Ensure the response is at most 750 tokens long.`;
        

        // Call OpenAI's chat completion with dynamic content
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // or "gpt-4" if available in your account
            messages: [
                { role: "user", content: prompt }
            ],
            temperature: 0.5,
            max_tokens: 750,
        });
        const recipe = response.choices[0].message.content; // Extract recipe content
        res.json({ recipe });
        
    } catch (error) {
        console.error('Error generating recipe:', error.response?.data || error.message);
        res.status(500).json({ message: 'Failed to generate recipe due to API limitations.' });
    }    
};

module.exports = { generateRecipe };
