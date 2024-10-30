import { ProjectRequest } from "../models/request.model";
import { StateNamesEnum } from "./state.type";

export interface ICore {
  darkMode: boolean;
}

export const initialCoreState: ICore = {
  darkMode: false,
};

export interface IProjectRequests {
  projectRequests: ProjectRequest[];
}

export const initialProjectRequestState: IProjectRequests = {
  projectRequests: [],
};

export interface IAppState {
  [StateNamesEnum.CORE_STATE_NAME]: ICore;
  [StateNamesEnum.PROJECT_REQUEST_STATE_NAME]: IProjectRequests;
}
