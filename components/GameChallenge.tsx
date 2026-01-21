
import React, { useState } from 'react';
import { Trophy, CheckCircle2, XCircle, RefreshCw, Zap } from 'lucide-react';
import { GameScenario } from '../types';

const scenarios: GameScenario[] = [
  {
    id: 1,
    task: "Definir cómo se verá el menú desplegable en un celular.",
    correct: 'frontend',
    explanation: "El diseño visual y la adaptabilidad (Responsive) son tareas del Frontend."
  },
  {
    id: 2,
    task: "Almacenar los nombres y contraseñas de 1000 usuarios nuevos.",
    correct: 'backend',
    explanation: "El manejo de datos y su almacenamiento permanente es responsabilidad del Backend."
  },
  {
    id: 3,
    task: "Enviar un correo automático de 'Bienvenida' cuando alguien se registra.",
    correct: 'backend',
    explanation: "Las acciones automáticas del servidor ocurren en el Backend."
  },
  {
    id: 4,
    task: "Hacer que un botón cambie de color cuando pasas el mouse por encima.",
    correct: 'frontend',
    explanation: "Las interacciones visuales inmediatas se programan en el Frontend."
  },
  {
    id: 5,
    task: "Consultar el saldo de una cuenta bancaria de forma segura.",
    correct: 'backend',
    explanation: "La seguridad financiera y la consulta a la base de datos es puro Backend."
  }
];

interface Props {
  isEmbedded?: boolean;
}

const GameChallenge: React.FC<Props> = ({ isEmbedded = false }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (choice: 'frontend' | 'backend') => {
    const isCorrect = choice === scenarios[currentIdx].correct;
    setShowResult(isCorrect);
    if (isCorrect) setScore(s => s + 10);

    setTimeout(() => {
      if (currentIdx < scenarios.length - 1) {
        setCurrentIdx(c => c + 1);
        setShowResult(null);
      } else {
        setFinished(true);
      }
    }, 2000);
  };

  const restart = () => {
    setCurrentIdx(0);
    setScore(0);
    setFinished(false);
    setShowResult(null);
  };

  return (
    <div className="w-full text-left">
      {finished ? (
        <div className="py-12 text-center animate-fadeIn">
          <Trophy size={100} className="mx-auto mb-6 text-yellow-500 animate-bounce" />
          <h3 className="text-5xl font-black text-white mb-4">¡Reto Completado!</h3>
          <p className="text-3xl text-slate-400 mb-10">Puntuación Final: <span className="text-indigo-400 font-black">{score} puntos</span></p>
          <button onClick={restart} className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-2xl hover:bg-indigo-500 transition-all flex items-center gap-4 mx-auto shadow-2xl">
            <RefreshCw size={28} /> REINTENTAR JUEGO
          </button>
        </div>
      ) : (
        <div className="animate-fadeIn">
          <div className="flex justify-between items-center mb-12">
            <span className="bg-amber-500/20 text-amber-400 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-amber-500/30">
              Tarea {currentIdx + 1} de {scenarios.length}
            </span>
            <div className="flex items-center gap-3 text-indigo-400 font-black text-xl">
              <Zap size={24} fill="currentColor" /> {score} PTS
            </div>
          </div>

          <div className="min-h-[150px] flex items-center justify-center mb-12">
            <h4 className="text-3xl md:text-5xl font-bold text-white text-center leading-tight">
              "{scenarios[currentIdx].task}"
            </h4>
          </div>

          {showResult === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button onClick={() => handleAnswer('frontend')} className="py-8 rounded-3xl bg-amber-500 text-white font-black text-3xl hover:bg-amber-600 shadow-xl active:scale-95 transition-all">FRONTEND</button>
              <button onClick={() => handleAnswer('backend')} className="py-8 rounded-3xl bg-indigo-600 text-white font-black text-3xl hover:bg-indigo-700 shadow-xl active:scale-95 transition-all">BACKEND</button>
            </div>
          ) : (
            <div className={`p-10 rounded-3xl flex flex-col items-center gap-4 animate-slideUp border-4 ${showResult ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
              <div className="flex items-center gap-3 font-black text-3xl">
                {showResult ? <CheckCircle2 size={40} /> : <XCircle size={40} />}
                {showResult ? '¡CORRECTO!' : 'INCORRECTO'}
              </div>
              <p className="text-xl text-center leading-relaxed font-medium text-slate-300 max-w-xl">{scenarios[currentIdx].explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameChallenge;
