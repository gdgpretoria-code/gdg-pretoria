import bcrypt from 'bcryptjs';
import { LocalDataStore } from '../config/db.js';

export async function runSeed() {
  console.log('🌱 Seeding GDG Pretoria database...');

  const passwordHash = await bcrypt.hash('gdgpretoria2026', 10);

  const users = [
    {
      id: 'usr-admin-1',
      name: 'Thabo Mbeki',
      email: 'admin@gdgpretoria.org',
      passwordHash,
      role: 'ADMIN',
      bio: 'GDG Pretoria Community Lead & Senior Cloud Architect at Google Cloud Partner South Africa.',
      title: 'GDG Pretoria Lead',
      company: 'CloudAfriq',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      skills: 'Google Cloud, Angular, System Design, Kubernetes, Community Leadership',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com'
    },
    {
      id: 'usr-member-1',
      name: 'Zanele Khumalo',
      email: 'zanele@devs.co.za',
      passwordHash,
      role: 'MEMBER',
      bio: 'Fullstack TypeScript developer passionate about Angular 22+, Firebase, and open source.',
      title: 'Fullstack Developer',
      company: 'Derivco Pretoria',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      skills: 'Angular, TypeScript, Express, PostgreSQL, TailwindCSS',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com'
    },
    {
      id: 'usr-speaker-1',
      name: 'Dr. Kobus van der Merwe',
      email: 'kobus@ai-research.ac.za',
      passwordHash,
      role: 'SPEAKER',
      bio: 'AI Specialist & University of Pretoria Research Fellow focusing on LLM Agents & Gemini API.',
      title: 'AI Lead Researcher',
      company: 'UP AI Lab',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      skills: 'Gemini API, Python, TensorFlow, PyTorch, RAG Pipelines',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com'
    }
  ];

  const events = [
    {
      id: 'evt-1',
      title: 'GDG Pretoria Tech Fest 2026: Building with Gemini & Google Cloud',
      slug: 'tech-fest-2026-gemini-gcp',
      description: 'Join GDG Pretoria for a full-day hands-on summit featuring Google Cloud Keynotes, Gemini 1.5 Pro live coding, Angular 22 signals deep-dive, and networking drinks!',
      date: '2026-08-25',
      time: '09:00 AM - 04:30 PM SAST',
      location: 'Innovations Hub Auditorium, Mark Shuttleworth St, Pretoria',
      venueName: 'The Innovation Hub Pretoria',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      category: 'AI/ML',
      rsvpCount: 240,
      rsvpLink: 'https://gdg.community.dev/gdg-pretoria/',
      isFeatured: true,
      speakersJson: [
        { name: 'Dr. Kobus van der Merwe', role: 'AI Lead Researcher', topic: 'Building Multimodal Agents with Gemini 1.5 & Vertex AI' },
        { name: 'Thabo Mbeki', role: 'Cloud Architect', topic: 'Serverless Angular 22 & Firebase Genkit Architecture' }
      ]
    },
    {
      id: 'evt-2',
      title: 'DevFest Pretoria 2026: Modern Web & Mobile Day',
      slug: 'devfest-pretoria-2026',
      description: 'The flagship annual technology conference by GDG Pretoria. Over 15 talks across 3 tracks: Android/Flutter, Modern Web, and Cloud DevOps.',
      date: '2026-10-14',
      time: '08:30 AM - 05:00 PM SAST',
      location: 'CSIR International Convention Centre, Pretoria East',
      venueName: 'CSIR ICC Pretoria',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
      category: 'Web',
      rsvpCount: 450,
      rsvpLink: 'https://gdg.community.dev/gdg-pretoria/',
      isFeatured: true,
      speakersJson: [
        { name: 'Sipho Zulu', role: 'Staff Android Engineer', topic: 'Jetpack Compose & Kotlin Multiplatform in 2026' }
      ]
    },
    {
      id: 'evt-3',
      title: 'Hands-on Workshop: Building Fullstack Angular 22 & Drizzle ORM',
      slug: 'workshop-angular-22-drizzle',
      description: 'Bring your laptop! A practical 3-hour code lab building a real-time Angular app connected to Node Express and PostgreSQL via Drizzle ORM.',
      date: '2026-07-12',
      time: '10:00 AM - 01:00 PM SAST',
      location: 'Tshwane University of Technology Digital Lab',
      venueName: 'TUT Tech Campus',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      category: 'Web',
      rsvpCount: 85,
      rsvpLink: 'https://gdg.community.dev/gdg-pretoria/',
      isFeatured: false,
      speakersJson: [
        { name: 'Zanele Khumalo', role: 'Fullstack Dev', topic: 'Mastering Signals & Control Flow in Angular 22' }
      ]
    }
  ];

  const speakers = [
    {
      id: 'spk-1',
      name: 'Dr. Kobus van der Merwe',
      email: 'kobus@ai-research.ac.za',
      talkTitle: 'Building Multimodal Agents with Gemini 1.5 & Vertex AI',
      abstract: 'An in-depth exploration of constructing resilient autonomous AI workflows using Google Cloud Vertex AI, Gemini API, and vector embeddings.',
      bio: 'AI Lead Researcher at UP AI Lab and active Google Developer Expert in Machine Learning.',
      topicTrack: 'AI/ML',
      status: 'APPROVED',
      slidesUrl: 'https://slides.google.com',
      videoUrl: 'https://youtube.com',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      isHallOfFame: true,
      submittedAt: new Date()
    },
    {
      id: 'spk-2',
      name: 'Lerato Molefe',
      email: 'lerato@clouddevs.africa',
      talkTitle: 'Zero-Trust Security & IAM Guardrails on Google Cloud Platform',
      abstract: 'Best practices for automating security policies, workload identity federation, and KMS key rotation across multi-project GCP environments.',
      bio: 'Principal Cloud Security Specialist at Enterprise Systems Gauteng.',
      topicTrack: 'Cloud/GCP',
      status: 'APPROVED',
      slidesUrl: 'https://slides.google.com',
      videoUrl: 'https://youtube.com',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      isHallOfFame: true,
      submittedAt: new Date()
    }
  ];

  const blogPosts = [
    {
      id: 'post-1',
      title: 'Speaker Spotlight: How Dr. Kobus van der Merwe Built an AI Agent for Healthcare in Gauteng',
      slug: 'speaker-spotlight-kobus-ai-healthcare',
      summary: 'In this exclusive pre-event interview, Dr. Kobus shares insights into using Gemini 1.5 for clinical diagnostic assistance in South African hospitals.',
      content: '## The Intersection of Medical Research & Generative AI\n\nWhen Dr. Kobus van der Merwe started testing Gemini 1.5 Pro in early 2026, his goal was clear: bridge the resource gap in regional clinics using accessible AI tooling.\n\n### Key Takeaways from the Interview:\n1. **Multimodal Processing**: Feeding clinical notes alongside diagnostic imaging allowed 35% faster patient triaging.\n2. **Google Cloud Privacy**: Ensuring HIPAA & POPIA compliance via dedicated Vertex AI tenant boundaries.\n3. **Community Advice**: "Don\'t just learn APIs—understand prompt engineering and evaluation metrics!"',
      authorName: 'GDG Editorial Team',
      authorRole: 'Community Content Desk',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      tags: 'AI/ML, Gemini API, Interview, Healthcare',
      publishedAt: '2026-07-20',
      isInterview: true
    },
    {
      id: 'post-2',
      title: 'Why Angular 22+ & Signals Are Changing Enterprise Frontend Engineering in South Africa',
      slug: 'angular-22-signals-enterprise-guide',
      summary: 'A deep dive into reactive architecture, fine-grained DOM updates, and eliminating Zone.js overhead in Angular 22 web apps.',
      content: '## The Evolution of Angular\n\nAngular 22 introduces declarative reactive primitives that drastically reduce boilerplate code while giving developers crystal-clear performance gains.',
      authorName: 'Zanele Khumalo',
      authorRole: 'Senior Frontend Engineer',
      authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      tags: 'Angular, Web Development, TypeScript, Frontend',
      publishedAt: '2026-07-15',
      isInterview: false
    }
  ];

  const jobBoard = [
    {
      id: 'job-1',
      title: 'Senior Cloud Engineer (GCP & Kubernetes)',
      company: 'CloudAfriq South Africa',
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      location: 'Pretoria East / Hybrid',
      roleType: 'Full-time',
      salaryRange: 'R950,000 - R1,250,000 per annum',
      description: 'We are seeking an experienced Google Cloud Architect to lead infrastructure modernizations for top African banking and healthcare clients.',
      requirements: 'Google Cloud Professional Architect certified, 4+ years Kubernetes/Terraform, Python or Go scripting proficiency.',
      applicationLink: 'https://cloudafriq.co.za/careers',
      postedAt: '2026-07-28',
      sponsorTier: 'Platinum'
    },
    {
      id: 'job-2',
      title: 'Fullstack Developer (Angular 22 & Node/TypeScript)',
      company: 'Derivco Pretoria',
      companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=200&q=80',
      location: 'Menlo Park, Pretoria',
      roleType: 'Full-time',
      salaryRange: 'R700,000 - R900,000 per annum',
      description: 'Join our dynamic platform team crafting high-throughput real-time web applications with Angular 22 Signals and Node microservices.',
      requirements: 'Strong TypeScript skills, experience with reactive state management, Drizzle/Prisma ORMs, REST & WebSockets.',
      applicationLink: 'https://derivco.com/careers',
      postedAt: '2026-07-25',
      sponsorTier: 'Gold'
    }
  ];

  const communityNeeds = [
    {
      id: 'need-1',
      title: 'Venue Space for 250 Attendees (DevFest 2026)',
      category: 'Venue',
      description: 'We are seeking a corporate auditorium or university hall in Pretoria with AV equipment, Wi-Fi, and stage lighting for our flagship DevFest conference.',
      urgency: 'High',
      status: 'OPEN',
      contactEmail: 'sponsors@gdgpretoria.org'
    },
    {
      id: 'need-2',
      title: 'Catering & Refreshment Sponsorship for Tech Fest',
      category: 'Catering',
      description: 'Partner with us to provide lunch, coffee stations, and afternoon snacks for 200 local developers and university students.',
      urgency: 'Medium',
      status: 'OPEN',
      contactEmail: 'sponsors@gdgpretoria.org'
    },
    {
      id: 'need-3',
      title: 'Hardware Swag & Cloud Credits for Student Hackathon',
      category: 'Hardware',
      description: 'Sponsor Raspberry Pi kits, Google Cloud credit vouchers, or developer T-shirts for student hackathon winners.',
      urgency: 'Flexible',
      status: 'OPEN',
      contactEmail: 'info@gdgpretoria.org'
    }
  ];

  const mockInterviews = [
    {
      id: 'interview-1',
      title: 'Cloud Infrastructure & High Availability on GCP',
      categoryTrack: 'Cloud/GCP',
      difficulty: 'Medium',
      promptText: 'Design a resilient, multi-region web application on Google Cloud Platform that handles 50,000 requests/sec with auto-scaling, Cloud SQL failover, and Cloud CDN caching.',
      timeLimitMinutes: 30,
      sampleAnswer: '1. Use Cloud Load Balancing with HTTP(S) multi-region backends.\n2. Deploy GKE clusters in 2 GCP regions with Cloud Run autoscale.\n3. Utilize Cloud SQL for PostgreSQL with Cross-Region Read Replicas & automated failover.\n4. Cache static media on Cloud CDN backed by Cloud Storage buckets.',
      keyPointsJson: ['Multi-region load balancing', 'Cloud SQL HA & failover', 'GKE / Cloud Run auto-scaling', 'Cloud CDN caching layer']
    },
    {
      id: 'interview-2',
      title: 'Angular 22 Signals & Reactive State Architecture',
      categoryTrack: 'Frontend',
      difficulty: 'Medium',
      promptText: 'Explain how Angular 22 Signals differ from RxJS Observables. Write a TypeScript code snippet creating a computed signal that filters a list of GDG events by search query.',
      timeLimitMinutes: 20,
      sampleAnswer: 'Signals represent synchronous state values with glitch-free reactivity. Unlike RxJS Observables, Signals do not require manual unsubscribe management.\n\nCode:\nconst events = signal<Event[]>([]);\nconst query = signal<string>("");\nconst filteredEvents = computed(() => events().filter(e => e.title.includes(query())));',
      keyPointsJson: ['Signal vs Observable lifecycle', 'computed() & effect() usage', 'Memory leak protection', 'Zone-less change detection']
    },
    {
      id: 'interview-3',
      title: 'Designing a Scalable Rate Limiter Middleware in Node.js',
      categoryTrack: 'Backend',
      difficulty: 'Hard',
      promptText: 'Implement a sliding-window rate limiter middleware for Express.js using Redis sliding log algorithm to restrict API clients to 100 requests per minute.',
      timeLimitMinutes: 30,
      sampleAnswer: 'Use Redis sorted set (ZADD/ZREMRANGEBYSCORE) where score is epoch timestamp in milliseconds. Count elements in current 60s window using ZCARD.',
      keyPointsJson: ['Sliding log vs token bucket', 'Redis ZADD & ZCARD atomic queries', 'Express middleware handling 429 Too Many Requests']
    }
  ];

  const interviewResults = [
    {
      id: 'res-1',
      userId: 'usr-member-1',
      userName: 'Zanele Khumalo',
      mockInterviewId: 'interview-2',
      interviewTitle: 'Angular 22 Signals & Reactive State Architecture',
      userCode: 'const query = signal(""); const filtered = computed(() => items().filter(i => i.name.includes(query())));',
      score: 95,
      feedback: 'Excellent grasp of computed signals! Covered synchronous value evaluation cleanly and syntax was flawless.',
      completedAt: new Date()
    }
  ];

  LocalDataStore.setCollection('users', users);
  LocalDataStore.setCollection('events', events);
  LocalDataStore.setCollection('speakers', speakers);
  LocalDataStore.setCollection('blogPosts', blogPosts);
  LocalDataStore.setCollection('jobBoard', jobBoard);
  LocalDataStore.setCollection('communityNeeds', communityNeeds);
  LocalDataStore.setCollection('mockInterviews', mockInterviews);
  LocalDataStore.setCollection('interviewResults', interviewResults);

  console.log('✅ Database seeded successfully with GDG Pretoria mock data!');
}

if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  runSeed();
}
