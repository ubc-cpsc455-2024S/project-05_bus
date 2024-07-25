import { createWorker } from "tesseract.js";
import sharp from "sharp";

const worker = await createWorker("eng");

export const processReceipt = async (image) => {
  const processedImg = await receiptImgPreprocess(image);
  const text = await extractText(processedImg);
  return text;
};

export const receiptImgPreprocess = async (img) => {
  try {
    const processedImg = await sharp(img)
      .greyscale()
      .normalise()
      .threshold(128)
      .blur(1)
      .rotate()
      .sharpen()
      .toBuffer()

    await sharp(processedImg).toFile("processedReceiptImg.jpg");
    return processedImg;
  } catch (error) {
    console.error("Error preprocessing image:", error);
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
      .toBuffer()

    await sharp(processedImg).toFile("processedGroceryImg.jpg");
    return processedImg;
  } catch (error) {
    console.error("Error preprocessing image:", error);
    throw error;
  }
};

const extractText = async (receiptImg) => {
  try {
    const {
      data: { text },
    } = await worker.recognize(receiptImg);
    return text;
  } catch (error) {
    console.error("Error extracting text:", error);
    throw error;
  }
};