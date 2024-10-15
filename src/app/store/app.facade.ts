import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";

import { setDarkMode } from "./actions/core.actions";
import { selectDarkMode } from "./selectors/core.selectors";
import { selectProjectRequests } from "./selectors/project-request.selectors";
import { ProjectRequest } from "../models/request.model";
import {
  addProjectRequest,
  deleteProjectRequest,
  setProjectRequests,
  updateProjectRequest,
} from "./actions/project-request.actions";

@Injectable({
  providedIn: "root",
})
export class AppFacade {
  private store = inject(Store);

  // selectors
  public selectDarkMode$ = this.store.select(selectDarkMode);
  public selectProjectRequests$ = this.store.select(selectProjectRequests);

  // Core

  setDarkMode(darkMode: boolean): void {
    this.store.dispatch(setDarkMode({ darkMode }));
  }

  // ProjectRequests

  addProjectRequest(projectRequest: ProjectRequest) {
    this.store.dispatch(addProjectRequest({ projectRequest }));
  }
  updateProjectRequest(projectRequest: ProjectRequest) {
    this.store.dispatch(updateProjectRequest({ projectRequest }));
  }

  deleteProjectRequest(projectRequestId: number) {
    this.store.dispatch(deleteProjectRequest({ projectRequestId }));
  }

  setProjectRequests(projectRequests: ProjectRequest[]) {
    this.store.dispatch(setProjectRequests({ projectRequests }));
  }
}
