import { Router, Request, Response } from 'express';
import { LocalDataStore } from '../config/db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

export const eventsRouter = Router();

// Get all events
eventsRouter.get('/', (req: Request, res: Response) => {
  const events = LocalDataStore.getCollection<any>('events');
  res.json({ events });
});

// Get event by slug or id
eventsRouter.get('/:idOrSlug', (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  const events = LocalDataStore.getCollection<any>('events');
  const event = events.find(e => e.id === idOrSlug || e.slug === idOrSlug);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json({ event });
});

// RSVP to an event
eventsRouter.post('/:id/rsvp', (req: Request, res: Response) => {
  const { id } = req.params;
  const events = LocalDataStore.getCollection<any>('events');
  const event = events.find(e => e.id === id);
  if (!event) return res.status(404).json({ error: 'Event not found' });

  const updated = LocalDataStore.updateItem<any>('events', id, {
    rsvpCount: (event.rsvpCount || 0) + 1
  });

  res.json({ message: 'RSVP successful!', rsvpCount: updated?.rsvpCount });
});

// Create new event (Admin only)
eventsRouter.post('/', authenticateToken as any, requireRole('ADMIN') as any, (req: Request, res: Response) => {
  const { title, description, date, time, location, venueName, image, category, rsvpLink, isFeatured, speakersJson } = req.body;

  if (!title || !description || !date || !location) {
    return res.status(400).json({ error: 'Missing required event fields' });
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const newEvent = {
    id: `evt-${Date.now()}`,
    title,
    slug,
    description,
    date,
    time: time || '06:00 PM SAST',
    location,
    venueName: venueName || location,
    image: image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    category: category || 'Web',
    rsvpCount: 0,
    rsvpLink: rsvpLink || 'https://gdg.community.dev/gdg-pretoria/',
    isFeatured: Boolean(isFeatured),
    speakersJson: speakersJson || []
  };

  LocalDataStore.addItem('events', newEvent);
  res.status(201).json({ event: newEvent });
});
