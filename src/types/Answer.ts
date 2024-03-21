export interface Answer {
  id: string
  object: string
  created: number
  model: string
  choices: ChoicesEntity[]
  usage: Usage
  system_fingerprint?: null
}
export interface ChoicesEntity {
  index: number
  message: Message
  logprobs?: null
  finish_reason: string
}
export interface Message {
  role: string
  content: string
}
export interface Usage {
  prompt_tokens: number
  prompt_time: number
  completion_tokens: number
  completion_time: number
  total_tokens: number
  total_time: number
}
