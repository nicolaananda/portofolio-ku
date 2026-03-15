/**
 * Centralized API configuration
 * Manages API URLs and environment variables
 */

// Get API URL from environment or use default
const getApiUrl = (): string => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
        console.warn('VITE_API_URL not set, using default');
        return import.meta.env.DEV ? '/api' : 'https://be.nicola.id/api';
    }

    return apiUrl;
};

// Get app configuration
const getAppConfig = () => ({
    apiUrl: getApiUrl(),
    appTitle: import.meta.env.VITE_APP_TITLE || 'Nicola Ananda - Portfolio',
    appDescription: import.meta.env.VITE_APP_DESCRIPTION || 'Professional Data Analyst and Full Stack Web Developer',
    appUrl: import.meta.env.VITE_APP_URL || 'https://nicola.id',
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
    isDebug: import.meta.env.VITE_DEBUG === 'true',
});

// Export singleton configuration
export const config = getAppConfig();

// Re-export API URL for convenience
export const API_URL = config.apiUrl;

// Debug logging in development
if (config.isDev && config.isDebug) {
    console.log('🔧 App Configuration:', config);
}

export default config;
