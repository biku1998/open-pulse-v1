import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import ProjectCard from "./project-card";

export default function ProjectsList() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>

        <Button>
          <Plus className="mr-2 h-5 w-5" /> New project
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </section>
  );
}
