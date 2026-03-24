import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack, Grid, Chip, Avatar, Button,
  Paper, TextField, InputAdornment, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Dialog, DialogTitle, DialogContent, DialogActions, Divider,
  FormControl, InputLabel, Select, MenuItem, ToggleButtonGroup, ToggleButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VideocamIcon from '@mui/icons-material/Videocam';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import { tokens } from '../theme/colibri-theme';

type ConsultStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';

interface Consultation {
  id: string;
  date: string;
  time: string;
  patient: string;
  professional: string;
  specialty: string;
  type: string;
  modality: 'Presencial' | 'Teleconsulta';
  value: number;
  status: ConsultStatus;
  duration: string;
}

const consultations: Consultation[] = [
  { id: 'C-001', date: '2026-02-18', time: '10:00', patient: 'Maria Silva Santos', professional: 'Dra. Ana Beatriz', specialty: 'Ginecologia', type: 'Consulta', modality: 'Presencial', value: 350, status: 'scheduled', duration: '40 min' },
  { id: 'C-002', date: '2026-02-18', time: '11:00', patient: 'Juliana Costa Oliveira', professional: 'Dra. Ana Beatriz', specialty: 'Ginecologia', type: 'Retorno', modality: 'Teleconsulta', value: 250, status: 'scheduled', duration: '20 min' },
  { id: 'C-003', date: '2026-02-18', time: '14:00', patient: 'Beatriz Martins Souza', professional: 'Dra. Ana Beatriz', specialty: 'Ginecologia', type: 'Consulta', modality: 'Presencial', value: 350, status: 'scheduled', duration: '40 min' },
  { id: 'C-004', date: '2026-02-17', time: '09:00', patient: 'Patrícia Oliveira Cruz', professional: 'Dr. Carlos Lima', specialty: 'Psicologia', type: 'Sessão', modality: 'Teleconsulta', value: 300, status: 'completed', duration: '50 min' },
  { id: 'C-005', date: '2026-02-17', time: '10:00', patient: 'Larissa Santos Lima', professional: 'Dra. Marina Costa', specialty: 'Nutrição', type: 'Consulta', modality: 'Presencial', value: 250, status: 'completed', duration: '30 min' },
  { id: 'C-006', date: '2026-02-17', time: '14:00', patient: 'Gabriela Almeida Nunes', professional: 'Dr. Roberto Ferreira', specialty: 'Fisioterapia', type: 'Sessão', modality: 'Presencial', value: 250, status: 'completed', duration: '45 min' },
  { id: 'C-007', date: '2026-02-16', time: '10:00', patient: 'Ana Paula Dias', professional: 'Dra. Ana Beatriz', specialty: 'Ginecologia', type: 'Consulta', modality: 'Presencial', value: 350, status: 'completed', duration: '40 min' },
  { id: 'C-008', date: '2026-02-16', time: '15:00', patient: 'Camila Rodrigues Alves', professional: 'Dra. Juliana Mendes', specialty: 'Dermatologia', type: 'Consulta', modality: 'Teleconsulta', value: 400, status: 'cancelled', duration: '—' },
  { id: 'C-009', date: '2026-02-19', time: '09:00', patient: 'Fernanda Lima Pereira', professional: 'Dra. Ana Beatriz', specialty: 'Ginecologia', type: 'Consulta', modality: 'Presencial', value: 350, status: 'scheduled', duration: '40 min' },
  { id: 'C-010', date: '2026-02-15', time: '11:00', patient: 'Amanda Ferreira Costa', professional: 'Dr. Carlos Lima', specialty: 'Psicologia', type: 'Sessão', modality: 'Teleconsulta', value: 300, status: 'no_show', duration: '—' },
  { id: 'C-011', date: '2026-02-18', time: '09:00', patient: 'Renata Souza Dias', professional: 'Dra. Marina Costa', specialty: 'Nutrição', type: 'Retorno', modality: 'Presencial', value: 200, status: 'in_progress', duration: '30 min' },
  { id: 'C-012', date: '2026-02-19', time: '10:00', patient: 'Larissa Santos Lima', professional: 'Dra. Ana Beatriz', specialty: 'Ginecologia', type: 'Exame', modality: 'Presencial', value: 300, status: 'scheduled', duration: '30 min' },
];

const statusCfg: Record<ConsultStatus, { label: string; color: 'info' | 'warning' | 'success' | 'error' | 'default' }> = {
  scheduled: { label: 'Agendada', color: 'info' },
  in_progress: { label: 'Em Andamento', color: 'warning' },
  completed: { label: 'Realizada', color: 'success' },
  cancelled: { label: 'Cancelada', color: 'error' },
  no_show: { label: 'No-Show', color: 'default' },
};

