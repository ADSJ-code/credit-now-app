import { useState } from 'react';
import { Search, Calendar, Filter, FileText, User, Shield, AlertCircle, ChevronDown, RefreshCw, X } from 'lucide-react';
import Layout from '../components/Layout';

interface Log {
  id: number;
  user: string;
  action: string;
  target: string;
  date: string; 
  type: 'critical' | 'financial' | 'system';
}

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'Todos' | 'critical' | 'financial' | 'system'>('Todos');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | '7days' | '30days'>('all'); 
  
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const parseDate = (dateStr: string) => {
    const [day, month, yearPart] = dateStr.split('/');
    const [year, time] = yearPart.split(' ');
    const [hour, minute] = time.split(':');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));
  };

  const [logs, setLogs] = useState<Log[]>([
    { id: 1, user: 'Administrador', action: 'Bloqueio de CPF', target: 'Ricardo S. (333.***)', date: '15/07/2024 14:30', type: 'critical' },
    { id: 2, user: 'Operador 01', action: 'Novo Empréstimo', target: 'João da Silva', date: '15/07/2024 10:15', type: 'financial' },
    { id: 3, user: 'Administrador', action: 'Alteração de Taxa', target: 'Configurações Gerais', date: '14/07/2024 18:00', type: 'system' },
    { id: 4, user: 'Operador 02', action: 'Baixa de Parcela', target: 'Contrato #8829', date: '10/07/2024 09:45', type: 'financial' },
    { id: 5, user: 'Sistema', action: 'Backup Automático', target: 'Banco de Dados', date: '01/06/2024 03:00', type: 'system' },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return <Shield size={16} className="text-red-500" />;
      case 'financial': return <FileText size={16} className="text-green-500" />;
      default: return <AlertCircle size={16} className="text-blue-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'critical': return 'Segurança';
      case 'financial': return 'Financeiro';
      case 'system': return 'Sistema';
      default: return type;
    }
  };

  const getDateLabel = (filter: string) => {
    switch (filter) {
      case 'today': return 'Apenas Hoje';
      case '7days': return 'Últimos 7 Dias';
      case '30days': return 'Últimos 30 Dias';
      default: return 'Todo o Período';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'Todos' || log.type === typeFilter;

    let matchesDate = true;
    if (dateFilter !== 'all') {
      const logDate = parseDate(log.date);
      const now = new Date();
      const simulatedNow = new Date(2024, 6, 15, 23, 59); 

      const diffTime = Math.abs(simulatedNow.getTime() - logDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (dateFilter === 'today') matchesDate = diffDays <= 1 && logDate.getDate() === simulatedNow.getDate();
      if (dateFilter === '7days') matchesDate = diffDays <= 7;
      if (dateFilter === '30days') matchesDate = diffDays <= 30;
    }

    return matchesSearch && matchesType && matchesDate;
  });

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const moreLogs: Log[] = [
        { id: Math.random(), user: 'Sistema', action: 'Sincronização', target: 'API Externa', date: '13/07/2024 22:00', type: 'system' },
        { id: Math.random(), user: 'Operador 03', action: 'Consulta SPC', target: 'Maria B.', date: '13/07/2024 14:20', type: 'critical' },
        { id: Math.random(), user: 'Administrador', action: 'Login', target: 'Painel Web', date: '13/07/2024 08:00', type: 'system' },
      ];
      setLogs([...logs, ...moreLogs]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Histórico de Atividades</h2>
          <p className="text-slate-500">Logs de auditoria e rastreabilidade de ações no sistema.</p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowDateMenu(!showDateMenu)}
            className={`flex items-center gap-2 border px-4 py-2 rounded-lg text-sm transition-colors shadow-sm
              ${showDateMenu || dateFilter !== 'all' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-slate-600 hover:bg-gray-50'}`}
          >
            <Calendar size={16} />
            {getDateLabel(dateFilter)}
            <ChevronDown size={14} />
          </button>

          {showDateMenu && (
            <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              {['all', 'today', '7days', '30days'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => { setDateFilter(filter as any); setShowDateMenu(false); }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center justify-between
                    ${dateFilter === filter ? 'text-primary font-bold bg-blue-50' : 'text-slate-600'}`}
                >
                  {getDateLabel(filter)}
                  {dateFilter === filter && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por usuário, ação ou detalhe..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowTypeMenu(!showTypeMenu)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors w-40 justify-between
              ${showTypeMenu || typeFilter !== 'Todos' ? 'border-primary text-primary bg-blue-50' : 'border-gray-200 text-slate-600 hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-2">
              <Filter size={16} />
              {typeFilter === 'Todos' ? 'Tipo' : getTypeLabel(typeFilter)}
            </div>
            <ChevronDown size={14} />
          </button>

          {showTypeMenu && (
            <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              {['Todos', 'critical', 'financial', 'system'].map((type) => (
                <button
                  key={type}
                  onClick={() => { setTypeFilter(type as any); setShowTypeMenu(false); }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-slate-600 flex items-center gap-2"
                >
                  {type !== 'Todos' && getIcon(type)}
                  {type === 'Todos' ? 'Todos os Tipos' : getTypeLabel(type)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-slate-500 font-semibold">
                <th className="p-4 w-10">Tipo</th>
                <th className="p-4">Data e Hora</th>
                <th className="p-4">Usuário Responsável</th>
                <th className="p-4">Ação Realizada</th>
                <th className="p-4">Alvo / Detalhes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors text-sm">
                    <td className="p-4">
                      <div className="bg-gray-50 p-2 rounded-full w-fit border border-gray-200">
                        {getIcon(log.type)}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 font-mono">
                      {log.date}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-slate-400" />
                        <span className="font-medium text-slate-700">{log.user}</span>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-800">
                      {log.action}
                    </td>
                    <td className="p-4 text-slate-600">
                      {log.target}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Nenhum log encontrado neste período.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
          <button 
            onClick={handleLoadMore}
            disabled={isLoading}
            className="text-sm text-primary hover:text-slate-800 font-medium flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw size={14} className="animate-spin" /> Carregando...
              </>
            ) : (
              'Carregar mais registros antigos...'
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default History;