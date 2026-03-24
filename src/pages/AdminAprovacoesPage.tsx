import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack, Grid, Chip, Avatar, Button,
  Paper, Divider, Tabs, Tab,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Stepper, Step, StepLabel,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import GppGoodIcon from '@mui/icons-material/GppGood';
import WarningIcon from '@mui/icons-material/Warning';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { tokens } from '../theme/colibri-theme';

type ApprovalStatus = 'pending_docs' | 'pending_review' | 'approved' | 'rejected';

interface Approval {
  id: string;
  name: string;
  specialty: string;
  crm: string;
  email: string;
  phone: string;
  submittedAt: string;
  status: ApprovalStatus;
  docsComplete: boolean;
  crmVerified: boolean;
  backgroundCheck: boolean;
  step: number;
  notes: string;
}

const approvals: Approval[] = [
  { id: 'A-001', name: 'Dr. Paulo Henrique Silva', specialty: 'Psiquiatria', crm: 'CRM/SP 789012', email: 'paulo.h@email.com', phone: '(11) 94321-0987', submittedAt: '2026-02-14', status: 'pending_review', docsComplete: true, crmVerified: true, backgroundCheck: true, step: 3, notes: 'Documentação completa. Aguardando revisão final.' },
  { id: 'A-002', name: 'Dra. Fernanda Alves Costa', specialty: 'Pediatria', crm: 'CRM/SP 345678', email: 'fernanda.a@email.com', phone: '(11) 93210-9876', submittedAt: '2026-02-16', status: 'pending_docs', docsComplete: false, crmVerified: true, backgroundCheck: false, step: 1, notes: 'Falta certificado de especialidade e comprovante de endereço.' },
  { id: 'A-003', name: 'Dr. André Mendes Rocha', specialty: 'Ortopedia', crm: 'CRM/SP 567890', email: 'andre.m@email.com', phone: '(11) 92109-8765', submittedAt: '2026-02-12', status: 'pending_review', docsComplete: true, crmVerified: true, backgroundCheck: true, step: 3, notes: 'Todos documentos verificados. Pronto para aprovação.' },
  { id: 'A-004', name: 'Dra. Carla Nunes Lima', specialty: 'Endocrinologia', crm: 'CRM/SP 234567', email: 'carla.n@email.com', phone: '(11) 91098-7654', submittedAt: '2026-02-10', status: 'approved', docsComplete: true, crmVerified: true, backgroundCheck: true, step: 4, notes: 'Aprovada em 15/02/2026. Perfil ativo.' },
  { id: 'A-005', name: 'Dr. Ricardo Santos', specialty: 'Neurologia', crm: 'CRM/RJ 111222', email: 'ricardo.s@email.com', phone: '(21) 90987-6543', submittedAt: '2026-02-08', status: 'rejected', docsComplete: true, crmVerified: false, backgroundCheck: false, step: 2, notes: 'CRM com pendências no conselho. Registro irregular.' },
  { id: 'A-006', name: 'Dra. Luciana Barbosa', specialty: 'Fonoaudiologia', crm: 'CRFa/SP 44556', email: 'luciana.b@email.com', phone: '(11) 89876-5432', submittedAt: '2026-02-17', status: 'pending_docs', docsComplete: false, crmVerified: false, backgroundCheck: false, step: 0, notes: 'Cadastro iniciado. Aguardando envio de documentos.' },
];

const statusCfg: Record<ApprovalStatus, { label: string; color: 'warning' | 'info' | 'success' | 'error' }> = {
  pending_docs: { label: 'Docs Pendentes', color: 'warning' },
  pending_review: { label: 'Em Revisão', color: 'info' },
  approved: { label: 'Aprovado', color: 'success' },
  rejected: { label: 'Rejeitado', color: 'error' },
};

const steps = ['Cadastro', 'Documentos', 'Verificação CRM', 'Revisão Final', 'Aprovado'];

