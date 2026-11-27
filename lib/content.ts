export type Lang = "en" | "tr" | "de";
export const langs: Lang[] = ["en", "tr", "de"];
type T = Record<Lang, string>;

export const profile = {
  name: "Huseyin Sade",
  email: "info@huseyinsade.dev",
  github: "https://github.com/hseyinsade",
  githubHandle: "hseyinsade",
  linkedin: "https://www.linkedin.com/in/huseyinsade",
  linkedinHandle: "huseyinsade",
  startYear: 2018,
};

export const ui = {
  nav: {
    work: { en: "Work", tr: "Projeler", de: "Projekte" },
    experience: { en: "Experience", tr: "Deneyim", de: "Erfahrung" },
    stack: { en: "Stack", tr: "Teknolojiler", de: "Stack" },
    contact: { en: "Contact", tr: "İletişim", de: "Kontakt" },
  },
  skip: { en: "Skip to content", tr: "İçeriğe geç", de: "Zum Inhalt springen" },
  consent: {
    title: { en: "Cookies", tr: "Çerezler", de: "Cookies" },
    text: {
      en: "I use Google Analytics to see how many people visit and what they click. Analytics cookies are only set if you allow them.",
      tr: "Siteyi kaç kişinin ziyaret ettiğini ve nelere tıklandığını görmek için Google Analytics kullanıyorum. Analitik çerezleri yalnızca izin verirsen kullanılır.",
      de: "Ich nutze Google Analytics, um zu sehen, wie viele Menschen die Seite besuchen und worauf sie klicken. Analyse-Cookies werden nur gesetzt, wenn Sie zustimmen.",
    },
    accept: { en: "Allow", tr: "İzin ver", de: "Zulassen" },
    reject: { en: "Decline", tr: "Reddet", de: "Ablehnen" },
    settings: { en: "Cookie settings", tr: "Çerez tercihleri", de: "Cookie-Einstellungen" },
  },
  inspect: { en: "Inspect", tr: "İncele", de: "Untersuchen" },
  inspectHint: {
    en: "Inspect mode on — hover anything. Press I to exit.",
    tr: "İnceleme modu açık — bir öğenin üzerine gel. Çıkmak için I.",
    de: "Untersuchen-Modus aktiv — fahren Sie über ein Element. Mit I beenden.",
  },
  hero: {
    eyebrow: { en: "Frontend Developer · Istanbul, TR", tr: "Frontend Developer · İstanbul", de: "Frontend Developer · Istanbul, TR" },
    title1: { en: "I build the interfaces", tr: "Dinlediğin, izlediğin,", de: "Ich baue Interfaces" },
    title2: { en: "people stream, shop", tr: "alışveriş yaptığın", de: "für Streaming, Shopping" },
    title3: { en: "and play on.", tr: "arayüzleri kodluyorum.", de: "und Spiele." },
    lead: {
      en: "Computer engineer focused on React, Next.js and TypeScript. I've shipped music & video streaming, e-commerce and telecom products — and I care as much about architecture, tests and code quality as I do about pixels.",
      tr: "React, Next.js ve TypeScript odaklı bilgisayar mühendisiyim. Müzik ve video yayın, e-ticaret ve telekom ürünleri geliştirdim; mimariye, teste ve kod kalitesine de pikseller kadar önem veriyorum.",
      de: "Informatikingenieur mit Fokus auf React, Next.js und TypeScript. Ich habe Musik- und Video-Streaming-, E-Commerce- und Telekommunikationsprodukte ausgeliefert — und mir sind Architektur, Tests und Codequalität genauso wichtig wie Pixel.",
    },
    ctaPrimary: { en: "Get in touch", tr: "İletişime geç", de: "Kontakt aufnehmen" },
    ctaSecondary: { en: "See my work", tr: "Projelere göz at", de: "Projekte ansehen" },
    now: { en: "Now", tr: "Şu an", de: "Jetzt" },
    nowText: {
      en: "Building fizy at Atmosware — Turkcell Group",
      tr: "Atmosware'de fizy'yi geliştiriyorum — Turkcell Grubu",
      de: "Entwickle fizy bei Atmosware — Turkcell-Gruppe",
    },
  },
  stats: [
    { value: "7+", label: { en: "years shipping UI", tr: "yıl arayüz geliştirme", de: "Jahre UI-Entwicklung" } },
    { value: "6", label: { en: "companies", tr: "şirket", de: "Unternehmen" } },
    { value: "8+", label: { en: "products in production", tr: "canlıdaki ürün", de: "Produkte live" } },
    { value: "4", label: { en: "frameworks in prod", tr: "framework (canlıda)", de: "Frameworks im Einsatz" } },
  ],
  sections: {
    work: { en: "Selected work", tr: "Seçili projeler", de: "Ausgewählte Projekte" },
    workSub: {
      en: "Products I've helped build — from streaming platforms to marketplaces.",
      tr: "Yayın platformlarından pazaryerlerine, geliştirmesinde yer aldığım ürünler.",
      de: "Produkte, an denen ich mitgearbeitet habe — von Streaming-Plattformen bis zu Marktplätzen.",
    },
    experience: { en: "Experience", tr: "Deneyim", de: "Erfahrung" },
    experienceSub: {
      en: "Where I've worked and what I owned there.",
      tr: "Çalıştığım yerler ve oradaki sorumluluklarım.",
      de: "Wo ich gearbeitet habe und wofür ich verantwortlich war.",
    },
    stack: { en: "Stack", tr: "Teknolojiler", de: "Stack" },
    stackSub: {
      en: "Tools I reach for, grouped by what they solve.",
      tr: "Kullandığım araçlar, çözdükleri probleme göre.",
      de: "Werkzeuge, zu denen ich greife — gruppiert nach dem Problem, das sie lösen.",
    },
    contact: { en: "Let's build something", tr: "Birlikte bir şey yapalım", de: "Lassen Sie uns etwas bauen" },
    contactSub: {
      en: "Open to frontend roles, freelance work and good conversations about UI architecture.",
      tr: "Frontend pozisyonlarına, freelance işlere ve arayüz mimarisi üzerine sohbetlere açığım.",
      de: "Offen für Frontend-Rollen, Freelance-Projekte und gute Gespräche über UI-Architektur.",
    },
  },
  copy: { en: "Copy", tr: "Kopyala", de: "Kopieren" },
  copied: { en: "Copied", tr: "Kopyalandı", de: "Kopiert" },
  present: { en: "Present", tr: "Halen", de: "Heute" },
  visit: { en: "Visit", tr: "Ziyaret et", de: "Besuchen" },
  education: { en: "Education", tr: "Eğitim", de: "Ausbildung" },
  languages: { en: "Languages", tr: "Diller", de: "Sprachen" },
  localTime: { en: "Local time in Istanbul", tr: "İstanbul'da saat", de: "Ortszeit in Istanbul" },
  built: {
    en: "Designed & built by Huseyin Sade with Next.js, TypeScript & SCSS.",
    tr: "Huseyin Sade tarafından Next.js, TypeScript ve SCSS ile tasarlanıp geliştirildi.",
    de: "Gestaltet & entwickelt von Huseyin Sade mit Next.js, TypeScript & SCSS.",
  },
} satisfies Record<string, unknown>;

