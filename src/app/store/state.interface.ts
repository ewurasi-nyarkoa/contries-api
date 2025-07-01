import { Country } from '../models/country.interface';

export interface CountriesState {
  countries: Country[];
  selectedCountry: Country | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filterRegion: string;
}

export interface AppState {
  countries: CountriesState;
}