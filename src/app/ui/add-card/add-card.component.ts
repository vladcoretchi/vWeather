import { Component } from "@angular/core";
import { LocalStorageService } from "../../services/localStorage/local-storage.service";

@Component({
  selector: "app-add-card",
  templateUrl: "./add-card.component.html",
  styleUrls: ["./add-card.component.css"]
})
export class AddCardComponent {
  constructor(public localStorage: LocalStorageService) {}
}
