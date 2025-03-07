
import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLoginForm from '@/components/auth/AdminLoginForm';
import PageTransition from '@/components/layout/PageTransition';
import { useAdmin } from '@/hooks/use-admin';

const AdminLogin: React.FC = () => {
  const { isLoggedIn } = useAdmin();

  // Redirect if already logged in
  if (isLoggedIn) {
    return <Navigate to="/admin/messages" replace />;
  }

  return (
    <PageTransition>
      <div className="container flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <AdminLoginForm />
      </div>
    </PageTransition>
  );
};

export default AdminLogin;
