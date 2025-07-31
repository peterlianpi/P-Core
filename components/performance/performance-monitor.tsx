"use client";

/**
 * PERFORMANCE MONITOR: Real-time Performance Tracking
 * 
 * This component provides:
 * 1. Core Web Vitals monitoring (LCP, FID, CLS)
 * 2. Custom performance metrics tracking
 * 3. Memory usage monitoring
 * 4. Network performance tracking
 * 5. User experience analytics
 * 
 * WHY THIS IS NEEDED:
 * - Monitor real user performance metrics
 * - Identify performance bottlenecks
 * - Track user experience quality
 * - Enable data-driven optimization
 * - Maintain performance standards
 */

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Zap, 
  Clock, 
  Wifi, 
  Database,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  
  // Custom metrics
  ttfb?: number; // Time to First Byte
  fcp?: number;  // First Contentful Paint
  domLoad?: number; // DOM Load Time
  
  // Resource metrics
  memoryUsage?: number;
  networkType?: string;
  connectionSpeed?: string;
  
  // User experience
  pageLoadTime?: number;
  renderTime?: number;
  interactionLatency?: number;
}

interface PerformanceThresholds {
  lcp: { good: number; needsImprovement: number };
  fid: { good: number; needsImprovement: number };
  cls: { good: number; needsImprovement: number };
  memoryUsage: { good: number; needsImprovement: number };
}

// ============================================================================
// PERFORMANCE THRESHOLDS (Google Web Vitals)
// ============================================================================

const PERFORMANCE_THRESHOLDS: PerformanceThresholds = {
  lcp: { good: 2500, needsImprovement: 4000 }, // milliseconds
  fid: { good: 100, needsImprovement: 300 },   // milliseconds
  cls: { good: 0.1, needsImprovement: 0.25 },  // score
  memoryUsage: { good: 50, needsImprovement: 80 }, // percentage
};

// ============================================================================
// PERFORMANCE MONITOR HOOK
// ============================================================================

const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isSupported, setIsSupported] = useState(false);
  const observerRef = useRef<PerformanceObserver | null>(null);

  useEffect(() => {
    // Check if Performance API is supported
    if (typeof window !== 'undefined' && 'performance' in window) {
      setIsSupported(true);
      initPerformanceMonitoring();
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const initPerformanceMonitoring = () => {
    // Monitor navigation timing
    measureNavigationTiming();
    
    // Monitor Core Web Vitals
    measureCoreWebVitals();
    
    // Monitor memory usage
    measureMemoryUsage();
    
    // Monitor network information
    measureNetworkInfo();
  };

  const measureNavigationTiming = () => {
    if (typeof window !== 'undefined' && window.performance.navigation) {
      const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        setMetrics(prev => ({
          ...prev,
          ttfb: navigation.responseStart - navigation.requestStart,
          domLoad: navigation.domContentLoadedEventEnd - navigation.navigationStart,
          pageLoadTime: navigation.loadEventEnd - navigation.navigationStart,
        }));
      }
    }
  };

  const measureCoreWebVitals = () => {
    // LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        if (lastEntry) {
          setMetrics(prev => ({
            ...prev,
            lcp: lastEntry.renderTime || lastEntry.loadTime,
          }));
        }
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP not supported
      }

      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          setMetrics(prev => ({
            ...prev,
            fid: entry.processingStart - entry.startTime,
          }));
        });
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // FID not supported
      }

      // CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            setMetrics(prev => ({
              ...prev,
              cls: clsValue,
            }));
          }
        });
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // CLS not supported
      }

      observerRef.current = lcpObserver; // Store one observer for cleanup
    }
  };

  const measureMemoryUsage = () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const usagePercentage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      
      setMetrics(prev => ({
        ...prev,
        memoryUsage: usagePercentage,
      }));
    }
  };

  const measureNetworkInfo = () => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      setMetrics(prev => ({
        ...prev,
        networkType: connection.effectiveType,
        connectionSpeed: connection.downlink ? `${connection.downlink} Mbps` : 'Unknown',
      }));
    }
  };

  return { metrics, isSupported };
};

// ============================================================================
// PERFORMANCE INDICATOR COMPONENT
// ============================================================================

interface PerformanceIndicatorProps {
  label: string;
  value: number | undefined;
  unit: string;
  thresholds: { good: number; needsImprovement: number };
  icon: React.ComponentType<{ className?: string }>;
  format?: (value: number) => string;
}

