import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="relative h-[600px] w-full rounded-xl overflow-hidden animate-pulse bg-muted">
        <div className="absolute bottom-0 p-8 w-full space-y-4">
          <div className="h-4 w-20 bg-muted-foreground/20 rounded" />
          <div className="h-8 w-2/3 bg-muted-foreground/20 rounded" />
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-muted-foreground/20" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted-foreground/20 rounded" />
              <div className="h-3 w-24 bg-muted-foreground/20 rounded" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

