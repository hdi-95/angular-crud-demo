import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StateNamesEnum } from "../state.type";
import { ICore } from "../app.interface";

export const selectCoretate = createFeatureSelector<ICore>(
  StateNamesEnum.CORE_STATE_NAME
);

export const selectDarkMode = createSelector(selectCoretate, (state) => {
  return state?.darkMode;
});
