"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Loader2 } from "lucide-react";

// Animações
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" as const },
  },
};

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Otimização de Performance: Pré-carrega o dashboard em background
  // Isso garante que a transição pós-login seja instantânea (0ms)
  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Senha incorreta.");
        setPassword("");
        inputRef.current?.focus();
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#030303] text-white selection:bg-white/30 selection:text-white">
      
      {/* Noise Overlay Global */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* =========================================
          ESQUERDA: AÇÃO (FORMULÁRIO)
          ========================================= */}
      <div className="relative z-10 flex w-full flex-col justify-center px-6 py-12 lg:w-[45%] xl:w-[40%] lg:px-16 lg:border-r border-white/5 bg-black/40 backdrop-blur-3xl shadow-[20px_0_100px_rgba(0,0,0,0.5)]">
        
        {/* Glow sutil atrás do formulário */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-primary/10 blur-[120px] rounded-full opacity-50" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 mx-auto w-full max-w-sm flex flex-col"
        >
          {/* Header/Brand Section */}
          <motion.div variants={fadeUp} className="mb-16 flex flex-col items-start">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/[0.03] border border-white/10 p-1.5 backdrop-blur-md shadow-xl">
                <img
                  src="/se7e-logo-v2.png"
                  alt="SE7E Alumínio e Vidros"
                  className="h-full w-full object-contain"
                />
              </div>
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
                SE7E GO
              </h1>
            </div>
            <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-medium ml-1">
              Sistema Gerador de Orçamentos
            </p>
          </motion.div>

          {/* Form */}
          <motion.form variants={fadeUp} onSubmit={handleSubmit} className="w-full">
            <div className="mb-10 relative">
              <label
                htmlFor="password"
                className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50"
              >
                <Lock className="h-3 w-3" />
                Chave de Acesso
              </label>

              {/* Input Minimalista (Bottom-line apenas) */}
              <div className="relative">
                <input
                  ref={inputRef}
                  id="password"
                  type="password"
                  placeholder="Insira a senha mestra"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  required
                  autoFocus
                  className="peer w-full bg-transparent pb-3 text-lg text-white placeholder-white/15 outline-none transition-all focus:bg-transparent active:bg-transparent [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:transition-colors [&:-webkit-autofill]:duration-[5000s]"
                />
                
                {/* Linha base */}
                <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/10" />
                
                {/* Linha animada ao focar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focused ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 h-[1px] w-full bg-white origin-left"
                />
              </div>

              {/* Erro */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-6 left-0 text-[11px] text-red-400 font-medium"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading || !password}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex h-14 w-full items-center justify-between rounded-full bg-white px-6 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span>{loading ? "Autenticando..." : "Entrar no Sistema"}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform group-hover:bg-black/20">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </div>
            </motion.button>
          </motion.form>

          {/* Footer Form */}
          <motion.div variants={fadeIn} className="mt-auto pt-24 text-[9px] uppercase tracking-[0.3em] text-white/20">
            <p>Acesso Restrito &copy; 2026</p>
          </motion.div>
        </motion.div>
      </div>

      {/* =========================================
          DIREITA: VISUAL (BRANDING)
          ========================================= */}
      <div className="relative hidden w-full overflow-hidden bg-[#020202] lg:flex lg:w-[55%] xl:w-[60%] flex-col justify-center items-center">
        
        {/* Mesh Gradient Dinâmico usando CSS Radial Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute left-[-20%] top-[-10%] h-[70%] w-[70%] rounded-full bg-primary/20 blur-[150px] mix-blend-screen opacity-60" />
          <div className="absolute right-[-10%] top-[40%] h-[60%] w-[60%] rounded-full bg-[#102450]/40 blur-[150px] mix-blend-screen opacity-70" />
          <div className="absolute bottom-[-20%] left-[20%] h-[50%] w-[50%] rounded-full bg-primary/10 blur-[120px] mix-blend-screen opacity-50" />
        </div>

        {/* Linhas estruturais (Awwwards aesthetic) */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />

        {/* Tipografia Gigante "SE7E" vazada */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center justify-center w-full px-12 select-none"
        >
          <h2 
            className="text-[15vw] font-bold leading-none tracking-tighter text-transparent"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}
          >
            SE7E
          </h2>
          <p className="absolute bottom-[20%] text-[10px] font-medium uppercase tracking-[0.8em] text-white/40 text-center w-full max-w-lg leading-relaxed drop-shadow-md">
            Elevando o padrão em alumínio e vidros com design e precisão.
          </p>
        </motion.div>

        {/* Corner labels */}
        <div className="absolute top-8 right-12 z-10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/20 font-mono">SYS.VER.2.0</p>
        </div>
        <div className="absolute bottom-8 right-12 z-10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/20 font-mono flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500/50 animate-pulse" />
            Online
          </p>
        </div>

      </div>

    </div>
  );
}
