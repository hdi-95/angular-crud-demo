import { createAction, props } from "@ngrx/store";

export const setDarkMode = createAction(
  "[Core darkmode] user toggle dark mode",
  props<{ darkMode: boolean }>()
);
