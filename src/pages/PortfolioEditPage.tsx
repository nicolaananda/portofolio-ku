import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Portfolio</h1>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-red-500">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              className="w-full rounded-md border px-3 py-2"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <input
              id="category"
              type="text"
              required
              className="w-full rounded-md border px-3 py-2"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="client" className="text-sm font-medium">
              Client
            </label>
            <input
              id="client"
              type="text"
              required
              className="w-full rounded-md border px-3 py-2"
              value={formData.client}
              onChange={(e) =>
                setFormData({ ...formData, client: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="completionDate" className="text-sm font-medium">
              Completion Date
            </label>
            <input
              id="completionDate"
              type="date"
              required
              className="w-full rounded-md border px-3 py-2"
              value={formData.completionDate}
              onChange={(e) =>
                setFormData({ ...formData, completionDate: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="technologies" className="text-sm font-medium">
              Technologies (comma-separated)
            </label>
            <input
              id="technologies"
              type="text"
              required
              className="w-full rounded-md border px-3 py-2"
              value={formData.technologies.join(', ')}
              onChange={(e) => handleArrayInput('technologies', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="imageUrls" className="text-sm font-medium">
              Image URLs (comma-separated)
            </label>
            <input
              id="imageUrls"
              type="text"
              required
              className="w-full rounded-md border px-3 py-2"
              value={formData.imageUrls.join(', ')}
              onChange={(e) => handleArrayInput('imageUrls', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="liveUrl" className="text-sm font-medium">
              Live URL (optional)
            </label>
            <input
              id="liveUrl"
              type="url"
              className="w-full rounded-md border px-3 py-2"
              value={formData.liveUrl}
              onChange={(e) =>
                setFormData({ ...formData, liveUrl: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="githubUrl" className="text-sm font-medium">
              GitHub URL (optional)
            </label>
            <input
              id="githubUrl"
              type="url"
              className="w-full rounded-md border px-3 py-2"
              value={formData.githubUrl}
              onChange={(e) =>
                setFormData({ ...formData, githubUrl: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            required
            rows={4}
            className="w-full rounded-md border px-3 py-2"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="challenge" className="text-sm font-medium">
            Challenge
          </label>
          <textarea
            id="challenge"
            required
            rows={4}
            className="w-full rounded-md border px-3 py-2"
            value={formData.challenge}
            onChange={(e) =>
              setFormData({ ...formData, challenge: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="solution" className="text-sm font-medium">
            Solution
          </label>
          <textarea
            id="solution"
            required
            rows={4}
            className="w-full rounded-md border px-3 py-2"
            value={formData.solution}
            onChange={(e) =>
              setFormData({ ...formData, solution: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/portfolio')}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
} 