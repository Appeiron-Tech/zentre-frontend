export const API_PREFIX_BASE: string = import.meta.env.VITE_APP_API_PREFIX_BASE
export const API_BASE_URL: string = import.meta.env.VITE_APP_API_BASE_URL
export const GOOGLE_MAPS_API_KEY: string = import.meta.env.VITE_GOOGLE_STORAGE_API_KEY

export const DEFAULT_LANGUAGE: string = import.meta.env.VITE_DEFAULT_LANGUAGE

interface ISns {
  name: string
  icon: string
}

export const SNS_DEFAULT_VALUES: Record<string, ISns> = {
  FCBK: {
    name: 'Facebook',
    icon: 'ti-facebook',
  },
  INST: {
    name: 'Instagram',
    icon: 'ti-instagram',
  },
  TWTR: {
    name: 'Twitter',
    icon: 'ti-twitter',
  },
  WEB: {
    name: 'Website',
    icon: 'ti-world',
  },
}

export interface ICountry {
  iso2: string
  img_url: string
  country_code: number
}

export const COUNTRIES: ICountry[] = [
  {
    iso2: 'ES',
    img_url: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg',
    country_code: 34,
  },
  {
    iso2: 'DE',
    img_url: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/DE.svg',
    country_code: 49,
  },
  {
    iso2: 'GB',
    img_url: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg',
    country_code: 44,
  },
  {
    iso2: 'AD',
    img_url: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/AD.svg',
    country_code: 376,
  },
  {
    iso2: 'FR',
    img_url: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg',
    country_code: 33,
  },
  {
    iso2: 'IE',
    img_url: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/IE.svg',
    country_code: 353,
  },
  {
    iso2: 'PE',
    img_url: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/PE.svg',
    country_code: 51,
  },
  {
    iso2: 'VE',
    img_url: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/VE.svg',
    country_code: 58,
  },
  {
    iso2: 'AR',
    img_url: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/AR.svg',
    country_code: 54,
  },
]

export const EPeriod = {
  TODAY: 0,
  WEEK: 1,
  MONTH: 2,
  MONTH3: 3,
  MONTH6: 4,
  YEAR: 5,
}

export const DEFAULT_PERIODS = [
  { label: 'calendar-today', value: EPeriod.TODAY, before: { type: 'day', back: 0 } },
  { label: 'calendar-week', value: EPeriod.WEEK, before: { type: 'day', back: 7 } },
  { label: 'calendar-month', value: EPeriod.MONTH, before: { type: 'month', back: 1 } },
  { label: 'calendar-3months', value: EPeriod.MONTH3, before: { type: 'month', back: 3 } },
  { label: 'calendar-6months', value: EPeriod.MONTH6, before: { type: 'month', back: 6 } },
  { label: 'calendar-year', value: EPeriod.YEAR, before: { type: 'month', back: 12 } },
]

export enum COURSES_CATEGORY {
  DEVELOPMENT = 'development',
  BUSINESS = 'business',
  FINANCE = 'finance',
  TECH = 'tech',
  OFFICE = 'office',
  PERSONAL = 'personal',
  DESIGN = 'design',
  MARKETING = 'marketing',
  LIFESTYLE = 'lifestyle',
  PHOTOGRAPHY = 'photography',
  HEALTH = 'health',
  MUSIC = 'music',
  TEACHING = 'teaching',
  OTHER = 'other',
}

export enum LANGUAGES {
  ES = 'Español',
  CA = 'Català',
  EN = 'English',
  PT = 'Português',
  DE = 'Deutsch',
  FR = 'Français',
  IT = 'Italiano',
}

export enum CURRENCIES {
  USD = 'USD ($)',
  EUR = 'EUR (€)',
  LIB = 'GBP (£)',
  PEN = 'PEN (S/.)',
}

export enum TIME_DURATION {
  MIN = 'mins',
  HOU = 'hours',
  DAY = 'days',
  WEK = 'weeks',
  MON = 'months',
}

export enum DIFFICULT_LEVEL {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  EXPERT = 'expert',
  ALL = 'all',
}

