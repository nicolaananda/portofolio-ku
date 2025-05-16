
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, FileText, Image, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';

interface AdminSidebarProps {
  closeSidebar?: () => void;
}

const AdminSidebar = ({ closeSidebar }: AdminSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    return path !== '/admin' && location.pathname.startsWith(path);
  };
  
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          <SidebarItem 
            to="/admin" 
            icon={<Home size={20} />} 
            label="Dashboard" 
            active={isActive('/admin')}
            onClick={closeSidebar}
          />
          <SidebarItem 
            to="/admin/blog" 
            icon={<FileText size={20} />} 
            label="Blog Posts" 
            active={isActive('/admin/blog')}
            onClick={closeSidebar}
          />
          <SidebarItem 
            to="/admin/portfolio" 
            icon={<Image size={20} />} 
            label="Portfolio" 
            active={isActive('/admin/portfolio')}
            onClick={closeSidebar}
          />
        </ul>
      </nav>
      
      <div className="border-t p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ to, icon, label, active, onClick }: SidebarItemProps) => {
  return (
    <li>
      <Link 
        to={to} 
        className={`flex items-center rounded-md px-3 py-2 transition-colors ${
          active 
            ? 'bg-primary/10 text-primary font-medium' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={onClick}
      >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default AdminSidebar;
