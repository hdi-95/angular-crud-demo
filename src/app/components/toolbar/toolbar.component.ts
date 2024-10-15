import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { filter, take, tap } from "rxjs";
import { AppFacade } from "../../store/app.facade";
import { PrefKeys } from "../../utils/constants";
import { savePref } from "../../utils/helper";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    AsyncPipe,
  ],
})
export class ToolbarComponent {
  private appFacade: AppFacade = inject(AppFacade);
  public darkMode$ = this.appFacade.selectDarkMode$;

  save() {
    this.appFacade.selectProjectRequests$
      .pipe(
        take(1),
        filter((projectRequests) => projectRequests.length > 0),
        tap((projectRequests) => {
          savePref(PrefKeys.PROJECT_REQUESTS, JSON.stringify(projectRequests));
        })
      )
      .subscribe();
  }

  toogleNightMode(darkMode: boolean | unknown) {
    this.appFacade.setDarkMode(!darkMode);

    savePref(PrefKeys.THEME, JSON.stringify({ darkMode: !darkMode }));
    this.toggleTheme(!darkMode ? "dark" : "light");
  }

  toggleTheme(theme: "dark" | "light") {
    document.documentElement.setAttribute("data-theme", theme);
  }
}
