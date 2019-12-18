import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  private readonly weatherUrl = `${environment.openWeatherMap.apiBaseUrl}/weather`;
  private readonly forecastUrl = `${environment.openWeatherMap.apiBaseUrl}/forecast`;
  private readonly appId = environment.openWeatherMap.appID;

  constructor(public http: HttpClient) {}

  getWeather(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.weatherUrl}?q=${city}&units=${metric}&appId=${this.appId}`).pipe((first()));
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.forecastUrl}?q=${city}&units=${metric}&appId=${this.appId}`)
      .pipe(first(), map((weather) => weather['list']));
  }

  getConditionIconPath(mainState: string): string {
    var stateIconPath: string = "../../assets/conditions/";
    switch (mainState.toLowerCase()) {
      case "thunderstorm":
        stateIconPath += "thunderstorm.svg";
        break;
      case "drizzle":
        stateIconPath += "drizzle.svg";
        break;
      case "rain":
        stateIconPath += "rain.svg";
        break;
      case "snow":
        stateIconPath += "snow.svg";
        break;
      case "mist":
      case "smoke":
      case "haze":
      case "dust":
      case "fog":
      case "sand":
      case "ash":
      case "squall":
      case "tornado":
        stateIconPath += "atmosphere.svg";
        break;
      case "clear":
        stateIconPath += "clear.svg";
        break;
      case "clouds":
        stateIconPath += "clouds.svg";
        break;
      default:
        stateIconPath += "default.svg";
        break;
    }
    return stateIconPath;
  }

}
