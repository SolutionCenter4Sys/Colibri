import { useState, useMemo, useCallback, useEffect } from 'react';
import { mockConsultationHistory, ConsultationRecord } from '../mock/data';
import { usePageState } from './usePageState';

export type TabKey = 'upcoming' | 'history' | 'cancelled';
export type DateRangeFilter = 'all' | '30d' | '3m' | '6m' | '12m';

export interface ConsultationGroup {
  label: string;
  key: string;
  items: ConsultationRecord[];
}

export interface ConsultationStats {
  totalCompleted: number;
  totalUpcoming: number;
  totalCancelled: number;
  totalSpent: number;
  avgRating: number;
  ratedCount: number;
  activePrescriptions: number;
  pendingFollowUps: number;
  mostVisitedSpecialty: string;
  mostVisitedDoctor: string;
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

function formatMonthGroup(dateStr: string): { label: string; key: string } {
  const d = new Date(dateStr + 'T00:00:00');
  const month = MONTH_NAMES[d.getMonth()];
  const year = d.getFullYear();
  const now = new Date();
  const isCurrentMonth = d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();

  return {
    label: isCurrentMonth ? `${month} ${year} (Este mês)` : `${month} ${year}`,
    key: `${year}-${String(d.getMonth() + 1).padStart(2, '0')}`,
  };
}

function isWithinDateRange(dateStr: string, range: DateRangeFilter): boolean {
  if (range === 'all') return true;
  const d = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  switch (range) {
    case '30d': return diffDays <= 30;
    case '3m': return diffDays <= 90;
    case '6m': return diffDays <= 180;
    case '12m': return diffDays <= 365;
    default: return true;
  }
}

function getMostFrequent(items: string[]): string {
  if (items.length === 0) return '—';
  const counts: Record<string, number> = {};
  items.forEach((item) => { counts[item] = (counts[item] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

export function useMinhasConsultas() {
  const [activeTab, setActiveTab] = useState<TabKey>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');
  const [dateRangeFilter, setDateRangeFilter] = useState<DateRangeFilter>('all');
  const [modalityFilter, setModalityFilter] = useState<string>('all');
  const [cancelDialogId, setCancelDialogId] = useState<string | null>(null);
  const [detailDialogId, setDetailDialogId] = useState<string | null>(null);
  const [ratingDialogId, setRatingDialogId] = useState<string | null>(null);
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [ratingText, setRatingText] = useState('');
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const pageState = usePageState<ConsultationRecord[]>(null, async () => {
    await new Promise((r) => setTimeout(r, 600));
    return mockConsultationHistory;
  });

  useEffect(() => {
    pageState.retry();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const allConsultations = pageState.data ?? [];

  const upcoming = useMemo(
    () => allConsultations
      .filter((c) => c.status === 'confirmed' || c.status === 'pending')
      .sort((a, b) => a.date.localeCompare(b.date)),
    [allConsultations],
  );

  const completed = useMemo(
    () => allConsultations
      .filter((c) => c.status === 'completed')
      .sort((a, b) => b.date.localeCompare(a.date)),
    [allConsultations],
  );

  const cancelled = useMemo(
    () => allConsultations
      .filter((c) => c.status === 'cancelled' || c.status === 'no_show')
      .sort((a, b) => b.date.localeCompare(a.date)),
    [allConsultations],
  );

  const specialties = useMemo(() => {
    const set = new Set(allConsultations.map((c) => c.specialty));
    return Array.from(set).sort();
  }, [allConsultations]);

  const currentList = useMemo(() => {
    switch (activeTab) {
      case 'upcoming': return upcoming;
      case 'history': return completed;
      case 'cancelled': return cancelled;
    }
  }, [activeTab, upcoming, completed, cancelled]);

  const filteredList = useMemo(() => {
    let list = currentList;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.professionalName.toLowerCase().includes(q) ||
          c.specialty.toLowerCase().includes(q) ||
          c.protocol.toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q),
      );
    }

    if (specialtyFilter !== 'all') {
      list = list.filter((c) => c.specialty === specialtyFilter);
    }

    if (dateRangeFilter !== 'all' && activeTab === 'history') {
      list = list.filter((c) => isWithinDateRange(c.date, dateRangeFilter));
    }

    if (modalityFilter !== 'all') {
      list = list.filter((c) => c.modality === modalityFilter);
    }

    return list;
  }, [currentList, searchQuery, specialtyFilter, dateRangeFilter, modalityFilter, activeTab]);

  const groupedByMonth = useMemo((): ConsultationGroup[] => {
    const groups: Record<string, { label: string; items: ConsultationRecord[] }> = {};

    filteredList.forEach((c) => {
      const { label, key } = formatMonthGroup(c.date);
      if (!groups[key]) {
        groups[key] = { label, items: [] };
      }
      groups[key].items.push(c);
    });

    return Object.entries(groups)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([key, val]) => ({ key, label: val.label, items: val.items }));
  }, [filteredList]);

  const stats = useMemo((): ConsultationStats => {
    const completedAll = allConsultations.filter((c) => c.status === 'completed');
    const ratings = completedAll.filter((c) => c.rating != null).map((c) => c.rating!);
    const activePrescriptions = completedAll.flatMap((c) => c.prescriptions ?? []).filter((p) => p.active);
    const pendingFollowUps = completedAll.filter((c) => c.followUp?.recommended && !c.followUp.booked);

    return {
      totalCompleted: completedAll.length,
      totalUpcoming: upcoming.length,
      totalCancelled: cancelled.length,
      totalSpent: completedAll.reduce((sum, c) => sum + c.price, 0),
      avgRating: ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0,
      ratedCount: ratings.length,
      activePrescriptions: activePrescriptions.length,
      pendingFollowUps: pendingFollowUps.length,
      mostVisitedSpecialty: getMostFrequent(completedAll.map((c) => c.specialty)),
      mostVisitedDoctor: getMostFrequent(completedAll.map((c) => c.professionalName)),
    };
  }, [allConsultations, upcoming, cancelled]);

  const selectedDetail = useMemo(
    () => allConsultations.find((c) => c.id === detailDialogId) ?? null,
    [allConsultations, detailDialogId],
  );

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSpecialtyFilter('all');
    setDateRangeFilter('all');
    setModalityFilter('all');
  }, []);

  const hasActiveFilters = searchQuery.trim() !== '' || specialtyFilter !== 'all' || dateRangeFilter !== 'all' || modalityFilter !== 'all';

  const openRatingDialog = useCallback((id: string) => {
    const c = allConsultations.find((item) => item.id === id);
    setRatingDialogId(id);
    setRatingValue(c?.rating ?? null);
    setRatingText(c?.reviewText ?? '');
  }, [allConsultations]);

  const submitRating = useCallback(() => {
    setRatingDialogId(null);
    setRatingValue(null);
    setRatingText('');
  }, []);

  return {
    pageState,
    activeTab, setActiveTab,
    searchQuery, setSearchQuery,
    specialtyFilter, setSpecialtyFilter,
    dateRangeFilter, setDateRangeFilter,
    modalityFilter, setModalityFilter,
    filtersExpanded, setFiltersExpanded,
    cancelDialogId, setCancelDialogId,
    detailDialogId, setDetailDialogId,
    ratingDialogId, openRatingDialog, submitRating,
    ratingValue, setRatingValue,
    ratingText, setRatingText,
    upcoming, completed, cancelled,
    filteredList, groupedByMonth,
    specialties, stats, selectedDetail,
    clearFilters, hasActiveFilters,
  };
}
