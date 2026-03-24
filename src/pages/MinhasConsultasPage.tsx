import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Stack, Chip, Avatar, Button,
  Tabs, Tab, Paper, Divider, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, InputAdornment, MenuItem, Select, FormControl,
  InputLabel, Rating, Tooltip, Collapse, Alert, alpha,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VideocamIcon from '@mui/icons-material/Videocam';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import VerifiedIcon from '@mui/icons-material/Verified';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import StarIcon from '@mui/icons-material/Star';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import MedicationIcon from '@mui/icons-material/Medication';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ImageIcon from '@mui/icons-material/Image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { tokens } from '../theme/colibri-theme';
import PageStateHandler, { EmptyState } from '../components/PageStateHandler';
import { useMinhasConsultas, TabKey } from '../hooks/useMinhasConsultas';
import type { ConsultationRecord } from '../mock/data';

// ─── Helpers ──────────────────────────────────────────────────

function formatDateFriendly(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  if (diffDays === -1) return 'Amanhã';
  if (diffDays < 0 && diffDays >= -7) return `Em ${Math.abs(diffDays)} dias`;
  if (diffDays > 0 && diffDays <= 7) return `${diffDays} dias atrás`;

  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatFullDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const statusConfig: Record<string, { label: string; color: 'success' | 'warning' | 'info' | 'error' | 'default' }> = {
  confirmed: { label: 'Confirmada', color: 'success' },
  pending: { label: 'Pendente', color: 'warning' },
  completed: { label: 'Realizada', color: 'info' },
  cancelled: { label: 'Cancelada', color: 'error' },
  no_show: { label: 'Não Compareceu', color: 'error' },
};

const attachmentIcons: Record<string, React.ReactNode> = {
  exam: <DescriptionIcon fontSize="small" />,
  prescription: <MedicationIcon fontSize="small" />,
  receipt: <ReceiptLongIcon fontSize="small" />,
  report: <DescriptionIcon fontSize="small" />,
  image: <ImageIcon fontSize="small" />,
};

const avatarColors = ['#9A1BFF', '#4F46E5', '#18C964', '#2563EB', '#DC2626', '#F59E0B'];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

// ─── Sub-components ───────────────────────────────────────────

function StatsBar({ stats }: { stats: ReturnType<typeof useMinhasConsultas>['stats'] }) {
  const items = [
    { label: 'Próximas', value: String(stats.totalUpcoming), color: tokens.colors.status.success, icon: <EventAvailableIcon /> },
    { label: 'Realizadas', value: String(stats.totalCompleted), color: tokens.colors.status.info, icon: <HistoryIcon /> },
    { label: 'Investido', value: formatCurrency(stats.totalSpent), color: '#9A1BFF', icon: <TrendingUpIcon /> },
    { label: 'Avaliação Média', value: stats.avgRating > 0 ? stats.avgRating.toFixed(1) : '—', color: tokens.colors.status.warning, icon: <StarIcon />, suffix: stats.ratedCount > 0 ? `(${stats.ratedCount})` : '' },
  ];

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
      {items.map((item) => (
        <Paper
          key={item.label}
          sx={{
            px: 2, py: 1.5, flex: 1,
            border: '1px solid', borderColor: tokens.colors.border.soft,
            display: 'flex', alignItems: 'center', gap: 1.5,
          }}
        >
          <Avatar sx={{ width: 40, height: 40, bgcolor: alpha(item.color, 0.1), color: item.color }}>
            {item.icon}
          </Avatar>
          <Box>
            <Stack direction="row" spacing={0.5} alignItems="baseline">
              <Typography variant="h5" fontWeight={700} sx={{ color: item.color }}>
                {item.value}
              </Typography>
              {item.suffix && (
                <Typography variant="caption" color="text.secondary">{item.suffix}</Typography>
              )}
            </Stack>
            <Typography variant="caption" color="text.secondary">{item.label}</Typography>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
}

function InsightsBanner({ stats }: { stats: ReturnType<typeof useMinhasConsultas>['stats'] }) {
  const alerts: { icon: React.ReactNode; text: string; severity: 'info' | 'warning' | 'success' }[] = [];

  if (stats.pendingFollowUps > 0) {
    alerts.push({
      icon: <NotificationsActiveIcon fontSize="small" />,
      text: `Você tem ${stats.pendingFollowUps} retorno${stats.pendingFollowUps > 1 ? 's' : ''} recomendado${stats.pendingFollowUps > 1 ? 's' : ''} aguardando agendamento`,
      severity: 'warning',
    });
  }
  if (stats.activePrescriptions > 0) {
    alerts.push({
      icon: <MedicationIcon fontSize="small" />,
      text: `${stats.activePrescriptions} prescrição${stats.activePrescriptions > 1 ? 'ões' : ''} ativa${stats.activePrescriptions > 1 ? 's' : ''} em andamento`,
      severity: 'info',
    });
  }
  if (stats.totalCompleted >= 5 && stats.avgRating >= 4.5) {
    alerts.push({
      icon: <StarIcon fontSize="small" />,
      text: `Parabéns! Sua profissional mais visitada é ${stats.mostVisitedDoctor}`,
      severity: 'success',
    });
  }

  if (alerts.length === 0) return null;

  return (
    <Stack spacing={1}>
      {alerts.map((alert, i) => (
        <Alert key={i} severity={alert.severity} icon={alert.icon} sx={{ borderRadius: tokens.radius.md }}>
          <Typography variant="body2">{alert.text}</Typography>
        </Alert>
      ))}
    </Stack>
  );
}

function ConsultationCard({
  consultation,
  onViewDetail,
  onRate,
  onCancel,
  onReschedule,
}: {
  consultation: ConsultationRecord;
  onViewDetail: (id: string) => void;
  onRate: (id: string) => void;
  onCancel: (id: string) => void;
  onReschedule: (id: string) => void;
}) {
  const apt = consultation;
  const isUpcoming = apt.status === 'confirmed' || apt.status === 'pending';
  const isCompleted = apt.status === 'completed';
  const hasPrescriptions = (apt.prescriptions?.length ?? 0) > 0;
  const hasAttachments = (apt.attachments?.length ?? 0) > 0;
  const hasFollowUp = apt.followUp?.recommended && !apt.followUp.booked;

  return (
    <Card
      sx={{
        border: '1px solid', borderColor: tokens.colors.border.soft,
        cursor: 'pointer',
        transition: `all ${tokens.animation.duration.normal} ${tokens.animation.easing.default}`,
        '&:hover': { borderColor: tokens.colors.border.default, boxShadow: tokens.shadows.hover },
      }}
      onClick={() => onViewDetail(apt.id)}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 }, '&:last-child': { pb: 2 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'flex-start' }}>
          {/* Left — Date block */}
          <Paper
            sx={{
              p: 1.5, textAlign: 'center', minWidth: 72,
              bgcolor: isUpcoming ? alpha(tokens.colors.status.success, 0.06) : tokens.colors.surface.subtle,
              borderRadius: tokens.radius.md, border: '1px solid',
              borderColor: isUpcoming ? alpha(tokens.colors.status.success, 0.2) : 'transparent',
              flexShrink: 0,
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
              {new Date(apt.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'short' })}
            </Typography>
            <Typography variant="h4" fontWeight={700} sx={{ lineHeight: 1.2 }}>
              {apt.date.split('-')[2]}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              {new Date(apt.date + 'T00:00:00').toLocaleDateString('pt-BR', { month: 'short' })}
            </Typography>
          </Paper>

          {/* Center — Doctor info */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.5 }}>
              <Avatar
                sx={{
                  width: 36, height: 36,
                  bgcolor: getAvatarColor(apt.professionalName),
                  fontSize: '0.8rem', fontWeight: 700,
                }}
              >
                {apt.professionalInitials}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography variant="body1" fontWeight={700} noWrap>{apt.professionalName}</Typography>
                  <VerifiedIcon sx={{ fontSize: 16, color: tokens.colors.status.info, flexShrink: 0 }} />
                </Stack>
                <Typography variant="caption" color="text.secondary">{apt.specialty} · {apt.crm}</Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {apt.time} · {apt.duration}min
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                {apt.modality === 'Teleconsulta'
                  ? <VideocamIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  : <LocationOnIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                }
                <Typography variant="caption" color="text.secondary">{apt.modality}</Typography>
              </Stack>
              <Chip label={apt.type} size="small" variant="outlined" sx={{ height: 22, fontSize: '0.65rem' }} />
              {apt.insuranceCovered && (
                <Chip label={apt.insuranceName ?? 'Convênio'} size="small" color="info" variant="outlined" sx={{ height: 22, fontSize: '0.65rem' }} />
              )}
            </Stack>

            {/* Indicators */}
            {isCompleted && (hasPrescriptions || hasAttachments || hasFollowUp) && (
              <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
                {hasPrescriptions && (
                  <Chip
                    icon={<MedicationIcon sx={{ fontSize: '14px !important' }} />}
                    label={`${apt.prescriptions!.filter((p) => p.active).length} ativa${apt.prescriptions!.filter((p) => p.active).length !== 1 ? 's' : ''}`}
                    size="small" variant="outlined" color="secondary"
                    sx={{ height: 22, fontSize: '0.65rem' }}
                  />
                )}
                {hasAttachments && (
                  <Chip
                    icon={<AttachFileIcon sx={{ fontSize: '14px !important' }} />}
                    label={`${apt.attachments!.length} anexo${apt.attachments!.length !== 1 ? 's' : ''}`}
                    size="small" variant="outlined"
                    sx={{ height: 22, fontSize: '0.65rem' }}
                  />
                )}
                {hasFollowUp && (
                  <Chip
                    icon={<EventRepeatIcon sx={{ fontSize: '14px !important' }} />}
                    label="Retorno pendente"
                    size="small" variant="outlined" color="warning"
                    sx={{ height: 22, fontSize: '0.65rem' }}
                  />
                )}
              </Stack>
            )}

            {/* Notes preview */}
            {isCompleted && apt.notes && (
              <Typography
                variant="caption" color="text.secondary"
                sx={{
                  mt: 1, display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5,
                }}
              >
                {apt.notes.summary}
              </Typography>
            )}
          </Box>

          {/* Right — Status, Price, Actions */}
          <Stack alignItems={{ xs: 'flex-start', md: 'flex-end' }} spacing={1} sx={{ flexShrink: 0 }}>
            <Chip
              label={statusConfig[apt.status]?.label ?? apt.status}
              color={statusConfig[apt.status]?.color ?? 'default'}
              size="small" variant="outlined" sx={{ height: 24 }}
            />
            <Typography variant="body2" fontWeight={600}>{formatCurrency(apt.price)}</Typography>
            <Typography variant="caption" color="text.secondary">{apt.protocol}</Typography>

            {isCompleted && apt.rating != null && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Rating value={apt.rating} readOnly size="small" precision={0.5} />
                <Typography variant="caption" color="text.secondary">{apt.rating.toFixed(1)}</Typography>
              </Stack>
            )}

            <Stack direction="row" spacing={0.5} onClick={(e) => e.stopPropagation()}>
              {isUpcoming && (
                <>
                  <Button size="small" variant="outlined" startIcon={<EventRepeatIcon />}
                    onClick={() => onReschedule(apt.id)}
                    sx={{ height: 28, fontSize: '0.7rem' }}
                  >
                    Reagendar
                  </Button>
                  <Button size="small" variant="outlined" color="error" startIcon={<CancelIcon />}
                    onClick={() => onCancel(apt.id)}
                    sx={{ height: 28, fontSize: '0.7rem' }}
                  >
                    Cancelar
                  </Button>
                </>
              )}
              {isCompleted && !apt.rating && (
                <Button size="small" variant="outlined" color="warning" startIcon={<StarIcon />}
                  onClick={() => onRate(apt.id)}
                  sx={{ height: 28, fontSize: '0.7rem' }}
                >
                  Avaliar
                </Button>
              )}
              <Button size="small" variant="outlined" endIcon={<ChevronRightIcon />}
                onClick={() => onViewDetail(apt.id)}
                sx={{ height: 28, fontSize: '0.7rem' }}
              >
                Detalhes
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function MonthGroup({ label, count }: { label: string; count: number }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ py: 0.5 }}>
      <Chip
        label={label}
        size="small"
        sx={{
          fontWeight: 600, fontSize: '0.75rem',
          bgcolor: tokens.colors.primary.soft,
          color: tokens.colors.text.primary,
          height: 28,
        }}
      />
      <Typography variant="caption" color="text.secondary">
        {count} consulta{count !== 1 ? 's' : ''}
      </Typography>
      <Box sx={{ flex: 1, height: '1px', bgcolor: tokens.colors.border.soft }} />
    </Stack>
  );
}

