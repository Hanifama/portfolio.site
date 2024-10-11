import ContentLayout from '@/components/ContentLayout';
import Head from '@/components/Head';
import Logo from '@/components/Logo';
import Footer from '@/components/home/Footer';
import useCursor from '@/hooks/useCursor';
import { ArrowLeft, ArrowSquareOut } from '@phosphor-icons/react';
import Link from 'next/link';

const GoBack = () => (
  <Link
    href="/#about"
    className="flex items-center gap-3 mb-8 text-light-gold font-medium"
  >
    <ArrowLeft size={24} />
    Go back • About
  </Link>
);

const BlurredBackground = () => {
  return (
    <>
      <section className="w-screen h-full z-[-2] flex-grow absolute inset-0 overflow-hidden">
        <span
          id="blob-1"
          className="blur-[250px] block rounded-full w-[45rem] h-[40rem] -top-80 -right-96 lg:right-48 animate-spin-slow absolute bg-gradient-to-b from-[#37FF4B] via-[#92ACE0] to-[#F040C9]"
        />
      </section>
    </>
  );
};

export default function About() {
  const cursor = useCursor(({ instance }) => instance);

  return (
    <>
      <Head title="About me" />
      <BlurredBackground />

      <section className="relative p-12 w-screen min-h-screen flex flex-col">
        <Link className="absolute hidden lg:block" href="/">
          <Logo />
        </Link>

        <ContentLayout>
          <GoBack />

          <section className="mb-10 flex flex-col sm:flex-row items-start sm:items-end gap-3">
            <h2 className="font-semibold text-5xl lg:text-6xl tracking-tight block">
              About me
            </h2>
          </section>

          <section className="text-zinc-100 text-lg prose prose-sm prose-pink prose-img:rounded-xl prose-invert">
            <p>
              Hey there! My full name is <b>Harist Fadlilah</b>. You can find me
              online with my username <b>harist</b> or <b>hanifama</b>. I&apos;m a
              Fullstack Web Developer and also somewhat a Designer.
            </p>

            <h2>History</h2>

            <p>
              I began my coding journey during high school at SMKN 13 Bandung, where I majored in Software Engineering (Rekayasa Perangkat Lunak). My focus was on learning programming and computer networks, which laid a strong foundation for my interest in technology. Around 2022, I shifted towards web development and started exploring front-end technologies Javascript Framework like React.js.
            </p>

            <p>
              Currently, I am pursuing a degree in Information Systems at Universitas Ma'soem, further enhancing my skills in web development, API integration, and working with modern frameworks. Along the way, I have gained valuable experience through internships at PT. LSKK, Sagara Technology Bandung, and PT. Maxxima Innovative Engineering, where I worked on various projects ranging from smart systems to pharmacy management and attendance tracking.
            </p>


            <section id="education-experience">
              <h2>Education & Experience</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Education Section */}
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Education</h3>

                  <div className="space-y-6">
                    {/* Universitas */}
                    <div>
                      <h4 className="text-xl font-semibold text-white">Universitas Ma'soem</h4>
                      <p className="text-gray-300 font-medium">Sistem Informasi</p>
                      <p className="text-gray-400">2023 - Now</p>
                      <p className="mt-2 text-gray-200">
                        Focused on information systems, data analysis, and web development. Gained experience in various technologies such as React, Laravel, and during internships.
                      </p>
                    </div>

                    {/* SMK */}
                    <div>
                      <h4 className="text-xl font-semibold text-white">SMKN 13 Bandung</h4>
                      <p className="text-gray-300 font-medium">Rekayasa Perangkat Lunak</p>
                      <p className="text-gray-400">2020 - 2023</p>
                      <p className="mt-2 text-gray-200">
                        Specialized in software engineering, focusing on web and mobile app development, as well as hands-on projects in system design and implementation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Work Experience Section */}
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Work Experience</h3>

                  <div className="space-y-6">
                    {/* Current Internship LSKK */}
                    <div>
                      <h4 className="text-xl font-semibold text-white">PT. LSKK (Current Internship)</h4>
                      <p className="text-gray-300 font-medium">Web Developer</p>
                      <p className="text-gray-400">Ongoing</p>
                      <p className="mt-2 text-gray-200">
                        Currently working on front-end projects using React.js, enhancing user interfaces and optimizing web applications for better performance and user experience.
                      </p>
                    </div>

                    {/* Current Freelance Work */}
                    <div>
                      <h4 className="text-xl font-semibold text-white">Freelance Web Developer</h4>
                      <p className="text-gray-300 font-medium">Self-employed</p>
                      <p className="text-gray-400">Oct 2023 - Now</p>
                      <p className="mt-2 text-gray-200">
                        Currently working on various front-end projects for clients, using React.js to create dynamic and responsive user interfaces. Focused on enhancing user experience and optimizing web applications for better performance, collaborating remotely with teams when necessary.
                      </p>
                    </div>


                    {/* Internship Maxxima */}
                    <div>
                      <h4 className="text-xl font-semibold text-white">PT. Maxxima Innovative Engineering (Internship)</h4>
                      <p className="text-gray-300 font-medium">Programmer Web</p>
                      <p className="text-red-400"><span className="text-gray-400 mr-2">Aug 2022 - Oct 2023</span>3 months</p>
                      <p className="mt-2 text-gray-200">
                        Developed a web-based attendance system during the internship. Focused on integrating APIs in the front-end using Laravel to ensure smooth data flow between the client and server. Collaborated with the back-end team to implement and optimize the attendance tracking functionality.
                      </p>
                    </div>


                    {/* Internship Sagara Technology */}
                    <div>
                      <h4 className="text-xl font-semibold text-white">Sagara Technology Bandung (Internship)</h4>
                      <p className="text-gray-300 font-medium">Front-end Developer</p>
                      <p className="text-red-400"><span className="text-gray-400 mr-2">March 2023 - Mei 2023</span>3 months</p>
                      <p className="mt-2 text-gray-200">
                        Focused on developing the "Cek Toko Obat" project, primarily working on the front-end using React.js. Built user-friendly interfaces to manage pharmacy stores, ensuring responsive design and optimal performance. Collaborated with the back-end team to integrate APIs and improve the overall functionality of the platform.
                      </p>
                    </div>

                    {/* Magang LSKK */}
                    <div>
                      <h4 className="text-xl font-semibold text-white">PT. LSKK (Internship)</h4>
                      <p className="text-gray-300 font-medium">Front-end Developer</p>
                      <p className="text-red-400"><span className="text-gray-400 mr-2">Oct 2022 - March 2023</span>6 months</p>
                      <p className="mt-2 text-gray-200">
                        Worked on a variety of projects using React.js, gaining extensive experience in front-end development and collaborating with a team to deliver high-quality products.
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </section>


            <h2>Attachments</h2>

            <section className="not-prose">
              <a
                className="inline-flex items-center gap-3 font-medium border-[2px] bg-zinc-600 bg-opacity-20 hover:bg-opacity-30 border-pale-gold transition-all duration-150 ease-in-out px-3 py-2 rounded-xl text-xl"
                href="/CV.pdf"
                onMouseEnter={() => cursor?.addState('-pointer')}
                onMouseLeave={() => cursor?.removeState('-pointer')}
              >
                Curriculum Vitae
                <ArrowSquareOut size={20} />
              </a>
            </section>
          </section>

        </ContentLayout>
      </section>

      <Footer />
    </>
  );
}
