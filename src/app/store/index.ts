import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { IAppState } from "./app.interface";
import { coreReducer } from "./reducers/core.reducers";
import { projectRequestReducer } from "./reducers/project-request.reducers";

import { StateNamesEnum } from "./state.type";
// import { AppReducer } from "./reducers/app.reducers";

export const appReducers: ActionReducerMap<IAppState> = {
  [StateNamesEnum.CORE_STATE_NAME]: coreReducer,
  [StateNamesEnum.PROJECT_REQUEST_STATE_NAME]: projectRequestReducer,
};

/* export const appReducers: ActionReducerMap<IAppState> = {
  AppState: AppReducer,
};
 */
export const metaReducers: MetaReducer<IAppState>[] = [];
