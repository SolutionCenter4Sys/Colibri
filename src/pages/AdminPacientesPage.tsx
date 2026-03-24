import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack, Grid, Chip, Avatar, Button,
  Paper, Divider, TextField, InputAdornment, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import BlockIcon from '@mui/icons-material/Block';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DownloadIcon from '@mui/icons-material/Download';
import { tokens } from '../theme/colibri-theme';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  age: number;
  status: 'active' | 'pending' | 'blocked';
  registeredAt: string;
  totalConsultations: number;
  totalSpent: number;
  lastActivity: string;
  insurance: string;
}

const patients: Patient[] = [
  { id: '1', name: 'Maria Silva Santos', email: 'maria@email.com', phone: '(11) 98765-4321', cpf: '***.***.***-12', age: 34, status: 'active', registeredAt: '2025-03-15', totalConsultations: 12, totalSpent: 4200, lastActivity: '2026-02-15', insurance: 'Unimed' },
  { id: '2', name: 'Juliana Costa Oliveira', email: 'juliana@email.com', phone: '(11) 97654-3210', cpf: '***.***.***-34', age: 29, status: 'active', registeredAt: '2025-04-20', totalConsultations: 8, totalSpent: 2400, lastActivity: '2026-02-14', insurance: 'Bradesco Saúde' },
  { id: '3', name: 'Beatriz Martins Souza', email: 'beatriz@email.com', phone: '(11) 96543-2109', cpf: '***.***.***-56', age: 38, status: 'active', registeredAt: '2025-05-10', totalConsultations: 15, totalSpent: 5250, lastActivity: '2026-02-13', insurance: 'SulAmérica' },
  { id: '4', name: 'Fernanda Lima Pereira', email: 'fernanda@email.com', phone: '(11) 95432-1098', cpf: '***.***.***-78', age: 42, status: 'active', registeredAt: '2025-06-01', totalConsultations: 5, totalSpent: 1750, lastActivity: '2026-02-10', insurance: 'Amil' },
  { id: '5', name: 'Larissa Santos Lima', email: 'larissa@email.com', phone: '(11) 94321-0987', cpf: '***.***.***-90', age: 31, status: 'active', registeredAt: '2025-07-15', totalConsultations: 20, totalSpent: 7000, lastActivity: '2026-02-16', insurance: 'Unimed' },
  { id: '6', name: 'Gabriela Almeida Nunes', email: 'gabriela@email.com', phone: '(11) 93210-9876', cpf: '***.***.***-11', age: 27, status: 'pending', registeredAt: '2026-02-14', totalConsultations: 0, totalSpent: 0, lastActivity: '2026-02-14', insurance: 'Particular' },
  { id: '7', name: 'Camila Rodrigues Alves', email: 'camila@email.com', phone: '(11) 92109-8765', cpf: '***.***.***-22', age: 36, status: 'active', registeredAt: '2025-08-20', totalConsultations: 3, totalSpent: 1050, lastActivity: '2026-02-08', insurance: 'NotreDame' },
  { id: '8', name: 'Amanda Ferreira Costa', email: 'amanda@email.com', phone: '(11) 91098-7654', cpf: '***.***.***-33', age: 45, status: 'blocked', registeredAt: '2025-09-10', totalConsultations: 2, totalSpent: 700, lastActivity: '2026-01-20', insurance: 'Bradesco Saúde' },
  { id: '9', name: 'Renata Souza Dias', email: 'renata@email.com', phone: '(11) 90987-6543', cpf: '***.***.***-44', age: 33, status: 'active', registeredAt: '2025-10-05', totalConsultations: 6, totalSpent: 2100, lastActivity: '2026-02-12', insurance: 'Particular' },
  { id: '10', name: 'Patrícia Oliveira Cruz', email: 'patricia@email.com', phone: '(11) 89876-5432', cpf: '***.***.***-55', age: 40, status: 'pending', registeredAt: '2026-02-16', totalConsultations: 0, totalSpent: 0, lastActivity: '2026-02-16', insurance: 'Amil' },
];

const statusConfig = {
  active: { label: 'Ativo', color: 'success' as const },
  pending: { label: 'Pendente', color: 'warning' as const },
  blocked: { label: 'Bloqueado', color: 'error' as const },
};

