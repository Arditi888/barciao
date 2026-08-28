import type { FootballEvent } from '../types';

/* ==================================================================
   BAR CIAO — FOOTBALL CALENDAR

   Every event on the site is a football match. To add one, append an
   object to the array below. Nothing in the UI needs touching.

   REQUIRED
     id            unique, kebab-case, e.g. 'arsenal-chelsea-2026-09-06'
     competition   'champions-league' | 'premier-league' | 'serie-a' | 'albania'
     homeTeam      as printed on the card
     awayTeam      as printed on the card
     date          'YYYY-MM-DD', Tirana local
     time          'HH:MM' Tirana local, or null when kick-off is unset
     status        'confirmed' (date AND time published)
                   'provisional' (fixture official, day or time can move)
     featured      true promotes it on the homepage and enlarges the card
     recommendation  { beer, snack }  — the Ciao Match Pick

   OPTIONAL
     stage         e.g. 'Matchday 1', 'Giornata 10', 'Group C1'
     source        where the date came from, for future maintenance

   THE BEER must be one of the five the bar stocks. It is a typed union
   (`BeerChoice`), so a beer that is not on the menu fails `npm run build`:
     'Estrella Damm' | 'Estrella Galicia' | 'Estrella Galicia 500 ml'
     | 'Peroni Nastro Azzurro' | 'Corona'

   THE SNACK is built from antipasti ingredients already in the bar:
     Salçiçe e thatë · Sallam · Djathë i bardhë · Cheddar · Parmesan
     Mix djathërash · Trio djathërash · Proshutë crudo · Speck · Ullinj
     Patatina · Krikera · Nachos me salcë · Pomodorini · Rrush i thatë
     Bukë artizanale

   Past matches disappear from the site on their own — leave them here.

   ------------------------------------------------------------------
   ON DATES: every fixture below was checked against the competition's
   published schedule. Nothing here is guessed. Where a kick-off time
   has not been released, `time` is null and `status` is 'provisional'
   rather than a made-up time.
   ------------------------------------------------------------------ */

