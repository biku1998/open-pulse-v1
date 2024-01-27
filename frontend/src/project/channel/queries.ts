import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../api/supabase";
import { convertToCamelCase } from "../../lib/utils";
import { Channel } from "../../types/channel";
import { Event } from "../../types/event";
import { channelKeys } from "./query-keys";

const fetchChannels = async (
  projectId: string,
): Promise<Pick<Channel, "id" | "name" | "projectId" | "position">[]> => {
  const { data, error } = await supabase
    .from("channels")
    .select("id, name, position, project_id")
    .order("position")
    .eq("project_id", projectId);
  if (error) throw new Error("Failed to fetch project channels");

  return convertToCamelCase<
    Pick<Channel, "id" | "name" | "projectId" | "position">[]
  >(data);
};

export const useFetchChannels = (projectId: string) =>
  useQuery({
    queryFn: () => fetchChannels(projectId),
    queryKey: channelKeys.list(projectId),
  });

const fetchChannelEvents = async ({
  projectId,
  channelId,
}: {
  projectId: string;
  channelId: string;
}) => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false })
    .match({ channel_id: channelId, project_id: projectId });

  if (error) throw new Error("Failed to fetch channel events");

  return convertToCamelCase<Event[]>(data);
};

export const useFetchChannelEvents = ({
  projectId,
  channelId,
}: {
  projectId: string;
  channelId: string;
}) =>
  useQuery({
    queryFn: () => fetchChannelEvents({ projectId, channelId }),
    queryKey: channelKeys.events(projectId, channelId),
  });
