import dayjs from "../../../lib/dayjs";
import { cn } from "../../../lib/utils";
import { Insight } from "../../../types/insight";

type InsightCardProps = {
  insight: Insight;
  fullWidth: boolean;
};

export default function InsightCard(props: InsightCardProps) {
  const {
    insight: { name, value, createdAt, updatedAt, icon },
    fullWidth,
  } = props;

  return (
    <div
      className={cn(
        "px-6 py-4 rounded-xl border border-zinc-100 flex flex-col min-w-[380px] animate-in slide-in-from-bottom-2 hover:border-zinc-200",
        fullWidth ? "w-full" : "",
        "group",
      )}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-zinc-700 group-hover:text-zinc-800">
          {value}
        </h3>
        {icon ? <span className="text-2xl">{icon}</span> : null}
      </div>

      <div className="flex items-center justify-between  mt-4">
        <p className="text-sm text-zinc-500 font-medium">{name}</p>
        <span className="text-xs text-zinc-400">
          {dayjs().to(updatedAt || createdAt)}
        </span>
      </div>
    </div>
  );
}
