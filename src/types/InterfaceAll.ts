import { PaginationMeta } from "./api.types";
import { DashboardAnalytics } from "./analytics.types";
import { StatTone } from "@/components/shared/StatCard";

export interface StatCardProps {
  label: string;
  tone?: StatTone;
  subtext?: string;
  badgeText?: string;
  icon: React.ReactNode;
  value: string | number;
}

export interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export interface PageHeaderProps {
  title: string;
  backHref?: string;
  backLabel?: string;
  description?: string;
  actions?: React.ReactNode;
}

export interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  description?: string;
  maxWidthClass?: string;
  children: React.ReactNode;
}

export interface LoadingSkeletonProps {
  rows?: number;
  columns?: number;
  variant?: "table" | "stat-grid" | "chart" | "detail";
}

export interface FormFieldProps {
  label: string;
  error?: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}

export interface SelectFilterConfig {
  id: string;
  label: string;
  value: string;
  options: Array<{ label: string; value: string }>;
  onChange: (value: string) => void;
}

export interface FilterBarProps {
  search?: string;
  endDate?: string;
  startDate?: string;
  onReset?: () => void;
  searchPlaceholder?: string;
  hasActiveFilters?: boolean;
  selectFilters?: SelectFilterConfig[];
  onSearchChange?: (value: string) => void;
  onEndDateChange?: (value: string) => void;
  onStartDateChange?: (value: string) => void;
}

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export interface TableColumn<T> {
  key: string;
  header: string;
  className?: string;
  render: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  isError?: boolean;
  isLoading?: boolean;
  emptyTitle?: string;
  isFetching?: boolean;
  onRetry?: () => void;
  meta?: PaginationMeta;
  columns: TableColumn<T>[];
  emptyDescription?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  rowKey: (item: T) => string;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface CustomSelectProps {
  id?: string;
  value: string;
  allLabel?: string;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  includeAllOption?: boolean;
  onChange: (value: string) => void;
}

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  isLoading?: boolean;
  onConfirm: () => void;
  confirmLabel?: string;
  tone?: "danger" | "primary";
}

export interface NavItem {
  href: string;
  label: string;
  group: "Overview" | "Management";
  icon: React.ComponentType<{ className?: string }>;
}

export interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  description?: string;
  maxWidthClass?: string;
  children: React.ReactNode;
}

export interface AnalyticsChartsProps {
  analytics: DashboardAnalytics;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface MenuCoords {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
  openUpward: boolean;
}

export interface DatePickerProps {
  id?: string;
  value: string; // YYYY-MM-DD
  className?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export interface PopoverCoords {
  top: number;
  left: number;
  openUpward: boolean;
}

export interface SelectFilterConfig {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
}

export interface RevealProps {
  delayMs?: number;
  className?: string;
  children: React.ReactNode;
}