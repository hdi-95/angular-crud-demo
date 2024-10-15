import { createReducer, on } from "@ngrx/store";
import { IProjectRequests, initialProjectRequestState } from "../app.interface";
import {
  addProjectRequest,
  deleteProjectRequest,
  setProjectRequests,
  updateProjectRequest,
} from "../actions/project-request.actions";

export const projectRequestReducer = createReducer(
  initialProjectRequestState as IProjectRequests,

  on(addProjectRequest, (state, { projectRequest }) => ({
    ...state,
    projectRequests: [...state.projectRequests, projectRequest],
  })),

  on(updateProjectRequest, (state, { projectRequest }) => ({
    ...state,
    projectRequests: state.projectRequests.map((pr) =>
      pr.id === projectRequest.id ? projectRequest : pr
    ),
  })),

  on(deleteProjectRequest, (state, { projectRequestId }) => ({
    ...state,
    projectRequests: state.projectRequests.filter(
      (pr) => pr.id !== projectRequestId
    ),
  })),

  on(setProjectRequests, (state, { projectRequests }) => ({
    ...state,
    projectRequests,
  }))
);
