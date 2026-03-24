import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Stack, Grid, Paper, Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { tokens } from '../theme/colibri-theme';

export default function RoleSelectorPage() {
  const navigate = useNavigate();

  const roles = [
    {
      key: 'patient', label: 'Paciente', icon: <PersonIcon sx={{ fontSize: 48 }} />,
      desc: 'Triagem inteligente, agendamento e acompanhamento de consultas',
      color: '#18C964', path: '/patient',
      features: ['Triagem Inteligente com IA', 'Matching com profissionais', 'Agendamento self-service', 'Checkout com split de pagamento'],
    },
    {
      key: 'professional', label: 'Profissional', icon: <MedicalServicesIcon sx={{ fontSize: 48 }} />,
      desc: 'Dashboard, agenda, prontuários e gestão de pacientes',
      color: '#2563EB', path: '/professional',
      features: ['Dashboard com métricas', 'Gestão de agenda', 'Prontuário eletrônico', 'Relatórios financeiros'],
    },
    {
      key: 'admin', label: 'Administrador', icon: <AdminPanelSettingsIcon sx={{ fontSize: 48 }} />,
      desc: 'Painel administrativo, aprovações e relatórios da plataforma',
      color: '#9A1BFF', path: '/admin',
      features: ['Painel administrativo', 'Aprovação de profissionais', 'NPS e métricas', 'Gestão financeira'],
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: tokens.colors.surface.primary, p: 3 }}>
      <Box sx={{ maxWidth: 900, width: '100%' }}>
        {/* Logo + Title */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ width: 64, height: 64, borderRadius: tokens.radius.lg, background: tokens.colors.gradient.brand, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.5rem' }}>LC</Typography>
          </Box>
          <Typography variant="h3" fontWeight={700}>Life Colibri</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>Digital Clinic — Wireframe MVP</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 500, mx: 'auto' }}>
            Selecione um perfil para visualizar o protótipo funcional das telas do MVP.
            Todos os dados são mock para demonstração aos stakeholders.
          </Typography>
        </Box>

        {/* Role Cards */}
        <Grid container spacing={3}>
          {roles.map((role) => (
            <Grid key={role.key} size={{ xs: 12, md: 4 }}>
              <Card
                role="button"
                tabIndex={0}
                aria-label={`Entrar como ${role.label}: ${role.desc}`}
                onClick={() => navigate(role.path)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(role.path); } }}
                sx={{
                  cursor: 'pointer', border: '2px solid', borderColor: 'transparent',
                  transition: 'all 0.3s ease', height: '100%',
                  '&:hover': { borderColor: role.color, transform: 'translateY(-4px)', boxShadow: tokens.shadows.hover },
                  '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: `${role.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, color: role.color }}>
                    {role.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>{role.label}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{role.desc}</Typography>
                  <Stack spacing={0.5} sx={{ mb: 2, textAlign: 'left' }}>
                    {role.features.map((feat) => (
                      <Stack key={feat} direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: role.color, flexShrink: 0 }} />
                        <Typography variant="caption">{feat}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button variant="contained" fullWidth sx={{ bgcolor: role.color, '&:hover': { bgcolor: role.color, opacity: 0.9 } }}>
                    Entrar como {role.label}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 4 }}>
          Protótipo v1.0 — Fevereiro 2026 — Design System Colibri — React 19 + Material-UI v7
        </Typography>
      </Box>
    </Box>
  );
}
