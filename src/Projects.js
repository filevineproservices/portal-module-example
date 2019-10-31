import React, { useEffect, useContext } from 'react';

import {
  ProjectsStateContext,
  ProjectsDispatchContext,
  PROJECTS_REQUESTED,
  PROJECTS_RETRIEVED,
  PROJECTS_FAILED
} from './ProjectsContext';

export default ({ ctx, routeTo }) => {
  const { isLoading, isError, data: projects } = useContext(
    ProjectsStateContext
  );
  const dispatch = useContext(ProjectsDispatchContext);

  useEffect(() => {
    const fetchProjects = ctx => {
      dispatch({ type: PROJECTS_REQUESTED });

      fetch(`${ctx.apiBaseUrl}/core/projects`, {
        headers: {
          Authorization: `Bearer ${ctx.accessToken}`,
          'x-fv-userid': ctx.userId,
          'x-fv-orgid': ctx.orgId,
          'x-fv-sessionid': ctx.refreshToken
        }
      })
        .then(x => x.json())
        .then(res => res.items)
        .then(projects => {
          dispatch({ type: PROJECTS_RETRIEVED, payload: projects });
        })
        .catch(error => {
          console.error(error);
          dispatch({ type: PROJECTS_FAILED });
        });
    };

    if (ctx && ctx.hasOwnProperty('accessToken')) {
      fetchProjects(ctx);
    }
  }, [ctx]);

  return (
    <div>
      <h1>Projects</h1>
      {isLoading && <div>Loading projects...</div>}
      {isError && <div>We are unable to load the projects.</div>}
      {!isLoading && projects.length === 0 && (
        <div>There are no projects to display.</div>
      )}
      {!isLoading &&
        projects.length > 0 &&
        projects.map(proj => (
          <div key={proj.projectId.native}>{proj.projectOrClientName}</div>
        ))}
      <button type="button" onClick={() => routeTo('/acme')}>
        Go back to demo
      </button>
    </div>
  );
};
