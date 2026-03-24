import {
  Box, Typography, Card, CardContent, Stack, Grid, Chip, Button,
  Paper, Divider, Switch, FormControlLabel, Alert,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';
import SaveIcon from '@mui/icons-material/Save';
import { tokens } from '../theme/colibri-theme';

export default function AdminAcessosPage() {
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
          <Typography variant="h4" fontWeight={700}>Gestão de Acessos</Typography>
          <Typography variant="body2" color="text.secondary">Perfis, grupos, políticas e governança de permissões</Typography>
        </Box>
        <Button variant="contained" startIcon={<SaveIcon />}>Salvar Alterações</Button>
      </Stack>

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
              <Paper sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                <Typography variant="caption" color="text.secondary">Validade de acesso temporário</Typography>
                <Typography variant="h5" fontWeight={700}>7 dias</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                <Typography variant="caption" color="text.secondary">Revisão periódica de acessos</Typography>
                <Typography variant="h5" fontWeight={700}>90 dias</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                <Typography variant="caption" color="text.secondary">Retenção de logs de auditoria</Typography>
                <Typography variant="h5" fontWeight={700}>24 meses</Typography>
              </Paper>
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
  );
}
