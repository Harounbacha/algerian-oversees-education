import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import type { ApiResponse, PaginatedResponse } from '../types';

export function useSupabase<T>(
  table: string,
  query?: string,
  options?: {
    select?: string;
    filters?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    page?: number;
  }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let queryBuilder = supabase.from(table).select(options?.select || '*');

      // Apply filters
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            if (key === 'search') {
              queryBuilder = queryBuilder.or(`name.ilike.%${value}%,description.ilike.%${value}%`);
            } else if (Array.isArray(value)) {
              queryBuilder = queryBuilder.in(key, value);
            } else {
              queryBuilder = queryBuilder.eq(key, value);
            }
          }
        });
      }

      // Apply ordering
      if (options?.orderBy) {
        queryBuilder = queryBuilder.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? true,
        });
      }

      // Apply pagination
      if (options?.limit) {
        const page = options.page || 1;
        const from = (page - 1) * options.limit;
        const to = from + options.limit - 1;
        queryBuilder = queryBuilder.range(from, to);
      }

      const { data: result, error: supabaseError, count } = await queryBuilder;

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setData(result || []);
      setTotal(count || 0);
      setHasMore(options?.limit ? (result?.length || 0) === options.limit : false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [table, options]);

  const insert = useCallback(async (item: Partial<T>): Promise<ApiResponse<T>> => {
    try {
      setLoading(true);
      setError(null);

      const { data: result, error: supabaseError } = await supabase
        .from(table)
        .insert(item)
        .select()
        .single();

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      return { data: result, error: null, loading: false };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return { data: null, error: errorMessage, loading: false };
    } finally {
      setLoading(false);
    }
  }, [table]);

  const update = useCallback(async (id: string | number, updates: Partial<T>): Promise<ApiResponse<T>> => {
    try {
      setLoading(true);
      setError(null);

      const { data: result, error: supabaseError } = await supabase
        .from(table)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      // Update local state
      setData(prev => prev.map(item => 
        (item as any).id === id ? { ...item, ...updates } : item
      ));

      return { data: result, error: null, loading: false };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return { data: null, error: errorMessage, loading: false };
    } finally {
      setLoading(false);
    }
  }, [table]);

  const remove = useCallback(async (id: string | number): Promise<ApiResponse<boolean>> => {
    try {
      setLoading(true);
      setError(null);

      const { error: supabaseError } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      // Update local state
      setData(prev => prev.filter(item => (item as any).id !== id));

      return { data: true, error: null, loading: false };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return { data: null, error: errorMessage, loading: false };
    } finally {
      setLoading(false);
    }
  }, [table]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    total,
    hasMore,
    insert,
    update,
    remove,
    refresh,
  };
}

// Specialized hooks for common operations
export function useUniversities(filters?: Record<string, any>) {
  return useSupabase<any>('universities', undefined, {
    select: '*',
    filters,
    orderBy: { column: 'world_ranking', ascending: true },
    limit: 20,
  });
}

export function useApplications(userId?: string) {
  return useSupabase<any>('applications', undefined, {
    select: '*, universities(*)',
    filters: userId ? { user_id: userId } : undefined,
    orderBy: { column: 'created_at', ascending: false },
  });
}

export function useResources(category?: string) {
  return useSupabase<any>('resources', undefined, {
    select: '*',
    filters: category ? { category } : undefined,
    orderBy: { column: 'created_at', ascending: false },
  });
}

export function useDiscussions(category?: string) {
  return useSupabase<any>('discussions', undefined, {
    select: '*, users(full_name, avatar_url)',
    filters: category ? { category } : undefined,
    orderBy: { column: 'created_at', ascending: false },
  });
}

