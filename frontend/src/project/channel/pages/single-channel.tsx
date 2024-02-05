import { useParams, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import _keyBy from "lodash/keyBy";
import { Rss } from "lucide-react";
import Nothing from "../../../components/nothing";
import { Skeleton } from "../../../components/ui/skeleton";
import { useConfirmationDialog } from "../../../zustand-stores";
import EventLogCard from "../../components/event-log-card";
import { useDeleteEvent } from "../../mutations";
import { useFetchChannelEvents, useFetchChannels } from "../queries";
import { channelKeys } from "../query-keys";

export default function SingleChannelPage() {
  const { projectId = "", channelId = "" } = useParams();
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const filters = searchParams.getAll("filter");

  const { openConfirmationDialog, closeConfirmationDialog } =
    useConfirmationDialog((store) => ({
      openConfirmationDialog: store.openConfirmationDialog,
      closeConfirmationDialog: store.closeConfirmationDialog,
    }));

  const fetchChannelEventsQuery = useFetchChannelEvents({
    projectId,
    channelId,
    tags: filters
      .filter((f) => !f.includes("userId"))
      .map((f) => {
        const [key, value] = f.split(":eq:");
        return { key, value };
      }),
  });

  const deleteEventMutation = useDeleteEvent({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: channelKeys.detail({ projectId, id: channelId }),
      });
    },
  });

  const fetchChannelsQuery = useFetchChannels(projectId);

  const isLoading =
    fetchChannelEventsQuery.isPending || fetchChannelsQuery.isPending;

  const handleDeleteEvent = (id: number) => {
    openConfirmationDialog({
      title: "Delete event",
      content: <p>Are you sure you want to delete event?</p>,
      onConfirm: () => {
        deleteEventMutation.mutate({
          projectId,
          eventId: id,
        });
        closeConfirmationDialog();
      },
      onCancel: () => {
        closeConfirmationDialog();
      },
      confirmButtonVariant: "destructive",
      confirmButtonText: "Delete",
    });
  };

  const channelInfoById = _keyBy(
    fetchChannelsQuery.data ? fetchChannelsQuery.data : {},
    "id",
  );

  const isEventLogCardExpanded = searchParams.get("expand") === "true";

  return (
    <div className="flex flex-col items-center gap-5 py-6">
      {isLoading ? (
        <>
          <Skeleton className="h-[130px] w-[560px] rounded-[8px]" />
          <Skeleton className="h-[130px] w-[560px] rounded-[8px]" />
          <Skeleton className="h-[130px] w-[560px] rounded-[8px]" />
          <Skeleton className="h-[130px] w-[560px] rounded-[8px]" />
        </>
      ) : null}

      {fetchChannelEventsQuery.data && fetchChannelsQuery.data
        ? fetchChannelEventsQuery.data.map(({ event, tags }) => (
            <EventLogCard
              key={event.id}
              event={event}
              channel={channelInfoById[event.channelId]}
              projectId={projectId}
              handleDeleteEvent={() => handleDeleteEvent(event.id)}
              tags={tags}
              isExpanded={isEventLogCardExpanded}
            />
          ))
        : null}

      {fetchChannelEventsQuery.data ? (
        fetchChannelEventsQuery.data.length === 0 ? (
          <Nothing
            title="No feed found"
            subText="Channel events will show up here"
            icon={<Rss />}
          />
        ) : null
      ) : null}
    </div>
  );
}
