import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import AdminSidebar from '@/components/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <Header />
      
      <div className="pt-20 flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">{title}</h1>
              {description && (
                <p className="text-muted-foreground mt-2">{description}</p>
              )}
            </div>
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;