export default function AdminPacientesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Patient | null>(null);

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="overline" color="text.secondary">ADMINISTRAÇÃO</Typography>
          <Typography variant="h4" fontWeight={700}>Gestão de Pacientes</Typography>
          <Typography variant="body2" color="text.secondary">{patients.length} pacientes na plataforma</Typography>
        </Box>
        <Button variant="outlined" startIcon={<DownloadIcon />}>Exportar</Button>
      </Stack>

      <Stack direction="row" spacing={2}>
        {[
          { label: 'Total', value: patients.length, color: '#9A1BFF', icon: <PersonIcon /> },
          { label: 'Ativos', value: patients.filter(p => p.status === 'active').length, color: '#18C964', icon: <CheckCircleIcon /> },
          { label: 'Pendentes', value: patients.filter(p => p.status === 'pending').length, color: '#F59E0B', icon: <PendingIcon /> },
          { label: 'Bloqueados', value: patients.filter(p => p.status === 'blocked').length, color: '#DC2626', icon: <BlockIcon /> },
        ].map(s => (
          <Paper key={s.label} sx={{ px: 2, py: 1.5, flex: 1, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ color: s.color }}>{s.icon}</Box>
              <Box>
                <Typography variant="h5" fontWeight={700}>{s.value}</Typography>
                <Typography variant="caption" color="text.secondary">{s.label}</Typography>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
        <CardContent>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <TextField
              placeholder="Buscar por nome ou e-mail..."
              value={search} onChange={(e) => setSearch(e.target.value)} size="small" sx={{ flex: 1 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                endAdornment: search ? <InputAdornment position="end"><IconButton size="small" onClick={() => setSearch('')}><ClearIcon fontSize="small" /></IconButton></InputAdornment> : null,
              }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="active">Ativos</MenuItem>
                <MenuItem value="pending">Pendentes</MenuItem>
                <MenuItem value="blocked">Bloqueados</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Paciente</TableCell>
                  <TableCell>CPF</TableCell>
                  <TableCell>Convênio</TableCell>
                  <TableCell align="right">Consultas</TableCell>
                  <TableCell align="right">Total Gasto</TableCell>
                  <TableCell>Última Atividade</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.slice(page * 6, page * 6 + 6).map(p => (
                  <TableRow key={p.id} hover sx={{ cursor: 'pointer' }} onClick={() => setSelected(p)}>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 36, height: 36, bgcolor: '#9A1BFF', fontSize: '0.75rem' }}>{p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>{p.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{p.email}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell><Typography variant="body2">{p.cpf}</Typography></TableCell>
                    <TableCell><Chip label={p.insurance} size="small" variant="outlined" sx={{ height: 22 }} /></TableCell>
                    <TableCell align="right"><Typography variant="body2">{p.totalConsultations}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2" fontWeight={600}>R$ {p.totalSpent.toLocaleString('pt-BR')}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{p.lastActivity}</Typography></TableCell>
                    <TableCell><Chip label={statusConfig[p.status].label} color={statusConfig[p.status].color} size="small" variant="outlined" sx={{ height: 22 }} /></TableCell>
                    <TableCell align="right"><IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination component="div" count={filtered.length} page={page} rowsPerPage={6} onPageChange={(_, p) => setPage(p)} onRowsPerPageChange={() => {}} labelRowsPerPage="Por página" />
        </CardContent>
      </Card>

      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: tokens.radius.lg } }}>
        {selected && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 56, height: 56, bgcolor: '#9A1BFF', fontSize: '1.2rem' }}>{selected.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>{selected.name}</Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label={statusConfig[selected.status].label} color={statusConfig[selected.status].color} size="small" variant="outlined" sx={{ height: 22 }} />
                    <Chip label={`${selected.age} anos`} size="small" variant="outlined" sx={{ height: 22 }} />
                    <Chip label={selected.insurance} size="small" color="info" variant="outlined" sx={{ height: 22 }} />
                  </Stack>
                </Box>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} sx={{ mt: 1 }}>
                <Grid container spacing={1.5}>
                  {[
                    { label: 'Consultas', value: selected.totalConsultations },
                    { label: 'Total Gasto', value: `R$ ${selected.totalSpent.toLocaleString('pt-BR')}` },
                    { label: 'Cadastro', value: selected.registeredAt },
                  ].map(s => (
                    <Grid key={s.label} size={{ xs: 4 }}>
                      <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: tokens.colors.surface.subtle, borderRadius: tokens.radius.md }}>
                        <Typography variant="body1" fontWeight={700}>{s.value}</Typography>
                        <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                <Divider />
                <Stack spacing={0.5}>
                  <Stack direction="row" spacing={1} alignItems="center"><EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} /><Typography variant="body2">{selected.email}</Typography></Stack>
                  <Stack direction="row" spacing={1} alignItems="center"><PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} /><Typography variant="body2">{selected.phone}</Typography></Stack>
                  <Stack direction="row" spacing={1} alignItems="center"><CalendarMonthIcon sx={{ fontSize: 16, color: 'text.secondary' }} /><Typography variant="body2">Última atividade: {selected.lastActivity}</Typography></Stack>
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              {selected.status === 'active' && <Button variant="outlined" color="error" startIcon={<BlockIcon />}>Bloquear</Button>}
              {selected.status === 'blocked' && <Button variant="contained" color="success" startIcon={<CheckCircleIcon />}>Desbloquear</Button>}
              <Button variant="outlined" onClick={() => setSelected(null)}>Fechar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Stack>
  );
}
