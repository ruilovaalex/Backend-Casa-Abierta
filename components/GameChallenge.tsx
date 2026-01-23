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
  // FÁCIL (Interfaz y UX básica) - 10 Preguntas
  { id: 1, difficulty: 'easy', task: "Cambiar el color de un botón cuando el usuario pasa el mouse por encima.", correct: 'frontend', explanation: "Los estilos visuales y la interactividad inmediata (hover) son tareas de CSS/JS en el Frontend." },
  { id: 2, difficulty: 'easy', task: "Mostrar un mensaje emergente (Alert) que diga '¡Formulario enviado!'", correct: 'frontend', explanation: "Las notificaciones visuales y alertas en el navegador las gestiona el Frontend." },
  { id: 3, difficulty: 'easy', task: "Hacer que el logo de la página se mueva o rebote al cargar.", correct: 'frontend', explanation: "Las animaciones de entrada y efectos visuales ocurren directamente en el cliente." },
  { id: 4, difficulty: 'easy', task: "Validar que el campo 'Nombre' no esté vacío antes de enviarlo.", correct: 'frontend', explanation: "El Frontend verifica errores básicos para no molestar al servidor innecesariamente." },
  { id: 5, difficulty: 'easy', task: "Poner el texto en mayúsculas automáticamente mientras el usuario escribe.", correct: 'frontend', explanation: "La manipulación de texto en tiempo real en la pantalla es trabajo del Frontend." },
  { id: 6, difficulty: 'easy', task: "Cambiar el tema de la página entre 'Modo Claro' y 'Modo Oscuro'.", correct: 'frontend', explanation: "El cambio de hojas de estilo (CSS) es una responsabilidad puramente visual del Frontend." },
  { id: 7, difficulty: 'easy', task: "Crear un carrusel de imágenes que se deslice lateralmente.", correct: 'frontend', explanation: "La disposición y movimiento de elementos en pantalla es tarea del desarrollador Frontend." },
  { id: 8, difficulty: 'easy', task: "Ajustar el tamaño de las letras para que se lean bien en un celular.", correct: 'frontend', explanation: "El Diseño Responsivo (Responsive Design) se implementa con CSS en el Frontend." },
  { id: 9, difficulty: 'easy', task: "Hacer que un menú aparezca y desaparezca al tocar un icono.", correct: 'frontend', explanation: "La gestión de estados de la interfaz (abierto/cerrado) es controlada por el Frontend." },
  { id: 10, difficulty: 'easy', task: "Insertar un mapa interactivo de Google Maps en la sección de contacto.", correct: 'frontend', explanation: "La integración de componentes visuales de terceros en el HTML es labor del Frontend." },

  // NORMAL (Lógica, Seguridad y Datos) - 20 Preguntas
  { id: 11, difficulty: 'normal', task: "Guardar la foto de perfil de un usuario en un servidor en la nube.", correct: 'backend', explanation: "El almacenamiento físico de archivos y la gestión de servidores es tarea del Backend." },
  { id: 12, difficulty: 'normal', task: "Consultar si la contraseña ingresada coincide con la guardada en la base de datos.", correct: 'backend', explanation: "La verificación de credenciales ocurre en un entorno seguro y privado: el Backend." },
  { id: 13, difficulty: 'normal', task: "Enviar un código de recuperación de cuenta al correo del usuario.", correct: 'backend', explanation: "La conexión con servicios de mensajería y lógica de seguridad es responsabilidad del servidor." },
  { id: 14, difficulty: 'normal', task: "Calcular el total de una compra sumando productos e impuestos.", correct: 'backend', explanation: "Para evitar fraudes, los cálculos financieros críticos deben hacerse siempre en el Backend." },
  { id: 15, difficulty: 'normal', task: "Generar un reporte en Excel con todas las ventas del mes.", correct: 'backend', explanation: "El procesamiento masivo de datos y creación de documentos ocurre en el servidor." },
  { id: 16, difficulty: 'normal', task: "Decidir si un usuario tiene permiso de ver la carpeta de 'Administración'.", correct: 'backend', explanation: "La autorización y el control de roles es el escudo de seguridad del Backend." },
  { id: 17, difficulty: 'normal', task: "Conectar la aplicación con el sistema de cobros de una tarjeta de crédito.", correct: 'backend', explanation: "Las pasarelas de pago requieren llaves secretas que solo deben vivir en el Backend." },
  { id: 18, difficulty: 'normal', task: "Hacer que la base de datos se limpie automáticamente cada medianoche.", correct: 'backend', explanation: "Las tareas programadas (Cron Jobs) y mantenimiento de datos son del Backend." },
  { id: 19, difficulty: 'normal', task: "Traducir un texto automáticamente usando una Inteligencia Artificial.", correct: 'backend', explanation: "El procesamiento de lenguajes y llamadas a APIs de IA se gestionan en el servidor." },
  { id: 20, difficulty: 'normal', task: "Optimizar una imagen pesada para que ocupe menos espacio en el disco duro.", correct: 'backend', explanation: "La compresión de archivos multimedia es una tarea pesada que se delega al Backend." },
  { id: 21, difficulty: 'normal', task: "Registrar la hora exacta en la que un usuario inició sesión.", correct: 'backend', explanation: "La auditoría y el registro de eventos del sistema (Logs) los maneja el Backend." },
  { id: 22, difficulty: 'normal', task: "Sincronizar los mensajes de un chat entre dos personas en tiempo real.", correct: 'backend', explanation: "La gestión de conexiones simultáneas y WebSockets es arquitectura de Backend." },
  { id: 23, difficulty: 'normal', task: "Bloquear a un usuario que intentó adivinar una contraseña 10 veces.", correct: 'backend', explanation: "El control de ataques de fuerza bruta es una medida de seguridad del servidor." },
  { id: 24, difficulty: 'normal', task: "Convertir una lista de 5,000 nombres a formato JSON para enviarlos.", correct: 'backend', explanation: "La estructuración de grandes volúmenes de datos es tarea del Backend." },
  { id: 25, difficulty: 'normal', task: "Ocultar la ubicación real del servidor mediante un Proxy.", correct: 'backend', explanation: "La configuración de redes e infraestructura es parte del ecosistema Backend." },
  { id: 26, difficulty: 'normal', task: "Crear un código QR único para cada entrada de un evento.", correct: 'backend', explanation: "La generación lógica de códigos y validadores únicos ocurre en el servidor." },
  { id: 27, difficulty: 'normal', task: "Verificar que el usuario sea mayor de edad consultando su documento oficial.", correct: 'backend', explanation: "La validación de identidad contra bases de datos externas es tarea del Backend." },
  { id: 28, difficulty: 'normal', task: "Guardar el progreso de un juego para que no se pierda al cerrar el navegador.", correct: 'backend', explanation: "La persistencia de datos a largo plazo requiere una base de datos manejada por el Backend." },
  { id: 29, difficulty: 'normal', task: "Manejar el stock de una tienda para que no se vendan productos agotados.", correct: 'backend', explanation: "La consistencia de los datos comerciales es responsabilidad del servidor." },
  { id: 30, difficulty: 'normal', task: "Cifrar datos médicos sensibles para que nadie pueda leerlos.", correct: 'backend', explanation: "El cumplimiento de leyes de privacidad y cifrado de datos se ejecuta en el Backend." },
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