export default function AdminAprovacoesPage() {
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState<Approval | null>(null);
  const [rejectDialog, setRejectDialog] = useState(false);

  const tabFilters: Record<number, ApprovalStatus[]> = {
    0: ['pending_docs', 'pending_review'],
    1: ['approved'],
    2: ['rejected'],
  };

  const filtered = approvals.filter(a => tabFilters[tab]?.includes(a.status));

  const stats = {
    pending: approvals.filter(a => a.status === 'pending_docs' || a.status === 'pending_review').length,
    approved: approvals.filter(a => a.status === 'approved').length,
    rejected: approvals.filter(a => a.status === 'rejected').length,
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="overline" color="text.secondary">ADMINISTRAÇÃO</Typography>
          <Typography variant="h4" fontWeight={700}>Aprovações de Profissionais</Typography>
          <Typography variant="body2" color="text.secondary">Gerencie as solicitações de cadastro de novos profissionais</Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={2}>
        {[
          { label: 'Pendentes', value: stats.pending, color: '#F59E0B', icon: <PendingIcon /> },
          { label: 'Aprovados', value: stats.approved, color: '#18C964', icon: <CheckCircleIcon /> },
          { label: 'Rejeitados', value: stats.rejected, color: '#DC2626', icon: <CancelIcon /> },
        ].map(s => (
          <Paper key={s.label} sx={{ px: 2.5, py: 1.5, flex: 1, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
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

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Tab label={`Pendentes (${stats.pending})`} icon={<PendingIcon />} iconPosition="start" />
        <Tab label={`Aprovados (${stats.approved})`} icon={<CheckCircleIcon />} iconPosition="start" />
        <Tab label={`Rejeitados (${stats.rejected})`} icon={<CancelIcon />} iconPosition="start" />
      </Tabs>

      <Stack spacing={2}>
        {filtered.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
            <Typography variant="body1" color="text.secondary">Nenhuma solicitação nesta categoria.</Typography>
          </Paper>
        ) : (
          filtered.map(a => (
            <Card key={a.id} sx={{ border: '1px solid', borderColor: tokens.colors.border.soft, cursor: 'pointer', '&:hover': { borderColor: '#9A1BFF40' } }} onClick={() => setSelected(a)}>
              <CardContent>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                    <Avatar sx={{ width: 48, height: 48, bgcolor: '#9A1BFF', fontSize: '1rem' }}>
                      {a.name.split(' ').filter((_,i) => i === 0 || i === a.name.split(' ').length - 1).map(n => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="body1" fontWeight={700}>{a.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{a.specialty} — {a.crm}</Typography>
                      <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
                        <Chip label={statusCfg[a.status].label} color={statusCfg[a.status].color} size="small" variant="outlined" sx={{ height: 22 }} />
                        <Chip icon={<AccessTimeIcon />} label={`Enviado: ${a.submittedAt}`} size="small" variant="outlined" sx={{ height: 22, fontSize: '0.65rem' }} />
                      </Stack>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <Paper sx={{ px: 1.5, py: 0.8, textAlign: 'center', bgcolor: a.docsComplete ? '#18C96412' : '#F59E0B12', borderRadius: tokens.radius.sm }}>
                      <DescriptionIcon sx={{ fontSize: 18, color: a.docsComplete ? '#18C964' : '#F59E0B' }} />
                      <Typography variant="caption" display="block" sx={{ fontSize: '0.6rem' }}>Docs</Typography>
                    </Paper>
                    <Paper sx={{ px: 1.5, py: 0.8, textAlign: 'center', bgcolor: a.crmVerified ? '#18C96412' : '#DC262612', borderRadius: tokens.radius.sm }}>
                      <VerifiedIcon sx={{ fontSize: 18, color: a.crmVerified ? '#18C964' : '#DC2626' }} />
                      <Typography variant="caption" display="block" sx={{ fontSize: '0.6rem' }}>CRM</Typography>
                    </Paper>
                    <Paper sx={{ px: 1.5, py: 0.8, textAlign: 'center', bgcolor: a.backgroundCheck ? '#18C96412' : '#94A3B812', borderRadius: tokens.radius.sm }}>
                      <GppGoodIcon sx={{ fontSize: 18, color: a.backgroundCheck ? '#18C964' : '#94A3B8' }} />
                      <Typography variant="caption" display="block" sx={{ fontSize: '0.6rem' }}>Check</Typography>
                    </Paper>
                  </Stack>

                  {a.status === 'pending_review' && (
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined" color="error" size="small" onClick={(e) => { e.stopPropagation(); setSelected(a); setRejectDialog(true); }}>Rejeitar</Button>
                      <Button variant="contained" color="success" size="small" onClick={(e) => e.stopPropagation()}>Aprovar</Button>
                    </Stack>
                  )}
                </Stack>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>

      {/* Detail Dialog */}
      <Dialog open={!!selected && !rejectDialog} onClose={() => setSelected(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: tokens.radius.lg } }}>
        {selected && (
          <>
            <DialogTitle>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 48, height: 48, bgcolor: '#9A1BFF' }}>{selected.name.charAt(0)}</Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>{selected.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{selected.specialty} — {selected.crm}</Typography>
                </Box>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2.5}>
                <Stepper activeStep={selected.step} alternativeLabel>
                  {steps.map(s => <Step key={s}><StepLabel>{s}</StepLabel></Step>)}
                </Stepper>
                <Divider />
                <Paper sx={{ p: 2, bgcolor: tokens.colors.surface.subtle, borderRadius: tokens.radius.md }}>
                  <Stack spacing={0.5}>
                    <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">E-mail</Typography><Typography variant="body2">{selected.email}</Typography></Stack>
                    <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Telefone</Typography><Typography variant="body2">{selected.phone}</Typography></Stack>
                    <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Data Submissão</Typography><Typography variant="body2">{selected.submittedAt}</Typography></Stack>
                  </Stack>
                </Paper>
                <Stack direction="row" spacing={1}>
                  <Chip icon={<DescriptionIcon />} label={selected.docsComplete ? 'Documentos Completos' : 'Docs Pendentes'} color={selected.docsComplete ? 'success' : 'warning'} variant="outlined" />
                  <Chip icon={<VerifiedIcon />} label={selected.crmVerified ? 'CRM Verificado' : 'CRM Pendente'} color={selected.crmVerified ? 'success' : 'error'} variant="outlined" />
                  <Chip icon={<GppGoodIcon />} label={selected.backgroundCheck ? 'Background OK' : 'Check Pendente'} color={selected.backgroundCheck ? 'success' : 'default'} variant="outlined" />
                </Stack>
                <Paper sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: tokens.radius.md, border: '1px solid', borderColor: tokens.colors.border.soft }}>
                  <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>Observações</Typography>
                  <Typography variant="body2" color="text.secondary">{selected.notes}</Typography>
                </Paper>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              {selected.status === 'pending_review' && (
                <>
                  <Button variant="outlined" color="error" onClick={() => setRejectDialog(true)}>Rejeitar</Button>
                  <Button variant="contained" color="success">Aprovar</Button>
                </>
              )}
              {selected.status === 'pending_docs' && <Button variant="outlined">Enviar Lembrete</Button>}
              <Button variant="outlined" onClick={() => setSelected(null)}>Fechar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialog} onClose={() => setRejectDialog(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: tokens.radius.lg } }}>
        <DialogTitle>
          <Stack direction="row" spacing={1} alignItems="center">
            <WarningIcon sx={{ color: '#DC2626' }} />
            <Typography variant="h5" fontWeight={700}>Rejeitar Solicitação</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Informe o motivo da rejeição. O profissional será notificado por e-mail.
          </Typography>
          <TextField label="Motivo da rejeição" multiline rows={3} placeholder="Ex: CRM com pendências no conselho, documentação inválida..." />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={() => setRejectDialog(false)}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={() => { setRejectDialog(false); setSelected(null); }}>Confirmar Rejeição</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
