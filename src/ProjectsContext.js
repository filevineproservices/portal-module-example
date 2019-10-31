import { createContext } from 'react';

export const PROJECTS_REQUESTED = 'PROJECTS_REQUESTED';
export const PROJECTS_RETRIEVED = 'PROJECTS_RETRIEVED';
export const PROJECTS_FAILED = 'PROJECTS_FAILED';

export const initialState = {
  isLoading: true,
  isError: false,
  data: []
};

export const projectsReducer = (state, { type, payload }) => {
  switch (type) {
    case PROJECTS_REQUESTED:
      return initialState;
    case PROJECTS_RETRIEVED:
      return { ...state, isLoading: false, data: payload };
    case PROJECTS_FAILED:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export const ProjectsStateContext = createContext(initialState);
export const ProjectsDispatchContext = createContext(() => {});
