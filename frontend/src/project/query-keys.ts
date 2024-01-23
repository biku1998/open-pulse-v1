import { projectKeys } from "../home/query-keys";

export const eventKeys = {
  all: (projectId: string) =>
    [...projectKeys.detail(projectId), "events"] as const,

  lists: (projectId: string) => [...eventKeys.all(projectId), "list"] as const,
  list: (projectId: string) => [...eventKeys.lists(projectId)] as const,
  detail: (projectId: string, id: number) =>
    [...eventKeys.all(projectId), id] as const,
};
