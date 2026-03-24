import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import { colibriTheme } from './theme/colibri-theme';
import { menuItems } from './mock/data';

import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import RoleSelectorPage from './pages/RoleSelectorPage';
import HomePage from './pages/HomePage';
import TriagemPage from './pages/TriagemPage';
import MatchingPage from './pages/MatchingPage';
import AgendaPage from './pages/AgendaPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProntuarioPage from './pages/ProntuarioPage';
import MeuPerfilPage from './pages/MeuPerfilPage';
import MinhasConsultasPage from './pages/MinhasConsultasPage';
import ProfAgendaPage from './pages/ProfAgendaPage';
import ProfPacientesPage from './pages/ProfPacientesPage';
import ProfFinanceiroPage from './pages/ProfFinanceiroPage';
import ProfPerfilPage from './pages/ProfPerfilPage';
import AdminProfissionaisPage from './pages/AdminProfissionaisPage';
import AdminPacientesPage from './pages/AdminPacientesPage';
import AdminConsultasPage from './pages/AdminConsultasPage';
import AdminFinanceiroPage from './pages/AdminFinanceiroPage';
import AdminAprovacoesPage from './pages/AdminAprovacoesPage';
import AdminRelatoriosPage from './pages/AdminRelatoriosPage';
import AdminConfiguracoesPage from './pages/AdminConfiguracoesPage';
import AdminAcessosPage from './pages/AdminAcessosPage';

function App() {
  return (
    <ThemeProvider theme={colibriTheme}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Role Selector */}
          <Route path="/" element={<RoleSelectorPage />} />

          {/* Patient Routes */}
          <Route element={<MainLayout role="patient" menuItems={menuItems.patient} userName="Maria Silva" />}>
            <Route path="/patient" element={<HomePage />} />
            <Route path="/triagem" element={<TriagemPage />} />
            <Route path="/matching" element={<MatchingPage />} />
            <Route path="/agenda/:professionalId" element={<AgendaPage />} />
            <Route path="/checkout/:professionalId" element={<CheckoutPage />} />
            <Route path="/minhas-consultas" element={<MinhasConsultasPage />} />
            <Route path="/perfil" element={<MeuPerfilPage />} />
          </Route>

          {/* Professional Routes */}
          <Route element={<MainLayout role="professional" menuItems={menuItems.professional} userName="Dra. Ana Beatriz" />}>
            <Route path="/professional" element={<ProfessionalDashboard />} />
            <Route path="/profissional" element={<ProfessionalDashboard />} />
            <Route path="/profissional/agenda" element={<ProfAgendaPage />} />
            <Route path="/profissional/pacientes" element={<ProfPacientesPage />} />
            <Route path="/profissional/prontuarios" element={<ProntuarioPage />} />
            <Route path="/profissional/financeiro" element={<ProfFinanceiroPage />} />
            <Route path="/profissional/perfil" element={<ProfPerfilPage />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<MainLayout role="admin" menuItems={menuItems.admin} userName="Rodrigo Admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/profissionais" element={<AdminProfissionaisPage />} />
            <Route path="/admin/pacientes" element={<AdminPacientesPage />} />
            <Route path="/admin/consultas" element={<AdminConsultasPage />} />
            <Route path="/admin/financeiro" element={<AdminFinanceiroPage />} />
            <Route path="/admin/aprovacoes" element={<AdminAprovacoesPage />} />
            <Route path="/admin/relatorios" element={<AdminRelatoriosPage />} />
            <Route path="/admin/acessos" element={<AdminAcessosPage />} />
            <Route path="/admin/configuracoes" element={<AdminConfiguracoesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
