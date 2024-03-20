import { Answer } from '@/types/Answer'
import OpenAI from 'openai'

export const generateSummary = (article: string): Promise<string> => {
  console.log(article)
  const Groq = require('groq-sdk')
  const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    dangerouslyAllowBrowser: true, // FIXME: 本番環境ではfalseにする
  })
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_GPT4_API_KEY,
    dangerouslyAllowBrowser: true, // FIXME: 本番環境ではfalseにする
  })

  return new Promise((resolve, reject) => {
    groq.chat.completions
      .create({
        messages: [
          {
            role: 'system',
            content:
              'Generate summary from the given markdown text.\n\nWhen generateing, please consider the following points:\n- The summary should be concise and easy to understand.\n- The summary should be written in Japanese.\n- The summary must be within 150 characters.\n- "character" contains not only Japanese latter but also English latter. For example, "A" is counted as 1 character.\n\nYou can refer to the example below.\nMarkdown: "セキュリティについて新ためて勉強を始めたので、学んだことをアウトプットしたいと思います。[...省略...]"',
          },
          {
            role: 'user',
            content: `${article}`,
          },
        ],
        // model: 'gpt-3.5-turbo-0125',
        model: 'mixtral-8x7b-32768',
      })
      .then((result: Answer) => {
        const summary = result.choices[0]?.message?.content || 'Failed to generate summary.'
        console.log(summary)
        resolve(summary)
      })
      .catch(() => {
        reject('Failed to generate summary due to an error.')
      })
  })
}
