import React from 'react';
import { useApp } from '../context/AppContext';
import { supabase } from '../supabaseClient';

export function DebugAuth() {
  const { state } = useApp();
  const [session, setSession] = React.useState<any>(null);

  React.useEffect(() => {
    const getSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-xs z-50">
      <div className="font-bold mb-2">Debug Auth State</div>
      <div>Current Page: {state.currentPage}</div>
      <div>Is Authenticated: {state.isAuthenticated ? 'Yes' : 'No'}</div>
      <div>User ID: {state.user?.id || 'None'}</div>
      <div>Session User: {session?.user?.id || 'None'}</div>
      <div>Loading: {state.loading ? 'Yes' : 'No'}</div>
    </div>
  );
}
