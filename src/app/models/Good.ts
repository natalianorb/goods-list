import { Country } from './Country';

export class Good {
  constructor(
    public id: string,
    public title: string,
    public country: Country,
    public propTitle: string,
    public propValue: string
  ) {}
}
