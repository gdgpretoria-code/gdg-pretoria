import { Router, Request, Response } from 'express';
import { LocalDataStore } from '../config/db.js';

export const jobsRouter = Router();

// Get job listings
jobsRouter.get('/', (req: Request, res: Response) => {
  const jobBoard = LocalDataStore.getCollection<any>('jobBoard');
  res.json({ jobs: jobBoard });
});

// Post a new job opportunity
jobsRouter.post('/', (req: Request, res: Response) => {
  const { title, company, companyLogo, location, roleType, salaryRange, description, requirements, applicationLink, sponsorTier } = req.body;

  if (!title || !company || !location || !roleType || !description || !applicationLink) {
    return res.status(400).json({ error: 'Missing required job posting fields' });
  }

  const newJob = {
    id: `job-${Date.now()}`,
    title,
    company,
    companyLogo: companyLogo || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80',
    location,
    roleType,
    salaryRange: salaryRange || 'Market Related',
    description,
    requirements: requirements || '',
    applicationLink,
    postedAt: new Date().toISOString().split('T')[0],
    sponsorTier: sponsorTier || 'Gold'
  };

  LocalDataStore.addItem('jobBoard', newJob);
  res.status(201).json({ message: 'Job opportunity posted successfully!', job: newJob });
});
