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
I will provide an image of my grocery receipt. Please use your expertise to extract and decode the contents, correcting any abbreviations or misspellings. Return a list of grocery items and their quantities as a JSON object, disregarding prices. For items typically sold in specific quantities or packaging (e.g., 'dozen', 'pack', 'bunch'), include the quantity in the item's name, such as 'Eggs (1 dozen)', with a quantity of 1. For other items sold by count or weight (e.g., '5 apples'), return the item name and quantity separately, like 'Apple', quantity 5.

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

const groceryImagePrompt = `
I will provide an image of some groceries I just bought. Please use your expertise to determine the contents, as closely as possible and including brand names if possible. Return a list of grocery items and their quantities as a JSON object. For items typically sold in specific quantities or packaging (e.g., 'dozen', 'pack', 'bunch'), include the quantity in the item's name, such as 'Eggs (1 dozen)', with a quantity of 1. For other items sold by count or weight (e.g., '5 apples'), return the item name and quantity separately, like 'Apple', quantity 5.

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
    Use your best judgment to sort the groceries into the appropriate location and category from the provided lists. 
    For example, 'Milk' would likely be in the 'Dairy' category and 'Fridge' location. 
    Associate each grocery item with the corresponding locationId and categoryId from the given lists, referencing their _id values. 
    If the location or category is not provided, you can leave it blank. 
    Please return the groceries as a JSON object in the format specified, without any additional text.
    
    Locations:
    ${JSON.stringify(locations)}

    Categories:
    ${JSON.stringify(categories)}

    Example of what to return:

    {
      "groceries": [
          {"name": "Milk (1 gallon)", "quantity": 1, "locationId": 668dfa2940baaede0daf611f, "categoryId": 668071b47522f05c47e328a6},
          {"name": "Apples (5)", "quantity": 1, "locationId": 668071a87522f05c47e328a1, "categoryId": 668071b47522f05c47e328a5},
          {"name": "Pasta", "quantity": 2} // No specific location or category
      ]
    }`;
};

export const chatCompletion = async (content, locations, categories) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "user", content: ocrPrompt + content },
        { role: "user", content: consolidatePrompt(locations, categories) },
      ],
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
                detail: "high",
              },
            },
          ],
        },
        { role: "user", content: consolidatePrompt(locations, categories) },
      ],
      max_tokens: 1000,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error completing chat:", error);
    throw error;
  }
};

export const chatCompletionGroceryImage = async (
  image,
  locations,
  categories
) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: groceryImagePrompt },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64, ${Buffer.from(image).toString(
                  "base64"
                )}`,
                detail: "low",
              },
            },
          ],
        },
        { role: "user", content: consolidatePrompt(locations, categories) },
      ],
      max_tokens: 1000,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error completing chat:", error);
    throw error;
  }
};
