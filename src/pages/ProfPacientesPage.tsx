import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack, Grid, Chip, Avatar, Button,
  Paper, Divider, TextField, InputAdornment, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import { tokens } from '../theme/colibri-theme';
import { mockPatients } from '../mock/data';

const statusConfig = {
  active: { label: 'Ativo', color: 'success' as const },
  pending: { label: 'Pendente', color: 'warning' as const },
  inactive: { label: 'Inativo', color: 'default' as const },
};

const patientDetails = {
  '1': { age: 34, bloodType: 'O+', allergies: 'Dipirona', insurance: 'Unimed', conditions: 'Nenhuma', visits: 12, notes: 'Paciente acompanhada desde 2025. Histórico de endometriose tratada.' },
  '2': { age: 29, bloodType: 'A+', allergies: 'Nenhuma', insurance: 'Bradesco Saúde', conditions: 'SOP', visits: 8, notes: 'Tratamento para SOP em andamento. Boa adesão ao tratamento.' },
  '3': { age: 38, bloodType: 'B-', allergies: 'Penicilina', insurance: 'SulAmérica', conditions: 'Hipertensão', visits: 0, notes: 'Nova paciente. Primeira consulta agendada.' },
  '4': { age: 42, bloodType: 'AB+', allergies: 'Nenhuma', insurance: 'Amil', conditions: 'Diabetes Tipo 2', visits: 5, notes: 'Acompanhamento de rotina. Precisa renovar exames.' },
  '5': { age: 31, bloodType: 'O-', allergies: 'Sulfa', insurance: 'Unimed', conditions: 'Nenhuma', visits: 15, notes: 'Gestante - pré-natal em andamento. 28 semanas.' },
  '6': { age: 45, bloodType: 'A-', allergies: 'Nenhuma', insurance: 'Particular', conditions: 'Nenhuma', visits: 3, notes: 'Última consulta há 3 meses. Contatar para retorno.' },
  '7': { age: 27, bloodType: 'B+', allergies: 'Latex', insurance: 'NotreDame', conditions: 'Endometriose', visits: 10, notes: 'Em tratamento para endometriose. Resultado de exames pendente.' },
  '8': { age: 33, bloodType: 'O+', allergies: 'Nenhuma', insurance: 'Bradesco Saúde', conditions: 'Nenhuma', visits: 0, notes: 'Nova paciente aguardando primeira consulta.' },
} as Record<string, { age: number; bloodType: string; allergies: string; insurance: string; conditions: string; visits: number; notes: string }>;

