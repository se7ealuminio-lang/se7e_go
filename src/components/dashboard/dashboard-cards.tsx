"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  delay?: number;
}

export function DashboardCard({
  title,
  children,
  className,
  icon,
  delay = 0,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn("h-full", className)}
    >
      <Card className="relative overflow-hidden h-full border border-transparent dark:border-[0.5px] dark:border-white/10 dark:bg-white/[0.04] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-none backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:border-primary/30 dark:hover:bg-white/[0.06] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] group">
        {/* Glow sutil no canto inferior direito */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_bottom_right,rgba(33,94,154,0.15),transparent_50%)]" />
        
        <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground uppercase">
            {title}
          </CardTitle>
          {icon && <div className="text-primary/60">{icon}</div>}
        </CardHeader>
        <CardContent className="relative z-10">{children}</CardContent>
      </Card>
    </motion.div>
  );
}

export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[1fr]", className)}>
      {children}
    </div>
  );
}
