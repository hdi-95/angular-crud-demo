import { bootstrapApplication } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideStore } from "@ngrx/store";
import { metaReducers, appReducers } from "./app/store";
import { AppComponent } from "./app/app.component";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { isDevMode } from "@angular/core";

const AppConfig = {
  providers: [
    provideAnimationsAsync(),
    provideStore(appReducers, { metaReducers }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};

bootstrapApplication(AppComponent, AppConfig);
