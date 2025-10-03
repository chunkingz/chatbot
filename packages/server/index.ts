import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
   res.send('Homepage');
});

app.get('/api/v1/hello', (req: Request, res: Response) => {
   res.json({ message: 'Welcome to the AI Chatbot' });
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
