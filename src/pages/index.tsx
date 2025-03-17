import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import Head from '@/components/Head';
import About from '@/components/home/About';
import Chatbot from '@/components/home/Floating';
import Footer from '@/components/home/Footer';
import Hero from '@/components/home/Hero';
import Projects from '@/components/home/Projects';
import useLenis from '@/hooks/useLenis';
import { Moon, Sun } from '@phosphor-icons/react';
import { Project, allProjects } from 'contentlayer/generated';

type ThemeToggleProps = {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, setDarkMode }) => {
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed bottom-4 left-4 p-2 bg-gray-800 text-white dark:bg-gray-200 dark:text-black rounded-full shadow-lg"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

type BlurredBackgroundProps = {
  darkMode: boolean;
};

const BlurredBackground: React.FC<BlurredBackgroundProps> = ({ darkMode }) => {
  return (
    <section className="w-screen h-full z-[-2] flex-grow absolute inset-0 overflow-hidden">
      <span
        className={`blur-[250px] block rounded-full w-[45rem] h-[40rem] -top-80 md:-top-16 -right-96 md:right-4 animate-spin-slow absolute ${
          darkMode
            ? 'bg-gradient-to-b from-[#FFA726] via-[#FB8C00] to-[#EF6C00]'
            : 'bg-gradient-to-b from-[#3E2723] via-[#6D4C41] to-[#A1887F]'
        }`}
      />
      <span
        className={`blur-[250px] block rounded-full w-[30rem] h-[35rem] top-[105vh] -left-48 md:left-0 animate-spin-slow absolute ${
          darkMode
            ? 'bg-gradient-to-b from-[#D7CCC8] via-[#BCAAA4] to-[#A1887F]'
            : 'bg-gradient-to-b from-[#FFF3E0] via-[#FFE0B2] to-[#FFA726]'
        }`}
      />
      <span
        className={`blur-[250px] block rounded-full w-[30rem] h-[35rem] top-[200vh] -right-56 md:right-0 animate-spin-slow absolute ${
          darkMode
            ? 'bg-gradient-to-b from-[#3E2723] via-[#6D4C41] to-[#A1887F]'
            : 'bg-gradient-to-b from-[#8D6E63] via-[#6D4C41] to-[#FB8C00]'
        }`}
      />
    </section>
  );
};

type HomeProps = {
  projects: Project[];
};

const Home: React.FC<HomeProps> = ({ projects }) => {
  const router = useRouter();
  const lenis = useLenis(({ instance }) => instance);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setDarkMode(storedTheme === 'dark');
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    const scrollTo = () => {
      if (!router.query.scroll || !lenis) return;
      lenis.scrollTo(`[data-id=${router.query.scroll}]`);
    };
    requestAnimationFrame(scrollTo);
  }, [lenis, router.query]);

  return (
    <>
      <Head />
      <BlurredBackground darkMode={darkMode} />
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <About />
      <Projects projects={projects} />
      <Footer />
      <Chatbot />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const projects = allProjects
    .sort((a, b) => (b?.year ?? 0) - (a?.year ?? 0))
    .map(({ body, ...rest }) => rest);

  return {
    props: {
      projects,
    },
  };
};

export default Home;