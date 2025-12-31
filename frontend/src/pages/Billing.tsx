import { useState, useEffect } from 'react';
import { Search, Filter, Plus, FileText, AlertCircle, CheckCircle, Clock, Trash2, MoreVertical, Printer, Mail, Percent } from 'lucide-react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';

interface Loan {
  id: string;
  client: string;
  amount: number;
  installments: number;
  interestRate: number;
  nextDue: string;
  status: 'Em Dia' | 'Atrasado' | 'Pago';
  installmentValue: number;
}

const Billing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Em Dia' | 'Atrasado' | 'Pago'>('Todos');
  const [rateFilter, setRateFilter] = useState('');

  const [loans, setLoans] = useState<Loan[]>([
    { id: 'EMP-2024-001', client: 'João da Silva', amount: 5000.00, installments: 12, interestRate: 5, nextDue: '2025-08-10', status: 'Em Dia', installmentValue: 550.00 },
    { id: 'EMP-2024-002', client: 'Maria Oliveira', amount: 12000.00, installments: 24, interestRate: 4.5, nextDue: '2025-08-05', status: 'Atrasado', installmentValue: 800.00 },
    { id: 'EMP-2024-003', client: 'Carlos Santos', amount: 2500.00, installments: 6, interestRate: 10, nextDue: '-', status: 'Pago', installmentValue: 0.00 },
    { id: 'EMP-2024-004', client: 'Empresa X', amount: 50000.00, installments: 36, interestRate: 2.5, nextDue: '2025-09-01', status: 'Em Dia', installmentValue: 2100.00 },
  ]);

  const [formData, setFormData] = useState({
    client: '', amount: '', interestRate: '', installments: '', startDate: ''
  });

  const [simulation, setSimulation] = useState({ installment: 0, total: 0 });

  useEffect(() => {
    const amount = parseFloat(formData.amount) || 0;
    const rate = parseFloat(formData.interestRate) || 0;
    const months = parseInt(formData.installments) || 0;

    if (amount > 0 && months > 0) {
      const calculatedTotal = amount + (amount * (rate / 100));
      setSimulation({
        installment: calculatedTotal / months,
        total: calculatedTotal
      });
    } else {
      setSimulation({ installment: 0, total: 0 });
    }
  }, [formData.amount, formData.interestRate, formData.installments]);

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = 
      loan.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'Todos' || loan.status === statusFilter;
    const matchesRate = rateFilter === '' || loan.interestRate.toString().startsWith(rateFilter);

    return matchesSearch && matchesStatus && matchesRate;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newLoan: Loan = {
      id: `EMP-2025-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`,
      client: formData.client,
      amount: parseFloat(formData.amount),
      installments: parseInt(formData.installments),
      interestRate: parseFloat(formData.interestRate),
      nextDue: '2025-02-15',
      status: 'Em Dia',
      installmentValue: simulation.installment
    };

    setLoans([newLoan, ...loans]);
    setFormData({ client: '', amount: '', interestRate: '', installments: '', startDate: '' });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja cancelar este contrato?')) {
      setLoans(loans.filter(l => l.id !== id));
      setIsDetailsOpen(false);
    }
  };

  const handleOpenDetails = (loan: Loan) => {
    setSelectedLoan(loan);
    setIsDetailsOpen(true);
  };

  const handlePrint = () => {
    if (!selectedLoan) return;
    alert(`🖨️ Preparando impressão do Contrato: ${selectedLoan.id}\n\nO documento PDF foi enviado para a impressora padrão.`);
  };

  const handleEmail = () => {
    if (!selectedLoan) return;
    alert(`📧 Sucesso!\n\nO boleto atualizado e o contrato foram enviados para o e-mail cadastrado de ${selectedLoan.client}.`);
  };

  return (
    <Layout>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Cobrança e Empréstimos</h2>
          <p className="text-slate-500">Gestão de contratos ativos e fluxo de recebimentos.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
        >
          <Plus size={16} />
          Novo Contrato
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-400">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-500 text-sm font-medium">A Receber (Hoje)</span>
            <Clock size={20} className="text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">R$ 3.450,00</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-500 text-sm font-medium">Em Atraso</span>
            <AlertCircle size={20} className="text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">R$ 12.800,00</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-500 text-sm font-medium">Recebido (Mês)</span>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">R$ 45.200,00</h3>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar contrato ou cliente..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent input-focus"
            />
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors
              ${showFilters ? 'bg-primary text-white border-primary' : 'border-gray-200 text-slate-600 hover:bg-gray-50'}`}
          >
            <Filter size={16} />
            Filtros Avançados {(statusFilter !== 'Todos' || rateFilter !== '') && '(*)'}
          </button>
        </div>

        {showFilters && (
          <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row gap-6 animate-in items-center">
            
            <div className="flex gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase mr-1 self-center">Status:</span>
              {['Todos', 'Em Dia', 'Atrasado', 'Pago'].map((status) => (
                <button 
                  key={status}
                  onClick={() => setStatusFilter(status as any)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                    ${statusFilter === status 
                      ? 'bg-slate-800 text-white border-slate-800' 
                      : 'bg-white text-slate-600 border-gray-200 hover:bg-gray-50'}`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-400 uppercase mr-1">Taxa (%):</span>
              <div className="relative">
                <Percent size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="number" 
                  placeholder="Ex: 5" 
                  value={rateFilter}
                  onChange={(e) => setRateFilter(e.target.value)}
                  className="pl-8 pr-3 py-1 text-sm border border-gray-200 rounded-full w-32 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              {rateFilter && (
                 <button onClick={() => setRateFilter('')} className="text-xs text-red-500 hover:underline">Limpar</button>
              )}
            </div>

          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-slate-500 font-semibold">
              <th className="p-4">Contrato</th>
              <th className="p-4">Cliente</th>
              <th className="p-4 text-right">Valor Original</th>
              <th className="p-4 text-center">Taxa Total</th>
              <th className="p-4">Próx. Vencimento</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredLoans.map((loan) => (
              <tr key={loan.id} className="hover:bg-slate-50 transition-colors group">
                <td className="p-4 font-medium text-primary text-sm font-mono">{loan.id}</td>
                <td className="p-4 text-slate-700 font-medium">{loan.client}</td>
                <td className="p-4 text-slate-600 text-right">
                  R$ {loan.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} 
                  <span className="text-xs text-slate-400 ml-1 block">({loan.installments}x)</span>
                </td>
                <td className="p-4 text-center">
                  <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold font-mono">
                    {loan.interestRate}%
                  </span>
                </td>
                <td className="p-4 text-slate-700">
                  {loan.status !== 'Pago' ? (
                    <div>
                      {loan.nextDue}
                      <div className="text-xs text-slate-400 font-medium">R$ {loan.installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    </div>
                  ) : '-'}
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                    ${loan.status === 'Em Dia' ? 'bg-blue-100 text-blue-800' : 
                      loan.status === 'Atrasado' ? 'bg-red-100 text-red-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {loan.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleOpenDetails(loan)}
                      className="text-slate-400 hover:text-primary p-2 hover:bg-blue-50 rounded-full transition-colors" 
                      title="Ver Detalhes"
                    >
                      <MoreVertical size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(loan.id)}
                      className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors" 
                      title="Cancelar Contrato"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredLoans.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">Nenhum contrato encontrado com estes filtros.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Novo Contrato de Empréstimo"
      >
        <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cliente</label>
              <select 
                required
                value={formData.client}
                onChange={e => setFormData({...formData, client: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
              >
                <option value="">Selecione um cliente...</option>
                <option value="João da Silva">João da Silva</option>
                <option value="Maria Oliveira">Maria Oliveira</option>
                <option value="Novo Cliente Teste">Novo Cliente Teste</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Valor do Empréstimo (R$)</label>
                <input 
                  required
                  type="number" 
                  step="0.01"
                  value={formData.amount}
                  onChange={e => setFormData({...formData, amount: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" 
                  placeholder="0,00" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Taxa de Juros Total (%)</label>
                <input 
                  required
                  type="number" 
                  step="0.1"
                  value={formData.interestRate}
                  onChange={e => setFormData({...formData, interestRate: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" 
                  placeholder="Ex: 20" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data Início</label>
                <input 
                  required
                  type="date" 
                  value={formData.startDate}
                  onChange={e => setFormData({...formData, startDate: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Qtd. Parcelas</label>
                <input 
                  required
                  type="number" 
                  value={formData.installments}
                  onChange={e => setFormData({...formData, installments: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" 
                  placeholder="12" 
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-bold text-slate-800 mb-2">Simulação do Contrato</h4>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Valor da Parcela ({formData.installments || 0}x):</span>
                <span className="font-medium text-slate-800">
                  R$ {simulation.installment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 pt-2 mt-2">
                <span className="text-slate-500 font-medium">Total Final a Receber:</span>
                <span className="font-bold text-primary text-lg">
                  R$ {simulation.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <FileText size={18} />
                Gerar Contrato
              </button>
            </div>
        </form>
      </Modal>

      <Modal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)}
        title="Detalhes do Contrato"
      >
        {selectedLoan && (
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Número do Contrato</p>
                <p className="text-lg font-bold text-primary">{selectedLoan.id}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                ${selectedLoan.status === 'Em Dia' ? 'bg-blue-100 text-blue-800' : 
                  selectedLoan.status === 'Atrasado' ? 'bg-red-100 text-red-800' : 
                  'bg-green-100 text-green-800'}`}>
                {selectedLoan.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-500">Cliente</p>
                <p className="font-medium text-slate-800">{selectedLoan.client}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Valor Principal</p>
                <p className="font-medium text-slate-800">R$ {selectedLoan.amount.toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Taxa de Juros</p>
                <p className="font-medium text-slate-800">{selectedLoan.interestRate}% total</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Parcelas</p>
                <p className="font-medium text-slate-800">{selectedLoan.installments}x de R$ {selectedLoan.installmentValue.toLocaleString('pt-BR')}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 flex flex-col gap-3">
              <button 
                onClick={handlePrint}
                className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg text-slate-700 hover:bg-gray-50 transition-colors"
              >
                <Printer size={16} />
                Imprimir Contrato
              </button>
              <button 
                onClick={handleEmail}
                className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg text-slate-700 hover:bg-gray-50 transition-colors"
              >
                <Mail size={16} />
                Reenviar Boleto por E-mail
              </button>
              <button 
                onClick={() => handleDelete(selectedLoan.id)}
                className="w-full flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 size={16} />
                Excluir Contrato
              </button>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Billing;