function DetailDialog({
  consultation,
  open,
  onClose,
  onRate,
}: {
  consultation: ConsultationRecord | null;
  open: boolean;
  onClose: () => void;
  onRate: (id: string) => void;
}) {
  if (!consultation) return null;
  const apt = consultation;
  const isCompleted = apt.status === 'completed';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
      PaperProps={{ sx: { borderRadius: tokens.radius.lg, maxHeight: '90vh' } }}
      aria-labelledby="detail-dialog-title"
    >
      <DialogTitle id="detail-dialog-title" sx={{ pb: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="overline" color="text.secondary">DETALHES DA CONSULTA</Typography>
            <Typography variant="h5" fontWeight={700}>{apt.protocol}</Typography>
          </Box>
          <IconButton onClick={onClose} aria-label="Fechar" size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        {/* Professional header */}
        <Box sx={{ p: 2.5, bgcolor: tokens.colors.surface.subtle }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 56, height: 56, bgcolor: getAvatarColor(apt.professionalName), fontSize: '1.1rem', fontWeight: 700 }}>
              {apt.professionalInitials}
            </Avatar>
            <Box>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="h5" fontWeight={700}>{apt.professionalName}</Typography>
                <VerifiedIcon sx={{ fontSize: 18, color: tokens.colors.status.info }} />
              </Stack>
              <Typography variant="body2" color="text.secondary">{apt.specialty}</Typography>
              <Typography variant="caption" color="text.secondary">{apt.crm}</Typography>
            </Box>
          </Stack>
        </Box>

        <Stack spacing={0} divider={<Divider />}>
          {/* Appointment info */}
          <Box sx={{ p: 2.5 }}>
            <Typography variant="overline" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              INFORMAÇÕES DA CONSULTA
            </Typography>
            <Stack spacing={1.5}>
              <InfoRow icon={<CalendarMonthIcon fontSize="small" />} label="Data" value={formatFullDate(apt.date)} />
              <InfoRow icon={<AccessTimeIcon fontSize="small" />} label="Horário" value={`${apt.time} · Duração ${apt.duration} min`} />
              <InfoRow
                icon={apt.modality === 'Teleconsulta' ? <VideocamIcon fontSize="small" /> : <LocationOnIcon fontSize="small" />}
                label="Modalidade"
                value={apt.modality}
              />
              {apt.location && <InfoRow icon={<LocalHospitalIcon fontSize="small" />} label="Local" value={apt.location} />}
              <InfoRow icon={<DescriptionIcon fontSize="small" />} label="Tipo" value={apt.type} />
              <InfoRow icon={<PaymentIcon fontSize="small" />} label="Pagamento" value={`${formatCurrency(apt.price)} · ${apt.paymentMethod ?? '—'}`} />
              {apt.insuranceCovered && (
                <InfoRow icon={<PersonIcon fontSize="small" />} label="Convênio" value={apt.insuranceName ?? 'Sim'} />
              )}
            </Stack>
          </Box>

          {/* Notes */}
          {apt.notes && (
            <Box sx={{ p: 2.5 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                RESUMO DA CONSULTA
              </Typography>
              <Typography variant="body2" sx={{ mb: 1.5, lineHeight: 1.7 }}>
                {apt.notes.summary}
              </Typography>

              {apt.notes.diagnoses.length > 0 && (
                <Box sx={{ mb: 1.5 }}>
                  <Typography variant="caption" fontWeight={600} sx={{ mb: 0.5, display: 'block' }}>
                    Diagnósticos / Observações
                  </Typography>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                    {apt.notes.diagnoses.map((d, i) => (
                      <Chip key={i} label={d} size="small" variant="outlined" sx={{ height: 24, fontSize: '0.7rem' }} />
                    ))}
                  </Stack>
                </Box>
              )}

              <Box>
                <Typography variant="caption" fontWeight={600} sx={{ mb: 0.5, display: 'block' }}>
                  Recomendações
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {apt.notes.recommendations}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Prescriptions */}
          {apt.prescriptions && apt.prescriptions.length > 0 && (
            <Box sx={{ p: 2.5 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                PRESCRIÇÕES ({apt.prescriptions.length})
              </Typography>
              <Stack spacing={1}>
                {apt.prescriptions.map((rx) => (
                  <Paper key={rx.id} sx={{ p: 1.5, border: '1px solid', borderColor: tokens.colors.border.soft }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <MedicationIcon sx={{ fontSize: 16, color: rx.active ? tokens.colors.status.success : tokens.colors.text.disabled }} />
                          <Typography variant="body2" fontWeight={600}>{rx.medication}</Typography>
                          {rx.active && (
                            <Chip label="Ativa" color="success" size="small" sx={{ height: 18, fontSize: '0.6rem' }} />
                          )}
                        </Stack>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          {rx.dosage} · {rx.frequency} · {rx.duration}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Box>
          )}

          {/* Attachments */}
          {apt.attachments && apt.attachments.length > 0 && (
            <Box sx={{ p: 2.5 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                DOCUMENTOS ({apt.attachments.length})
              </Typography>
              <Stack spacing={1}>
                {apt.attachments.map((att) => (
                  <Paper
                    key={att.id}
                    sx={{
                      p: 1.5, border: '1px solid', borderColor: tokens.colors.border.soft,
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      cursor: 'pointer', transition: `all ${tokens.animation.duration.fast}`,
                      '&:hover': { borderColor: tokens.colors.border.default, bgcolor: tokens.colors.surface.subtle },
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ width: 32, height: 32, bgcolor: alpha(tokens.colors.status.info, 0.1), color: tokens.colors.status.info }}>
                        {attachmentIcons[att.type] ?? <AttachFileIcon fontSize="small" />}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>{att.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{att.size} · {formatDateFriendly(att.date)}</Typography>
                      </Box>
                    </Stack>
                    <Tooltip title="Baixar documento">
                      <IconButton size="small" aria-label={`Baixar ${att.name}`}>
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Paper>
                ))}
              </Stack>
            </Box>
          )}

          {/* Follow-up */}
          {apt.followUp?.recommended && (
            <Box sx={{ p: 2.5 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                RETORNO
              </Typography>
              <Alert
                severity={apt.followUp.booked ? 'success' : 'warning'}
                sx={{ borderRadius: tokens.radius.md }}
                action={
                  !apt.followUp.booked ? (
                    <Button size="small" variant="outlined" color="warning">
                      Agendar
                    </Button>
                  ) : undefined
                }
              >
                <Typography variant="body2" fontWeight={500}>
                  {apt.followUp.booked ? 'Retorno agendado' : 'Retorno recomendado'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {apt.followUp.reason}
                  {apt.followUp.suggestedDate && ` · Data sugerida: ${formatDateFriendly(apt.followUp.suggestedDate)}`}
                </Typography>
              </Alert>
            </Box>
          )}

          {/* Rating */}
          {isCompleted && (
            <Box sx={{ p: 2.5 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                AVALIAÇÃO
              </Typography>
              {apt.rating != null ? (
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Rating value={apt.rating} readOnly precision={0.5} />
                    <Typography variant="body2" fontWeight={600}>{apt.rating.toFixed(1)}</Typography>
                  </Stack>
                  {apt.reviewText && (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      "{apt.reviewText}"
                    </Typography>
                  )}
                </Stack>
              ) : (
                <Button variant="outlined" color="warning" startIcon={<StarIcon />}
                  onClick={() => { onClose(); onRate(apt.id); }}
                >
                  Avaliar esta consulta
                </Button>
              )}
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">{formatDateFriendly(apt.date)}</Typography>
        <Button variant="outlined" onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Box sx={{ color: 'text.secondary', mt: 0.25 }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
        <Typography variant="body2">{value}</Typography>
      </Box>
    </Stack>
  );
}

function RatingDialog({
  open,
  onClose,
  ratingValue,
  setRatingValue,
  ratingText,
  setRatingText,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  ratingValue: number | null;
  setRatingValue: (v: number | null) => void;
  ratingText: string;
  setRatingText: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
      PaperProps={{ sx: { borderRadius: tokens.radius.lg } }}
      aria-labelledby="rating-dialog-title"
    >
      <DialogTitle id="rating-dialog-title">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={700}>Avaliar Consulta</Typography>
          <IconButton onClick={onClose} size="small" aria-label="Fechar"><CloseIcon /></IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Como foi sua experiência?
            </Typography>
            <Rating
              value={ratingValue}
              onChange={(_, v) => setRatingValue(v)}
              size="large"
              sx={{ fontSize: '2.5rem' }}
            />
          </Box>
          <TextField
            multiline rows={3}
            placeholder="Conte-nos mais sobre sua experiência (opcional)"
            value={ratingText}
            onChange={(e) => setRatingText(e.target.value)}
            InputProps={{ sx: { borderRadius: tokens.radius.lg, height: 'auto' } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button variant="outlined" onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={onSubmit} disabled={!ratingValue}>
          Enviar Avaliação
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────

export default function MinhasConsultasPage() {
  const navigate = useNavigate();
  const vm = useMinhasConsultas();

  const tabItems: { key: TabKey; label: string; count: number; icon: React.ReactElement }[] = [
    { key: 'upcoming', label: 'Próximas', count: vm.upcoming.length, icon: <CalendarMonthIcon /> },
    { key: 'history', label: 'Histórico', count: vm.completed.length, icon: <HistoryIcon /> },
    { key: 'cancelled', label: 'Canceladas', count: vm.cancelled.length, icon: <CancelIcon /> },
  ];

  const emptyMessages: Record<TabKey, { icon: React.ReactNode; title: string; desc: string }> = {
    upcoming: { icon: <EventBusyIcon sx={{ fontSize: 56 }} />, title: 'Nenhuma consulta agendada', desc: 'Você não possui consultas futuras. Inicie uma triagem para encontrar o profissional ideal.' },
    history: { icon: <HistoryIcon sx={{ fontSize: 56 }} />, title: 'Nenhuma consulta realizada', desc: 'Seu histórico de consultas aparecerá aqui após seus primeiros atendimentos.' },
    cancelled: { icon: <CancelIcon sx={{ fontSize: 56 }} />, title: 'Nenhuma consulta cancelada', desc: 'Ótimo! Você não tem nenhuma consulta cancelada.' },
  };

  return (
    <PageStateHandler
      loading={vm.pageState.loading}
      error={vm.pageState.error}
      onRetry={vm.pageState.retry}
      skeletonVariant="list"
      skeletonCount={5}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'flex-start' }} spacing={2}>
          <Box>
            <Typography variant="overline" color="text.secondary">MINHAS CONSULTAS</Typography>
            <Typography variant="h4" fontWeight={700}>Consultas</Typography>
            <Typography variant="body2" color="text.secondary">
              Gerencie suas consultas, acompanhe seu histórico completo e prescrições
            </Typography>
          </Box>
          <Button
            variant="contained" startIcon={<AddIcon />}
            onClick={() => navigate('/triagem')}
            sx={{ background: tokens.colors.gradient.brand, flexShrink: 0 }}
          >
            Nova Consulta
          </Button>
        </Stack>

        {/* Stats */}
        <StatsBar stats={vm.stats} />

        {/* Insights */}
        <InsightsBanner stats={vm.stats} />

        {/* Tabs */}
        <Tabs
          value={tabItems.findIndex((t) => t.key === vm.activeTab)}
          onChange={(_, v) => vm.setActiveTab(tabItems[v].key)}
          sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        >
          {tabItems.map((tab) => (
            <Tab
              key={tab.key}
              label={`${tab.label} (${tab.count})`}
              icon={tab.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>

        {/* Filters */}
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              size="small"
              placeholder="Buscar por profissional, especialidade ou protocolo..."
              value={vm.searchQuery}
              onChange={(e) => vm.setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
                ),
                endAdornment: vm.searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => vm.setSearchQuery('')} aria-label="Limpar busca">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1, maxWidth: { md: 400 } }}
            />
            <Button
              variant={vm.filtersExpanded ? 'contained' : 'outlined'}
              size="small"
              startIcon={<FilterListIcon />}
              onClick={() => vm.setFiltersExpanded(!vm.filtersExpanded)}
              sx={{ height: 40 }}
            >
              Filtros
              {vm.hasActiveFilters && (
                <Chip label="!" size="small" color="error" sx={{ ml: 0.5, height: 18, fontSize: '0.6rem', minWidth: 18 }} />
              )}
            </Button>
            {vm.hasActiveFilters && (
              <Button size="small" variant="text" onClick={vm.clearFilters} sx={{ height: 40 }}>
                Limpar
              </Button>
            )}
          </Stack>

          <Collapse in={vm.filtersExpanded}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pb: 1 }}>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel id="filter-specialty-label">Especialidade</InputLabel>
                <Select
                  labelId="filter-specialty-label"
                  label="Especialidade"
                  value={vm.specialtyFilter}
                  onChange={(e) => vm.setSpecialtyFilter(e.target.value)}
                >
                  <MenuItem value="all">Todas</MenuItem>
                  {vm.specialties.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {vm.activeTab === 'history' && (
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel id="filter-date-label">Período</InputLabel>
                  <Select
                    labelId="filter-date-label"
                    label="Período"
                    value={vm.dateRangeFilter}
                    onChange={(e) => vm.setDateRangeFilter(e.target.value as typeof vm.dateRangeFilter)}
                  >
                    <MenuItem value="all">Todo histórico</MenuItem>
                    <MenuItem value="30d">Últimos 30 dias</MenuItem>
                    <MenuItem value="3m">Últimos 3 meses</MenuItem>
                    <MenuItem value="6m">Últimos 6 meses</MenuItem>
                    <MenuItem value="12m">Último ano</MenuItem>
                  </Select>
                </FormControl>
              )}

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel id="filter-modality-label">Modalidade</InputLabel>
                <Select
                  labelId="filter-modality-label"
                  label="Modalidade"
                  value={vm.modalityFilter}
                  onChange={(e) => vm.setModalityFilter(e.target.value)}
                >
                  <MenuItem value="all">Todas</MenuItem>
                  <MenuItem value="Presencial">Presencial</MenuItem>
                  <MenuItem value="Teleconsulta">Teleconsulta</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Collapse>
        </Stack>

        {/* Results summary */}
        {vm.hasActiveFilters && vm.filteredList.length > 0 && (
          <Typography variant="caption" color="text.secondary">
            {vm.filteredList.length} resultado{vm.filteredList.length !== 1 ? 's' : ''} encontrado{vm.filteredList.length !== 1 ? 's' : ''}
          </Typography>
        )}

        {/* Content by tab */}
        {vm.activeTab === 'history' ? (
          <Stack spacing={2}>
            {vm.groupedByMonth.length > 0 ? (
              vm.groupedByMonth.map((group) => (
                <Stack key={group.key} spacing={1.5}>
                  <MonthGroup label={group.label} count={group.items.length} />
                  {group.items.map((apt) => (
                    <ConsultationCard
                      key={apt.id}
                      consultation={apt}
                      onViewDetail={vm.setDetailDialogId}
                      onRate={vm.openRatingDialog}
                      onCancel={vm.setCancelDialogId}
                      onReschedule={() => {}}
                    />
                  ))}
                </Stack>
              ))
            ) : (
              <EmptyState
                icon={emptyMessages.history.icon}
                title={vm.hasActiveFilters ? 'Nenhum resultado' : emptyMessages.history.title}
                description={vm.hasActiveFilters ? 'Tente ajustar os filtros para encontrar o que procura.' : emptyMessages.history.desc}
                action={vm.hasActiveFilters ? (
                  <Button variant="outlined" onClick={vm.clearFilters}>Limpar filtros</Button>
                ) : undefined}
              />
            )}
          </Stack>
        ) : (
          <Stack spacing={1.5}>
            {vm.filteredList.length > 0 ? (
              vm.filteredList.map((apt) => (
                <ConsultationCard
                  key={apt.id}
                  consultation={apt}
                  onViewDetail={vm.setDetailDialogId}
                  onRate={vm.openRatingDialog}
                  onCancel={vm.setCancelDialogId}
                  onReschedule={() => {}}
                />
              ))
            ) : (
              <EmptyState
                icon={emptyMessages[vm.activeTab].icon}
                title={vm.hasActiveFilters ? 'Nenhum resultado' : emptyMessages[vm.activeTab].title}
                description={vm.hasActiveFilters ? 'Tente ajustar os filtros para encontrar o que procura.' : emptyMessages[vm.activeTab].desc}
                action={
                  vm.activeTab === 'upcoming' && !vm.hasActiveFilters ? (
                    <Button variant="contained" sx={{ background: tokens.colors.gradient.brand }} onClick={() => navigate('/triagem')}>
                      Agendar Consulta
                    </Button>
                  ) : vm.hasActiveFilters ? (
                    <Button variant="outlined" onClick={vm.clearFilters}>Limpar filtros</Button>
                  ) : undefined
                }
              />
            )}
          </Stack>
        )}

        {/* Detail Dialog */}
        <DetailDialog
          consultation={vm.selectedDetail}
          open={!!vm.detailDialogId}
          onClose={() => vm.setDetailDialogId(null)}
          onRate={vm.openRatingDialog}
        />

        {/* Rating Dialog */}
        <RatingDialog
          open={!!vm.ratingDialogId}
          onClose={() => vm.openRatingDialog('')}
          ratingValue={vm.ratingValue}
          setRatingValue={vm.setRatingValue}
          ratingText={vm.ratingText}
          setRatingText={vm.setRatingText}
          onSubmit={vm.submitRating}
        />

        {/* Cancel Dialog */}
        <Dialog
          open={!!vm.cancelDialogId}
          onClose={() => vm.setCancelDialogId(null)}
          maxWidth="xs" fullWidth
          PaperProps={{ sx: { borderRadius: tokens.radius.lg } }}
          aria-labelledby="cancel-dialog-title"
        >
          <DialogTitle id="cancel-dialog-title">Cancelar Consulta?</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary">
              Tem certeza que deseja cancelar esta consulta? O valor será estornado em até 5 dias úteis conforme a política de cancelamento.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button variant="outlined" onClick={() => vm.setCancelDialogId(null)}>Voltar</Button>
            <Button variant="contained" color="error" onClick={() => vm.setCancelDialogId(null)}>
              Confirmar Cancelamento
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </PageStateHandler>
  );
}
