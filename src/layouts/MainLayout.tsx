import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton, Avatar, Box, Stack, Drawer,
  List, ListItemButton, ListItemIcon, ListItemText, Divider, Chip, useMediaQuery, useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LogoutIcon from '@mui/icons-material/Logout';
import { tokens } from '../theme/colibri-theme';
import AppBreadcrumbs from '../components/AppBreadcrumbs';

const DRAWER_WIDTH = 280;

const iconMap: Record<string, React.ReactElement> = {
  Home: <HomeIcon />, Add: <AddIcon />, CalendarMonth: <CalendarMonthIcon />,
  Person: <PersonIcon />, Dashboard: <DashboardIcon />, People: <PeopleIcon />,
  Description: <DescriptionIcon />, AttachMoney: <AttachMoneyIcon />,
  MedicalServices: <MedicalServicesIcon />, VerifiedUser: <VerifiedUserIcon />,
  Assessment: <AssessmentIcon />, Settings: <SettingsIcon />, ManageAccounts: <ManageAccountsIcon />,
};

interface MainLayoutProps {
  role: 'patient' | 'professional' | 'admin';
  menuItems: Array<{ label: string; icon: string; path: string }>;
  userName: string;
}

export default function MainLayout({ role, menuItems, userName }: MainLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const roleLabels = { patient: 'Paciente', professional: 'Profissional', admin: 'Administrador' };
  const roleColors = { patient: tokens.colors.accent.main, professional: tokens.colors.status.info, admin: tokens.colors.primary.main };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 40, height: 40, borderRadius: tokens.radius.md, background: tokens.colors.gradient.brand, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>LC</Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>Life Colibri</Typography>
          <Typography variant="caption" color="text.secondary">Digital Clinic</Typography>
        </Box>
      </Box>
      <Divider />
      <List sx={{ flex: 1, px: 1.5, py: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => { navigate(item.path); setDrawerOpen(false); }}
            sx={{
              borderRadius: tokens.radius.md, mb: 0.5, py: 1.2,
              '&.Mui-selected': { bgcolor: tokens.colors.primary.soft, '&:hover': { bgcolor: tokens.colors.primary.soft } },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: location.pathname === item.path ? tokens.colors.primary.main : tokens.colors.text.secondary }}>
              {iconMap[item.icon] || <HomeIcon />}
            </ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: location.pathname === item.path ? 600 : 400 }} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <Box sx={{ px: 1.5, py: 1 }}>
        <ListItemButton
          onClick={() => { navigate('/'); setDrawerOpen(false); }}
          sx={{
            borderRadius: tokens.radius.md, py: 1.2,
            border: '1px dashed', borderColor: 'divider',
            justifyContent: 'center',
            '&:hover': { bgcolor: `${tokens.colors.primary.main}08`, borderColor: `${tokens.colors.primary.main}40` },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: tokens.colors.primary.main }}>
            <SwapHorizIcon />
          </ListItemIcon>
          <ListItemText primary="Trocar Perfil" primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 600, color: tokens.colors.primary.main }} />
        </ListItemButton>
      </Box>
      <Divider />
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: roleColors[role] }}>{userName.charAt(0)}</Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" fontWeight={600}>{userName}</Typography>
          <Chip label={roleLabels[role]} size="small" sx={{ height: 20, fontSize: '0.65rem', bgcolor: `${roleColors[role]}15`, color: roleColors[role] }} />
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {isDesktop ? (
        <Drawer variant="permanent" sx={{ width: DRAWER_WIDTH, flexShrink: 0, '& .MuiDrawer-paper': { width: DRAWER_WIDTH, borderRight: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' } }}>
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer variant="temporary" open={drawerOpen} onClose={() => setDrawerOpen(false)} ModalProps={{ 'aria-label': 'Menu de navegação' }} sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}>
          {drawerContent}
        </Drawer>
      )}

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AppBar position="sticky" sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar>
            {!isDesktop && (
              <IconButton edge="start" aria-label="Abrir menu de navegação" onClick={() => setDrawerOpen(true)} sx={{ mr: 1 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, color: 'text.primary' }}>
              {menuItems.find(i => i.path === location.pathname)?.label || 'Life Colibri'}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton aria-label="Notificações">
                <NotificationsIcon />
              </IconButton>
              <Avatar sx={{ width: 34, height: 34, bgcolor: roleColors[role], cursor: 'pointer' }}>
                {userName.charAt(0)}
              </Avatar>
            </Stack>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 3 }, maxWidth: 1200, width: '100%', mx: 'auto' }}>
          <AppBreadcrumbs />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
