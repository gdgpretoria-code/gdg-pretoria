import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { LocalDataStore } from '../config/db.js';
import { generateToken, AuthenticatedRequest, authenticateToken } from '../middleware/auth.js';

export const authRouter = Router();

// Register User
authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = 'MEMBER', bio, title, company, skills } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const users = LocalDataStore.getCollection<any>('users');
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      passwordHash,
      role,
      bio: bio || '',
      title: title || 'Community Developer',
      company: company || '',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      skills: skills || '',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      createdAt: new Date()
    };

    LocalDataStore.addItem('users', newUser);

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name
    });

    const { passwordHash: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ token, user: userWithoutPassword });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Login User
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = LocalDataStore.getCollection<any>('users');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    });

    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get Current Profile
authRouter.get('/me', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  const users = LocalDataStore.getCollection<any>('users');
  const user = users.find(u => u.id === req.user!.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { passwordHash: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

// List Members for Member Directory
authRouter.get('/members', (req: Request, res: Response) => {
  const users = LocalDataStore.getCollection<any>('users');
  const members = users.map(({ passwordHash, ...rest }) => rest);
  res.json({ members });
});
