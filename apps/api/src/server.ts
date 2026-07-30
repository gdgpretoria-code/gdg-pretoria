import express, { Request, Response } from 'express';
import cors from 'cors';
import { runSeed } from './db/seed.js';
import { authRouter } from './routes/auth.js';
import { eventsRouter } from './routes/events.js';
import { speakersRouter } from './routes/speakers.js';
import { blogRouter } from './routes/blog.js';
import { jobsRouter } from './routes/jobs.js';
import { communityRouter } from './routes/community.js';
import { interviewRouter } from './routes/interview.js';
import { adminRouter } from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Seed initial memory store data on launch
runSeed();

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'GDG Pretoria API', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);
app.use('/api/speakers', speakersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/community', communityRouter);
app.use('/api/interview', interviewRouter);
app.use('/api/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`⚡ GDG Pretoria API Server running at http://localhost:${PORT}`);
});
