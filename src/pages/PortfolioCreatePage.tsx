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
import { Button } from '@/components/ui/button';

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
      // Validate required fields
      if (!formData.title || !formData.category || !formData.client || !formData.completionDate) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      // Log the data being sent for debugging
      console.log('Submitting portfolio data:', formData);

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
        console.error('API Error:', data);
        setError(data.message || 'Failed to create portfolio');
      }
    } catch (error) {
      console.error('Network Error:', error);
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
    <motion.div 
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeIn} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dark:text-white text-gray-900">Create Portfolio</h1>
          <p className="dark:text-slate-400 text-gray-600 mt-1">Add a new project to your portfolio</p>
        </div>
        <Button
          onClick={() => navigate('/admin/portfolio')}
          variant="outline"
          className="liquid-glass-button dark:text-white text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to List
        </Button>
      </motion.div>

      {error && (
        <motion.div 
          variants={fadeIn}
          className="liquid-glass-strong rounded-xl p-4 text-red-500"
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
            <label htmlFor="title" className="text-sm font-medium dark:text-white text-gray-900">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              className="w-full rounded-lg liquid-glass dark:text-white text-gray-900 dark:placeholder:text-white/30 placeholder:text-gray-400 px-4 py-2"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium dark:text-white text-gray-900">
              Category
            </label>
            <input
              id="category"
              type="text"
              required
              className="w-full rounded-lg liquid-glass dark:text-white text-gray-900 dark:placeholder:text-white/30 placeholder:text-gray-400 px-4 py-2"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="client" className="text-sm font-medium dark:text-white text-gray-900">
              Client
            </label>
            <input
              id="client"
              type="text"
              required
              className="w-full rounded-lg liquid-glass dark:text-white text-gray-900 dark:placeholder:text-white/30 placeholder:text-gray-400 px-4 py-2"
              value={formData.client}
              onChange={(e) =>
                setFormData({ ...formData, client: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="completionDate" className="text-sm font-medium dark:text-white text-gray-900">
              Completion Date
            </label>
            <input
              id="completionDate"
              type="date"
              required
              className="w-full rounded-lg liquid-glass dark:text-white text-gray-900 px-4 py-2"
              value={formData.completionDate}
              onChange={(e) =>
                setFormData({ ...formData, completionDate: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="technologies" className="text-sm font-medium dark:text-white text-gray-900">
              Technologies
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  id="technologies"
                  type="text"
                  className="flex-1 rounded-lg liquid-glass dark:text-white text-gray-900 dark:placeholder:text-white/30 placeholder:text-gray-400 px-4 py-2"
                  placeholder="Add a technology"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddArrayItem('technologies', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    handleAddArrayItem('technologies', input.value);
                    input.value = '';
                  }}
                  className="liquid-glass-button dark:text-white text-gray-900"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 liquid-glass dark:text-white text-gray-900 rounded-full text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('technologies', index)}
                      className="hover:text-red-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="liveUrl" className="text-sm font-medium dark:text-white text-gray-900">
              Live URL (optional)
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 dark:text-slate-400 text-gray-400" />
              <input
                id="liveUrl"
                type="url"
                className="w-full pl-10 pr-4 py-2 rounded-lg liquid-glass dark:text-white text-gray-900 dark:placeholder:text-white/30 placeholder:text-gray-400"
                value={formData.liveUrl}
                onChange={(e) =>
                  setFormData({ ...formData, liveUrl: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="githubUrl" className="text-sm font-medium dark:text-white text-gray-900">
              GitHub URL (optional)
            </label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 dark:text-slate-400 text-gray-400" />
              <input
                id="githubUrl"
                type="url"
                className="w-full pl-10 pr-4 py-2 rounded-lg liquid-glass dark:text-white text-gray-900 dark:placeholder:text-white/30 placeholder:text-gray-400"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
              />
            </div>
          </div>
        </motion.div>

        {/* Image Upload Section */}
        <motion.div variants={fadeIn} className="space-y-2">
          <label className="text-sm font-medium dark:text-white text-gray-900">
            Project Images
          </label>
          <ImageUpload
            images={formData.imageUrls}
            onImagesChange={(images) => setFormData({ ...formData, imageUrls: images })}
            maxImages={10}
          />
        </motion.div>

        <motion.div variants={fadeIn} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium dark:text-white text-gray-900">
              Description
            </label>
            <textarea
              id="description"
              required
              rows={4}
              className="w-full rounded-lg liquid-glass dark:text-white text-gray-900 dark:placeholder:text-white/30 placeholder:text-gray-400 px-4 py-2"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="challenge" className="text-sm font-medium dark:text-white text-gray-900">
              Challenge
            </label>
            <textarea
              id="challenge"
              required
              rows={4}
              className="w-full rounded-lg liquid-glass dark:text-white text-gray-900 dark:placeholder:text-white/30 placeholder:text-gray-400 px-4 py-2"
              value={formData.challenge}
              onChange={(e) =>
                setFormData({ ...formData, challenge: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="solution" className="text-sm font-medium dark:text-white text-gray-900">
              Solution
            </label>
            <textarea
              id="solution"
              required
              rows={4}
              className="w-full rounded-lg liquid-glass dark:text-white text-gray-900 dark:placeholder:text-white/30 placeholder:text-gray-400 px-4 py-2"
              value={formData.solution}
              onChange={(e) =>
                setFormData({ ...formData, solution: e.target.value })
              }
            />
          </div>
        </motion.div>

        <motion.div 
          variants={fadeIn}
          className="flex justify-end gap-4 pt-6 border-t dark:border-slate-800 border-gray-200"
        >
          <Button
            type="button"
            onClick={() => navigate('/admin/portfolio')}
            variant="outline"
            className="liquid-glass-button dark:text-white text-gray-900"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
          >
            {isLoading ? 'Creating...' : 'Create Portfolio'}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}