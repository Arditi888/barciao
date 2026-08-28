# CIAO — Bar Ciao, Tiranë

The website for Bar Ciao: a mobile-first menu, an events board, a drink
finder and live opening hours. Built to be opened from a QR code at the
table, so the menu is one tap from anywhere and loads on a phone signal.

React · TypeScript · Vite · Tailwind CSS v4 · React Router · Lucide icons

Live at **https://arditi888.github.io/barciao/**

---

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open the address Vite prints (usually `http://localhost:5173`).

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Type-checks, then builds to `dist/` |
| `npm run preview` | Serves the built site locally |
| `npm run typecheck` | TypeScript only, no build |
| `npm run lint` | Lints the source |
| `npm run deploy` | Manual publish to GitHub Pages (the workflow is the normal route) |

---

## Everything you will want to change

All business content lives in four files under `src/data/`. **No prices,
hours, or addresses appear anywhere else in the project** — the interface
is generated from these.

### Change a price → `src/data/menu.ts`

Find the product and edit its `price`. That single number drives the menu
page, the homepage favourites and the drink-finder result.

```ts
{
  id: 'jameson',
  name: 'Jameson',
  category: 'spirits',
  subcategory: 'Irish Whiskey',
  size: '50 ml',
  price: 300,        // ← change this
}
```

Prices are plain numbers in Lek. `price: null` prints "Pyet në banak"
instead of a figure — that is what the cocktails use until you set their
real prices.

**Adding a product:** copy any object in the same category block and give
it a new, unique `id`. Optional fields:

| Field | Effect |
| --- | --- |
| `description` | A line of copy under the name |
| `size` | Serving size, e.g. `'50 ml'` |
| `options` | Variants sharing one price (the teas use this) |
| `popular: true` | Also appears under the **Popular** tab |
| `featured: true` | Eligible for the homepage favourites |
| `badges` | `'ciao-pick'`, `'premium'`, `'new'`, `'popular'` |
| `keywords` | Extra words the search should match |
| `profile` | Makes the item eligible for the drink finder (see below) |

**Antipasti** are further down the same file in the `antipasti` array —
they render as boards with their contents listed, not as single lines.

**Homepage favourites** are the `favouriteItemIds` list at the bottom of
the file. It references products by `id`, so prices there can never drift
out of sync.

### Add a match → `src/data/events.ts`

Every event on the site is a football match. Append an object; sorting,
the SOT / NESËR / KËTË JAVË grouping and the hiding of finished matches
all happen on their own.

```ts
{
  id: 'arsenal-chelsea-2026-09-06',
  competition: 'premier-league',   // champions-league | premier-league | serie-a | albania
  homeTeam: 'Arsenal',
  awayTeam: 'Chelsea',
  date: '2026-09-06',              // YYYY-MM-DD, Tirana local
  time: '17:30',                   // HH:MM Tirana, or null if kick-off is unset
  status: 'confirmed',             // or 'provisional'
  featured: true,                  // enlarges the card, promotes it on the homepage
  stage: 'Matchweek 3',            // optional line under the competition
  recommendation: {
    beer: 'Estrella Damm',
    snack: 'Proshutë crudo & Pomodorini',
  },
}
```

**The beer is type-checked.** It must be one of the five the bar stocks
— `Estrella Damm`, `Estrella Galicia`, `Estrella Galicia 500 ml`,
`Peroni Nastro Azzurro`, `Corona`. Anything else fails `npm run build`,
so the site can never recommend a beer you do not sell.

**The snack** is built from antipasti ingredients already behind the
bar: Salçiçe e thatë · Sallam · Djathë i bardhë · Cheddar · Parmesan ·
Mix djathërash · Trio djathërash · Proshutë crudo · Speck · Ullinj ·
Patatina · Krikera · Nachos me salcë · Pomodorini · Rrush i thatë ·
Bukë artizanale. No cooking required.

**`status`** is the honesty switch. `confirmed` means the competition
has published both the date and the kick-off time. `provisional` means
the fixture is real but the day or time can still move — the card then
shows "Data mund të ndryshojë", and a `null` time shows "Ora
konfirmohet së shpejti" instead of a made-up kick-off.

**Finished matches** disappear from the site three hours after kick-off.
Leave them in the file; nothing needs deleting.

