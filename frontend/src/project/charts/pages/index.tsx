import { useParams } from "react-router-dom";
import ProjectHeader from "../../components/project-header";
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
    </>
  );
}
