import express from 'express';
import multer from 'multer';
import { receiptImgPreprocess, groceryImgPreprocess, processReceipt } from '../receipt/receiptParser';
import { chatCompletion, chatCompletionImage, chatCompletionGroceryImage } from '../receipt/openAi';

const router = express.Router();
const upload = multer();

router.post('/cheap', upload.single('img'), async (req, res) => {
  try {
    const text = await processReceipt(req.file.buffer);
    const response = await chatCompletion(
      text,
      JSON.parse(req.body.locations),
      JSON.parse(req.body.categories)
    );
    return res.json(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

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
