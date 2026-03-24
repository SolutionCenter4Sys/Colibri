import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack, Grid, Chip, Avatar, Button,
  Paper, Divider, TextField, InputAdornment, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab, Rating,
  MenuItem, Select, FormControl, InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedIcon from '@mui/icons-material/Verified';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import WarningIcon from '@mui/icons-material/Warning';
import DownloadIcon from '@mui/icons-material/Download';
import { tokens } from '../theme/colibri-theme';

type ProfStatus = 'active' | 'pending' | 'suspended' | 'rejected';

interface Professional {
  id: string;
  name: string;
  specialty: string;
  crm: string;
  email: string;
  phone: string;
  rating: number;
  reviews: number;
  patients: number;
  consultations: number;
  revenue: number;
  status: ProfStatus;
  joinedAt: string;
  verified: boolean;
}

const professionals: Professional[] = [
  { id: '1', name: 'Dra. Ana Beatriz Souza', specialty: 'Ginecologia', crm: 'CRM/SP 123456', email: 'ana.beatriz@email.com', phone: '(11) 99876-5432', rating: 4.9, reviews: 127, patients: 142, consultations: 489, revenue: 171150, status: 'active', joinedAt: '2025-01-15', verified: true },
  { id: '2', name: 'Dr. Carlos Eduardo Lima', specialty: 'Psicologia', crm: 'CRP/SP 054321', email: 'carlos.lima@email.com', phone: '(11) 98765-4321', rating: 4.8, reviews: 98, patients: 95, consultations: 312, revenue: 93600, status: 'active', joinedAt: '2025-02-20', verified: true },
  { id: '3', name: 'Dra. Marina Costa', specialty: 'Nutrição', crm: 'CRN/SP 098765', email: 'marina.costa@email.com', phone: '(11) 97654-3210', rating: 4.7, reviews: 76, patients: 88, consultations: 256, revenue: 64000, status: 'active', joinedAt: '2025-03-10', verified: true },
  { id: '4', name: 'Dr. Roberto Ferreira', specialty: 'Fisioterapia', crm: 'CREFITO/SP 112233', email: 'roberto.f@email.com', phone: '(11) 96543-2109', rating: 4.6, reviews: 45, patients: 52, consultations: 178, revenue: 44500, status: 'active', joinedAt: '2025-04-05', verified: true },
  { id: '5', name: 'Dra. Juliana Mendes', specialty: 'Dermatologia', crm: 'CRM/SP 654321', email: 'juliana.m@email.com', phone: '(11) 95432-1098', rating: 4.5, reviews: 34, patients: 41, consultations: 134, revenue: 53600, status: 'active', joinedAt: '2025-05-12', verified: true },
  { id: '6', name: 'Dr. Paulo Henrique', specialty: 'Psiquiatria', crm: 'CRM/SP 789012', email: 'paulo.h@email.com', phone: '(11) 94321-0987', rating: 0, reviews: 0, patients: 0, consultations: 0, revenue: 0, status: 'pending', joinedAt: '2026-02-14', verified: false },
  { id: '7', name: 'Dra. Fernanda Alves', specialty: 'Pediatria', crm: 'CRM/SP 345678', email: 'fernanda.a@email.com', phone: '(11) 93210-9876', rating: 0, reviews: 0, patients: 0, consultations: 0, revenue: 0, status: 'pending', joinedAt: '2026-02-16', verified: false },
  { id: '8', name: 'Dr. Marcos Oliveira', specialty: 'Cardiologia', crm: 'CRM/SP 901234', email: 'marcos.o@email.com', phone: '(11) 92109-8765', rating: 3.2, reviews: 12, patients: 18, consultations: 45, revenue: 18000, status: 'suspended', joinedAt: '2025-06-01', verified: true },
];

const statusConfig: Record<ProfStatus, { label: string; color: 'success' | 'warning' | 'error' | 'default' }> = {
  active: { label: 'Ativo', color: 'success' },
  pending: { label: 'Pendente', color: 'warning' },
  suspended: { label: 'Suspenso', color: 'error' },
  rejected: { label: 'Rejeitado', color: 'default' },
};

