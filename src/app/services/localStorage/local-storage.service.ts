import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";

const CITIESLIST_STORAGEKEY: string = 'cities';
const DARKMODE_STORAGEKEY: string = 'darkMode';

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  constructor(
    @Inject(LOCAL_STORAGE)
    private storage: StorageService
  ) {}

  public getCities(): string[] {
    var citiesList: string[] = this.storage.get(CITIESLIST_STORAGEKEY);
    if (citiesList === undefined || citiesList === null)
      citiesList = [];
    return citiesList;
  }

  public addCity(cityName: string): void {
    var citiesList: string[] = this.storage.get(CITIESLIST_STORAGEKEY);
    if (citiesList === undefined || citiesList === null)
      citiesList = [];

    citiesList.push(cityName);

    this.storage.set(CITIESLIST_STORAGEKEY, [...new Set(citiesList)]);
  }

  public isDarkMode(): boolean {
    var darkMode = this.storage.get(DARKMODE_STORAGEKEY);
    if (darkMode === undefined || darkMode === null)
      darkMode = false;
    return darkMode;
  }

  public setDarkMode(enabled: boolean): void {
    if (enabled === undefined || enabled === null)
      enabled = false;
      this.storage.set(DARKMODE_STORAGEKEY, enabled);
  }
  
  public toggleDarkMode(): void {
    this.setDarkMode(!this.isDarkMode());
  }

}
