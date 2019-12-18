import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "../../services/localStorage/local-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities;

  constructor(public localStorage: LocalStorageService) { }

  ngOnInit() {
    this.cities = this.localStorage.getCities();
  }

}
