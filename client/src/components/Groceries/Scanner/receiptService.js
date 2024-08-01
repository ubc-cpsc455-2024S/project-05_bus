const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const receiptProcessor = async (img, locations, categories, endpoint) => {
  try {
    const formData = new FormData();
    formData.append("img", img);
    formData.append("locations", JSON.stringify(locations));
    formData.append("categories", JSON.stringify(categories));

    const response = await fetch(`${SERVER_URL}/receipt/${endpoint}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error processing receipt for ${endpoint}:`, error);
    throw error;
  }
};

export const imageReceiptProcessor = async (img, locations, categories) => {
  return await receiptProcessor(img, locations, categories, "image");
};

export const groceryImageReceiptProcessor = async (img, locations, categories) => {
    return await receiptProcessor(img, locations, categories, "groceryImage");
  };
