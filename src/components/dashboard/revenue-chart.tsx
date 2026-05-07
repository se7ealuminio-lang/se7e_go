"use client";

import { motion } from "framer-motion";

interface ChartData {
  name: string;
  value: number;
}

interface RevenueChartProps {
  data: ChartData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1000);

  return (
    <div className="flex h-[200px] items-end justify-between gap-2 pt-4">
      {data.map((item, index) => {
        const heightPercentage = (item.value / maxValue) * 100;

        return (
          <div key={item.name} className="flex h-full flex-1 flex-col items-center gap-2">
            <div className="relative w-full flex-1">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: `${Math.max(heightPercentage, 2)}%`, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className="absolute bottom-0 w-full rounded-t-sm bg-gradient-to-t from-primary/10 via-primary/40 to-primary/80 shadow-[0_0_20px_rgba(33,94,154,0.3)] border-t border-primary/50"
              />
            </div>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
