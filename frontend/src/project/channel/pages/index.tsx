import { Outlet } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  CHANNEL_NAVBAR_WIDTH,
  HEADER_HEIGHT,
  NAVBAR_WIDTH,
} from "../../../constants";

export default function ChannelPage() {
  return (
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
          <Button variant="outline">
            Channel
            <Plus className="ml-auto h-4 w-4" />
          </Button>

          <div className="flex flex-col gap-1">
            <Button
              variant="secondary"
              className="justify-start text-zinc-950 font-semibold"
            >
              shopping-activities
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-zinc-700 font-normal"
            >
              shopping-activities
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-zinc-700 font-normal"
            >
              shopping-activities
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-zinc-700 font-normal"
            >
              shopping-activities
            </Button>
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
  );
}
