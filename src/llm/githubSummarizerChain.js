import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';

// Логируем ключ для отладки (не делайте так в продакшене!)
console.log('OPENAI_API_KEY (for debug):', process.env.OPENAI_API_KEY_LOCAL);

// 1. Схема для валидации результата
const outputSchema = z.object({
  summary: z.string(),
  cool_facts: z.array(z.string())
});

const parser = StructuredOutputParser.fromZodSchema(outputSchema);

// 2. Промпт
const prompt = PromptTemplate.fromTemplate(
  `Summarize this GitHub repository based on the README content provided below.\n\nREADME:\n{readmeContent}\n\n{format_instructions}`
);

// 3. LLM
const llm = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0.2,
  apiKey: process.env.OPENAI_API_KEY, // Next.js сам подхватит из .env.local/.env
});

// 4. Runnable pipeline
const githubSummarizerChain = RunnableSequence.from([
  {
    readmeContent: (input) => input.readmeContent,
    format_instructions: async () => parser.getFormatInstructions(),
  },
  prompt,
  llm,
  parser,
]);

export default githubSummarizerChain; 