import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import type { User, Notification, Theme, Preferences } from '../types';

// State interface
interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  theme: Theme;
  notifications: Notification[];
  sidebarOpen: boolean;
  currentPage: string;
}

// Action types
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'SET_SIDEBAR_OPEN'; payload: boolean }
  | { type: 'SET_CURRENT_PAGE'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' };

// Initial state
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  theme: { name: 'system', label: 'System', icon: () => null },
  notifications: [],
  sidebarOpen: false,
  currentPage: 'home',
};

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  console.log('Reducer action:', action.type, action.payload);
  switch (action.type) {
    case 'SET_USER':
      console.log('Setting user:', action.payload);
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
    case 'SET_SIDEBAR_OPEN':
      return {
        ...state,
        sidebarOpen: action.payload,
      };
    case 'SET_CURRENT_PAGE':
      console.log('Setting current page:', action.payload);
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
}

// Context interface
interface AppContextType {
  state: AppState;
  dispatch: (action: AppAction) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  setTheme: (theme: Theme) => void;
  setCurrentPage: (page: string) => void;
  toggleSidebar: () => void;
  savePreferences: (partial: Record<string, any>) => Promise<void>;
}

// Create context
const AppContext = createContext(null as unknown as AppContextType);

// Provider component
type AppProviderProps = { children?: any };

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize app
  useEffect(() => {
    initializeApp();
  }, []);

  // Keep auth state in sync across reloads/navigation
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session?.user?.id);
      try {
        if (session?.user) {
          console.log('Auth state change: fetching profile for user:', session.user.id);
          const { data: profile, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (error) {
            console.error('Error fetching profile:', error);
          }
          
          if (profile) {
            console.log('Setting user in context:', profile);
            dispatch({ type: 'SET_USER', payload: profile });
            const preferences = (profile as any).preferences as Preferences | undefined;
            if (preferences?.theme) {
              dispatch({ type: 'SET_THEME', payload: preferences.theme });
            }
            // Navigate to profile if coming from login
            console.log('Setting current page to profile');
            dispatch({ type: 'SET_CURRENT_PAGE', payload: 'profile' });
          } else {
            console.log('No profile found for user:', session.user.id);
          }
        } else {
          dispatch({ type: 'SET_USER', payload: null });
          dispatch({ type: 'SET_CURRENT_PAGE', payload: 'home' });
        }
      } catch (e) {
        console.error('Auth state sync error', e);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  // Handle theme changes
  useEffect(() => {
    applyTheme(state.theme);
  }, [state.theme]);

  // Auto-remove notifications
  useEffect(() => {
    const timers = state.notifications.map(notification => {
      if (notification.duration) {
        return setTimeout(() => {
          removeNotification(notification.id);
        }, notification.duration);
      }
      return null;
    });

    return () => {
      timers.forEach(timer => timer && clearTimeout(timer));
    };
  }, [state.notifications]);

  const initializeApp = async () => {
    try {
      // Check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Fetch user profile
        console.log('InitializeApp: fetching profile for user:', session.user.id);
        const { data: profile, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('InitializeApp: error fetching profile:', error);
        }

        if (profile) {
          console.log('InitializeApp: setting user in context:', profile);
          dispatch({ type: 'SET_USER', payload: profile });
          // Prefer server-stored theme over local if present
          const preferences = (profile as any).preferences as Preferences | undefined;
          if (preferences?.theme) {
            dispatch({ type: 'SET_THEME', payload: preferences.theme });
          }
          // Set current page to profile for authenticated users
          console.log('InitializeApp: setting current page to profile');
          dispatch({ type: 'SET_CURRENT_PAGE', payload: 'profile' });
        } else {
          console.log('InitializeApp: no profile found for user:', session.user.id);
        }
      }

      // Load theme from localStorage
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        const theme = JSON.parse(savedTheme);
        // Only apply local theme if server didn't already set one
        if (!state.user || !(state.user as any).preferences?.theme) {
          dispatch({ type: 'SET_THEME', payload: theme });
        }
      }

      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      console.error('Failed to initialize app:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    
    if (theme.name === 'dark' || 
        (theme.name === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', JSON.stringify(theme));
  };

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const { data, error } = await supabase.auth.signInWithPassword({
        email: (email || '').trim(),
        password,
      });

      if (error) {
        // eslint-disable-next-line no-console
        console.error('Supabase signInWithPassword error:', error.message);
        throw error;
      }

      if (data.user) {
        // Fetch user profile
        console.log('Login: fetching profile for user:', data.user.id);
        const { data: profile, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (error) {
          console.error('Login: error fetching profile:', error);
        }

        if (profile) {
          console.log('Login: setting user in context:', profile);
          dispatch({ type: 'SET_USER', payload: profile });
          const preferences = (profile as any).preferences as Preferences | undefined;
          const serverTheme = preferences?.theme;
          if (serverTheme) {
            dispatch({ type: 'SET_THEME', payload: serverTheme });
          }
          addNotification({
            type: 'success',
            title: 'Welcome back!',
            message: `Hello, ${profile.full_name}!`,
            duration: 3000,
          });
          // Navigate immediately after successful login
          console.log('Login successful, setting current page to profile');
          dispatch({ type: 'SET_CURRENT_PAGE', payload: 'profile' });
        } else {
          console.log('Login: no profile found for user:', data.user.id);
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      addNotification({
        type: 'error',
        title: 'Login Failed',
        message,
        duration: 5000,
      });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      dispatch({ type: 'SET_USER', payload: null });
      addNotification({
        type: 'info',
        title: 'Logged Out',
        message: 'You have been successfully logged out.',
        duration: 3000,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const register = async (userData: any) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (error) throw error;

      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: userData.email,
            full_name: userData.full_name,
            education_level: userData.education_level,
            field_of_study: userData.field_of_study,
            location: userData.location,
          });

        if (profileError) throw profileError;

        addNotification({
          type: 'success',
          title: 'Registration Successful!',
          message: 'Please check your email to verify your account.',
          duration: 5000,
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      addNotification({
        type: 'error',
        title: 'Registration Failed',
        message,
        duration: 5000,
      });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { ...notification, id },
    });
  };

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const savePreferences = async (partial: Record<string, any>) => {
    if (!state.user) return; // only persist when authenticated
    try {
      const current = (state.user as any).preferences ?? {};
      const next = { ...current, ...partial } as Preferences;
      await supabase.from('users')
        .update({ preferences: next })
        .eq('id', state.user.id);
      dispatch({ type: 'SET_USER', payload: { ...state.user, preferences: next } as any });
    } catch (e) {
      console.error('Failed to save preferences', e);
    }
  };

  const setTheme = (theme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
    if (state.user) {
      void savePreferences({ theme });
    }
  };

  const setCurrentPage = (page: string) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const toggleSidebar = () => {
    dispatch({ type: 'SET_SIDEBAR_OPEN', payload: !state.sidebarOpen });
  };

  const value: AppContextType = {
    state,
    dispatch,
    login,
    logout,
    register,
    addNotification,
    removeNotification,
    setTheme,
    setCurrentPage,
    toggleSidebar,
    savePreferences,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
