import { supabase } from '../supabaseClient';
import type { User, University, Application, Resource, Discussion } from '../types';

// Database service class
export class DatabaseService {
  // User operations
  static async getUserProfile(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Exception fetching user profile:', error);
      return null;
    }
  }

  static async createUserProfile(userData: Partial<User>): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert(userData)
        .select()
        .single();

      if (error) {
        console.error('Error creating user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Exception creating user profile:', error);
      return null;
    }
  }

  static async updateUserProfile(userId: string, updates: Partial<User>): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Exception updating user profile:', error);
      return null;
    }
  }

  // University operations
  static async getUniversities(filters?: any): Promise<University[]> {
    try {
      let query = supabase.from('universities').select('*');
      
      if (filters?.country) {
        query = query.eq('country', filters.country);
      }
      
      if (filters?.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching universities:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Exception fetching universities:', error);
      return [];
    }
  }

  static async getUniversityById(id: number): Promise<University | null> {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching university:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Exception fetching university:', error);
      return null;
    }
  }

  // Application operations
  static async getUserApplications(userId: string): Promise<Application[]> {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          universities (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Exception fetching applications:', error);
      return [];
    }
  }

  static async createApplication(applicationData: Partial<Application>): Promise<Application | null> {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert(applicationData)
        .select()
        .single();

      if (error) {
        console.error('Error creating application:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Exception creating application:', error);
      return null;
    }
  }

  // Resource operations
  static async getResources(category?: string): Promise<Resource[]> {
    try {
      let query = supabase.from('study_resources').select('*');
      
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching resources:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Exception fetching resources:', error);
      return [];
    }
  }

  // Discussion operations
  static async getDiscussions(category?: string): Promise<Discussion[]> {
    try {
      let query = supabase.from('discussions').select(`
        *,
        user_profiles!inner(full_name, avatar_url)
      `);
      
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching discussions:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Exception fetching discussions:', error);
      return [];
    }
  }

  // Generic error handler
  static handleError(error: any, operation: string): string {
    if (error?.code === 'PGRST116') {
      return 'No data found';
    }
    
    if (error?.code === '42501') {
      return 'Access denied. Please check your permissions.';
    }
    
    if (error?.code === '23505') {
      return 'This record already exists.';
    }
    
    return error?.message || `An error occurred during ${operation}`;
  }
}
