import { useQuery } from "@tanstack/react-query";
import _keyBy from "lodash/keyBy";
import { supabase } from "../api/supabase";
import { convertToCamelCase } from "../lib/utils";
import { Channel } from "../types/channel";
import { Event } from "../types/event";
import { EventTag } from "../types/event-tag";
import { eventKeys } from "./query-keys";

const fetchEvents = async ({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string | null;
}): Promise<Event[]> => {
  const query = supabase
    .from("events")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (userId) {
    query.eq("user_id", userId);
  }

  const { data, error } = await query;

  if (error) throw new Error("Failed to fetch events");

  return convertToCamelCase<Event[]>(data);
};

const fetchChannelNamesById = async (
  channelIds: string[],
): Promise<Pick<Channel, "id" | "name">[]> => {
  const { data, error } = await supabase
    .from("channels")
    .select("id, name")
    .in("id", channelIds);

  if (error) throw new Error("Failed to fetch channels");

  return data;
};

export const fetchTagsByEventIds = async ({
  eventIds,
  tags = [],
}: {
  eventIds: number[];
  tags?: Array<{
    key: string;
    value: string;
  }>;
}): Promise<Pick<EventTag, "id" | "key" | "value" | "eventId">[]> => {
  const query = supabase
    .from("event_tags")
    .select("id, key, value, event_id")
    .in("event_id", eventIds);

  if (tags.length !== 0) {
    query.in(
      "key",
      tags.map((tag) => tag.key),
    );
    query.in(
      "value",
      tags.map((tag) => tag.value),
    );
  }

  const { data, error } = await query;

  if (error) throw new Error("Failed to fetch tags");

  return convertToCamelCase<
    Pick<EventTag, "id" | "key" | "value" | "eventId">[]
  >(data);
};

export const useFetchEvents = ({
  userId,
  tags,
  projectId,
}: {
  projectId: string;
  userId?: string;
  tags?: Array<{
    key: string;
    value: string;
  }>;
}) =>
  useQuery({
    queryKey: eventKeys.list(
      projectId,
      JSON.stringify({
        userId,
        tags,
      }),
    ),
    queryFn: async () => {
      const events = await fetchEvents({
        projectId,
        userId: userId || null,
      });

      const channelsInfo = await fetchChannelNamesById(
        events.map((event) => event.channelId),
      );

      const channelsInfoById = _keyBy(channelsInfo, "id");

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
          channel: {
            id: event.channelId,
            name: channelsInfoById[event.channelId].name,
          },
          tags: eventTags.filter((tag) => tag.eventId === event.id),
        }));
    },
  });
