import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, Mail, ArrowRight, CheckCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      localStorage.setItem('token', 'fake-jwt-token');
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    alert('Simulação: Redirecionando para OAuth Google...');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans relative overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl flex w-full max-w-5xl overflow-hidden min-h-[600px] animate-in fade-in zoom-in-95 duration-300 relative z-10">
        
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 relative">
          <div className="max-w-md mx-auto w-full space-y-6">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-yellow-400 font-bold">CN</div>
                <span className="font-bold text-slate-900 text-lg tracking-tight">Credit Now</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Bem-vindo de volta</h1>
              <p className="text-slate-500">Insira suas credenciais para acessar o painel.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Email Corporativo</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium text-slate-700"
                      placeholder="seu.nome@creditnow.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Senha</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium text-slate-700"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="ml-2 text-sm text-slate-600 font-medium">Manter conectado</span>
                </label>
                <a href="#" className="text-sm font-bold text-primary hover:text-slate-800 transition-colors">Recuperar senha?</a>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full group flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl shadow-lg shadow-primary/30 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-wait disabled:translate-y-0"
              >
                {isLoading ? 'Verificando...' : (
                  <>
                    Acessar Painel <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-slate-200 w-full absolute"></div>
              <span className="bg-white px-3 text-xs font-medium text-slate-400 relative z-10 uppercase">ou continue com</span>
            </div>

            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center gap-3 py-3 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Entrar com Google
            </button>

            <div className="pt-4 text-center">
               <p className="text-xs text-slate-400">Protegido por reCAPTCHA e sujeito à Política de Privacidade.</p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-30 -ml-16 -mb-16 pointer-events-none"></div>
          
          <div className="relative z-10 mt-10">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-inner">
               <LogIn className="text-yellow-400" size={32} />
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-4">Gestão Financeira <br/>Segura e Inteligente</h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              Plataforma unificada para controle de contratos, análise de risco e automação de cobranças.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
              <CheckCircle size={18} className="text-green-400" />
              <span>Criptografia de ponta a ponta</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
              <CheckCircle size={18} className="text-green-400" />
              <span>Monitoramento em tempo real</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
              <CheckCircle size={18} className="text-green-400" />
              <span>Backup automático diário</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-mono relative z-10 mt-8">System v2.4.0</p>
        </div>

      </div>
    </div>
  );
};

export default Login;