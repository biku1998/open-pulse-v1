import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../api/supabase";
import { convertToCamelCase } from "../../lib/utils";
import { Chart } from "../../types/chart";

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
} = {}) =>
  useMutation({
    mutationFn: createChart,
    onSuccess,
  });
