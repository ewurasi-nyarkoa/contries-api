import { Country } from '../models/country.interface';

export interface CountriesState {
  countries: Country[];
  selectedCountry: Country | null;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  countries: CountriesState;
}