import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  Tag,
  Image as ImageIcon,
  Link as LinkIcon,
  Github,
  ArrowLeft,
  Plus,
  X
} from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import { RichTextEditor } from '@/components/editor/RichTextEditor';

interface PortfolioFormData {
  title: string;
  category: string;
  client: string;
  completionDate: string;
  technologies: string[];
  description: string;
  imageUrls: string[];
  liveUrl?: string;
  githubUrl?: string;
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

export default function PortfolioCreatePage() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<PortfolioFormData>({
    title: '',
    category: '',
    client: '',
    completionDate: '',
    technologies: [],
    description: '',
    imageUrls: [],
    liveUrl: '',
    githubUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/admin/portfolio');
      } else {
        setError(data.message || 'Failed to create portfolio');
      }
    } catch (error) {
      setError('An error occurred while creating the portfolio');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddArrayItem = (field: 'technologies', value: string) => {
    if (!value.trim()) return;
    setFormData({
      ...formData,
      [field]: [...formData[field], value.trim()],
    });
  };

  const handleRemoveArrayItem = (field: 'technologies', index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Create Portfolio</h1>
          <p className="text-slate-400 mt-1">Add a new project to your portfolio</p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-900/50 border border-red-800 p-4 text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Basic Information</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-slate-300">
                Title
              </label>
              <input
                id="title"
                type="text"
                required
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-slate-300">
                Category
              </label>
              <input
                id="category"
                type="text"
                required
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="client" className="text-sm font-medium text-slate-300">
                Client
              </label>
              <input
                id="client"
                type="text"
                required
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.client}
                onChange={(e) =>
                  setFormData({ ...formData, client: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="completionDate" className="text-sm font-medium text-slate-300">
                Completion Date
              </label>
              <input
                id="completionDate"
                type="date"
                required
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.completionDate}
                onChange={(e) =>
                  setFormData({ ...formData, completionDate: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="technologies" className="text-sm font-medium text-slate-300">
                Technologies (comma-separated)
              </label>
              <input
                id="technologies"
                type="text"
                required
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.technologies.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    technologies: e.target.value.split(',').map((t) => t.trim()),
                  })
                }
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-300">
                Project Images
              </label>
              <ImageUpload
                images={formData.imageUrls}
                onChange={(urls) => setFormData({ ...formData, imageUrls: urls })}
                maxImages={10}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="liveUrl" className="text-sm font-medium text-slate-300">
                Live URL (optional)
              </label>
              <input
                id="liveUrl"
                type="url"
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.liveUrl}
                onChange={(e) =>
                  setFormData({ ...formData, liveUrl: e.target.value })
                }
                placeholder="https://your-project.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="githubUrl" className="text-sm font-medium text-slate-300">
                GitHub URL (optional)
              </label>
              <input
                id="githubUrl"
                type="url"
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Project Details</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Case Study / Description
              </label>
              <div className="rounded-lg border border-slate-600 bg-slate-700/50 overflow-hidden text-black dark:text-gray-200">
                <RichTextEditor
                  value={formData.description}
                  onChange={(html) => setFormData({ ...formData, description: html })}
                  placeholder="Describe the project, challenge, and solution..."
                  minHeight="500px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/portfolio')}
            className="px-6 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Creating...' : 'Create Portfolio'}
          </button>
        </div>
      </form>
    </div>
  );
}