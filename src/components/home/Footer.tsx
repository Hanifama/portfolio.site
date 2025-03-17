import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowRight } from '@phosphor-icons/react';
import RatingSystem from '../ratingSystem';

export default function Footer() {
  return (
    <footer
      id="footer" 
      className="p-12 w-screen h-[26rem] flex flex-col justify-between"
    >
      <section>
        <h2 className="text-5xl sm:text-7xl font-medium tracking-tight mb-4">
          Wanna talk?
        </h2>

        <section className="flex gap-3 items-center">
          <ArrowRight
            weight="bold"
            className="text-light-gold text-2xl md:text-3xl flex-shrink-0"
          />
          <a
            href="mailto:haristfhorison@gmail.com"
            className="text-2xl sm:text-3xl text-washed-purple"
          >
            haristfhorison@gmail.com
          </a>
        </section>
      </section>

      <section className="flex justify-between gap-4 items-end">
        <p className="text-sm sm:text-base text-zinc-500 bg-blend-difference">
          &copy; {new Date().getFullYear()} Haristfh All rights reserved.
        </p>

        <section className="text-3xl flex gap-4 items-center text-zinc-200">
          <a
            href="https://www.linkedin.com/in/haristfh/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </section>
      </section>

      <RatingSystem />
    </footer>
  );
}
