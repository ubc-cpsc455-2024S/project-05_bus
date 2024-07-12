const cheapReceiptProcessor = async (img, locations, categories) => {
  try {
    const formData = new FormData();
    formData.append("img", img);
    formData.append("locations", JSON.stringify(locations));
    formData.append("categories", JSON.stringify(categories));

    const response = await fetch("http://localhost:3000/receipt/cheap", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error processing receipt:", error);
    throw error;
  }
};

const imageReceiptProcessor = async (img, locations, categories) => {
  try {
    const response = await fetch("http://localhost:3000/receipt/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ img, locations, categories }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error processing receipt:", error);
    throw error;
  }
};

export { cheapReceiptProcessor, imageReceiptProcessor };
