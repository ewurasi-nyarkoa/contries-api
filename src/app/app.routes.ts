import { Routes } from '@angular/router';
import { CountryListComponent } from './components/country-list/country-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/countries', pathMatch: 'full' },
  { path: 'countries', component: CountryListComponent }
];
