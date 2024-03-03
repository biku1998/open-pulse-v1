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
      </SheetContent>
    </Sheet>
  );
}
