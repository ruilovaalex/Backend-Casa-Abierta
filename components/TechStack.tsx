
import React from 'react';
import { Code2, Terminal, Cpu, Database, Cloud, Layers } from 'lucide-react';
import { TechLanguage } from '../types';

const languages: TechLanguage[] = [
  {
    name: "Python",
    role: "Inteligencia y Datos",
    description: "Favorito para Inteligencia Artificial y Ciencia de Datos. Su sintaxis limpia lo hace ideal para lógica compleja.",
    color: "bg-blue-600"
  },
  {
    name: "Node.js (JS)",
    role: "Tiempo Real y Escalabilidad",
    description: "Permite usar JavaScript en el servidor. Excelente para aplicaciones de chat y streaming por su velocidad.",
    color: "bg-green-600"
  },
  {
    name: "Go (Golang)",
    role: "Alto Rendimiento",
    description: "Creado por Google. Es extremadamente rápido y eficiente manejando miles de tareas simultáneas.",
    color: "bg-sky-500"
  },
  {
    name: "Java",
    role: "Sistemas Corporativos",
    description: "La base de los grandes bancos y aplicaciones empresariales. Robusto, seguro y de tipado fuerte.",
    color: "bg-orange-600"
  }
];

interface Props {
  isDark?: boolean;
}

const TechStack: React.FC<Props> = ({ isDark = false }) => {
  return (
    <>
      {languages.map((lang) => (
        <div key={lang.name} className={`group ${isDark ? 'bg-slate-900/50' : 'bg-white'} p-8 rounded-[2.5rem] shadow-2xl border border-white/5 hover:border-indigo-500/50 hover:-translate-y-3 transition-all duration-500 flex flex-col h-full`}>
          <div className={`w-16 h-16 ${lang.color} rounded-2xl mb-8 flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform`}>
            <Code2 size={32} />
          </div>
          <h3 className="font-black text-3xl mb-2 text-white">{lang.name}</h3>
          <p className="text-indigo-400 text-sm font-black uppercase tracking-widest mb-6">{lang.role}</p>
          <p className="text-slate-400 text-lg leading-relaxed">{lang.description}</p>
          <div className="mt-auto pt-8 flex gap-2">
             <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-indigo-500 transition-colors"></div>
             <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-indigo-500 transition-colors delay-75"></div>
             <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-indigo-500 transition-colors delay-150"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TechStack;