export default function ProfPacientesPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState(0);

  const filtered = mockPatients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  );

  const patient = selectedPatient ? mockPatients.find(p => p.id === selectedPatient) : null;
  const details = selectedPatient ? patientDetails[selectedPatient] : null;

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="overline" color="text.secondary">PACIENTES</Typography>
          <Typography variant="h4" fontWeight={700}>Meus Pacientes</Typography>
          <Typography variant="body2" color="text.secondary">{mockPatients.length} pacientes cadastrados</Typography>
        </Box>
      </Stack>

      {/* Stats */}
      <Stack direction="row" spacing={2}>
        {[
          { label: 'Total', value: mockPatients.length, color: '#9A1BFF' },
          { label: 'Ativos', value: mockPatients.filter(p => p.status === 'active').length, color: '#18C964' },
          { label: 'Pendentes', value: mockPatients.filter(p => p.status === 'pending').length, color: '#F59E0B' },
          { label: 'Inativos', value: mockPatients.filter(p => p.status === 'inactive').length, color: '#94A3B8' },
        ].map(s => (
          <Paper key={s.label} sx={{ px: 2, py: 1.5, flex: 1, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} sx={{ color: s.color }}>{s.value}</Typography>
            <Typography variant="caption" color="text.secondary">{s.label}</Typography>
          </Paper>
        ))}
      </Stack>

      {/* Search + Table */}
      <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
        <CardContent>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <TextField
              placeholder="Buscar por nome, e-mail ou telefone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                endAdornment: search && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearch('')}><ClearIcon fontSize="small" /></IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="outlined" startIcon={<FilterListIcon />}>Filtrar</Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Paciente</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Última Visita</TableCell>
                  <TableCell>Próx. Consulta</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.slice(page * 5, page * 5 + 5).map((p) => (
                  <TableRow key={p.id} hover sx={{ cursor: 'pointer' }} onClick={() => { setSelectedPatient(p.id); setDetailTab(0); }}>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 36, height: 36, bgcolor: '#9A1BFF', fontSize: '0.8rem' }}>
                          {p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>{p.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{p.email}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell><Typography variant="body2">{p.phone}</Typography></TableCell>
                    <TableCell>
                      <Chip label={statusConfig[p.status].label} color={statusConfig[p.status].color} size="small" variant="outlined" sx={{ height: 22 }} />
                    </TableCell>
                    <TableCell><Typography variant="body2">{p.lastVisit || '—'}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{p.nextAppointment || '—'}</Typography></TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => { e.stopPropagation(); setSelectedPatient(p.id); setDetailTab(0); }}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            rowsPerPage={5}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={() => {}}
            labelRowsPerPage="Linhas por página"
          />
        </CardContent>
      </Card>

      {/* Patient Detail Dialog */}
      <Dialog open={!!selectedPatient} onClose={() => setSelectedPatient(null)} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: tokens.radius.lg } }}>
        {patient && details && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 56, height: 56, bgcolor: '#9A1BFF', fontSize: '1.2rem' }}>
                  {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" fontWeight={700}>{patient.name}</Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label={statusConfig[patient.status].label} color={statusConfig[patient.status].color} size="small" variant="outlined" sx={{ height: 22 }} />
                    <Chip label={`${details.age} anos`} size="small" variant="outlined" sx={{ height: 22 }} />
                    <Chip label={`Tipo ${details.bloodType}`} size="small" color="error" variant="outlined" sx={{ height: 22 }} />
                    <Chip label={details.insurance} size="small" color="info" variant="outlined" sx={{ height: 22 }} />
                  </Stack>
                </Box>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Tabs value={detailTab} onChange={(_, v) => setDetailTab(v)} sx={{ mb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Tab label="Resumo" icon={<PersonIcon />} iconPosition="start" />
                <Tab label="Histórico" icon={<CalendarMonthIcon />} iconPosition="start" />
                <Tab label="Prontuário" icon={<DescriptionIcon />} iconPosition="start" />
              </Tabs>

              {detailTab === 0 && (
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 2, bgcolor: tokens.colors.surface.subtle, borderRadius: tokens.radius.md }}>
                      <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>Contato</Typography>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">{patient.email}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">{patient.phone}</Typography>
                        </Stack>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 2, bgcolor: tokens.colors.surface.subtle, borderRadius: tokens.radius.md }}>
                      <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>Saúde</Typography>
                      <Stack spacing={0.5}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="caption" color="text.secondary">Alergias</Typography>
                          <Chip label={details.allergies} size="small" color={details.allergies !== 'Nenhuma' ? 'error' : 'default'} variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="caption" color="text.secondary">Condições</Typography>
                          <Typography variant="caption" fontWeight={600}>{details.conditions}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="caption" color="text.secondary">Total Consultas</Typography>
                          <Typography variant="caption" fontWeight={600}>{details.visits}</Typography>
                        </Stack>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid size={12}>
                    <Paper sx={{ p: 2, bgcolor: tokens.colors.surface.subtle, borderRadius: tokens.radius.md }}>
                      <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Observações</Typography>
                      <Typography variant="body2" color="text.secondary">{details.notes}</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              )}

              {detailTab === 1 && (
                <Stack spacing={1.5}>
                  {[
                    { date: '2026-02-10', type: 'Consulta', desc: 'Consulta de rotina. Solicitados exames.' },
                    { date: '2026-01-15', type: 'Retorno', desc: 'Retorno com resultados normais.' },
                    { date: '2025-12-05', type: 'Exame', desc: 'Mamografia anual - sem alterações.' },
                  ].map((h, i) => (
                    <Paper key={i} sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip label={h.type} size="small" variant="outlined" sx={{ height: 22 }} />
                          <Typography variant="body2">{h.desc}</Typography>
                        </Stack>
                        <Typography variant="caption" color="text.secondary">{h.date}</Typography>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              )}

              {detailTab === 2 && (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <DescriptionIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                  <Typography variant="body1" color="text.secondary">Clique para abrir o prontuário completo</Typography>
                  <Button variant="contained" sx={{ mt: 2 }}>Abrir Prontuário</Button>
                </Box>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button variant="outlined" onClick={() => setSelectedPatient(null)}>Fechar</Button>
              <Button variant="contained" startIcon={<CalendarMonthIcon />}>Agendar Consulta</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Stack>
  );
}
