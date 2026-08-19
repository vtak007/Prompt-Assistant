export const OPTIMIZATION_GOALS = [
  { id: 'general', label: 'General Improvement' },
  { id: 'clarity', label: 'Clarity' },
  { id: 'detailed', label: 'More Detailed' },
  { id: 'concise', label: 'More Concise' },
  { id: 'reasoning', label: 'Better Reasoning' },
  { id: 'coding', label: 'Coding' },
  { id: 'research', label: 'Research' },
  { id: 'writing', label: 'Writing' },
  { id: 'brainstorming', label: 'Brainstorming' },
  { id: 'data-analysis', label: 'Data Analysis' },
  { id: 'image-generation', label: 'Image Generation' },
  { id: 'custom', label: 'Custom' },
];

const GOAL_ROLE = {
  general: 'a knowledgeable, helpful assistant',
  clarity: 'an assistant focused on precise, unambiguous communication',
  detailed: 'a thorough subject-matter expert',
  concise: 'an assistant that values brevity and directness',
  reasoning: 'an assistant that reasons step by step before answering',
  coding: 'an expert software engineer',
  research: 'a meticulous research analyst',
  writing: 'a skilled professional writer and editor',
  brainstorming: 'a creative ideation partner',
  'data-analysis': 'a data analyst who explains findings clearly',
  'image-generation': 'an expert at writing image-generation prompts',
  custom: 'a helpful assistant',
};

async function mockProvider({ prompt, goal, instructions }) {
  const role = GOAL_ROLE[goal] || GOAL_ROLE.general;
  const trimmedPrompt = prompt.trim();
  const parts = [
    `You are ${role}.`,
    '',
    trimmedPrompt,
    '',
    'Please respond with:',
    '- Clear structure and headings where useful',
    '- Specific, actionable detail rather than generalities',
    '- Any assumptions you make stated explicitly',
  ];
  if (instructions && instructions.trim()) {
    parts.push('', `Additional instructions: ${instructions.trim()}`);
  }
  parts.push('', 'Desired output format: match the format implied above, or ask a clarifying question if it is ambiguous.');
  return parts.join('\n');
}

const PROVIDERS = {
  mock: mockProvider,
};

export async function optimizePrompt({ prompt, goal = 'general', instructions = '', provider = 'mock', model }) {
  const impl = PROVIDERS[provider] || PROVIDERS.mock;
  const optimized = await impl({ prompt, goal, instructions, model });
  return { optimized, provider, goal };
}
