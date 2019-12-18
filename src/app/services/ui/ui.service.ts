import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UiService {
  darkModeState: BehaviorSubject<boolean>;
  themeSelector;

  constructor() {
    this.darkModeState = new BehaviorSubject<boolean>(false);
  }  
  
}
