import { Router, Request, Response } from 'express';
import { LocalDataStore } from '../config/db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

export const adminRouter = Router();

// Require ADMIN role for all routes in admin router
adminRouter.use(authenticateToken as any, requireRole('ADMIN') as any);

// Update CFP proposal status (APPROVE / REJECT)
adminRouter.patch('/cfps/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, isHallOfFame } = req.body;

  const updated = LocalDataStore.updateItem<any>('speakers', id, {
    status,
    isHallOfFame: isHallOfFame !== undefined ? Boolean(isHallOfFame) : undefined
  });

  if (!updated) return res.status(404).json({ error: 'CFP record not found' });
  res.json({ message: `CFP status updated to ${status}`, speaker: updated });
});

// Update Community Need status
adminRouter.patch('/needs/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const updated = LocalDataStore.updateItem<any>('communityNeeds', id, { status });
  if (!updated) return res.status(404).json({ error: 'Need record not found' });
  res.json({ message: `Community need status updated to ${status}`, need: updated });
});

// Get admin stats overview
adminRouter.get('/stats', (req: Request, res: Response) => {
  const events = LocalDataStore.getCollection('events');
  const speakers = LocalDataStore.getCollection('speakers');
  const blogPosts = LocalDataStore.getCollection('blogPosts');
  const jobBoard = LocalDataStore.getCollection('jobBoard');
  const users = LocalDataStore.getCollection('users');

  res.json({
    totalEvents: events.length,
    totalSpeakers: speakers.length,
    pendingCFPs: speakers.filter((s: any) => s.status === 'PENDING').length,
    totalPosts: blogPosts.length,
    activeJobs: jobBoard.length,
    totalMembers: users.length
  });
});
