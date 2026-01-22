
import React, { useState, useMemo, useEffect } from 'react';
import { Trophy, CheckCircle2, XCircle, RefreshCw, Zap, Award, ShieldCheck, Ticket, User, Star, ChevronRight } from 'lucide-react';
import { GameScenario } from '../types';
import { soundService } from '../services/soundService';

const scenarios: GameScenario[] = [
  {
    id: 1,
    task: "Definir el color y tamaño de los botones principales.",
    correct: 'frontend',
    explanation: "El Frontend es el responsable de todo lo que el usuario ve y toca directamente. Usando CSS, la interfaz define la estética, los colores y la disposición visual para que la aplicación sea atractiva y fácil de usar."
  },
  {
    id: 2,
    task: "Transformar contraseñas en texto plano a 'Hashes' (códigos cifrados).",
    correct: 'backend',
    explanation: "La seguridad es el pilar del Backend. Nunca se debe cifrar información sensible en el navegador del usuario (Frontend) porque el código es visible. El servidor realiza este proceso en un entorno privado y seguro antes de guardar los datos."
  },
  {
    id: 3,
    task: "Detectar si el usuario está navegando desde un iPhone o un Android.",
    correct: 'frontend',
    explanation: "El Frontend tiene acceso inmediato a las propiedades del navegador (User Agent). Esto permite que la aplicación adapte el diseño al instante, mostrando una interfaz optimizada para móvil o computadora según el dispositivo detectado."
  },
  {
    id: 4,
    task: "Decidir si un pago con tarjeta de crédito es aprobado o rechazado.",
    correct: 'backend',
    explanation: "Esta es una 'Lógica de Negocio' crítica. Solo el Backend puede comunicarse de forma segura con pasarelas de pago externas y bancos. Si esta decisión se tomara en el Frontend, un usuario malintencionado podría manipular el código para auto-aprobarse el pago."
  },
  {
    id: 5,
    task: "Programar un 'Contador' que aumenta cada vez que haces clic en un botón.",
    correct: 'frontend',
    explanation: "La interactividad inmediata en la pantalla se maneja con JavaScript en el Frontend. Si el número no necesita guardarse para siempre en una base de datos, el navegador puede actualizar la interfaz al instante sin molestar al servidor."
  },
  {
    id: 6,
    task: "Enviar una respuesta '404 Not Found' cuando una página no existe.",
    correct: 'backend',
    explanation: "Cuando el navegador pide una URL, el Backend busca ese recurso en el servidor. Si el archivo o los datos no existen, es responsabilidad del servidor informar oficialmente al cliente mediante un 'Código de Estado HTTP' como el 404."
  },
  {
    id: 7,
    task: "Almacenar los archivos PDF que suben los usuarios a la nube.",
    correct: 'backend',
    explanation: "El Backend gestiona la 'Persistencia' y el almacenamiento. Mientras el Frontend proporciona el botón de 'Subir', el servidor es quien recibe el archivo, verifica que no sea un virus, lo renombra y lo guarda físicamente en un disco o servicio de nube."
  },
  {
    id: 8,
    task: "Validar que un correo electrónico tenga un símbolo '@' antes de enviarlo.",
    correct: 'frontend',
    explanation: "Hacer validaciones simples en el Frontend mejora la experiencia del usuario (UX). Al detectar errores de escritura al instante, evitamos que el usuario espere una respuesta del servidor para algo tan básico como un error de formato."
  },
  {
    id: 9,
    task: "Configurar las 'Variables de Entorno' para conectar con la Base de Datos.",
    correct: 'backend',
    explanation: "Las credenciales de acceso (usuario y contraseña) a la base de datos son secretos de estado. Estas configuraciones viven exclusivamente en el Backend para que ningún usuario externo pueda verlas ni acceder a la información privada del sistema."
  },
  {
    id: 10,
    task: "Controlar el acceso (CORS) para que solo apps autorizadas usen tus datos.",
    correct: 'backend',
    explanation: "CORS es una política de seguridad que el servidor impone. El Backend actúa como un portero que decide, basándose en reglas de origen, qué aplicaciones externas tienen permiso de consumir su API y cuáles deben ser bloqueadas por seguridad."
  }
];

type Difficulty = 'easy' | 'normal';
type GameState = 'setup' | 'playing' | 'finished';

interface Props {
  isEmbedded?: boolean;
}

