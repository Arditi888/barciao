import { AtSign, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { business, contact, mapsHref } from '../../data/business';
import { t } from '../../data/strings';
import { OpeningStatus } from '../ui/OpeningStatus';
import { Container } from '../ui/Container';
import { Wordmark } from '../ui/Wordmark';
import { topBarItems } from './navItems';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/10 pt-14 pb-28 lg:pb-14">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Wordmark className="text-[1.75rem]" withTagline />
            <div className="mt-5">
              <OpeningStatus variant="block" />
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-0.5 sm:items-end">
            {topBarItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="py-2.5 text-sm text-cream-dim/70 transition-colors duration-300 hover:text-cream"
              >
                {item.label}
              </Link>
            ))}

            <a
              href={mapsHref}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 py-2.5 text-sm text-cream-dim/70 transition-colors duration-300 hover:text-cream"
            >
              <MapPin className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              {business.location.label}
            </a>

            {contact.instagram ? (
              <a
                href={contact.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 py-2.5 text-sm text-cream-dim/70 transition-colors duration-300 hover:text-cream"
              >
                <AtSign className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                {t.visit.instagram}
              </a>
            ) : null}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/10 pt-6 text-[0.75rem] text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}
          </p>
          <p>{t.footer.builtIn}</p>
        </div>
      </Container>
    </footer>
  );
}
