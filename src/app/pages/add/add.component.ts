import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { first } from "rxjs/operators";
import { WeatherService } from "../../services/weather/weather.service";
import { LocalStorageService } from "../../services/localStorage/local-storage.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"]
})
export class AddComponent implements OnInit {
  temp: number;
  city = "Rome";
  state: string;
  capitals = [];
  selectedCity;
  cardCity;
  showNote = false;
  errorMessage: string;

  constructor(
    public http: HttpClient,
    public weather: WeatherService,
    public localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    // getting the city placeID
    this.weather.getWeather(this.city).subscribe((payload: any) => {
      this.state = payload.weather[0].main;
      this.temp = Math.ceil(Number(payload.main.temp));
    });

    this.http
      .get("https://restcountries.eu/rest/v2/all")
      .pipe(first())
      .subscribe((countries: Array<any>) => {
        countries.forEach((country: any) => {
          if (country.capital.length) {
            this.capitals.push(country.capital);
          }
        });
        this.capitals.sort();
      },
      (err) => {
        this.errorMessage = err;
        setTimeout(() => this.errorMessage = '', 2000);
      });
  }

  selectCity(city) {
    if (this.capitals.includes(city)) {
      this.cardCity = city;
      this.showNote = false;
    } else if (city.leading > 0) {
      this.showNote = true;
    }
  }

}
