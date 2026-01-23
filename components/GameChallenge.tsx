import React, { useState } from 'react';
import { Trophy, CheckCircle2, XCircle, RefreshCw, Zap, Award, User, Star, ChevronRight } from 'lucide-react';
import { GameScenario } from '../types';
import { soundService } from '../services/soundService';

const allScenarios: GameScenario[] = [
  { id: 1, task: "Definir el color y tamaño de los botones principales.", correct: 'frontend', explanation: "El Frontend es el responsable de la estética y los componentes visuales con los que interactúa el usuario." },
  { id: 2, task: "Cifrar contraseñas antes de guardarlas en el servidor.", correct: 'backend', explanation: "La seguridad sensible debe procesarse en el servidor para que el código no sea visible al cliente." },
  { id: 3, task: "Detectar si el usuario está navegando desde un iPhone o un Android.", correct: 'frontend', explanation: "El Frontend accede a las propiedades del navegador para adaptar la interfaz al dispositivo." },
  { id: 4, task: "Decidir si un pago con tarjeta es aprobado o rechazado comunicándose con el banco.", correct: 'backend', explanation: "La lógica de negocio crítica y conexiones seguras con bancos ocurren en el Backend." },
  { id: 5, task: "Programar un 'Contador' visual que aumenta al hacer clic.", correct: 'frontend', explanation: "La interactividad inmediata en pantalla es tarea del JavaScript en el Frontend." },
  { id: 6, task: "Enviar una respuesta '404 Not Found' cuando un recurso no existe.", correct: 'backend', explanation: "El servidor (Backend) verifica la existencia de recursos y devuelve códigos de estado HTTP." },
  { id: 7, task: "Almacenar archivos PDF en la nube y gestionar sus permisos.", correct: 'backend', explanation: "El Backend gestiona la persistencia, almacenamiento y la integridad de los archivos." },
  { id: 8, task: "Validar que un email tenga formato correcto antes de enviarlo al servidor.", correct: 'frontend', explanation: "Validar en el Frontend mejora la experiencia del usuario al dar feedback instantáneo." },
  { id: 9, task: "Implementar el algoritmo de búsqueda de rutas más cortas en un mapa.", correct: 'backend', explanation: "Cálculos complejos y procesamiento pesado se delegan al servidor." },
  { id: 10, task: "Configurar un balanceador de carga para soportar 1 millón de usuarios.", correct: 'backend', explanation: "La infraestructura y escalabilidad del sistema son competencias del Backend." },
  { id: 11, task: "Crear una animación 3D al pasar el ratón sobre una imagen.", correct: 'frontend', explanation: "Efectos visuales y animaciones CSS/JS ocurren directamente en el navegador." },
  { id: 12, task: "Configurar el certificado SSL/TLS para una conexión HTTPS segura.", correct: 'backend', explanation: "La seguridad a nivel de red y servidor se gestiona en el entorno del Backend." },
  { id: 13, task: "Gestionar los tiempos de caché para que las imágenes carguen más rápido.", correct: 'backend', explanation: "El servidor define cabeceras HTTP de caché para optimizar la entrega de recursos." },
  { id: 14, task: "Personalizar la tipografía de los títulos principales.", correct: 'frontend', explanation: "Los estilos visuales y la tipografía son definidos por CSS en el Frontend." },
  { id: 15, task: "Implementar un modal de confirmación con animación de entrada.", correct: 'frontend', explanation: "Los modales y sus animaciones se manejan en el navegador con JavaScript y CSS." },
  { id: 16, task: "Generar reportes PDF a partir de datos de la base de datos.", correct: 'backend', explanation: "El procesamiento de documentos y acceso a la base de datos ocurre en el servidor." },
  { id: 17, task: "Hacer responsive un diseño para tablets y móviles.", correct: 'frontend', explanation: "Media queries y diseño adaptativo son parte del CSS en el Frontend." },
  { id: 18, task: "Implementar autenticación con JWT (JSON Web Tokens).", correct: 'backend', explanation: "La generación y validación de tokens de seguridad se hace en el servidor." },
  { id: 19, task: "Mostrar un spinner de carga mientras se obtienen datos.", correct: 'frontend', explanation: "Los estados de carga y feedback visual son responsabilidad del Frontend." },
  { id: 20, task: "Configurar CORS para permitir peticiones desde otros dominios.", correct: 'backend', explanation: "CORS es una política de seguridad que se configura en el servidor." },
  { id: 21, task: "Implementar drag & drop para reorganizar elementos en una lista.", correct: 'frontend', explanation: "Las interacciones de arrastrar y soltar se manejan con JavaScript en el navegador." },
  { id: 22, task: "Ejecutar trabajos programados (cron jobs) para limpiar datos antiguos.", correct: 'backend', explanation: "Las tareas automatizadas y programadas se ejecutan en el servidor." },
  { id: 23, task: "Crear un carrusel de imágenes con navegación.", correct: 'frontend', explanation: "Los componentes interactivos visuales son parte del Frontend." },
  { id: 24, task: "Integrar un sistema de envío de emails transaccionales.", correct: 'backend', explanation: "El envío de correos y la integración con servicios externos ocurre en el Backend." },
  { id: 25, task: "Implementar validación en tiempo real de disponibilidad de nombre de usuario.", correct: 'frontend', explanation: "Aunque consulta al backend, la interacción inmediata y el feedback visual son del Frontend." },
  { id: 26, task: "Configurar una base de datos relacional con migraciones.", correct: 'backend', explanation: "La gestión de bases de datos y su estructura es responsabilidad del Backend." },
  { id: 27, task: "Añadir efectos de parallax al hacer scroll en la página.", correct: 'frontend', explanation: "Los efectos visuales basados en scroll se implementan con JavaScript/CSS." },
  { id: 28, task: "Implementar logging y monitoreo de errores del servidor.", correct: 'backend', explanation: "El registro de eventos y monitoreo del sistema ocurre en el Backend." },
  { id: 29, task: "Crear un formulario con validación de campos en múltiples pasos.", correct: 'frontend', explanation: "La navegación entre pasos y validación visual es tarea del Frontend." },
  { id: 30, task: "Implementar un sistema de cola de mensajes para procesar tareas pesadas.", correct: 'backend', explanation: "Los sistemas de colas y procesamiento asíncrono son infraestructura de Backend." }
];

