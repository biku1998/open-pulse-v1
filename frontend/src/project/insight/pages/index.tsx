import { useParams } from "react-router-dom";
import { Lightbulb } from "lucide-react";
import Nothing from "../../../components/nothing";
import { Skeleton } from "../../../components/ui/skeleton";
import ProjectHeader from "../../components/project-header";
import InsightCard from "../components/insight-card";
import { useFetchInsights } from "../queries";

export default function InsightPage() {
  const { projectId = "" } = useParams();

  const fetchInsightsQuery = useFetchInsights(projectId);

  return (
    <>
      <ProjectHeader />
      <div
        className="flex flex-col items-center mx-auto gap-6 py-6 max-w-[780px]"
        key={projectId}
      >
        <div className="flex gap-5 flex-wrap">
          {fetchInsightsQuery.isPending ? (
            <>
              <Skeleton className="h-[102px] w-[380px] rounded-xl" />
              <Skeleton className="h-[102px] w-[380px] rounded-xl" />
              <Skeleton className="h-[130px] w-full rounded-xl" />
            </>
          ) : null}

          {fetchInsightsQuery.data
            ? fetchInsightsQuery.data.map((insight) => (
                <InsightCard
                  key={insight.id}
                  insight={insight}
                  fullWidth={
                    fetchInsightsQuery.data.length % 2 !== 0 &&
                    fetchInsightsQuery.data.indexOf(insight) ===
                      fetchInsightsQuery.data.length - 1
                  }
                />
              ))
            : null}

          {fetchInsightsQuery.data ? (
            fetchInsightsQuery.data.length === 0 ? (
              <Nothing
                title="No insights found"
                subText="All insights will show up here"
                icon={<Lightbulb />}
              />
            ) : null
          ) : null}
        </div>
      </div>
    </>
  );
}
