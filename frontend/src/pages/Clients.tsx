import { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Phone, Mail, MapPin, Save, Trash2, X, User } from 'lucide-react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';

interface Client {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  status: 'Ativo' | 'Pendente' | 'Bloqueado';
  city: string;
}

const Clients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Ativo' | 'Pendente' | 'Bloqueado'>('Todos');
  const [showFilters, setShowFilters] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getAvatarColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pendente': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Bloqueado': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: 'João da Silva', cpf: '123.456.789-00', email: 'joao@email.com', phone: '(11) 99999-9999', status: 'Ativo', city: 'São Paulo, SP' },
    { id: 2, name: 'Maria Oliveira', cpf: '222.333.444-55', email: 'maria@email.com', phone: '(21) 98888-8888', status: 'Pendente', city: 'Rio de Janeiro, RJ' },
    { id: 3, name: 'Carlos Santos', cpf: '333.444.555-66', email: 'carlos@email.com', phone: '(31) 97777-7777', status: 'Bloqueado', city: 'Belo Horizonte, MG' },
    { id: 4, name: 'Ana Beatriz Souza', cpf: '999.888.777-66', email: 'ana.bia@email.com', phone: '(41) 96666-5555', status: 'Ativo', city: 'Curitiba, PR' },
  ]);

  const [formData, setFormData] = useState({
    name: '', cpf: '', email: '', phone: '', city: ''
  });

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cpf.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'Todos' || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: Client = {
      id: Date.now(),
      name: formData.name,
      cpf: formData.cpf,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      status: 'Ativo'
    };

    setClients([...clients, newClient]);
    setFormData({ name: '', cpf: '', email: '', phone: '', city: '' });
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  return (
    <Layout>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Gestão de Clientes</h2>
          <p className="text-slate-500">Visualize e gerencie a base de tomadores de empréstimo.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
        >
          <Plus size={16} />
          Novo Cliente
        </button>
      </header>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome, CPF ou email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent input-focus"
            />
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors
                ${showFilters ? 'bg-primary text-white border-primary' : 'border-gray-200 text-slate-600 hover:bg-gray-50'}`}
            >
              <Filter size={16} />
              Filtros {statusFilter !== 'Todos' && '(1)'}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="pt-4 border-t border-gray-100 flex gap-4 animate-in">
            {['Todos', 'Ativo', 'Pendente', 'Bloqueado'].map((status) => (
              <button 
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all
                  ${statusFilter === status 
                    ? 'bg-slate-800 text-white border-slate-800' 
                    : 'bg-white text-slate-600 border-gray-200 hover:bg-gray-50'}`}
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-slate-500 font-semibold">
              <th className="p-4">Cliente</th>
              <th className="p-4">Contatos</th>
              <th className="p-4">Localização</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border ${getAvatarColor(client.status)}`}>
                        {getInitials(client.name)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">{client.name}</div>
                        <div className="text-xs text-slate-400 font-mono">CPF: {client.cpf}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                      <Mail size={14} className="text-slate-400" /> {client.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone size={14} className="text-slate-400" /> {client.phone}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin size={14} className="text-slate-400" /> {client.city}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                      ${client.status === 'Ativo' ? 'bg-green-50 text-green-700 border-green-100' : 
                        client.status === 'Pendente' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : 
                        'bg-red-50 text-red-700 border-red-100'}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-slate-400 hover:text-primary p-2 hover:bg-blue-50 rounded-full transition-colors" title="Editar">
                        <MoreVertical size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(client.id)}
                        className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors" 
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <User size={32} className="text-slate-200" />
                    <p>Nenhum cliente encontrado.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Cadastrar Novo Cliente"
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                placeholder="Ex: João da Silva" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">CPF</label>
              <input 
                required
                type="text" 
                value={formData.cpf}
                onChange={e => setFormData({...formData, cpf: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                placeholder="000.000.000-00" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
              <input 
                required
                type="text" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                placeholder="(00) 00000-0000" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                placeholder="cliente@email.com" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Cidade - UF</label>
              <input 
                required
                type="text"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})} 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                placeholder="São Paulo, SP"
              />
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
              <Save size={18} />
              Salvar Cliente
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default Clients;