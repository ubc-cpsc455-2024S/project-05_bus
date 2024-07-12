import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ocrPrompt = `
I will provide the output of an OCR scan of my grocery receipt. Decode the contents, resolve abbreviations, and correct any misspellings. Return a JSON object listing grocery items and their quantities, ignoring prices. For items typically sold in specific quantities (e.g., 'dozen', 'pack'), include the quantity in the item's name (e.g., 'Eggs (1 dozen)'). For items sold by count or weight (e.g., '5 apples'), return the item name and quantity separately (e.g., 'Apple', quantity 5).

Example result:
{
  "groceries": [
    {"name": "Soft Tofu", "quantity": 1},
    {"name": "Garlic (3 Pack)", "quantity": 1},
    {"name": "Lancia Macaroni", "quantity": 1},
    {"name": "Onion Sweet (0.545 kg)", "quantity": 1},
    {"name": "Ginger (0.060 kg)", "quantity": 1},
    {"name": "Strawberries", "quantity": 2}
  ]
}
\`\`\`
`;

const imagePrompt = `
I will provide an image of my grocery receipt. Please use your expertise to extract and decode the contents, correcting any abbreviations or misspellings. Return a list of grocery items and their quantities as a JSON object, disregarding prices. For items typically sold in specific quantities or packaging (e.g., 'dozen', 'pack', 'bunch'), include the quantity in the item's name, such as 'Eggs (1 dozen)', with a quantity of 1. For other items sold by count or weight (e.g., '5 apples'), return the item name and quantity separately, like 'Apple', quantity 5. Do not include any additional text, only return the JSON object.

Example result:
{
  "groceries": [
    {"name": "Soft Tofu", "quantity": 1},
    {"name": "Garlic (3 Pack)", "quantity": 1},
    {"name": "Lancia Macaroni", "quantity": 1},
    {"name": "Onion Sweet (0.545 kg)", "quantity": 1},
    {"name": "Ginger (0.060 kg)", "quantity": 1},
    {"name": "Strawberries", "quantity": 2}
  ]
}
\`\`\`
`;

const consolidatePrompt = (locations, categories) => {
  return `
    Here are some locations and categories for organizing the grocery list you just created:

    ${locations}

    ${categories}

    Use your best judgment to sort the groceries into the appropriate location and category from the provided lists. Please return the groceries as a JSON object in the format:

    {
    "groceries": [
        {"name": "Milk (1 gallon)", "quantity": 1, "locationId": 3, "categoryId": 3},
        {"name": "Apples (5)", "quantity": 1, "locationId": 1, "categoryId": 1},
        {"name": "Pasta", "quantity": 2} // No specific location or category
    ]
    }

    If a grocery item does not fit well into any of the listed locations or categories, you may leave the corresponding fields (locationId, categoryId) blank.`;
};

export const chatCompletion = async (content, locations, categories) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "user", content: ocrPrompt + content },
        { role: "user", content: consolidatePrompt(locations, categories)}],
      model: "gpt-3.5-turbo",
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error completing chat:", error);
    throw error;
  }
};

export const chatCompletionImage = async (image, locations, categories) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: imagePrompt },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64, ${Buffer.from(image).toString(
                  "base64"
                )}`,
                detail: "low"
              },
            },
          ],
        },
        { role: "user", content: consolidatePrompt(locations, categories)}
      ],
      max_tokens: 1000,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error completing chat:", error);
    throw error;
  }
};
