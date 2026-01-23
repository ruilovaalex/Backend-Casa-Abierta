import React, { useState, useMemo, useEffect } from 'react';
import { Trophy, CheckCircle2, XCircle, RefreshCw, Zap, Award, ShieldCheck, Ticket, User, Star, ChevronRight } from 'lucide-react';
import { soundService } from '../services/soundService';

// --- DEFINICIÓN DE TIPOS ---
interface GameScenario {
  id: number;
  task: string;
  correct: 'frontend' | 'backend';
  explanation: string;
  difficulty: 'easy' | 'normal';
}

type Difficulty = 'easy' | 'normal';
type GameState = 'setup' | 'playing' | 'finished';

// --- BASE DE DATOS DE PREGUNTAS (30 TOTAL) ---
const ALL_SCENARIOS: GameScenario[] = [
  // --- MODO FÁCIL (Conceptos básicos mezclados) ---
  { id: 1, difficulty: 'easy', task: "Cambiar el color de un botón cuando el usuario pasa el mouse.", correct: 'frontend', explanation: "La interactividad visual inmediata es tarea del Frontend." },
  { id: 2, difficulty: 'easy', task: "Guardar el nombre de un nuevo usuario en la lista de la base de datos.", correct: 'backend', explanation: "El almacenamiento permanente de datos es responsabilidad del Backend." },
  { id: 3, difficulty: 'easy', task: "Mostrar un mensaje de '¡Bienvenido!' en la pantalla.", correct: 'frontend', explanation: "Mostrar texto y elementos visuales al usuario es trabajo del Frontend." },
  { id: 4, difficulty: 'easy', task: "Verificar si una cuenta de usuario existe antes de dejarlo entrar.", correct: 'backend', explanation: "La validación de datos contra la base de datos ocurre en el Backend." },
  { id: 5, difficulty: 'easy', task: "Hacer que el menú se oculte automáticamente en celulares.", correct: 'frontend', explanation: "El diseño adaptativo (Responsive Design) lo gestiona el Frontend." },
  { id: 6, difficulty: 'easy', task: "Sumar el total de dos números ingresados en un formulario de contacto.", correct: 'frontend', explanation: "Cálculos simples de interfaz para feedback rápido se pueden hacer en el Frontend." },
  { id: 7, difficulty: 'easy', task: "Enviar un correo electrónico de confirmación tras un registro.", correct: 'backend', explanation: "La conexión con servidores de mensajería (SMTP) es tarea del Backend." },
  { id: 8, difficulty: 'easy', task: "Poner una imagen de fondo que cubra toda la pantalla.", correct: 'frontend', explanation: "La estética y disposición de imágenes es responsabilidad del Frontend." },
  { id: 9, difficulty: 'easy', task: "Borrar un comentario de la base de datos permanentemente.", correct: 'backend', explanation: "La manipulación y borrado de datos en el servidor es trabajo del Backend." },
  { id: 10, difficulty: 'easy', task: "Validar que el correo escrito tenga un '@' antes de enviarlo.", correct: 'frontend', explanation: "Las validaciones de formato básicas se hacen en el Frontend para ahorrar tiempo." },

  // --- MODO NORMAL (Lógica avanzada mezclada) ---
  { id: 11, difficulty: 'normal', task: "Cifrar la contraseña con un algoritmo de seguridad (Hash).", correct: 'backend', explanation: "La seguridad sensible nunca debe exponerse en el cliente, se hace en el Backend." },
  { id: 12, difficulty: 'normal', task: "Crear un gráfico interactivo que se mueva con el mouse del usuario.", correct: 'frontend', explanation: "Las visualizaciones complejas y manipulación del DOM ocurren en el Frontend." },
  { id: 13, difficulty: 'normal', task: "Generar un archivo PDF con el resumen de compras del cliente.", correct: 'backend', explanation: "El procesamiento y generación de documentos pesados se delega al servidor." },
  { id: 14, difficulty: 'normal', task: "Sincronizar el estado de la App para que funcione sin internet (Offline).", correct: 'frontend', explanation: "La gestión de Service Workers y caché local es tarea avanzada de Frontend." },
  { id: 15, difficulty: 'normal', task: "Conectar la App con Stripe para procesar un pago real de $100.", correct: 'backend', explanation: "Las transacciones financieras requieren llaves secretas que solo residen en el Backend." },
  { id: 16, difficulty: 'normal', task: "Consumir una API de Google Maps para mostrar la ruta más corta.", correct: 'frontend', explanation: "La integración y pintado de datos externos en el mapa es labor del Frontend." },
  { id: 17, difficulty: 'normal', task: "Programar un robot que limpie datos viejos cada domingo a las 3 AM.", correct: 'backend', explanation: "Las tareas programadas (Cron Jobs) son exclusivas de la infraestructura Backend." },
  { id: 18, difficulty: 'normal', task: "Comprimir una imagen de 10MB a 500KB para que no pese en el servidor.", correct: 'backend', explanation: "El procesamiento de archivos multimedia es una carga pesada para el servidor." },
  { id: 19, difficulty: 'normal', task: "Implementar un sistema de 'Drag and Drop' para reordenar una lista.", correct: 'frontend', explanation: "La experiencia de usuario táctil y de arrastre se programa en el Frontend." },
  { id: 20, difficulty: 'normal', task: "Detectar y bloquear un ataque de inyección SQL en un formulario.", correct: 'backend', explanation: "La protección de la integridad de la base de datos es responsabilidad del Backend." },
  { id: 21, difficulty: 'normal', task: "Traducir toda la página a 5 idiomas usando archivos de configuración.", correct: 'frontend', explanation: "La internacionalización (i18n) de la interfaz es tarea del desarrollador Frontend." },
  { id: 22, difficulty: 'normal', task: "Manejar miles de mensajes por segundo en un chat global.", correct: 'backend', explanation: "La escalabilidad de conexiones (WebSockets/Sockets.io) la controla el Backend." },
  { id: 23, difficulty: 'normal', task: "Hacer que la web cargue en menos de 1 segundo usando 'Lazy Loading'.", correct: 'frontend', explanation: "La optimización de carga de activos y componentes es una técnica de Frontend." },
  { id: 24, difficulty: 'normal', task: "Crear un código QR dinámico que expire en 5 minutos.", correct: 'backend', explanation: "La lógica de expiración y generación de tokens de seguridad ocurre en el servidor." },
  { id: 25, difficulty: 'normal', task: "Verificar la identidad del usuario mediante un Token JWT (JWT: un token seguro en formato JSON para autenticar usuarios de forma stateless, con header, payload y firma).", correct: 'backend', explanation: "La autenticación y validación de sesiones es el núcleo del Backend." },
  { id: 26, difficulty: 'normal', task: "Animar la transición entre páginas para que parezca una App móvil.", correct: 'frontend', explanation: "La fluidez de navegación y transiciones de vista son trabajo del Frontend." },
  { id: 27, difficulty: 'normal', task: "Configurar un balanceador de carga para repartir el tráfico web.", correct: 'backend', explanation: "La arquitectura de servidores y distribución de carga es de nivel Backend." },
  { id: 28, difficulty: 'normal', task: "Filtrar palabras ofensivas de un comentario antes de que otros lo vean.", correct: 'backend', explanation: "El filtrado de contenido por seguridad y moderación se centraliza en el servidor." },
  { id: 29, difficulty: 'normal', task: "Hacer que la página se vea igual en Chrome, Safari y Firefox.", correct: 'frontend', explanation: "La compatibilidad entre navegadores (Cross-browser) es un reto del Frontend." },
  { id: 30, difficulty: 'normal', task: "Consultar el clima actual usando una clave secreta de una API externa.", correct: 'backend', explanation: "Las llaves de API privadas nunca deben estar en el Frontend; se consultan desde el Backend." },
];

