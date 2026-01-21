
import React from 'react';
import { 
  Server, 
  Monitor, 
  Code2, 
  Gamepad2, 
  ArrowDown,
  Users,
  Zap,
  Cpu,
  ChefHat,
  Utensils,
  Clock,
  ShieldCheck,
  Lock
} from 'lucide-react';
import RequestFlowSimulator from './components/KitchenSimulator';
import TechStack from './components/TechStack';
import GameChallenge from './components/GameChallenge';
import LoginExample from './components/LoginExample';

const Section: React.FC<{ children: React.ReactNode, className?: string, id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={`min-h-screen w-full flex flex-col justify-center items-center py-24 px-6 md:px-20 ${className}`}>
    {children}
  </section>
);

const App: React.FC = () => {
  return (
    <div className="w-full relative">
      {/* Header Fijo */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Server size={24} className="text-indigo-500" />
          <span className="brand-title text-xl text-white">BACKEND<span className="brand-accent">EXPLORER</span></span>
        </div>
      </nav>

      {/* 1. PORTADA */}
      <Section id="inicio" className="text-center">
        <div className="bg-indigo-600 text-white p-8 rounded-[3rem] shadow-3xl shadow-indigo-500/20 mb-12 animate-bounce">
          <Server size={100} />
        </div>
        <h1 className="brand-title text-7xl md:text-[10rem] tracking-tighter leading-none text-white mb-6">
          BACKEND<span className="brand-accent">EXPLORER</span>
        </h1>
        <p className="text-2xl md:text-3xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed mb-16">
          Guía interactiva sobre el motor que procesa, protege y conecta el mundo digital.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-12">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
            <span className="block text-indigo-400 font-black text-sm uppercase tracking-widest mb-2">Expositor</span>
            <span className="text-xl font-bold text-white">Alexander Ruilova</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
            <span className="block text-indigo-400 font-black text-sm uppercase tracking-widest mb-2">Expositor</span>
            <span className="text-xl font-bold text-white">Pablo Ortega</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
            <span className="block text-indigo-400 font-black text-sm uppercase tracking-widest mb-2">Expositor</span>
            <span className="text-xl font-bold text-white">Jessica Ortiz</span>
          </div>
        </div>
        <div className="animate-pulse flex flex-col items-center gap-2 text-slate-500">
           <span className="text-xs font-black tracking-widest">SCROLL PARA EXPLORAR</span>
           <ArrowDown size={20} />
        </div>
      </Section>

      {/* 2. ANALOGÍA DEL RESTAURANTE */}
      <Section id="definicion" className="bg-slate-950/30">
        <h2 className="serif text-5xl md:text-8xl mb-12 text-center text-white">Entendiendo el <span className="text-indigo-500">Backend</span></h2>
        
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Comedor - Frontend */}
          <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/5 flex flex-col items-center text-center">
            <div className="bg-blue-600/20 p-6 rounded-3xl text-blue-400 mb-6"><Utensils size={48} /></div>
            <h3 className="text-2xl font-black text-white mb-4">El Comedor (Frontend)</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              Es el área donde se sientan los clientes. Es el diseño, las mesas, la decoración y el menú que tú puedes ver y tocar.
            </p>
          </div>

          {/* Mesero - API/Protocolo */}
          <div className="bg-indigo-600/20 p-10 rounded-[3rem] border border-indigo-500/20 flex flex-col items-center text-center relative">
            <div className="bg-indigo-600 p-6 rounded-3xl text-white mb-6 animate-pulse"><Zap size={48} /></div>
            <h3 className="text-2xl font-black text-white mb-4">El Mesero (Conexión)</h3>
            <p className="text-slate-200 leading-relaxed text-lg">
              Lleva tu pedido del comedor a la cocina y trae tu comida de vuelta. Sin él, la cocina y el cliente no pueden comunicarse.
            </p>
          </div>

          {/* Cocina - Backend */}
          <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/5 flex flex-col items-center text-center">
            <div className="bg-red-600/20 p-6 rounded-3xl text-red-400 mb-6"><ChefHat size={48} /></div>
            <h3 className="text-2xl font-black text-white mb-4">La Cocina (Backend)</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              Donde ocurre la magia. Los chefs (servidores) preparan los platos usando ingredientes (datos) según las recetas (lógica).
            </p>
          </div>
        </div>

        <div className="mt-16 bg-slate-900 border border-white/10 p-10 rounded-[4rem] max-w-4xl w-full shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Server size={120} />
          </div>
          <h4 className="text-2xl font-black text-indigo-400 mb-6 flex items-center gap-3 italic">
            <ShieldCheck /> Lo que el Backend hace por ti:
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl text-slate-300">
            <li className="flex items-start gap-4">
              <span className="bg-indigo-500 w-3 h-3 rounded-full mt-2 shrink-0"></span>
              <span><strong>Seguridad:</strong> Verifica que seas quien dices ser (Login).</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-indigo-500 w-3 h-3 rounded-full mt-2 shrink-0"></span>
              <span><strong>Almacenamiento:</strong> Guarda tus fotos, mensajes y progreso.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-indigo-500 w-3 h-3 rounded-full mt-2 shrink-0"></span>
              <span><strong>Lógica:</strong> Calcula precios, descuentos o rutas de GPS.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-indigo-500 w-3 h-3 rounded-full mt-2 shrink-0"></span>
              <span><strong>Integración:</strong> Conecta con bancos para procesar pagos.</span>
            </li>
          </ul>
        </div>
      </Section>

      {/* 3. FLUJO INTERACTIVO */}
      <Section id="flujo">
        <div className="text-center mb-16 max-w-3xl">
          <h2 className="serif text-5xl md:text-8xl mb-6 text-white">Flujo de Petición</h2>
          <p className="text-2xl text-slate-400">Observa en tiempo real cómo interactúan el cliente, el servidor y la base de datos.</p>
        </div>
        <div className="w-full max-w-6xl">
          <RequestFlowSimulator />
        </div>
      </Section>

      {/* 4. TECNOLOGÍAS */}
      <Section id="tecnologias" className="bg-slate-950/30">
        <h2 className="serif text-5xl md:text-8xl mb-20 text-center text-white">El Kit de Herramientas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
           <TechStack isDark={true} />
        </div>
      </Section>

      {/* 5. EJEMPLO PRÁCTICO: LOGIN (NUEVO) */}
      <Section id="login-demo" className="bg-indigo-950/10">
        <div className="text-center mb-16 max-w-4xl">
          <Lock size={80} className="text-indigo-500 mx-auto mb-6" />
          <h2 className="serif text-5xl md:text-8xl mb-6 text-white">Caso Real: <span className="text-indigo-500">El Login</span></h2>
          <p className="text-2xl text-slate-400">
            Mira la diferencia entre lo que el usuario ve (Frontend) y cómo el servidor (Backend Java) procesa la seguridad.
          </p>
        </div>
        <LoginExample />
      </Section>

      {/* 6. JUEGO */}
      <Section id="juego">
        <div className="text-center mb-16">
          <Gamepad2 size={80} className="text-indigo-500 mx-auto mb-6" />
          <h2 className="serif text-5xl md:text-8xl mb-4 text-white">¡Desafío Backend!</h2>
          <p className="text-2xl text-slate-400">¿Sabes distinguir qué parte de la app se encarga de cada tarea?</p>
        </div>
        <div className="w-full max-w-4xl bg-slate-900/50 p-12 rounded-[4rem] border border-white/5 shadow-inner">
           <GameChallenge isEmbedded={true} />
        </div>
      </Section>

      {/* FOOTER / CRÉDITOS */}
      <footer className="w-full bg-slate-950 py-32 px-10 border-t border-white/5 text-center">
        <h2 className="serif text-8xl md:text-[12rem] font-black text-white tracking-tighter mb-10">¡Gracias!</h2>
        <p className="text-3xl text-slate-500 font-bold mb-20 uppercase tracking-[0.2em]">Casa Abierta 2025 • Computación</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full max-w-6xl mx-auto mb-24">
          {[
            { name: 'Alexander Ruilova', icon: <Users /> },
            { name: 'Pablo Ortega', icon: <Cpu /> },
            { name: 'Jessica Ortiz', icon: <Zap /> }
          ].map((m, i) => (
            <div key={i} className="group">
              <div className="w-48 h-48 bg-slate-900 rounded-[4rem] mx-auto flex items-center justify-center text-indigo-500 border border-white/5 transition-all group-hover:bg-indigo-600 group-hover:text-white group-hover:-translate-y-4 shadow-xl">
                {React.cloneElement(m.icon as React.ReactElement<any>, { size: 80 })}
              </div>
              <h4 className="text-3xl font-black text-white mt-8 mb-2">{m.name}</h4>
              <p className="text-indigo-500 font-black uppercase tracking-widest text-xs">Expositor del Proyecto</p>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center gap-4 pt-10 border-t border-white/5 opacity-30">
          <Server size={20} />
          <span className="brand-title text-xl text-white">BACKEND<span className="brand-accent">EXPLORER</span></span>
        </div>
      </footer>
    </div>
  );
};

export default App;