export default function AdminConsultasPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Consultation | null>(null);

  const filtered = consultations.filter(c => {
    const matchSearch = c.patient.toLowerCase().includes(search.toLowerCase()) || c.professional.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: consultations.length,
    scheduled: consultations.filter(c => c.status === 'scheduled').length,
    completed: consultations.filter(c => c.status === 'completed').length,
    cancelled: consultations.filter(c => c.status === 'cancelled' || c.status === 'no_show').length,
    revenue: consultations.filter(c => c.status === 'completed').reduce((s, c) => s + c.value, 0),
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="overline" color="text.secondary">ADMINISTRAÇÃO</Typography>
          <Typography variant="h4" fontWeight={700}>Gestão de Consultas</Typography>
          <Typography variant="body2" color="text.secondary">Monitoramento de todas as consultas da plataforma</Typography>
        </Box>
        <Button variant="outlined" startIcon={<DownloadIcon />}>Exportar</Button>
      </Stack>

      <Grid container spacing={2}>
        {[
          { label: 'Total', value: stats.total, sub: 'esta semana', color: '#9A1BFF', icon: <EventIcon /> },
          { label: 'Agendadas', value: stats.scheduled, sub: 'próximos dias', color: '#2563EB', icon: <PendingIcon /> },
          { label: 'Realizadas', value: stats.completed, sub: `R$ ${stats.revenue.toLocaleString('pt-BR')}`, color: '#18C964', icon: <CheckCircleIcon /> },
          { label: 'Canceladas / No-Show', value: stats.cancelled, sub: `${((stats.cancelled / stats.total) * 100).toFixed(0)}% do total`, color: '#DC2626', icon: <CancelIcon /> },
        ].map(s => (
          <Grid key={s.label} size={{ xs: 6, md: 3 }}>
            <Paper sx={{ px: 2, py: 1.5, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ color: s.color }}>{s.icon}</Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>{s.value}</Typography>
                  <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: s.color, fontWeight: 600 }}>{s.sub}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
        <CardContent>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <TextField
              placeholder="Buscar por paciente, profissional ou ID..."
              value={search} onChange={(e) => setSearch(e.target.value)} size="small" sx={{ flex: 1 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                endAdornment: search ? <InputAdornment position="end"><IconButton size="small" onClick={() => setSearch('')}><ClearIcon fontSize="small" /></IconButton></InputAdornment> : null,
              }}
            />
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="scheduled">Agendadas</MenuItem>
                <MenuItem value="in_progress">Em Andamento</MenuItem>
                <MenuItem value="completed">Realizadas</MenuItem>
                <MenuItem value="cancelled">Canceladas</MenuItem>
                <MenuItem value="no_show">No-Show</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Data / Hora</TableCell>
                  <TableCell>Paciente</TableCell>
                  <TableCell>Profissional</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Modalidade</TableCell>
                  <TableCell align="right">Valor</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.slice(page * 8, page * 8 + 8).map(c => (
                  <TableRow key={c.id} hover sx={{ cursor: 'pointer' }} onClick={() => setSelected(c)}>
                    <TableCell><Typography variant="body2" fontWeight={600} color="primary">{c.id}</Typography></TableCell>
                    <TableCell>
                      <Typography variant="body2">{c.date}</Typography>
                      <Typography variant="caption" color="text.secondary">{c.time} — {c.duration}</Typography>
                    </TableCell>
                    <TableCell><Typography variant="body2">{c.patient}</Typography></TableCell>
                    <TableCell>
                      <Typography variant="body2">{c.professional}</Typography>
                      <Typography variant="caption" color="text.secondary">{c.specialty}</Typography>
                    </TableCell>
                    <TableCell><Chip label={c.type} size="small" variant="outlined" sx={{ height: 22, fontSize: '0.65rem' }} /></TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        {c.modality === 'Teleconsulta' ? <VideocamIcon sx={{ fontSize: 14, color: '#2563EB' }} /> : <LocationOnIcon sx={{ fontSize: 14, color: '#18C964' }} />}
                        <Typography variant="caption">{c.modality}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right"><Typography variant="body2" fontWeight={600}>R$ {c.value}</Typography></TableCell>
                    <TableCell><Chip label={statusCfg[c.status].label} color={statusCfg[c.status].color} size="small" variant="outlined" sx={{ height: 22, fontSize: '0.65rem' }} /></TableCell>
                    <TableCell align="right"><IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination component="div" count={filtered.length} page={page} rowsPerPage={8} onPageChange={(_, p) => setPage(p)} onRowsPerPageChange={() => {}} labelRowsPerPage="Por página" />
        </CardContent>
      </Card>

      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: tokens.radius.lg } }}>
        {selected && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" fontWeight={700}>Consulta {selected.id}</Typography>
                <Chip label={statusCfg[selected.status].label} color={statusCfg[selected.status].color} size="small" />
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={1.5}>
                <Paper sx={{ p: 2, bgcolor: tokens.colors.surface.subtle, borderRadius: tokens.radius.md }}>
                  <Stack spacing={0.5}>
                    <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Data / Hora</Typography><Typography variant="body2" fontWeight={600}>{selected.date} às {selected.time}</Typography></Stack>
                    <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Duração</Typography><Typography variant="body2">{selected.duration}</Typography></Stack>
                    <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Modalidade</Typography><Stack direction="row" spacing={0.5} alignItems="center">{selected.modality === 'Teleconsulta' ? <VideocamIcon sx={{ fontSize: 14 }} /> : <LocationOnIcon sx={{ fontSize: 14 }} />}<Typography variant="body2">{selected.modality}</Typography></Stack></Stack>
                  </Stack>
                </Paper>
                <Divider />
                <Stack spacing={0.5}>
                  <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Paciente</Typography><Typography variant="body2" fontWeight={600}>{selected.patient}</Typography></Stack>
                  <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Profissional</Typography><Typography variant="body2" fontWeight={600}>{selected.professional}</Typography></Stack>
                  <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Especialidade</Typography><Typography variant="body2">{selected.specialty}</Typography></Stack>
                  <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Tipo</Typography><Chip label={selected.type} size="small" variant="outlined" sx={{ height: 22 }} /></Stack>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">Valor</Typography>
                  <Typography variant="h5" fontWeight={700} color="primary">R$ {selected.value},00</Typography>
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              {selected.status === 'scheduled' && <Button variant="outlined" color="error">Cancelar Consulta</Button>}
              <Button variant="outlined" onClick={() => setSelected(null)}>Fechar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Stack>
  );
}