export const events: FootballEvent[] = [
  /* ----------------------------------------------------------------
     PREMIER LEAGUE — dates and kick-off times from the live-broadcast
     selections, converted from UK time to Tirana (UK + 1 hour).
     ---------------------------------------------------------------- */
  {
    id: 'tottenham-newcastle-2026-08-29',
    competition: 'premier-league',
    homeTeam: 'Tottenham',
    awayTeam: 'Newcastle',
    date: '2026-08-29',
    time: '18:30',
    status: 'confirmed',
    featured: false,
    stage: 'Matchweek 2',
    source: 'Sky Sports live TV selections, 2026/27',
    recommendation: { beer: 'Estrella Damm', snack: 'Salçiçe e thatë & Patatina' },
  },
  {
    id: 'aston-villa-arsenal-2026-08-31',
    competition: 'premier-league',
    homeTeam: 'Aston Villa',
    awayTeam: 'Arsenal',
    date: '2026-08-31',
    time: '21:00',
    status: 'confirmed',
    featured: false,
    stage: 'Matchweek 2',
    source: 'Sky Sports live TV selections, 2026/27',
    recommendation: { beer: 'Peroni Nastro Azzurro', snack: 'Parmesan & Ullinj' },
  },
  {
    id: 'ipswich-liverpool-2026-09-04',
    competition: 'premier-league',
    homeTeam: 'Ipswich Town',
    awayTeam: 'Liverpool',
    date: '2026-09-04',
    time: '21:00',
    status: 'confirmed',
    featured: false,
    stage: 'Matchweek 3',
    source: 'Sky Sports live TV selections, 2026/27',
    recommendation: { beer: 'Corona', snack: 'Nachos me salcë' },
  },
  {
    id: 'everton-man-utd-2026-09-06',
    competition: 'premier-league',
    homeTeam: 'Everton',
    awayTeam: 'Manchester United',
    date: '2026-09-06',
    time: '15:00',
    status: 'confirmed',
    featured: false,
    stage: 'Matchweek 3',
    source: 'Sky Sports live TV selections, 2026/27',
    recommendation: { beer: 'Estrella Galicia', snack: 'Cheddar & Krikera' },
  },
  {
    id: 'arsenal-chelsea-2026-09-06',
    competition: 'premier-league',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    date: '2026-09-06',
    time: '17:30',
    status: 'confirmed',
    featured: true,
    stage: 'Matchweek 3',
    source: 'Sky Sports live TV selections, 2026/27',
    recommendation: { beer: 'Estrella Damm', snack: 'Proshutë crudo & Pomodorini' },
  },
  {
    id: 'man-utd-man-city-2026-09-13',
    competition: 'premier-league',
    homeTeam: 'Manchester United',
    awayTeam: 'Manchester City',
    date: '2026-09-13',
    time: '17:30',
    status: 'confirmed',
    featured: true,
    stage: 'Matchweek 4 · Derbi i Mançesterit',
    source: 'Sky Sports live TV selections, 2026/27',
    recommendation: { beer: 'Peroni Nastro Azzurro', snack: 'Sallam & Djathë i bardhë' },
  },
  {
    id: 'brentford-chelsea-2026-09-18',
    competition: 'premier-league',
    homeTeam: 'Brentford',
    awayTeam: 'Chelsea',
    date: '2026-09-18',
    time: '21:00',
    status: 'confirmed',
    featured: false,
    stage: 'Matchweek 5',
    source: 'Sky Sports live TV selections, 2026/27',
    recommendation: { beer: 'Estrella Galicia 500 ml', snack: 'Patatina & Ullinj' },
  },
  {
    id: 'bournemouth-liverpool-2026-09-20',
    competition: 'premier-league',
    homeTeam: 'Bournemouth',
    awayTeam: 'Liverpool',
    date: '2026-09-20',
    time: '15:00',
    status: 'confirmed',
    featured: false,
    stage: 'Matchweek 5',
    source: 'Sky Sports live TV selections, 2026/27',
    recommendation: { beer: 'Corona', snack: 'Mix djathërash & Krikera' },
  },
  {
    id: 'fulham-man-utd-2026-09-20',
    competition: 'premier-league',
    homeTeam: 'Fulham',
    awayTeam: 'Manchester United',
    date: '2026-09-20',
    time: '17:30',
    status: 'confirmed',
    featured: false,
    stage: 'Matchweek 5',
    source: 'Sky Sports live TV selections, 2026/27',
    recommendation: { beer: 'Estrella Damm', snack: 'Speck & Bukë artizanale' },
  },

  /* ----------------------------------------------------------------
     SHQIPËRIA — UEFA Nations League 2026/27, League C, Group C1
     against Finland, Belarus and San Marino. Dates and kick-off times
     are published; times below are Tirana local.
     ---------------------------------------------------------------- */
  {
    id: 'albania-belarus-2026-09-26',
    competition: 'albania',
    homeTeam: 'Shqipëria',
    awayTeam: 'Bjellorusia',
    date: '2026-09-26',
    time: '20:45',
    status: 'confirmed',
    featured: true,
    stage: 'Nations League C · Grupi C1 · Arena Kombëtare',
    source: 'UEFA Nations League 2026/27 League C fixtures',
    recommendation: { beer: 'Estrella Galicia', snack: 'Salçiçe e thatë & Djathë i bardhë' },
  },
  {
    id: 'san-marino-albania-2026-09-29',
    competition: 'albania',
    homeTeam: 'San Marino',
    awayTeam: 'Shqipëria',
    date: '2026-09-29',
    time: '20:45',
    status: 'confirmed',
    featured: false,
    stage: 'Nations League C · Grupi C1',
    source: 'UEFA Nations League 2026/27 League C fixtures',
    recommendation: { beer: 'Peroni Nastro Azzurro', snack: 'Nachos me salcë' },
  },
  {
    id: 'finland-albania-2026-10-03',
    competition: 'albania',
    homeTeam: 'Finlanda',
    awayTeam: 'Shqipëria',
    date: '2026-10-03',
    time: '15:00',
    status: 'confirmed',
    featured: true,
    stage: 'Nations League C · Grupi C1',
    source: 'UEFA Nations League 2026/27 League C fixtures',
    recommendation: { beer: 'Corona', snack: 'Pomodorini & Parmesan' },
  },
  {
    id: 'albania-san-marino-2026-10-06',
    competition: 'albania',
    homeTeam: 'Shqipëria',
    awayTeam: 'San Marino',
    date: '2026-10-06',
    time: '20:45',
    status: 'confirmed',
    featured: false,
    stage: 'Nations League C · Grupi C1 · Arena Kombëtare',
    source: 'UEFA Nations League 2026/27 League C fixtures',
    recommendation: { beer: 'Estrella Galicia 500 ml', snack: 'Sallam & Patatina' },
  },
  {
    id: 'albania-finland-2026-11-12',
    competition: 'albania',
    homeTeam: 'Shqipëria',
    awayTeam: 'Finlanda',
    date: '2026-11-12',
    time: '20:45',
    status: 'confirmed',
    featured: true,
    stage: 'Nations League C · Grupi C1 · Arena Kombëtare',
    source: 'UEFA Nations League 2026/27 League C fixtures',
    recommendation: { beer: 'Estrella Damm', snack: 'Trio djathërash & Rrush i thatë' },
  },
  {
    id: 'belarus-albania-2026-11-15',
    competition: 'albania',
    homeTeam: 'Bjellorusia',
    awayTeam: 'Shqipëria',
    date: '2026-11-15',
    time: '18:00',
    status: 'confirmed',
    featured: false,
    stage: 'Nations League C · Grupi C1',
    source: 'UEFA Nations League 2026/27 League C fixtures',
    recommendation: { beer: 'Corona', snack: 'Ullinj & Krikera' },
  },

  /* ----------------------------------------------------------------
     SERIE A — the round dates are published, but Lega Serie A confirms
     the exact day and kick-off time of each match only a few rounds in
     advance. These are marked provisional with no invented time.
     ---------------------------------------------------------------- */
  {
    id: 'milan-inter-2026-11-01',
    competition: 'serie-a',
    homeTeam: 'Milan',
    awayTeam: 'Inter',
    date: '2026-11-01',
    time: null,
    status: 'provisional',
    featured: true,
    stage: 'Giornata 10 · Derby della Madonnina',
    source: 'Lega Serie A 2026/27 calendar draw, 5 June 2026',
    recommendation: { beer: 'Peroni Nastro Azzurro', snack: 'Proshutë crudo & Parmesan' },
  },
  {
    id: 'juventus-napoli-2026-11-01',
    competition: 'serie-a',
    homeTeam: 'Juventus',
    awayTeam: 'Napoli',
    date: '2026-11-01',
    time: null,
    status: 'provisional',
    featured: true,
    stage: 'Giornata 10',
    source: 'Lega Serie A 2026/27 calendar draw, 5 June 2026',
    recommendation: { beer: 'Estrella Damm', snack: 'Mix djathërash & Pomodorini' },
  },
  {
    id: 'lazio-roma-2026-12-13',
    competition: 'serie-a',
    homeTeam: 'Lazio',
    awayTeam: 'Roma',
    date: '2026-12-13',
    time: null,
    status: 'provisional',
    featured: true,
    stage: 'Giornata 15 · Derby della Capitale',
    source: 'Lega Serie A 2026/27 calendar draw, 5 June 2026',
    recommendation: { beer: 'Peroni Nastro Azzurro', snack: 'Speck & Bukë artizanale' },
  },

  /* ----------------------------------------------------------------
     CHAMPIONS LEAGUE — league phase, 2026/27.

     The draw was made on 27 August 2026, so the opponents are known,
     but UEFA does not publish which match is played on which day, or
     at what time, until the fixture list is released on 29 August 2026.
     No Champions League fixture is listed here because doing so would
     mean inventing a date.

     To add them once UEFA publishes the schedule, copy this shape —
     one object per match, appended to this same array:

     {
       id: 'real-madrid-liverpool-2026-09-09',
       competition: 'champions-league',
       homeTeam: 'Real Madrid',
       awayTeam: 'Liverpool',
       date: '2026-09-09',          // from the UEFA fixture list
       time: '21:00',               // 18:45 or 21:00 Tirana time
       status: 'confirmed',
       featured: true,
       stage: 'Matchday 1',
       source: 'UEFA fixture list',
       recommendation: { beer: 'Corona', snack: 'Nachos me salcë' },
     },

     The league-phase matchday windows are:
       Matchday 1   8–10 September 2026
       Matchday 2   13–14 October 2026
       Matchday 3   20–21 October 2026
       Matchday 4   3–4 November 2026
       Matchday 5   24–25 November 2026
       Matchday 6   8–9 December 2026
     ---------------------------------------------------------------- */
];
