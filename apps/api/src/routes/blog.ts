import { Router, Request, Response } from 'express';
import { LocalDataStore } from '../config/db.js';

export const blogRouter = Router();

// Get all blog posts & interviews
blogRouter.get('/', (req: Request, res: Response) => {
  const blogPosts = LocalDataStore.getCollection<any>('blogPosts');
  res.json({ blogPosts });
});

// Get post by slug
blogRouter.get('/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const blogPosts = LocalDataStore.getCollection<any>('blogPosts');
  const post = blogPosts.find(p => p.slug === slug || p.id === slug);
  if (!post) return res.status(404).json({ error: 'Blog post not found' });
  res.json({ post });
});
