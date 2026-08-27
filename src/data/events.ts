import type { CiaoEvent } from '../types';

/* ==================================================================
   BAR CIAO — EVENTS

   Add an event by appending an object to the array below. Order does
   not matter; the site sorts by date and time and hides past events
   automatically.

   Required : id, title, type, date (YYYY-MM-DD), time (HH:MM, 24h)
   Optional : description, featured, teams, image, cta

   `type` is one of: 'sport' | 'music' | 'special'
   `teams` turns a sport event into the large match card.
   `featured: true` promotes the event on the homepage.
   `image` is a path under public/images/events/, e.g. '/images/events/dj.jpg'

   The entries below are seed data — replace them with real ones.
   ================================================================== */

export const events: CiaoEvent[] = [
  {
    id: 'champions-league-night',
    title: 'Champions League',
    type: 'sport',
    date: '2026-08-27',
    time: '21:00',
    description: 'Ndeshjet e mbrëmjes në ekran të madh. Eja herët për tavolinë.',
    featured: true,
    cta: { label: 'Shiko menunë', to: '/menu' },
  },
  {
    id: 'aperol-night',
    title: 'Aperol Night',
    type: 'special',
    date: '2026-08-28',
    time: '20:00',
    description: 'Mbrëmje aperitivi. Spritz, muzikë e qetë dhe antipasta në tavolinë.',
    featured: true,
    cta: { label: 'Shiko antipastat', to: '/menu' },
  },
  {
    id: 'vinyl-saturday',
    title: 'Vinyl Saturday',
    type: 'music',
    date: '2026-08-29',
    time: '21:00',
    description: 'Disqe nga banaku deri në mbyllje. Pa listë, pa nxitim.',
  },
  {
    id: 'sunday-slow',
    title: 'Sunday Slow',
    type: 'music',
    date: '2026-08-30',
    time: '18:00',
    description: 'Muzikë e ngadaltë, kafe e gjatë dhe biseda pa orar.',
  },
  {
    id: 'aperitivo-friday',
    title: 'Aperitivo Friday',
    type: 'special',
    date: '2026-09-04',
    time: '19:00',
    description: 'Java mbyllet me një gotë. Nga ora 19:00 e tutje.',
  },
  {
    id: 'summer-closing-set',
    title: 'Summer Closing Set',
    type: 'music',
    date: '2026-08-22',
    time: '21:00',
    description: 'Mbyllja e verës me disqe deri vonë.',
  },
  {
    id: 'juventus-inter',
    title: 'Juventus vs Inter',
    type: 'sport',
    date: '2026-09-13',
    time: '20:45',
    description: 'Derbi d’Italia, live në Ciao.',
    featured: true,
    teams: { home: 'Juventus', away: 'Inter', competition: 'Serie A' },
  },
];