#### What is in the calendar right now

| Competition | Matches | Dates |
| --- | --- | --- |
| Premier League | 9 | confirmed date **and** kick-off, from the live-TV selections |
| Shqipëria | 6 | confirmed — the full Nations League C group stage |
| Serie A | 3 | date confirmed, kick-off still to be set (`provisional`) |
| Champions League | 0 | see below |

**Champions League is deliberately empty.** The league-phase draw was
made on 27 August 2026, so the pairings exist, but UEFA does not publish
which match is played on which day, or at what time, until the fixture
list is released on **29 August 2026**. Adding fixtures before then
would mean inventing dates. `events.ts` ends with a commented template
and the six matchday windows — paste the real fixtures in and they
appear on the site immediately, with no code changes.

### Change opening hours → `src/data/business.ts`

```ts
export const openingHours: OpeningHours = {
  0: { open: '09:00', close: '22:00' },   // Sunday
  1: { open: '08:00', close: '23:00' },   // Monday
  // …
  6: { open: '09:00', close: '00:00' },   // Saturday
};
```

`0` is Sunday through `6` for Saturday. Use `null` for a day the bar is
closed. A `close` of `'00:00'` means midnight at the end of that day, and
past-midnight closing times are handled correctly.

Everything else follows automatically: the open/closed indicator in the
navigation, the hero, the homepage hours card, the Visit page table, the
footer, and the opening hours published to search engines.

Hours are always evaluated in **Europe/Tirane**, never the visitor's
device timezone — a phone set to another country still shows the truth.
`closingSoonMinutes` (default 45) controls when the status switches to
"Mbyllet së shpejti".

### Location → `src/data/business.ts`

```ts
location: {
  latitude: 41.3228941,
  longitude: 19.8100468,
  googleMapsUrl: 'https://maps.app.goo.gl/1QGf1qvdp9FnW6HT6',
  label: 'Bar Ciao • Tirana',
},
```

These three values drive every map link on the site: the homepage
location card, the map panel, the Visit page, the footer, and the
"Hape në Google Maps" / "Merr drejtimet" buttons inside each match. The
directions link is built from the coordinates, so it opens turn-by-turn
navigation straight to the bar. The same coordinates are published to
search engines as the bar's `geo` position.

`label` is what appears wherever a street address would go. Fill in
`contact.addressLine` below and that replaces it.

### Phone, socials → `src/data/business.ts`

```ts
export const contact: ContactConfig = {
  addressLine: '',        // street address
  addressArea: 'Tiranë, Shqipëri',
  latitude: 41.3275,      // used for the map link
  longitude: 19.8187,
  googleMapsUrl: '',      // paste the share link from Google Maps
  instagram: '',
  facebook: '',
  phone: '',
  whatsapp: '',
  email: '',
};
```

**Leave anything blank and its row simply does not render.** There are no
dead links or placeholder buttons anywhere on the site. Fill in
`instagram` and the Instagram links appear in the footer and on the Visit
page; fill in `phone` and a tap-to-call row appears.

Wi-Fi details are deliberately not part of this configuration and are not
published anywhere on the site.

### Interface wording → `src/data/strings.ts`

Every customer-facing string that is not business data — button labels,
headings, empty states, page titles and meta descriptions. The file is
one flat object with English keys and Albanian values, so a second
language can be added later by exporting a second object of the same
shape.

---

## Images

Drop files into `public/images/` and point the configuration at them:

```
public/images/
  hero/         backdrop behind the homepage hero
  bar/          room shots, and the social-sharing image
  drinks/       product photography
  events/       event backgrounds
  antipasti/    board photography
```

Then in `src/data/business.ts`:

```ts
export const images: ImageConfig = {
  hero: '/images/hero/your-file.jpg',
  visit: '/images/bar/your-file.jpg',
};
```

Both are optional. While `hero` is empty the homepage renders a designed
atmospheric background instead — no stock photography, and nothing looks
unfinished. Event images are set per event via the `image` field.

For link previews, add a 1200×630 image at `public/images/bar/og.jpg`
(already referenced by `index.html`). For the iOS home-screen icon, add a
180×180 `public/apple-touch-icon.png`. The browser tab icon
(`public/favicon.svg`) is already in place.

---

## Deploy to GitHub Pages

