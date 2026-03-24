import {
  Box, Typography, Card, CardContent, Stack, Grid, Chip,
  Paper, Button, Avatar, LinearProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { tokens } from '../theme/colibri-theme';
import { mockDashboardStats } from '../mock/data';

const stats = mockDashboardStats.admin;

export default function AdminDashboard() {
  const statCards = [
    { label: 'Profissionais', value: stats.totalProfessionals, icon: <MedicalServicesIcon />, color: '#9A1BFF', sub: `${stats.pendingApprovals} aguardando aprovação` },
    { label: 'Pacientes', value: stats.totalPatients.toLocaleString(), icon: <PeopleIcon />, color: '#2563EB', sub: '+142 este mês' },
    { label: 'Receita Mensal', value: `R$ ${(stats.monthRevenue / 1000).toFixed(0)}k`, icon: <AttachMoneyIcon />, color: '#18C964', sub: `Taxa: R$ ${(stats.platformFee / 1000).toFixed(1)}k` },
    { label: 'Consultas/Mês', value: stats.monthAppointments, icon: <CalendarMonthIcon />, color: '#F59E0B', sub: `${stats.cancelationRate}% cancelamento` },
  ];

  const pendingApprovals = [
    { name: 'Dr. Fernando Gomes', specialty: 'Ginecologia', crm: 'CRM/SP 789012', date: '2026-02-15', status: 'Análise CRM' },
    { name: 'Dra. Patrícia Araújo', specialty: 'Obstetrícia', crm: 'CRM/RJ 890123', date: '2026-02-14', status: 'Documentos' },
    { name: 'Dr. Marcos Oliveira', specialty: 'Reprodução Assistida', crm: 'CRM/MG 901234', date: '2026-02-13', status: 'Entrevista' },
    { name: 'Dra. Juliana Ribeiro', specialty: 'Mastologia', crm: 'CRM/SP 012345', date: '2026-02-12', status: 'Análise CRM' },
    { name: 'Dr. André Costa', specialty: 'Endocrinologia', crm: 'CRM/PR 123456', date: '2026-02-11', status: 'Documentos' },
  ];

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="overline" color="text.secondary">ADMINISTRAÇÃO</Typography>
        <Typography variant="h4" fontWeight={700}>Painel Administrativo</Typography>
        <Typography variant="body2" color="text.secondary">Visão geral da plataforma Life Colibri</Typography>
      </Box>

      <Grid container spacing={2}>
        {statCards.map((stat) => (
          <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent sx={{ py: 2 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: tokens.radius.md, bgcolor: `${stat.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, mb: 1 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" fontWeight={700}>{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                <Typography variant="caption" sx={{ color: stat.color, fontWeight: 600 }}>{stat.sub}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h5">Aprovações Pendentes</Typography>
                  <Chip label={stats.pendingApprovals} size="small" color="warning" sx={{ height: 22, fontWeight: 700 }} />
                </Stack>
                <Button variant="text" endIcon={<ArrowForwardIcon />} size="small">Ver todas</Button>
              </Stack>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Profissional</TableCell>
                      <TableCell>CRM</TableCell>
                      <TableCell>Etapa</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingApprovals.map((item) => (
                      <TableRow key={item.name} hover>
                        <TableCell>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar sx={{ width: 28, height: 28, fontSize: '0.7rem', bgcolor: '#9A1BFF' }}>
                              {item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem' }}>{item.name}</Typography>
                              <Typography variant="caption" color="text.secondary">{item.specialty}</Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell><Typography variant="caption">{item.crm}</Typography></TableCell>
                        <TableCell>
                          <Chip label={item.status} size="small" variant="outlined"
                            color={item.status === 'Análise CRM' ? 'info' : item.status === 'Documentos' ? 'warning' : 'secondary'}
                            sx={{ height: 22, fontSize: '0.65rem' }}
                          />
                        </TableCell>
                        <TableCell><Typography variant="caption">{item.date}</Typography></TableCell>
                        <TableCell align="right">
                          <Button size="small" variant="contained" sx={{ mr: 0.5, height: 26, fontSize: '0.7rem' }}>Aprovar</Button>
                          <Button size="small" variant="outlined" color="error" sx={{ height: 26, fontSize: '0.7rem' }}>Rejeitar</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2}>
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 1.5 }}>NPS da Plataforma</Typography>
                <Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" fontWeight={700} sx={{ color: '#18C964' }}>{stats.nps}</Typography>
                    <Chip label="Excelente" size="small" color="success" sx={{ height: 22 }} />
                  </Box>
                  <Box>
                    <Stack spacing={0.5}>
                      {[
                        { label: 'Promotores', value: 72, color: '#18C964' },
                        { label: 'Neutros', value: 15, color: '#F59E0B' },
                        { label: 'Detratores', value: 13, color: '#DC2626' },
                      ].map((item) => (
                        <Stack key={item.label} direction="row" spacing={1} alignItems="center">
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />
                          <Typography variant="caption">{item.label}: {item.value}%</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 1.5 }}>Receita por Especialidade</Typography>
                <Stack spacing={1}>
                  {[
                    { label: 'Ginecologia', value: 42, amount: 'R$ 119.7k' },
                    { label: 'Reprodução Assistida', value: 28, amount: 'R$ 79.8k' },
                    { label: 'Obstetrícia', value: 18, amount: 'R$ 51.3k' },
                    { label: 'Mastologia', value: 8, amount: 'R$ 22.8k' },
                    { label: 'Endocrinologia', value: 4, amount: 'R$ 11.4k' },
                  ].map((item) => (
                    <Box key={item.label}>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.3 }}>
                        <Typography variant="caption">{item.label}</Typography>
                        <Typography variant="caption" fontWeight={600}>{item.amount} ({item.value}%)</Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={item.value} sx={{ height: 6, borderRadius: 3, bgcolor: '#F1F5F9', '& .MuiLinearProgress-bar': { bgcolor: '#9A1BFF', borderRadius: 3 } }} />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 1.5 }}>Atividade Recente</Typography>
                <Stack spacing={1.5}>
                  {[
                    { text: 'Maria Silva agendou consulta com Dra. Ana Beatriz', time: '5 min atrás', color: '#18C964' },
                    { text: 'Dr. Fernando Gomes solicitou cadastro', time: '15 min atrás', color: '#F59E0B' },
                    { text: 'Pagamento de R$ 350,00 confirmado', time: '22 min atrás', color: '#2563EB' },
                    { text: 'Fernanda Lima cancelou consulta', time: '1h atrás', color: '#DC2626' },
                  ].map((activity, i) => (
                    <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: activity.color, mt: 0.8, flexShrink: 0 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{activity.text}</Typography>
                        <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
