import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack, Grid, Chip, Button,
  Paper, Divider, TextField, Switch, FormControlLabel, Tabs, Tab,
  Slider, Alert,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PaymentIcon from '@mui/icons-material/Payment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import BrushIcon from '@mui/icons-material/Brush';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';
import { tokens } from '../theme/colibri-theme';

export default function AdminConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [platformFee, setPlatformFee] = useState(10);
  const accessProfiles = [
    {
      name: 'Administrador Global',
      description: 'Acesso total à plataforma, incluindo configurações críticas e auditoria.',
      users: 2,
      scope: 'Global',
      permissions: ['Usuários', 'Financeiro', 'Relatórios', 'Configurações', 'Auditoria'],
    },
    {
      name: 'Gestor Operacional',
      description: 'Gerencia operação clínica sem alterar parâmetros críticos da plataforma.',
      users: 4,
      scope: 'Unidade',
      permissions: ['Profissionais', 'Pacientes', 'Consultas', 'Aprovações', 'Relatórios'],
    },
    {
      name: 'Analista Financeiro',
      description: 'Acesso restrito a conciliações, repasses e dashboards financeiros.',
      users: 3,
      scope: 'Financeiro',
      permissions: ['Financeiro', 'Relatórios Financeiros', 'Exportações'],
    },
  ];

  const accessGroups = [
    {
      name: 'Operação Clínica',
      members: 11,
      profile: 'Gestor Operacional',
      dataScope: 'Unidades: São Paulo e Campinas',
    },
    {
      name: 'Backoffice Financeiro',
      members: 5,
      profile: 'Analista Financeiro',
      dataScope: 'Contas e repasses nacionais',
    },
    {
      name: 'Compliance e Segurança',
      members: 3,
      profile: 'Administrador Global',
      dataScope: 'Acesso global + trilha de auditoria',
    },
  ];

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="overline" color="text.secondary">ADMINISTRAÇÃO</Typography>
          <Typography variant="h4" fontWeight={700}>Configurações da Plataforma</Typography>
          <Typography variant="body2" color="text.secondary">Gerencie parâmetros, pagamentos, notificações e segurança</Typography>
        </Box>
        <Button variant="contained" startIcon={<SaveIcon />}>Salvar Alterações</Button>
      </Stack>

      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Tab icon={<SettingsIcon />} iconPosition="start" label="Geral" />
        <Tab icon={<PaymentIcon />} iconPosition="start" label="Pagamentos" />
        <Tab icon={<NotificationsIcon />} iconPosition="start" label="Notificações" />
        <Tab icon={<SecurityIcon />} iconPosition="start" label="Segurança" />
        <Tab icon={<BrushIcon />} iconPosition="start" label="Aparência" />
        <Tab icon={<ManageAccountsIcon />} iconPosition="start" label="Gestão de Acessos" />
      </Tabs>

      {/* Geral */}
      {activeTab === 0 && (
        <Stack spacing={2}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Informações da Plataforma</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}><TextField label="Nome da Plataforma" defaultValue="Life Colibri" /></Grid>
                <Grid size={{ xs: 12, md: 6 }}><TextField label="URL" defaultValue="https://lifecolibri.com.br" /></Grid>
                <Grid size={{ xs: 12, md: 6 }}><TextField label="E-mail de Suporte" defaultValue="suporte@lifecolibri.com.br" /></Grid>
                <Grid size={{ xs: 12, md: 6 }}><TextField label="Telefone de Suporte" defaultValue="(11) 4000-1234" /></Grid>
                <Grid size={12}><TextField label="Descrição" defaultValue="Plataforma digital de saúde que conecta pacientes a profissionais de saúde com agendamento inteligente e teleconsulta." multiline rows={2} /></Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Parâmetros de Agendamento</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}><TextField label="Antecedência mínima (horas)" defaultValue="2" type="number" /></Grid>
                <Grid size={{ xs: 12, md: 4 }}><TextField label="Cancelamento gratuito até (horas)" defaultValue="24" type="number" /></Grid>
                <Grid size={{ xs: 12, md: 4 }}><TextField label="Reagendamentos máx. por consulta" defaultValue="2" type="number" /></Grid>
              </Grid>
              <Stack spacing={0.5} sx={{ mt: 2 }}>
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Permitir teleconsulta na plataforma" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Permitir agendamento por pacientes" />
                <FormControlLabel control={<Switch color="secondary" />} label="Aprovação automática de profissionais" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Enviar lembrete 24h antes da consulta" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Enviar lembrete 1h antes da consulta" />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Triagem Inteligente</Typography>
              <Stack spacing={0.5}>
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Ativar triagem inteligente para novos pacientes" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Matching automático com profissionais" />
                <FormControlLabel control={<Switch color="secondary" />} label="Sugestão de urgência baseada em IA" />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}

      {/* Pagamentos */}
      {activeTab === 1 && (
        <Stack spacing={2}>
          <Alert severity="info" icon={<InfoIcon />}>
            Os pagamentos são processados via Stripe Connect com split automático. A taxa da plataforma é deduzida automaticamente no momento do pagamento.
          </Alert>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Taxa da Plataforma</Typography>
              <Stack spacing={2}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Percentual sobre cada consulta</Typography>
                    <Typography variant="h4" fontWeight={700} color="primary">{platformFee}%</Typography>
                  </Stack>
                  <Slider value={platformFee} onChange={(_, v) => setPlatformFee(v as number)} min={5} max={25} step={0.5} color="secondary"
                    marks={[ { value: 5, label: '5%' }, { value: 10, label: '10%' }, { value: 15, label: '15%' }, { value: 20, label: '20%' }, { value: 25, label: '25%' } ]}
                  />
                </Box>
                <Paper sx={{ p: 2, bgcolor: tokens.colors.surface.subtle, borderRadius: tokens.radius.md }}>
                  <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Simulação (consulta de R$ 350)</Typography>
                  <Stack spacing={0.5}>
                    <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Valor consulta</Typography><Typography variant="body2">R$ 350,00</Typography></Stack>
                    <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Taxa plataforma ({platformFee}%)</Typography><Typography variant="body2" color="error">-R$ {(350 * platformFee / 100).toFixed(2)}</Typography></Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between"><Typography variant="body2" fontWeight={600}>Repasse profissional</Typography><Typography variant="body2" fontWeight={700} color="secondary">R$ {(350 - 350 * platformFee / 100).toFixed(2)}</Typography></Stack>
                  </Stack>
                </Paper>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Configuração Stripe Connect</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}><TextField label="Stripe Account ID" defaultValue="acct_1234567890" /></Grid>
                <Grid size={{ xs: 12, md: 6 }}><TextField label="Webhook Secret" defaultValue="whsec_•••••••••••••••" type="password" /></Grid>
                <Grid size={{ xs: 12, md: 6 }}><TextField label="Frequência de Repasse" defaultValue="Quinzenal (dias 5 e 20)" disabled /></Grid>
                <Grid size={{ xs: 12, md: 6 }}><TextField label="Moeda Padrão" defaultValue="BRL (Real Brasileiro)" disabled /></Grid>
              </Grid>
              <Stack spacing={0.5} sx={{ mt: 2 }}>
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Pagamento via cartão de crédito" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Pagamento via PIX" />
                <FormControlLabel control={<Switch color="secondary" />} label="Pagamento via boleto bancário" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Aceitar convênios médicos" />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}

      {/* Notificações */}
      {activeTab === 2 && (
        <Stack spacing={2}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Notificações para Pacientes</Typography>
              <Stack spacing={1}>
                {[
                  { label: 'Confirmação de agendamento', channels: 'E-mail + Push', on: true },
                  { label: 'Lembrete 24h antes', channels: 'E-mail + Push + SMS', on: true },
                  { label: 'Lembrete 1h antes', channels: 'Push', on: true },
                  { label: 'Consulta cancelada', channels: 'E-mail + Push', on: true },
                  { label: 'Resultado de exames', channels: 'E-mail + Push', on: true },
                  { label: 'Promoções e novidades', channels: 'E-mail', on: false },
                ].map(item => (
                  <Paper key={item.label} sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{item.label}</Typography>
                        <Typography variant="caption" color="text.secondary">{item.channels}</Typography>
                      </Box>
                      <Switch defaultChecked={item.on} color="secondary" />
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Notificações para Profissionais</Typography>
              <Stack spacing={1}>
                {[
                  { label: 'Novo agendamento recebido', channels: 'E-mail + Push', on: true },
                  { label: 'Cancelamento de paciente', channels: 'E-mail + Push + SMS', on: true },
                  { label: 'Nova avaliação recebida', channels: 'E-mail', on: true },
                  { label: 'Repasse financeiro', channels: 'E-mail', on: true },
                  { label: 'Relatório semanal', channels: 'E-mail', on: false },
                ].map(item => (
                  <Paper key={item.label} sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{item.label}</Typography>
                        <Typography variant="caption" color="text.secondary">{item.channels}</Typography>
                      </Box>
                      <Switch defaultChecked={item.on} color="secondary" />
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}

      {/* Segurança */}
      {activeTab === 3 && (
        <Stack spacing={2}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Políticas de Segurança</Typography>
              <Stack spacing={0.5}>
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Exigir autenticação de dois fatores (2FA) para profissionais" />
                <FormControlLabel control={<Switch color="secondary" />} label="Exigir 2FA para pacientes" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Exigir 2FA para administradores" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Bloqueio automático após 5 tentativas de login" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Sessão expira após 30 minutos de inatividade" />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>LGPD e Privacidade</Typography>
              <Stack spacing={0.5}>
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Exigir consentimento LGPD no cadastro" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Criptografia de dados sensíveis (AES-256)" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Logs de auditoria para acesso a prontuários" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Direito ao esquecimento (exclusão de dados)" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Backup automático diário (Azure Blob)" />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Política de Senhas</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}><TextField label="Comprimento mínimo" defaultValue="8" type="number" /></Grid>
                <Grid size={{ xs: 12, md: 4 }}><TextField label="Expiração (dias)" defaultValue="90" type="number" /></Grid>
                <Grid size={{ xs: 12, md: 4 }}><TextField label="Histórico (últimas)" defaultValue="5" type="number" /></Grid>
              </Grid>
              <Stack spacing={0.5} sx={{ mt: 2 }}>
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Exigir letras maiúsculas e minúsculas" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Exigir números" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Exigir caracteres especiais" />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}

      {/* Aparência */}
      {activeTab === 4 && (
        <Stack spacing={2}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Identidade Visual</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Paper sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                    <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Cor Primária</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ width: 40, height: 40, borderRadius: tokens.radius.sm, bgcolor: '#9A1BFF' }} />
                      <TextField size="small" defaultValue="#9A1BFF" sx={{ flex: 1 }} />
                    </Stack>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Paper sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                    <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Cor Secundária</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ width: 40, height: 40, borderRadius: tokens.radius.sm, bgcolor: '#2563EB' }} />
                      <TextField size="small" defaultValue="#2563EB" sx={{ flex: 1 }} />
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Tema</Typography>
              <Stack direction="row" spacing={2}>
                <Paper sx={{ p: 3, flex: 1, border: '2px solid', borderColor: '#9A1BFF', borderRadius: tokens.radius.md, textAlign: 'center', cursor: 'pointer' }}>
                  <Box sx={{ width: 60, height: 40, borderRadius: tokens.radius.sm, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', mx: 'auto', mb: 1 }} />
                  <Typography variant="body2" fontWeight={600}>Light</Typography>
                  <Chip label="Ativo" size="small" color="primary" sx={{ mt: 0.5 }} />
                </Paper>
                <Paper sx={{ p: 3, flex: 1, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md, textAlign: 'center', cursor: 'pointer', opacity: 0.7 }}>
                  <Box sx={{ width: 60, height: 40, borderRadius: tokens.radius.sm, bgcolor: '#0F172A', mx: 'auto', mb: 1 }} />
                  <Typography variant="body2" fontWeight={600}>Dark</Typography>
                </Paper>
                <Paper sx={{ p: 3, flex: 1, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md, textAlign: 'center', cursor: 'pointer', opacity: 0.7 }}>
                  <Box sx={{ width: 60, height: 40, borderRadius: tokens.radius.sm, mx: 'auto', mb: 1, background: 'linear-gradient(135deg, #FFFFFF 50%, #0F172A 50%)' }} />
                  <Typography variant="body2" fontWeight={600}>Auto</Typography>
                </Paper>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}

      {/* Gestão de Acessos */}
      {activeTab === 5 && (
        <Stack spacing={2}>
          <Alert severity="info" icon={<InfoIcon />}>
            Controle de acesso baseado em papéis (RBAC), com segregação por grupos e trilha de auditoria.
          </Alert>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h5">Perfis de Acesso</Typography>
                <Button variant="outlined" startIcon={<ManageAccountsIcon />}>Novo Perfil</Button>
              </Stack>
              <Stack spacing={1.5}>
                {accessProfiles.map((profile) => (
                  <Paper key={profile.name} sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                          <Typography variant="body1" fontWeight={700}>{profile.name}</Typography>
                          <Chip label={`${profile.users} usuários`} size="small" variant="outlined" />
                          <Chip label={profile.scope} size="small" color="secondary" variant="outlined" />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">{profile.description}</Typography>
                        <Stack direction="row" spacing={0.8} flexWrap="wrap" sx={{ mt: 1 }}>
                          {profile.permissions.map((permission) => (
                            <Chip key={permission} label={permission} size="small" sx={{ mb: 0.5 }} />
                          ))}
                        </Stack>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" variant="outlined">Editar</Button>
                        <Button size="small" variant="text">Duplicar</Button>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h5">Grupos de Acesso</Typography>
                <Button variant="outlined" startIcon={<GroupsIcon />}>Novo Grupo</Button>
              </Stack>
              <Grid container spacing={2}>
                {accessGroups.map((group) => (
                  <Grid key={group.name} size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md, height: '100%' }}>
                      <Stack spacing={1}>
                        <Typography variant="body1" fontWeight={700}>{group.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{group.dataScope}</Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          <Chip label={`${group.members} membros`} size="small" variant="outlined" />
                          <Chip label={group.profile} size="small" color="primary" variant="outlined" />
                        </Stack>
                        <Divider />
                        <Stack spacing={0.3}>
                          <Typography variant="caption" color="text.secondary">Políticas do grupo</Typography>
                          <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="MFA obrigatório" />
                          <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Acesso por horário comercial" />
                          <FormControlLabel control={<Switch color="secondary" />} label="Acesso temporário sob aprovação" />
                        </Stack>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Governança, Aprovação e Auditoria</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField label="Validade de acesso temporário (dias)" defaultValue="7" type="number" />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField label="Revisão periódica de acessos (dias)" defaultValue="90" type="number" />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField label="Retenção de logs de auditoria (meses)" defaultValue="24" type="number" />
                </Grid>
              </Grid>
              <Stack spacing={0.5} sx={{ mt: 2 }}>
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Exigir dupla aprovação para privilégios administrativos" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Bloquear conflito de função (Segregação de Funções - SoD)" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Registrar trilha completa de alterações de permissão" />
                <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Alertar acessos fora do padrão via e-mail e painel" />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}
    </Stack>
  );
}