export type Project = {
  name: string;
  url?: string;
  domain?: string;
  category: T;
  company: string;
  description: T;
  tags: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "fizy",
    url: "https://fizy.com",
    domain: "fizy.com",
    company: "Atmosware",
    category: { en: "Music, podcast & video streaming", tr: "Müzik, podcast ve video yayını", de: "Musik-, Podcast- & Video-Streaming" },
    description: {
      en: "Turkcell's digital music platform. I drive frontend architecture decisions, built the fizy desktop app with Rust and Tauri, build the admin panel with Refine, integrated Mixpanel analytics, set up SonarQube and pre-commit quality gates, and review code across the team.",
      tr: "Turkcell'in dijital müzik platformu. Frontend mimari kararlarını yönetiyorum; fizy masaüstü uygulamasını Rust ve Tauri ile geliştirdim, admin panelini Refine ile geliştiriyorum. Mixpanel analitiğini, SonarQube ve pre-commit kalite kontrollerini kurdum; ekipte code review yapıyorum.",
      de: "Turkcells digitale Musikplattform. Ich treffe die Frontend-Architekturentscheidungen, habe die fizy-Desktop-App mit Rust und Tauri gebaut, entwickle das Admin-Panel mit Refine, habe Mixpanel-Analytics integriert, SonarQube und Pre-Commit-Qualitätsprüfungen eingeführt und mache Code-Reviews im Team.",
    },
    tags: ["Next.js", "TypeScript", "Tauri", "Rust", "Tailwind", "Redux", "tRPC", "Refine", "Mixpanel", "Cypress"],
    featured: true,
  },
  {
    name: "TV+",
    url: "https://tvplus.com.tr",
    domain: "tvplus.com.tr",
    company: "Atmosware",
    category: { en: "Video streaming", tr: "Video yayını", de: "Video-Streaming" },
    description: {
      en: "Live TV and on-demand video for Turkcell. Worked on the player layer with Shaka Player and Video.js, including authentication, authorization and Widevine DRM.",
      tr: "Turkcell'in canlı TV ve isteğe bağlı video platformu. Shaka Player ve Video.js ile oynatıcı katmanında; kimlik doğrulama, yetkilendirme ve Widevine DRM üzerinde çalıştım.",
      de: "Live-TV und Video-on-Demand für Turkcell. Arbeit an der Player-Schicht mit Shaka Player und Video.js, inklusive Authentifizierung, Autorisierung und Widevine DRM.",
    },
    tags: ["Next.js", "JavaScript", "Shaka Player", "Video.js", "DRM", "Ant Design"],
    featured: true,
  },
  {
    name: "LC Waikiki",
    url: "https://www.lcw.com",
    domain: "lcw.com",
    company: "LC Waikiki",
    category: { en: "E-commerce", tr: "E-ticaret", de: "E-Commerce" },
    description: {
      en: "Frontend development on LC Waikiki's e-commerce site, building UI on a shared Storybook component library.",
      tr: "LC Waikiki'nin e-ticaret sitesinde, ortak Storybook bileşen kütüphanesi üzerinde frontend geliştirme.",
      de: "Frontend-Entwicklung für den Onlineshop von LC Waikiki auf Basis einer gemeinsamen Storybook-Komponentenbibliothek.",
    },
    tags: ["React", "TypeScript", "SCSS", "Redux", "Storybook"],
  },
  {
    name: "LC Waikiki Marketplace",
    url: "https://sellerportal.lcwaikiki.com",
    domain: "sellerportal.lcwaikiki.com",
    company: "LC Waikiki",
    category: { en: "Marketplace seller portal", tr: "Pazaryeri satıcı portalı", de: "Marktplatz-Verkäuferportal" },
    description: {
      en: "Seller portal for LC Waikiki's marketplace conversion — built on atomic design with a Storybook component library and SonarQube-gated quality.",
      tr: "LC Waikiki'nin pazaryeri dönüşümü için satıcı portalı — atomic design ile kurulan, Storybook bileşen kütüphanesi ve SonarQube kalite kontrolü olan bir yapı.",
      de: "Verkäuferportal für die Marktplatz-Umstellung von LC Waikiki — nach Atomic Design aufgebaut, mit Storybook-Komponentenbibliothek und SonarQube-Qualitätsprüfung.",
    },
    tags: ["React", "TypeScript", "Material UI", "Storybook", "React Query", "Recharts"],
  },
  {
    name: "fizz.ca",
    url: "https://fizz.ca",
    domain: "fizz.ca",
    company: "Etiya",
    category: { en: "Telecom CMS & CRM", tr: "Telekom CMS ve CRM", de: "Telekom-CMS & CRM" },
    description: {
      en: "CMS and CRM pages for a Canadian telecom operator.",
      tr: "Kanadalı bir telekom operatörü için CMS ve CRM sayfaları.",
      de: "CMS- und CRM-Seiten für einen kanadischen Telekommunikationsanbieter.",
    },
    tags: ["Angular", "TypeScript", "NgRx", "SCSS"],
  },
  {
    name: "Maraton Academy",
    url: "https://maratonacademy.com",
    domain: "maratonacademy.com",
    company: "Hineks",
    category: { en: "Education portal", tr: "Eğitim portalı", de: "Bildungsportal" },
    description: {
      en: "KPSS exam-prep portal with a realtime classroom, exam module and iyzico payments.",
      tr: "Gerçek zamanlı ders, sınav modülü ve iyzico ödemeleri olan KPSS hazırlık portalı.",
      de: "Portal zur Vorbereitung auf die KPSS-Prüfung mit Live-Unterricht, Prüfungsmodul und iyzico-Zahlungen.",
    },
    tags: ["Vue", "JavaScript", ".NET", "iyzico"],
  },
  {
    name: "Sculpturehead",
    company: "Side project",
    category: { en: "Image tool", tr: "Görsel aracı", de: "Bild-Tool" },
    description: {
      en: "Resizes images to Instagram post or story dimensions and renders them with color watermarks and text. React frontend on a Django backend.",
      tr: "Görselleri Instagram gönderi veya hikâye boyutuna getirip renkli filigran ve metinle işleyen araç. React arayüz, Django backend.",
      de: "Bringt Bilder auf Instagram-Post- oder Story-Format und versieht sie mit farbigen Wasserzeichen und Text. React-Frontend mit Django-Backend.",
    },
    tags: ["React", "Django", "Canvas", "SCSS"],
  },
  {
    name: "Çayyolla",
    url: "https://cayyolla.com",
    domain: "cayyolla.com",
    company: "Side project",
    category: { en: "Mobile ordering", tr: "Mobil sipariş", de: "Mobile Bestellung" },
    description: {
      en: "Connects shops with tea sellers so orders flow without a phone call.",
      tr: "Esnafla çaycıyı buluşturan, siparişi telefonsuz ileten uygulama.",
      de: "Verbindet Läden mit Teeverkäufern, damit Bestellungen ohne Anruf ankommen.",
    },
    tags: ["React Native", ".NET", "JavaScript"],
  },
];

