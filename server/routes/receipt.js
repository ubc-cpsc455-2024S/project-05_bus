import express from 'express';
import multer from 'multer';
import { receiptImgPreprocess, groceryImgPreprocess } from '../receipt/receiptParser.js';
import { chatCompletionImage, chatCompletionGroceryImage } from '../receipt/openAi.js';

const router = express.Router();
const upload = multer();

router.post('/image', upload.single('img'), async (req, res) => {
  try {
    const image = await receiptImgPreprocess(req.file.buffer);
    const response = await chatCompletionImage(
      image,
      JSON.parse(req.body.locations),
      JSON.parse(req.body.categories)
    );
    return res.json(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post('/groceryImage', upload.single('img'), async (req, res) => {
  try {
    const image = await groceryImgPreprocess(req.file.buffer);
    const response = await chatCompletionGroceryImage(
      image,
      JSON.parse(req.body.locations),
      JSON.parse(req.body.categories)
    );
    return res.json(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;
