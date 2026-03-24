import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack, Grid, Chip, Avatar, Button,
  Paper, Divider, IconButton, ToggleButtonGroup, ToggleButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import BlockIcon from '@mui/icons-material/Block';
import VideocamIcon from '@mui/icons-material/Videocam';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import { tokens } from '../theme/colibri-theme';

const weekDays = [
  { date: '2026-02-16', label: 'Seg', day: '16' },
  { date: '2026-02-17', label: 'Ter', day: '17' },
  { date: '2026-02-18', label: 'Qua', day: '18' },
  { date: '2026-02-19', label: 'Qui', day: '19' },
  { date: '2026-02-20', label: 'Sex', day: '20' },
  { date: '2026-02-21', label: 'Sáb', day: '21' },
];

const timeSlots = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];

type SlotStatus = 'available' | 'booked' | 'blocked' | 'completed';

interface Slot {
  time: string;
  date: string;
  status: SlotStatus;
  patient?: string;
  type?: string;
  modality?: string;
}

const generateSlots = (): Slot[] => {
  const slots: Slot[] = [];
  weekDays.forEach(d => {
    timeSlots.forEach(t => {
      slots.push({ time: t, date: d.date, status: 'available' });
    });
  });
  const booked: Partial<Slot>[] = [
    { date: '2026-02-18', time: '10:00', status: 'booked', patient: 'Maria Silva Santos', type: 'Consulta', modality: 'Presencial' },
    { date: '2026-02-18', time: '11:00', status: 'booked', patient: 'Juliana Costa Oliveira', type: 'Retorno', modality: 'Teleconsulta' },
    { date: '2026-02-18', time: '14:00', status: 'booked', patient: 'Beatriz Martins Souza', type: 'Consulta', modality: 'Presencial' },
    { date: '2026-02-19', time: '09:00', status: 'booked', patient: 'Fernanda Lima Pereira', type: 'Consulta', modality: 'Presencial' },
    { date: '2026-02-19', time: '10:00', status: 'booked', patient: 'Larissa Santos Lima', type: 'Exame', modality: 'Presencial' },
    { date: '2026-02-19', time: '14:00', status: 'booked', patient: 'Gabriela Almeida Nunes', type: 'Consulta', modality: 'Teleconsulta' },
    { date: '2026-02-20', time: '10:00', status: 'booked', patient: 'Camila Rodrigues Alves', type: 'Retorno', modality: 'Presencial' },
    { date: '2026-02-20', time: '15:00', status: 'booked', patient: 'Amanda Ferreira Costa', type: 'Consulta', modality: 'Teleconsulta' },
    { date: '2026-02-16', time: '10:00', status: 'completed', patient: 'Ana Paula Dias', type: 'Consulta', modality: 'Presencial' },
    { date: '2026-02-16', time: '11:00', status: 'completed', patient: 'Renata Souza', type: 'Retorno', modality: 'Presencial' },
    { date: '2026-02-17', time: '09:00', status: 'completed', patient: 'Patrícia Oliveira', type: 'Consulta', modality: 'Teleconsulta' },
    { date: '2026-02-18', time: '12:00', status: 'blocked' },
    { date: '2026-02-18', time: '13:00', status: 'blocked' },
    { date: '2026-02-21', time: '08:00', status: 'blocked' },
    { date: '2026-02-21', time: '09:00', status: 'blocked' },
    { date: '2026-02-21', time: '10:00', status: 'blocked' },
    { date: '2026-02-21', time: '11:00', status: 'blocked' },
  ];
  booked.forEach(b => {
    const idx = slots.findIndex(s => s.date === b.date && s.time === b.time);
    if (idx >= 0) slots[idx] = { ...slots[idx], ...b } as Slot;
  });
  return slots;
};

const statusColors: Record<SlotStatus, string> = {
  available: '#18C964', booked: '#2563EB', blocked: '#94A3B8', completed: '#9A1BFF',
};

