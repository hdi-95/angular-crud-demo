import { createAction, props } from "@ngrx/store";
import { ProjectRequest } from "../../models/request.model";

export enum ProjectRequestActionsEnum {
  ADD_REQUEST = "[ADD_REQUEST] Add project request",
  UPDATE_REQUEST = "[UPDATE_REQUEST] Update project request",
  DELETE_REQUEST = "[DELETE_REQUEST] Delete project request",
  SET_REQUESTS = "[SET_REQUESTS] hydrate project requests",
}

export const addProjectRequest = createAction(
  ProjectRequestActionsEnum.ADD_REQUEST,
  props<{ projectRequest: ProjectRequest }>()
);

export const updateProjectRequest = createAction(
  ProjectRequestActionsEnum.UPDATE_REQUEST,
  props<{ projectRequest: ProjectRequest }>()
);

export const deleteProjectRequest = createAction(
  ProjectRequestActionsEnum.DELETE_REQUEST,
  props<{ projectRequestId: number }>()
);

export const setProjectRequests = createAction(
  ProjectRequestActionsEnum.SET_REQUESTS,
  props<{ projectRequests: ProjectRequest[] }>()
);
