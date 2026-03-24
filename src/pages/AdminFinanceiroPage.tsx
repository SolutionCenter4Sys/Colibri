import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack, Grid, Chip, Button,
  Paper, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DownloadIcon from '@mui/icons-material/Download';
import PaidIcon from '@mui/icons-material/Paid';
import { tokens } from '../theme/colibri-theme';

const monthlyRevenue = [
  { month: 'Set', gross: 45000, fees: 4500, net: 40500 },
  { month: 'Out', gross: 52000, fees: 5200, net: 46800 },
  { month: 'Nov', gross: 48000, fees: 4800, net: 43200 },
  { month: 'Dez', gross: 61000, fees: 6100, net: 54900 },
  { month: 'Jan', gross: 68000, fees: 6800, net: 61200 },
  { month: 'Fev', gross: 75000, fees: 7500, net: 67500 },
];

const repasses = [
  { id: 'R-001', date: '2026-02-20', professional: 'Dra. Ana Beatriz Souza', consultations: 12, gross: 4200, fee: 420, net: 3780, status: 'pending' },
  { id: 'R-002', date: '2026-02-20', professional: 'Dr. Carlos Eduardo Lima', consultations: 8, gross: 2400, fee: 240, net: 2160, status: 'pending' },
  { id: 'R-003', date: '2026-02-20', professional: 'Dra. Marina Costa', consultations: 6, gross: 1500, fee: 150, net: 1350, status: 'pending' },
  { id: 'R-004', date: '2026-02-15', professional: 'Dra. Ana Beatriz Souza', consultations: 10, gross: 3500, fee: 350, net: 3150, status: 'paid' },
  { id: 'R-005', date: '2026-02-15', professional: 'Dr. Carlos Eduardo Lima', consultations: 7, gross: 2100, fee: 210, net: 1890, status: 'paid' },
  { id: 'R-006', date: '2026-02-15', professional: 'Dra. Marina Costa', consultations: 5, gross: 1250, fee: 125, net: 1125, status: 'paid' },
  { id: 'R-007', date: '2026-02-15', professional: 'Dr. Roberto Ferreira', consultations: 4, gross: 1000, fee: 100, net: 900, status: 'paid' },
  { id: 'R-008', date: '2026-02-15', professional: 'Dra. Juliana Mendes', consultations: 3, gross: 1200, fee: 120, net: 1080, status: 'paid' },
];

const totalGross = monthlyRevenue.reduce((s, m) => s + m.gross, 0);
const totalFees = monthlyRevenue.reduce((s, m) => s + m.fees, 0);
const currentMonth = monthlyRevenue[monthlyRevenue.length - 1];
const maxGross = Math.max(...monthlyRevenue.map(m => m.gross));