export type Job = {
  company: string;
  note?: T;
  role: T;
  start: string; // YYYY-MM
  end?: string;
  location?: string;
  summary: T;
  highlights?: Record<Lang, string[]>;
  tags: string[];
};

export const jobs: Job[] = [
  {
    company: "Atmosware",
    note: { en: "Turkcell Group", tr: "Turkcell Grubu", de: "Turkcell-Gruppe" },
    role: { en: "Frontend Developer", tr: "Frontend Developer", de: "Frontend Developer" },
    start: "2024-08",
    summary: {
      en: "Digital music, podcast and video streaming — fizy.",
      tr: "Dijital müzik, podcast ve video yayını — fizy.",
      de: "Digitales Musik-, Podcast- und Video-Streaming — fizy.",
    },
    highlights: {
      en: [
        "Own frontend technical and architectural decisions",
        "Built the fizy desktop app with Rust and Tauri",
        "Building the fizy admin panel with Refine",
        "Integrated Mixpanel for event tracking and product insights",
        "Rolled out SonarQube and Husky + ESLint + lint-staged pre-commit gates",
        "Tests for critical user flows, code review and Git branch strategy",
        "Speed up refactors and test writing with Claude Code and Codex — every output goes through my own quality gates",
      ],
      tr: [
        "Frontend teknik ve mimari kararların sahibiyim",
        "fizy masaüstü uygulamasını Rust ve Tauri ile geliştirdim",
        "fizy admin panelini Refine ile geliştiriyorum",
        "Event takibi ve ürün analitiği için Mixpanel entegrasyonu",
        "SonarQube ve Husky + ESLint + lint-staged pre-commit kontrollerini kurdum",
        "Kritik akışlar için testler, code review ve Git branch stratejisi",
        "Claude Code ve Codex ile refactor ve test üretimini hızlandırıyorum; çıktıları kendi kalite kontrollerimden geçiriyorum",
      ],
      de: [
        "Verantwortlich für die technischen und architektonischen Frontend-Entscheidungen",
        "fizy-Desktop-App mit Rust und Tauri gebaut",
        "Entwicklung des fizy-Admin-Panels mit Refine",
        "Mixpanel für Event-Tracking und Produkt-Insights integriert",
        "SonarQube sowie Pre-Commit-Prüfungen mit Husky + ESLint + lint-staged eingeführt",
        "Tests für kritische User-Flows, Code-Reviews und Git-Branching-Strategie",
        "Refactorings und Tests mit Claude Code und Codex beschleunigt — jedes Ergebnis durchläuft meine eigenen Qualitätsprüfungen",
      ],
    },
    tags: ["Next.js", "TypeScript", "Tauri", "Rust", "Tailwind", "Redux", "tRPC", "Refine", "Mixpanel"],
  },
  {
    company: "Loodos",
    role: { en: "Frontend Developer", tr: "Frontend Developer", de: "Frontend Developer" },
    start: "2024-03",
    end: "2024-08",
    location: "Istanbul",
    summary: {
      en: "E-commerce in a monorepo; built the internal Storybook design system.",
      tr: "Monorepo'da e-ticaret; iç Storybook tasarım sistemini geliştirdim.",
      de: "E-Commerce in einem Monorepo; internes Storybook-Designsystem aufgebaut.",
    },
    tags: ["Next.js", "TypeScript", "Zustand", "SASS"],
  },
  {
    company: "Atmosware",
    note: { en: "Turkcell Group", tr: "Turkcell Grubu", de: "Turkcell-Gruppe" },
    role: { en: "Frontend Developer", tr: "Frontend Developer", de: "Frontend Developer" },
    start: "2023-09",
    end: "2024-03",
    summary: {
      en: "TV+ streaming — Shaka Player, Video.js and Widevine DRM.",
      tr: "TV+ yayın platformu — Shaka Player, Video.js ve Widevine DRM.",
      de: "TV+-Streaming — Shaka Player, Video.js und Widevine DRM.",
    },
    tags: ["Next.js", "Ant Design", "Redux", "PurgeCSS"],
  },
  {
    company: "LC Waikiki",
    role: { en: "Frontend Developer", tr: "Frontend Developer", de: "Frontend Developer" },
    start: "2021-05",
    end: "2023-09",
    summary: {
      en: "lcw.com e-commerce and the marketplace seller portal, with atomic design and Storybook.",
      tr: "Atomic design ve Storybook ile lcw.com e-ticaret sitesi ve pazaryeri satıcı portalı.",
      de: "lcw.com-Onlineshop und Marktplatz-Verkäuferportal, mit Atomic Design und Storybook.",
    },
    tags: ["React", "TypeScript", "Material UI", "Storybook", "SonarQube"],
  },
  {
    company: "Hineks",
    role: { en: "Frontend Developer", tr: "Frontend Developer", de: "Frontend Developer" },
    start: "2020-05",
    end: "2021-03",
    location: "Istanbul",
    summary: {
      en: "Payment integration (iyzico), product and order management.",
      tr: "Ödeme entegrasyonu (iyzico), ürün ve sipariş yönetimi.",
      de: "Zahlungsintegration (iyzico), Produkt- und Bestellverwaltung.",
    },
    tags: ["JavaScript", ".NET"],
  },
  {
    company: "Etiya",
    role: { en: "Junior Frontend Developer", tr: "Junior Frontend Developer", de: "Junior Frontend Developer" },
    start: "2019-10",
    end: "2020-05",
    location: "Istanbul",
    summary: {
      en: "Telecom CMS for fizz.ca with atomic design.",
      tr: "Atomic design ile fizz.ca için telekom CMS'i.",
      de: "Telekom-CMS für fizz.ca nach Atomic Design.",
    },
    tags: ["Angular", "TypeScript", "NgRx"],
  },
  {
    company: "Hineks",
    role: { en: "Software Developer", tr: "Yazılım Geliştirici", de: "Softwareentwickler" },
    start: "2019-01",
    end: "2019-10",
    location: "Sakarya",
    summary: {
      en: "Realtime education portal and exam module.",
      tr: "Gerçek zamanlı eğitim portalı ve sınav modülü.",
      de: "Echtzeit-Bildungsportal und Prüfungsmodul.",
    },
    tags: ["Vue", "JavaScript", ".NET"],
  },
  {
    company: "EXERT Bilgisayar",
    role: { en: "Junior Web Developer", tr: "Junior Web Developer", de: "Junior Web Developer" },
    start: "2018-01",
    end: "2018-09",
    location: "Ankara",
    summary: {
      en: "Where it started — internship, then first web developer role.",
      tr: "Her şeyin başladığı yer — staj, ardından ilk web geliştirici rolüm.",
      de: "Wo alles begann — Praktikum, dann die erste Stelle als Webentwickler.",
    },
    tags: ["HTML", "CSS", "JavaScript"],
  },
];

