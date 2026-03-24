import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Card, CardContent, Stack, Chip, Avatar, Grid,
  Paper, LinearProgress, Divider, IconButton, Rating, Collapse,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VideocamIcon from '@mui/icons-material/Videocam';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import VerifiedIcon from '@mui/icons-material/Verified';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { tokens } from '../theme/colibri-theme';
import { mockProfessionals } from '../mock/data';
import { usePageState } from '../hooks/usePageState';
import PageStateHandler, { EmptyState } from '../components/PageStateHandler';

export default function MatchingPage() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const pageState = usePageState<typeof mockProfessionals>(null, async () => {
    await new Promise((r) => setTimeout(r, 800));
    return mockProfessionals;
  });

  useEffect(() => {
    pageState.retry();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const professionals = pageState.data ?? [];

  return (
    <PageStateHandler
      loading={pageState.loading}
      error={pageState.error}
      onRetry={pageState.retry}
      skeletonVariant="list"
      skeletonCount={5}
      isEmpty={!pageState.loading && professionals.length === 0}
      emptyIcon={<SearchOffIcon sx={{ fontSize: 56 }} />}
      emptyTitle="Nenhum profissional encontrado"
      emptyDescription="Não encontramos profissionais compatíveis com seu perfil. Tente ajustar os filtros da triagem."
      emptyAction={
        <Button variant="contained" onClick={() => navigate('/triagem')} sx={{ background: tokens.colors.gradient.brand }}>
          Refazer Triagem
        </Button>
      }
    >
    <Stack spacing={3}>
      {/* Header */}
      <Paper sx={{ p: 3, background: tokens.colors.gradient.brand, color: '#fff', borderRadius: tokens.radius.lg }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <AutoAwesomeIcon />
          <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.8)' }}>RESULTADO DA TRIAGEM</Typography>
        </Stack>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>
          {professionals.length} profissionais encontrados
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
          Com base nas suas respostas, nossa IA selecionou os profissionais mais compatíveis com seu perfil.
        </Typography>
      </Paper>

      {/* Filters */}
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {['Melhor Match', 'Menor Preço', 'Melhor Avaliação', 'Disponibilidade Imediata'].map((filter, i) => (
          <Chip
            key={filter}
            label={filter}
            variant={i === 0 ? 'filled' : 'outlined'}
            color={i === 0 ? 'primary' : 'default'}
            onClick={() => {}}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Stack>

      {/* Professional Cards */}
      <Stack spacing={2}>
        {professionals.map((prof, index) => (
          <Card
            key={prof.id}
            sx={{
              border: '1px solid',
              borderColor: index === 0 ? tokens.colors.primary.main : tokens.colors.border.soft,
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {index === 0 && (
              <Chip
                icon={<AutoAwesomeIcon sx={{ fontSize: 14 }} />}
                label="MELHOR MATCH"
                size="small"
                sx={{
                  position: 'absolute', top: -12, left: 16,
                  background: tokens.colors.gradient.brand, color: '#fff',
                  fontWeight: 700, fontSize: '0.65rem',
                }}
              />
            )}
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Grid container spacing={2}>
                {/* Left: Info */}
                <Grid size={{ xs: 12, md: 7 }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar sx={{ width: 64, height: 64, bgcolor: tokens.colors.primary.main, fontSize: '1.2rem' }}>
                      {prof.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h5" fontWeight={700}>{prof.name}</Typography>
                        <VerifiedIcon sx={{ fontSize: 18, color: tokens.colors.status.info }} />
                      </Stack>
                      <Typography variant="body2" color="text.secondary">{prof.specialty}</Typography>
                      <Typography variant="caption" color="text.secondary">{prof.crm}</Typography>

                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                        <Rating value={prof.rating} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" fontWeight={600}>{prof.rating}</Typography>
                        <Typography variant="caption" color="text.secondary">({prof.reviews} avaliações)</Typography>
                      </Stack>

                      <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mt: 1 }}>
                        {prof.tags.map((tag) => (
                          <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ height: 22, fontSize: '0.65rem', mb: 0.5 }} />
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </Grid>

                {/* Right: Match + Price + Action */}
                <Grid size={{ xs: 12, md: 5 }}>
                  <Stack spacing={1.5} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
                    {/* Match Score */}
                    <Box sx={{ textAlign: 'right', width: { xs: '100%', md: 'auto' } }}>
                      <Typography variant="caption" color="text.secondary">Compatibilidade</Typography>
                      <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                        <LinearProgress
                          variant="determinate"
                          value={prof.matchScore}
                          sx={{ width: 100, height: 8, borderRadius: 4, bgcolor: tokens.colors.accent.soft, '& .MuiLinearProgress-bar': { bgcolor: tokens.colors.accent.main, borderRadius: 4 } }}
                        />
                        <Typography variant="body2" fontWeight={700} color="secondary">
                          {prof.matchScore}%
                        </Typography>
                      </Stack>
                    </Box>

                    <Stack direction="row" spacing={2} alignItems="flex-end">
                      <Box>
                        <Typography variant="caption" color="text.secondary">Consulta</Typography>
                        <Typography variant="h5" fontWeight={700}>R$ {prof.price},00</Typography>
                      </Box>
                    </Stack>

                    <Button
                      variant="contained"
                      startIcon={<CalendarMonthIcon />}
                      onClick={() => navigate(`/agenda/${prof.id}`)}
                      sx={index === 0 ? { background: tokens.colors.gradient.brand } : {}}
                    >
                      Agendar Consulta
                    </Button>
                  </Stack>
                </Grid>
              </Grid>

              {/* Expandable Section */}
              <Box sx={{ mt: 1 }}>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => setExpandedId(expandedId === prof.id ? null : prof.id)}
                  endIcon={expandedId === prof.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  sx={{ color: 'text.secondary' }}
                >
                  {expandedId === prof.id ? 'Ver menos' : 'Ver detalhes e horários'}
                </Button>
                <Collapse in={expandedId === prof.id}>
                  <Divider sx={{ my: 1.5 }} />
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Sobre</Typography>
                      <Typography variant="body2" color="text.secondary">{prof.bio}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Próximos Horários</Typography>
                      <Stack spacing={1}>
                        {prof.availableSlots.map((slot) => (
                          <Box key={slot.date}>
                            <Typography variant="caption" fontWeight={600}>{slot.date}</Typography>
                            <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mt: 0.5 }}>
                              {slot.times.map((time) => (
                                <Chip
                                  key={time}
                                  label={time}
                                  size="small"
                                  variant="outlined"
                                  onClick={() => navigate(`/agenda/${prof.id}?date=${slot.date}&time=${time}`)}
                                  sx={{ cursor: 'pointer', '&:hover': { bgcolor: tokens.colors.accent.soft, borderColor: tokens.colors.accent.main } }}
                                />
                              ))}
                            </Stack>
                          </Box>
                        ))}
                      </Stack>
                    </Grid>
                  </Grid>
                </Collapse>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
    </PageStateHandler>
  );
}
