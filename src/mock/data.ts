export const mockProfessionals = [
  {
    id: '1', name: 'Dra. Ana Beatriz Souza', specialty: 'Ginecologia e Obstetrícia',
    crm: 'CRM/SP 123456', rating: 4.9, reviews: 127, avatar: '',
    bio: 'Especialista em saúde da mulher com 15 anos de experiência. Foco em gestação de alto risco e reprodução assistida.',
    price: 350, nextAvailable: '2026-02-18T10:00:00', matchScore: 98,
    tags: ['Gestação Alto Risco', 'Reprodução Assistida', 'Endometriose'],
    availableSlots: [
      { date: '2026-02-18', times: ['10:00', '11:00', '14:00', '15:00'] },
      { date: '2026-02-19', times: ['09:00', '10:00', '11:00', '14:00', '16:00'] },
      { date: '2026-02-20', times: ['10:00', '14:00', '15:00'] },
    ],
  },
  {
    id: '2', name: 'Dr. Ricardo Mendes', specialty: 'Reprodução Humana Assistida',
    crm: 'CRM/SP 234567', rating: 4.8, reviews: 98, avatar: '',
    bio: 'Referência em reprodução assistida e fertilização in vitro com mais de 2000 procedimentos realizados.',
    price: 500, nextAvailable: '2026-02-19T09:00:00', matchScore: 95,
    tags: ['FIV', 'Inseminação', 'Preservação Fertilidade'],
    availableSlots: [
      { date: '2026-02-19', times: ['09:00', '11:00', '14:00'] },
      { date: '2026-02-21', times: ['10:00', '11:00', '15:00', '16:00'] },
      { date: '2026-02-22', times: ['09:00', '10:00'] },
    ],
  },
  {
    id: '3', name: 'Dra. Carla Pinheiro', specialty: 'Mastologia',
    crm: 'CRM/RJ 345678', rating: 4.7, reviews: 89, avatar: '',
    bio: 'Mastologista com especialização em diagnóstico precoce e tratamento de doenças mamárias.',
    price: 300, nextAvailable: '2026-02-18T14:00:00', matchScore: 91,
    tags: ['Mamografia', 'Biópsia', 'Câncer de Mama'],
    availableSlots: [
      { date: '2026-02-18', times: ['14:00', '15:00', '16:00'] },
      { date: '2026-02-19', times: ['09:00', '10:00', '11:00'] },
      { date: '2026-02-20', times: ['14:00', '15:00'] },
    ],
  },
  {
    id: '4', name: 'Dr. Paulo Vieira', specialty: 'Endocrinologia Ginecológica',
    crm: 'CRM/SP 456789', rating: 4.6, reviews: 73, avatar: '',
    bio: 'Endocrinologista ginecológico especializado em SOP, menopausa e distúrbios hormonais.',
    price: 400, nextAvailable: '2026-02-20T10:00:00', matchScore: 88,
    tags: ['SOP', 'Menopausa', 'Hormônios'],
    availableSlots: [
      { date: '2026-02-20', times: ['10:00', '11:00', '14:00'] },
      { date: '2026-02-21', times: ['09:00', '10:00', '14:00', '15:00'] },
      { date: '2026-02-22', times: ['10:00', '11:00'] },
    ],
  },
  {
    id: '5', name: 'Dra. Luciana Ferreira', specialty: 'Obstetrícia - Pré-natal',
    crm: 'CRM/MG 567890', rating: 4.9, reviews: 156, avatar: '',
    bio: 'Obstetra dedicada ao pré-natal humanizado e parto respeitoso. 20 anos de atuação.',
    price: 280, nextAvailable: '2026-02-18T09:00:00', matchScore: 85,
    tags: ['Pré-natal', 'Parto Humanizado', 'Gestação Gemelar'],
    availableSlots: [
      { date: '2026-02-18', times: ['09:00', '10:00', '11:00', '14:00'] },
      { date: '2026-02-19', times: ['09:00', '10:00', '14:00', '15:00', '16:00'] },
      { date: '2026-02-20', times: ['09:00', '10:00', '11:00'] },
    ],
  },
];

