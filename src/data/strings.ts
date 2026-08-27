/* ==================================================================
   BAR CIAO — INTERFACE COPY

   Every customer-facing string that is not business data lives here.
   The shape is deliberately flat and English-keyed so a second
   language can be added later by exporting a second object of the
   same type and choosing between them at the root.
   ================================================================== */

export const t = {
  nav: {
    home: 'Home',
    menu: 'Menu',
    events: 'Evente',
    findDrink: 'Gjej pijen',
    visit: 'Vizito',
    openMenu: 'Hap menunë',
    closeMenu: 'Mbyll menunë',
    primary: 'Navigimi kryesor',
  },

  hero: {
    tagline: 'Bari yt i lagjes në Tiranë.',
    lines: ['Kafe në mëngjes.', 'Pije pas pune.', 'Netë të mira me njerëz të mirë.'],
    primaryCta: 'Shiko menunë',
    secondaryCta: 'Çfarë po ndodh sonte?',
    scroll: 'Zbrit',
  },

  quickActions: {
    eyebrow: 'Shkurtore',
    title: 'Nga ku do të fillosh?',
    menu: { title: 'Menu', caption: 'Pije, kafe dhe antipasta' },
    events: { title: 'Evente', caption: 'Futboll, muzikë, mbrëmje' },
    findDrink: { title: 'Gjej pijen', caption: 'Pesë pyetje, një përgjigje' },
    hours: { title: 'Orari', caption: 'Kur jemi hapur' },
    location: { title: 'Ku jemi', caption: 'Na gjej në hartë' },
  },

  tonight: {
    eyebrow: 'Sonte në Ciao',
    all: 'Shiko të gjitha eventet',
    emptyTitle: 'Nuk ke plane sonte?',
    emptyBody: 'Ciao tingëllon mirë.',
    emptyCta: 'Shiko menunë',
    liveAt: 'Live në Ciao',
  },

  favourites: {
    eyebrow: 'Ciao Favourites',
    title: 'Ato që porositen më shpesh',
    caption: 'Një pikënisje e sigurt, në çdo orë të ditës.',
    cta: 'Shiko menunë e plotë',
  },

  findDrink: {
    eyebrow: 'Gjej pijen tënde',
    title: 'Nuk je i sigurt çfarë të porositësh?',
    caption: 'Përgjigju disa pyetjeve. Pjesën e vështirë e marrim ne.',
    cta: 'Gjej pijen time',
    progress: (current: number, total: number) => `${current} / ${total}`,
    back: 'Kthehu',
    restart: 'Provo përsëri',
    resultEyebrow: 'Zgjedhja jote Ciao',
    looseMatch: 'Më e afërta që kemi për ty',
    viewInMenu: 'Shiko në menu',
    alternativesTitle: 'Mund të të pëlqejnë edhe',
    close: 'Mbyll',
  },

  mood: {
    eyebrow: 'Ciao Mood',
    lines: [
      'Espresso në mëngjes.',
      'Biseda pasdite.',
      'Netë futbolli.',
      'Birrë e ftohtë.',
      'Muzikë e mirë.',
      'Edhe një raund.',
    ],
    closing: 'Takohemi te Ciao.',
  },

  visit: {
    eyebrow: 'Na vizito',
    title: 'Vizito Ciao',
    caption: 'Në zemër të Tiranës, hapur nga mëngjesi deri natën.',
    hours: 'Orari',
    address: 'Adresa',
    contact: 'Kontakt',
    maps: 'Hape në Google Maps',
    instagram: 'Instagram',
    phone: 'Telefono',
    whatsapp: 'WhatsApp',
    today: 'Sot',
    addressPending: 'Adresa e plotë vjen së shpejti.',
    mapPending: 'Harta shtohet sapo të konfigurohet vendndodhja.',
  },

  menu: {
    title: 'Menu',
    caption: 'Të gjitha çmimet në Lek.',
    searchLabel: 'Kërko në menu',
    searchPlaceholder: 'Kërko në menu...',
    clearSearch: 'Pastro kërkimin',
    resultsFor: (query: string) => `Rezultate për “${query}”`,
    resultCount: (count: number) => (count === 1 ? '1 rezultat' : `${count} rezultate`),
    emptyTitle: 'Nuk gjetëm asgjë.',
    emptyBody: 'Provo një kërkim tjetër.',
    categoriesLabel: 'Kategoritë e menusë',
    placeholderPrice: 'Pyet në banak',
    options: 'Në dispozicion',
    serves: 'Për',
  },

  events: {
    title: 'Evente',
    caption: 'Futboll, muzikë dhe mbrëmje në Ciao.',
    filterAll: 'Të gjitha',
    filterSport: 'Sport',
    filterMusic: 'Muzikë',
    filterSpecial: 'Speciale',
    showPast: 'Shfaq eventet e kaluara',
    hidePast: 'Fshih eventet e kaluara',
    pastTitle: 'Ka kaluar',
    emptyTitle: 'Ende asgjë e planifikuar.',
    emptyBody: 'Kthehu së shpejti.',
    emptyFilterTitle: 'Asnjë event në këtë kategori.',
    emptyFilterBody: 'Provo një filtër tjetër.',
    addToCalendar: 'Shto në kalendar',
    live: 'Live në Ciao',
  },

  seo: {
    home: {
      title: 'Bar Ciao | Kafe, pije dhe mbrëmje të mira në Tiranë',
      description:
        'Bar Ciao në Tiranë — kafe, cocktails, birra, verë, netë futbolli dhe shoqëri e mirë. Shiko menunë dhe eventet e ardhshme.',
    },
    menu: {
      title: 'Menu | Bar Ciao Tiranë',
      description:
        'Menuja e plotë e Bar Ciao: kafe, birra, verë, cocktails, pije alkoolike, shots, antipasta dhe pije pa alkool. Çmimet në Lek.',
    },
    events: {
      title: 'Evente | Bar Ciao Tiranë',
      description:
        'Ndeshje futbolli, mbrëmje muzikore dhe evente speciale në Bar Ciao, Tiranë. Shiko çfarë po ndodh këtë javë.',
    },
    findDrink: {
      title: 'Gjej pijen tënde | Bar Ciao Tiranë',
      description:
        'Nuk je i sigurt çfarë të porositësh? Pesë pyetje dhe të sugjerojmë pijen e duhur nga menuja e Bar Ciao.',
    },
    visit: {
      title: 'Vizito | Bar Ciao Tiranë',
      description: 'Orari, adresa dhe kontaktet e Bar Ciao në Tiranë.',
    },
    notFound: {
      title: 'Faqja nuk u gjet | Bar Ciao',
      description: 'Kjo faqe nuk ekziston.',
    },
  },

  eventTypes: {
    sport: 'Sport',
    music: 'Muzikë',
    special: 'Speciale',
  },

  badges: {
    popular: 'Popular',
    'ciao-pick': 'Ciao Pick',
    new: 'E re',
    premium: 'Premium',
    placeholder: 'Së shpejti',
  },

  status: {
    open: 'Hapur',
    closingSoon: 'Mbyllet së shpejti',
    closed: 'Mbyllur',
  },

  footer: {
    rights: '© Bar Ciao',
    builtIn: 'Tiranë, Shqipëri',
  },

  notFound: {
    title: 'Kjo faqe nuk ekziston.',
    body: 'Por menuja po të pret.',
    cta: 'Shko te menuja',
  },

  common: {
    skipToContent: 'Kalo te përmbajtja',
    back: 'Kthehu',
  },
} as const;
