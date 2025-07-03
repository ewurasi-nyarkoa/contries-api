import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CountriesState } from '../state.interface';

export const selectCountriesState = createFeatureSelector<CountriesState>('countries');

export const selectCountries = createSelector(
  selectCountriesState,
  (state) => state.countries
);

export const selectSelectedCountry = createSelector(
  selectCountriesState,
  (state) => state.selectedCountry
);

export const selectLoading = createSelector(
  selectCountriesState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectCountriesState,
  (state) => state.error
);

export const selectSearchQuery = createSelector(
  selectCountriesState,
  (state) => state.searchQuery
);

export const selectFilterRegion = createSelector(
  selectCountriesState,
  (state) => state.filterRegion
);