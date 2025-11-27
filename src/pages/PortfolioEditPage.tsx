import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import ImageUpload from '@/components/ImageUpload';

interface PortfolioFormData {
  title: string;
  category: string;
  client: string;
  completionDate: string;
  technologies: string[];
  description: string;
  challenge: string;
  solution: string;
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
  const [formData, setFormData] = useState<PortfolioFormData>({
    title: '',
    category: '',
    client: '',
    completionDate: '',
    technologies: [],
    description: '',
    challenge: '',
    solution: '',
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
          setFormData(data.data);
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/portfolio/${id}`, {
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
              <div className="flex items-center justify-between">
                <label htmlFor="description" className="text-sm font-medium text-slate-300">
                  Description
                </label>
                <span className="text-xs text-slate-400">HTML supported</span>
              </div>
              <textarea
                id="description"
                required
                rows={6}
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical font-mono text-sm"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Use HTML for formatting:&#10;&lt;strong&gt;bold&lt;/strong&gt;, &lt;em&gt;italic&lt;/em&gt;&#10;&lt;ul&gt;&lt;li&gt;bullet point&lt;/li&gt;&lt;/ul&gt;&#10;&lt;br/&gt; for line breaks"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="challenge" className="text-sm font-medium text-slate-300">
                  Challenge
                </label>
                <span className="text-xs text-slate-400">HTML supported</span>
              </div>
              <textarea
                id="challenge"
                required
                rows={6}
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical font-mono text-sm"
                value={formData.challenge}
                onChange={(e) =>
                  setFormData({ ...formData, challenge: e.target.value })
                }
                placeholder="Use HTML for bullet points:&#10;&lt;ul&gt;&#10;  &lt;li&gt;Challenge 1&lt;/li&gt;&#10;  &lt;li&gt;Challenge 2&lt;/li&gt;&#10;&lt;/ul&gt;"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="solution" className="text-sm font-medium text-slate-300">
                  Solution
                </label>
                <span className="text-xs text-slate-400">HTML supported</span>
              </div>
              <textarea
                id="solution"
                required
                rows={6}
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical font-mono text-sm"
                value={formData.solution}
                onChange={(e) =>
                  setFormData({ ...formData, solution: e.target.value })
                }
                placeholder="Use HTML for bullet points:&#10;&lt;ul&gt;&#10;  &lt;li&gt;Solution 1&lt;/li&gt;&#10;  &lt;li&gt;Solution 2&lt;/li&gt;&#10;&lt;/ul&gt;"
              />
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