import type { ReactNode } from "react"

interface QuestionSectionProps {
  title: string
  children: ReactNode
}

export default function QuestionSection({ title, children }: QuestionSectionProps) {
  return (
    <div className="mb-16">
      <h3 className="text-center text-xl font-bold mb-8">{title}</h3>
      <div className="space-y-4 max-w-2xl mx-auto">{children}</div>
    </div>
  )
}
