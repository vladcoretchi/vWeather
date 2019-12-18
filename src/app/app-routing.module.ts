import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { DetailsComponent } from "./pages/details/details.component";
import { AddComponent } from "./pages/add/add.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "details/:city", component: DetailsComponent },
  { path: "add", component: AddComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
