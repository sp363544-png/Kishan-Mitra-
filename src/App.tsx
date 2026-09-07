import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Role } from './types';
import LandingPage from './components/LandingPage';
import Layout from './components/layout/Layout';
import FarmerDashboard from './components/FarmerDashboard';
import SupervisorDashboard from './components/SupervisorDashboard';
import GovDashboard from './components/GovDashboard';
import VoiceAssistant from './components/VoiceAssistant';
import ChatAssistant from './components/ChatAssistant';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function App() {
  const [role, setRole] = useState<Role>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // For demo purposes, auto-assign farmer role when signed in if not already set
      if (currentUser && !role) {
        setRole('farmer');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [role]);

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
        language={language} 
        setLanguage={setLanguage}
      >
        {!user || !role ? (
           <Routes>
             <Route path="/" element={<LandingPage language={language} setRole={setRole} />} />
             <Route path="*" element={<Navigate to="/" replace />} />
           </Routes>
        ) : (
          <Routes>
            <Route path="/*" element={
              role === 'farmer' ? <FarmerDashboard language={language} /> :
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
