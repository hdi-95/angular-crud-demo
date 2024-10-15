import { Component, inject, OnInit } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { interval, take } from "rxjs";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { RequestsPageComponent } from "./pages/requests-page/requests-page.component";
import { getPref } from "./utils/helper";
import { PrefKeys } from "./utils/constants";
import { AppFacade } from "./store/app.facade";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  imports: [RequestsPageComponent, ToolbarComponent, MatProgressSpinnerModule],
})
export class AppComponent implements OnInit {
  public app_loading = true;
  private appFacade = inject(AppFacade);

  ngOnInit(): void {
    this.checkDarkMode();
    // just wait one secound to simulate data loading
    interval(1000)
      .pipe(take(1))
      .subscribe(() => (this.app_loading = false));
  }

  checkDarkMode() {
    let theme = getPref(PrefKeys.THEME) || false;
    let darkMode = theme && JSON.parse(theme).darkMode;
    darkMode && this.appFacade.setDarkMode(true);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }
}
