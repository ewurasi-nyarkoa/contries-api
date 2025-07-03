import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Country } from '../../models/country.interface';
import { AppState } from '../../store/state.interface';
import * as CountriesActions from '../../store/actions/countries.actions';
import * as CountriesSelectors from '../../store/selectors/countries.selectors';

@Component({
  selector: 'app-country-list',
  imports: [CommonModule],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss'
})
export class CountryListComponent implements OnInit {
  countries$: Observable<Country[]>;
  loading$: Observable<boolean>;
  searchQuery$: Observable<string>;
  filterRegion$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.countries$ = this.store.select(CountriesSelectors.selectCountries);
    this.loading$ = this.store.select(CountriesSelectors.selectLoading);
    this.searchQuery$ = this.store.select(CountriesSelectors.selectSearchQuery);
    this.filterRegion$ = this.store.select(CountriesSelectors.selectFilterRegion);
  }

  ngOnInit() {
    this.store.dispatch(CountriesActions.loadCountries());
  }

  onCountryClick(country: Country) {
    this.store.dispatch(CountriesActions.selectCountry({ country }));
    // TODO: Navigate to country details
  }
}
