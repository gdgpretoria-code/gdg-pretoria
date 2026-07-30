import { pgTable, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('MEMBER'), // ADMIN, MEMBER, SPEAKER, SPONSOR
  bio: text('bio'),
  title: text('title'),
  company: text('company'),
  avatarUrl: text('avatar_url'),
  skills: text('skills'), // comma-separated or json
  githubUrl: text('github_url'),
  linkedinUrl: text('linkedin_url'),
  createdAt: timestamp('created_at').defaultNow()
});

export const events = pgTable('events', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  date: text('date').notNull(),
  time: text('time').notNull(),
  location: text('location').notNull(),
  venueName: text('venue_name').notNull(),
  image: text('image'),
  category: text('category').notNull(), // Web, AI/ML, Cloud, Mobile, Career
  rsvpCount: integer('rsvp_count').default(0),
  rsvpLink: text('rsvp_link'),
  isFeatured: boolean('is_featured').default(false),
  speakersJson: jsonb('speakers_json')
});

export const speakers = pgTable('speakers', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  talkTitle: text('talk_title').notNull(),
  abstract: text('abstract').notNull(),
  bio: text('bio').notNull(),
  topicTrack: text('topic_track').notNull(),
  status: text('status').default('PENDING'), // PENDING, APPROVED, REJECTED
  slidesUrl: text('slides_url'),
  videoUrl: text('video_url'),
  avatarUrl: text('avatar_url'),
  isHallOfFame: boolean('is_hall_of_fame').default(false),
  submittedAt: timestamp('submitted_at').defaultNow()
});

export const blogPosts = pgTable('blog_posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  summary: text('summary').notNull(),
  content: text('content').notNull(),
  authorName: text('author_name').notNull(),
  authorRole: text('author_role').notNull(),
  authorAvatar: text('author_avatar'),
  coverImage: text('cover_image'),
  tags: text('tags'),
  publishedAt: text('published_at').notNull(),
  isInterview: boolean('is_interview').default(false)
});

export const jobBoard = pgTable('job_board', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  company: text('company').notNull(),
  companyLogo: text('company_logo'),
  location: text('location').notNull(),
  roleType: text('role_type').notNull(), // Full-time, Remote, Internship, Contract
  salaryRange: text('salary_range'),
  description: text('description').notNull(),
  requirements: text('requirements'),
  applicationLink: text('application_link').notNull(),
  postedAt: text('posted_at').notNull(),
  sponsorTier: text('sponsor_tier').default('Gold')
});

export const communityNeeds = pgTable('community_needs', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(), // Venue, Catering, Hardware, Financial, Mentorship
  description: text('description').notNull(),
  urgency: text('urgency').notNull(), // High, Medium, Flexible
  status: text('status').default('OPEN'), // OPEN, IN_PROGRESS, FULFILLED
  contactEmail: text('contact_email').notNull()
});

export const mockInterviews = pgTable('mock_interviews', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  categoryTrack: text('category_track').notNull(), // Frontend, Backend, Cloud/GCP, System Design, AI/ML
  difficulty: text('difficulty').notNull(), // Easy, Medium, Hard
  promptText: text('prompt_text').notNull(),
  timeLimitMinutes: integer('time_limit_minutes').default(30),
  sampleAnswer: text('sample_answer').notNull(),
  keyPointsJson: jsonb('key_points_json')
});

export const interviewResults = pgTable('interview_results', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  userName: text('user_name').notNull(),
  mockInterviewId: text('mock_interview_id').notNull(),
  interviewTitle: text('interview_title').notNull(),
  userCode: text('user_code').notNull(),
  score: integer('score').notNull(),
  feedback: text('feedback').notNull(),
  completedAt: timestamp('completed_at').defaultNow()
});
