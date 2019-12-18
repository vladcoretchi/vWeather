import { Component } from '@angular/core';
import { LocalStorageService } from "../../services/localStorage/local-storage.service";

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent {

  constructor(public localStorage: LocalStorageService) { }

}
