import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";
import { Hash } from "lucide-react";
import CollapseIcon from "../../../assets/collapse-icon.svg";
import ExpandIcon from "../../../assets/expand-icon.svg";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  CHANNEL_NAVBAR_WIDTH,
  HEADER_HEIGHT,
  NAVBAR_WIDTH,
} from "../../../constants";
import { cn } from "../../../lib/utils";
import EventLogFilter from "../../components/event-log-filter";
import ProjectHeader from "../../components/project-header";
import CreateChannelDialog from "../components/create-channel-dialog";
import { useFetchChannels } from "../queries";

export default function ChannelPage() {
  const { projectId = "", channelId = "" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const isEventLogCardExpanded = searchParams.get("expand");

  const fetchChannelsQuery = useFetchChannels(projectId);

  const handleEventLogCardCollapseToggle = () => {
    if (isEventLogCardExpanded) {
      searchParams.delete("expand");
      setSearchParams(searchParams);
      return;
    }

    searchParams.set("expand", "true");
    setSearchParams(searchParams);
  };

  return (
    <>
      <ProjectHeader>
        <EventLogFilter />
        <Button
          size="icon"
          className="mr-4"
          variant="ghost"
          onClick={handleEventLogCardCollapseToggle}
        >
          {isEventLogCardExpanded ? (
            <img src={ExpandIcon} alt="expand-icon" />
          ) : (
            <img src={CollapseIcon} alt="collapse-icon" />
          )}
        </Button>
      </ProjectHeader>
      <div className="flex flex-col gap-4 relative">
        <nav
          className="fixed left-0 h-screen top-0"
          style={{
            width: `${CHANNEL_NAVBAR_WIDTH + NAVBAR_WIDTH}px`,
            paddingTop: `${HEADER_HEIGHT}px`,
            paddingLeft: `${NAVBAR_WIDTH}px`,
          }}
        >
          <div className="border-r border-solid border-zinc-200 flex flex-col gap-4 h-full py-6 px-4">
            <CreateChannelDialog
              projectId={projectId}
              disabled={fetchChannelsQuery.isPending}
              channelCount={
                fetchChannelsQuery.data ? fetchChannelsQuery.data.length : 0
              }
            />

            <span className="flex items-center mt-2">
              <Hash className="w-4 h-4 text-zinc-400 mr-1" />
              <span className="text-sm text-zinc-500">Channels</span>
            </span>
            <div className="flex flex-col gap-1">
              {fetchChannelsQuery.isPending ? (
                <>
                  <Skeleton className="w-[227px] h-[40px] mb-2" />
                  <Skeleton className="w-[227px] h-[40px] mb-2" />
                  <Skeleton className="w-[227px] h-[40px]" />
                </>
              ) : null}

              {fetchChannelsQuery.data
                ? fetchChannelsQuery.data.map((channel) => (
                    <Link
                      key={channel.id}
                      to={`/project/${projectId}/channel/${channel.id}`}
                    >
                      <Button
                        variant={
                          channelId === channel.id ? "secondary" : "ghost"
                        }
                        className={cn(
                          "justify-start w-full animate-in slide-in-from-bottom-2",
                          channelId === channel.id
                            ? "text-zinc-950"
                            : "text-zinc-700",
                          channelId === channel.id
                            ? "font-semibold"
                            : "font-normal",
                        )}
                      >
                        {channel.name}
                      </Button>
                    </Link>
                  ))
                : null}
            </div>
          </div>
        </nav>
        <div
          style={{
            marginLeft: `${CHANNEL_NAVBAR_WIDTH}px`,
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
