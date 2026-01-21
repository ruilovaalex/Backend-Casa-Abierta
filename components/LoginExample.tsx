
import React, { useState } from 'react';
import { Lock, User, Send, CheckCircle, ShieldAlert, Code2, Monitor, Info } from 'lucide-react';

const LoginExample: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      setStatus('success');
    } else {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 3000);
  };

  const javaCode = `@PostMapping("/login")
public ResponseEntity<?> authenticate(@RequestBody LoginRequest req) {
    // 1. Recibir datos del Frontend
    String user = req.getUsername();
    String pass = req.getPassword();

    // 2. Lógica de Negocio (Backend)
    User foundUser = userRepository.findByUsername(user);

    if (foundUser != null && passwordEncoder.matches(pass, foundUser.getPass())) {
        // 3. Generar Respuesta Segura
        String token = jwtService.generateToken(foundUser);
        return ResponseEntity.ok(new LoginResponse(token));
    } else {
        return ResponseEntity.status(401).body("Error: Credenciales inválidas");
    }
}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
      {/* Tarjeta Frontend */}
      <div className="bg-slate-900/80 border border-blue-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
          <Monitor size={100} />
        </div>
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-3 rounded-xl text-white">
            <Monitor size={24} />
          </div>
          <h3 className="text-2xl font-black text-white">Interfaz del Usuario (Frontend)</h3>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-2 text-left">
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-2">Usuario</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****"
                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <Send size={20} /> INICIAR SESIÓN
          </button>
        </form>

        {/* NOTA DE CREDENCIALES PARA LA EXPOSICIÓN */}
        <div className="mt-8 p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl text-left relative z-10">
          <div className="flex items-center gap-2 text-blue-400 font-black text-xs uppercase tracking-widest mb-3">
            <Info size={14} /> Prueba estas credenciales:
          </div>
          <div className="flex gap-6">
            <div>
              <span className="text-slate-500 text-[10px] font-bold uppercase block">Usuario</span>
              <code className="text-white font-mono bg-white/5 px-2 py-1 rounded">admin</code>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] font-bold uppercase block">Contraseña</span>
              <code className="text-white font-mono bg-white/5 px-2 py-1 rounded">1234</code>
            </div>
          </div>
        </div>

        {status !== 'idle' && (
          <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 font-bold animate-slideUp ${status === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
            {status === 'success' ? <CheckCircle /> : <ShieldAlert />}
            {status === 'success' ? 'Backend respondió: Acceso Concedido' : 'Backend respondió: Acceso Denegado'}
          </div>
        )}
      </div>

      {/* Tarjeta Backend (Java) */}
      <div className="bg-slate-900/80 border border-indigo-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
          <Code2 size={100} />
        </div>
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-600 p-3 rounded-xl text-white">
            <Code2 size={24} />
          </div>
          <h3 className="text-2xl font-black text-white">Lógica del Servidor (Java Backend)</h3>
        </div>

        <div className="bg-slate-950 rounded-3xl p-6 font-mono text-sm md:text-base border border-white/5 relative z-10 overflow-x-auto">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <pre className="text-indigo-300 leading-relaxed">
            {javaCode.split('\n').map((line, i) => {
              // Simulación simple de resaltado de sintaxis
              const highlighted = line
                .replace(/@\w+/g, '<span class="text-pink-500">$&</span>')
                .replace(/public|String|return|new|if|else/g, '<span class="text-orange-400">$&</span>')
                .replace(/\/\/.*$/g, '<span class="text-slate-600">$&</span>')
                .replace(/ResponseEntity|LoginRequest|LoginResponse/g, '<span class="text-yellow-200">$&</span>');
              return (
                <div key={i} className="flex gap-4">
                  <span className="text-slate-700 select-none w-4">{i + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: highlighted }} />
                </div>
              );
            })}
          </pre>
        </div>

        <p className="mt-8 text-slate-400 italic text-sm text-left">
          * El Backend recibe los datos, los valida contra una base de datos y decide si permite o no la entrada.
        </p>
      </div>
    </div>
  );
};

export default LoginExample;