export default function ProfAgendaPage() {
  const [slots] = useState(generateSlots);
  const [view, setView] = useState<'week' | 'day'>('week');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [blockDialog, setBlockDialog] = useState(false);

  const getSlot = (date: string, time: string) => slots.find(s => s.date === date && s.time === time);

  const stats = {
    total: slots.filter(s => s.status === 'booked').length,
    available: slots.filter(s => s.status === 'available').length,
    blocked: slots.filter(s => s.status === 'blocked').length,
    completed: slots.filter(s => s.status === 'completed').length,
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="overline" color="text.secondary">AGENDA</Typography>
          <Typography variant="h4" fontWeight={700}>Minha Agenda</Typography>
          <Typography variant="body2" color="text.secondary">Semana de 16 a 21 de Fevereiro, 2026</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<BlockIcon />} onClick={() => setBlockDialog(true)}>
            Bloquear Horários
          </Button>
          <Button variant="contained" startIcon={<AddIcon />}>
            Novo Agendamento
          </Button>
        </Stack>
      </Stack>

      {/* Stats */}
      <Stack direction="row" spacing={2}>
        {[
          { label: 'Agendados', value: stats.total, color: '#2563EB', icon: <CheckCircleIcon /> },
          { label: 'Disponíveis', value: stats.available, color: '#18C964', icon: <AccessTimeIcon /> },
          { label: 'Bloqueados', value: stats.blocked, color: '#94A3B8', icon: <EventBusyIcon /> },
          { label: 'Realizados', value: stats.completed, color: '#9A1BFF', icon: <CheckCircleIcon /> },
        ].map((s) => (
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

      {/* Navigation */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton size="small"><ChevronLeftIcon /></IconButton>
          <Typography variant="body1" fontWeight={600}>Fevereiro 2026</Typography>
          <IconButton size="small"><ChevronRightIcon /></IconButton>
        </Stack>
        <Stack direction="row" spacing={1}>
          {[
            { status: 'available', label: 'Disponível' },
            { status: 'booked', label: 'Agendado' },
            { status: 'blocked', label: 'Bloqueado' },
            { status: 'completed', label: 'Realizado' },
          ].map((l) => (
            <Stack key={l.status} direction="row" spacing={0.5} alignItems="center">
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: statusColors[l.status as SlotStatus] }} />
              <Typography variant="caption" color="text.secondary">{l.label}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>

      {/* Calendar Grid */}
      <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft, overflow: 'auto' }}>
        <Box sx={{ minWidth: 700 }}>
          {/* Header */}
          <Stack direction="row" sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ width: 70, p: 1.5, borderRight: '1px solid', borderColor: 'divider' }} />
            {weekDays.map(d => (
              <Box key={d.date} sx={{ flex: 1, p: 1.5, textAlign: 'center', borderRight: '1px solid', borderColor: 'divider', bgcolor: d.date === '2026-02-18' ? tokens.colors.primary.soft : 'transparent' }}>
                <Typography variant="caption" color="text.secondary">{d.label}</Typography>
                <Typography variant="h5" fontWeight={d.date === '2026-02-18' ? 700 : 500}>{d.day}</Typography>
              </Box>
            ))}
          </Stack>

          {/* Time Rows */}
          {timeSlots.map(time => (
            <Stack key={time} direction="row" sx={{ borderBottom: '1px solid', borderColor: 'divider', '&:last-child': { borderBottom: 'none' } }}>
              <Box sx={{ width: 70, p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderColor: 'divider' }}>
                <Typography variant="caption" fontWeight={600} color="text.secondary">{time}</Typography>
              </Box>
              {weekDays.map(d => {
                const slot = getSlot(d.date, time);
                if (!slot) return <Box key={d.date} sx={{ flex: 1 }} />;
                return (
                  <Box
                    key={d.date}
                    onClick={() => slot.status !== 'available' && setSelectedSlot(slot)}
                    sx={{
                      flex: 1, p: 0.5, borderRight: '1px solid', borderColor: 'divider',
                      cursor: slot.status !== 'available' ? 'pointer' : 'default',
                      '&:hover': slot.patient ? { bgcolor: `${statusColors[slot.status]}08` } : {},
                    }}
                  >
                    {slot.status === 'available' && (
                      <Paper sx={{ p: 0.5, height: '100%', minHeight: 40, borderRadius: tokens.radius.xs, border: '1px dashed', borderColor: '#18C96440', bgcolor: '#18C96408', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#18C96480', fontSize: '0.6rem' }}>Disponível</Typography>
                      </Paper>
                    )}
                    {slot.status === 'blocked' && (
                      <Paper sx={{ p: 0.5, height: '100%', minHeight: 40, borderRadius: tokens.radius.xs, bgcolor: '#94A3B815', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BlockIcon sx={{ fontSize: 14, color: '#94A3B8' }} />
                      </Paper>
                    )}
                    {(slot.status === 'booked' || slot.status === 'completed') && (
                      <Paper sx={{ p: 0.8, height: '100%', minHeight: 40, borderRadius: tokens.radius.xs, bgcolor: `${statusColors[slot.status]}12`, borderLeft: `3px solid ${statusColors[slot.status]}` }}>
                        <Typography variant="caption" fontWeight={600} sx={{ fontSize: '0.65rem', display: 'block', lineHeight: 1.2 }}>
                          {slot.patient?.split(' ').slice(0, 2).join(' ')}
                        </Typography>
                        <Stack direction="row" spacing={0.3} alignItems="center">
                          {slot.modality === 'Teleconsulta' ? <VideocamIcon sx={{ fontSize: 10, color: 'text.secondary' }} /> : <LocationOnIcon sx={{ fontSize: 10, color: 'text.secondary' }} />}
                          <Typography variant="caption" sx={{ fontSize: '0.55rem', color: 'text.secondary' }}>{slot.type}</Typography>
                        </Stack>
                      </Paper>
                    )}
                  </Box>
                );
              })}
            </Stack>
          ))}
        </Box>
      </Card>

      {/* Slot Detail Dialog */}
      <Dialog open={!!selectedSlot} onClose={() => setSelectedSlot(null)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: tokens.radius.lg } }}>
        {selectedSlot && (
          <>
            <DialogTitle>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip label={selectedSlot.status === 'booked' ? 'Agendado' : selectedSlot.status === 'completed' ? 'Realizado' : 'Bloqueado'}
                  size="small" sx={{ bgcolor: `${statusColors[selectedSlot.status]}20`, color: statusColors[selectedSlot.status], fontWeight: 700 }} />
                <Typography variant="body2" color="text.secondary">{selectedSlot.date} às {selectedSlot.time}</Typography>
              </Stack>
            </DialogTitle>
            <DialogContent>
              {selectedSlot.patient && (
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ bgcolor: '#9A1BFF' }}>{selectedSlot.patient.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="body1" fontWeight={700}>{selectedSlot.patient}</Typography>
                      <Typography variant="caption" color="text.secondary">{selectedSlot.type} - {selectedSlot.modality}</Typography>
                    </Box>
                  </Stack>
                  <Divider />
                  <Stack spacing={0.5}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">Tipo</Typography>
                      <Typography variant="body2" fontWeight={600}>{selectedSlot.type}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">Modalidade</Typography>
                      <Typography variant="body2" fontWeight={600}>{selectedSlot.modality}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">Valor</Typography>
                      <Typography variant="body2" fontWeight={600}>R$ 350,00</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              )}
              {selectedSlot.status === 'blocked' && (
                <Typography variant="body2" color="text.secondary">Horário bloqueado manualmente.</Typography>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              {selectedSlot.status === 'booked' && (
                <>
                  <Button variant="outlined" color="error" size="small">Cancelar</Button>
                  <Button variant="outlined" size="small">Reagendar</Button>
                  <Button variant="contained" size="small">Iniciar Atendimento</Button>
                </>
              )}
              {selectedSlot.status === 'blocked' && (
                <Button variant="outlined" size="small">Desbloquear</Button>
              )}
              {selectedSlot.status === 'completed' && (
                <Button variant="contained" size="small">Ver Prontuário</Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Block Dialog */}
      <Dialog open={blockDialog} onClose={() => setBlockDialog(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: tokens.radius.lg } }}>
        <DialogTitle>Bloquear Horários</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Data Início" type="date" InputLabelProps={{ shrink: true }} defaultValue="2026-02-18" />
            <TextField label="Data Fim" type="date" InputLabelProps={{ shrink: true }} defaultValue="2026-02-18" />
            <Stack direction="row" spacing={2}>
              <TextField label="Hora Início" type="time" InputLabelProps={{ shrink: true }} defaultValue="12:00" sx={{ flex: 1 }} />
              <TextField label="Hora Fim" type="time" InputLabelProps={{ shrink: true }} defaultValue="14:00" sx={{ flex: 1 }} />
            </Stack>
            <TextField label="Motivo (opcional)" placeholder="Ex: Almoço, Reunião, Pessoal..." />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={() => setBlockDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setBlockDialog(false)}>Bloquear</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