export const triagemSteps = [
  {
    id: 1, title: 'Informações Pessoais', description: 'Vamos começar com alguns dados básicos',
    fields: [
      { name: 'fullName', label: 'Nome completo', type: 'text', required: true },
      { name: 'birthDate', label: 'Data de nascimento', type: 'date', required: true },
      { name: 'phone', label: 'Telefone', type: 'tel', required: true },
      { name: 'email', label: 'E-mail', type: 'email', required: true },
    ],
  },
  {
    id: 2, title: 'Motivo da Consulta', description: 'O que traz você até aqui?',
    fields: [
      { name: 'mainReason', label: 'Principal motivo', type: 'select', required: true, options: ['Consulta de rotina', 'Sintomas específicos', 'Acompanhamento gestação', 'Reprodução assistida', 'Segunda opinião', 'Outro'] },
      { name: 'description', label: 'Descreva brevemente sua situação', type: 'textarea', required: false },
    ],
  },
  {
    id: 3, title: 'Histórico de Saúde', description: 'Informações sobre seu histórico médico',
    fields: [
      { name: 'conditions', label: 'Condições pré-existentes', type: 'multiselect', options: ['Diabetes', 'Hipertensão', 'Endometriose', 'SOP', 'Tireoide', 'Nenhuma'] },
      { name: 'surgeries', label: 'Cirurgias anteriores', type: 'text' },
      { name: 'medications', label: 'Medicamentos em uso', type: 'text' },
    ],
  },
  {
    id: 4, title: 'Saúde Reprodutiva', description: 'Informações sobre saúde reprodutiva',
    fields: [
      { name: 'lastPeriod', label: 'Data da última menstruação', type: 'date' },
      { name: 'contraception', label: 'Método contraceptivo atual', type: 'select', options: ['Nenhum', 'Pílula', 'DIU', 'Implante', 'Preservativo', 'Outro'] },
      { name: 'pregnancies', label: 'Gestações anteriores', type: 'number' },
    ],
  },
  {
    id: 5, title: 'Preferências de Atendimento', description: 'Como você prefere ser atendida?',
    fields: [
      { name: 'modality', label: 'Modalidade', type: 'select', required: true, options: ['Presencial', 'Teleconsulta', 'Sem preferência'] },
      { name: 'period', label: 'Período preferido', type: 'select', options: ['Manhã', 'Tarde', 'Noite', 'Sem preferência'] },
      { name: 'urgency', label: 'Urgência', type: 'select', options: ['Urgente (próximos 2 dias)', 'Em breve (próxima semana)', 'Sem pressa (próximo mês)'] },
    ],
  },
  {
    id: 6, title: 'Convênio e Pagamento', description: 'Informações sobre plano de saúde',
    fields: [
      { name: 'hasInsurance', label: 'Possui convênio?', type: 'select', options: ['Sim', 'Não - Particular'] },
      { name: 'insuranceProvider', label: 'Operadora', type: 'select', options: ['Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil', 'NotreDame', 'Outro'] },
      { name: 'insuranceNumber', label: 'Número da carteirinha', type: 'text' },
    ],
  },
  {
    id: 7, title: 'Confirmação', description: 'Revise suas informações antes de prosseguir',
    fields: [], isReview: true,
  },
];

export const mockPatients = [
  { id: '1', name: 'Maria Silva Santos', email: 'maria@email.com', phone: '(11) 98765-4321', status: 'active' as const, lastVisit: '2026-02-10', nextAppointment: '2026-02-20 10:00' },
  { id: '2', name: 'Juliana Costa Oliveira', email: 'juliana@email.com', phone: '(11) 97654-3210', status: 'active' as const, lastVisit: '2026-02-08', nextAppointment: '2026-02-19 14:00' },
  { id: '3', name: 'Fernanda Lima Pereira', email: 'fernanda@email.com', phone: '(21) 99876-5432', status: 'pending' as const, lastVisit: '', nextAppointment: '2026-02-21 09:00' },
  { id: '4', name: 'Camila Rodrigues Alves', email: 'camila@email.com', phone: '(11) 96543-2109', status: 'active' as const, lastVisit: '2026-01-25', nextAppointment: '' },
  { id: '5', name: 'Beatriz Martins Souza', email: 'beatriz@email.com', phone: '(21) 98765-1234', status: 'active' as const, lastVisit: '2026-02-12', nextAppointment: '2026-02-22 11:00' },
  { id: '6', name: 'Amanda Ferreira Costa', email: 'amanda@email.com', phone: '(11) 95432-1098', status: 'inactive' as const, lastVisit: '2025-12-15', nextAppointment: '' },
  { id: '7', name: 'Larissa Santos Lima', email: 'larissa@email.com', phone: '(31) 99123-4567', status: 'active' as const, lastVisit: '2026-02-14', nextAppointment: '2026-02-25 15:00' },
  { id: '8', name: 'Gabriela Almeida Nunes', email: 'gabriela@email.com', phone: '(21) 97890-1234', status: 'pending' as const, lastVisit: '', nextAppointment: '2026-02-18 16:00' },
];

