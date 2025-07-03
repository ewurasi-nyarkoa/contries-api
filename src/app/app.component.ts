import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'countries-app';

  constructor(private countriesService: CountriesService) {}

  ngOnInit() {
    this.countriesService.getCountries().subscribe(data => {
      console.log('Countries API Response:', data);
    });
  }
}