const PerformanceIndicator: React.FC<PerformanceIndicatorProps> = ({
  label,
  value,
  unit,
  thresholds,
  icon: Icon,
  format = (v) => v.toFixed(0),
}) => {
  if (value === undefined) {
    return (
      <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted/30">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">Measuring...</p>
        </div>
      </div>
    );
  }

  const getStatus = () => {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  const status = getStatus();
  const statusColors = {
    good: 'text-green-600 bg-green-50 border-green-200',
    'needs-improvement': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    poor: 'text-red-600 bg-red-50 border-red-200',
  };

  const statusIcons = {
    good: CheckCircle,
    'needs-improvement': AlertTriangle,
    poor: AlertTriangle,
  };

  const StatusIcon = statusIcons[status];

  return (
    <div className={cn('flex items-center space-x-2 p-3 rounded-lg border', statusColors[status])}>
      <Icon className="h-4 w-4" />
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs">
          {format(value)} {unit}
        </p>
      </div>
      <StatusIcon className="h-4 w-4" />
    </div>
  );
};

// ============================================================================
// MAIN PERFORMANCE MONITOR COMPONENT
// ============================================================================

interface PerformanceMonitorProps {
  isVisible?: boolean;
  onClose?: () => void;
  className?: string;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  isVisible = false,
  onClose,
  className,
}) => {
  const { metrics, isSupported } = usePerformanceMonitor();

  if (!isSupported) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'fixed bottom-4 right-4 z-50 w-80',
            className
          )}
        >
          <Card className="shadow-lg border-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Performance</CardTitle>
                </div>
                {onClose && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <CardDescription>
                Real-time performance metrics
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Core Web Vitals */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Core Web Vitals
                </h4>
                
                <PerformanceIndicator
                  label="Largest Contentful Paint"
                  value={metrics.lcp}
                  unit="ms"
                  thresholds={PERFORMANCE_THRESHOLDS.lcp}
                  icon={Clock}
                />
                
                <PerformanceIndicator
                  label="First Input Delay"
                  value={metrics.fid}
                  unit="ms"
                  thresholds={PERFORMANCE_THRESHOLDS.fid}
                  icon={Zap}
                />
                
                <PerformanceIndicator
                  label="Cumulative Layout Shift"
                  value={metrics.cls}
                  unit=""
                  thresholds={PERFORMANCE_THRESHOLDS.cls}
                  icon={Activity}
                  format={(v) => v.toFixed(3)}
                />
              </div>

              {/* System Resources */}
              {metrics.memoryUsage !== undefined && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    System Resources
                  </h4>
                  
                  <PerformanceIndicator
                    label="Memory Usage"
                    value={metrics.memoryUsage}
                    unit="%"
                    thresholds={PERFORMANCE_THRESHOLDS.memoryUsage}
                    icon={Database}
                    format={(v) => v.toFixed(1)}
                  />
                </div>
              )}

              {/* Network Info */}
              {(metrics.networkType || metrics.connectionSpeed) && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Wifi className="h-4 w-4" />
                    Network
                  </h4>
                  
                  <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted/30">
                    <Wifi className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Connection</p>
                      <p className="text-xs text-muted-foreground">
                        {metrics.networkType} - {metrics.connectionSpeed}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Performance Score */}
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Score</span>
                  <Badge variant="outline">
                    {calculateOverallScore(metrics)}/100
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// PERFORMANCE SCORE CALCULATION
// ============================================================================

const calculateOverallScore = (metrics: PerformanceMetrics): number => {
  let score = 100;
  let factors = 0;

  // LCP scoring
  if (metrics.lcp !== undefined) {
    factors++;
    if (metrics.lcp > PERFORMANCE_THRESHOLDS.lcp.needsImprovement) {
      score -= 30;
    } else if (metrics.lcp > PERFORMANCE_THRESHOLDS.lcp.good) {
      score -= 15;
    }
  }

  // FID scoring
  if (metrics.fid !== undefined) {
    factors++;
    if (metrics.fid > PERFORMANCE_THRESHOLDS.fid.needsImprovement) {
      score -= 25;
    } else if (metrics.fid > PERFORMANCE_THRESHOLDS.fid.good) {
      score -= 10;
    }
  }

  // CLS scoring
  if (metrics.cls !== undefined) {
    factors++;
    if (metrics.cls > PERFORMANCE_THRESHOLDS.cls.needsImprovement) {
      score -= 25;
    } else if (metrics.cls > PERFORMANCE_THRESHOLDS.cls.good) {
      score -= 10;
    }
  }

  // Memory usage scoring
  if (metrics.memoryUsage !== undefined) {
    factors++;
    if (metrics.memoryUsage > PERFORMANCE_THRESHOLDS.memoryUsage.needsImprovement) {
      score -= 20;
    } else if (metrics.memoryUsage > PERFORMANCE_THRESHOLDS.memoryUsage.good) {
      score -= 10;
    }
  }

  return Math.max(0, Math.min(100, score));
};

// ============================================================================
// PERFORMANCE TOGGLE HOOK
// ============================================================================

export const usePerformanceToggle = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Toggle with Ctrl+Shift+P
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        event.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return {
    isVisible,
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
    toggle: () => setIsVisible(prev => !prev),
  };
};

export default PerformanceMonitor;
