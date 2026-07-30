import { Router, Request, Response } from 'express';
import { LocalDataStore } from '../config/db.js';

export const communityRouter = Router();

// Get Community Needs list
communityRouter.get('/needs', (req: Request, res: Response) => {
  const needs = LocalDataStore.getCollection<any>('communityNeeds');
  res.json({ needs });
});

// Post a new Community Need request
communityRouter.post('/needs', (req: Request, res: Response) => {
  const { title, category, description, urgency, contactEmail } = req.body;

  if (!title || !category || !description || !contactEmail) {
    return res.status(400).json({ error: 'Missing required community need fields' });
  }

  const newNeed = {
    id: `need-${Date.now()}`,
    title,
    category,
    description,
    urgency: urgency || 'Medium',
    status: 'OPEN',
    contactEmail
  };

  LocalDataStore.addItem('communityNeeds', newNeed);
  res.status(201).json({ need: newNeed });
});
