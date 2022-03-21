import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Country, CountryDTO } from '../models/Country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private allCountriesUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  getAll$(): Observable<Country[]> {
    return this.http.get<CountryDTO[]>(this.allCountriesUrl).pipe(
      map((countriesList: CountryDTO[]) =>
        countriesList.map(CountriesService.mapResponseToModel)
      ),
      retry(3),
      catchError(this.handleError)
    );
  }

  static mapResponseToModel(country: CountryDTO): Country {
    const rusNames = country.translations && country.translations.rus;
    return new Country(country.cca3, rusNames?.common);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `API returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
