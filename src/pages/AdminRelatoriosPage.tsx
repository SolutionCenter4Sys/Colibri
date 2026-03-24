import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack, Grid, Chip, Button,
  Paper, Divider, Tabs, Tab, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DownloadIcon from '@mui/icons-material/Download';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import StarIcon from '@mui/icons-material/Star';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { tokens } from '../theme/colibri-theme';

export default function AdminRelatoriosPage() {
  const [period, setPeriod] = useState('month');
  const [reportTab, setReportTab] = useState(0);

  const operationalMetrics = [
    { label: 'Taxa Ocupação', value: '78%', change: '+5%', positive: true },
    { label: 'Tempo Médio Consulta', value: '38 min', change: '-2 min', positive: true },
    { label: 'Taxa No-Show', value: '4.2%', change: '-1.3%', positive: true },
    { label: 'Taxa Cancelamento', value: '8.5%', change: '+0.7%', positive: false },
    { label: 'NPS Pacientes', value: '72', change: '+4', positive: true },
    { label: 'NPS Profissionais', value: '68', change: '+2', positive: true },
  ];

  const topSpecialties = [
    { name: 'Ginecologia', consultations: 489, revenue: 171150, growth: 15 },
    { name: 'Psicologia', consultations: 312, revenue: 93600, growth: 22 },
    { name: 'Nutrição', consultations: 256, revenue: 64000, growth: 18 },
    { name: 'Fisioterapia', consultations: 178, revenue: 44500, growth: 8 },
    { name: 'Dermatologia', consultations: 134, revenue: 53600, growth: 12 },
  ];

  const weeklyConsults = [
    { day: 'Seg', count: 42 },
    { day: 'Ter', count: 56 },
    { day: 'Qua', count: 63 },
    { day: 'Qui', count: 51 },
    { day: 'Sex', count: 48 },
    { day: 'Sáb', count: 18 },
  ];
  const maxConsults = Math.max(...weeklyConsults.map(w => w.count));

  const patientGrowth = [
    { month: 'Set', new: 45, total: 280 },
    { month: 'Out', new: 52, total: 332 },
    { month: 'Nov', new: 38, total: 370 },
    { month: 'Dez', new: 61, total: 431 },
    { month: 'Jan', new: 73, total: 504 },
    { month: 'Fev', new: 85, total: 589 },
  ];
  const maxTotal = Math.max(...patientGrowth.map(p => p.total));

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="overline" color="text.secondary">ADMINISTRAÇÃO</Typography>
          <Typography variant="h4" fontWeight={700}>Relatórios e Analytics</Typography>
          <Typography variant="body2" color="text.secondary">Indicadores de performance da plataforma</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Período</InputLabel>
            <Select value={period} label="Período" onChange={(e) => setPeriod(e.target.value)}>
              <MenuItem value="week">Semana</MenuItem>
              <MenuItem value="month">Mês</MenuItem>
              <MenuItem value="quarter">Trimestre</MenuItem>
              <MenuItem value="year">Ano</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<DownloadIcon />}>Exportar</Button>
        </Stack>
      </Stack>

      {/* Operational Metrics */}
      <Grid container spacing={2}>
        {operationalMetrics.map(m => (
          <Grid key={m.label} size={{ xs: 6, md: 2 }}>
            <Paper sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700}>{m.value}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{m.label}</Typography>
              <Stack direction="row" spacing={0.3} justifyContent="center" alignItems="center" sx={{ mt: 0.5 }}>
                {m.positive ? <ArrowUpwardIcon sx={{ fontSize: 12, color: '#18C964' }} /> : <ArrowDownwardIcon sx={{ fontSize: 12, color: '#DC2626' }} />}
                <Typography variant="caption" sx={{ color: m.positive ? '#18C964' : '#DC2626', fontWeight: 600 }}>{m.change}</Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Tabs value={reportTab} onChange={(_, v) => setReportTab(v)} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Tab icon={<BarChartIcon />} iconPosition="start" label="Consultas" />
        <Tab icon={<GroupIcon />} iconPosition="start" label="Crescimento" />
        <Tab icon={<MedicalServicesIcon />} iconPosition="start" label="Especialidades" />
      </Tabs>

      {reportTab === 0 && (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft, height: '100%' }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>Distribuição Semanal de Consultas</Typography>
                <Stack direction="row" spacing={1.5} alignItems="flex-end" sx={{ height: 220 }}>
                  {weeklyConsults.map(w => (
                    <Box key={w.day} sx={{ flex: 1, textAlign: 'center' }}>
                      <Typography variant="caption" fontWeight={700} sx={{ mb: 0.5, display: 'block' }}>{w.count}</Typography>
                      <Box sx={{ height: `${(w.count / maxConsults) * 170}px`, bgcolor: '#9A1BFF', borderRadius: `${tokens.radius.sm} ${tokens.radius.sm} 0 0`, mx: 'auto', width: '70%', opacity: 0.6 + (w.count / maxConsults) * 0.4 }} />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>{w.day}</Typography>
                    </Box>
                  ))}
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" justifyContent="space-around">
                  <Box sx={{ textAlign: 'center' }}><Typography variant="body1" fontWeight={700}>278</Typography><Typography variant="caption" color="text.secondary">Total Semana</Typography></Box>
                  <Box sx={{ textAlign: 'center' }}><Typography variant="body1" fontWeight={700}>46</Typography><Typography variant="caption" color="text.secondary">Média Diária</Typography></Box>
                  <Box sx={{ textAlign: 'center' }}><Typography variant="body1" fontWeight={700}>Qua</Typography><Typography variant="caption" color="text.secondary">Dia Pico</Typography></Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={2}>
              <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 1.5 }}>Por Modalidade</Typography>
                  <Stack spacing={1.5}>
                    {[
                      { label: 'Presencial', pct: 62, count: 172, color: '#18C964' },
                      { label: 'Teleconsulta', pct: 38, count: 106, color: '#2563EB' },
                    ].map(item => (
                      <Box key={item.label}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                          <Typography variant="body2">{item.label}</Typography>
                          <Typography variant="body2" fontWeight={600}>{item.count} ({item.pct}%)</Typography>
                        </Stack>
                        <Box sx={{ height: 10, borderRadius: 5, bgcolor: '#F1F5F9', overflow: 'hidden' }}>
                          <Box sx={{ height: '100%', width: `${item.pct}%`, bgcolor: item.color, borderRadius: 5 }} />
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
              <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 1.5 }}>Por Tipo</Typography>
                  <Stack spacing={1}>
                    {[
                      { label: 'Consulta', pct: 58 },
                      { label: 'Retorno', pct: 22 },
                      { label: 'Sessão', pct: 12 },
                      { label: 'Exame', pct: 8 },
                    ].map(item => (
                      <Stack key={item.label} direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">{item.label}</Typography>
                        <Chip label={`${item.pct}%`} size="small" sx={{ height: 22, fontWeight: 600 }} />
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      )}

      {reportTab === 1 && (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft, height: '100%' }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>Crescimento de Pacientes (6 meses)</Typography>
                <Stack direction="row" spacing={1.5} alignItems="flex-end" sx={{ height: 220 }}>
                  {patientGrowth.map(p => (
                    <Box key={p.month} sx={{ flex: 1, textAlign: 'center' }}>
                      <Typography variant="caption" fontWeight={600} sx={{ mb: 0.5, display: 'block', fontSize: '0.6rem' }}>
                        {p.total}
                      </Typography>
                      <Box sx={{ position: 'relative', mx: 'auto', width: '80%' }}>
                        <Box sx={{ height: `${(p.total / maxTotal) * 160}px`, bgcolor: p.month === 'Fev' ? '#9A1BFF' : '#9A1BFF30', borderRadius: `${tokens.radius.sm} ${tokens.radius.sm} 0 0` }} />
                        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${(p.new / maxTotal) * 160}px`, bgcolor: '#18C96480', borderRadius: `${tokens.radius.sm} ${tokens.radius.sm} 0 0` }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>{p.month}</Typography>
                    </Box>
                  ))}
                </Stack>
                <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 2 }}>
                  <Stack direction="row" spacing={0.5} alignItems="center"><Box sx={{ width: 12, height: 12, borderRadius: 2, bgcolor: '#9A1BFF' }} /><Typography variant="caption">Total Acum.</Typography></Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center"><Box sx={{ width: 12, height: 12, borderRadius: 2, bgcolor: '#18C96480' }} /><Typography variant="caption">Novos</Typography></Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={2}>
              <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 1.5 }}>Indicadores de Retenção</Typography>
                  <Stack spacing={1.5}>
                    {[
                      { label: 'Taxa de Retorno', value: '68%', desc: 'Pacientes que retornaram no mês' },
                      { label: 'Churn Rate', value: '3.2%', desc: 'Pacientes que não voltaram em 3 meses' },
                      { label: 'Lifetime Value', value: 'R$ 2.8k', desc: 'Valor médio por paciente' },
                      { label: 'CAC', value: 'R$ 45', desc: 'Custo aquisição por paciente' },
                    ].map(item => (
                      <Paper key={item.label} sx={{ p: 1.5, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography variant="body2" fontWeight={600}>{item.label}</Typography>
                            <Typography variant="caption" color="text.secondary">{item.desc}</Typography>
                          </Box>
                          <Typography variant="h5" fontWeight={700} color="primary">{item.value}</Typography>
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      )}

      {reportTab === 2 && (
        <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>Ranking de Especialidades</Typography>
            <Stack spacing={1.5}>
              {topSpecialties.map((s, i) => (
                <Paper key={s.name} sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: i === 0 ? '#F59E0B12' : '#9A1BFF12', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="body1" fontWeight={700} sx={{ color: i === 0 ? '#F59E0B' : '#9A1BFF' }}>#{i + 1}</Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight={700}>{s.name}</Typography>
                      <Stack direction="row" spacing={2}>
                        <Typography variant="caption" color="text.secondary">{s.consultations} consultas</Typography>
                        <Typography variant="caption" color="text.secondary">R$ {(s.revenue / 1000).toFixed(1)}k receita</Typography>
                      </Stack>
                    </Box>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <ArrowUpwardIcon sx={{ fontSize: 16, color: '#18C964' }} />
                      <Typography variant="body2" fontWeight={700} sx={{ color: '#18C964' }}>+{s.growth}%</Typography>
                    </Stack>
                    <Box sx={{ width: 120 }}>
                      <Box sx={{ height: 8, borderRadius: 4, bgcolor: '#F1F5F9', overflow: 'hidden' }}>
                        <Box sx={{ height: '100%', width: `${(s.consultations / topSpecialties[0].consultations) * 100}%`, bgcolor: '#9A1BFF', borderRadius: 4 }} />
                      </Box>
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
