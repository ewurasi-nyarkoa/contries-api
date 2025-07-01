import { createReducer, on } from '@ngrx/store';
import { CountriesState } from '../state.interface';
import * as CountriesActions from '../actions/countries.actions';

export const initialState: CountriesState = {
  countries: [],
  selectedCountry: null,
  loading: false,
  error: null
};

export const countriesReducer = createReducer(
  initialState,
  
  on(CountriesActions.loadCountries, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(CountriesActions.loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    countries,
    loading: false,
    error: null
  })),
  
  on(CountriesActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  on(CountriesActions.selectCountry, (state, { country }) => ({
    ...state,
    selectedCountry: country
  })),
  
  on(CountriesActions.clearSelectedCountry, (state) => ({
    ...state,
    selectedCountry: null
  }))
);