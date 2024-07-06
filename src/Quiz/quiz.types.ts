export type IQuiz = {
  title: string
  description?: string
  duration: number // Duration in minutes
  questions: {
    questionText: string
    options: { text: string; isCorrect: boolean }[]
  }[]
  createdAt?: Date
  updatedAt?: Date
}
