import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack, Grid, Chip, Button,
  Paper, Divider, Tabs, Tab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { tokens } from '../theme/colibri-theme';

const transactions = [
  { id: '1', date: '2026-02-18', patient: 'Maria Silva Santos', type: 'Consulta', gross: 350, fee: 35, net: 315, status: 'paid', method: 'Cartão' },
  { id: '2', date: '2026-02-18', patient: 'Juliana Costa Oliveira', type: 'Retorno', gross: 250, fee: 25, net: 225, status: 'paid', method: 'PIX' },
  { id: '3', date: '2026-02-17', patient: 'Patrícia Oliveira', type: 'Consulta', gross: 350, fee: 35, net: 315, status: 'paid', method: 'Cartão' },
  { id: '4', date: '2026-02-16', patient: 'Ana Paula Dias', type: 'Consulta', gross: 350, fee: 35, net: 315, status: 'paid', method: 'Convênio' },
  { id: '5', date: '2026-02-16', patient: 'Renata Souza', type: 'Retorno', gross: 250, fee: 25, net: 225, status: 'paid', method: 'PIX' },
  { id: '6', date: '2026-02-15', patient: 'Camila Alves', type: 'Consulta', gross: 350, fee: 35, net: 315, status: 'paid', method: 'Cartão' },
  { id: '7', date: '2026-02-14', patient: 'Beatriz Souza', type: 'Exame', gross: 300, fee: 30, net: 270, status: 'paid', method: 'Convênio' },
  { id: '8', date: '2026-02-19', patient: 'Fernanda Pereira', type: 'Consulta', gross: 350, fee: 35, net: 315, status: 'pending', method: 'Cartão' },
  { id: '9', date: '2026-02-19', patient: 'Larissa Lima', type: 'Exame', gross: 300, fee: 30, net: 270, status: 'pending', method: 'PIX' },
  { id: '10', date: '2026-02-20', patient: 'Gabriela Nunes', type: 'Consulta', gross: 350, fee: 35, net: 315, status: 'pending', method: 'Cartão' },
];

