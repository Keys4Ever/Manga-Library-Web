import { useEffect, useState } from 'react';
import { Moon, Monitor, Sun } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.setAttribute('class', systemTheme);
    } else {
      document.documentElement.setAttribute('class', newTheme);
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className="relative">
      <button 
        className="text-current hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {theme === 'light' ? <Sun /> : theme === 'dark' ? <Moon /> : <Monitor />}
      </button>
      {isOpen && (
        <div className="absolute right-0 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          <button
            onClick={() => handleThemeChange('light')}
            className="w-full flex items-center text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Sun className="h-4 w-4 mr-2" /> Light
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className="w-full flex items-center text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Moon className="h-4 w-4 mr-2" /> Dark
          </button>
          <button
            onClick={() => handleThemeChange('system')}
            className="w-full flex items-center text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Monitor className="h-4 w-4 mr-2" /> System
          </button>
        </div>
      )}
    </div>
  );
}