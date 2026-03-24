import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  Box, Typography, Button, Card, CardContent, Stack, TextField, Divider,
  Grid, Paper, Alert, Radio, RadioGroup, FormControlLabel, Chip,
  CircularProgress, Dialog, DialogContent, DialogActions,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PixIcon from '@mui/icons-material/QrCode2';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { tokens } from '../theme/colibri-theme';
import { mockProfessionals } from '../mock/data';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { professionalId } = useParams();
  const [searchParams] = useSearchParams();
  const professional = mockProfessionals.find(p => p.id === professionalId) || mockProfessionals[0];

  const date = searchParams.get('date') || '2026-02-18';
  const time = searchParams.get('time') || '10:00';
  const modality = searchParams.get('modality') || 'presencial';

  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Button variant="text" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 1, color: 'text.secondary' }}>
          Voltar
        </Button>
        <Typography variant="h4" fontWeight={700}>Checkout</Typography>
        <Typography variant="body2" color="text.secondary">Finalize seu agendamento com segurança</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left: Payment */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2}>
            {/* Summary */}
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent>
                <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>Dados da Consulta</Typography>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Profissional</Typography>
                    <Typography variant="body2" fontWeight={600}>{professional.name}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Especialidade</Typography>
                    <Typography variant="body2">{professional.specialty}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Data</Typography>
                    <Typography variant="body2" fontWeight={600}>{date} às {time}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Modalidade</Typography>
                    <Chip label={modality === 'teleconsulta' ? 'Teleconsulta' : 'Presencial'} size="small" sx={{ height: 22 }} />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
              <CardContent>
                <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>Forma de Pagamento</Typography>
                <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <Paper sx={{ p: 2, mb: 1, border: '2px solid', borderColor: paymentMethod === 'credit' ? tokens.colors.primary.main : 'transparent', borderRadius: tokens.radius.md, cursor: 'pointer' }}
                    onClick={() => setPaymentMethod('credit')}
                  >
                    <FormControlLabel value="credit" control={<Radio />} label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CreditCardIcon sx={{ color: tokens.colors.primary.main }} />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>Cartão de Crédito</Typography>
                          <Typography variant="caption" color="text.secondary">Visa, Master, Elo - até 3x sem juros</Typography>
                        </Box>
                      </Stack>
                    } />
                  </Paper>
                  <Paper sx={{ p: 2, mb: 1, border: '2px solid', borderColor: paymentMethod === 'pix' ? tokens.colors.accent.main : 'transparent', borderRadius: tokens.radius.md, cursor: 'pointer' }}
                    onClick={() => setPaymentMethod('pix')}
                  >
                    <FormControlLabel value="pix" control={<Radio />} label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <PixIcon sx={{ color: tokens.colors.accent.main }} />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>PIX</Typography>
                          <Typography variant="caption" color="text.secondary">Pagamento instantâneo - 5% de desconto</Typography>
                        </Box>
                      </Stack>
                    } />
                  </Paper>
                  <Paper sx={{ p: 2, border: '2px solid', borderColor: paymentMethod === 'boleto' ? tokens.colors.status.info : 'transparent', borderRadius: tokens.radius.md, cursor: 'pointer' }}
                    onClick={() => setPaymentMethod('boleto')}
                  >
                    <FormControlLabel value="boleto" control={<Radio />} label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <ReceiptIcon sx={{ color: tokens.colors.status.info }} />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>Boleto Bancário</Typography>
                          <Typography variant="caption" color="text.secondary">Vencimento em 1 dia útil</Typography>
                        </Box>
                      </Stack>
                    } />
                  </Paper>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Credit Card Form */}
            {paymentMethod === 'credit' && (
              <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
                <CardContent>
                  <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>Dados do Cartão</Typography>
                  <Stack spacing={2}>
                    <TextField label="Nome no cartão" placeholder="Como está impresso no cartão" />
                    <TextField label="Número do cartão" placeholder="0000 0000 0000 0000" />
                    <Grid container spacing={2}>
                      <Grid size={6}>
                        <TextField label="Validade" placeholder="MM/AA" />
                      </Grid>
                      <Grid size={6}>
                        <TextField label="CVV" placeholder="123" />
                      </Grid>
                    </Grid>
                  </Stack>
                </CardContent>
              </Card>
            )}

            {paymentMethod === 'pix' && (
              <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>QR Code PIX</Typography>
                  <Paper sx={{ width: 200, height: 200, mx: 'auto', mb: 2, bgcolor: tokens.colors.surface.subtle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PixIcon sx={{ fontSize: 80, color: 'text.secondary' }} />
                  </Paper>
                  <Typography variant="caption" color="text.secondary">
                    O QR Code será gerado após confirmar o agendamento
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>

        {/* Right: Order Summary */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ border: '1px solid', borderColor: tokens.colors.border.soft, position: 'sticky', top: 80 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Resumo do Pedido</Typography>
              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Consulta</Typography>
                  <Typography variant="body2">R$ {professional.price},00</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Taxa de serviço</Typography>
                  <Typography variant="body2">R$ {(professional.price * 0.05).toFixed(2)}</Typography>
                </Stack>
                {paymentMethod === 'pix' && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="secondary">Desconto PIX (5%)</Typography>
                    <Typography variant="body2" color="secondary">- R$ {(professional.price * 0.05).toFixed(2)}</Typography>
                  </Stack>
                )}
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1" fontWeight={700}>Total</Typography>
                  <Typography variant="h5" fontWeight={700}>
                    R$ {paymentMethod === 'pix'
                      ? professional.price.toFixed(2)
                      : (professional.price * 1.05).toFixed(2)
                    }
                  </Typography>
                </Stack>
              </Stack>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handlePayment}
                disabled={processing}
                startIcon={processing ? <CircularProgress size={20} color="inherit" /> : <LockIcon />}
                sx={{ mt: 3, background: tokens.colors.gradient.brand }}
              >
                {processing ? 'Processando...' : 'Confirmar Pagamento'}
              </Button>

              <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" sx={{ mt: 1.5 }}>
                <LockIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  Pagamento seguro via Stripe
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Success Dialog */}
      <Dialog open={success} maxWidth="sm" fullWidth aria-labelledby="success-dialog-title" PaperProps={{ sx: { borderRadius: tokens.radius.lg, textAlign: 'center' } }}>
        <DialogContent sx={{ py: 4 }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: tokens.colors.accent.main, mb: 2 }} />
          <Typography id="success-dialog-title" variant="h4" fontWeight={700} sx={{ mb: 1 }}>Consulta Agendada!</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Sua consulta com {professional.name} foi confirmada com sucesso.
          </Typography>
          <Paper sx={{ p: 2, bgcolor: tokens.colors.surface.subtle, borderRadius: tokens.radius.md, textAlign: 'left' }}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Data</Typography>
                <Typography variant="body2" fontWeight={600}>{date} às {time}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Modalidade</Typography>
                <Typography variant="body2" fontWeight={600}>{modality === 'teleconsulta' ? 'Teleconsulta' : 'Presencial'}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Protocolo</Typography>
                <Typography variant="body2" fontWeight={600}>#LC-2026-00847</Typography>
              </Stack>
            </Stack>
          </Paper>
          <Alert severity="info" sx={{ mt: 2, borderRadius: tokens.radius.md, textAlign: 'left' }}>
            Enviamos um e-mail de confirmação com todos os detalhes. Lembre-se de chegar 15 minutos antes.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'center' }}>
          <Button variant="outlined" onClick={() => navigate('/')}>Ir para o Início</Button>
          <Button variant="contained" startIcon={<CalendarMonthIcon />} onClick={() => navigate('/minhas-consultas')}>
            Minhas Consultas
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
