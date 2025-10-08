import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const conversations = new Map<string, string>();

app.get('/', (req: Request, res: Response) => {
   res.send('Homepage');
});

app.get('/api/v1/hello', (req: Request, res: Response) => {
   res.json({ message: 'Welcome to the AI Chatbot' });
});

app.post('/api/v1/chat', async (req: Request, res: Response) => {
   const { prompt, conversationId } = req.body;
   const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 100,
      previous_response_id: conversations.get(conversationId),
   });

   conversations.set(conversationId, response.id);

   res.json({ message: response.output_text });
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
