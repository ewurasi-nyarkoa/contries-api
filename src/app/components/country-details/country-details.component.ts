import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Country } from '../../models/country.interface';
import { AppState } from '../../store/state.interface';
import * as CountriesActions from '../../store/actions/countries.actions';
import * as CountriesSelectors from '../../store/selectors/countries.selectors';

@Component({
  selector: 'app-country-details',
  imports: [CommonModule],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss'
})
export class CountryDetailsComponent implements OnInit {
  selectedCountry$: Observable<Country | null>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.selectedCountry$ = this.store.select(CountriesSelectors.selectSelectedCountry);
    this.loading$ = this.store.select(CountriesSelectors.selectLoading);
  }

  ngOnInit() {
    const countryName = this.route.snapshot.paramMap.get('code');
    if (countryName) {
      // Load all countries first, then find the specific one
      this.store.dispatch(CountriesActions.loadCountries());
      
      // Find country by name from the loaded countries
      this.store.select(CountriesSelectors.selectCountries).subscribe(countries => {
        if (countries.length > 0) {
          const country = countries.find(c => 
            c.name.common.toLowerCase().replace(/\s+/g, '-') === countryName
          );
          if (country) {
            this.store.dispatch(CountriesActions.selectCountry({ country }));
          }
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/countries']);
  }

  getCurrencies(currencies: any): string {
    if (!currencies) return 'N/A';
    return Object.values(currencies).map((currency: any) => currency.name).join(', ');
  }

  getLanguages(languages: any): string {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ');
  }
}
