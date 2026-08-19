const now = new Date().toISOString();

export const seedCategories = [
  { id: 'business', name: 'Business', createdAt: now },
  { id: 'coding', name: 'Coding', createdAt: now },
  { id: 'writing', name: 'Writing', createdAt: now },
  { id: 'marketing', name: 'Marketing', createdAt: now },
  { id: 'productivity', name: 'Productivity', createdAt: now },
  { id: 'education', name: 'Education', createdAt: now },
  { id: 'personal', name: 'Personal', createdAt: now },
];

export const seedPrompts = [
  {
    id: 'seed-python-debug',
    title: 'Python Debugging Helper',
    categoryId: 'coding',
    categoryName: 'Coding',
    tags: ['debug', 'python'],
    content:
      'You are an expert Python developer. Help me debug the following code. Explain the root cause of the bug, then provide a corrected version.\n\n[paste code here]',
    notes: '',
    isFavorite: false,
    createdAt: now,
    updatedAt: now,
    version: 1,
  },
  {
    id: 'seed-seo-blog',
    title: 'SEO Blog Post Outline',
    categoryId: 'marketing',
    categoryName: 'Marketing',
    tags: ['seo', 'content'],
    content:
      'Create a detailed SEO-optimized blog post outline for the topic: [topic]. Include a target keyword, meta description, H2/H3 structure, and a suggested word count for each section.',
    notes: '',
    isFavorite: false,
    createdAt: now,
    updatedAt: now,
    version: 1,
  },
  {
    id: 'seed-cold-email',
    title: 'Cold Email Template',
    categoryId: 'marketing',
    categoryName: 'Marketing',
    tags: ['email'],
    content:
      'Write a concise, personalized cold outreach email to [recipient/role] introducing [product/service]. Keep it under 120 words, with a clear single call to action.',
    notes: '',
    isFavorite: false,
    createdAt: now,
    updatedAt: now,
    version: 1,
  },
  {
    id: 'seed-code-refactor',
    title: 'Code Refactoring Assistant',
    categoryId: 'coding',
    categoryName: 'Coding',
    tags: ['python', 'refactor'],
    content:
      'Refactor the following code for readability, performance, and maintainability without changing its behavior. Explain each significant change.\n\n[paste code here]',
    notes: '',
    isFavorite: false,
    createdAt: now,
    updatedAt: now,
    version: 1,
  },
  {
    id: 'seed-study-plan',
    title: 'Study Plan Generator',
    categoryId: 'education',
    categoryName: 'Education',
    tags: ['study', 'plan'],
    content:
      'Create a structured study plan for learning [subject] over [timeframe]. Include weekly milestones, recommended resources, and periodic self-check questions.',
    notes: '',
    isFavorite: false,
    createdAt: now,
    updatedAt: now,
    version: 1,
  },
];

export const defaultSettings = {
  appearance: 'dark',
  defaultStartupView: 'library',
  promptClickBehavior: 'open',
  importExport: {
    includeNotes: true,
    includeFavorites: true,
    prettyPrintJson: true,
  },
  optimization: {
    provider: 'mock',
    model: '',
    apiEndpoint: '',
    apiKey: '',
    defaultGoal: 'general',
  },
};
