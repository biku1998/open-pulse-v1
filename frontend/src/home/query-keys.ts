export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: () => [...projectKeys.lists()] as const,
  detail: (id: string) => [...projectKeys.all, id] as const,
};
