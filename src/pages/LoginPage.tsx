import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Debug environment
    console.log('Environment:', {
      mode: import.meta.env.MODE,
      apiUrl: import.meta.env.VITE_API_URL,
      baseUrl: import.meta.env.VITE_BASE_URL,
      email: formData.email,
      passwordLength: formData.password.length
    });

    // Custom email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      console.log('Custom email validation failed');
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Check form validation
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      console.log('Form validation failed');
      const emailInput = form.querySelector('#email') as HTMLInputElement;
      const passwordInput = form.querySelector('#password') as HTMLInputElement;
      
      console.log('Email validity:', {
        valid: emailInput.validity.valid,
        valueMissing: emailInput.validity.valueMissing,
        typeMismatch: emailInput.validity.typeMismatch,
        patternMismatch: emailInput.validity.patternMismatch,
        tooShort: emailInput.validity.tooShort,
        tooLong: emailInput.validity.tooLong,
        validationMessage: emailInput.validationMessage
      });
      
      console.log('Password validity:', {
        valid: passwordInput.validity.valid,
        valueMissing: passwordInput.validity.valueMissing,
        typeMismatch: passwordInput.validity.typeMismatch,
        patternMismatch: passwordInput.validity.patternMismatch,
        tooShort: passwordInput.validity.tooShort,
        tooLong: passwordInput.validity.tooLong,
        validationMessage: passwordInput.validationMessage
      });
      
      if (!emailInput.validity.valid) {
        console.log('Email validation error:', emailInput.validationMessage);
        setError(`Email: ${emailInput.validationMessage}`);
      } else if (!passwordInput.validity.valid) {
        console.log('Password validation error:', passwordInput.validationMessage);
        setError(`Password: ${passwordInput.validationMessage}`);
      }
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting login with:', { email: formData.email, password: '***' });
      await login(formData.email, formData.password);
      console.log('Login successful');
      // Redirect to the page they tried to visit or admin dashboard
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                onInvalid={(e) => {
                  console.log('Email validation failed:', e.target.validationMessage);
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                onInvalid={(e) => {
                  console.log('Password validation failed:', e.target.validationMessage);
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
