import Groq from 'groq-sdk'
import OpenAI from 'openai'
import type { NextApiRequest, NextApiResponse } from 'next'

const generateSummary = (article: string): Promise<string> => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  })
  const openai = new OpenAI({
    apiKey: process.env.GPT4_API_KEY,
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
              "Please generate a summary from the given markdown text. When summarizing, please consider the following conditions:\n\n- The summary should be understandable even to those without specialized knowledge.\n- The summary should be output in Japanese.\n- The summary's character count must be between 180 and 200 characters (strictly adhere to this).\n- The summary should not be markdown style.",
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { article } = req.body

    const GPT4_API_KEY = process.env.GPT4_API_KEY
    // const GROQ_API_KEY = process.env.GROQ_API_KEY

    const summary = await generateSummary(article)

    res.status(200).json({ summary })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}