import { useState } from 'react';
import { Search, Filter, AlertTriangle, Phone, MessageCircle, MoreHorizontal, ArrowUpRight, CheckCircle, Gavel, Ban, FileText, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';

interface Debtor {
  id: number;
  name: string;
  contract: string;
  days: number;
  amount: number;
  updatedAmount: number;
  phone: string;
  status: 'Crítico' | 'Recente' | 'Promessa de Pagamento';
}

const Overdue = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'Todos' | 'Crítico' | 'Recente'>('Todos');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  
  const [selectedDebtor, setSelectedDebtor] = useState<Debtor | null>(null);

  const [debtors, setDebtors] = useState<Debtor[]>([
    { id: 1, name: 'Karmen d.', contract: 'EMP-2024-045', days: 14, amount: 1250.00, updatedAmount: 1345.50, phone: '(11) 99999-0000', status: 'Crítico' },
    { id: 2, name: 'Leidiane Pereira', contract: 'EMP-2024-032', days: 17, amount: 800.00, updatedAmount: 890.20, phone: '(21) 98888-1111', status: 'Crítico' },
    { id: 3, name: 'Danilo Mendes', contract: 'EMP-2024-018', days: 18, amount: 2500.00, updatedAmount: 2850.00, phone: '(31) 97777-2222', status: 'Crítico' },
    { id: 4, name: 'Roberto Firmino', contract: 'EMP-2024-050', days: 5, amount: 350.00, updatedAmount: 365.00, phone: '(41) 96666-3333', status: 'Recente' },
  ]);

  const filteredDebtors = debtors.filter(d => {
    const matchesSearch = 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      d.contract.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'Todos' || d.status === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleWhatsApp = (debtor: Debtor) => {
    const message = `Olá ${debtor.name}, somos da Credit Now. Consta em nosso sistema uma pendência de R$ ${debtor.updatedAmount.toLocaleString('pt-BR')} referente ao contrato ${debtor.contract}. Podemos negociar uma condição especial para hoje?`;
    const url = `https://wa.me/55${debtor.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleRegisterAgreement = () => {
    if (selectedDebtor) {
      const updatedList = debtors.map(d => 
        d.id === selectedDebtor.id 
          ? { ...d, status: 'Promessa de Pagamento' as const } 
          : d
      );
      setDebtors(updatedList);
      setIsModalOpen(false);
      alert(`✅ Sucesso!\n\nAcordo registrado para ${selectedDebtor.name}. O sistema de cobrança automática foi pausado por 48h.`);
    }
  };

  const handleCall = (debtor: Debtor) => {
    alert(`📞 Iniciando discagem VoIP para ${debtor.name} (${debtor.phone})...\n\nConectando ao ramal...`);
  };

  const handleEfficiencyDetails = () => {
    alert(`📊 Relatório de Eficiência de Contato\n\n• Melhor horário: 14:00 às 16:00\n• Taxa de Atendimento: 68%\n• Tempo Médio de Falada: 3m 45s\n• Chamadas Realizadas Hoje: 45`);
  };

  const handleOpenOptions = (debtor: Debtor) => {
    setSelectedDebtor(debtor);
    setIsOptionsModalOpen(true);
  };

  const handleAction = (action: string) => {
    setIsOptionsModalOpen(false);
    alert(`⚠️ Ação Executada: ${action}\n\nO comando foi enviado para o departamento jurídico/administrativo.`);
  };

  return (
    <Layout>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            Gestão de Inadimplência
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold">{debtors.length} Casos</span>
          </h2>
          <p className="text-slate-500">Recuperação de crédito e gestão de contratos em atraso.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setFilterType(filterType === 'Todos' ? 'Crítico' : 'Todos')}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors
              ${filterType === 'Crítico' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-gray-200 text-slate-600 hover:bg-gray-50'}`}
          >
            <Filter size={16} />
            {filterType === 'Crítico' ? 'Mostrando Críticos' : 'Filtrar por Gravidade'}
          </button>
          <button 
            onClick={() => setIsRuleModalOpen(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20"
          >
            <AlertTriangle size={16} />
            Régua de Cobrança
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex justify-between items-start mb-2">
            <span className="text-white/80 text-sm font-medium">Total em Atraso</span>
            <AlertTriangle size={20} className="text-white" />
          </div>
          <h3 className="text-3xl font-bold">R$ 42.850,00</h3>
          <p className="text-white/70 text-xs mt-1">Acumulado (+12% vs mês anterior)</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-500 text-sm font-medium">Recuperado Hoje</span>
            <ArrowUpRight size={20} className="text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">R$ 1.250,00</h3>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '35%' }}></div>
          </div>
          <p className="text-slate-400 text-xs mt-1">Meta diária: 35%</p>
        </div>

        <div 
          onClick={handleEfficiencyDetails}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all group"
          title="Clique para ver detalhes"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-500 text-sm font-medium">Eficiência de Contato</span>
            <div className="p-1 bg-blue-50 text-primary rounded-lg group-hover:scale-110 transition-transform">
              <Phone size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">68%</h3>
          <p className="text-slate-400 text-xs mt-1 flex items-center gap-1">
             <Clock size={12} /> Melhor horário: 14h-16h
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar devedor por nome, contrato ou CPF..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent input-focus"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-slate-500 font-semibold">
              <th className="p-4">Devedor / Contrato</th>
              <th className="p-4">Dias em Atraso</th>
              <th className="p-4 text-right">Valor Original</th>
              <th className="p-4 text-right">Valor Atualizado (+Juros)</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Ações de Cobrança</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredDebtors.map((debtor) => (
              <tr key={debtor.id} className="hover:bg-slate-50 transition-colors group">
                <td className="p-4">
                  <div className="font-bold text-slate-800">{debtor.name}</div>
                  <div className="text-xs text-slate-500 font-mono">{debtor.contract}</div>
                </td>
                <td className="p-4">
                  <span className="font-bold text-red-600">{debtor.days} dias</span>
                  <div className="text-xs text-slate-400">Venceu há {(debtor.days / 7).toFixed(0)} semanas</div>
                </td>
                <td className="p-4 text-slate-600 text-right">
                  R$ {debtor.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td className="p-4 font-bold text-slate-800 text-right">
                  R$ {debtor.updatedAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold
                    ${debtor.status === 'Crítico' ? 'bg-red-100 text-red-800' : 
                      debtor.status === 'Promessa de Pagamento' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                    
                    {debtor.status === 'Crítico' && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                    
                    {debtor.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleWhatsApp(debtor)}
                      className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors" 
                      title="Cobrar no WhatsApp"
                    >
                      <MessageCircle size={18} />
                    </button>
                    <button 
                      onClick={() => handleCall(debtor)}
                      className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors" 
                      title="Ligar Agora"
                    >
                      <Phone size={18} />
                    </button>
                    <button 
                      onClick={() => { setSelectedDebtor(debtor); setIsModalOpen(true); }}
                      className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors" 
                      title="Registrar Acordo"
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button 
                      onClick={() => handleOpenOptions(debtor)}
                      className="p-2 hover:bg-gray-100 text-slate-400 rounded-lg transition-colors"
                      title="Mais Opções"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredDebtors.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">Nenhum devedor encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Registrar Acordo / Contato"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-1">Cliente: {selectedDebtor?.name}</h4>
            <p className="text-sm text-blue-700">Ao registrar um acordo, o status do cliente mudará para "Promessa de Pagamento" e a cobrança automática será pausada por 48h.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Data Prevista para Pagamento</label>
            <input type="date" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Observações do Contato</label>
            <textarea 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none h-24" 
              placeholder="Ex: Cliente informou que vai depositar amanhã..."
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
             <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={handleRegisterAgreement}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <CheckCircle size={18} />
              Confirmar Acordo
            </button>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={isRuleModalOpen} 
        onClose={() => setIsRuleModalOpen(false)}
        title="Régua de Cobrança Automatizada"
      >
        <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 py-2">
          <div className="relative pl-8">
            <span className="absolute -left-[9px] top-0 bg-green-500 h-4 w-4 rounded-full border-2 border-white shadow"></span>
            <h4 className="font-bold text-slate-800">Dia 1: Lembrete Amigável</h4>
            <p className="text-sm text-slate-500">Envio automático de SMS e E-mail lembrando do vencimento.</p>
          </div>
          <div className="relative pl-8">
            <span className="absolute -left-[9px] top-0 bg-blue-500 h-4 w-4 rounded-full border-2 border-white shadow"></span>
            <h4 className="font-bold text-slate-800">Dia 5: Contato Telefônico</h4>
            <p className="text-sm text-slate-500">O cliente entra na fila de discagem para operadores.</p>
          </div>
          <div className="relative pl-8">
            <span className="absolute -left-[9px] top-0 bg-yellow-500 h-4 w-4 rounded-full border-2 border-white shadow"></span>
            <h4 className="font-bold text-slate-800">Dia 15: Bloqueio de Novos Créditos</h4>
            <p className="text-sm text-slate-500">CPF é inserido temporariamente na lista de restrição interna.</p>
          </div>
          <div className="relative pl-8">
            <span className="absolute -left-[9px] top-0 bg-red-600 h-4 w-4 rounded-full border-2 border-white shadow"></span>
            <h4 className="font-bold text-slate-800">Dia 30: Negativação (SPC/Serasa)</h4>
            <p className="text-sm text-slate-500">Envio automático para os órgãos de proteção ao crédito.</p>
          </div>
        </div>
        <div className="mt-6 p-3 bg-gray-50 text-xs text-center text-slate-500 rounded">
          Configuração definida pelo Administrador em 10/01/2024.
        </div>
      </Modal>

      <Modal 
        isOpen={isOptionsModalOpen} 
        onClose={() => setIsOptionsModalOpen(false)}
        title={`Ações para ${selectedDebtor?.name}`}
      >
        <div className="grid gap-3">
          <button 
            onClick={() => handleAction('Ver Histórico Completo')}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="p-2 bg-blue-50 text-blue-600 rounded">
              <FileText size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Ver Contrato Original</h4>
              <p className="text-xs text-slate-500">Visualizar PDF assinado e termos.</p>
            </div>
          </button>

          <button 
            onClick={() => handleAction('Negativação SPC/Serasa')}
            className="flex items-center gap-3 p-4 border border-red-200 bg-red-50/50 rounded-lg hover:bg-red-50 transition-colors text-left"
          >
            <div className="p-2 bg-red-100 text-red-600 rounded">
              <Ban size={20} />
            </div>
            <div>
              <h4 className="font-bold text-red-800">Negativar Cliente (SPC)</h4>
              <p className="text-xs text-red-600">Enviar nome para lista de restrição externa.</p>
            </div>
          </button>

          <button 
            onClick={() => handleAction('Processo Jurídico')}
            className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left"
          >
            <div className="p-2 bg-slate-100 text-slate-600 rounded">
              <Gavel size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Iniciar Processo Jurídico</h4>
              <p className="text-xs text-slate-500">Encaminhar caso para o escritório de advocacia.</p>
            </div>
          </button>
        </div>
      </Modal>

    </Layout>
  );
};

export default Overdue;