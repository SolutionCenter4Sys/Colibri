import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack, Grid, Chip, Avatar,
  Paper, Divider, Button, TextField, Tabs, Tab, Accordion, AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import MedicationIcon from '@mui/icons-material/Medication';
import HistoryIcon from '@mui/icons-material/History';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import { tokens } from '../theme/colibri-theme';

export default function ProntuarioPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [anamneseNotes, setAnamneseNotes] = useState('');
  const [consultaNotes, setConsultaNotes] = useState('');

  const patient = {
    name: 'Maria Silva Santos', age: 34, birthDate: '15/03/1991',
    birthCountry: 'Brasil', birthState: 'São Paulo',
    phone: '(11) 98765-4321', email: 'maria@email.com',
    bloodType: 'O+', allergies: 'Dipirona', insurance: 'Unimed',
  };

  const historyItems = [
    { date: '2026-02-10', type: 'Consulta', professional: 'Dra. Ana Beatriz Souza', description: 'Consulta de rotina. Solicitados exames laboratoriais.', prescriptions: ['Ácido Fólico 5mg - 1x/dia'] },
    { date: '2026-01-15', type: 'Retorno', professional: 'Dra. Ana Beatriz Souza', description: 'Retorno com resultados de exames. Todos dentro da normalidade.', prescriptions: [] },
    { date: '2025-12-05', type: 'Consulta', professional: 'Dra. Carla Pinheiro', description: 'Mamografia anual. Sem alterações significativas.', prescriptions: [] },
    { date: '2025-10-20', type: 'Exame', professional: 'Dra. Ana Beatriz Souza', description: 'Ultrassonografia pélvica. Achados normais.', prescriptions: [] },
  ];

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="overline" color="text.secondary">PRONTUÁRIO ELETRÔNICO</Typography>
          <Typography variant="h4" fontWeight={700}>Prontuário - {patient.name}</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<PrintIcon />}>Imprimir</Button>
          <Button variant="contained" startIcon={<SaveIcon />}>Salvar</Button>
        </Stack>
      </Stack>

      {/* Patient Info Card */}
      <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
        <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size="auto">
              <Avatar sx={{ width: 64, height: 64, bgcolor: '#9A1BFF', fontSize: '1.3rem' }}>MS</Avatar>
            </Grid>
            <Grid size="grow">
              <Stack direction="row" spacing={3} flexWrap="wrap">
                {[
                  { label: 'Idade', value: `${patient.age} anos` },
                  { label: 'Nascimento', value: patient.birthDate },
                  { label: 'País de Nascimento', value: patient.birthCountry },
                  { label: 'Estado de Nascimento', value: patient.birthState },
                  { label: 'Tipo Sanguíneo', value: patient.bloodType },
                  { label: 'Alergias', value: patient.allergies, chip: true, chipColor: 'error' },
                  { label: 'Convênio', value: patient.insurance },
                  { label: 'Telefone', value: patient.phone },
                ].map((item) => (
                  <Box key={item.label}>
                    <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                    {item.chip ? (
                      <Chip label={item.value} size="small" color={item.chipColor as 'error'} variant="outlined" sx={{ display: 'block', mt: 0.3 }} />
                    ) : (
                      <Typography variant="body2" fontWeight={600}>{item.value}</Typography>
                    )}
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Tab icon={<NoteAddIcon />} iconPosition="start" label="Anamnese" />
        <Tab icon={<DescriptionIcon />} iconPosition="start" label="Registro de Consulta" />
        <Tab icon={<HistoryIcon />} iconPosition="start" label="Histórico" />
        <Tab icon={<MedicationIcon />} iconPosition="start" label="Prescrições" />
      </Tabs>

      {/* Tab: Anamnese */}
      {activeTab === 0 && (
        <Stack spacing={2}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Anamnese</Typography>
              <Stack spacing={2}>
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>Queixa Principal</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField multiline rows={3} placeholder="Descreva a queixa principal da paciente..." value={anamneseNotes} onChange={(e) => setAnamneseNotes(e.target.value)} />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>História da Doença Atual (HDA)</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField multiline rows={3} placeholder="Descreva a evolução dos sintomas..." />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>Antecedentes Pessoais</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid size={6}><TextField label="Doenças Crônicas" multiline rows={2} /></Grid>
                      <Grid size={6}><TextField label="Cirurgias Anteriores" multiline rows={2} /></Grid>
                      <Grid size={6}><TextField label="Medicamentos em Uso" multiline rows={2} /></Grid>
                      <Grid size={6}><TextField label="Alergias" multiline rows={2} defaultValue="Dipirona" /></Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>Antecedentes Ginecológicos/Obstétricos</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid size={4}><TextField label="Menarca" placeholder="Ex: 12 anos" /></Grid>
                      <Grid size={4}><TextField label="DUM" placeholder="Data última menstruação" /></Grid>
                      <Grid size={4}><TextField label="Ciclo" placeholder="Ex: Regular, 28 dias" /></Grid>
                      <Grid size={4}><TextField label="Gestações (G)" placeholder="Ex: 2" /></Grid>
                      <Grid size={4}><TextField label="Partos (P)" placeholder="Ex: 1" /></Grid>
                      <Grid size={4}><TextField label="Abortos (A)" placeholder="Ex: 0" /></Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>Exame Físico</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid size={3}><TextField label="PA" placeholder="120/80 mmHg" /></Grid>
                      <Grid size={3}><TextField label="FC" placeholder="72 bpm" /></Grid>
                      <Grid size={3}><TextField label="Temp" placeholder="36.5°C" /></Grid>
                      <Grid size={3}><TextField label="Peso" placeholder="65 kg" /></Grid>
                      <Grid size={12}><TextField label="Observações do Exame Físico" multiline rows={3} /></Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}

      {/* Tab: Registro de Consulta */}
      {activeTab === 1 && (
        <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>Registro da Consulta</Typography>
            <Stack spacing={2}>
              <Paper sx={{ p: 2, bgcolor: tokens.colors.surface.subtle, borderRadius: tokens.radius.md }}>
                <Stack direction="row" spacing={2}>
                  <Chip label="Consulta" color="primary" size="small" />
                  <Typography variant="body2" color="text.secondary">Data: 18/02/2026 | Horário: 10:00 | Duração estimada: 30min</Typography>
                </Stack>
              </Paper>
              <TextField label="Motivo da Consulta" multiline rows={2} placeholder="Consulta de rotina / acompanhamento..." />
              <TextField label="Anamnese Resumida" multiline rows={3} placeholder="Resumo da anamnese relevante para esta consulta..." />
              <TextField label="Hipótese Diagnóstica" multiline rows={2} placeholder="CID-10 / Descrição..." />
              <TextField label="Conduta" multiline rows={3} value={consultaNotes} onChange={(e) => setConsultaNotes(e.target.value)} placeholder="Tratamento proposto, orientações..." />
              <Divider />
              <Typography variant="body2" fontWeight={600}>Solicitação de Exames</Typography>
              <Grid container spacing={2}>
                {['Hemograma Completo', 'TSH / T4 Livre', 'Glicemia Jejum', 'Colesterol Total', 'Papanicolau', 'Ultrassom Pélvico'].map((exam) => (
                  <Grid key={exam} size={{ xs: 6, md: 4 }}>
                    <Paper sx={{ p: 1.5, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.sm, cursor: 'pointer', '&:hover': { borderColor: '#9A1BFF', bgcolor: '#9A1BFF08' } }}>
                      <Typography variant="body2">{exam}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              <Divider />
              <Typography variant="body2" fontWeight={600}>Prescrição</Typography>
              <TextField label="Medicamento" placeholder="Nome do medicamento" />
              <Grid container spacing={2}>
                <Grid size={4}><TextField label="Dose" placeholder="Ex: 500mg" /></Grid>
                <Grid size={4}><TextField label="Posologia" placeholder="Ex: 8/8h" /></Grid>
                <Grid size={4}><TextField label="Duração" placeholder="Ex: 7 dias" /></Grid>
              </Grid>
              <Button variant="outlined" startIcon={<NoteAddIcon />}>Adicionar Medicamento</Button>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Tab: Histórico */}
      {activeTab === 2 && (
        <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>Histórico de Atendimentos</Typography>
            <Stack spacing={2}>
              {historyItems.map((item, i) => (
                <Paper key={i} sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip label={item.type} size="small" color={item.type === 'Consulta' ? 'primary' : item.type === 'Retorno' ? 'info' : 'secondary'} variant="outlined" sx={{ height: 22 }} />
                      <Typography variant="body2" fontWeight={600}>{item.professional}</Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">{item.date}</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                  {item.prescriptions.length > 0 && (
                    <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                      <MedicationIcon sx={{ fontSize: 14, color: '#9A1BFF' }} />
                      {item.prescriptions.map((p, j) => (
                        <Chip key={j} label={p} size="small" sx={{ height: 20, fontSize: '0.6rem', bgcolor: '#9A1BFF10', color: '#9A1BFF' }} />
                      ))}
                    </Stack>
                  )}
                </Paper>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Tab: Prescrições */}
      {activeTab === 3 && (
        <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>Prescrições Ativas</Typography>
            <Stack spacing={1.5}>
              {[
                { med: 'Ácido Fólico 5mg', dose: '1 comprimido/dia', start: '10/02/2026', end: '10/05/2026', status: 'Ativa' },
                { med: 'Vitamina D3 2000UI', dose: '1 cápsula/dia', start: '15/01/2026', end: '15/04/2026', status: 'Ativa' },
              ].map((rx, i) => (
                <Paper key={i} sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.md }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <MedicationIcon sx={{ color: '#9A1BFF', fontSize: 18 }} />
                        <Typography variant="body2" fontWeight={600}>{rx.med}</Typography>
                      </Stack>
                      <Typography variant="caption" color="text.secondary">{rx.dose} | {rx.start} a {rx.end}</Typography>
                    </Box>
                    <Chip label={rx.status} size="small" color="success" variant="outlined" sx={{ height: 22 }} />
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
