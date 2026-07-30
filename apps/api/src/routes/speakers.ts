import { Router, Request, Response } from 'express';
import { LocalDataStore } from '../config/db.js';

export const speakersRouter = Router();

// List approved speakers / Hall of Fame
speakersRouter.get('/', (req: Request, res: Response) => {
  const speakers = LocalDataStore.getCollection<any>('speakers');
  res.json({ speakers });
});

// Submit CFP talk proposal
speakersRouter.post('/cfp', (req: Request, res: Response) => {
  const { name, email, talkTitle, abstract, bio, topicTrack, slidesUrl } = req.body;

  if (!name || !email || !talkTitle || !abstract || !bio || !topicTrack) {
    return res.status(400).json({ error: 'All CFP form fields are required' });
  }

  const newCFP = {
    id: `spk-${Date.now()}`,
    name,
    email,
    talkTitle,
    abstract,
    bio,
    topicTrack,
    status: 'PENDING',
    slidesUrl: slidesUrl || '',
    videoUrl: '',
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    isHallOfFame: false,
    submittedAt: new Date()
  };

  LocalDataStore.addItem('speakers', newCFP);
  res.status(201).json({ message: 'Call for Papers proposal submitted successfully!', cfp: newCFP });
});
