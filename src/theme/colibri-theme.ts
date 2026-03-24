import { createTheme, ThemeOptions } from '@mui/material/styles';

export const tokens = {
  colors: {
    primary: { main: '#000000', soft: '#F1F5F9', strong: '#000000', contrastText: '#FFFFFF' },
    accent: { main: '#18C964', soft: '#E6FDF1', contrastText: '#FFFFFF' },
    text: { primary: '#0F172A', secondary: '#64748B', inverse: '#FFFFFF', disabled: 'rgba(0,0,0,0.38)' },
    surface: { primary: '#F5F3FF', secondary: '#FFFFFF', elevated: '#FFFFFF', subtle: '#F9FAFB' },
    border: { default: '#E2E8F0', soft: '#EEF2FF' },
    status: { success: '#16A34A', warning: '#F59E0B', error: '#DC2626', info: '#2563EB' },
    gradient: { brand: 'linear-gradient(135deg, #9A1BFF 0%, #7B1CE5 40%, #4F46E5 100%)' },
  },
  colorsDark: {
    primary: { main: '#F9FAFB', soft: '#111827', strong: '#FFFFFF', contrastText: '#020617' },
    accent: { main: '#22C55E', soft: '#052E16', contrastText: '#FFFFFF' },
    text: { primary: '#F9FAFB', secondary: '#CBD5F5', inverse: '#020617', disabled: 'rgba(255,255,255,0.38)' },
    surface: { primary: '#020617', secondary: '#020617', elevated: '#0B1120', subtle: '#020617' },
    border: { default: '#1E293B', soft: '#1E293B' },
    gradient: { brand: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 40%, #22C55E 100%)' },
  },
  typography: {
    fontFamily: { sans: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif", mono: "'JetBrains Mono', 'Fira Code', monospace" },
    fontSize: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem' },
    fontWeight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  },
  radius: { xs: '6px', sm: '8px', md: '12px', lg: '20px', pill: '999px' },
  shadows: {
    none: 'none',
    soft: '0 10px 25px rgba(15,23,42,0.06)',
    hover: '0 18px 45px rgba(15,23,42,0.10)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
    xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
  },
  animation: {
    duration: { fast: '150ms', normal: '250ms', slow: '400ms' },
    easing: { default: 'cubic-bezier(0.4, 0, 0.2, 1)', easeIn: 'cubic-bezier(0.4, 0, 1, 1)', easeOut: 'cubic-bezier(0, 0, 0.2, 1)' },
  },
} as const;

const sharedThemeOptions: Partial<ThemeOptions> = {
  typography: {
    fontFamily: tokens.typography.fontFamily.sans,
    h1: { fontSize: tokens.typography.fontSize['4xl'], fontWeight: tokens.typography.fontWeight.bold, lineHeight: 1.2 },
    h2: { fontSize: tokens.typography.fontSize['3xl'], fontWeight: tokens.typography.fontWeight.bold, lineHeight: 1.25 },
    h3: { fontSize: tokens.typography.fontSize['2xl'], fontWeight: tokens.typography.fontWeight.semibold, lineHeight: 1.3 },
    h4: { fontSize: tokens.typography.fontSize.xl, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: 1.35 },
    h5: { fontSize: tokens.typography.fontSize.lg, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: 1.4 },
    h6: { fontSize: tokens.typography.fontSize.base, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: 1.5 },
    body1: { fontSize: tokens.typography.fontSize.base, fontWeight: tokens.typography.fontWeight.regular, lineHeight: 1.5 },
    body2: { fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: 1.5 },
    caption: { fontSize: tokens.typography.fontSize.xs, fontWeight: tokens.typography.fontWeight.regular, lineHeight: 1.4 },
    overline: { fontSize: tokens.typography.fontSize.xs, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: 1.6, textTransform: 'uppercase', letterSpacing: '0.08em' },
    button: { fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: 1.75, textTransform: 'none' },
  },
  shape: { borderRadius: 20 },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { scrollbarWidth: 'thin' } } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: tokens.radius.pill, textTransform: 'none', fontWeight: tokens.typography.fontWeight.semibold, transition: `all ${tokens.animation.duration.normal} ${tokens.animation.easing.default}` },
        sizeSmall: { height: 32, padding: '4px 12px', fontSize: tokens.typography.fontSize.xs },
        sizeMedium: { height: 40, padding: '8px 16px', fontSize: tokens.typography.fontSize.sm },
        sizeLarge: { height: 48, padding: '12px 24px', fontSize: tokens.typography.fontSize.base },
        containedPrimary: { '&:hover': { boxShadow: tokens.shadows.hover } },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', fullWidth: true },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': { borderRadius: tokens.radius.lg, height: 40, '& fieldset': { transition: `border-color ${tokens.animation.duration.fast} ${tokens.animation.easing.default}` }, '&:hover fieldset': { borderWidth: '1px' }, '&.Mui-focused fieldset': { borderWidth: '2px' } },
          '& .MuiInputBase-inputMultiline': { height: 'auto' },
          '& .MuiOutlinedInput-root.MuiInputBase-multiline': { height: 'auto' },
        },
      },
    },
    MuiSelect: { styleOverrides: { root: { borderRadius: tokens.radius.lg } } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: tokens.radius.lg } } },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { borderRadius: tokens.radius.lg, boxShadow: tokens.shadows.soft, transition: `box-shadow ${tokens.animation.duration.normal} ${tokens.animation.easing.default}`, '&:hover': { boxShadow: tokens.shadows.hover } } },
    },
    MuiChip: { styleOverrides: { root: { borderRadius: tokens.radius.pill, fontWeight: tokens.typography.fontWeight.medium } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: tokens.radius.lg } } },
    MuiTooltip: { styleOverrides: { tooltip: { borderRadius: tokens.radius.sm, padding: '8px 12px', fontSize: tokens.typography.fontSize.xs } } },
    MuiPaper: { defaultProps: { elevation: 0 }, styleOverrides: { root: { borderRadius: tokens.radius.lg } } },
    MuiAppBar: { defaultProps: { elevation: 0, color: 'default' } },
    MuiTableContainer: { styleOverrides: { root: { borderRadius: tokens.radius.lg } } },
    MuiTableHead: { styleOverrides: { root: { '& .MuiTableCell-head': { fontWeight: tokens.typography.fontWeight.semibold, fontSize: tokens.typography.fontSize.sm } } } },
    MuiTab: { styleOverrides: { root: { textTransform: 'none', fontWeight: tokens.typography.fontWeight.medium, fontSize: tokens.typography.fontSize.sm } } },
    MuiAlert: { styleOverrides: { root: { borderRadius: tokens.radius.md } } },
    MuiPagination: { defaultProps: { shape: 'rounded', color: 'primary' } },
    MuiSkeleton: { styleOverrides: { root: { borderRadius: tokens.radius.sm } } },
  },
};

const lightPalette: ThemeOptions['palette'] = {
  mode: 'light',
  primary: { main: tokens.colors.primary.main, light: tokens.colors.primary.soft, dark: tokens.colors.primary.strong, contrastText: tokens.colors.primary.contrastText },
  secondary: { main: tokens.colors.accent.main, light: tokens.colors.accent.soft, contrastText: tokens.colors.accent.contrastText },
  success: { main: tokens.colors.status.success },
  warning: { main: tokens.colors.status.warning },
  error: { main: tokens.colors.status.error },
  info: { main: tokens.colors.status.info },
  text: { primary: tokens.colors.text.primary, secondary: tokens.colors.text.secondary, disabled: tokens.colors.text.disabled },
  background: { default: tokens.colors.surface.primary, paper: tokens.colors.surface.elevated },
  divider: tokens.colors.border.default,
};

export function createColibriTheme(mode: 'light' | 'dark' = 'light') {
  return createTheme({ ...sharedThemeOptions, palette: mode === 'light' ? lightPalette : lightPalette });
}

export const colibriTheme = createColibriTheme('light');
export const customTokens = { shadows: tokens.shadows, radius: tokens.radius, animation: tokens.animation } as const;
