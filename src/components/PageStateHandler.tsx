import { ReactNode } from 'react';
import {
  Box, Typography, Button, Stack, Alert, Skeleton, Paper,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import InboxIcon from '@mui/icons-material/Inbox';
import { tokens } from '../theme/colibri-theme';

interface PageStateHandlerProps {
  loading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  onRetry?: () => void;
  emptyIcon?: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  skeletonVariant?: 'cards' | 'list' | 'form' | 'dashboard';
  skeletonCount?: number;
  children: ReactNode;
}

function LoadingSkeleton({ variant = 'cards', count = 3 }: { variant?: string; count?: number }) {
  if (variant === 'dashboard') {
    return (
      <Stack spacing={3}>
        <Stack direction="row" spacing={2}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="rounded" width="25%" height={120} sx={{ borderRadius: tokens.radius.lg, flexShrink: 0 }} />
          ))}
        </Stack>
        <Skeleton variant="rounded" height={300} sx={{ borderRadius: tokens.radius.lg }} />
      </Stack>
    );
  }

  if (variant === 'list') {
    return (
      <Stack spacing={1.5}>
        {Array.from({ length: count }).map((_, i) => (
          <Paper key={i} sx={{ p: 2, border: '1px solid', borderColor: tokens.colors.border.soft, borderRadius: tokens.radius.lg }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Skeleton variant="rounded" width={60} height={70} sx={{ borderRadius: tokens.radius.md }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="40%" height={18} />
                <Skeleton variant="text" width="30%" height={16} />
              </Box>
              <Stack alignItems="flex-end" spacing={0.5}>
                <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: tokens.radius.pill }} />
                <Skeleton variant="text" width={60} height={18} />
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    );
  }

  if (variant === 'form') {
    return (
      <Stack spacing={2.5}>
        <Skeleton variant="rounded" height={56} sx={{ borderRadius: tokens.radius.lg }} />
        <Skeleton variant="rounded" height={56} sx={{ borderRadius: tokens.radius.lg }} />
        <Stack direction="row" spacing={2}>
          <Skeleton variant="rounded" height={56} sx={{ borderRadius: tokens.radius.lg, flex: 1 }} />
          <Skeleton variant="rounded" height={56} sx={{ borderRadius: tokens.radius.lg, flex: 1 }} />
        </Stack>
        <Skeleton variant="rounded" height={120} sx={{ borderRadius: tokens.radius.lg }} />
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i} sx={{ flex: '1 1 280px', maxWidth: { xs: '100%', md: '33%' } }}>
          <Skeleton variant="rounded" height={200} sx={{ borderRadius: tokens.radius.lg }} />
        </Box>
      ))}
    </Stack>
  );
}

function ErrorState({ error, onRetry }: { error: string; onRetry?: () => void }) {
  return (
    <Paper
      sx={{
        p: 4, textAlign: 'center',
        border: '1px solid', borderColor: tokens.colors.border.soft,
        borderRadius: tokens.radius.lg,
        bgcolor: tokens.colors.surface.subtle,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 56, color: 'error.main', mb: 2 }} />
      <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
        Algo deu errado
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
        {error}
      </Typography>
      {onRetry && (
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          aria-label="Tentar novamente"
        >
          Tentar Novamente
        </Button>
      )}
    </Paper>
  );
}

function EmptyState({
  icon,
  title = 'Nenhum item encontrado',
  description = 'Não há dados para exibir no momento.',
  action,
}: {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <Paper
      sx={{
        p: 5, textAlign: 'center',
        border: '1px dashed', borderColor: tokens.colors.border.default,
        borderRadius: tokens.radius.lg,
        bgcolor: tokens.colors.surface.subtle,
      }}
    >
      <Box sx={{ color: 'text.secondary', mb: 2 }}>
        {icon || <InboxIcon sx={{ fontSize: 56 }} />}
      </Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: action ? 3 : 0, maxWidth: 400, mx: 'auto' }}>
        {description}
      </Typography>
      {action}
    </Paper>
  );
}

export default function PageStateHandler({
  loading,
  error,
  isEmpty,
  onRetry,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  emptyAction,
  skeletonVariant = 'cards',
  skeletonCount = 3,
  children,
}: PageStateHandlerProps) {
  if (loading) {
    return <LoadingSkeleton variant={skeletonVariant} count={skeletonCount} />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRetry} />;
  }

  if (isEmpty) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }

  return <>{children}</>;
}

export { LoadingSkeleton, ErrorState, EmptyState };
