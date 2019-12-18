import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WeatherService } from "../../services/weather/weather.service";
import { forkJoin, Observable, Subscription } from "rxjs";
import { LocalStorageService } from "../../services/localStorage/local-storage.service";
import { concatMap, map } from "rxjs/operators";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit, OnDestroy {
  city: string;
  state: string;
  stateDescription: string;
  stateIconPath: string;
  temp: number;
  hum: number;
  wind: number;
  today: string;
  daysForecast: Map<string, object>;
  cityIllustrationPath: string;
  sub2: Subscription;
  errorMessage: string;

  constructor(
    public activeRouter: ActivatedRoute,
    public weather: WeatherService,
    public localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    const todayNumberInWeek = new Date().getDay();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.today = days[todayNumberInWeek];
    this.sub2 = this.activeRouter.paramMap
      .pipe(
        concatMap((route: any) => {
          this.city = route.params.city;
          this.cityIllustrationPath = "../../assets/defaultCity.svg";
          return forkJoin(
            this.weather.getWeather(this.city),
            this.weather.getForecast(this.city)
          );
        })
      )
      .subscribe(
        (payload: any) => {
          this.state = payload[0].weather[0].main;
          this.stateDescription = payload[0].weather[0].description;
          this.stateIconPath = this.weather.getConditionIconPath(this.state);
          this.temp = Math.ceil(Number(payload[0].main.temp));
          this.hum = payload[0].main.humidity;
          this.wind = Math.round(Math.round(payload[0].wind.speed));
          const dates = {};
          this.daysForecast = new Map<string, object>();
          for (const res of payload[1]) {
            const date = new Date(res.dt_txt).toISOString().slice(0, 10);
            if (dates[date]) {
              dates[date].counter += 1;
              dates[date].temp += res.main.temp;
            } else {
              dates[date] = {
                weekDay: days[new Date(res.dt_txt).getDay()],
                state: res.weather[0].main,
                stateDescription: res.weather[0].description,
                stateIconPath: this.weather.getConditionIconPath(res.weather[0].main),
                temp: res.main.temp,
                counter: 1
              };
            }
          }
          Object.keys(dates).forEach(day => {
            dates[day].temp = Math.round(dates[day].temp / dates[day].counter);
          });
          delete dates[Object.keys(dates)[0]];
          Object.keys(dates).forEach(day => {
            this.daysForecast.set(day, dates[day]);
          });
        },
        err => {
          this.errorMessage = err.error.message;
          setTimeout(() => {
            this.errorMessage = "";
          }, 2500);
        }
      );
  }

  ngOnDestroy() {
    this.sub2.unsubscribe();
  }
}
