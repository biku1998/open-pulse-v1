import { useParams } from "react-router-dom";
import { Rss } from "lucide-react";
import Nothing from "../../components/nothing";
import { Skeleton } from "../../components/ui/skeleton";
import { useConfirmationDialog } from "../../zustand-stores";
import EventLogCard from "../components/event-log-card";
import { useDeleteEvent } from "../mutations";
import { useFetchEvents } from "../queries";

export default function FeedPage() {
  const { projectId = "" } = useParams();

  const { openConfirmationDialog, closeConfirmationDialog } =
    useConfirmationDialog((store) => ({
      openConfirmationDialog: store.openConfirmationDialog,
      closeConfirmationDialog: store.closeConfirmationDialog,
    }));

  const fetchEventsQuery = useFetchEvents(projectId);
  const deleteEventMutation = useDeleteEvent();

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

  return (
    <div className="flex flex-col items-center gap-5 py-6">
      {fetchEventsQuery.isPending ? (
        <>
          <Skeleton className="h-[130px] w-[560px] rounded-[8px]" />
          <Skeleton className="h-[130px] w-[560px] rounded-[8px]" />
          <Skeleton className="h-[130px] w-[560px] rounded-[8px]" />
          <Skeleton className="h-[130px] w-[560px] rounded-[8px]" />
        </>
      ) : null}

      {fetchEventsQuery.data
        ? fetchEventsQuery.data.map(({ event, channel, tags }) => (
            <EventLogCard
              key={event.id}
              event={event}
              channel={channel}
              projectId={projectId}
              handleDeleteEvent={() => handleDeleteEvent(event.id)}
              tags={tags}
            />
          ))
        : null}
      {fetchEventsQuery.data ? (
        fetchEventsQuery.data.length === 0 ? (
          <Nothing
            title="No feed found"
            subText="All channel events will show up here"
            icon={<Rss />}
          />
        ) : null
      ) : null}
    </div>
  );
}
