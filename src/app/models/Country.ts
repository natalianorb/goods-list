interface CountryRusNames {
  official: string;
  common: string;
}

interface CountryNameTranslations {
  rus: CountryRusNames;
}

export interface CountryDTO {
  cca3: string;
  name: string;
  translations: CountryNameTranslations;
}

export class Country {
  constructor(public isoCode: string = '', public name: string = '') {}
}
