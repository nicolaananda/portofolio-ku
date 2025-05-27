import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface PortfolioForm {
  title: string;
  category: string;
  client: string;
  completionDate: string;
  technologies: string;
  description: string;
  challenge: string;
  solution: string;
  imageUrls: string;
  liveUrl: string;
  githubUrl: string;
}

export default function AddPortfolio() {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<PortfolioForm>({
    title: '',
    category: '',
    client: '',
    completionDate: '',
    technologies: '',
    description: '',
    challenge: '',
    solution: '',
    imageUrls: '',
    liveUrl: '',
    githubUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5002/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies.split(',').map(tech => tech.trim()),
          imageUrls: formData.imageUrls.split(',').map(url => url.trim()),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add portfolio');
      }

      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add portfolio');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Portfolio</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                Client
              </label>
              <input
                type="text"
                name="client"
                id="client"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.client}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700">
                Completion Date
              </label>
              <input
                type="text"
                name="completionDate"
                id="completionDate"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.completionDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                name="technologies"
                id="technologies"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.technologies}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="imageUrls" className="block text-sm font-medium text-gray-700">
                Image URLs (comma-separated)
              </label>
              <input
                type="text"
                name="imageUrls"
                id="imageUrls"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.imageUrls}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700">
                Live URL
              </label>
              <input
                type="url"
                name="liveUrl"
                id="liveUrl"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.liveUrl}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">
                GitHub URL
              </label>
              <input
                type="url"
                name="githubUrl"
                id="githubUrl"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.githubUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="challenge" className="block text-sm font-medium text-gray-700">
              Challenge
            </label>
            <textarea
              name="challenge"
              id="challenge"
              rows={3}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.challenge}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="solution" className="block text-sm font-medium text-gray-700">
              Solution
            </label>
            <textarea
              name="solution"
              id="solution"
              rows={3}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.solution}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Portfolio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 