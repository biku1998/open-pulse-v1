import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api";
import { supabase } from "../../api/supabase";
import { convertToCamelCase } from "../../lib/utils";
import { Chart, ChartCondition } from "../../types/chart";
import { chartKeys } from "./query-keys";

const getCharts = async (
  projectId: string,
): Promise<Pick<Chart, "id" | "name" | "description" | "chartType">[]> => {
  const { data, error } = await supabase
    .from("charts")
    .select("id, name, description, chart_type")
    .eq("project_id", projectId);

  if (error) throw new Error("Failed to fetch charts");

  return convertToCamelCase<
    Pick<Chart, "id" | "name" | "description" | "chartType">[]
  >(data);
};

export const useFetchCharts = (projectId: string) => {
  return useQuery({
    queryKey: chartKeys.lists(projectId),
    queryFn: () => getCharts(projectId),
  });
};

const getChartData = async (id: number) => {
  const resp = await api.get<{ data: unknown[] }>(`/charts/${id}/data`);
  return resp.data.data;
};

export const useFetchChartData = ({
  projectId,
  id,
}: {
  projectId: string;
  id: number;
}) =>
  useQuery({
    queryKey: chartKeys.data({ projectId, id }),
    queryFn: () => getChartData(id),
  });

const fetchChartConditions = async (id: number): Promise<ChartCondition[]> => {
  console.log(id);
  const { data, error } = await supabase
    .from("chart_conditions")
    .select()
    .eq("chart_id", id);

  if (error) throw new Error("Failed to fetch chart conditions");

  return convertToCamelCase<ChartCondition[]>(data);
};

export const useFetchChartConditions = ({
  projectId,
  id,
  enabled,
}: {
  projectId: string;
  id: number;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: chartKeys.conditions({ projectId, id }),
    queryFn: () => fetchChartConditions(id),
    enabled,
  });
