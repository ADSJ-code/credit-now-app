import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, AlertTriangle, TrendingUp, Plus, Search, FileText, ArrowRight, Calendar } from 'lucide-react';
import Layout from '../components/Layout';

const Dashboard = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'hoje' | 'semana' | 'mes'>('mes');

  const data = {
    hoje: {
      invested: 5200.00,
      received: 1250.00,
      overdue: 0.00,
      profit: 150.00,
      activeLoans: 3,
      newClients: 1,
      chart: { received: 25, pending: 75 }
    },
    semana: {
      invested: 35400.00,
      received: 12800.00,
      overdue: 2500.00,
      profit: 3200.00,
      activeLoans: 15,
      newClients: 8,
      chart: { received: 45, pending: 55 }
    },
    mes: {
      invested: 158900.00,
      received: 45200.00,
      overdue: 12800.00,
      profit: 15400.00,
      activeLoans: 142,
      newClients: 45,
      chart: { received: 65, pending: 35 }
    }
  };

  const currentData = data[period];

  const recentActivities = [
    { id: 1, type: 'recebimento', text: 'Pagamento recebido de João da Silva', time: '10 min atrás', value: '+ R$ 550,00' },
    { id: 2, type: 'novo_contrato', text: 'Novo empréstimo para Maria Oliveira', time: '2 horas atrás', value: 'R$ 12.000,00' },
    { id: 3, type: 'atraso', text: 'Parcela vencida de Carlos Santos', time: '5 horas atrás', value: 'Alertar' },
    { id: 4, type: 'novo_cliente', text: 'Novo cliente cadastrado: Pedro Souza', time: '1 dia atrás', value: '-' },
  ];

  return (
    <Layout>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard Geral</h2>
          <p className="text-slate-500">Visão geral da performance da Credit Now.</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
          <button 
            onClick={() => setPeriod('hoje')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${period === 'hoje' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-gray-50'}`}
          >
            Hoje
          </button>
          <button 
            onClick={() => setPeriod('semana')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${period === 'semana' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-gray-50'}`}
          >
            7 Dias
          </button>
          <button 
            onClick={() => setPeriod('mes')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${period === 'mes' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-gray-50'}`}
          >
            Este Mês
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-primary rounded-lg">
              <DollarSign size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">Total Emprestado</h3>
          <p className="text-2xl font-bold text-slate-800">R$ {currentData.invested.toLocaleString('pt-BR')}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+8.5%</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">Total Recebido</h3>
          <p className="text-2xl font-bold text-slate-800">R$ {currentData.received.toLocaleString('pt-BR')}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              <AlertTriangle size={24} />
            </div>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">-2.4%</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">Inadimplência</h3>
          <p className="text-2xl font-bold text-slate-800">R$ {currentData.overdue.toLocaleString('pt-BR')}</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl shadow-lg text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/10 rounded-lg text-secondary">
              <DollarSign size={24} />
            </div>
          </div>
          <h3 className="text-slate-300 text-sm font-medium mb-1">Lucro Líquido Estimado</h3>
          <p className="text-2xl font-bold text-white">R$ {currentData.profit.toLocaleString('pt-BR')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-slate-800">Fluxo Financeiro do Período</h3>
              <button className="text-primary text-sm font-medium hover:underline">Ver Relatório Completo</button>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Recebido vs Esperado</span>
                  <span className="font-bold text-slate-800">{currentData.chart.received}% da Meta</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${currentData.chart.received}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-xs text-slate-500 mb-1">Contratos Ativos</p>
                  <p className="text-xl font-bold text-slate-800">{currentData.activeLoans}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-xs text-slate-500 mb-1">Novos Clientes</p>
                  <p className="text-xl font-bold text-slate-800">+{currentData.newClients}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-slate-800 mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                onClick={() => navigate('/billing')}
                className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-blue-50 transition-all group"
              >
                <div className="p-3 bg-blue-100 text-primary rounded-full mb-2 group-hover:scale-110 transition-transform">
                  <Plus size={20} />
                </div>
                <span className="text-sm font-medium text-slate-700">Novo Empréstimo</span>
              </button>

              <button 
                onClick={() => navigate('/clients')}
                className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-blue-50 transition-all group"
              >
                <div className="p-3 bg-purple-100 text-purple-600 rounded-full mb-2 group-hover:scale-110 transition-transform">
                  <Users size={20} />
                </div>
                <span className="text-sm font-medium text-slate-700">Adicionar Cliente</span>
              </button>

              <button 
                onClick={() => navigate('/clients')}
                className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-blue-50 transition-all group"
              >
                <div className="p-3 bg-green-100 text-green-600 rounded-full mb-2 group-hover:scale-110 transition-transform">
                  <Search size={20} />
                </div>
                <span className="text-sm font-medium text-slate-700">Consultar CPF</span>
              </button>

              <button 
                onClick={() => navigate('/overdue')}
                className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-blue-50 transition-all group"
              >
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full mb-2 group-hover:scale-110 transition-transform">
                  <FileText size={20} />
                </div>
                <span className="text-sm font-medium text-slate-700">Relatórios</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-800">Atividade Recente</h3>
            <button 
              onClick={() => navigate('/history')}
              className="text-primary text-xs font-medium hover:underline flex items-center gap-1"
            >
              Ver tudo <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4 items-start">
                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0
                  ${activity.type === 'recebimento' ? 'bg-green-500' : 
                    activity.type === 'atraso' ? 'bg-red-500' : 'bg-blue-500'}`} 
                />
                <div>
                  <p className="text-sm font-medium text-slate-800 leading-tight">{activity.text}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
                {activity.value !== '-' && (
                  <span className={`ml-auto text-xs font-bold whitespace-nowrap
                    ${activity.type === 'recebimento' ? 'text-green-600' : 
                      activity.type === 'atraso' ? 'text-red-600 bg-red-50 px-2 py-1 rounded' : 'text-slate-600'}`}
                  >
                    {activity.value}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <div className="flex items-center gap-3">
                <Calendar className="text-indigo-600" size={20} />
                <div>
                  <p className="text-sm font-bold text-indigo-900">Agenda de Cobrança</p>
                  <p className="text-xs text-indigo-700">5 clientes para contatar hoje</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/overdue')}
                className="bg-white text-indigo-600 px-3 py-1 rounded text-xs font-bold shadow-sm hover:bg-indigo-50"
              >
                Abrir
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;