export default function ProfFinanceiroPage() {
  const [activeTab, setActiveTab] = useState(0);

  const totalGross = transactions.reduce((s, t) => s + t.gross, 0);
  const totalFees = transactions.reduce((s, t) => s + t.fee, 0);
  const totalNet = transactions.reduce((s, t) => s + t.net, 0);
  const paidCount = transactions.filter(t => t.status === 'paid').length;
  const pendingCount = transactions.filter(t => t.status === 'pending').length;

  const monthlyData = [
    { month: 'Set', value: 12500 },
    { month: 'Out', value: 14200 },
    { month: 'Nov', value: 13800 },
    { month: 'Dez', value: 15600 },
    { month: 'Jan', value: 16900 },
    { month: 'Fev', value: 18500 },
  ];
  const maxValue = Math.max(...monthlyData.map(d => d.value));

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="overline" color="text.secondary">FINANCEIRO</Typography>
          <Typography variant="h4" fontWeight={700}>Relatório Financeiro</Typography>
          <Typography variant="body2" color="text.secondary">Fevereiro 2026 — Atualizado em tempo real</Typography>
        </Box>
        <Button variant="outlined" startIcon={<DownloadIcon />}>Exportar PDF</Button>
      </Stack>

      {/* KPI Cards */}
      <Grid container spacing={2}>
        {[
          { label: 'Receita Bruta', value: `R$ ${(totalGross / 1000).toFixed(1)}k`, icon: <AttachMoneyIcon />, color: '#9A1BFF', sub: `${transactions.length} consultas` },
          { label: 'Taxa Plataforma (10%)', value: `R$ ${(totalFees / 1000).toFixed(1)}k`, icon: <ReceiptLongIcon />, color: '#DC2626', sub: 'Split automático via Stripe' },
          { label: 'Receita Líquida', value: `R$ ${(totalNet / 1000).toFixed(1)}k`, icon: <TrendingUpIcon />, color: '#18C964', sub: '+22% vs mês anterior' },
          { label: 'Próximo Repasse', value: 'R$ 4.2k', icon: <AccountBalanceIcon />, color: '#2563EB', sub: 'Dia 20/02 - Banco Itaú' },
        ].map((stat) => (
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
        {/* Revenue Chart */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft, height: '100%' }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Evolução de Receita (6 meses)</Typography>
              <Stack direction="row" spacing={1} alignItems="flex-end" sx={{ height: 200 }}>
                {monthlyData.map((d) => (
                  <Box key={d.month} sx={{ flex: 1, textAlign: 'center' }}>
                    <Typography variant="caption" fontWeight={600} sx={{ mb: 0.5, display: 'block' }}>
                      R$ {(d.value / 1000).toFixed(1)}k
                    </Typography>
                    <Box
                      sx={{
                        height: `${(d.value / maxValue) * 150}px`,
                        bgcolor: d.month === 'Fev' ? '#9A1BFF' : '#9A1BFF30',
                        borderRadius: `${tokens.radius.sm} ${tokens.radius.sm} 0 0`,
                        transition: 'height 0.3s ease',
                        mx: 'auto', width: '80%',
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>{d.month}</Typography>
                  </Box>
                ))}
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" justifyContent="space-around">
                <Box sx={{ textAlign: 'center' }}>
                  <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
                    <ArrowUpwardIcon sx={{ fontSize: 16, color: '#18C964' }} />
                    <Typography variant="body2" fontWeight={700} sx={{ color: '#18C964' }}>+22%</Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">vs mês anterior</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" fontWeight={700}>R$ 15.1k</Typography>
                  <Typography variant="caption" color="text.secondary">Média mensal</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" fontWeight={700}>R$ 90.5k</Typography>
                  <Typography variant="caption" color="text.secondary">Total semestre</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Breakdown */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2}>
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 1.5 }}>Por Tipo de Atendimento</Typography>
                <Stack spacing={1}>
                  {[
                    { label: 'Consultas', value: 65, amount: 'R$ 2.1k', color: '#9A1BFF' },
                    { label: 'Retornos', value: 20, amount: 'R$ 650', color: '#2563EB' },
                    { label: 'Exames', value: 15, amount: 'R$ 480', color: '#18C964' },
                  ].map((item) => (
                    <Box key={item.label}>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.3 }}>
                        <Typography variant="caption">{item.label}</Typography>
                        <Typography variant="caption" fontWeight={600}>{item.amount} ({item.value}%)</Typography>
                      </Stack>
                      <Box sx={{ height: 8, borderRadius: 4, bgcolor: '#F1F5F9', overflow: 'hidden' }}>
                        <Box sx={{ height: '100%', width: `${item.value}%`, bgcolor: item.color, borderRadius: 4 }} />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 1.5 }}>Por Forma de Pagamento</Typography>
                <Stack spacing={1}>
                  {[
                    { label: 'Cartão de Crédito', count: 5, pct: 50 },
                    { label: 'PIX', count: 3, pct: 30 },
                    { label: 'Convênio', count: 2, pct: 20 },
                  ].map(item => (
                    <Stack key={item.label} direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2">{item.label}</Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="caption" color="text.secondary">{item.count} consultas</Typography>
                        <Chip label={`${item.pct}%`} size="small" sx={{ height: 22, fontWeight: 600 }} />
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 1.5 }}>Dados Bancários</Typography>
                <Stack spacing={0.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">Banco</Typography>
                    <Typography variant="body2" fontWeight={600}>Itaú (341)</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">Agência</Typography>
                    <Typography variant="body2" fontWeight={600}>1234</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">Conta</Typography>
                    <Typography variant="body2" fontWeight={600}>•••••-7</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">PIX</Typography>
                    <Typography variant="body2" fontWeight={600}>ana.beatriz@email.com</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Transactions Table */}
      <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h5">Extrato de Transações</Typography>
            <Stack direction="row" spacing={1}>
              <Chip label={`${paidCount} Pagos`} color="success" size="small" variant="outlined" />
              <Chip label={`${pendingCount} Pendentes`} color="warning" size="small" variant="outlined" />
            </Stack>
          </Stack>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <TableCell>Paciente</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Pagamento</TableCell>
                  <TableCell align="right">Bruto</TableCell>
                  <TableCell align="right">Taxa</TableCell>
                  <TableCell align="right">Líquido</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((t) => (
                  <TableRow key={t.id} hover>
                    <TableCell><Typography variant="body2">{t.date}</Typography></TableCell>
                    <TableCell><Typography variant="body2" fontWeight={600}>{t.patient}</Typography></TableCell>
                    <TableCell><Chip label={t.type} size="small" variant="outlined" sx={{ height: 22, fontSize: '0.65rem' }} /></TableCell>
                    <TableCell><Typography variant="caption">{t.method}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2">R$ {t.gross},00</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2" color="error">-R$ {t.fee},00</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2" fontWeight={700} color="secondary">R$ {t.net},00</Typography></TableCell>
                    <TableCell>
                      <Chip
                        label={t.status === 'paid' ? 'Pago' : 'Pendente'}
                        color={t.status === 'paid' ? 'success' : 'warning'}
                        size="small" variant="outlined" sx={{ height: 22, fontSize: '0.65rem' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Stack>
  );
}
