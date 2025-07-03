import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountryApiService } from './services/countries.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'countries-app';

  constructor(private countryApiService: CountryApiService) {}

  ngOnInit() {
    this.countryApiService.getAllCountries().subscribe(data => {
      console.log('Countries API Response:', data);
    });
  }
}