export const stack: { group: T; items: string[]; wide?: boolean }[] = [
  {
    group: { en: "Languages & frameworks", tr: "Diller ve framework'ler", de: "Sprachen & Frameworks" },
    items: ["TypeScript", "JavaScript", "React", "Next.js", "Vue 3", "Angular", "React Native", "Tauri", "Rust", ".NET", "Django"],
  },
  {
    group: { en: "Styling & UI", tr: "Stil ve UI", de: "Styling & UI" },
    items: ["Tailwind CSS", "SCSS", "shadcn/ui", "Material UI", "Ant Design", "Chakra UI", "Refine"],
  },
  {
    group: { en: "State & data", tr: "State ve veri", de: "State & Daten" },
    items: ["Redux", "Zustand", "NgRx", "React Query", "tRPC", "Supabase", "Firebase", "SQL"],
  },
  {
    group: { en: "Quality & testing", tr: "Kalite ve test", de: "Qualität & Tests" },
    items: ["Cypress", "Storybook", "SonarQube", "ESLint", "Husky", "lint-staged"],
  },
  {
    group: { en: "Media & product", tr: "Medya ve ürün", de: "Medien & Produkt" },
    items: ["Shaka Player", "Video.js", "Widevine DRM", "Mixpanel", "Recharts"],
  },
  {
    group: { en: "Architecture", tr: "Mimari", de: "Architektur" },
    items: ["Monorepo", "Atomic Design", "Design Systems", "Code Review", "Git Flow"],
  },
  {
    group: { en: "AI-assisted development", tr: "AI destekli geliştirme", de: "KI-gestützte Entwicklung" },
    items: ["Claude Code", "Codex", "Cursor", "GitHub Copilot"],
    wide: true,
  },
];

