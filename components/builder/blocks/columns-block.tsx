"use client"

import { cn } from "@/lib/utils"

interface ColumnsBlockProps {
  columns?: number
  gap?: "small" | "medium" | "large"
  content?: Array<{ type: string; content: string }>
}

export function ColumnsBlock({ columns = 2, gap = "medium", content = [] }: ColumnsBlockProps) {
  const gapClasses = {
    small: "gap-4",
    medium: "gap-6",
    large: "gap-8",
  }

  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <section className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div
          className={cn("grid", columnClasses[columns as keyof typeof columnClasses] || "grid-cols-2", gapClasses[gap])}
        >
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display font-semibold text-card-foreground mb-3">
                  {content[index]?.content || `Column ${index + 1}`}
                </h3>
                <p className="text-muted-foreground">
                  Add your content here. This is a flexible column layout that adapts to different screen sizes.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
