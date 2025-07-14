import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';

// Логируем ключ для отладки (не делайте так в продакшене!)
console.log('OPENAI_API_KEY (for debug):', process.env.OPENAI_API_KEY_LOCAL);

// 1. Схема для валидации результата
const outputSchema = z.object({
  purpose: z.string(),           // Назначение проекта
  features: z.array(z.string()), // Ключевые возможности
  tech_stack: z.array(z.string()), // Технологический стек
  usage: z.string(),             // Инструкция по использованию
  audience: z.string(),          // Целевая аудитория
  strengths: z.array(z.string()), // Преимущества
  limitations: z.array(z.string()), // Ограничения
});

const parser = StructuredOutputParser.fromZodSchema(outputSchema);

// 2. Промпт
const prompt = PromptTemplate.fromTemplate(
  `Проанализируй следующий README-файл GitHub-репозитория и составь краткое, структурированное резюме на русском языке.

В резюме укажи:

- Назначение проекта: что делает репозиторий и какую проблему решает?
- Ключевые возможности: основные функции или компоненты.
- Технологический стек: какие технологии, фреймворки или инструменты используются.
- Инструкция по использованию: как установить, настроить и запустить проект.
- Целевая аудитория: для кого предназначен проект (разработчики, исследователи, бизнес и т.д.).
- Преимущества и ограничения: сильные стороны или возможные недостатки, если они упомянуты.

Пожалуйста, оформи ответ чётко и профессионально, используй маркированные списки или короткие абзацы для удобства чтения.

README:
{readmeContent}

{format_instructions}`
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