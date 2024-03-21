import Groq from 'groq-sdk'
import OpenAI from 'openai'

export const generateSummary = (article: string): Promise<string> => {
  const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  })
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_GPT4_API_KEY,
    dangerouslyAllowBrowser: true, // FIXME: 本番環境ではfalseにする
  })

  const LLMs = {
    GLOQ: {
      instance: groq,
      model: 'mixtral-8x7b-32768',
    },
    OPENAI: {
      instance: openai,
      model: 'gpt-3.5-turbo-0125',
    },
  }

  return new Promise((resolve, reject) => {
    LLMs.OPENAI.instance.chat.completions
      .create({
        messages: [
          {
            role: 'system',
            content:
              'Please generate a summary from the given markdown text. When summarizing, please consider the following conditions:\n\n- The summary should be understandable even to those without specialized knowledge.\n- The summary should be output in Japanese.\n- The summary\'s character count must be between 180 and 200 characters (strictly adhere to this).\n- The summary should not be markdown style.',
          },
          {
            role: 'user',
            content: `${article}`,
          },
        ],
        model: LLMs.OPENAI.model,
      })
      .then((result) => {
        const summary = result.choices[0]?.message?.content || 'Failed to generate summary.'
        resolve(summary)
      })
      .catch(() => {
        reject('Failed to generate summary due to an error.')
      })
  })
}
