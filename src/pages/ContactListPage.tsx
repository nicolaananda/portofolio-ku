import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  Mail,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  ArrowUpRight,
  MessageSquare,
  Calendar,
  Plus,
  Mail as MailIcon
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ContactListPage() {
  const { accessToken } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread'>('all');

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setContacts(data.data);
      } else {
        setError(data.message || 'Failed to fetch contacts');
      }
    } catch (error) {
      setError('An error occurred while fetching contacts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact/${id}/read`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setContacts(
          contacts.map((contact) =>
            contact.id === id ? { ...contact, isRead: true } : contact
          )
        );
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to mark message as read');
      }
    } catch (error) {
      setError('An error occurred while marking the message as read');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setContacts(contacts.filter((contact) => contact.id !== id));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete message');
      }
    } catch (error) {
      setError('An error occurred while deleting the message');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [accessToken]);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || !contact.isRead;

    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-gray-500">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="max-w-7xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeIn} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
          <p className="text-slate-400 mt-1">Manage your contact form submissions</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
            {filteredContacts.length} messages
          </span>
        </div>
      </motion.div>

      {error && (
        <motion.div
          variants={fadeIn}
          className="rounded-lg bg-red-900/50 border border-red-800 p-4 text-red-300"
        >
          {error}
        </motion.div>
      )}

      {/* Search and Filter */}
      <motion.div
        variants={fadeIn}
        className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl p-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-600 bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === 'all'
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('unread')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === 'unread'
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
          >
            Unread
          </button>
        </div>
      </motion.div>

      {/* Messages Grid */}
      <motion.div
        variants={fadeIn}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredContacts.map((contact) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className={`bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden ${!contact.isRead ? 'ring-2 ring-blue-500/30' : ''
              }`}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-slate-400" />
                    <h3 className="font-semibold text-white">{contact.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <MailIcon className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-400">{contact.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${contact.isRead ? 'bg-slate-500' : 'bg-blue-500 animate-pulse'
                      }`}
                  />
                  <span className="text-sm text-slate-400">
                    {contact.isRead ? 'Read' : 'New'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-white">{contact.subject}</h4>
                <p className="text-sm text-slate-400 line-clamp-2">{contact.message}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar className="h-4 w-4" />
                <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-700">
                {!contact.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(contact.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition-colors border border-blue-600/30"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Mark as Read</span>
                  </button>
                )}
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-red-900/20 text-red-300 hover:bg-red-900/30 transition-colors border border-red-800/30"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
} 