export const mockAppointments = [
  { id: '1', patientName: 'Maria Silva Santos', professionalName: 'Dra. Ana Beatriz Souza', date: '2026-02-18', time: '10:00', status: 'confirmed' as const, type: 'Consulta', modality: 'Presencial', price: 350 },
  { id: '2', patientName: 'Juliana Costa Oliveira', professionalName: 'Dra. Ana Beatriz Souza', date: '2026-02-18', time: '11:00', status: 'confirmed' as const, type: 'Retorno', modality: 'Teleconsulta', price: 250 },
  { id: '3', patientName: 'Fernanda Lima Pereira', professionalName: 'Dr. Ricardo Mendes', date: '2026-02-19', time: '09:00', status: 'pending' as const, type: 'Consulta', modality: 'Presencial', price: 400 },
  { id: '4', patientName: 'Beatriz Martins Souza', professionalName: 'Dra. Carla Pinheiro', date: '2026-02-19', time: '14:00', status: 'confirmed' as const, type: 'Exame', modality: 'Presencial', price: 300 },
  { id: '5', patientName: 'Larissa Santos Lima', professionalName: 'Dra. Ana Beatriz Souza', date: '2026-02-20', time: '10:00', status: 'pending' as const, type: 'Consulta', modality: 'Teleconsulta', price: 350 },
  { id: '6', patientName: 'Gabriela Almeida Nunes', professionalName: 'Dr. Paulo Vieira', date: '2026-02-20', time: '15:00', status: 'cancelled' as const, type: 'Consulta', modality: 'Presencial', price: 450 },
];

export const mockDashboardStats = {
  professional: { todayAppointments: 6, weekAppointments: 28, monthRevenue: 18500, totalPatients: 142, rating: 4.9, pendingReviews: 3, occupancyRate: 78 },
  admin: { totalProfessionals: 24, totalPatients: 1847, monthRevenue: 285000, monthAppointments: 892, pendingApprovals: 5, cancelationRate: 4.2, nps: 87, platformFee: 28500 },
};

// ──────────────────────────────────────────────────────────────
// Histórico de Consultas — Dados completos (visão paciente)
// ──────────────────────────────────────────────────────────────

export interface ConsultationPrescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  active: boolean;
}

export interface ConsultationAttachment {
  id: string;
  name: string;
  type: 'exam' | 'prescription' | 'receipt' | 'report' | 'image';
  date: string;
  size: string;
}

export interface ConsultationNotes {
  summary: string;
  diagnoses: string[];
  recommendations: string;
}

export interface ConsultationFollowUp {
  recommended: boolean;
  suggestedDate?: string;
  reason?: string;
  booked?: boolean;
}

export interface ConsultationRecord {
  id: string;
  professionalName: string;
  professionalInitials: string;
  specialty: string;
  crm: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'no_show';
  type: 'Consulta' | 'Retorno' | 'Exame' | 'Procedimento';
  modality: 'Presencial' | 'Teleconsulta';
  price: number;
  protocol: string;
  location?: string;
  rating?: number;
  reviewText?: string;
  notes?: ConsultationNotes;
  prescriptions?: ConsultationPrescription[];
  attachments?: ConsultationAttachment[];
  followUp?: ConsultationFollowUp;
  paymentMethod?: string;
  insuranceCovered?: boolean;
  insuranceName?: string;
}

