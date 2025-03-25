import { Card } from "@/components/ui/card"

export default function LoadingCard({ height }) {
  return (
    <Card className={`animate-pulse bg-muted`} style={{ height }}>
      <div className="h-full w-full flex items-center justify-center">
        <svg
          className="w-10 h-10 text-muted-foreground"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
      </div>
    </Card>
  )
}

