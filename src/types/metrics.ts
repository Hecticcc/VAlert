import { LayoutShiftEntry } from './performance';

export interface PerformanceMetrics {
  timeToFirstByte: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
  layoutShifts?: LayoutShiftEntry[];
}