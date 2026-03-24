import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs, Link, Typography, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import { tokens } from '../theme/colibri-theme';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

const routeLabels: Record<string, string> = {
  '/patient': 'Início',
  '/triagem': 'Triagem',
  '/matching': 'Resultados',
  '/agenda': 'Agendar',
  '/checkout': 'Checkout',
  '/minhas-consultas': 'Minhas Consultas',
  '/perfil': 'Meu Perfil',
  '/profissional': 'Dashboard',
  '/profissional/agenda': 'Agenda',
  '/profissional/pacientes': 'Pacientes',
  '/profissional/prontuarios': 'Prontuários',
  '/profissional/financeiro': 'Financeiro',
  '/profissional/perfil': 'Perfil',
  '/admin': 'Dashboard',
  '/admin/profissionais': 'Profissionais',
  '/admin/pacientes': 'Pacientes',
  '/admin/consultas': 'Consultas',
  '/admin/financeiro': 'Financeiro',
  '/admin/aprovacoes': 'Aprovações',
  '/admin/relatorios': 'Relatórios',
  '/admin/acessos': 'Gestão de Acessos',
  '/admin/configuracoes': 'Configurações',
};

const homeRoutes: Record<string, string> = {
  patient: '/patient',
  professional: '/profissional',
  admin: '/admin',
};

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const role = pathname.startsWith('/admin')
    ? 'admin'
    : pathname.startsWith('/profissional') || pathname.startsWith('/professional')
      ? 'professional'
      : 'patient';

  const homePath = homeRoutes[role];
  const crumbs: BreadcrumbItem[] = [{ label: 'Início', path: homePath }];

  if (pathname === homePath || pathname === '/professional') {
    return crumbs;
  }

  const exactLabel = routeLabels[pathname];
  if (exactLabel) {
    crumbs.push({ label: exactLabel });
    return crumbs;
  }

  const basePath = '/' + pathname.split('/').filter(Boolean).slice(0, -1).join('/');
  const baseLabel = routeLabels[basePath];
  if (baseLabel) {
    crumbs.push({ label: baseLabel, path: basePath });
  }

  if (pathname.includes('/agenda/')) {
    crumbs.push({ label: 'Agendar Consulta' });
  } else if (pathname.includes('/checkout/')) {
    crumbs.push({ label: 'Confirmar Agendamento' });
  } else {
    const lastSegment = pathname.split('/').filter(Boolean).pop() || '';
    crumbs.push({ label: lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) });
  }

  return crumbs;
}

export default function AppBreadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const crumbs = buildBreadcrumbs(location.pathname);

  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon sx={{ fontSize: 16, color: tokens.colors.text.secondary }} />}
      aria-label="Navegação de breadcrumb"
      sx={{ mb: 2 }}
    >
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;

        if (isLast) {
          return (
            <Typography
              key={crumb.label}
              variant="body2"
              fontWeight={600}
              color="text.primary"
              aria-current="page"
            >
              {crumb.label}
            </Typography>
          );
        }

        return (
          <Link
            key={crumb.label}
            component="button"
            variant="body2"
            underline="hover"
            color="text.secondary"
            onClick={() => crumb.path && navigate(crumb.path)}
            sx={{
              display: 'flex', alignItems: 'center', gap: 0.5,
              cursor: 'pointer',
              '&:hover': { color: tokens.colors.primary.main },
            }}
          >
            {index === 0 && <HomeIcon sx={{ fontSize: 16 }} />}
            {crumb.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
