import express from "express";
import { preprocessImg, processReceipt } from "../receipt/receiptParser.js";
import { chatCompletion, chatCompletionImage } from "../receipt/openAi.js";

const router = express.Router();

router.post("/cheap", async (req, res) => {
  try {
    const text = await processReceipt(req.body.img);
    const response = await chatCompletion(text, req.body.locations, req.body.categories);
    return res.json(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/image", async (req, res) => {
  try {
    const image = await preprocessImg(req.body.img);
    const response = await chatCompletionImage(image, req.body.locations, req.body.categories);
    return res.json(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;