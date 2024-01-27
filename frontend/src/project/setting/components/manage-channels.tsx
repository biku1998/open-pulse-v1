import { Edit, Hash, Trash } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { toast } from "../../../lib/utils";
import { useConfirmationDialog } from "../../../zustand-stores";
import { useFetchChannels } from "../../channel/queries";
import { useDeleteChannel } from "../mutations";
import { useFetchChannelFeedCounts } from "../queries";

type ManageChannelsProps = {
  projectId: string;
};

export default function ManageChannels(props: ManageChannelsProps) {
  const { projectId } = props;

  const { openConfirmationDialog, closeConfirmationDialog } =
    useConfirmationDialog((store) => ({
      openConfirmationDialog: store.openConfirmationDialog,
      closeConfirmationDialog: store.closeConfirmationDialog,
    }));

  const fetchChannelsQuery = useFetchChannels(projectId);

  const fetchChannelFeedCounts = useFetchChannelFeedCounts(
    fetchChannelsQuery.data
      ? fetchChannelsQuery.data.map((channel) => channel.id)
      : [],
  );

  const deleteChannelMutation = useDeleteChannel({
    onSuccess: () => toast.success("Channel deleted successfully"),
  });

  const handleDeleteChannel = ({ id, name }: { id: string; name: string }) => {
    openConfirmationDialog({
      title: "Delete channel",
      content: (
        <p className="text-zinc-600">
          Are you sure you want to delete <b>{name}</b> channel including all
          it&apos;s feed?
        </p>
      ),
      onConfirm: () => {
        deleteChannelMutation.mutate({
          projectId,
          id,
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

  return fetchChannelsQuery.data && fetchChannelFeedCounts.data ? (
    <section className="p-6 border border-zinc-200 rounded-[8px] w-full animate-in slide-in-from-bottom-2">
      <div className="flex flex-col gap-1 mb-9">
        <h2 className="font-semibold">Channels</h2>
        <p className="text-sm text-zinc-400">
          You have {fetchChannelsQuery.data.length} channels in the project
        </p>
      </div>

      <div className="flex flex-col divide-y divide-zinc-100 *:py-5 first:*:pt-0 last:*:pb-0">
        {fetchChannelsQuery.data.map((channel) => (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full p-2 bg-zinc-50 border border-zinc-200 flex items-center justify-center">
                <Hash className="w-[18px] h-[18px] text-zinc-400" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm">{channel.name}</span>
                <span className="text-sm text-zinc-500">
                  {fetchChannelFeedCounts.data.find(
                    (feedCount) => feedCount.channelId === channel.id,
                  )?.count ?? 0}{" "}
                  feeds
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-zinc-400 hover:text-zinc-500"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-red-50 hover:text-red-500 text-zinc-400"
                onClick={() => handleDeleteChannel(channel)}
              >
                <Trash className="w-4 h-4 " />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  ) : null;
}
