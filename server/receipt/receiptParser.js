import { createWorker } from "tesseract.js";
import sharp from "sharp";

const worker = await createWorker("eng");

export const processReceipt = async (image) => {
  // const image = await fetchImageBuffer(imgUrl);
  const processedImg = await preprocessImg(image);
  const text = await extractText(processedImg);
  return text;
};

const fetchImageBuffer = async (blobUrl) => {
  try {
    const response = await fetch(blobUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image. Status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Error fetching image:', error.message);
    throw new Error('Failed to fetch image.');
  }
};

export const preprocessImg = async (img) => {
  try {
    console.log(img)
    const processedImg = await sharp(img)
      .greyscale()
      .normalise()
      .threshold(128)
      .blur(1)
      .rotate()
      .sharpen()
      .toBuffer()
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
  } finally {
    await worker.terminate();
  }
};