import sharp from 'sharp';

export const receiptImgPreprocess = async (img) => {
  try {
    const processedImg = await sharp(img)
      .greyscale()
      .normalise()
      .threshold(128)
      .blur(1)
      .rotate()
      .sharpen()
      .toBuffer();

    await sharp(processedImg).toFile('processedReceiptImg.jpg');
    return processedImg;
  } catch (error) {
    console.error('Error preprocessing image:', error);
    throw error;
  }
};

export const groceryImgPreprocess = async (img) => {
  try {
    const processedImg = await sharp(img)
      .normalise()
      .blur(1)
      .rotate()
      .sharpen()
      .toBuffer();

    await sharp(processedImg).toFile('processedGroceryImg.jpg');
    return processedImg;
  } catch (error) {
    console.error('Error preprocessing image:', error);
    throw error;
  }
};