export const mockConsultationHistory: ConsultationRecord[] = [
  // ── Próximas ──
  {
    id: 'c-001', professionalName: 'Dra. Ana Beatriz Souza', professionalInitials: 'AB',
    specialty: 'Ginecologia', crm: 'CRM/SP 123456',
    date: '2026-03-20', time: '10:00', duration: 40, status: 'confirmed',
    type: 'Consulta', modality: 'Presencial', price: 350,
    protocol: '#LC-2026-00847', location: 'Clínica Colibri - Av. Paulista, 1000 - Cj 1201',
    paymentMethod: 'Convênio', insuranceCovered: true, insuranceName: 'Unimed',
  },
  {
    id: 'c-002', professionalName: 'Dra. Carla Pinheiro', professionalInitials: 'CP',
    specialty: 'Mastologia', crm: 'CRM/RJ 345678',
    date: '2026-03-25', time: '14:00', duration: 30, status: 'pending',
    type: 'Exame', modality: 'Presencial', price: 300,
    protocol: '#LC-2026-00852', location: 'Clínica Colibri - Av. Paulista, 1000 - Cj 1201',
    paymentMethod: 'Cartão de Crédito', insuranceCovered: false,
  },
  {
    id: 'c-003', professionalName: 'Dra. Luciana Ferreira', professionalInitials: 'LF',
    specialty: 'Obstetrícia', crm: 'CRM/MG 567890',
    date: '2026-04-05', time: '09:00', duration: 50, status: 'confirmed',
    type: 'Consulta', modality: 'Presencial', price: 280,
    protocol: '#LC-2026-00901', location: 'Clínica Colibri - Rua Haddock Lobo, 585',
    paymentMethod: 'Convênio', insuranceCovered: true, insuranceName: 'Bradesco Saúde',
  },

  // ── Realizadas — Março 2026 ──
  {
    id: 'c-004', professionalName: 'Dra. Ana Beatriz Souza', professionalInitials: 'AB',
    specialty: 'Ginecologia', crm: 'CRM/SP 123456',
    date: '2026-03-10', time: '10:00', duration: 45, status: 'completed',
    type: 'Consulta', modality: 'Presencial', price: 350,
    protocol: '#LC-2026-00801', location: 'Clínica Colibri - Av. Paulista, 1000',
    rating: 5, reviewText: 'Excelente atendimento, muito atenciosa e explicou tudo com clareza.',
    paymentMethod: 'Convênio', insuranceCovered: true, insuranceName: 'Unimed',
    notes: {
      summary: 'Paciente realizou consulta de rotina ginecológica. Exame clínico sem alterações. Solicitados exames laboratoriais de rotina (hemograma, TSH, glicemia, colesterol). Orientações sobre prevenção e estilo de vida.',
      diagnoses: ['Check-up ginecológico anual', 'Sem alterações clínicas'],
      recommendations: 'Manter atividade física regular. Retorno após resultado dos exames em 30 dias. Manter suplementação de vitamina D.',
    },
    prescriptions: [
      { id: 'rx-001', medication: 'Vitamina D 2000UI', dosage: '1 comprimido', frequency: '1x ao dia', duration: '90 dias', active: true },
      { id: 'rx-002', medication: 'Ácido Fólico 5mg', dosage: '1 comprimido', frequency: '1x ao dia', duration: '90 dias', active: true },
    ],
    attachments: [
      { id: 'att-001', name: 'Pedido de Exames Laboratoriais', type: 'exam', date: '2026-03-10', size: '245 KB' },
      { id: 'att-002', name: 'Receita Digital', type: 'prescription', date: '2026-03-10', size: '180 KB' },
      { id: 'att-003', name: 'Recibo de Consulta', type: 'receipt', date: '2026-03-10', size: '95 KB' },
    ],
    followUp: { recommended: true, suggestedDate: '2026-04-10', reason: 'Retorno com resultados de exames', booked: false },
  },

  // ── Realizadas — Fevereiro 2026 ──
  {
    id: 'c-005', professionalName: 'Dr. Ricardo Mendes', professionalInitials: 'RM',
    specialty: 'Reprodução Assistida', crm: 'CRM/SP 234567',
    date: '2026-02-28', time: '09:00', duration: 60, status: 'completed',
    type: 'Consulta', modality: 'Teleconsulta', price: 500,
    protocol: '#LC-2026-00756',
    rating: 5, reviewText: 'Profissional extremamente competente. Explicou todas as opções com paciência.',
    paymentMethod: 'PIX', insuranceCovered: false,
    notes: {
      summary: 'Primeira consulta para avaliação de fertilidade. Anamnese detalhada, histórico reprodutivo e familiar avaliados. Plano de investigação inicial definido com exames hormonais e ultrassonografia.',
      diagnoses: ['Investigação de infertilidade primária'],
      recommendations: 'Realizar exames hormonais (FSH, LH, estradiol, AMH, prolactina) no 3º dia do ciclo. Ultrassom transvaginal para contagem de folículos antrais. Espermograma do parceiro.',
    },
    prescriptions: [
      { id: 'rx-003', medication: 'Ácido Fólico 5mg', dosage: '1 comprimido', frequency: '1x ao dia', duration: '180 dias', active: true },
    ],
    attachments: [
      { id: 'att-004', name: 'Pedido de Exames Hormonais', type: 'exam', date: '2026-02-28', size: '312 KB' },
      { id: 'att-005', name: 'Pedido de Ultrassom Transvaginal', type: 'exam', date: '2026-02-28', size: '198 KB' },
      { id: 'att-006', name: 'Relatório da Teleconsulta', type: 'report', date: '2026-02-28', size: '420 KB' },
    ],
    followUp: { recommended: true, suggestedDate: '2026-03-28', reason: 'Avaliação dos resultados dos exames de fertilidade', booked: true },
  },
  {
    id: 'c-006', professionalName: 'Dra. Carla Pinheiro', professionalInitials: 'CP',
    specialty: 'Mastologia', crm: 'CRM/RJ 345678',
    date: '2026-02-15', time: '15:00', duration: 30, status: 'completed',
    type: 'Exame', modality: 'Presencial', price: 300,
    protocol: '#LC-2026-00712', location: 'Clínica Colibri - Av. Paulista, 1000',
    rating: 4,
    paymentMethod: 'Convênio', insuranceCovered: true, insuranceName: 'SulAmérica',
    notes: {
      summary: 'Mamografia bilateral realizada. Resultado BIRADS 2 - achados benignos. Nódulo fibroadenoma estável comparando com exame anterior. Sem necessidade de intervenção.',
      diagnoses: ['Fibroadenoma mamário estável', 'BIRADS 2'],
      recommendations: 'Manter acompanhamento anual com mamografia. Autoexame mensal. Retorno em 12 meses.',
    },
    attachments: [
      { id: 'att-007', name: 'Laudo Mamografia Bilateral', type: 'report', date: '2026-02-15', size: '1.2 MB' },
      { id: 'att-008', name: 'Imagens Mamografia', type: 'image', date: '2026-02-15', size: '8.5 MB' },
      { id: 'att-009', name: 'Recibo de Exame', type: 'receipt', date: '2026-02-15', size: '88 KB' },
    ],
    followUp: { recommended: true, suggestedDate: '2027-02-15', reason: 'Mamografia anual de controle', booked: false },
  },
  {
    id: 'c-007', professionalName: 'Dra. Ana Beatriz Souza', professionalInitials: 'AB',
    specialty: 'Ginecologia', crm: 'CRM/SP 123456',
    date: '2026-02-05', time: '11:00', duration: 25, status: 'completed',
    type: 'Retorno', modality: 'Teleconsulta', price: 200,
    protocol: '#LC-2026-00689',
    rating: 5,
    paymentMethod: 'Convênio', insuranceCovered: true, insuranceName: 'Unimed',
    notes: {
      summary: 'Retorno para avaliação de resultados de exames do check-up anterior. Hemograma normal. TSH levemente elevado (4.8). Vitamina D insuficiente (22 ng/mL). Demais exames dentro da normalidade.',
      diagnoses: ['Hipovitaminose D', 'TSH limítrofe - monitorar'],
      recommendations: 'Aumentar dose de Vitamina D para 4000UI/dia por 60 dias. Repetir TSH em 90 dias. Exposição solar moderada recomendada.',
    },
    prescriptions: [
      { id: 'rx-004', medication: 'Vitamina D 4000UI', dosage: '1 comprimido', frequency: '1x ao dia', duration: '60 dias', active: true },
    ],
    attachments: [
      { id: 'att-010', name: 'Receita Atualizada', type: 'prescription', date: '2026-02-05', size: '156 KB' },
    ],
    followUp: { recommended: true, suggestedDate: '2026-05-05', reason: 'Controle de TSH e vitamina D', booked: false },
  },

  // ── Realizadas — Janeiro 2026 ──
  {
    id: 'c-008', professionalName: 'Dr. Paulo Vieira', professionalInitials: 'PV',
    specialty: 'Endocrinologia Ginecológica', crm: 'CRM/SP 456789',
    date: '2026-01-18', time: '14:00', duration: 50, status: 'completed',
    type: 'Consulta', modality: 'Presencial', price: 400,
    protocol: '#LC-2026-00623', location: 'Clínica Colibri - Av. Paulista, 1000',
    rating: 4, reviewText: 'Muito bom profissional, detalhista nas explicações sobre os hormônios.',
    paymentMethod: 'Cartão de Crédito', insuranceCovered: false,
    notes: {
      summary: 'Avaliação endocrinológica por irregularidade menstrual. Exame físico: IMC 23.5, PA 120/80. Solicitar painel hormonal completo e ultrassom pélvico. Investigar possível SOP.',
      diagnoses: ['Irregularidade menstrual em investigação', 'SOP a esclarecer'],
      recommendations: 'Realizar exames hormonais (testosterona, DHEA-S, insulina basal, SHBG). Ultrassom pélvico transvaginal. Dieta anti-inflamatória e exercícios regulares.',
    },
    attachments: [
      { id: 'att-011', name: 'Pedido de Painel Hormonal', type: 'exam', date: '2026-01-18', size: '278 KB' },
      { id: 'att-012', name: 'Pedido de Ultrassom Pélvico', type: 'exam', date: '2026-01-18', size: '190 KB' },
    ],
    followUp: { recommended: true, suggestedDate: '2026-02-18', reason: 'Avaliação dos resultados e definição de conduta', booked: true },
  },
  {
    id: 'c-009', professionalName: 'Dra. Luciana Ferreira', professionalInitials: 'LF',
    specialty: 'Obstetrícia', crm: 'CRM/MG 567890',
    date: '2026-01-08', time: '10:00', duration: 40, status: 'completed',
    type: 'Consulta', modality: 'Presencial', price: 280,
    protocol: '#LC-2026-00578', location: 'Clínica Colibri - Rua Haddock Lobo, 585',
    rating: 5, reviewText: 'Dra. Luciana é maravilhosa! Muito carinhosa e profissional.',
    paymentMethod: 'Convênio', insuranceCovered: true, insuranceName: 'Bradesco Saúde',
    notes: {
      summary: 'Consulta pré-concepcional. Orientações sobre planejamento familiar, suplementação pré-natal e hábitos saudáveis. Solicitados sorologias e exames de rotina pré-gestação.',
      diagnoses: ['Consulta pré-concepcional', 'Paciente saudável'],
      recommendations: 'Iniciar suplementação com ácido fólico 3 meses antes da concepção. Atualizar vacinas (rubéola, hepatite B). Avaliação odontológica.',
    },
    prescriptions: [
      { id: 'rx-005', medication: 'Ácido Fólico 5mg', dosage: '1 comprimido', frequency: '1x ao dia', duration: '90 dias', active: false },
      { id: 'rx-006', medication: 'Sulfato Ferroso 40mg', dosage: '1 comprimido', frequency: '1x ao dia', duration: '60 dias', active: false },
    ],
    attachments: [
      { id: 'att-013', name: 'Pedido de Sorologias', type: 'exam', date: '2026-01-08', size: '210 KB' },
      { id: 'att-014', name: 'Receita Pré-Natal', type: 'prescription', date: '2026-01-08', size: '165 KB' },
    ],
    followUp: { recommended: true, suggestedDate: '2026-04-08', reason: 'Acompanhamento pré-concepcional', booked: false },
  },

  // ── Realizadas — Dezembro 2025 ──
  {
    id: 'c-010', professionalName: 'Dra. Ana Beatriz Souza', professionalInitials: 'AB',
    specialty: 'Ginecologia', crm: 'CRM/SP 123456',
    date: '2025-12-03', time: '10:30', duration: 40, status: 'completed',
    type: 'Consulta', modality: 'Presencial', price: 350,
    protocol: '#LC-2025-04892', location: 'Clínica Colibri - Av. Paulista, 1000',
    rating: 5,
    paymentMethod: 'Convênio', insuranceCovered: true, insuranceName: 'Unimed',
    notes: {
      summary: 'Check-up ginecológico semestral. Papanicolau coletado. Exame de mamas sem alterações. Orientações sobre saúde íntima e prevenção de ISTs.',
      diagnoses: ['Check-up ginecológico semestral', 'Papanicolau coletado'],
      recommendations: 'Aguardar resultado do Papanicolau (15 dias). Manter uso regular de preservativo. Retorno em 6 meses para novo check-up.',
    },
    attachments: [
      { id: 'att-015', name: 'Comprovante Papanicolau', type: 'exam', date: '2025-12-03', size: '142 KB' },
      { id: 'att-016', name: 'Recibo', type: 'receipt', date: '2025-12-03', size: '90 KB' },
    ],
    followUp: { recommended: true, suggestedDate: '2026-06-03', reason: 'Check-up ginecológico semestral', booked: false },
  },
  {
    id: 'c-011', professionalName: 'Dr. Paulo Vieira', professionalInitials: 'PV',
    specialty: 'Endocrinologia Ginecológica', crm: 'CRM/SP 456789',
    date: '2025-12-18', time: '15:00', duration: 30, status: 'completed',
    type: 'Retorno', modality: 'Teleconsulta', price: 250,
    protocol: '#LC-2025-04956',
    rating: 4,
    paymentMethod: 'PIX', insuranceCovered: false,
    notes: {
      summary: 'Retorno com resultados de exames hormonais. Perfil hormonal dentro da normalidade exceto DHEA-S levemente elevado. Sem critérios completos para SOP. Monitorar.',
      diagnoses: ['DHEA-S limítrofe', 'SOP descartada no momento'],
      recommendations: 'Manter estilo de vida saudável. Reavaliar em 6 meses com novos exames. Dieta rica em ômega-3 e antioxidantes.',
    },
    attachments: [
      { id: 'att-017', name: 'Relatório de Retorno', type: 'report', date: '2025-12-18', size: '350 KB' },
    ],
    followUp: { recommended: true, suggestedDate: '2026-06-18', reason: 'Reavaliação hormonal semestral', booked: false },
  },

  // ── Realizadas — Novembro 2025 ──
  {
    id: 'c-012', professionalName: 'Dra. Carla Pinheiro', professionalInitials: 'CP',
    specialty: 'Mastologia', crm: 'CRM/RJ 345678',
    date: '2025-11-22', time: '14:30', duration: 25, status: 'completed',
    type: 'Consulta', modality: 'Presencial', price: 300,
    protocol: '#LC-2025-04710', location: 'Clínica Colibri - Av. Paulista, 1000',
    rating: 5, reviewText: 'Ótima profissional, muito cuidadosa e acolhedora.',
    paymentMethod: 'Convênio', insuranceCovered: true, insuranceName: 'SulAmérica',
    notes: {
      summary: 'Consulta de rotina mastológica. Exame clínico das mamas sem alterações. Solicitada mamografia de screening anual.',
      diagnoses: ['Exame clínico normal', 'Screening mamográfico anual'],
      recommendations: 'Realizar mamografia bilateral. Autoexame mensal. Retorno com resultado.',
    },
    attachments: [
      { id: 'att-018', name: 'Pedido de Mamografia', type: 'exam', date: '2025-11-22', size: '175 KB' },
    ],
    followUp: { recommended: true, suggestedDate: '2026-02-15', reason: 'Retorno com resultado de mamografia', booked: true },
  },

  // ── Realizadas — Outubro 2025 ──
  {
    id: 'c-013', professionalName: 'Dra. Ana Beatriz Souza', professionalInitials: 'AB',
    specialty: 'Ginecologia', crm: 'CRM/SP 123456',
    date: '2025-10-05', time: '11:00', duration: 35, status: 'completed',
    type: 'Retorno', modality: 'Teleconsulta', price: 200,
    protocol: '#LC-2025-04321',
    rating: 5,
    paymentMethod: 'Convênio', insuranceCovered: true, insuranceName: 'Unimed',
    notes: {
      summary: 'Retorno para avaliar resultado do Papanicolau anterior: NILM (normal). Orientações gerais mantidas.',
      diagnoses: ['Papanicolau NILM - Normal'],
      recommendations: 'Próximo Papanicolau em 12 meses. Manter rotina de check-ups.',
    },
    attachments: [
      { id: 'att-019', name: 'Resultado Papanicolau', type: 'report', date: '2025-10-05', size: '230 KB' },
    ],
    followUp: { recommended: false },
  },

  // ── Realizadas — Setembro 2025 ──
  {
    id: 'c-014', professionalName: 'Dr. Ricardo Mendes', professionalInitials: 'RM',
    specialty: 'Reprodução Assistida', crm: 'CRM/SP 234567',
    date: '2025-09-15', time: '09:30', duration: 50, status: 'completed',
    type: 'Consulta', modality: 'Presencial', price: 500,
    protocol: '#LC-2025-03987', location: 'Clínica Colibri - Av. Paulista, 1000',
    rating: 5,
    paymentMethod: 'Cartão de Crédito', insuranceCovered: false,
    notes: {
      summary: 'Consulta informativa sobre opções de preservação de fertilidade. Discussão sobre criopreservação de óvulos, janela de idade e procedimentos envolvidos.',
      diagnoses: ['Consulta informativa - preservação fertilidade'],
      recommendations: 'Avaliar timing para eventual criopreservação. Agendar bateria de exames quando decidir prosseguir.',
    },
    attachments: [
      { id: 'att-020', name: 'Material Informativo Criopreservação', type: 'report', date: '2025-09-15', size: '1.8 MB' },
    ],
    followUp: { recommended: true, suggestedDate: '2026-03-15', reason: 'Decisão sobre preservação de fertilidade', booked: false },
  },

  // ── Realizadas — Agosto 2025 ──
  {
    id: 'c-015', professionalName: 'Dra. Ana Beatriz Souza', professionalInitials: 'AB',
    specialty: 'Ginecologia', crm: 'CRM/SP 123456',
    date: '2025-08-10', time: '10:00', duration: 40, status: 'completed',
    type: 'Consulta', modality: 'Presencial', price: 350,
    protocol: '#LC-2025-03520', location: 'Clínica Colibri - Av. Paulista, 1000',
    rating: 4,
    paymentMethod: 'Convênio', insuranceCovered: true, insuranceName: 'Unimed',
    notes: {
      summary: 'Consulta por queixa de cólicas menstruais intensas. Exame clínico sem alterações significativas. Solicitado ultrassom pélvico para investigação.',
      diagnoses: ['Dismenorreia em investigação'],
      recommendations: 'Realizar ultrassom pélvico. Uso de anti-inflamatório para alívio. Retorno com resultado.',
    },
    prescriptions: [
      { id: 'rx-007', medication: 'Ibuprofeno 600mg', dosage: '1 comprimido', frequency: 'A cada 8h se dor', duration: '5 dias/ciclo', active: false },
    ],
    attachments: [
      { id: 'att-021', name: 'Pedido Ultrassom Pélvico', type: 'exam', date: '2025-08-10', size: '185 KB' },
      { id: 'att-022', name: 'Receita', type: 'prescription', date: '2025-08-10', size: '120 KB' },
    ],
    followUp: { recommended: true, suggestedDate: '2025-09-10', reason: 'Retorno com resultado de ultrassom', booked: true },
  },

  // ── Canceladas ──
  {
    id: 'c-016', professionalName: 'Dra. Ana Beatriz Souza', professionalInitials: 'AB',
    specialty: 'Ginecologia', crm: 'CRM/SP 123456',
    date: '2026-03-05', time: '11:00', duration: 30, status: 'cancelled',
    type: 'Retorno', modality: 'Teleconsulta', price: 200,
    protocol: '#LC-2026-00789',
    paymentMethod: 'Convênio', insuranceCovered: true, insuranceName: 'Unimed',
  },
  {
    id: 'c-017', professionalName: 'Dr. Paulo Vieira', professionalInitials: 'PV',
    specialty: 'Endocrinologia Ginecológica', crm: 'CRM/SP 456789',
    date: '2026-01-10', time: '14:00', duration: 40, status: 'cancelled',
    type: 'Consulta', modality: 'Presencial', price: 400,
    protocol: '#LC-2026-00589', location: 'Clínica Colibri - Av. Paulista, 1000',
    paymentMethod: 'PIX', insuranceCovered: false,
  },

  // ── No-show ──
  {
    id: 'c-018', professionalName: 'Dr. Ricardo Mendes', professionalInitials: 'RM',
    specialty: 'Reprodução Assistida', crm: 'CRM/SP 234567',
    date: '2025-12-10', time: '09:00', duration: 50, status: 'no_show',
    type: 'Consulta', modality: 'Presencial', price: 500,
    protocol: '#LC-2025-04880', location: 'Clínica Colibri - Av. Paulista, 1000',
    paymentMethod: 'Cartão de Crédito', insuranceCovered: false,
  },
];

