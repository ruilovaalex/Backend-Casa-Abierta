
import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, 
  Code2, 
  ArrowLeft,
  BookOpen,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Database,
  ShieldCheck,
  Cpu,
  Zap,
  Utensils,
  ChefHat,
  Trophy
} from 'lucide-react';
import RequestFlowSimulator from './components/KitchenSimulator';
import TechStack from './components/TechStack';
import GameChallenge from './components/GameChallenge';
import LoginExample from './components/LoginExample';

type View = 'interactive' | 'learning';

const Reveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${isVisible ? 'reveal-visible' : ''}`}>
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('interactive');

  const goToLearning = () => {
    setView('learning');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToInteractive = () => {
    setView('interactive');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30">
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={goToInteractive}>
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-600/20">
              <Server size={20} className="text-white" />
            </div>
            <span className="brand-title text-xl text-white tracking-tighter">BACKEND<span className="text-indigo-500">CORE</span></span>
          </div>
          
          {view === 'interactive' ? (
            <button 
              onClick={goToLearning}
              className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10 transition-all text-sm font-bold text-white"
            >
              <BookOpen size={18} className="text-indigo-400" />
              CENTRO DE APRENDIZAJE
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button 
              onClick={goToInteractive}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-full shadow-xl shadow-indigo-600/20 transition-all text-sm font-bold text-white"
            >
              <ArrowLeft size={18} />
              VOLVER AL DESAFÍO
            </button>
          )}
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        {view === 'interactive' ? (
          <div className="max-w-6xl mx-auto space-y-24">
            <header className="text-center space-y-8 py-12">
              <Reveal>
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-indigo-400 text-xs font-black tracking-widest uppercase animate-fade-in">
                  <Trophy size={14} />
                  Arena de Desafío 2025
                </div>
              </Reveal>
              <Reveal delay={100}>
                <h1 className="serif text-6xl md:text-9xl text-white leading-none tracking-tighter">
                  Backend <span className="text-indigo-500 italic">Arena.</span>
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed italic">
                  Pon a prueba tus conocimientos sobre la arquitectura invisible de la web. Compite por el podio de honor.
                </p>
              </Reveal>
            </header>

            <section id="challenge" className="scroll-mt-32">
              <Reveal delay={150}>
                <GameChallenge isEmbedded={true} />
              </Reveal>
            </section>

            <Reveal>
              <section className="bg-indigo-600 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden group shadow-[0_0_80px_rgba(79,70,229,0.2)]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.2),transparent)]"></div>
                <h2 className="serif text-5xl md:text-7xl text-white mb-8 relative z-10">¿Quieres dominar la teoría?</h2>
                <p className="text-indigo-100 text-xl md:text-2xl mb-12 max-w-3xl mx-auto relative z-10 opacity-90 leading-relaxed font-medium">
                  Explora nuestra guía completa sobre arquitectura, flujo de datos y lenguajes de servidor explicada de forma sencilla.
                </p>
                <button 
                  onClick={goToLearning}
                  className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl relative z-10 inline-flex items-center gap-3"
                >
                  IR AL CENTRO DE APRENDIZAJE
                  <ArrowRight size={20} />
                </button>
              </section>
            </Reveal>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto animate-fade-in space-y-32">
            <header className="py-12 border-b border-white/5 text-center">
              <Reveal>
                <h1 className="serif text-6xl md:text-8xl text-white mb-6">Guía <span className="text-indigo-500 italic">Maestra</span></h1>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">Conceptos fundamentales para convertirte en un arquitecto de software.</p>
              </Reveal>
            </header>

            <section className="space-y-16">
              <Reveal>
                <div className="text-center space-y-4 mb-16">
                  <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">¿Qué es realmente el Backend?</h2>
                  <p className="text-slate-400 text-lg max-w-4xl mx-auto leading-relaxed">
                    El Backend es el <span className="text-white font-bold">cerebro invisible</span> detrás de cada aplicación. Mientras el Frontend se encarga de que todo se vea bien, el Backend se asegura de que todo funcione correctamente, sea seguro y los datos se guarden para siempre.
                  </p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Reveal delay={0}>
                  <div className="bg-[#0a0f1e] p-10 rounded-[2.5rem] border border-white/5 h-full flex flex-col items-center text-center shadow-xl hover:border-indigo-500/30 transition-colors">
                    <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-6">
                      <Cpu size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tighter">1. El Motor (Lógica)</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Es el código que toma decisiones. Por ejemplo: "¿Esta contraseña es correcta?" o "¿Tiene este usuario dinero suficiente?".
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={150}>
                  <div className="bg-[#0a0f1e] p-10 rounded-[2.5rem] border border-white/5 h-full flex flex-col items-center text-center shadow-xl hover:border-green-500/30 transition-colors">
                    <div className="w-16 h-16 bg-green-600/20 rounded-2xl flex items-center justify-center text-green-400 mb-6">
                      <Database size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tighter">2. La Memoria (DB)</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Donde se guardan tus fotos y perfil. Sin el Backend, al cerrar la aplicación todo se borraría para siempre.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={300}>
                  <div className="bg-[#0a0f1e] p-10 rounded-[2.5rem] border border-white/5 h-full flex flex-col items-center text-center shadow-xl hover:border-red-500/30 transition-colors">
                    <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center text-red-400 mb-6">
                      <ShieldCheck size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tighter">3. El Guardián</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Protege tus datos. Evita que extraños entren a tu cuenta o que se robe información privada de la empresa.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Caso Real Login - Movido al centro de aprendizaje */}
              <Reveal>
                <section id="login-demo" className="scroll-mt-32 pt-16">
                  <div className="flex flex-col items-center mb-12 text-center">
                    <h2 className="text-4xl font-black text-white mb-4 uppercase italic border-b-2 border-indigo-500 pb-2 tracking-tighter">Caso Real: El Proceso de Login</h2>
                    <p className="text-slate-400 max-w-2xl text-lg font-medium italic">Observa cómo interactúan el cliente (Frontend) y el servidor (Backend) en tiempo real.</p>
                  </div>
                  <LoginExample />
                </section>
              </Reveal>
            </section>

            <section className="space-y-16">
              <Reveal>
                <div className="flex flex-col items-center text-center space-y-4">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter border-l-4 border-amber-500 pl-6 italic">Entendiéndolo con una Analogía</h2>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Reveal delay={0}>
                  <div className="bg-slate-900/50 p-10 rounded-[2.5rem] border border-white/5 h-full">
                    <Utensils className="text-blue-500 mb-6" size={40} />
                    <h3 className="text-2xl font-bold text-white mb-4 italic">El Comedor</h3>
                    <p className="text-slate-400 leading-relaxed">El Frontend. Donde el cliente interactúa, ve el diseño y elige sus opciones favoritas.</p>
                  </div>
                </Reveal>
                <Reveal delay={150}>
                  <div className="bg-indigo-600/10 p-10 rounded-[2.5rem] border border-indigo-500/20 h-full shadow-lg">
                    <Zap className="text-indigo-400 mb-6" size={40} />
                    <h3 className="text-2xl font-bold text-white mb-4 italic">El Mesero</h3>
                    <p className="text-slate-200 leading-relaxed font-medium">La API. Transporta las peticiones del comedor a la cocina y trae los resultados rápidamente.</p>
                  </div>
                </Reveal>
                <Reveal delay={300}>
                  <div className="bg-slate-900/50 p-10 rounded-[2.5rem] border border-white/5 h-full">
                    <ChefHat className="text-red-500 mb-6" size={40} />
                    <h3 className="text-2xl font-bold text-white mb-4 italic">La Cocina</h3>
                    <p className="text-slate-400 leading-relaxed">El Backend. Se procesan los ingredientes (datos) bajo reglas estrictas (lógica del negocio).</p>
                  </div>
                </Reveal>
              </div>
            </section>

            <section className="space-y-12">
              <Reveal>
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg"><Code2 size={24} /></div>
                  <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Ciclo de una Petición Interactivo</h2>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <RequestFlowSimulator />
              </Reveal>
            </section>

            <section className="space-y-12 pb-20">
              <Reveal>
                <div className="flex flex-col items-center text-center space-y-4 mb-12">
                  <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Herramientas del Arquitecto Backend</h2>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <TechStack isDark={true} />
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="w-full border-t border-white/5 py-12 px-6 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Server size={20} className="text-indigo-500" />
            <span className="brand-title text-lg text-white">BACKEND<span className="text-indigo-500">CORE</span></span>
          </div>
          <p className="text-slate-500 text-sm font-bold tracking-widest uppercase italic">Casa Abierta 2025 • Alexander • Pablo • Jessica</p>
          <div className="w-24 h-1 bg-white/5 rounded-full"></div>
        </div>
      </footer>
    </div>
  );
};

export default App;
