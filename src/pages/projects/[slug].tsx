import ContentLayout from '@/components/ContentLayout';
import ContentMDX from '@/components/ContentMDX';
import Head from '@/components/Head';
import Logo from '@/components/Logo';
import { ArrowLeft } from '@phosphor-icons/react';
import { allProjects } from 'contentlayer/generated';
import type { Project } from 'contentlayer/generated';
import { GetStaticProps } from 'next';
import Link from 'next/link';

export const getStaticPaths = () => {
  const paths = allProjects.map((p) => ({
    params: { slug: p._raw.flattenedPath.split('/').pop() }
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const project = allProjects.find(
    (p) => p._raw.flattenedPath === `projects/${params?.slug as string}`,
  );

  return {
    props: {
      project,
    },
  };
};

const GoBack = () => (
  <Link href="/#projects" className="flex items-center gap-3 mt-8 mb-8 text-light-gold font-medium">
    <ArrowLeft size={24} />
    Go back • Projects
  </Link>
);

const Project = ({ project }: { project: Project }) => {
  if (!project) {
    return <div>Proyek tidak ditemukan</div>; // Tambahkan validasi
  }

  return (
    <>
      <Head title={`Projects • ${project.name}`} />
      <section className="relative p-12 w-screen min-h-screen flex flex-col">
        <Link className="absolute hidden lg:block" href="/">
          <Logo />
        </Link>

        <ContentLayout>
          <GoBack />
          <section className="mb-10 flex flex-col sm:flex-row items-start sm:items-end gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-5xl lg:text-6xl tracking-tight block"
            >
              {project.name}
            </a>

            {typeof project.year === 'number' && (
              <section className="flex gap-3 justify-end">
                <p className="text-3xl text-light-gold">•</p>
                <p className="text-2xl font-medium text-zinc-300">
                  {project.year}
                </p>
              </section>
            )}
          </section>

          <section className="text-zinc-100 text-lg prose prose-sm prose-amber prose-img:rounded-xl prose-invert">
            <ContentMDX code={project.body.code} />
          </section>
          <GoBack />
        </ContentLayout>
      </section>
    </>
  );
};

export default Project;
