interface CountryRusNames {
  official: string;
  common: string;
}

interface CountryNameTranslations {
  rus: CountryRusNames;
}

export interface CountryDTO {
  id: string;
  name: string;
  translations: CountryNameTranslations;
}

export class Country {
  id: string = '';
  rusName: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.rusName = name;
  }
}