const GameChallenge: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [userName, setUserName] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [activeScenarios, setActiveScenarios] = useState<GameScenario[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState<boolean | null>(null);

  // Función para barajar y seleccionar preguntas
  const setupGame = (diff: Difficulty) => {
    const pool = ALL_SCENARIOS.filter(s => s.difficulty === diff);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const count = diff === 'easy' ? 5 : 10;
    setActiveScenarios(shuffled.slice(0, count));
  };

  const prize = useMemo(() => {
    return difficulty === 'easy' ? 'CARAMELOS' : 'CHUPETE';
  }, [difficulty]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setupGame(difficulty);
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

  const restart = () => {
    soundService.playClick();
    setCurrentIdx(0);
    setScore(0);
    setGameState('setup');
    setShowResult(null);
  };

  const isPerfectScore = score === activeScenarios.length;

  // --- RENDER: PANTALLA DE INICIO ---
  if (gameState === 'setup') {
    return (
      <div className="max-w-xl mx-auto animate-fade-in py-12 px-4">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/20">
            <User size={40} className="text-white" />
          </div>
          <h3 className="text-4xl font-black text-white mb-2 italic">REGISTRO DE ASPIRANTE</h3>
          <p className="text-slate-400">Las preguntas son aleatorias en cada partida.</p>
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
                className={`p-6 rounded-[2rem] border-2 transition-all text-left relative overflow-hidden group ${difficulty === 'easy' ? 'bg-indigo-600/20 border-indigo-500 shadow-lg' : 'bg-slate-950 border-white/5 hover:border-white/20'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-black text-2xl ${difficulty === 'easy' ? 'text-white' : 'text-slate-400'}`}>MODO FÁCIL</span>
                  {difficulty === 'easy' && <CheckCircle2 className="text-indigo-400" size={24} />}
                </div>
                <p className="text-xs text-slate-500 font-bold mb-4 uppercase">5 Preguntas Aleatorias</p>
                <div className="flex items-center gap-2 text-indigo-400 font-black text-sm">
                  <Star size={14} fill="currentColor" /> PREMIO: CARAMELOS
                </div>
              </button>

              <button 
                type="button"
                onClick={() => { setDifficulty('normal'); soundService.playClick(); }}
                className={`p-6 rounded-[2rem] border-2 transition-all text-left relative overflow-hidden group ${difficulty === 'normal' ? 'bg-indigo-600/20 border-indigo-500 shadow-lg' : 'bg-slate-950 border-white/5 hover:border-white/20'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-black text-2xl ${difficulty === 'normal' ? 'text-white' : 'text-slate-400'}`}>MODO NORMAL</span>
                  {difficulty === 'normal' && <CheckCircle2 className="text-indigo-400" size={24} />}
                </div>
                <p className="text-xs text-slate-500 font-bold mb-4 uppercase">10 Preguntas Aleatorias</p>
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

  // --- RENDER: JUEGO O RESULTADO FINAL ---
  return (
    <div className="w-full text-left max-w-4xl mx-auto px-4">
      {gameState === 'finished' ? (
        <div className="py-8 animate-fade-in">
          {isPerfectScore ? (
            <div className="max-w-2xl mx-auto text-center">
                <Trophy size={100} className="text-yellow-500 mb-6 animate-bounce mx-auto" />
                <h3 className="text-5xl font-black text-white mb-10 italic uppercase">¡FELICIDADES, {userName.split(' ')[0]}!</h3>
                
                {/* EL TICKET PREMIO */}
                <div className="bg-gradient-to-br from-amber-400 via-amber-200 to-amber-500 p-1 rounded-[2.5rem] shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                  <div className="bg-slate-950 rounded-[2.3rem] overflow-hidden relative p-10 space-y-8">
                    <div className="flex justify-between items-center border-b border-white/10 pb-6">
                      <div className="flex items-center gap-2">
                        <Ticket size={24} className="text-amber-500" />
                        <span className="font-black text-amber-500 tracking-tighter">BACKEND PREMIO</span>
                      </div>
                      <span className="text-xs font-bold text-slate-500 uppercase">Casa Abierta 2025</span>
                    </div>

                    <div>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Aspirante Ganador</p>
                      <h4 className="text-4xl font-black text-white italic truncate">{userName}</h4>
                    </div>

                    <div className="bg-amber-500/10 rounded-2xl p-8 border border-amber-500/20 shadow-inner">
                      <p className="text-xs text-amber-500/60 font-bold uppercase mb-2">Premio a Reclamar</p>
                      <p className="text-6xl font-black text-amber-400 tracking-tighter">{prize}</p>
                    </div>
                    
                    <div className="flex justify-between items-center text-left pt-4">
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Puntaje</p>
                        <p className="text-2xl font-black text-white">{score}/{activeScenarios.length}</p>
                      </div>
                      <div className="text-right">
                        <ShieldCheck className="text-amber-500 ml-auto" size={32} />
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={restart} className="mt-12 text-slate-500 hover:text-white transition-colors mx-auto flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                  <RefreshCw size={14} /> JUGAR OTRA VEZ
                </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <Award size={100} className="text-slate-700 mx-auto mb-8" />
              <h3 className="text-4xl font-black text-white mb-4 uppercase">¡Casi lo logras!</h3>
              <p className="text-xl text-slate-400 mb-10">Obtuviste <span className="text-indigo-400 font-bold">{score} de {activeScenarios.length}</span> puntos. Necesitas puntuación perfecta.</p>
              <button onClick={restart} className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-indigo-500 transition-all flex items-center gap-3 mx-auto shadow-lg shadow-indigo-600/20">
                <RefreshCw size={24} /> REINTENTAR CON NUEVAS PREGUNTAS
              </button>
            </div>
          )}
        </div>
      ) : (
        /* PANTALLA DE JUEGO (PLAYING) */
        <div className="animate-fade-in py-10">
          <div className="flex justify-between items-center mb-12">
            <span className="bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-500/30">
              {difficulty === 'easy' ? 'Nivel Fácil' : 'Nivel Élite'} • {currentIdx + 1} / {activeScenarios.length}
            </span>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Aspirante</p>
              <p className="text-indigo-400 font-black">{userName.split(' ')[0].toUpperCase()}</p>
            </div>
          </div>

          <div className="min-h-[220px] flex items-center justify-center mb-12">
            <h4 className="text-3xl md:text-5xl font-black text-white text-center leading-tight tracking-tight">
              <span className="text-indigo-500 mr-2 italic">"</span>
              {activeScenarios[currentIdx]?.task}
              <span className="text-indigo-500 ml-2 italic">"</span>
            </h4>
          </div>

          {showResult === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => handleAnswer('frontend')} 
                className="py-12 rounded-[2rem] bg-slate-900 border border-white/10 hover:border-blue-500/50 transition-all active:scale-95 text-4xl font-black text-white shadow-xl hover:shadow-blue-500/10"
              >
                FRONTEND
              </button>
              <button 
                onClick={() => handleAnswer('backend')} 
                className="py-12 rounded-[2rem] bg-slate-900 border border-white/10 hover:border-indigo-500/50 transition-all active:scale-95 text-4xl font-black text-white shadow-xl hover:shadow-indigo-500/10"
              >
                BACKEND
              </button>
            </div>
          ) : (
            <div className={`p-10 rounded-[2.5rem] border-2 flex flex-col items-center gap-6 animate-slide-up ${showResult ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
              <div className={`flex items-center gap-4 font-black text-4xl ${showResult ? 'text-green-400' : 'text-red-400'}`}>
                {showResult ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
                {showResult ? '¡CORRECTO!' : 'INCORRECTO'}
              </div>
              <p className="text-slate-400 text-center text-lg italic max-w-2xl leading-relaxed">"{activeScenarios[currentIdx]?.explanation}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameChallenge;
