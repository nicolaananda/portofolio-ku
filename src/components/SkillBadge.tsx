import { ReactNode } from 'react';

interface SkillBadgeProps {
  icon: ReactNode;
  name: string;
  level?: string;
  color?: 'primary' | 'accent' | 'gradient';
  delay?: number;
}

const SkillBadge = ({ icon, name, level, color = 'primary', delay = 0 }: SkillBadgeProps) => {
  const getColorClasses = () => {
    switch (color) {
      case 'accent':
        return 'from-accent to-accent/80 text-white';
      case 'gradient':
        return 'from-primary via-accent to-primary text-white';
      default:
        return 'from-primary to-primary/80 text-white';
    }
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses()} opacity-0 group-hover:opacity-90 transition-opacity duration-500`}></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${getColorClasses()} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg group-hover:text-white transition-colors duration-300">
              {name}
            </h3>
            {level && (
              <p className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors duration-300">
                {level}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Floating animation dots */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-primary/30 rounded-full group-hover:bg-white/50 transition-colors duration-300"></div>
      <div className="absolute bottom-2 left-2 w-1 h-1 bg-accent/30 rounded-full group-hover:bg-white/30 transition-colors duration-300"></div>
    </div>
  );
};

export default SkillBadge; 