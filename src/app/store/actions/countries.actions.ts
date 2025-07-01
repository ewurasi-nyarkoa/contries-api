import { createAction, props } from '@ngrx/store';
import { Country } from '../../models/country.interface';

export const loadCountries = createAction('[Countries] Load Countries');

export const loadCountriesSuccess = createAction(
  '[Countries] Load Countries Success',
  props<{ countries: Country[] }>()
);

export const loadCountriesFailure = createAction(
  '[Countries] Load Countries Failure',
  props<{ error: string }>()
);

export const selectCountry = createAction(
  '[Countries] Select Country',
  props<{ country: Country }>()
);

export const clearSelectedCountry = createAction('[Countries] Clear Selected Country');