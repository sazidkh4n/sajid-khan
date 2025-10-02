"use client"

import { Clock, Briefcase, Zap } from "lucide-react"

export function AvailabilityBadge() {
  return (
    <div className="fixed bottom-6 left-6 z-50 hidden md:block">
      <div className="glass-panel glow-border group rounded-2xl p-4 transition-all hover:scale-105">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
          <span className="font-mono text-sm font-bold text-primary">Available for Work</span>
        </div>
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Briefcase className="h-3 w-3" />
            <span>Freelance & Contract</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>Response: 24 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3" />
            <span>Full-stack & Mobile</span>
          </div>
        </div>
      </div>
    </div>
  )
}
