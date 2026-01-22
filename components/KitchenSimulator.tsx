
import React, { useState } from 'react';
import { Globe, Server, Database, ArrowRight, Monitor, Activity, RefreshCw } from 'lucide-react';
import { FlowStep } from '../types';
import { soundService } from '../services/soundService';

const RequestFlowSimulator: React.FC = () => {
  const [step, setStep] = useState<FlowStep>(FlowStep.IDLE);
  const [log, setLog] = useState<string>("Sistema en espera. Listo para recibir un pedido...");

  const startProcess = () => {
    soundService.playStart();
    setStep(FlowStep.REQUESTING);
    setLog("CLIENTE: Enviando 'Pedido' (Petición HTTP) al servidor.");
    
    setTimeout(() => {
      soundService.playProcess();
      setStep(FlowStep.PROCESSING);
      setLog("SERVIDOR: Revisando pedido, validando usuario y ejecutando lógica.");
    }, 2000);

    setTimeout(() => {
      soundService.playProcess();
      setStep(FlowStep.RETRIEVING);
      setLog("BASE DE DATOS: Buscando los 'Ingredientes' (Datos) solicitados.");
    }, 4000);

    setTimeout(() => {
      soundService.playProcess();
      setStep(FlowStep.COMPLETING);
      setLog("SERVIDOR: Empacando respuesta y enviándola de vuelta al cliente.");
    }, 6000);

    setTimeout(() => {
      soundService.playCorrect();
      setStep(FlowStep.IDLE);
      setLog("COMPLETADO: El usuario ya puede ver el resultado en su pantalla.");
    }, 9000);
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl rounded-[3rem] p-10 border border-white/5 w-full shadow-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16 px-4">
        {/* Frontend */}
        <div className={`flex flex-col items-center p-8 rounded-[2rem] transition-all duration-500 w-full md:w-56 ${step === FlowStep.REQUESTING || step === FlowStep.COMPLETING ? 'bg-blue-600 shadow-2xl scale-110 z-20' : 'bg-white/5'}`}>
          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-white mb-4">
            <Monitor size={32} />
          </div>
          <span className="font-black text-white">CLIENTE</span>
          <span className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Frontend</span>
        </div>

        {/* Backend */}
        <div className={`flex flex-col items-center p-8 rounded-[2rem] transition-all duration-500 w-full md:w-56 ${step === FlowStep.PROCESSING ? 'bg-indigo-600 shadow-2xl scale-110 z-20' : 'bg-white/5'}`}>
          <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-white mb-4">
            <Server size={32} />
          </div>
          <span className="font-black text-white">SERVIDOR</span>
          <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">Backend</span>
        </div>

        {/* Database */}
        <div className={`flex flex-col items-center p-8 rounded-[2rem] transition-all duration-500 w-full md:w-56 ${step === FlowStep.RETRIEVING ? 'bg-green-600 shadow-2xl scale-110 z-20' : 'bg-white/5'}`}>
          <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center text-white mb-4">
            <Database size={32} />
          </div>
          <span className="font-black text-white">DATOS</span>
          <span className="text-[10px] text-green-300 font-bold uppercase tracking-widest">Base de Datos</span>
        </div>
      </div>

      <div className="bg-slate-950 p-8 rounded-[2rem] border border-white/10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="flex items-center gap-3 text-slate-500 mb-4 text-xs font-black uppercase tracking-widest">
          <Activity size={16} className="text-indigo-500" />
          Log del Sistema
        </div>
        <p className="text-green-400 font-mono text-xl md:text-3xl min-h-[1.5em] leading-tight">
          <span className="mr-4 text-indigo-500 font-black tracking-tighter">{">>>"}</span>{log}
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={startProcess}
          disabled={step !== FlowStep.IDLE}
          className={`px-16 py-6 rounded-2xl font-black text-2xl transition-all flex items-center gap-4 ${step === FlowStep.IDLE ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 active:scale-95' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
        >
          {step === FlowStep.IDLE ? <><Globe size={28} /> SIMULAR PETICIÓN</> : <><RefreshCw className="animate-spin" size={28} /> PROCESANDO...</>}
        </button>
      </div>
    </div>
  );
};

export default RequestFlowSimulator;
