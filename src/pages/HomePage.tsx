import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Card, CardContent, Stack, Chip, Avatar, Grid,
  Paper, LinearProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VideocamIcon from '@mui/icons-material/Videocam';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { tokens } from '../theme/colibri-theme';
import { mockProfessionals, mockAppointments } from '../mock/data';
import { usePageState } from '../hooks/usePageState';
import PageStateHandler, { EmptyState } from '../components/PageStateHandler';

interface HomeData {
  appointments: typeof mockAppointments;
  professionals: typeof mockProfessionals;
}

export default function HomePage() {
  const navigate = useNavigate();

  const pageState = usePageState<HomeData>(null, async () => {
    await new Promise((r) => setTimeout(r, 600));
    return {
      appointments: mockAppointments.filter(a => a.status === 'confirmed').slice(0, 2),
      professionals: mockProfessionals.slice(0, 3),
    };
  });

  useEffect(() => {
    pageState.retry();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const upcomingAppointments = pageState.data?.appointments ?? [];
  const topProfessionals = pageState.data?.professionals ?? [];

  return (
    <PageStateHandler
      loading={pageState.loading}
      error={pageState.error}
      onRetry={pageState.retry}
      skeletonVariant="dashboard"
    >
    <Stack spacing={3}>
      {/* Hero Section */}
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          background: tokens.colors.gradient.brand,
          color: '#fff',
          borderRadius: tokens.radius.lg,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
            BEM-VINDA DE VOLTA
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: '#fff' }}>
            Olá, Maria!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255,255,255,0.9)', maxWidth: 500 }}>
            Encontre o profissional ideal para você com nossa triagem inteligente. Atendimento personalizado e humanizado.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            onClick={() => navigate('/triagem')}
            sx={{
              bgcolor: '#fff', color: '#000', fontWeight: 700,
              '&:hover': { bgcolor: '#F1F5F9', boxShadow: tokens.shadows.hover },
            }}
          >
            Iniciar Triagem Inteligente
          </Button>
        </Box>
      </Paper>

      {/* Quick Actions */}
      <Grid container spacing={2}>
        {[
          { icon: <SearchIcon />, label: 'Nova Consulta', desc: 'Triagem inteligente', path: '/triagem', color: tokens.colors.gradient.brand },
          { icon: <CalendarMonthIcon />, label: 'Minha Agenda', desc: '2 consultas agendadas', path: '/minhas-consultas', color: tokens.colors.status.info },
          { icon: <VideocamIcon />, label: 'Teleconsulta', desc: 'Atendimento online', path: '/triagem', color: tokens.colors.accent.main },
          { icon: <LocalHospitalIcon />, label: 'Especialidades', desc: '12 disponíveis', path: '/triagem', color: tokens.colors.status.warning },
        ].map((action) => (
          <Grid key={action.label} size={{ xs: 6, md: 3 }}>
            <Card
              role="button"
              tabIndex={0}
              aria-label={`${action.label}: ${action.desc}`}
              onClick={() => navigate(action.path)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(action.path); } }}
              sx={{
                cursor: 'pointer', border: '1px solid', borderColor: tokens.colors.border.soft,
                transition: 'all 0.25s ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: tokens.shadows.hover },
                '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 2.5 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: tokens.radius.md, bgcolor: `${action.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5, color: action.color }}>
                  {action.icon}
                </Box>
                <Typography variant="body2" fontWeight={600}>{action.label}</Typography>
                <Typography variant="caption" color="text.secondary">{action.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Upcoming Appointments */}
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">Próximas Consultas</Typography>
          <Button variant="text" endIcon={<ArrowForwardIcon />} onClick={() => navigate('/minhas-consultas')}>Ver todas</Button>
        </Stack>
        <Stack spacing={1.5}>
          {upcomingAppointments.map((apt) => (
            <Card key={apt.id} sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: tokens.colors.status.info, width: 44, height: 44 }}>
                    {apt.professionalName.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>{apt.professionalName}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {apt.date} às {apt.time}
                      </Typography>
                      <Chip label={apt.modality} size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
                    </Stack>
                  </Box>
                  <Stack alignItems="flex-end">
                    <Chip
                      label={apt.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                      size="small"
                      color={apt.status === 'confirmed' ? 'success' : 'warning'}
                      variant="outlined"
                      sx={{ height: 24 }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                      {apt.type}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
          {upcomingAppointments.length === 0 && (
            <EmptyState
              icon={<EventBusyIcon sx={{ fontSize: 56 }} />}
              title="Nenhuma consulta agendada"
              description="Você não possui consultas confirmadas no momento. Inicie uma triagem inteligente para encontrar o profissional ideal."
              action={
                <Button variant="contained" sx={{ background: tokens.colors.gradient.brand }} onClick={() => navigate('/triagem')}>
                  Agendar Consulta
                </Button>
              }
            />
          )}
        </Stack>
      </Box>

      {/* Top Professionals */}
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">Profissionais em Destaque</Typography>
          <Button variant="text" endIcon={<ArrowForwardIcon />}>Ver todos</Button>
        </Stack>
        <Grid container spacing={2}>
          {topProfessionals.map((prof) => (
            <Grid key={prof.id} size={{ xs: 12, md: 4 }}>
              <Card
                role="button"
                tabIndex={0}
                aria-label={`Ver perfil de ${prof.name}, ${prof.specialty}`}
                onClick={() => navigate(`/matching?id=${prof.id}`)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/matching?id=${prof.id}`); } }}
                sx={{
                  border: '1px solid', borderColor: tokens.colors.border.soft, cursor: 'pointer',
                  '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <Avatar sx={{ bgcolor: tokens.colors.primary.main, width: 48, height: 48 }}>
                      {prof.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{prof.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{prof.specialty}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 1 }}>
                    <StarIcon sx={{ fontSize: 16, color: tokens.colors.status.warning }} />
                    <Typography variant="body2" fontWeight={600}>{prof.rating}</Typography>
                    <Typography variant="caption" color="text.secondary">({prof.reviews} avaliações)</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mb: 1.5 }}>
                    {prof.tags.slice(0, 2).map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ height: 22, fontSize: '0.65rem' }} />
                    ))}
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" fontWeight={600} color="secondary">
                      R$ {prof.price},00
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {prof.crm}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Health Progress */}
      <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>Seu Perfil de Saúde</Typography>
          <Stack spacing={2}>
            {[
              { label: 'Perfil Completo', value: 75, color: tokens.colors.accent.main },
              { label: 'Exames em Dia', value: 60, color: tokens.colors.status.info },
              { label: 'Consultas Regulares', value: 90, color: tokens.colors.primary.main },
            ].map((item) => (
              <Box key={item.label}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                  <Typography variant="body2">{item.label}</Typography>
                  <Typography variant="body2" fontWeight={600}>{item.value}%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={item.value} sx={{ height: 8, borderRadius: 4, bgcolor: `${item.color}15`, '& .MuiLinearProgress-bar': { bgcolor: item.color, borderRadius: 4 } }} />
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
    </PageStateHandler>
  );
}
