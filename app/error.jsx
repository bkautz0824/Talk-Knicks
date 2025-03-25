"use client"

import { Card } from "@/components/ui/card"

export default function Error({ error, reset }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
        <p className="text-muted-foreground mb-4">{error.message}</p>
        <button
          onClick={() => reset()}
          className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      </Card>
    </div>
  )
}