export default function AdminProfissionaisPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Professional | null>(null);

  const filtered = professionals.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.specialty.toLowerCase().includes(search.toLowerCase()) || p.crm.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: professionals.length,
    active: professionals.filter(p => p.status === 'active').length,
    pending: professionals.filter(p => p.status === 'pending').length,
    suspended: professionals.filter(p => p.status === 'suspended').length,
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="overline" color="text.secondary">ADMINISTRAÇÃO</Typography>
          <Typography variant="h4" fontWeight={700}>Gestão de Profissionais</Typography>
          <Typography variant="body2" color="text.secondary">{professionals.length} profissionais cadastrados na plataforma</Typography>
        </Box>
        <Button variant="outlined" startIcon={<DownloadIcon />}>Exportar</Button>
      </Stack>

      <Stack direction="row" spacing={2}>
        {[
          { label: 'Total', value: stats.total, color: '#9A1BFF', icon: <PersonIcon /> },
          { label: 'Ativos', value: stats.active, color: '#18C964', icon: <CheckCircleIcon /> },
          { label: 'Pendentes', value: stats.pending, color: '#F59E0B', icon: <WarningIcon /> },
          { label: 'Suspensos', value: stats.suspended, color: '#DC2626', icon: <BlockIcon /> },
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
              placeholder="Buscar por nome, especialidade ou CRM..."
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
                <MenuItem value="suspended">Suspensos</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Profissional</TableCell>
                  <TableCell>CRM</TableCell>
                  <TableCell>Avaliação</TableCell>
                  <TableCell align="right">Pacientes</TableCell>
                  <TableCell align="right">Consultas</TableCell>
                  <TableCell align="right">Receita</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.slice(page * 6, page * 6 + 6).map(p => (
                  <TableRow key={p.id} hover sx={{ cursor: 'pointer' }} onClick={() => setSelected(p)}>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 36, height: 36, bgcolor: '#9A1BFF', fontSize: '0.75rem' }}>{p.name.split(' ').filter((_,i)=>i===0||i===p.name.split(' ').length-1).map(n=>n[0]).join('')}</Avatar>
                        <Box>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Typography variant="body2" fontWeight={600}>{p.name}</Typography>
                            {p.verified && <VerifiedIcon sx={{ fontSize: 14, color: '#2563EB' }} />}
                          </Stack>
                          <Typography variant="caption" color="text.secondary">{p.specialty}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell><Typography variant="body2">{p.crm}</Typography></TableCell>
                    <TableCell>
                      {p.rating > 0 ? (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <StarIcon sx={{ fontSize: 14, color: '#F59E0B' }} />
                          <Typography variant="body2" fontWeight={600}>{p.rating}</Typography>
                          <Typography variant="caption" color="text.secondary">({p.reviews})</Typography>
                        </Stack>
                      ) : <Typography variant="caption" color="text.secondary">—</Typography>}
                    </TableCell>
                    <TableCell align="right"><Typography variant="body2">{p.patients}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2">{p.consultations}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2" fontWeight={600}>R$ {(p.revenue / 1000).toFixed(1)}k</Typography></TableCell>
                    <TableCell><Chip label={statusConfig[p.status].label} color={statusConfig[p.status].color} size="small" variant="outlined" sx={{ height: 22 }} /></TableCell>
                    <TableCell align="right">
                      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination component="div" count={filtered.length} page={page} rowsPerPage={6} onPageChange={(_, p) => setPage(p)} onRowsPerPageChange={() => {}} labelRowsPerPage="Por página" />
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: tokens.radius.lg } }}>
        {selected && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 56, height: 56, bgcolor: '#9A1BFF', fontSize: '1.2rem' }}>{selected.name.charAt(0)}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Typography variant="h5" fontWeight={700}>{selected.name}</Typography>
                    {selected.verified && <VerifiedIcon sx={{ fontSize: 18, color: '#2563EB' }} />}
                  </Stack>
                  <Typography variant="body2" color="text.secondary">{selected.specialty} — {selected.crm}</Typography>
                  <Chip label={statusConfig[selected.status].label} color={statusConfig[selected.status].color} size="small" variant="outlined" sx={{ mt: 0.5, height: 22 }} />
                </Box>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} sx={{ mt: 1 }}>
                <Grid container spacing={1.5}>
                  {[
                    { label: 'Pacientes', value: selected.patients },
                    { label: 'Consultas', value: selected.consultations },
                    { label: 'Avaliações', value: selected.reviews },
                    { label: 'Receita', value: `R$ ${(selected.revenue / 1000).toFixed(1)}k` },
                  ].map(s => (
                    <Grid key={s.label} size={{ xs: 6, md: 3 }}>
                      <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: tokens.colors.surface.subtle, borderRadius: tokens.radius.md }}>
                        <Typography variant="h5" fontWeight={700}>{s.value}</Typography>
                        <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                <Divider />
                <Stack spacing={0.5}>
                  <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">E-mail</Typography><Typography variant="body2">{selected.email}</Typography></Stack>
                  <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Telefone</Typography><Typography variant="body2">{selected.phone}</Typography></Stack>
                  <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Cadastro</Typography><Typography variant="body2">{selected.joinedAt}</Typography></Stack>
                  <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Rating</Typography><Stack direction="row" spacing={0.5} alignItems="center"><Rating value={selected.rating} precision={0.1} readOnly size="small" /><Typography variant="body2">{selected.rating}</Typography></Stack></Stack>
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              {selected.status === 'pending' && (
                <>
                  <Button variant="outlined" color="error">Rejeitar</Button>
                  <Button variant="contained" color="success">Aprovar</Button>
                </>
              )}
              {selected.status === 'active' && <Button variant="outlined" color="error" startIcon={<BlockIcon />}>Suspender</Button>}
              {selected.status === 'suspended' && <Button variant="contained" color="success" startIcon={<CheckCircleIcon />}>Reativar</Button>}
              <Button variant="outlined" onClick={() => setSelected(null)}>Fechar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Stack>
  );
}
