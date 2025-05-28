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
    challenge: '',
    solution: '',
    imageUrls: [],
    liveUrl: '',
    githubUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5002/api/portfolio', {
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

  const handleArrayInput = (field: 'technologies' | 'imageUrls', value: string) => {
    setFormData({
      ...formData,
      [field]: value.split(',').map((item) => item.trim()),
    });
  };

  const handleAddArrayItem = (field: 'technologies' | 'imageUrls', value: string) => {
    if (!value.trim()) return;
    setFormData({
      ...formData,
      [field]: [...formData[field], value.trim()],
    });
  };

  const handleRemoveArrayItem = (field: 'technologies' | 'imageUrls', index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeIn} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create Portfolio</h1>
          <p className="text-gray-500 mt-1">Add a new project to your portfolio</p>
        </div>
        <button
          onClick={() => navigate('/admin/portfolio')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Back to List</span>
        </button>
      </motion.div>

      {error && (
        <motion.div 
          variants={fadeIn}
          className="rounded-md bg-red-50 p-4 text-red-500"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div 
          variants={fadeIn}
          className="grid gap-6 md:grid-cols-2"
        >
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
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
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
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
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
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
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={formData.completionDate}
              onChange={(e) =>
                setFormData({ ...formData, completionDate: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="technologies" className="text-sm font-medium">
              Technologies
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  id="technologies"
                  type="text"
                  className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Add a technology"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddArrayItem('technologies', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    handleAddArrayItem('technologies', input.value);
                    input.value = '';
                  }}
                  className="px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('technologies', index)}
                      className="hover:text-primary/80"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="imageUrls" className="text-sm font-medium">
              Image URLs
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  id="imageUrls"
                  type="text"
                  className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Add an image URL"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddArrayItem('imageUrls', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    handleAddArrayItem('imageUrls', input.value);
                    input.value = '';
                  }}
                  className="px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {formData.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative group aspect-video rounded-lg overflow-hidden border"
                  >
                    <img
                      src={url}
                      alt={`Portfolio image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('imageUrls', index)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="liveUrl" className="text-sm font-medium">
              Live URL (optional)
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="liveUrl"
                type="url"
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={formData.liveUrl}
                onChange={(e) =>
                  setFormData({ ...formData, liveUrl: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="githubUrl" className="text-sm font-medium">
              GitHub URL (optional)
            </label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="githubUrl"
                type="url"
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              required
              rows={4}
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
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
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
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
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={formData.solution}
              onChange={(e) =>
                setFormData({ ...formData, solution: e.target.value })
              }
            />
          </div>
        </motion.div>

        <motion.div 
          variants={fadeIn}
          className="flex justify-end gap-4 pt-6 border-t"
        >
          <button
            type="button"
            onClick={() => navigate('/admin/portfolio')}
            className="px-6 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Creating...' : 'Create Portfolio'}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
} 