const GameChallenge: React.FC<Props> = ({ isEmbedded = false }) => {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [userName, setUserName] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState<boolean | null>(null);

  const activeScenarios = useMemo(() => {
    return difficulty === 'easy' ? scenarios.slice(0, 5) : scenarios;
  }, [difficulty]);

  const prize = useMemo(() => {
    return difficulty === 'easy' ? 'CARAMELOS' : 'CHUPETE';
  }, [difficulty]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      soundService.playStart();
      setGameState('playing');
    }
  };

  const handleAnswer = (choice: 'frontend' | 'backend') => {
    const isCorrect = choice === activeScenarios[currentIdx].correct;
    setShowResult(isCorrect);
    
    if (isCorrect) {
      soundService.playCorrect();
      setScore(s => s + 1);
    } else {
      soundService.playIncorrect();
    }

    setTimeout(() => {
      if (currentIdx < activeScenarios.length - 1) {
        setCurrentIdx(c => c + 1);
        setShowResult(null);
      } else {
        setGameState('finished');
      }
    }, 1200);
  };

  useEffect(() => {
    if (gameState === 'finished' && score === activeScenarios.length) {
      soundService.playFanfare();
    }
  }, [gameState, score, activeScenarios.length]);

  const restart = () => {
    soundService.playClick();
    setCurrentIdx(0);
    setScore(0);
    setGameState('setup');
    setShowResult(null);
  };

  const isPerfectScore = score === activeScenarios.length;

  if (gameState === 'setup') {
    return (
      <div className="max-w-xl mx-auto animate-fade-in py-12">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/20">
            <User size={40} className="text-white" />
          </div>
          <h3 className="text-4xl font-black text-white mb-2 italic">REGISTRO DE ASPIRANTE</h3>
          <p className="text-slate-400">Ingresa tus datos para empezar el desafío de la Casa Abierta.</p>
        </div>

        <form onSubmit={handleStart} className="space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-2">Tu Nombre Completo</label>
            <input 
              required
              type="text" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder=""
              className="w-full bg-slate-950 border border-white/10 rounded-2xl py-5 px-6 text-xl text-white focus:border-indigo-500 outline-none transition-all shadow-inner"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-2">Elige tu Desafío</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => { setDifficulty('easy'); soundService.playClick(); }}
                className={`p-6 rounded-[2rem] border-2 transition-all text-left relative overflow-hidden group ${difficulty === 'easy' ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10' : 'bg-slate-950 border-white/5 hover:border-white/20'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-black text-2xl ${difficulty === 'easy' ? 'text-white' : 'text-slate-400'}`}>MODO FÁCIL</span>
                  {difficulty === 'easy' && <CheckCircle2 className="text-indigo-400" size={24} />}
                </div>
                <p className="text-xs text-slate-500 font-bold mb-4">5 PREGUNTAS</p>
                <div className="flex items-center gap-2 text-indigo-400 font-black text-sm">
                  <Star size={14} fill="currentColor" /> PREMIO: CARAMELOS
                </div>
              </button>

              <button 
                type="button"
                onClick={() => { setDifficulty('normal'); soundService.playClick(); }}
                className={`p-6 rounded-[2rem] border-2 transition-all text-left relative overflow-hidden group ${difficulty === 'normal' ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10' : 'bg-slate-950 border-white/5 hover:border-white/20'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-black text-2xl ${difficulty === 'normal' ? 'text-white' : 'text-slate-400'}`}>MODO NORMAL</span>
                  {difficulty === 'normal' && <CheckCircle2 className="text-indigo-400" size={24} />}
                </div>
                <p className="text-xs text-slate-500 font-bold mb-4">10 PREGUNTAS</p>
                <div className="flex items-center gap-2 text-amber-500 font-black text-sm">
                  <Star size={14} fill="currentColor" /> PREMIO: CHUPETE
                </div>
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-6 rounded-2xl shadow-2xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-3 text-2xl group"
          >
            COMENZAR DESAFÍO
            <ChevronRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full text-left">
      {gameState === 'finished' ? (
        <div className="py-8 animate-fade-in">
          {isPerfectScore ? (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <div className="relative inline-block">
                  <Trophy size={100} className="text-yellow-500 mb-6 animate-bounce" />
                  <Zap size={40} className="absolute -top-4 -right-4 text-indigo-500 animate-pulse" />
                </div>
                <h3 className="text-5xl font-black text-white mb-2 italic">¡LO LOGRASTE, {userName.split(' ')[0].toUpperCase()}!</h3>
                <p className="text-xl text-slate-400">Has demostrado ser un experto en arquitectura Backend.</p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-400 via-amber-200 to-amber-500 p-1 rounded-[2.5rem] shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                <div className="bg-slate-950 rounded-[2.3rem] overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                  
                  <div className="p-8 border-b border-white/10 flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-500 p-2 rounded-lg"><Ticket size={24} className="text-slate-950" /></div>
                      <span className="font-black text-amber-500 tracking-tighter">BACKEND PREMIO</span>
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase">{difficulty === 'easy' ? 'Nivel Básico' : 'Nivel Élite'}</span>
                  </div>

                  <div className="p-10 text-center space-y-8 relative z-10">
                    <div className="space-y-1">
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Aspirante Ganador</p>
                      <h4 className="text-4xl font-black text-white italic">{userName}</h4>
                    </div>

                    <div className="bg-amber-500/10 rounded-2xl p-8 border border-amber-500/20 shadow-inner">
                      <p className="text-xs text-amber-500/60 font-bold uppercase mb-2">Premio a Reclamar</p>
                      <p className="text-5xl font-black text-amber-400 tracking-tighter">{prize}</p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 px-6">
                       <div className="text-left">
                         <p className="text-[10px] text-slate-500 font-bold uppercase">Puntaje Final</p>
                         <p className="text-2xl font-black text-white">{score}/{activeScenarios.length}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-[10px] text-slate-500 font-bold uppercase">Evento</p>
                         <p className="text-sm font-black text-white">CASA ABIERTA 2025</p>
                       </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-500/10 p-4 flex items-center justify-center gap-2 border-t border-amber-500/20">
                    <ShieldCheck size={16} className="text-amber-500" />
                    <span className="text-[10px] font-black text-amber-500 uppercase">Validado por el Staff de BackendCore</span>
                  </div>
                </div>
              </div>

              <button onClick={restart} className="mt-12 text-slate-500 hover:text-white transition-colors mx-auto flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                <RefreshCw size={14} /> JUGAR CON OTRO NOMBRE
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/10">
                <Award size={48} className="text-slate-500" />
              </div>
              <h3 className="text-4xl font-black text-white mb-4">¡Casi lo logras, {userName.split(' ')[0]}!</h3>
              <p className="text-xl text-slate-400 mb-10 max-w-md mx-auto">
                Obtuviste <span className="text-indigo-400 font-bold">{score} de {activeScenarios.length}</span> puntos. 
                Necesitas todas correctas para ganar el premio.
              </p>
              <button onClick={restart} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xl hover:bg-indigo-500 transition-all flex items-center gap-3 mx-auto shadow-xl">
                <RefreshCw size={24} /> REINTENTAR NIVEL
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <span className="bg-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/30">
                Nivel {difficulty === 'easy' ? 'Fácil' : 'Normal'} • Pregunta {currentIdx + 1} / {activeScenarios.length}
              </span>
              <div className="h-1.5 w-32 bg-slate-800 rounded-full overflow-hidden hidden md:block">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-300" 
                  style={{ width: `${((currentIdx) / activeScenarios.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Aspirante</p>
              <p className="text-indigo-400 font-black">{userName.split(' ')[0].toUpperCase()}</p>
            </div>
          </div>

          <div className="min-h-[180px] flex items-center justify-center mb-12 px-4">
            <h4 className="text-3xl md:text-5xl font-black text-white text-center leading-tight tracking-tight">
              <span className="text-indigo-500 mr-2 italic">"</span>
              {activeScenarios[currentIdx].task}
              <span className="text-indigo-500 ml-2 italic">"</span>
            </h4>
          </div>

          {showResult === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => handleAnswer('frontend')} 
                className="group relative overflow-hidden py-12 rounded-[2rem] bg-slate-900 border border-white/10 hover:border-blue-500/50 transition-all active:scale-95"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 text-4xl font-black text-white group-hover:text-blue-400">FRONTEND</span>
              </button>

              <button 
                onClick={() => handleAnswer('backend')} 
                className="group relative overflow-hidden py-12 rounded-[2rem] bg-slate-900 border border-white/10 hover:border-indigo-500/50 transition-all active:scale-95"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 text-4xl font-black text-white group-hover:text-indigo-400">BACKEND</span>
              </button>
            </div>
          ) : (
            <div className={`p-10 rounded-[2.5rem] flex flex-col items-center gap-6 animate-slide-up border-2 ${showResult ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
              <div className={`flex items-center gap-4 font-black text-4xl ${showResult ? 'text-green-400' : 'text-red-400'}`}>
                {showResult ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
                {showResult ? '¡CORRECTO!' : 'INCORRECTO'}
              </div>
              <div className="max-w-xl text-center">
                <p className="text-slate-400 leading-relaxed font-medium italic">"{activeScenarios[currentIdx].explanation}"</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameChallenge;
