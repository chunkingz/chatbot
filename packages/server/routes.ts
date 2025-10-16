import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';
import { de } from 'zod/locales';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('Homepage');
});

router.get('/api/v1/hello', (req: Request, res: Response) => {
   res.json({ message: 'Welcome to the AI Chatbot' });
});

router.post('/api/v1/chat', chatController.sendMessage);

export default router;
