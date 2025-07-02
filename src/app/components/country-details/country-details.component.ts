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
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.selectedCountry$.subscribe(country => {
        if (!country) {
          this.store.dispatch(CountriesActions.getCountryByCode({ code }));
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/countries']);
  }
}
