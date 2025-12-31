import { useState } from 'react';
import { Save, Building, DollarSign, Shield, Bell, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'geral' | 'financeiro' | 'seguranca'>('geral');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [general, setGeneral] = useState({
    companyName: 'Credit Now Financeira',
    cnpj: '12.345.678/0001-90',
    email: 'contato@creditnow.com',
    phone: '(11) 3000-0000',
    address: 'Av. Paulista, 1000 - São Paulo, SP'
  });

  const [financial, setFinancial] = useState({
    baseInterestRate: '5.0',
    lateFee: '2.0',
    dailyInterest: '0.1',
    defaultDueDay: '10',
    pixKey: '12.345.678/0001-90'
  });

  const [security, setSecurity] = useState({
    autoBackup: true,
    twoFactor: true,
    sessionTimeout: '30',
    allowExternalAccess: false
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowSuccess(false);

    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <Layout>
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Configurações do Sistema</h2>
        <p className="text-slate-500">Gerencie parâmetros globais, taxas e preferências.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('geral')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left
                ${activeTab === 'geral' ? 'bg-primary text-white shadow-md' : 'bg-white text-slate-600 hover:bg-gray-50'}`}
            >
              <Building size={18} />
              Dados da Empresa
            </button>
            <button 
              onClick={() => setActiveTab('financeiro')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left
                ${activeTab === 'financeiro' ? 'bg-primary text-white shadow-md' : 'bg-white text-slate-600 hover:bg-gray-50'}`}
            >
              <DollarSign size={18} />
              Parâmetros Financeiros
            </button>
            <button 
              onClick={() => setActiveTab('seguranca')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left
                ${activeTab === 'seguranca' ? 'bg-primary text-white shadow-md' : 'bg-white text-slate-600 hover:bg-gray-50'}`}
            >
              <Shield size={18} />
              Segurança e Sistema
            </button>
          </nav>

          <div className="mt-8 bg-green-50 p-4 rounded-xl border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-green-700 uppercase">Sistema Online</span>
            </div>
            <p className="text-xs text-green-800">Versão 2.4.0</p>
            <p className="text-xs text-green-600 mt-1">Último backup: Hoje 03:00</p>
          </div>
        </aside>

        <div className="flex-1">
          <form onSubmit={handleSave} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
            
            {showSuccess && (
              <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <CheckCircle size={16} />
                Alterações salvas com sucesso!
              </div>
            )}

            {activeTab === 'geral' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-slate-800 border-b border-gray-100 pb-2">Identidade da Empresa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nome Fantasia</label>
                    <input type="text" value={general.companyName} onChange={e => setGeneral({...general, companyName: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">CNPJ</label>
                    <input type="text" value={general.cnpj} onChange={e => setGeneral({...general, cnpj: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Telefone Principal</label>
                    <input type="text" value={general.phone} onChange={e => setGeneral({...general, phone: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Endereço Completo</label>
                    <input type="text" value={general.address} onChange={e => setGeneral({...general, address: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'financeiro' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-slate-800 border-b border-gray-100 pb-2">Regras de Cobrança</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Taxa de Juros Padrão (%)</label>
                    <input type="number" step="0.1" value={financial.baseInterestRate} onChange={e => setFinancial({...financial, baseInterestRate: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                    <p className="text-xs text-slate-500 mt-1">Aplicado ao valor total do empréstimo.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Multa por Atraso (%)</label>
                    <input type="number" step="0.1" value={financial.lateFee} onChange={e => setFinancial({...financial, lateFee: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                    <p className="text-xs text-slate-500 mt-1">Cobrada uma única vez após vencimento.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Juros Diários (Mora %)</label>
                    <input type="number" step="0.01" value={financial.dailyInterest} onChange={e => setFinancial({...financial, dailyInterest: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Dia de Vencimento Padrão</label>
                    <select value={financial.defaultDueDay} onChange={e => setFinancial({...financial, defaultDueDay: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white">
                      <option value="5">Dia 05</option>
                      <option value="10">Dia 10</option>
                      <option value="15">Dia 15</option>
                      <option value="20">Dia 20</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Chave PIX Padrão para Recebimento</label>
                    <input type="text" value={financial.pixKey} onChange={e => setFinancial({...financial, pixKey: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-gray-50 font-mono text-slate-600" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seguranca' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-slate-800 border-b border-gray-100 pb-2">Segurança e Sistema</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-800">Backup Automático</h4>
                      <p className="text-xs text-slate-500">Realizar cópia do banco de dados todo dia às 03:00.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={security.autoBackup} onChange={e => setSecurity({...security, autoBackup: e.target.checked})} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-800">Autenticação de Dois Fatores (2FA)</h4>
                      <p className="text-xs text-slate-500">Exigir código por email para login de novos dispositivos.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={security.twoFactor} onChange={e => setSecurity({...security, twoFactor: e.target.checked})} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-red-100 bg-red-50 rounded-lg">
                    <div className="flex gap-3">
                      <AlertTriangle className="text-red-500" />
                      <div>
                        <h4 className="font-bold text-red-800">Zona de Perigo</h4>
                        <p className="text-xs text-red-700">Reiniciar todas as configurações para o padrão de fábrica.</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => alert('Ação bloqueada: Requer senha de Super Admin.')} className="px-3 py-1 bg-white border border-red-200 text-red-600 text-xs font-bold rounded hover:bg-red-100">
                      Resetar
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
              <button 
                type="submit" 
                disabled={isLoading}
                className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-all disabled:opacity-70 disabled:cursor-wait shadow-lg shadow-slate-900/20"
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    Salvando alterações...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Salvar Configurações
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;