export default function AdminFinanceiroPage() {
  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="overline" color="text.secondary">ADMINISTRAÇÃO</Typography>
          <Typography variant="h4" fontWeight={700}>Financeiro da Plataforma</Typography>
          <Typography variant="body2" color="text.secondary">Visão consolidada de receitas, taxas e repasses</Typography>
        </Box>
        <Button variant="outlined" startIcon={<DownloadIcon />}>Exportar Relatório</Button>
      </Stack>

      <Grid container spacing={2}>
        {[
          { label: 'GMV (Fev)', value: `R$ ${(currentMonth.gross / 1000).toFixed(0)}k`, sub: '+10.3% vs Jan', color: '#9A1BFF', icon: <AttachMoneyIcon /> },
          { label: 'Taxa Plataforma (10%)', value: `R$ ${(currentMonth.fees / 1000).toFixed(1)}k`, sub: 'Receita líquida da plataforma', color: '#2563EB', icon: <ReceiptLongIcon /> },
          { label: 'Repasses (Fev)', value: `R$ ${(currentMonth.net / 1000).toFixed(1)}k`, sub: `${repasses.filter(r => r.status === 'pending').length} pendentes`, color: '#F59E0B', icon: <AccountBalanceIcon /> },
          { label: 'GMV Acumulado (6m)', value: `R$ ${(totalGross / 1000).toFixed(0)}k`, sub: `Taxas: R$ ${(totalFees / 1000).toFixed(0)}k`, color: '#18C964', icon: <TrendingUpIcon /> },
        ].map(s => (
          <Grid key={s.label} size={{ xs: 6, md: 3 }}>
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent sx={{ py: 2 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: tokens.radius.md, bgcolor: `${s.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, mb: 1 }}>{s.icon}</Box>
                <Typography variant="h4" fontWeight={700}>{s.value}</Typography>
                <Typography variant="body2" color="text.secondary">{s.label}</Typography>
                <Typography variant="caption" sx={{ color: s.color, fontWeight: 600 }}>{s.sub}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft, height: '100%' }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Evolução GMV / Taxas (6 meses)</Typography>
              <Stack direction="row" spacing={1} alignItems="flex-end" sx={{ height: 220 }}>
                {monthlyRevenue.map(m => (
                  <Box key={m.month} sx={{ flex: 1, textAlign: 'center' }}>
                    <Typography variant="caption" fontWeight={600} sx={{ mb: 0.5, display: 'block', fontSize: '0.6rem' }}>
                      R$ {(m.gross / 1000).toFixed(0)}k
                    </Typography>
                    <Box sx={{ position: 'relative', mx: 'auto', width: '80%' }}>
                      <Box sx={{ height: `${(m.gross / maxGross) * 160}px`, bgcolor: m.month === 'Fev' ? '#9A1BFF' : '#9A1BFF30', borderRadius: `${tokens.radius.sm} ${tokens.radius.sm} 0 0` }} />
                      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${(m.fees / maxGross) * 160}px`, bgcolor: '#2563EB80', borderRadius: `${tokens.radius.sm} ${tokens.radius.sm} 0 0` }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>{m.month}</Typography>
                  </Box>
                ))}
              </Stack>
              <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 2 }}>
                <Stack direction="row" spacing={0.5} alignItems="center"><Box sx={{ width: 12, height: 12, borderRadius: 2, bgcolor: '#9A1BFF' }} /><Typography variant="caption">GMV</Typography></Stack>
                <Stack direction="row" spacing={0.5} alignItems="center"><Box sx={{ width: 12, height: 12, borderRadius: 2, bgcolor: '#2563EB80' }} /><Typography variant="caption">Taxa 10%</Typography></Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2}>
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 1.5 }}>Receita por Especialidade</Typography>
                <Stack spacing={1}>
                  {[
                    { label: 'Ginecologia', pct: 42, amount: 'R$ 31.5k' },
                    { label: 'Psicologia', pct: 22, amount: 'R$ 16.5k' },
                    { label: 'Nutrição', pct: 16, amount: 'R$ 12.0k' },
                    { label: 'Fisioterapia', pct: 12, amount: 'R$ 9.0k' },
                    { label: 'Dermatologia', pct: 8, amount: 'R$ 6.0k' },
                  ].map(item => (
                    <Box key={item.label}>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.3 }}>
                        <Typography variant="caption">{item.label}</Typography>
                        <Typography variant="caption" fontWeight={600}>{item.amount} ({item.pct}%)</Typography>
                      </Stack>
                      <Box sx={{ height: 8, borderRadius: 4, bgcolor: '#F1F5F9', overflow: 'hidden' }}>
                        <Box sx={{ height: '100%', width: `${item.pct}%`, bgcolor: '#9A1BFF', borderRadius: 4, opacity: 0.5 + (item.pct / 100) }} />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 1.5 }}>Formas de Pagamento</Typography>
                <Stack spacing={1}>
                  {[
                    { label: 'Cartão de Crédito', pct: 48, color: '#9A1BFF' },
                    { label: 'PIX', pct: 32, color: '#18C964' },
                    { label: 'Convênio', pct: 15, color: '#2563EB' },
                    { label: 'Boleto', pct: 5, color: '#F59E0B' },
                  ].map(item => (
                    <Stack key={item.label} direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color }} />
                        <Typography variant="body2">{item.label}</Typography>
                      </Stack>
                      <Chip label={`${item.pct}%`} size="small" sx={{ height: 22, fontWeight: 600 }} />
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Repasses Table */}
      <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h5">Repasses a Profissionais</Typography>
            <Stack direction="row" spacing={1}>
              <Chip label={`${repasses.filter(r => r.status === 'paid').length} Pagos`} color="success" size="small" variant="outlined" />
              <Chip label={`${repasses.filter(r => r.status === 'pending').length} Pendentes`} color="warning" size="small" variant="outlined" />
            </Stack>
          </Stack>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Data Repasse</TableCell>
                  <TableCell>Profissional</TableCell>
                  <TableCell align="right">Consultas</TableCell>
                  <TableCell align="right">Bruto</TableCell>
                  <TableCell align="right">Taxa (10%)</TableCell>
                  <TableCell align="right">Líquido</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {repasses.map(r => (
                  <TableRow key={r.id} hover>
                    <TableCell><Typography variant="body2" fontWeight={600} color="primary">{r.id}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{r.date}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{r.professional}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2">{r.consultations}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2">R$ {r.gross.toLocaleString('pt-BR')}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2" color="secondary">R$ {r.fee.toLocaleString('pt-BR')}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2" fontWeight={700}>R$ {r.net.toLocaleString('pt-BR')}</Typography></TableCell>
                    <TableCell>
                      <Chip label={r.status === 'paid' ? 'Pago' : 'Pendente'} color={r.status === 'paid' ? 'success' : 'warning'} size="small" variant="outlined" sx={{ height: 22, fontSize: '0.65rem' }} />
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