const BOSS_QUESTION: GameScenario = {
  id: 99,
  task: "Implementar un sistema de 'Rate Limiting' para prevenir ataques de fuerza bruta en el servidor.",
  correct: 'backend',
  explanation: "¡DIFÍCIL! El Rate Limiting es una técnica avanzada de Backend para controlar el flujo de peticiones y proteger el sistema."
};

type Difficulty = 'easy' | 'normal';
type GameState = 'setup' | 'playing' | 'finished';

const GameChallenge: React.FC<{ isEmbedded?: boolean }> = () => {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [userName, setUserName] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<GameScenario[]>([]);

  const prepareQuestions = () => {
    let pool = [...allScenarios];
    // Fisher-Yates Shuffle para aleatorizar cada reintento
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    if (difficulty === 'easy') {
      setShuffledQuestions(pool.slice(0, 5));
    } else {
      // 9 aleatorias + la Boss Question fija al final para máxima dificultad
      setShuffledQuestions([...pool.slice(0, 9), BOSS_QUESTION]);
    }
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      prepareQuestions();
      soundService.playStart();
      setGameState('playing');
    }
  };

  const handleAnswer = (choice: 'frontend' | 'backend') => {
    const isCorrect = choice === shuffledQuestions[currentIdx].correct;
    setShowResult(isCorrect);
    
    if (isCorrect) {
      soundService.playCorrect();
      setScore(s => s + 1);
    } else {
      soundService.playIncorrect();
    }

    setTimeout(() => {
      if (currentIdx < shuffledQuestions.length - 1) {
        setCurrentIdx(c => c + 1);
        setShowResult(null);
      } else {
        setGameState('finished');
      }
    }, 1500);
  };

  const restart = () => {
    soundService.playClick();
    setCurrentIdx(0);
    setScore(0);
    setGameState('setup');
    setShowResult(null);
  };

  if (gameState === 'setup') {
    return (
      <div className="max-w-4xl mx-auto space-y-12 animate-fade-in py-8">
        <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5">
          <form onSubmit={handleStart} className="space-y-8 max-w-xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <User size={32} className="text-white" />
              </div>
              <h3 className="text-3xl font-black text-white italic">REGISTRO DE ASPIRANTE</h3>
              <p className="text-slate-400">Ingresa tu nombre para empezar el desafío.</p>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">Nombre Completo</label>
              <input required type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl py-5 px-6 text-xl text-white outline-none focus:border-indigo-500 transition-all shadow-inner" placeholder="Ej. Alexander" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={() => setDifficulty('easy')} className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${difficulty === 'easy' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 bg-slate-950 hover:bg-white/5'}`}>
                <p className="font-black text-white">MODO FÁCIL</p>
                <div className="flex gap-1 text-indigo-500"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">5 Preguntas</p>
              </button>
              <button type="button" onClick={() => setDifficulty('normal')} className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${difficulty === 'normal' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 bg-slate-950 hover:bg-white/5'}`}>
                <p className="font-black text-white">MODO NORMAL</p>
                <div className="flex gap-1 text-amber-500"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">10 Preguntas + Boss</p>
              </button>
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-6 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 text-2xl group active:scale-95">
              COMENZAR DESAFÍO <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-12">
      {gameState === 'finished' ? (
        <div className="text-center animate-fade-in space-y-12">
          <div className="bg-slate-900/60 p-16 rounded-[4rem] border border-white/5 shadow-2xl max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
            <Trophy size={100} className={`mx-auto mb-8 ${score === shuffledQuestions.length ? 'text-yellow-500 animate-bounce' : 'text-slate-600'}`} />
            <h3 className="text-5xl font-black text-white mb-2 italic uppercase tracking-tighter">{score === shuffledQuestions.length ? '¡ARQUITECTO ÉLITE!' : '¡BIEN JUGADO!'}</h3>
            <p className="text-2xl text-slate-400 mb-12 font-medium">{userName}, lograste <span className="text-indigo-500 font-black">{score}</span> de {shuffledQuestions.length} puntos.</p>
            <button onClick={restart} className="bg-indigo-600 hover:bg-indigo-500 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all flex items-center gap-4 mx-auto shadow-2xl active:scale-95">
              <RefreshCw size={24} /> REINTENTAR RETO
            </button>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in space-y-12">
          <div className="flex justify-between items-center bg-slate-900/40 p-6 rounded-3xl border border-white/5">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Pregunta</span>
                <span className="text-2xl font-black text-white leading-none">{currentIdx + 1}<span className="text-slate-600 text-sm ml-1">/ {shuffledQuestions.length}</span></span>
              </div>
              <div className="h-1.5 w-48 bg-slate-800 rounded-full overflow-hidden hidden md:block">
                <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${((currentIdx + 1) / shuffledQuestions.length) * 100}%` }}></div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Puntaje</p>
              <p className="text-3xl font-black text-white leading-none">{score}</p>
            </div>
          </div>

          <div className="min-h-[220px] flex items-center justify-center p-12 bg-indigo-500/5 border border-indigo-500/10 rounded-[3rem] relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
               {shuffledQuestions[currentIdx].id === 99 ? <Zap size={200} /> : <Award size={200} />}
            </div>
            <h4 className="text-4xl md:text-5xl font-black text-white text-center leading-tight tracking-tighter relative z-10">
              {shuffledQuestions[currentIdx].task}
            </h4>
          </div>

          {showResult === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button onClick={() => handleAnswer('frontend')} className="group relative overflow-hidden py-16 rounded-[2.5rem] bg-slate-900 border border-white/10 hover:border-blue-500/50 transition-all active:scale-95 shadow-xl">
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 text-4xl font-black text-white group-hover:text-blue-400 tracking-tighter italic">FRONTEND</span>
              </button>
              <button onClick={() => handleAnswer('backend')} className="group relative overflow-hidden py-16 rounded-[2.5rem] bg-slate-900 border border-white/10 hover:border-indigo-500/50 transition-all active:scale-95 shadow-xl">
                <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 text-4xl font-black text-white group-hover:text-indigo-400 tracking-tighter italic">BACKEND</span>
              </button>
            </div>
          ) : (
            <div className={`p-12 rounded-[3rem] border-2 animate-slide-up flex flex-col items-center gap-6 ${showResult ? 'bg-green-500/5 border-green-500/20 shadow-green-500/5 shadow-2xl' : 'bg-red-500/5 border-red-500/20 shadow-red-500/5 shadow-2xl'}`}>
              <div className={`flex items-center gap-4 text-4xl font-black ${showResult ? 'text-green-400' : 'text-red-400'}`}>
                {showResult ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
                {showResult ? '¡CORRECTO!' : '¡UPS! INCORRECTO'}
              </div>
              <p className="text-slate-300 text-xl text-center italic leading-relaxed max-w-2xl font-medium">"{shuffledQuestions[currentIdx].explanation}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameChallenge;
