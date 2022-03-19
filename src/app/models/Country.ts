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
  isoCode: string = '';
  name: string;
  constructor(isoCode: string, name: string) {
    this.isoCode = isoCode;
    this.name = name;
  }
}
