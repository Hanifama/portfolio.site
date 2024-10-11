import Head from '@/components/Head';
import About from '@/components/home/About';
import Footer from '@/components/home/Footer';
import Hero from '@/components/home/Hero';
import Projects from '@/components/home/Projects';
import useLenis from '@/hooks/useLenis';

import { Project, allProjects } from 'contentlayer/generated';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const BlurredBackground = () => {
  return (
    <>
      <section className="w-screen h-full z-[-2] flex-grow absolute inset-0 overflow-hidden">
        <span
          id="blob-1"
          className="blur-[250px] block rounded-full w-[45rem] h-[40rem] -top-80 md:-top-16 -right-96 md:right-4 animate-spin-slow absolute bg-gradient-to-b from-[#3E2723] via-[#6D4C41] to-[#A1887F]"
        />

        <span
          id="blob-2"
          className="blur-[250px] block rounded-full w-[30rem] h-[35rem] top-[105vh] -left-48 md:left-0 animate-spin-slow absolute bg-gradient-to-b from-[#D7CCC8] via-[#BCAAA4] to-[#A1887F]"
        />

        <span
          id="blob-3"
          className="blur-[250px] block rounded-full w-[30rem] h-[35rem] top-[200vh] -right-56 md:right-0 animate-spin-slow absolute bg-gradient-to-b from-[#3E2723] via-[#6D4C41] to-[#A1887F]"
        />
      </section>

    </>
  );
};

export default function Home({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const lenis = useLenis(({ instance }) => instance);

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
      <BlurredBackground />

      <Hero />
      <About />
      <Projects projects={projects} />
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = allProjects
    .sort((a, b) => (b?.year ?? 0) - (a?.year ?? 0))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ body, ...rest }) => rest);

  return {
    props: {
      projects,
    },
  };
};
