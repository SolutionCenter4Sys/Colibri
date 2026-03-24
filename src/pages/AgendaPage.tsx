import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Typography, Button, Card, CardContent, Stack, Chip, Avatar,
  Grid, Paper, Divider, Rating, ToggleButtonGroup, ToggleButton, Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VideocamIcon from '@mui/icons-material/Videocam';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import { tokens } from '../theme/colibri-theme';
import { mockProfessionals } from '../mock/data';

export default function AgendaPage() {
  const navigate = useNavigate();
  const { professionalId } = useParams();
  const professional = mockProfessionals.find(p => p.id === professionalId) || mockProfessionals[0];

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [modality, setModality] = useState<string>('presencial');

  const weekDays = [
    { date: '2026-02-18', label: 'Seg', day: '18' },
    { date: '2026-02-19', label: 'Ter', day: '19' },
    { date: '2026-02-20', label: 'Qua', day: '20' },
    { date: '2026-02-21', label: 'Qui', day: '21' },
    { date: '2026-02-22', label: 'Sex', day: '22' },
    { date: '2026-02-23', label: 'Sáb', day: '23' },
    { date: '2026-02-24', label: 'Dom', day: '24' },
  ];

  const getTimesForDate = (date: string) => {
    const slot = professional.availableSlots.find(s => s.date === date);
    return slot?.times || [];
  };

  const availableTimes = selectedDate ? getTimesForDate(selectedDate) : [];

  return (
    <Stack spacing={3}>
      {/* Back + Title */}
      <Box>
        <Button variant="text" startIcon={<ArrowBackIcon />} onClick={() => navigate('/matching')} sx={{ mb: 1, color: 'text.secondary' }}>
          Voltar aos resultados
        </Button>
        <Typography variant="h4" fontWeight={700}>Agendar Consulta</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left: Calendar */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            {/* Professional Summary */}
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ width: 56, height: 56, bgcolor: tokens.colors.primary.main, fontSize: '1.1rem' }}>
                    {professional.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography variant="h5" fontWeight={700}>{professional.name}</Typography>
                      <VerifiedIcon sx={{ fontSize: 16, color: tokens.colors.status.info }} />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">{professional.specialty}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                      <Rating value={professional.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="caption" color="text.secondary">{professional.reviews} avaliações</Typography>
                    </Stack>
                  </Box>
                  <Typography variant="h5" fontWeight={700}>R$ {professional.price},00</Typography>
                </Stack>
              </CardContent>
            </Card>

            {/* Modality */}
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent>
                <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>Modalidade de Atendimento</Typography>
                <ToggleButtonGroup
                  value={modality}
                  exclusive
                  onChange={(_, val) => val && setModality(val)}
                  fullWidth
                  sx={{ '& .MuiToggleButton-root': { borderRadius: tokens.radius.md, textTransform: 'none', py: 1.5 } }}
                >
                  <ToggleButton value="presencial">
                    <Stack alignItems="center" spacing={0.5}>
                      <LocationOnIcon />
                      <Typography variant="body2" fontWeight={600}>Presencial</Typography>
                      <Typography variant="caption" color="text.secondary">Clínica Life Colibri</Typography>
                    </Stack>
                  </ToggleButton>
                  <ToggleButton value="teleconsulta">
                    <Stack alignItems="center" spacing={0.5}>
                      <VideocamIcon />
                      <Typography variant="body2" fontWeight={600}>Teleconsulta</Typography>
                      <Typography variant="caption" color="text.secondary">Vídeo chamada</Typography>
                    </Stack>
                  </ToggleButton>
                </ToggleButtonGroup>
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <CalendarMonthIcon sx={{ color: 'text.secondary' }} />
                  <Typography variant="body2" fontWeight={600}>Selecione a Data</Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>Fevereiro 2026</Typography>
                <Grid container spacing={1}>
                  {weekDays.map((day) => {
                    const hasSlots = getTimesForDate(day.date).length > 0;
                    return (
                      <Grid key={day.date} size={{ xs: 12 / 7 }}>
                        <Paper
                          role={hasSlots ? 'button' : undefined}
                          tabIndex={hasSlots ? 0 : -1}
                          aria-label={hasSlots ? `${day.label} dia ${day.day}, ${getTimesForDate(day.date).length} vagas disponíveis` : `${day.label} dia ${day.day}, sem vagas`}
                          aria-selected={selectedDate === day.date}
                          aria-disabled={!hasSlots}
                          onClick={() => hasSlots && setSelectedDate(day.date)}
                          onKeyDown={(e) => { if (hasSlots && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setSelectedDate(day.date); } }}
                          sx={{
                            p: 1.5, textAlign: 'center', cursor: hasSlots ? 'pointer' : 'default',
                            border: '2px solid',
                            borderColor: selectedDate === day.date ? tokens.colors.primary.main : 'transparent',
                            bgcolor: selectedDate === day.date ? `${tokens.colors.primary.main}10` : hasSlots ? 'background.paper' : tokens.colors.surface.subtle,
                            opacity: hasSlots ? 1 : 0.5,
                            borderRadius: tokens.radius.md,
                            transition: 'all 0.2s',
                            '&:hover': hasSlots ? { borderColor: `${tokens.colors.primary.main}50` } : {},
                            '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">{day.label}</Typography>
                          <Typography variant="h5" fontWeight={selectedDate === day.date ? 700 : 500}>{day.day}</Typography>
                          {hasSlots && (
                            <Typography variant="caption" sx={{ color: tokens.colors.accent.main, fontWeight: 600 }}>
                              {getTimesForDate(day.date).length} vagas
                            </Typography>
                          )}
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>

            {/* Time Selection */}
            {selectedDate && (
              <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <AccessTimeIcon sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" fontWeight={600}>Selecione o Horário</Typography>
                  </Stack>
                  <Grid container spacing={1}>
                    {availableTimes.map((time) => (
                      <Grid key={time} size={{ xs: 4, sm: 3, md: 2 }}>
                        <Paper
                          role="button"
                          tabIndex={0}
                          aria-label={`Horário ${time}`}
                          aria-selected={selectedTime === time}
                          onClick={() => setSelectedTime(time)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedTime(time); } }}
                          sx={{
                            p: 1.5, textAlign: 'center', cursor: 'pointer',
                            border: '2px solid',
                            borderColor: selectedTime === time ? tokens.colors.accent.main : 'transparent',
                            bgcolor: selectedTime === time ? tokens.colors.accent.soft : 'background.paper',
                            borderRadius: tokens.radius.md,
                            transition: 'all 0.2s',
                            '&:hover': { borderColor: `${tokens.colors.accent.main}80` },
                            '&:focus-visible': { outline: '2px solid', outlineColor: 'secondary.main', outlineOffset: 2 },
                          }}
                        >
                          <Typography variant="body1" fontWeight={selectedTime === time ? 700 : 500}>
                            {time}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>

        {/* Right: Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft, position: 'sticky', top: 80 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Resumo do Agendamento</Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Profissional</Typography>
                  <Typography variant="body2" fontWeight={600}>{professional.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{professional.specialty}</Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="caption" color="text.secondary">Modalidade</Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    {modality === 'teleconsulta' ? <VideocamIcon sx={{ fontSize: 16 }} /> : <LocationOnIcon sx={{ fontSize: 16 }} />}
                    <Typography variant="body2" fontWeight={600}>
                      {modality === 'teleconsulta' ? 'Teleconsulta' : 'Presencial'}
                    </Typography>
                  </Stack>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="caption" color="text.secondary">Data e Horário</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {selectedDate && selectedTime ? `${selectedDate} às ${selectedTime}` : 'Selecione data e horário'}
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="caption" color="text.secondary">Valor</Typography>
                  <Typography variant="h4" fontWeight={700}>R$ {professional.price},00</Typography>
                </Box>

                {selectedDate && selectedTime && (
                  <Alert severity="success" sx={{ borderRadius: tokens.radius.md }}>
                    Horário disponível! Confirme para prosseguir ao pagamento.
                  </Alert>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => navigate(`/checkout/${professional.id}?date=${selectedDate}&time=${selectedTime}&modality=${modality}`)}
                  sx={{ background: selectedDate && selectedTime ? tokens.colors.gradient.brand : undefined }}
                >
                  Confirmar e Pagar
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
