import classNames from 'classnames';
import { useEffect } from 'react';
import styles from './Layout.module.css';

/**
 * Decorative blurred gradient behind the content.
 *
 * @param {{ variant: 'large' | 'small', className?: string }} props
 *   `variant` picks the CSS module style; classNames() joins only the classes
 *   whose condition is true, plus any extra `className`.
 */
export function GradientBackground({ variant, className }) {
  const classes = classNames(
    {
      [styles.colorBackground]: variant === 'large',
      [styles.colorBackgroundBottom]: variant === 'small',
    },
    className
  );

  return <div className={classes} />;
}

/**
 * Page wrapper: centres the content and keeps dark/light mode in sync.
 *
 * @param {{ children: React.ReactNode }} props
 */
export default function Layout({ children }) {
  // Apply the theme the visitor picked last time (saved by the Footer buttons).
  const setAppTheme = () => {
    const darkMode = localStorage.getItem('theme') === 'dark';
    const lightMode = localStorage.getItem('theme') === 'light';

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else if (lightMode) {
      document.documentElement.classList.remove('dark');
    }
    return;
  };

  // Follow the operating system's dark-mode setting when it changes.
  const handleSystemThemeChange = () => {
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    darkQuery.onchange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };
  };

  // useEffect with [] runs once after the first render in the browser;
  // localStorage and window do not exist during the server-side build.
  useEffect(() => {
    setAppTheme();
  }, []);

  useEffect(() => {
    handleSystemThemeChange();
  }, []);

  return (
    <div className="relative pb-24 overflow-hidden">
      <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
        {children}
      </div>
    </div>
  );
}
