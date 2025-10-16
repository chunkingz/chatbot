import type { Request, Response } from 'express';
import z from 'zod';
import { chatService } from '../services/chat.service';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long (max 1000 characters)'),
   conversationId: z.uuid(),
});

export const chatController = {
   sendMessage: async (req: Request, res: Response) => {
      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         return res.status(400).json(parseResult.error);
      }
      try {
         const { prompt, conversationId } = req.body;
         const response = await chatService.sendMessage(prompt, conversationId);
         res.json({ message: response.message });
      } catch (error) {
         res.status(500).json({ msg: 'Failed to generate a response.', error });
         console.error(`Error: ${(error as Error).message}`);
      }
   },
};
