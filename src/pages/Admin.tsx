import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import TaskManager from '@/components/TaskManager';

const Admin = () => {
  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <Header showAdminAccess={true} />
      
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Admin Panel
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Manage projects, tasks, and Discord integrations.
            </p>
          </div>

          <div className="space-y-8">
            <TaskManager />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;