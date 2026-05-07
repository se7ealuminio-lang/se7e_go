"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  FileText,
  Send,
  ThumbsUp,
  ThumbsDown,
  CircleCheckBig,
  ArrowUpRight,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoGrid } from "@/components/dashboard/dashboard-cards";
import { DashboardCard } from "@/components/dashboard/dashboard-cards";
import { QuickNotes } from "@/components/dashboard/quick-notes";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { RecentQuotes } from "@/components/dashboard/recent-quotes";
import { formatCurrency } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardData {
  metrics: {
    monthlyRevenue: number;
    revenueGrowth: number;
    pendingCount: number;
    draftCount: number;
    sentCount: number;
    approvedCount: number;
    rejectedCount: number;
    completedCount: number;
    totalCount: number;
  };
  recentApproved: {
    id: number;
    quoteNumber: string;
    clientName: string;
    total: number;
    date: string;
  }[];
  chartData: {
    name: string;
    value: number;
  }[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[250px] md:col-span-2" />
          <Skeleton className="h-[250px]" />
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px] md:col-span-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 noise-overlay">
      {/* Header com Boas-vindas */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-foreground">Olá, ADM!</h1>
          <p className="text-muted-foreground mt-1 text-sm tracking-wide">
            O SE7E GO está pronto para fechar novos negócios hoje.
          </p>
        </div>
        <Button 
          onClick={() => router.push("/novo")}
          className="group h-12 px-6 gap-2 bg-gradient-to-r from-primary via-[#215E9A] to-[#458BCE] hover:shadow-[0_0_20px_rgba(33,94,154,0.4)] transition-all active:scale-95 text-white border-none"
        >
          <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          <span className="font-semibold">Novo Orçamento</span>
        </Button>
      </motion.div>

      <BentoGrid>
        {/* Card 1: Faturamento Mensal (Destaque) */}
        <DashboardCard 
          title="Faturamento do Mês" 
          className="md:col-span-2"
          icon={<TrendingUp className="h-4 w-4" />}
          delay={0.1}
        >
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black tracking-tighter text-foreground dark:text-primary">
                  {formatCurrency(data?.metrics.monthlyRevenue || 0)}
                </span>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Aprovados
                </span>
              </div>
              
              {data && data.metrics.revenueGrowth !== 0 && (
                <p className={
                  "text-[10px] font-medium w-fit px-2 py-0.5 rounded-full border mt-1 uppercase tracking-wider " +
                  (data.metrics.revenueGrowth > 0 
                    ? "text-emerald-400/80 bg-emerald-400/10 border-emerald-400/20" 
                    : "text-red-400/80 bg-red-400/10 border-red-400/20")
                }>
                  {data.metrics.revenueGrowth > 0 ? "+" : ""}
                  {data.metrics.revenueGrowth.toFixed(1).replace(".", ",")}% que o mês passado
                </p>
              )}
            </div>
            <RevenueChart data={data?.chartData || []} />
          </div>
        </DashboardCard>

        {/* Card 2: Visão Geral dos Status */}
        <DashboardCard 
          title="Visão Geral" 
          icon={<BarChart3 className="h-4 w-4" />}
          delay={0.2}
        >
          <div className="flex flex-col h-full justify-between py-1">
            <div className="space-y-3">
              {/* Rascunhos */}
              <div className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors cursor-default border border-transparent dark:hover:border-white/5">
                <div className="flex gap-3 items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/50 dark:border-white/5 bg-slate-100 dark:bg-black/40 text-slate-500 dark:text-muted-foreground group-hover:text-foreground transition-colors">
                    <FileText className="h-4 w-4 stroke-[1.5]" />
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-muted-foreground group-hover:text-foreground transition-colors">Rascunhos</span>
                </div>
                <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 px-2 text-xs font-black text-slate-700 dark:text-foreground group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">{data?.metrics.draftCount ?? 0}</span>
              </div>

              {/* Enviados */}
              <div className="group flex items-center justify-between p-2 rounded-xl hover:bg-blue-50/50 dark:hover:bg-white/[0.03] transition-colors cursor-default border border-transparent dark:hover:border-white/5">
                <div className="flex gap-3 items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 dark:border-white/5 bg-blue-50 dark:bg-black/40 text-blue-500 dark:text-primary/60 group-hover:text-blue-600 dark:group-hover:text-primary transition-colors">
                    <Send className="h-4 w-4 stroke-[1.5]" />
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-muted-foreground group-hover:text-foreground transition-colors">Enviados</span>
                </div>
                <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-blue-50 dark:bg-white/5 px-2 text-xs font-black text-blue-700 dark:text-foreground group-hover:bg-blue-100 group-hover:text-blue-700 dark:group-hover:bg-primary/20 dark:group-hover:text-primary transition-colors">{data?.metrics.sentCount ?? 0}</span>
              </div>

              {/* Aprovados */}
              <div className="group flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/50 dark:hover:bg-white/[0.03] transition-colors cursor-default border border-transparent dark:hover:border-white/5">
                <div className="flex gap-3 items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-100 dark:border-emerald-500/10 bg-emerald-50 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-500/60 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/10 transition-colors">
                    <ThumbsUp className="h-4 w-4 stroke-[1.5]" />
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-muted-foreground group-hover:text-foreground transition-colors">Aprovados</span>
                </div>
                <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-emerald-50 dark:bg-white/5 px-2 text-xs font-black text-emerald-700 dark:text-foreground group-hover:bg-emerald-100 group-hover:text-emerald-700 dark:group-hover:bg-emerald-500/20 dark:group-hover:text-emerald-400 transition-colors">{data?.metrics.approvedCount ?? 0}</span>
              </div>

              {/* Recusados */}
              <div className="group flex items-center justify-between p-2 rounded-xl hover:bg-rose-50/50 dark:hover:bg-white/[0.03] transition-colors cursor-default border border-transparent dark:hover:border-white/5">
                <div className="flex gap-3 items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-100 dark:border-red-500/10 bg-rose-50 dark:bg-red-500/5 text-rose-500 dark:text-red-500/60 group-hover:text-rose-600 dark:group-hover:text-red-400 group-hover:bg-rose-100 dark:group-hover:bg-red-500/10 transition-colors">
                    <ThumbsDown className="h-4 w-4 stroke-[1.5]" />
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-muted-foreground group-hover:text-foreground transition-colors">Recusados</span>
                </div>
                <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-rose-50 dark:bg-white/5 px-2 text-xs font-black text-rose-700 dark:text-foreground group-hover:bg-rose-100 group-hover:text-rose-700 dark:group-hover:bg-red-500/20 dark:group-hover:text-red-400 transition-colors">{data?.metrics.rejectedCount ?? 0}</span>
              </div>

              {/* Concluídos */}
              <div className="group flex items-center justify-between p-2 rounded-xl hover:bg-indigo-50/50 dark:hover:bg-white/[0.03] transition-colors cursor-default border border-transparent dark:hover:border-white/5">
                <div className="flex gap-3 items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-100 dark:border-blue-500/10 bg-indigo-50 dark:bg-blue-500/5 text-indigo-500 dark:text-blue-500/60 group-hover:text-indigo-600 dark:group-hover:text-blue-400 group-hover:bg-indigo-100 dark:group-hover:bg-blue-500/10 transition-colors">
                    <CircleCheckBig className="h-4 w-4 stroke-[1.5]" />
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-muted-foreground group-hover:text-foreground transition-colors">Concluídos</span>
                </div>
                <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-indigo-50 dark:bg-white/5 px-2 text-xs font-black text-indigo-700 dark:text-foreground group-hover:bg-indigo-100 group-hover:text-indigo-700 dark:group-hover:bg-blue-500/20 dark:group-hover:text-blue-400 transition-colors">{data?.metrics.completedCount ?? 0}</span>
              </div>
            </div>

            <div className="mt-4 border-t border-border/50 pt-3 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Total: <span className="font-bold text-foreground">{data?.metrics.totalCount ?? 0}</span> orçamentos
              </p>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => router.push("/orcamentos")}>
                Ver todos <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </DashboardCard>

        {/* Card 3: Sucessos Recentes */}
        <div className="md:col-span-2">
          <DashboardCard 
            title="Sucessos Recentes" 
            icon={<CheckCircle2 className="h-4 w-4" />}
            delay={0.2}
          >
            <RecentQuotes quotes={data?.recentApproved || []} />
            <div className="mt-6 flex justify-center">
              <Button 
                variant="outline" 
                className="w-full max-w-xs text-xs uppercase tracking-widest font-bold border-primary/20 hover:bg-primary/5"
                onClick={() => router.push("/orcamentos")}
              >
                Ver todos os orçamentos
              </Button>
            </div>
          </DashboardCard>
        </div>

        {/* Card 4: Anotações Rápidas */}
        <div className="md:col-span-1">
          <QuickNotes />
        </div>
      </BentoGrid>
    </div>
  );
}
