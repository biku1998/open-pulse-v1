import { MoreHorizontal } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Chart } from "../../../types/chart";

type ChartCardProps = Pick<Chart, "id" | "name" | "chartType" | "description">;

export default function ChartCard(props: ChartCardProps) {
  const { name, chartType, description } = props;
  return (
    <div className="relative group p-5 flex flex-col gap-[10px] border border-zinc-200 rounded-lg hover:border-zinc-300 w-[780px] animate-in slide-in-from-bottom-2 h-[366px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[6px]">
          <h2 className="font-bold text-zinc-700">{name}</h2>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>

        <Button variant="ghost" size="icon" className="text-zinc-600">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-center bg-zinc-50 rounded-lg h-full">
        <span className="text-sm text-zinc-400">No data for period</span>
      </div>
    </div>
  );
}
