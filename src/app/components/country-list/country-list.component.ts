import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { Country } from '../../models/country.interface';
import { AppState } from '../../store/state.interface';
import * as CountriesActions from '../../store/actions/countries.actions';
import * as CountriesSelectors from '../../store/selectors/countries.selectors';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-country-list',
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss'
})
export class CountryListComponent implements OnInit {
  countries$: Observable<Country[]>;
  filteredCountries$: Observable<Country[]>;
  loading$: Observable<boolean>;
  searchQuery$: Observable<string>;
  filterRegion$: Observable<string>;
  searchTerm: string = '';
  selectedRegion: string = '';
  regions: string[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  currentPage: number = 1;
  pageSize: number = 12;
  totalItems: number = 0;
  paginatedCountries$: Observable<Country[]>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.countries$ = this.store.select(CountriesSelectors.selectCountries);
    this.loading$ = this.store.select(CountriesSelectors.selectLoading);
    this.searchQuery$ = this.store.select(CountriesSelectors.selectSearchQuery);
    this.filterRegion$ = this.store.select(CountriesSelectors.selectFilterRegion);
    
    
    this.filteredCountries$ = combineLatest([
      this.countries$,
      this.searchQuery$,
      this.filterRegion$
    ]).pipe(
      map(([countries, searchQuery, filterRegion]) => {
        let filtered = countries;
    
        if (searchQuery) {
          filtered = filtered.filter(country => 
            country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
      
        if (filterRegion) {
          filtered = filtered.filter(country => country.region === filterRegion);
        }
        
        // Update total items for pagination
        this.totalItems = filtered.length;
        
        return filtered;
      })
    );
    
    // Create paginated countries observable
    this.paginatedCountries$ = this.filteredCountries$.pipe(
      map(countries => {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return countries.slice(startIndex, endIndex);
      })
    );
  }

  ngOnInit() {
    this.store.dispatch(CountriesActions.loadCountries());
  }

  onCountryClick(country: Country) {
    this.store.dispatch(CountriesActions.selectCountry({ country }));
    this.router.navigate(['/country', country.name.common.toLowerCase().replace(/\s+/g, '-')]);
  }

  onSearch() {
    this.store.dispatch(CountriesActions.setSearchQuery({ searchQuery: this.searchTerm }));
  }

  onRegionChange() {
    this.store.dispatch(CountriesActions.setFilterRegion({ region: this.selectedRegion }));
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    // Trigger re-calculation of paginated countries
    this.paginatedCountries$ = this.filteredCountries$.pipe(
      map(countries => {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return countries.slice(startIndex, endIndex);
      })
    );
  }
}
