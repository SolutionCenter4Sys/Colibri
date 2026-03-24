import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Stack, Grid, Avatar,
  Chip, LinearProgress, Paper, Divider, IconButton, Button,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideocamIcon from '@mui/icons-material/Videocam';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { tokens } from '../theme/colibri-theme';
import { mockDashboardStats, mockAppointments } from '../mock/data';
import { usePageState } from '../hooks/usePageState';
import PageStateHandler, { EmptyState } from '../components/PageStateHandler';

interface DashboardData {
  stats: typeof mockDashboardStats.professional;
  todaySchedule: typeof mockAppointments;
}

export default function ProfessionalDashboard() {
  const navigate = useNavigate();

  const pageState = usePageState<DashboardData>(null, async () => {
    await new Promise((r) => setTimeout(r, 500));
    return {
      stats: mockDashboardStats.professional,
      todaySchedule: mockAppointments.filter(a => a.date === '2026-02-18'),
    };
  });

  useEffect(() => {
    pageState.retry();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const stats = pageState.data?.stats ?? mockDashboardStats.professional;

  const statCards = [
    { label: 'Consultas Hoje', value: stats.todayAppointments, icon: <CalendarMonthIcon />, color: '#9A1BFF', trend: '+2 vs ontem' },
    { label: 'Consultas Semana', value: stats.weekAppointments, icon: <TrendingUpIcon />, color: '#2563EB', trend: '+15% vs semana anterior' },
    { label: 'Receita Mensal', value: `R$ ${(stats.monthRevenue / 1000).toFixed(1)}k`, icon: <AttachMoneyIcon />, color: '#18C964', trend: '+22% vs mês anterior' },
    { label: 'Total Pacientes', value: stats.totalPatients, icon: <PeopleIcon />, color: '#F59E0B', trend: '+8 novos este mês' },
  ];

  const todaySchedule = pageState.data?.todaySchedule ?? [];

  return (
    <PageStateHandler
      loading={pageState.loading}
      error={pageState.error}
      onRetry={pageState.retry}
      skeletonVariant="dashboard"
    >
    <Stack spacing={3}>
      {/* Welcome */}
      <Box>
        <Typography variant="overline" color="text.secondary">DASHBOARD</Typography>
        <Typography variant="h4" fontWeight={700}>Bom dia, Dra. Ana Beatriz!</Typography>
        <Typography variant="body2" color="text.secondary">
          Terça-feira, 18 de Fevereiro de 2026 — Você tem {stats.todayAppointments} consultas hoje
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2}>
        {statCards.map((stat) => (
          <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent sx={{ py: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: tokens.radius.md, bgcolor: `${stat.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                    {stat.icon}
                  </Box>
                  <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
                </Stack>
                <Typography variant="h4" fontWeight={700}>{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                <Typography variant="caption" sx={{ color: '#18C964', fontWeight: 600 }}>{stat.trend}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        {/* Today's Schedule */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft, height: '100%' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h5">Agenda de Hoje</Typography>
                <Button variant="text" endIcon={<ArrowForwardIcon />} size="small">Ver agenda completa</Button>
              </Stack>
              <Stack spacing={1.5}>
                {todaySchedule.map((apt, i) => (
                  <Paper key={apt.id} sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{ textAlign: 'center', minWidth: 48 }}>
                        <Typography variant="h5" fontWeight={700}>{apt.time}</Typography>
                      </Box>
                      <Divider orientation="vertical" flexItem sx={{ borderColor: i === 0 ? '#9A1BFF' : '#E2E8F0', borderWidth: 2, borderRadius: 4 }} />
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2" fontWeight={600}>{apt.patientName}</Typography>
                          <Chip label={apt.type} size="small" sx={{ height: 20, fontSize: '0.6rem' }} />
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                          {apt.modality === 'Teleconsulta' ? <VideocamIcon sx={{ fontSize: 14, color: 'text.secondary' }} /> : <LocationOnIcon sx={{ fontSize: 14, color: 'text.secondary' }} />}
                          <Typography variant="caption" color="text.secondary">{apt.modality}</Typography>
                        </Stack>
                      </Box>
                      <Chip
                        label={apt.status === 'confirmed' ? 'Confirmada' : apt.status === 'pending' ? 'Pendente' : 'Cancelada'}
                        size="small"
                        color={apt.status === 'confirmed' ? 'success' : apt.status === 'pending' ? 'warning' : 'error'}
                        variant="outlined"
                        sx={{ height: 24 }}
                      />
                    </Stack>
                  </Paper>
                ))}
                {todaySchedule.length === 0 && (
                  <EmptyState
                    icon={<EventBusyIcon sx={{ fontSize: 48 }} />}
                    title="Agenda livre hoje"
                    description="Nenhuma consulta agendada para hoje. Aproveite para organizar sua agenda da semana."
                  />
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2}>
            {/* Rating */}
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 1.5 }}>Avaliação</Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" fontWeight={700}>{stats.rating}</Typography>
                    <Stack direction="row" spacing={0.2} justifyContent="center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon key={star} sx={{ fontSize: 18, color: star <= Math.round(stats.rating) ? '#F59E0B' : '#E2E8F0' }} />
                      ))}
                    </Stack>
                    <Typography variant="caption" color="text.secondary">127 avaliações</Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 1 : 1;
                      return (
                        <Stack key={star} direction="row" spacing={1} alignItems="center" sx={{ mb: 0.3 }}>
                          <Typography variant="caption" sx={{ minWidth: 8 }}>{star}</Typography>
                          <LinearProgress variant="determinate" value={pct} sx={{ flex: 1, height: 6, borderRadius: 3, bgcolor: '#F1F5F9', '& .MuiLinearProgress-bar': { bgcolor: '#F59E0B', borderRadius: 3 } }} />
                          <Typography variant="caption" color="text.secondary" sx={{ minWidth: 25, textAlign: 'right' }}>{pct}%</Typography>
                        </Stack>
                      );
                    })}
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Occupancy */}
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 1.5 }}>Taxa de Ocupação</Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%', justifyContent: 'center' }}>
                  <Box sx={{ position: 'relative', width: 120, height: 120 }}>
                    <svg viewBox="0 0 120 120" width="120" height="120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#F1F5F9" strokeWidth="10" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#9A1BFF" strokeWidth="10"
                        strokeDasharray={`${stats.occupancyRate * 3.14} ${314 - stats.occupancyRate * 3.14}`}
                        strokeLinecap="round" transform="rotate(-90 60 60)" />
                    </svg>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                      <Typography variant="h4" fontWeight={700}>{stats.occupancyRate}%</Typography>
                    </Box>
                  </Box>
                </Box>
                <Stack direction="row" justifyContent="space-around" sx={{ mt: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" fontWeight={600}>22</Typography>
                    <Typography variant="caption" color="text.secondary">Agendados</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" fontWeight={600}>6</Typography>
                    <Typography variant="caption" color="text.secondary">Disponíveis</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" fontWeight={600}>0</Typography>
                    <Typography variant="caption" color="text.secondary">Bloqueados</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 1.5 }}>Ações Rápidas</Typography>
                <Stack spacing={1}>
                  <Button variant="outlined" fullWidth sx={{ justifyContent: 'flex-start' }} startIcon={<CalendarMonthIcon />}>
                    Bloquear horários
                  </Button>
                  <Button variant="outlined" fullWidth sx={{ justifyContent: 'flex-start' }} startIcon={<PeopleIcon />}>
                    Ver todos os pacientes
                  </Button>
                  <Button variant="outlined" fullWidth sx={{ justifyContent: 'flex-start' }} startIcon={<AttachMoneyIcon />}>
                    Relatório financeiro
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
    </PageStateHandler>
  );
}
