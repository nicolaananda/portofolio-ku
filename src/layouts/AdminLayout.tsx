
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-muted/30">
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <AdminSidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 focus:outline-none md:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="font-montserrat text-lg font-semibold">Admin Dashboard</div>
            <div className="flex items-center gap-4">
              {/* Profile or logout button can go here */}
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(false);
            }}
            className="absolute right-4 top-4 rounded-full bg-white p-2 text-gray-500"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
