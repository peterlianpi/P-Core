"use client";

import { PerformanceMonitor, usePerformanceToggle } from "@/components/performance/performance-monitor";

export function PerformanceMonitorWrapper() {
  const performanceToggle = usePerformanceToggle();

  return (
    <PerformanceMonitor
      isVisible={performanceToggle.isVisible}
      onClose={performanceToggle.hide}
    />
  );
}
