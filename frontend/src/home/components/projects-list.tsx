import { useFetchProjects } from "../queries";
import ProjectCard from "./project-card";

export default function ProjectsList() {
  const fetchProjectsQuery = useFetchProjects();

  if (fetchProjectsQuery.isLoading) return <span>Loading...</span>;

  if (fetchProjectsQuery.error) return null;

  return (
    <div className="grid grid-cols-4 gap-6">
      {fetchProjectsQuery.data
        ? fetchProjectsQuery.data.map(
            ({ project, channelCount, insightCount }) => (
              <ProjectCard
                key={project.id}
                name={project.name}
                id={project.id}
                channelsCount={channelCount}
                insightsCount={insightCount}
              />
            ),
          )
        : null}
    </div>
  );
}
