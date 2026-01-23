import React, { useState, useMemo, useEffect } from 'react';
import { Trophy, CheckCircle2, XCircle, RefreshCw, Zap, Award, ShieldCheck, Ticket, User, Star, ChevronRight } from 'lucide-react';
import { GameScenario } from '../types';
import { soundService } from '../services/soundService';

const scenarios: GameScenario[] = [
  // --- MODO FÁCIL (Índices 0-4: Total 5) ---
  {
    id: 1,
    task: "Cambiar el color de fondo de la página al hacer clic en un botón de 'Modo Oscuro'.",
    correct: 'frontend',
    explanation: "Todo lo relacionado con estilos visuales y cambios inmediatos en la pantalla sin consultar al servidor es responsabilidad del Frontend."
  },
  {
    id: 2,
    task: "Mostrar un mensaje de '¡Bienvenido!' con el nombre que el usuario acaba de escribir.",
    correct: 'frontend',
    explanation: "Manipular los datos que el usuario ingresa para mostrarlos en la interfaz en tiempo real es una tarea clásica de JavaScript en el Frontend."
  },
  {
    id: 3,
    task: "Crear una animación para que un menú lateral se deslice suavemente.",
    correct: 'frontend',
    explanation: "Las animaciones y la interactividad visual (UX) ocurren directamente en el navegador del cliente usando CSS o JS."
  },
  {
    id: 4,
    task: "Validar que el campo 'Edad' no esté vacío antes de intentar registrarse.",
    correct: 'frontend',
    explanation: "Las validaciones básicas de formularios se hacen en el Frontend para dar feedback instantáneo al usuario y ahorrar tráfico innecesario."
  },
  {
    id: 5,
    task: "Poner en negrita y color rojo los mensajes de error en un formulario.",
    correct: 'frontend',
    explanation: "El diseño y la presentación de la información (HTML/CSS) son la esencia del trabajo Frontend."
  },

  // --- MODO NORMAL (Índices 5-14: Total 10) ---
  {
    id: 6,
    task: "Verificar si un nombre de usuario ya existe en la base de datos antes de crear la cuenta.",
    correct: 'backend',
    explanation: "Solo el Backend tiene acceso a la base de datos para realizar consultas de integridad y seguridad."
  },
  {
    id: 7,
    task: "Cifrar la información de una tarjeta de crédito antes de procesar un pago.",
    correct: 'backend',
    explanation: "Por seguridad, los procesos sensibles y el manejo de llaves de cifrado deben ocurrir en el servidor, lejos del alcance del usuario final."
  },
  {
    id: 8,
    task: "Generar un archivo PDF con el resumen de la compra y enviarlo por correo electrónico.",
    correct: 'backend',
    explanation: "La generación de documentos pesados y la integración con servicios de mensajería (SMTP) son tareas del lado del servidor."
  },
  {
    id: 9,
    task: "Decidir qué productos mostrar al usuario basados en sus compras anteriores (Algoritmo).",
    correct: 'backend',
    explanation: "La lógica de negocio compleja y el procesamiento de grandes volúmenes de datos se ejecutan en el Backend para mayor potencia y control."
  },
  {
    id: 10,
    task: "Configurar el tiempo de expiración de una 'Sesión' para que el usuario se desconecte tras 2 horas.",
    correct: 'backend',
    explanation: "El servidor es quien emite y valida los tokens de sesión para garantizar que el acceso sea legítimo y seguro."
  },
  {
    id: 11,
    task: "Redimensionar y comprimir una imagen de perfil de 10MB a 200KB para ahorrar espacio.",
    correct: 'backend',
    explanation: "El procesamiento de archivos multimedia se delega al servidor para no agotar los recursos (batería/RAM) del dispositivo del usuario."
  },
  {
    id: 12,
    task: "Restringir el acceso a la zona de administración solo a usuarios con el rol 'ADMIN'.",
    correct: 'backend',
    explanation: "Aunque el Frontend oculte botones, la seguridad real (autorización) la impone el Backend validando cada petición al servidor."
  },
  {
    id: 13,
    task: "Conectar la aplicación con un servicio externo de clima para obtener datos de temperatura.",
    correct: 'backend',
    explanation: "Las APIs externas se suelen consumir desde el Backend para ocultar las llaves de acceso (API Keys) y protegerlas."
  },
  {
    id: 14,
    task: "Guardar el progreso de un estudiante en un curso para que pueda continuar después en otro dispositivo.",
    correct: 'backend',
    explanation: "La persistencia de datos (guardado permanente) requiere de una base de datos gestionada por el servidor."
  },
  {
    id: 15,
    task: "Calcular el promedio de calificaciones de 10,000 estudiantes simultáneamente.",
    correct: 'backend',
    explanation: "El procesamiento masivo de datos es una tarea optimizada para el hardware del servidor, no para el navegador del cliente."
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

  // Lógica de separación de preguntas por dificultad
  const activeScenarios = useMemo(() => {
    return difficulty === 'easy' 
      ? scenarios.slice(0, 5)   // Preguntas 1 a 5
      : scenarios.slice(5, 15); // Preguntas 6 a 15
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
          <p className="text-slate-400">Ingresa tus datos para empezar el desafío.</p>
        </div>

        <form onSubmit={handleStart} className="space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-2">Tu Nombre Completo</label>
            <input 
              required
              type="text" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-2xl py-5 px-6 text-xl text-white focus:border-indigo-500 outline-none transition-all shadow-inner"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-2">Elige tu Desafío</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => { setDifficulty('easy'); soundService.playClick(); }}
                className={`p-6 rounded-[2rem] border-2 transition-all text-left group ${difficulty === 'easy' ? 'bg-indigo-600/20 border-indigo-500' : 'bg-slate-950 border-white/5'}`}
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
                className={`p-6 rounded-[2rem] border-2 transition-all text-left group ${difficulty === 'normal' ? 'bg-indigo-600/20 border-indigo-500' : 'bg-slate-950 border-white/5'}`}
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
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-6 rounded-2xl transition-all flex items-center justify-center gap-3 text-2xl group"
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
                <Trophy size={100} className="text-yellow-500 mb-6 animate-bounce mx-auto" />
                <h3 className="text-5xl font-black text-white mb-2 italic">¡LO LOGRASTE, {userName.split(' ')[0].toUpperCase()}!</h3>
                <p className="text-xl text-slate-400">Has demostrado ser un experto en la arquitectura del sistema.</p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-400 via-amber-200 to-amber-500 p-1 rounded-[2.5rem] shadow-2xl">
                <div className="bg-slate-950 rounded-[2.3rem] overflow-hidden p-10 text-center space-y-8">
                  <div className="flex justify-center gap-2 mb-4">
                    <div className="bg-amber-500 p-2 rounded-lg"><Ticket size={24} className="text-slate-950" /></div>
                    <span className="font-black text-amber-500 self-center">CERTIFICADO DE GANADOR</span>
                  </div>

                  <div>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Aspirante Ganador</p>
                    <h4 className="text-4xl font-black text-white italic">{userName}</h4>
                  </div>

                  <div className="bg-amber-500/10 rounded-2xl p-8 border border-amber-500/20">
                    <p className="text-xs text-amber-500/60 font-bold uppercase mb-2">Premio a Reclamar</p>
                    <p className="text-5xl font-black text-amber-400 tracking-tighter">{prize}</p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                     <div className="text-left">
                       <p className="text-[10px] text-slate-500 font-bold uppercase">Puntaje</p>
                       <p className="text-2xl font-black text-white">{score}/{activeScenarios.length}</p>
                     </div>
                     <div className="text-right">
                       <p className="text-[10px] text-slate-500 font-bold uppercase">Evento</p>
                       <p className="text-sm font-black text-white">CASA ABIERTA 2025</p>
                     </div>
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
              <button onClick={restart} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xl hover:bg-indigo-500 transition-all flex items-center gap-3 mx-auto">
                <RefreshCw size={24} /> REINTENTAR NIVEL
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-12">
            <span className="bg-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/30">
              Nivel {difficulty === 'easy' ? 'Fácil' : 'Normal'} • Pregunta {currentIdx + 1} / {activeScenarios.length}
            </span>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Aspirante</p>
              <p className="text-indigo-400 font-black">{userName.split(' ')[0].toUpperCase()}</p>
            </div>
          </div>

          <div className="min-h-[180px] flex items-center justify-center mb-12">
            <h4 className="text-3xl md:text-5xl font-black text-white text-center leading-tight">
              <span className="text-indigo-500 mr-2 italic">"</span>
              {activeScenarios[currentIdx].task}
              <span className="text-indigo-500 ml-2 italic">"</span>
            </h4>
          </div>

          {showResult === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => handleAnswer('frontend')} 
                className="group py-12 rounded-[2rem] bg-slate-900 border border-white/10 hover:border-blue-500/50 transition-all active:scale-95 text-4xl font-black text-white"
              >
                FRONTEND
              </button>
              <button 
                onClick={() => handleAnswer('backend')} 
                className="group py-12 rounded-[2rem] bg-slate-900 border border-white/10 hover:border-indigo-500/50 transition-all active:scale-95 text-4xl font-black text-white"
              >
                BACKEND
              </button>
            </div>
          ) : (
            <div className={`p-10 rounded-[2.5rem] flex flex-col items-center gap-6 animate-slide-up border-2 ${showResult ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
              <div className={`flex items-center gap-4 font-black text-4xl ${showResult ? 'text-green-400' : 'text-red-400'}`}>
                {showResult ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
                {showResult ? '¡CORRECTO!' : 'INCORRECTO'}
              </div>
              <p className="text-slate-400 text-center leading-relaxed italic font-medium">"{activeScenarios[currentIdx].explanation}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameChallenge;
