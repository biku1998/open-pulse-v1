export const chartKeys = {
  all: (projectId: string) => ["projects", projectId, "charts"] as const,

  lists: (projectId: string) => [...chartKeys.all(projectId), "list"] as const,
  list: (projectId: string) => [...chartKeys.lists(projectId)] as const,

  detail: ({ projectId, id }: { projectId: string; id: string }) =>
    [...chartKeys.all(projectId), id] as const,
};
