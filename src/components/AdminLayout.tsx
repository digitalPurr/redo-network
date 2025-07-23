
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
        
        <main className="flex-1 p-8 bg-background/50">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="bg-card/80 border border-primary/30 rounded-lg p-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
              {description && (
                <p className="text-muted-foreground text-lg">{description}</p>
              )}
            </div>
            
            <div className="space-y-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
