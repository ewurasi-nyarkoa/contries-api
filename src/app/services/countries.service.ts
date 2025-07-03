import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, finalize } from 'rxjs';
import { environment } from '../../environments/environment';
import { Country } from '../models/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryApiService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<Country[]> {
    this.loadingSubject.next(true);
    return this.http.get<Country[]>('https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region,subregion,languages,currencies,borders,tld')
      .pipe(
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  getCountryByCode(code: string): Observable<Country[]> {
    this.loadingSubject.next(true);
    return this.http.get<Country[]>(`https://restcountries.com/v3.1/alpha/${code}?fields=name,capital,flags,population,region,subregion,language,currencies,borders,tld`)

      .pipe(
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  getCountriesByCodes(codes: string[]): Observable<Country[]> {
    this.loadingSubject.next(true);
    const codesParam = codes.join(',');
    return this.http.get<Country[]>(`https://restcountries.com/v3.1/alpha?codes=${codesParam}&fields=name,capital,flags,population,region,subregion,language,currencies,borders,tld`)
      .pipe(
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error('Failed to fetch country data'));
  }
}
