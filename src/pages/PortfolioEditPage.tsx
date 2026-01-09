import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
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

export default function PortfolioEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [portfolioId, setPortfolioId] = useState<string | null>(null);
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

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/portfolio/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setFormData({
            ...data.data,
            completionDate: data.data.completionDate ? new Date(data.data.completionDate).toISOString().split('T')[0] : '',
          });
          setPortfolioId(data.data.id);
        } else {
          setError(data.message || 'Failed to fetch portfolio');
        }
      } catch (error) {
        setError('An error occurred while fetching the portfolio');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, [id, accessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      const targetId = portfolioId || id;
      const response = await fetch(`${import.meta.env.VITE_API_URL}/portfolio/${targetId}`, {
        method: 'PATCH',
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
        setError(data.message || 'Failed to update portfolio');
      }
    } catch (error) {
      setError('An error occurred while updating the portfolio');
    } finally {
      setIsSaving(false);
    }
  };

  const handleArrayInput = (field: 'technologies' | 'imageUrls', value: string) => {
    setFormData({
      ...formData,
      [field]: value.split(',').map((item) => item.trim()),
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Portfolio</h1>
          <p className="text-slate-400 mt-1">Update your portfolio project details</p>
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
                onChange={(e) => handleArrayInput('technologies', e.target.value)}
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="imageUrls" className="text-sm font-medium text-slate-300">
                Project Images
              </label>
              <ImageUpload
                images={formData.imageUrls}
                onChange={(urls) => setFormData({ ...formData, imageUrls: urls })}
                maxImages={10}
                disabled={isSaving}
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
            disabled={isSaving}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}