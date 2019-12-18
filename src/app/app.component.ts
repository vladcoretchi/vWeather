import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "./services/localStorage/local-storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  showMenu = false;

  constructor(
    public router: Router,
    public localStorage: LocalStorageService
  ) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch() {
    this.localStorage.toggleDarkMode();
  }

}
