import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  AlertCircle, 
  ShieldAlert, 
  Share2, 
  History, 
  Settings, 
  LogOut 
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/clients', label: 'Lista de Clientes', icon: Users },
    { path: '/billing', label: 'Cobrança', icon: FileText },
    { path: '/overdue', label: 'Atrasados', icon: AlertCircle },
    { path: '/blacklist', label: 'Lista Negra', icon: ShieldAlert },
    { path: '/affiliates', label: 'Lista de Afiliados', icon: Share2 },
    { path: '/history', label: 'Histórico', icon: History },
    { path: '/settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10 shadow-xl transition-all duration-300">
        
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent tracking-wide">
            CREDIT NOW
          </h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Sistema de Gestão</p>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-200 relative group
                      ${isActive 
                        ? 'bg-slate-800 text-yellow-400 border-r-4 border-yellow-400' 
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 hover:pl-7'
                      }`}
                  >
                    <Icon 
                      size={18} 
                      className={`transition-colors ${isActive ? 'text-yellow-400' : 'group-hover:text-white'}`} 
                    />
                    {item.label}
                    
                    {isActive && (
                      <div className="absolute inset-0 bg-yellow-400/5 pointer-events-none"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-800 transition-colors text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-yellow-400 text-slate-900 font-bold flex items-center justify-center text-sm shadow-lg shadow-yellow-900/20 group-hover:scale-105 transition-transform">
              AD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate group-hover:text-yellow-400 transition-colors">Administrador</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <LogOut size={10} />
                <span>Sair do Sistema</span>
              </div>
            </div>
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto animate-in">
          {children}
        </div>
      </main>
      
    </div>
  );
};

export default Layout;