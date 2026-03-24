import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Card, CardContent, Stack, TextField, MenuItem,
  Stepper, Step, StepLabel, Chip, Paper, FormControl, InputLabel, Select,
  Checkbox, FormControlLabel, FormGroup, Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { tokens } from '../theme/colibri-theme';
import { triagemSteps } from '../mock/data';

export default function TriagemPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string | string[]>>({});
  const currentStep = triagemSteps[activeStep];

  const handleNext = () => {
    if (activeStep === triagemSteps.length - 1) {
      navigate('/matching');
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) navigate('/');
    else setActiveStep((prev) => prev - 1);
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (name: string, option: string) => {
    setFormData((prev) => {
      const current = (prev[name] as string[]) || [];
      return {
        ...prev,
        [name]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  };

  const renderField = (field: (typeof triagemSteps)[0]['fields'][0]) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'text':
      case 'tel':
      case 'email':
      case 'date':
      case 'number':
        return (
          <TextField
            key={field.name}
            label={field.label}
            type={field.type}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            required={field.required}
            InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
          />
        );
      case 'select':
        return (
          <FormControl key={field.name} fullWidth>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value}
              label={field.label}
              onChange={(e) => handleFieldChange(field.name, e.target.value as string)}
            >
              {field.options?.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'textarea':
        return (
          <TextField
            key={field.name}
            label={field.label}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            multiline
            rows={4}
            required={field.required}
          />
        );
      case 'multiselect':
        return (
          <Box key={field.name}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{field.label}</Typography>
            <FormGroup row>
              {field.options?.map((opt) => (
                <FormControlLabel
                  key={opt}
                  control={
                    <Checkbox
                      checked={((formData[field.name] as string[]) || []).includes(opt)}
                      onChange={() => handleMultiSelect(field.name, opt)}
                    />
                  }
                  label={opt}
                />
              ))}
            </FormGroup>
          </Box>
        );
      default:
        return null;
    }
  };

  const renderReview = () => (
    <Stack spacing={2}>
      <Alert severity="info" sx={{ borderRadius: tokens.radius.md }}>
        Revise suas informações. Após confirmar, nossa IA irá encontrar os melhores profissionais para você.
      </Alert>
      {triagemSteps.filter(s => !s.isReview).map((step) => (
        <Paper key={step.id} sx={{ p: 2, bgcolor: tokens.colors.surface.subtle, border: '1px solid', borderColor: tokens.colors.border.soft }}>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>{step.title}</Typography>
          <Stack spacing={0.5}>
            {step.fields.map((field) => {
              const val = formData[field.name];
              const displayVal = Array.isArray(val) ? val.join(', ') : val || '—';
              return (
                <Stack key={field.name} direction="row" spacing={1}>
                  <Typography variant="caption" color="text.secondary" sx={{ minWidth: 140 }}>{field.label}:</Typography>
                  <Typography variant="caption" fontWeight={500}>{displayVal}</Typography>
                </Stack>
              );
            })}
          </Stack>
        </Paper>
      ))}
    </Stack>
  );

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Box>
        <Typography variant="overline" color="text.secondary">TRIAGEM INTELIGENTE</Typography>
        <Typography variant="h4" fontWeight={700}>
          Encontre o profissional ideal
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Responda algumas perguntas para personalizarmos sua busca
        </Typography>
      </Box>

      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ '& .MuiStepLabel-label': { fontSize: '0.75rem' } }}>
        {triagemSteps.map((step) => (
          <Step key={step.id}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
            <Chip label={`Etapa ${currentStep.id} de ${triagemSteps.length}`} size="small" sx={{ bgcolor: tokens.colors.primary.soft, fontWeight: 600, height: 24 }} />
          </Stack>
          <Typography variant="h5" sx={{ mb: 0.5 }}>{currentStep.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{currentStep.description}</Typography>

          {currentStep.isReview ? renderReview() : (
            <Stack spacing={2.5}>
              {currentStep.fields.map(renderField)}
            </Stack>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Stack direction="row" justifyContent="space-between">
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleBack}>
          {activeStep === 0 ? 'Voltar ao Início' : 'Anterior'}
        </Button>
        <Button
          variant="contained"
          endIcon={activeStep === triagemSteps.length - 1 ? <CheckCircleIcon /> : <ArrowForwardIcon />}
          onClick={handleNext}
          sx={activeStep === triagemSteps.length - 1 ? { background: tokens.colors.gradient.brand, color: '#fff' } : {}}
        >
          {activeStep === triagemSteps.length - 1 ? 'Encontrar Profissionais' : 'Próximo'}
        </Button>
      </Stack>
    </Stack>
  );
}
