import React from 'react';

// Performance optimization utilities
export class PerformanceService {
  // Debounce function calls
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Throttle function calls
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Memoize expensive calculations
  static memoize<T extends (...args: any[]) => any>(
    func: T,
    resolver?: (...args: Parameters<T>) => string
  ): T {
    const cache = new Map<string, ReturnType<T>>();
    
    return ((...args: Parameters<T>) => {
      const key = resolver ? resolver(...args) : JSON.stringify(args);
      
      if (cache.has(key)) {
        return cache.get(key);
      }
      
      const result = func(...args);
      cache.set(key, result);
      return result;
    }) as T;
  }

  // Lazy load components
  static lazyLoad<T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
    fallback?: React.ComponentType<any>
  ): React.LazyExoticComponent<T> {
    return React.lazy(importFunc);
  }

  // Intersection Observer for lazy loading
  static createIntersectionObserver(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ): IntersectionObserver {
    return new IntersectionObserver(callback, {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    });
  }

  // Image lazy loading
  static lazyLoadImage(img: HTMLImageElement, src: string): void {
    const observer = this.createIntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLImageElement;
          target.src = src;
          target.classList.remove('lazy');
          observer.unobserve(target);
        }
      });
    });

    observer.observe(img);
  }

  // Preload critical resources
  static preloadResource(href: string, as: string = 'fetch'): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  }

  // Prefetch non-critical resources
  static prefetchResource(href: string): void {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }

  // Measure performance
  static measurePerformance(name: string, fn: () => void): void {
    if (typeof performance !== 'undefined' && performance.mark) {
      const startMark = `${name}-start`;
      const endMark = `${name}-end`;
      
      performance.mark(startMark);
      fn();
      performance.mark(endMark);
      
      performance.measure(name, startMark, endMark);
      
      const measure = performance.getEntriesByName(name)[0];
      console.log(`${name} took ${measure.duration}ms`);
    } else {
      fn();
    }
  }

  // Batch DOM updates
  static batchDOMUpdates(updates: (() => void)[]): void {
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => {
        updates.forEach(update => update());
      });
    } else {
      updates.forEach(update => update());
    }
  }

  // Virtual scrolling helper
  static createVirtualScroller<T>(
    items: T[],
    itemHeight: number,
    containerHeight: number,
    renderItem: (item: T, index: number) => React.ReactNode
  ): {
    visibleItems: T[];
    startIndex: number;
    endIndex: number;
    totalHeight: number;
    offsetY: number;
  } {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const scrollTop = window.scrollY || 0;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(startIndex + visibleCount, items.length);
    
    return {
      visibleItems: items.slice(startIndex, endIndex),
      startIndex,
      endIndex,
      totalHeight: items.length * itemHeight,
      offsetY: startIndex * itemHeight
    };
  }
}

// React performance hooks
export const usePerformance = () => {
  const [metrics, setMetrics] = React.useState<Record<string, number>>({});
  
  const measure = React.useCallback((name: string, fn: () => void) => {
    PerformanceService.measurePerformance(name, fn);
  }, []);
  
  const trackMetric = React.useCallback((name: string, value: number) => {
    setMetrics(prev => ({ ...prev, [name]: value }));
  }, []);
  
  return { measure, trackMetric, metrics };
};

// Lazy loading hook
export const useLazyLoad = <T>(
  importFunc: () => Promise<{ default: T }>,
  deps: React.DependencyList = []
): T | null => {
  const [Component, setComponent] = React.useState<T | null>(null);
  
  React.useEffect(() => {
    importFunc().then(module => {
      setComponent(module.default);
    });
  }, deps);
  
  return Component;
};
