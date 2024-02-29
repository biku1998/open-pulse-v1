import { useParams } from "react-router-dom";
import { BarChart4 } from "lucide-react";
import Nothing from "../../../components/nothing";
import { Skeleton } from "../../../components/ui/skeleton";
import ProjectHeader from "../../components/project-header";
import ChartCard from "../components/chart-card";
import CreateChartDialog from "../components/create-chart-dialog";
import { useFetchCharts } from "../queries";

export default function ChartPage() {
  const { projectId = "" } = useParams();
  const fetchChartsQuery = useFetchCharts(projectId);
  return (
    <>
      <ProjectHeader>
        <CreateChartDialog />
      </ProjectHeader>
      <div className="flex flex-col items-center gap-6 py-6">
        {fetchChartsQuery.isPending ? (
          <>
            <Skeleton className="h-[366px] w-[780px] rounded-lg" />
            <Skeleton className="h-[366px] w-[780px] rounded-lg" />
            <Skeleton className="h-[366px] w-[780px] rounded-lg" />
            <Skeleton className="h-[366px] w-[780px] rounded-lg" />
          </>
        ) : null}

        {fetchChartsQuery.data
          ? fetchChartsQuery.data.map((chart) => <ChartCard {...chart} />)
          : null}

        {fetchChartsQuery.data ? (
          fetchChartsQuery.data.length === 0 ? (
            <Nothing
              title="No charts found"
              subText="All charts will show up here"
              icon={<BarChart4 />}
            />
          ) : null
        ) : null}
      </div>
    </>
  );
}
