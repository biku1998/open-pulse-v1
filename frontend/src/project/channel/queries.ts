import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../api/supabase";
import { convertToCamelCase } from "../../lib/utils";
import { Channel } from "../../types/channel";
import { fetchEvents, fetchTagsByEventIds } from "../queries";
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

export const useFetchChannelEvents = ({
  projectId,
  channelId = "",
  userId,
  tags,
}: {
  projectId: string;
  channelId?: string;
  userId?: string;
  tags?: Array<{
    key: string;
    value: string;
  }>;
}) =>
  useQuery({
    queryFn: async () => {
      const events = await fetchEvents({ projectId, channelId, userId });

      const eventTags = await fetchTagsByEventIds({
        eventIds: events.map((event) => event.id),
        tags,
      });

      // extract unique event ids from eventTags
      const eventIds = Array.from(new Set(eventTags.map((tag) => tag.eventId)));

      return events
        .filter((event) => eventIds.includes(event.id))
        .map((event) => ({
          event,
          tags: eventTags.filter((tag) => tag.eventId === event.id),
        }));
    },
    queryKey: channelKeys.eventList({
      id: channelId,
      projectId,
      filters: JSON.stringify({
        userId,
        tags,
      }),
    }),
    enabled: Boolean(channelId),
  });
