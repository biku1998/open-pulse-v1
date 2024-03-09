import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";
import { useFetchChartConditions } from "../queries";

type EditChartPanelProps = {
  projectId: string;
  chartId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditChartPanel(props: EditChartPanelProps) {
  const { projectId, chartId, open, onOpenChange } = props;

  const fetchChartConditionsQuery = useFetchChartConditions({
    projectId,
    id: chartId,
    enabled: open,
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[1000px]">
        <SheetHeader>
          <SheetTitle>Edit chart</SheetTitle>
          <SheetDescription>
            Add or remove conditions to populate the chart
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-2 mt-6">
          {fetchChartConditionsQuery.isPending ? (
            <span className="text-xs text-zinc-600">
              Loading chart conditions
            </span>
          ) : null}

          {JSON.stringify(fetchChartConditionsQuery.data, null, 2)}
        </div>
      </SheetContent>
    </Sheet>
  );
}