Deployment is automatic. **Every push to `main` builds and publishes the
site** through `.github/workflows/deploy.yml`, which runs `npm ci`, then
`npm run build`, then uploads `dist/` to GitHub Pages. Progress is
visible under the repository's **Actions** tab, and a deploy can be
re-run by hand from there without a new commit.

```bash
git add -A && git commit -m "Update menu prices" && git push
```

That is the whole publishing process.

`npm run deploy` still exists as a manual fallback (it pushes `dist/` to
a `gh-pages` branch via the `gh-pages` package), but it is not needed
while the workflow is active — and mixing the two means whichever ran
last wins.

**Base path.** The site lives at `/barciao/`, not at the domain root, so
`vite.config.ts` sets `base: '/barciao/'`. Every built asset URL is
emitted with that prefix. If the repository is ever renamed, or moved to
a custom domain, that one value has to change with it.

**Routing.** The site uses hash routing (`/barciao/#/menu`), which works
on GitHub Pages with no server configuration and never 404s on a refresh
or a shared link. `public/404.html` additionally catches bare paths, so
someone who types `/barciao/menu` is redirected to `/barciao/#/menu`. If
you move to a **custom domain or a user page**, change `SEGMENTS_TO_KEEP`
in that file from `1` to `0`.

**Point your QR code at `https://arditi888.github.io/barciao/#/menu`** so
a guest lands directly on the menu, without passing through the
homepage.

---

## How it is put together

```
src/
  components/
    layout/     navigation, mobile tab bar, footer, page shell
    home/       the homepage sections, in page order
    menu/       category tabs, product rows, antipasto and drink cards
    events/     match poster card, detail modal, match pick
    quiz/       the drink finder's steps, progress and result
    ui/         Button, Badge, Container, EmptyState, OpeningStatus,
                PageHeader, Reveal, SectionHeader, Wordmark
    visit/      hours table, contact rows, map panel
  pages/        one file per route
  data/         business.ts · menu.ts · events.ts · quiz.ts · strings.ts
  hooks/        opening status, session state, scroll, scroll-lock, SEO
  utils/        openingHours · date · drinkRecommendation · search ·
                format · structuredData
  types/        every shared type
```

**Design tokens** live in `src/index.css` under `@theme` — colours,
the two type families, radii, easings. Components use those tokens
through Tailwind utilities rather than hard-coded values, so changing
the accent colour is one line.

**The drink finder** scores every product that has a `profile` against
the five answers, using the weights at the top of
`src/utils/drinkRecommendation.ts`. It is deterministic and entirely
local — the same answers always give the same result, and there is no
API involved. Alcohol is a hard filter; mood weighs most, then flavour
and strength, then the occasion. To make a new product recommendable,
give it a `profile` in `menu.ts`.

**The football calendar** lives entirely in `src/data/events.ts`. The
UI derives everything else: SOT / NESËR / KËTË JAVË come from the date
in Europe/Tirane, matches sort chronologically (a featured December
fixture never jumps above tomorrow's game), and each card carries its
own Ciao Match Pick. Tapping a card opens the full match with the
kick-off, the bar's opening status, the pairing and the map links. No
club crests are used anywhere — the typography carries it.

**Menu search** matches names, drink types, categories, descriptions,
serving sizes and hand-written keywords, and folds Albanian diacritics —
so `vere` finds *Verë*, `proshute` finds the boards containing
*Proshutë*, and `gin` finds Bombay, Hendrick's, Tanqueray and Gin &
Tonic.

**Performance.** Routes beyond the homepage and menu load on demand.
There is no animation library: every transition is CSS, so nothing on
screen waits for JavaScript to animate it, and the runtime dependencies
are just React, React Router and Lucide. First load is about 106 kB
gzipped including HTML and CSS.

**Why the animations are CSS.** Content transitions — switching a menu
category, filtering events, moving through the drink finder — swap
synchronously when React re-renders, and the fade is layered on top as
decoration. Nothing that carries content is gated behind an animation
finishing, so a stalled or throttled frame loop can never leave a stale
panel on screen or hide a section.

**Accessibility.** Semantic landmarks, a skip link, keyboard-operable
menu tabs with arrow-key support, visible focus rings, labelled
controls, and `prefers-reduced-motion` honoured throughout. All text
meets WCAG AA contrast on the dark background.
