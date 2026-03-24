import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack, Grid, Chip, Avatar,
  Paper, Divider, Button, TextField, Tabs, Tab, Switch, FormControlLabel,
  LinearProgress, Alert, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import { tokens } from '../theme/colibri-theme';

export default function MeuPerfilPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [editing, setEditing] = useState(false);

  const profile = {
    name: 'Maria Silva Santos',
    email: 'maria.silva@email.com',
    phone: '(11) 98765-4321',
    cpf: '***.***.***-21',
    birthDate: '15/03/1991',
    bloodType: 'O+',
    gender: 'Feminino',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    cep: '01234-567',
    insurance: 'Unimed',
    insuranceNumber: '0012 3456 7890 1234',
    emergencyContact: 'João Santos - (11) 91234-5678',
    allergies: ['Dipirona'],
    conditions: ['Nenhuma'],
    completeness: 85,
  };

  const stats = {
    totalAppointments: 12,
    nextAppointment: '20/02/2026 às 10:00',
    favoriteProfessional: 'Dra. Ana Beatriz Souza',
    memberSince: 'Janeiro 2025',
    lastLogin: 'Hoje, 14:32',
  };

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Box>
        <Typography variant="overline" color="text.secondary">MEU PERFIL</Typography>
        <Typography variant="h4" fontWeight={700}>Minha Conta</Typography>
      </Box>

      {/* Profile Card */}
      <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft, overflow: 'visible' }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ md: 'center' }}>
            {/* Avatar */}
            <Box sx={{ position: 'relative', alignSelf: { xs: 'center', md: 'flex-start' } }}>
              <Avatar
                sx={{
                  width: 100, height: 100, bgcolor: '#9A1BFF',
                  fontSize: '2rem', fontWeight: 700,
                }}
              >
                MS
              </Avatar>
              <IconButton
                size="small"
                sx={{
                  position: 'absolute', bottom: 0, right: 0,
                  bgcolor: 'background.paper', border: '2px solid', borderColor: 'divider',
                  width: 32, height: 32,
                  '&:hover': { bgcolor: tokens.colors.primary.soft },
                }}
              >
                <CameraAltIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>

            {/* Info */}
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <Typography variant="h4" fontWeight={700}>{profile.name}</Typography>
                <VerifiedIcon sx={{ fontSize: 20, color: '#18C964' }} />
              </Stack>
              <Typography variant="body2" color="text.secondary">{profile.email}</Typography>
              <Typography variant="body2" color="text.secondary">{profile.phone}</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip label={`Membro desde ${stats.memberSince}`} size="small" variant="outlined" sx={{ height: 24 }} />
                <Chip label={profile.insurance} size="small" color="info" variant="outlined" sx={{ height: 24 }} />
                <Chip label={`Tipo ${profile.bloodType}`} size="small" color="error" variant="outlined" sx={{ height: 24 }} />
              </Stack>
            </Box>

            {/* Completeness */}
            <Box sx={{ textAlign: 'center', minWidth: 140 }}>
              <Typography variant="caption" color="text.secondary">Perfil completo</Typography>
              <Typography variant="h4" fontWeight={700} sx={{ color: profile.completeness >= 80 ? '#18C964' : '#F59E0B' }}>
                {profile.completeness}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={profile.completeness}
                sx={{
                  height: 8, borderRadius: 4, mt: 0.5,
                  bgcolor: '#F1F5F9',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: profile.completeness >= 80 ? '#18C964' : '#F59E0B',
                    borderRadius: 4,
                  },
                }}
              />
              {profile.completeness < 100 && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  Complete para melhor matching
                </Typography>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Grid container spacing={2}>
        {[
          { icon: <CalendarMonthIcon />, label: 'Total Consultas', value: stats.totalAppointments, color: '#9A1BFF' },
          { icon: <CalendarMonthIcon />, label: 'Próxima Consulta', value: stats.nextAppointment, color: '#2563EB' },
          { icon: <StarIcon />, label: 'Profissional Favorita', value: stats.favoriteProfessional, color: '#F59E0B' },
          { icon: <SecurityIcon />, label: 'Último Acesso', value: stats.lastLogin, color: '#18C964' },
        ].map((stat) => (
          <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent sx={{ py: 2 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: tokens.radius.md, bgcolor: `${stat.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, mb: 1 }}>
                  {stat.icon}
                </Box>
                <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem' }}>{stat.value}</Typography>
                <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Tab icon={<PersonIcon />} iconPosition="start" label="Dados Pessoais" />
        <Tab icon={<LocalHospitalIcon />} iconPosition="start" label="Saúde" />
        <Tab icon={<FavoriteIcon />} iconPosition="start" label="Convênio" />
        <Tab icon={<NotificationsIcon />} iconPosition="start" label="Notificações" />
        <Tab icon={<SecurityIcon />} iconPosition="start" label="Segurança" />
      </Tabs>

      {/* Tab: Dados Pessoais */}
      {activeTab === 0 && (
        <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
              <Typography variant="h5">Dados Pessoais</Typography>
              <Button
                variant={editing ? 'contained' : 'outlined'}
                startIcon={editing ? <SaveIcon /> : <EditIcon />}
                onClick={() => setEditing(!editing)}
              >
                {editing ? 'Salvar' : 'Editar'}
              </Button>
            </Stack>
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField label="Nome completo" defaultValue={profile.name} disabled={!editing} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField label="E-mail" defaultValue={profile.email} disabled={!editing} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField label="Telefone" defaultValue={profile.phone} disabled={!editing} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField label="CPF" defaultValue={profile.cpf} disabled />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField label="Data de Nascimento" defaultValue={profile.birthDate} disabled />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField label="Gênero" defaultValue={profile.gender} disabled={!editing} />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField label="Endereço" defaultValue={profile.address} disabled={!editing} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField label="CEP" defaultValue={profile.cep} disabled={!editing} />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField label="Contato de Emergência" defaultValue={profile.emergencyContact} disabled={!editing} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Tab: Saúde */}
      {activeTab === 1 && (
        <Stack spacing={2}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Informações de Saúde</Typography>
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField label="Tipo Sanguíneo" defaultValue={profile.bloodType} />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField label="Peso (kg)" defaultValue="65" />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField label="Altura (cm)" defaultValue="165" />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField label="IMC" defaultValue="23.9" disabled />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Alergias</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {profile.allergies.map((a) => (
                  <Chip key={a} label={a} color="error" variant="outlined" onDelete={() => {}} />
                ))}
                <Chip label="+ Adicionar" variant="outlined" onClick={() => {}} sx={{ cursor: 'pointer', borderStyle: 'dashed' }} />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Condições Pré-existentes</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {profile.conditions.map((c) => (
                  <Chip key={c} label={c} variant="outlined" />
                ))}
                <Chip label="+ Adicionar" variant="outlined" onClick={() => {}} sx={{ cursor: 'pointer', borderStyle: 'dashed' }} />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Saúde Reprodutiva</Typography>
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField label="Data Última Menstruação" type="date" InputLabelProps={{ shrink: true }} defaultValue="2026-02-01" />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField label="Ciclo Menstrual" defaultValue="Regular - 28 dias" />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField label="Método Contraceptivo" defaultValue="DIU" />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField label="Gestações" defaultValue="1" type="number" />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField label="Partos" defaultValue="1" type="number" />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField label="Abortos" defaultValue="0" type="number" />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField label="Menarca (idade)" defaultValue="12" type="number" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Stack>
      )}

      {/* Tab: Convênio */}
      {activeTab === 2 && (
        <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
              <Typography variant="h5">Plano de Saúde</Typography>
              <Chip label="Ativo" color="success" size="small" />
            </Stack>

            <Paper sx={{ p: 2.5, bgcolor: tokens.colors.surface.subtle, borderRadius: tokens.radius.md, mb: 2.5, border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ md: 'center' }}>
                <Avatar sx={{ width: 56, height: 56, bgcolor: '#2563EB', fontWeight: 700 }}>UN</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" fontWeight={700}>Unimed</Typography>
                  <Typography variant="body2" color="text.secondary">Plano Individual - Enfermaria</Typography>
                </Box>
                <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                  <Typography variant="caption" color="text.secondary">Carteirinha</Typography>
                  <Typography variant="body2" fontWeight={600}>{profile.insuranceNumber}</Typography>
                </Box>
              </Stack>
            </Paper>

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField label="Operadora" defaultValue="Unimed" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField label="Número da Carteirinha" defaultValue={profile.insuranceNumber} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField label="Plano" defaultValue="Individual - Enfermaria" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField label="Validade" defaultValue="12/2027" />
              </Grid>
            </Grid>

            <Alert severity="info" sx={{ mt: 2, borderRadius: tokens.radius.md }}>
              Os dados do convênio são utilizados para validar coberturas e agilizar o agendamento.
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Tab: Notificações */}
      {activeTab === 3 && (
        <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2.5 }}>Preferências de Notificação</Typography>
            <Stack spacing={0.5}>
              {[
                { label: 'Lembrete de consulta (24h antes)', sub: 'E-mail e SMS', default: true },
                { label: 'Lembrete de consulta (1h antes)', sub: 'Push notification', default: true },
                { label: 'Confirmação de agendamento', sub: 'E-mail', default: true },
                { label: 'Resultados de exames disponíveis', sub: 'E-mail e Push', default: true },
                { label: 'Promoções e novidades', sub: 'E-mail', default: false },
                { label: 'Dicas de saúde personalizadas', sub: 'Push notification', default: true },
                { label: 'Pesquisa de satisfação (NPS)', sub: 'E-mail após consulta', default: false },
              ].map((item) => (
                <Paper key={item.label} sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{item.label}</Typography>
                      <Typography variant="caption" color="text.secondary">{item.sub}</Typography>
                    </Box>
                    <Switch defaultChecked={item.default} color="secondary" />
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Tab: Segurança */}
      {activeTab === 4 && (
        <Stack spacing={2}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Alterar Senha</Typography>
              <Stack spacing={2} sx={{ maxWidth: 400 }}>
                <TextField label="Senha atual" type="password" />
                <TextField label="Nova senha" type="password" />
                <TextField label="Confirmar nova senha" type="password" />
                <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>Alterar Senha</Button>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Autenticação em Duas Etapas</Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight={600}>2FA via SMS</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Receba um código por SMS ao fazer login
                  </Typography>
                </Box>
                <Switch defaultChecked color="secondary" />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Privacidade (LGPD)</Typography>
              <Stack spacing={1}>
                {[
                  { label: 'Compartilhar dados com profissionais de saúde', checked: true },
                  { label: 'Permitir uso de dados para melhoria da plataforma', checked: true },
                  { label: 'Receber comunicações de marketing', checked: false },
                ].map((item) => (
                  <FormControlLabel
                    key={item.label}
                    control={<Switch defaultChecked={item.checked} color="secondary" />}
                    label={<Typography variant="body2">{item.label}</Typography>}
                  />
                ))}
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" size="small">Exportar Meus Dados</Button>
                <Button variant="outlined" size="small" color="error">Solicitar Exclusão de Conta</Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}
    </Stack>
  );
}
