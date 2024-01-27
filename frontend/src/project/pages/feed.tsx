import { useParams } from "react-router-dom";
import { Skeleton } from "../../components/ui/skeleton";
import { useConfirmationDialog } from "../../zustand-stores";
import EventLogCard from "../components/event-log-card";
import { useDeleteEvent } from "../mutations";
import { useFetchEvents } from "../queries";

export default function FeedPage() {
  const { projectId = "" } = useParams();

  // const [selectedEvent, setSelectedEvent] = React.useState<string | null>(null);

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
      content: (
        <p className="text-zinc-600">Are you sure you want to delete event?</p>
      ),
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

  const handleMaximizeEvent = (id: number) => {
    console.log(id);
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
        ? fetchEventsQuery.data.map(({ event, channel }) => (
            <EventLogCard
              key={event.id}
              event={event}
              channel={channel}
              projectId={projectId}
              handleDeleteEvent={() => handleDeleteEvent(event.id)}
              handleMaximizeEvent={() => handleMaximizeEvent(event.id)}
            />
          ))
        : null}
      {/* <EventLogCard
        event={{
          id: 101,
          name: "Successful payment",
          description:
            "2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping",
          createdAt: "Today at 11:03 pm",
          icon: "✅",
        }}
        channel={{
          id: "101",
          name: "product-payments",
        }}
        projectId={projectId}
        handleDeleteEvent={() => handleDeleteEvent("101")}
        handleMaximizeEvent={() => handleMaximizeEvent("101")}
      /> */}
    </div>
  );
}
