import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IProjectRequests } from "../app.interface";
import { StateNamesEnum } from "../state.type";

export const selectProjectRequest = createFeatureSelector<IProjectRequests>(
  StateNamesEnum.PROJECT_REQUEST_STATE_NAME
);

export const selectProjectRequests = createSelector(
  selectProjectRequest,
  (state) => {
    return state?.projectRequests;
  }
);
