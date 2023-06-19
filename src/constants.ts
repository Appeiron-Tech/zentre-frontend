export const API_PREFIX_BASE: string = import.meta.env.VITE_APP_API_PREFIX_BASE

export const DEFAULT_LANGUAGE: string = import.meta.env.VITE_DEFAULT_LANGUAGE

export const SNS_DEFAULT_VALUES = [
  {
    code: 'FCBK',
    values: {
      name: 'Facebook',
      icon: 'ti-facebook',
      default_url: 'www.facebook.com',
    },
  },
  {
    code: 'INST',
    values: {
      name: 'Instagram',
      icon: 'ti-instagram',
      default_url: 'www.instagram.com',
    },
  },
  {
    code: 'TWTR',
    values: {
      name: 'Twitter',
      icon: 'ti-twitter',
      default_url: 'www.twitter.com',
    },
  },
  {
    code: 'WWEB',
    values: {
      name: 'Web',
      icon: 'ti-world',
      default_url: 'www.zentre.app',
    },
  },
]

export const COUNTRIES = [
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
