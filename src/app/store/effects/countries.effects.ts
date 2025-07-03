import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { CountryApiService } from '../../services/countries.service';
import * as CountriesActions from '../actions/countries.actions';

@Injectable()
export class CountriesEffects {
  loadCountries$;
  getCountryByCode$;

  constructor(
    private actions$: Actions,
    private countryApiService: CountryApiService
  ) {
    this.loadCountries$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CountriesActions.loadCountries),
        switchMap(() =>
          this.countryApiService.getAllCountries().pipe(
            map(countries => CountriesActions.loadCountriesSuccess({ countries })),
            catchError(error => of(CountriesActions.loadCountriesFailure({ error: error.message })))
          )
        )
      )
    );

    this.getCountryByCode$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CountriesActions.getCountryByCode),
        switchMap(({ code }) =>
          this.countryApiService.getCountryByCode(code).pipe(
            map(countries => {
              // API returns array, take first country and select it
              const country = countries[0];
              return CountriesActions.selectCountry({ country });
            }),
            catchError(error => of(CountriesActions.loadCountriesFailure({ error: error.message })))
          )
        )
      )
    );
  }
}