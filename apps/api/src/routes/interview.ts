import { Router, Request, Response } from 'express';
import { LocalDataStore } from '../config/db.js';

export const interviewRouter = Router();

// Get Mock Interview questions by category/track
interviewRouter.get('/questions', (req: Request, res: Response) => {
  const { track } = req.query;
  const questions = LocalDataStore.getCollection<any>('mockInterviews');
  if (track) {
    const filtered = questions.filter(q => q.categoryTrack.toLowerCase() === (track as string).toLowerCase());
    return res.json({ questions: filtered });
  }
  res.json({ questions });
});

// Evaluate Mock Technical Answer Submission
interviewRouter.post('/evaluate', (req: Request, res: Response) => {
  const { mockInterviewId, userCode, userId, userName } = req.body;

  if (!mockInterviewId || !userCode) {
    return res.status(400).json({ error: 'Mock interview ID and code solution are required' });
  }

  const questions = LocalDataStore.getCollection<any>('mockInterviews');
  const question = questions.find(q => q.id === mockInterviewId);

  if (!question) return res.status(404).json({ error: 'Interview prompt not found' });

  // Intelligent score calculation engine
  const userLength = userCode.trim().length;
  let score = 75;
  const feedbackPoints = [];

  const keyPoints: string[] = question.keyPointsJson || [];
  let matchedPoints = 0;

  for (const point of keyPoints) {
    const keywords = point.toLowerCase().split(' ');
    if (keywords.some(kw => userCode.toLowerCase().includes(kw))) {
      matchedPoints++;
    }
  }

  if (keyPoints.length > 0) {
    score = Math.min(100, Math.max(60, Math.round((matchedPoints / keyPoints.length) * 40 + 60)));
  }

  if (userLength > 100) {
    feedbackPoints.push('Substantial structural response submitted.');
  } else {
    feedbackPoints.push('Consider elaborating further on key architectural trade-offs.');
  }

  feedbackPoints.push(`Covered ${matchedPoints} out of ${keyPoints.length} core technical evaluation criteria.`);

  const result = {
    id: `res-${Date.now()}`,
    userId: userId || 'usr-anonymous',
    userName: userName || 'GDG Member',
    mockInterviewId,
    interviewTitle: question.title,
    userCode,
    score,
    feedback: feedbackPoints.join(' '),
    completedAt: new Date()
  };

  LocalDataStore.addItem('interviewResults', result);
  res.json({ evaluation: result, sampleAnswer: question.sampleAnswer });
});

// Get user interview evaluation history
interviewRouter.get('/history', (req: Request, res: Response) => {
  const history = LocalDataStore.getCollection<any>('interviewResults');
  res.json({ history });
});
