import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Role, User } from './types';
import LandingPage from './components/LandingPage';
import Layout from './components/layout/Layout';
import FarmerDashboard from './components/FarmerDashboard';
import SupervisorDashboard from './components/SupervisorDashboard';
import GovDashboard from './components/GovDashboard';
import VoiceAssistant from './components/VoiceAssistant';
import ChatAssistant from './components/ChatAssistant';
import { supabase } from './lib/supabase';

export default function App() {
  const [role, setRole] = useState<Role>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || 'Farmer',
          email: session.user.email,
        });
        setRole('farmer');
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    // Listen for auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || 'Farmer',
          email: session.user.email,
        });
        setRole('farmer');
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Layout 
        role={role} 
        setRole={setRole} 
        user={user} 
        setUser={setUser}
        language={language} 
        setLanguage={setLanguage}
      >
        {!user || !role ? (
           <Routes>
             <Route path="/" element={<LandingPage language={language} setRole={setRole} setUser={setUser} />} />
             <Route path="*" element={<Navigate to="/" replace />} />
           </Routes>
        ) : (
          <Routes>
            <Route path="/*" element={
              role === 'farmer' ? <FarmerDashboard language={language} user={user} /> :
              role === 'supervisor' ? <SupervisorDashboard /> :
              <GovDashboard />
            } />
          </Routes>
        )}
      </Layout>
      
      {role === 'farmer' && (
        <>
          <ChatAssistant language={language} />
          <VoiceAssistant language={language} />
        </>
      )}
    </BrowserRouter>
  );
}