export const education: { school: string; degree: T; years: string }[] = [
  {
    school: "Sakarya University of Applied Sciences",
    degree: { en: "Master's degree", tr: "Yüksek lisans", de: "Master-Abschluss" },
    years: "2021",
  },
  {
    school: "Sakarya University",
    degree: { en: "B.Sc. Computer Engineering", tr: "Bilgisayar Mühendisliği, lisans", de: "B.Sc. Computer Engineering" },
    years: "2015 – 2019",
  },
  {
    school: "Universitas Sebelas Maret",
    degree: { en: "Bachelor's studies, Indonesia", tr: "Lisans eğitimi, Endonezya", de: "Bachelorstudium, Indonesien" },
    years: "2013 – 2015",
  },
];

export const languages: { name: T; level: T }[] = [
  { name: { en: "Turkish", tr: "Türkçe", de: "Türkisch" }, level: { en: "Native", tr: "Ana dil", de: "Muttersprache" } },
  { name: { en: "Kurdish", tr: "Kürtçe", de: "Kurdisch" }, level: { en: "Native", tr: "Ana dil", de: "Muttersprache" } },
  { name: { en: "English", tr: "İngilizce", de: "Englisch" }, level: { en: "Professional", tr: "Profesyonel", de: "Verhandlungssicher" } },
  { name: { en: "Indonesian", tr: "Endonezce", de: "Indonesisch" }, level: { en: "Limited", tr: "Temel", de: "Grundkenntnisse" } },
  { name: { en: "Malay", tr: "Malayca", de: "Malaiisch" }, level: { en: "Limited", tr: "Temel", de: "Grundkenntnisse" } },
];
