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

export const setSearchQuery = createAction(
  '[Countries] Set Search Query',
  props<{ searchQuery: string }>()
);

export const setFilterRegion = createAction(
  '[Countries] Set Filter Region',
  props<{ region: string }>()
);

export const getCountryByCode = createAction(
  '[Countries] Get Country By Code',
  props<{ code: string }>()
);