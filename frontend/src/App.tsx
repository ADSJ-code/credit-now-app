import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Billing from './pages/Billing';
import Overdue from './pages/Overdue';
import Blacklist from './pages/Blacklist';
import Affiliates from './pages/Affiliates';
import History from './pages/History';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/overdue" element={<Overdue />} />
        <Route path="/blacklist" element={<Blacklist />} />
        <Route path="/affiliates" element={<Affiliates />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;