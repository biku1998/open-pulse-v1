import * as React from "react";
import { useParams } from "react-router-dom";
import { Edit, Lightbulb, Check } from "lucide-react";
import Nothing from "../../../components/nothing";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";
import { cn } from "../../../lib/utils";
import ProjectHeader from "../../components/project-header";
import InsightCard from "../components/insight-card";
import { useFetchInsights } from "../queries";

export default function InsightPage() {
  const { projectId = "" } = useParams();

  const [editModeEnabled, setEditModeEnabled] = React.useState(false);

  const fetchInsightsQuery = useFetchInsights(projectId);

  const toggleEditMode = () => {
    setEditModeEnabled((prev) => !prev);
  };

  const handleInsightDelete = (id: number) => {
    console.log("Delete insight with id: ", id);
  };

  return (
    <>
      <ProjectHeader>
        <Button
          size="icon"
          variant={editModeEnabled ? "default" : "ghost"}
          className={cn(
            "mr-4",
            editModeEnabled ? "" : "text-zinc-500 hover:text-zinc-600",
          )}
          onClick={toggleEditMode}
        >
          {editModeEnabled ? (
            <Check className="h-4 w-4 animate-in slide-in-from-bottom-2" />
          ) : (
            <Edit className="h-4 w-4 animate-in slide-in-from-bottom-2" />
          )}
        </Button>
      </ProjectHeader>
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
                  handleInsightDelete={handleInsightDelete}
                  editModeEnabled={editModeEnabled}
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
