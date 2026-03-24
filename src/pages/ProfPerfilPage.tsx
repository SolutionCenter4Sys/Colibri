import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack, Grid, Chip, Avatar, Button,
  Paper, Divider, TextField, Tabs, Tab, Switch, FormControlLabel,
  IconButton, Rating, LinearProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { tokens } from '../theme/colibri-theme';

export default function ProfPerfilPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [editing, setEditing] = useState(false);

  const profile = {
    name: 'Dra. Ana Beatriz Souza',
    crm: 'CRM/SP 123456',
    specialty: 'Ginecologia e Obstetrícia',
    email: 'ana.beatriz@lifecolibri.com',
    phone: '(11) 99876-5432',
    bio: 'Especialista em saúde da mulher com 15 anos de experiência. Foco em gestação de alto risco e reprodução assistida. Formada pela USP com residência no HC-FMUSP.',
    rating: 4.9,
    reviews: 127,
    patients: 142,
    consultPrice: 350,
    returnPrice: 250,
    examPrice: 300,
  };

  const specialties = ['Ginecologia', 'Obstetrícia', 'Gestação Alto Risco', 'Reprodução Assistida', 'Endometriose'];
  const formations = [
    { title: 'Medicina - USP', year: '2005-2011' },
    { title: 'Residência Ginecologia - HC-FMUSP', year: '2011-2014' },
    { title: 'Especialização Alto Risco - Einstein', year: '2014-2016' },
  ];

  const schedule = [
    { day: 'Segunda', morning: '08:00 - 12:00', afternoon: '14:00 - 18:00', active: true },
    { day: 'Terça', morning: '08:00 - 12:00', afternoon: '14:00 - 18:00', active: true },
    { day: 'Quarta', morning: '08:00 - 12:00', afternoon: '14:00 - 18:00', active: true },
    { day: 'Quinta', morning: '08:00 - 12:00', afternoon: '14:00 - 18:00', active: true },
    { day: 'Sexta', morning: '08:00 - 12:00', afternoon: '14:00 - 17:00', active: true },
    { day: 'Sábado', morning: '08:00 - 12:00', afternoon: '', active: false },
    { day: 'Domingo', morning: '', afternoon: '', active: false },
  ];

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="overline" color="text.secondary">MEU PERFIL PROFISSIONAL</Typography>
        <Typography variant="h4" fontWeight={700}>Perfil e Configurações</Typography>
      </Box>

      {/* Profile Header */}
      <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
        <CardContent sx={{ p: 3 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ md: 'center' }}>
            <Box sx={{ position: 'relative', alignSelf: { xs: 'center', md: 'flex-start' } }}>
              <Avatar sx={{ width: 110, height: 110, bgcolor: '#9A1BFF', fontSize: '2.2rem', fontWeight: 700 }}>AB</Avatar>
              <IconButton size="small" sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: 'background.paper', border: '2px solid', borderColor: 'divider', width: 32, height: 32 }}>
                <CameraAltIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <Typography variant="h4" fontWeight={700}>{profile.name}</Typography>
                <VerifiedIcon sx={{ fontSize: 22, color: '#2563EB' }} />
              </Stack>
              <Typography variant="body1" color="text.secondary">{profile.specialty}</Typography>
              <Typography variant="body2" color="text.secondary">{profile.crm}</Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <StarIcon sx={{ fontSize: 18, color: '#F59E0B' }} />
                  <Typography variant="body2" fontWeight={700}>{profile.rating}</Typography>
                  <Typography variant="caption" color="text.secondary">({profile.reviews} avaliações)</Typography>
                </Stack>
                <Chip label={`${profile.patients} pacientes`} size="small" variant="outlined" sx={{ height: 24 }} />
              </Stack>
            </Box>
            <Stack alignItems="flex-end" spacing={1}>
              <Chip label="Perfil Verificado" icon={<VerifiedIcon />} color="success" size="small" />
              <Chip label="Desde Jan 2025" size="small" variant="outlined" />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Tab icon={<PersonIcon />} iconPosition="start" label="Dados Pessoais" />
        <Tab icon={<MedicalServicesIcon />} iconPosition="start" label="Especialidades" />
        <Tab icon={<CalendarMonthIcon />} iconPosition="start" label="Horários e Valores" />
        <Tab icon={<SettingsIcon />} iconPosition="start" label="Configurações" />
      </Tabs>

      {/* Tab: Dados Pessoais */}
      {activeTab === 0 && (
        <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
              <Typography variant="h5">Dados Pessoais e Profissionais</Typography>
              <Button variant={editing ? 'contained' : 'outlined'} startIcon={editing ? <SaveIcon /> : <EditIcon />}
                onClick={() => setEditing(!editing)}
              >
                {editing ? 'Salvar' : 'Editar'}
              </Button>
            </Stack>
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField label="Nome completo" defaultValue={profile.name} disabled={!editing} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField label="CRM" defaultValue={profile.crm} disabled />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField label="CPF" defaultValue="***.***.***-56" disabled />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField label="E-mail profissional" defaultValue={profile.email} disabled={!editing} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField label="Telefone" defaultValue={profile.phone} disabled={!editing} />
              </Grid>
              <Grid size={12}>
                <TextField label="Biografia (exibida no perfil público)" defaultValue={profile.bio} disabled={!editing} multiline rows={3} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField label="Endereço do Consultório" defaultValue="Av. Paulista, 1000 - Sala 1201 - São Paulo, SP" disabled={!editing} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField label="CEP" defaultValue="01310-100" disabled={!editing} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField label="Registro ANS" defaultValue="123456" disabled={!editing} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Tab: Especialidades */}
      {activeTab === 1 && (
        <Stack spacing={2}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Especialidades e Áreas de Atuação</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {specialties.map(s => (
                  <Chip key={s} label={s} color="primary" variant="outlined" onDelete={() => {}} sx={{ mb: 1 }} />
                ))}
                <Chip label="+ Adicionar" variant="outlined" onClick={() => {}} sx={{ cursor: 'pointer', borderStyle: 'dashed', mb: 1 }} />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h5">Formação Acadêmica</Typography>
                <Button variant="outlined" size="small" startIcon={<AddIcon />}>Adicionar</Button>
              </Stack>
              <Stack spacing={1.5}>
                {formations.map((f, i) => (
                  <Paper key={i} sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{f.title}</Typography>
                        <Typography variant="caption" color="text.secondary">{f.year}</Typography>
                      </Box>
                      <IconButton size="small"><DeleteIcon fontSize="small" /></IconButton>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Convênios Aceitos</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {['Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil', 'NotreDame'].map(c => (
                  <Chip key={c} label={c} variant="outlined" onDelete={() => {}} sx={{ mb: 1 }} />
                ))}
                <Chip label="+ Adicionar" variant="outlined" onClick={() => {}} sx={{ cursor: 'pointer', borderStyle: 'dashed', mb: 1 }} />
              </Stack>
              <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Aceitar particular" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Stack>
      )}

      {/* Tab: Horários e Valores */}
      {activeTab === 2 && (
        <Stack spacing={2}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Grade de Horários</Typography>
              <Stack spacing={1}>
                {schedule.map((s) => (
                  <Paper key={s.day} sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md, opacity: s.active ? 1 : 0.5 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Switch defaultChecked={s.active} color="secondary" />
                      <Typography variant="body2" fontWeight={600} sx={{ minWidth: 80 }}>{s.day}</Typography>
                      {s.active ? (
                        <Stack direction="row" spacing={2} sx={{ flex: 1 }}>
                          <Paper sx={{ px: 2, py: 0.8, bgcolor: tokens.colors.surface.subtle, borderRadius: tokens.radius.sm, flex: 1, textAlign: 'center' }}>
                            <Typography variant="caption" color="text.secondary">Manhã</Typography>
                            <Typography variant="body2" fontWeight={600}>{s.morning || '—'}</Typography>
                          </Paper>
                          <Paper sx={{ px: 2, py: 0.8, bgcolor: tokens.colors.surface.subtle, borderRadius: tokens.radius.sm, flex: 1, textAlign: 'center' }}>
                            <Typography variant="caption" color="text.secondary">Tarde</Typography>
                            <Typography variant="body2" fontWeight={600}>{s.afternoon || '—'}</Typography>
                          </Paper>
                        </Stack>
                      ) : (
                        <Typography variant="body2" color="text.secondary">Não atende</Typography>
                      )}
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Tabela de Valores</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Paper sx={{ p: 2.5, border: '2px solid', borderColor: '#9A1BFF', borderRadius: tokens.radius.md, textAlign: 'center' }}>
                    <Typography variant="overline" color="text.secondary">Consulta</Typography>
                    <Typography variant="h3" fontWeight={700}>R$ {profile.consultPrice}</Typography>
                    <Typography variant="caption" color="text.secondary">Duração: 40 min</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Paper sx={{ p: 2.5, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md, textAlign: 'center' }}>
                    <Typography variant="overline" color="text.secondary">Retorno</Typography>
                    <Typography variant="h3" fontWeight={700}>R$ {profile.returnPrice}</Typography>
                    <Typography variant="caption" color="text.secondary">Duração: 20 min</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Paper sx={{ p: 2.5, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md, textAlign: 'center' }}>
                    <Typography variant="overline" color="text.secondary">Exame</Typography>
                    <Typography variant="h3" fontWeight={700}>R$ {profile.examPrice}</Typography>
                    <Typography variant="caption" color="text.secondary">Duração: 30 min</Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: 'block' }}>
                * Taxa da plataforma: 10% sobre o valor da consulta (split automático via Stripe Connect)
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Configuração de Agenda</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField label="Duração padrão (min)" defaultValue="40" type="number" />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField label="Intervalo entre consultas (min)" defaultValue="10" type="number" />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField label="Antecedência mínima (horas)" defaultValue="24" type="number" />
                </Grid>
              </Grid>
              <Stack spacing={0.5} sx={{ mt: 2 }}>
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Permitir teleconsulta" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Permitir agendamento online" />
                <FormControlLabel control={<Switch color="secondary" />} label="Confirmação automática de agendamentos" />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}

      {/* Tab: Configurações */}
      {activeTab === 3 && (
        <Stack spacing={2}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Notificações</Typography>
              <Stack spacing={0.5}>
                {[
                  { label: 'Novo agendamento recebido', sub: 'E-mail e Push', checked: true },
                  { label: 'Cancelamento de consulta', sub: 'E-mail, SMS e Push', checked: true },
                  { label: 'Lembrete de consulta (1h antes)', sub: 'Push notification', checked: true },
                  { label: 'Nova avaliação recebida', sub: 'E-mail', checked: true },
                  { label: 'Repasse financeiro realizado', sub: 'E-mail', checked: true },
                  { label: 'Relatório semanal', sub: 'E-mail (toda segunda)', checked: false },
                ].map(item => (
                  <Paper key={item.label} sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{item.label}</Typography>
                        <Typography variant="caption" color="text.secondary">{item.sub}</Typography>
                      </Box>
                      <Switch defaultChecked={item.checked} color="secondary" />
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>

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
        </Stack>
      )}
    </Stack>
  );
}
