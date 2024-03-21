import { Plus, Trash2 } from "lucide-react";
import { useGetUser } from "../../../auth/user-store";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { cn } from "../../../lib/utils";
import { ChartCondition } from "../../../types/chart";
import {
  useCreateChartCondition,
  useDeleteChartCondition,
  useUpdateChartCondition,
} from "../mutations";

type ChartConditionCardProps = {
  chartConditions: ChartCondition[];
  isLast: boolean;
  parentChartCondition: ChartCondition;
  projectId: string;
};

export default function ChartConditionCard(props: ChartConditionCardProps) {
  const { chartConditions, isLast, parentChartCondition, projectId } = props;

  const user = useGetUser();

  console.log("parentChartCondition", parentChartCondition);
  console.log("chartConditions", chartConditions);

  const createChartConditionMutation = useCreateChartCondition();
  const updateChartConditionMutation = useUpdateChartCondition();
  const deleteChartConditionMutation = useDeleteChartCondition();

  const addCondition = () => {
    if (!user) return;
    createChartConditionMutation.mutate({
      projectId,
      payload: {
        chartId: parentChartCondition.chartId,
        parentId: parentChartCondition.id,
        createdBy: user.id,
        field: "EVENT_NAME",
        operator: "EQUALS",
        value: Date.now().toString(),
        logicalOperator: "AND",
      },
    });
  };

  const deleteCondition = (id: number) => {
    deleteChartConditionMutation.mutate({
      chartId: parentChartCondition.chartId,
      id,
      projectId,
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col border py-5 border-zinc-200 rounded-lg space-y-5 divide-y divide-zinc-100",
        isLast ? "" : "relative",
      )}
    >
      <div className="flex items-center space-x-3 px-4">
        <Select value={parentChartCondition.field}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select condition criteria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="EVENT_NAME">Event</SelectItem>
              <SelectItem value="TAG_KEY">Tag</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={parentChartCondition.operator === "EQUALS" ? "=" : "!="}>
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder="Select condition operator" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="=">=</SelectItem>
              <SelectItem value="!=">!=</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder=""
          className="w-[75%]"
          value={parentChartCondition.value}
        />

        {parentChartCondition.logicalOperator === null ? (
          chartConditions.length === 0 ? (
            <Button
              size="icon"
              variant="ghost"
              onClick={addCondition}
              className="animate-in slide-in-from-bottom-2"
            >
              <Plus size={18} className="text-zinc-500" />
            </Button>
          ) : null
        ) : chartConditions.length === 0 ? (
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" onClick={addCondition}>
              <Plus size={18} className="text-zinc-500" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => deleteCondition(parentChartCondition.id)}
              className="text-zinc-500 hover:text-red-500 hover:bg-red-100"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ) : (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => deleteCondition(parentChartCondition.id)}
            className="text-zinc-500 hover:text-red-500 hover:bg-red-100"
          >
            <Trash2 size={18} />
          </Button>
        )}
      </div>

      {chartConditions.map((chartCondition, idx) => (
        <div
          className="flex items-center space-x-3 px-4 pt-4 animate-in slide-in-from-bottom-2"
          key={chartCondition.id}
        >
          <Select value={chartCondition.field}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select condition criteria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="EVENT_NAME">Event</SelectItem>
                <SelectItem value="TAG_KEY">Tag</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={chartCondition.operator === "EQUALS" ? "=" : "!="}>
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="Select condition operator" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="=">=</SelectItem>
                <SelectItem value="!=">!=</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder=""
            className="w-[75%]"
            value={chartCondition.value}
          />
          {idx === chartConditions.length - 1 ? (
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" onClick={addCondition}>
                <Plus size={18} className="text-zinc-500" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => deleteCondition(chartCondition.id)}
                className="text-zinc-500 hover:text-red-500 hover:bg-red-100"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => deleteCondition(chartCondition.id)}
              className="text-zinc-500 hover:text-red-500 hover:bg-red-100"
            >
              <Trash2 size={18} />
            </Button>
          )}
        </div>
      ))}
      {isLast ? null : (
        <div className="absolute -bottom-[29px] left-0 right-0 ml-auto py-2 mr-auto px-3 bg-zinc-50 border border-zinc-300 rounded-lg w-fit flex items-center justify-center z-10">
          <span className="text-sm font-mono text-zinc-600">or when</span>
        </div>
      )}
    </div>
  );
}
