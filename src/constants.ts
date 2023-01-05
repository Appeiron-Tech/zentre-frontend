import { readonly } from "vue"

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
