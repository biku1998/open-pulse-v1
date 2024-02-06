import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../api/supabase";
import { insightKeys } from "./query-keys";

const deleteInsight = async ({ id }: { id: number; projectId: string }) => {
  const { error } = await supabase.from("insights").delete().eq("id", id);

  if (error) throw new Error("Failed to delete insight");
};

export const useDeleteInsight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInsight,
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: insightKeys.list(projectId),
      });
    },
  });
};
