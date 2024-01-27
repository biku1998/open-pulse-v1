export const channelKeys = {
  all: (projectId: string) => ["projects", projectId, "channels"] as const,

  lists: (projectId: string) =>
    [...channelKeys.all(projectId), "list"] as const,
  list: (projectId: string) => [...channelKeys.lists(projectId)] as const,
  detail: (projectId: string, id: string) =>
    [...channelKeys.all(projectId), id] as const,

  events: (projectId: string, id: string) =>
    [...channelKeys.detail(projectId, id), "events"] as const,
};