export const COURSES_SUBCATEGORY = {
  DEVELOPMENT: {
    WEB: 'web',
    DATA_SCIENCE: 'data-science',
    MOBILE: 'mobile',
    PROGRAMMING: 'programming',
    GAME: 'game',
    DATABASE: 'database-design',
    SOFTWARE_TESTING: 'software-testing',
    SOFTWARE_ENGINEERING: 'software-engineering',
    SOFTWARE_DEVELOPMENT_TOOLS: 'software-development-tools',
    NO_CODE: 'no-code',
  },
  BUSINESS: {
    ENTREPRENEURSHIP: 'entrepreneurship',
    COMMUNICATION: 'communication',
    MANAGEMENT: 'management',
    SALES: 'sales',
    STRATEGY: 'strategy',
    OPERATIONS: 'operations',
    PROJECT_MANAGEMENT: 'project-management',
    BUSINESS_LAW: 'business-law',
    BUSINESS_ANALYTICS: 'business-analytics',
    HUMAN_RESOURCES: 'human-resources',
    INDUSTRY: 'industry',
    E_COMMERCE: 'e-commerce',
    MEDIA: 'media',
    REAL_ESTATE: 'real-estate',
    OTHER: 'other',
  },
  FINANCE: {
    ACCOUNTING: 'accounting',
    CRYPTOCURRENCY: 'cryptocurrency',
    FINANCE: 'finance',
    FINANCE_CERT: 'finance-cert',
    FINANCIAL_MODELING: 'financial-modeling',
    INVESTING: 'investing',
    TRADING: 'trading',
    COMPLIANCE: 'compliance',
    ECONOMICS: 'economics',
    MONEY_MANAGEMENT: 'money-management',
    TAXES: 'taxes',
    OTHER: 'other',
  },
  TECH: {
    IT_CERTIFICATIONS: 'it-certifications',
    NETWORK_SECURITY: 'network-security',
    HARDWARE: 'hardware',
    OPERATING_SYSTEMS: 'operating-systems',
    OTHER: 'other',
  },
  OFFICE: {
    MICROSOFT: 'microsoft',
    APPLE: 'apple',
    GOOGLE: 'google',
    SAP: 'sap',
    ORACLE: 'oracle',
    OTHER: 'other',
  },
  PERSONAL: {
    PERSONAL_DEVELOPMENT: 'personal-development',
    LEADERSHIP: 'leadership',
    CAREER_DEVELOPMENT: 'career-development',
    PARENTING: 'parenting',
    RELIGION: 'religion',
    HAPPINESS: 'happiness',
    PERSONAL_BRAND: 'personal-brand',
    CREATIVITY: 'creativity',
    INFLUENCE: 'influence',
    SELF_ESTEEM: 'self-esteem',
    STRESS_MANAGEMENT: 'stress-management',
    MEMORY: 'memory',
    MOTIVATION: 'motivation',
    OTHER: 'other',
  },
  DESIGN: {
    WEB_DESIGN: 'web-design',
    GRAPHIC_DESIGN: 'graphic-design',
    DESIGN_TOOLS: 'design-tools',
    USER_EXPERIENCE: 'user-experience',
    GAME_DESIGN: 'game-design',
    DESIGN_THINKING: 'design-thinking',
    D3_ANIMATION: 'd3-animation',
    FASHION: 'fashion',
    ARCHITECTURAL_DESIGN: 'architectural-design',
    INTERIOR_DESIGN: 'interior-design',
    OTHER: 'other',
  },
  MARKETING: {
    DIGITAL_MARKETING: 'digital-marketing',
    SEO: 'seo',
    MARKETING_FUNDAMENTALS: 'marketing-fundamentals',
    SOCIAL_MEDIA_MARKETING: 'social-media-marketing',
    BRANDING: 'branding',
    MARKETING_ANALYTICS: 'marketing-analytics',
    PUBLIC_RELATIONS: 'public-relations',
    ADVERTISING: 'advertising',
    VIDEO_AND_MOBILE_MARKETING: 'video-and-mobile-marketing',
    CONTENT_MARKETING: 'content-marketing',
    GROWTH_HACKING: 'growth-hacking',
    AFFILIATE_MARKETING: 'affiliate-marketing',
    PRODUCT_MARKETING: 'product-marketing',
    OTHER: 'other',
  },
  LIFESTYLE: {
    ARTS_CRAFTS: 'arts-and-crafts',
    FOOD_BEVERAGE: 'food-and-beverage',
    ESOTERIC: 'esoteric',
    BEAUTY_MAKEUP: 'beauty-and-makeup',
    TRAVEL: 'travel',
    GAMING: 'gaming',
    HOME_IMPROVEMENT: 'home-improvement',
    PET_CARE_TRAINING: 'pet-care-and-training',
    OTHER: 'other',
  },
  PHOTOGRAPHY: {
    DIGITAL_PHOTOGRAPHY: 'digital-photography',
    PHOTOGRAPHY_FUNDAMENTALS: 'photography-fundamentals',
    PORTRAIT_PHOTOGRAPHY: 'portrait-photography',
    PHOTOGRAPHY_TOOLS: 'photography-tools',
    COMMERCIAL_PHOTOGRAPHY: 'commercial-photography',
    VIDEO_DESIGN: 'video-design',
    OTHER: 'other',
  },
  HEALTH: {
    FITNESS: 'fitness',
    GENERAL_HEALTH: 'general-health',
    SPORTS: 'sports',
    NUTRITION: 'nutrition',
    YOGA: 'yoga',
    MENTAL_HEALTH: 'mental-health',
    DIETING: 'dieting',
    SELF_DEFENSE: 'self-defense',
    SAFETY_FIRST_AID: 'safety-first-aid',
    DANCE: 'dance',
    MEDITATION: 'meditation',
    OTHER: 'other',
  },
  MUSIC: {
    INSTRUMENTS: 'instruments',
    PRODUCTION: 'production',
    MUSIC_FUNDAMENTALS: 'music-fundamentals',
    VOCAL: 'vocal',
    MUSIC_TECHNIQUES: 'music-techniques',
    MUSIC_SOFTWARE: 'music-software',
    OTHER: 'other',
  },
  TEACHING: {
    ENGINEERING: 'engineering',
    HUMANITIES: 'humanities',
    MATH: 'math',
    SCIENCE: 'science',
    ONLINE_EDUCATION: 'online-education',
    SOCIAL_SCIENCE: 'social-science',
    LANGUAGE: 'language',
    TEACHER_TRAINING: 'teacher-training',
    TEST_PREP: 'test-prep',
    OTHER: 'other',
  },
}
