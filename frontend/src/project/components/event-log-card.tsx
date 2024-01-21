import { Link } from "react-router-dom";
import { Dot, Hash, Maximize2, Trash } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Channel } from "../../types/channel";
import { Event } from "../../types/event";

type EventLogCardProps = {
  event: Pick<Event, "id" | "name" | "description" | "createdAt" | "icon">;
  channel: Pick<Channel, "name" | "id">;
  projectId: string;
};

export default function EventLogCard(props: EventLogCardProps) {
  const { event, channel, projectId } = props;

  return (
    <div className="relative group p-5 flex gap-5 border border-zinc-100 rounded-[8px] hover:border-zinc-200 w-[560px]">
      <div className="w-12 h-12 px-2 py-[10px] bg-green-50 flex items-center justify-center rounded-[8px]">
        <span>{event.icon}</span>
      </div>

      <div className="flex flex-col w-full">
        <h3 className="font-semibold text-zinc-950">{event.name}</h3>
        <div className="items-center hidden group-hover:flex absolute top-5 right-5 animate-in slide-in-from-bottom-2 duration-300">
          <Button variant="ghost" size="icon">
            <Maximize2 className="h-4 w-4 text-zinc-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-red-50 text-zinc-500 hover:text-red-500"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-zinc-600 mt-2 max-w-[280px] truncate">
          {event.description}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <Link
            to={`/project/${projectId}/channel/${channel.id}`}
            className="text-zinc-500 flex items-center text-sm  group-hover:text-primary"
          >
            <Hash className="mr-1 h-4 w-4" />
            {channel.id}
          </Link>

          <div className="flex items-center text-sm text-zinc-500">
            <Dot className="text-zinc-400" />
            <span>{event.createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
