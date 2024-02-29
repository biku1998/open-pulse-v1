import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../api/supabase";
import { convertToCamelCase } from "../../lib/utils";
import { Chart } from "../../types/chart";
import { chartKeys } from "./query-keys";

const createChart = async (
  payload: Pick<
    Chart,
    "name" | "description" | "chartType" | "createdBy" | "projectId"
  >,
): Promise<Chart> => {
  const { name, description, chartType, createdBy, projectId } = payload;
  const { data, error } = await supabase
    .from("charts")
    .insert({
      name,
      description,
      chart_type: chartType,
      project_id: projectId,
      created_by: createdBy,
    })
    .select()
    .single();

  if (error) throw new Error("Failed to create chart");

  return convertToCamelCase<Chart>(data);
};

export const useCreateChart = ({
  onSuccess,
}: {
  onSuccess?: (data: Chart) => void;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChart,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: chartKeys.list(variables.projectId),
      });
      if (onSuccess) onSuccess(data);
    },
  });
};
