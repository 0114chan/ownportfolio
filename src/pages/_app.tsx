import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = 'home';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
            window.scrollY >= sectionTop - 200 &&
            window.scrollY < sectionTop + sectionHeight - 200
        ) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
      <div className={isDarkMode ? 'dark-mode' : ''}>
        <Navbar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
        />
        <Component {...pageProps} />
      </div>
  );
}

export default MyApp;