export const menuItems = {
  patient: [
    { label: 'Início', icon: 'Home', path: '/patient' },
    { label: 'Nova Consulta', icon: 'Add', path: '/triagem' },
    { label: 'Minhas Consultas', icon: 'CalendarMonth', path: '/minhas-consultas' },
    { label: 'Meu Perfil', icon: 'Person', path: '/perfil' },
  ],
  professional: [
    { label: 'Dashboard', icon: 'Dashboard', path: '/profissional' },
    { label: 'Agenda', icon: 'CalendarMonth', path: '/profissional/agenda' },
    { label: 'Pacientes', icon: 'People', path: '/profissional/pacientes' },
    { label: 'Prontuários', icon: 'Description', path: '/profissional/prontuarios' },
    { label: 'Financeiro', icon: 'AttachMoney', path: '/profissional/financeiro' },
    { label: 'Perfil', icon: 'Person', path: '/profissional/perfil' },
  ],
  admin: [
    { label: 'Dashboard', icon: 'Dashboard', path: '/admin' },
    { label: 'Profissionais', icon: 'MedicalServices', path: '/admin/profissionais' },
    { label: 'Pacientes', icon: 'People', path: '/admin/pacientes' },
    { label: 'Consultas', icon: 'CalendarMonth', path: '/admin/consultas' },
    { label: 'Financeiro', icon: 'AttachMoney', path: '/admin/financeiro' },
    { label: 'Aprovações', icon: 'VerifiedUser', path: '/admin/aprovacoes' },
    { label: 'Relatórios', icon: 'Assessment', path: '/admin/relatorios' },
    { label: 'Gestão de Acessos', icon: 'ManageAccounts', path: '/admin/acessos' },
    { label: 'Configurações', icon: 'Settings', path: '/admin/configuracoes' },
  ],
};
