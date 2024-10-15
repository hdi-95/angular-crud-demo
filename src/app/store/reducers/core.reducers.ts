import { createReducer, on } from "@ngrx/store";
import { setDarkMode } from "../actions/core.actions";
import { ICore, initialCoreState } from "../app.interface";

export const coreReducer = createReducer(
  initialCoreState as ICore,

  on(setDarkMode, (state, { darkMode }) => ({
    ...state,
    darkMode,
  }))
);
