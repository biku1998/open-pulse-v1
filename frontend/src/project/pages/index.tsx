import * as React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { Check, ChevronRight, ChevronsUpDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Skeleton } from "../../components/ui/skeleton";
import { HEADER_HEIGHT, NAVBAR_WIDTH } from "../../constants";
import { useFetchProjects } from "../../home/queries";
import { cn } from "../../lib/utils";
import Navbar from "../components/navbar";

export default function ProjectPage() {
  const { id: projectId = "" } = useParams();

  const fetchProjectsQuery = useFetchProjects();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(projectId);

  return (
    <main className="flex flex-col items-center relative pt-24">
      <Navbar />
      <header
        className="absolute top-0 flex items-center w-full"
        style={{
          height: `${HEADER_HEIGHT}px`,
          paddingLeft: `${NAVBAR_WIDTH}px`,
        }}
      >
        <div className="flex items-center gap-2 border-b border-solid border-slate-200 w-full h-full px-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-zinc-500">
              Projects
            </Button>
          </Link>
          <ChevronRight className="w-5 h-5 text-zinc-300" />
          {fetchProjectsQuery.isPending ? (
            <Skeleton className="h-[35px] w-[200px]" />
          ) : null}

          {fetchProjectsQuery.data ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  role="combobox"
                  aria-expanded={open}
                  className="min-w-[200px] justify-between text-zinc-600 animate-in slide-in-from-bottom-2"
                >
                  {value
                    ? fetchProjectsQuery.data.find(
                        ({ project }) => project.id === value,
                      )?.project.name
                    : "Select project..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] max-h-[350px] overflow-y-auto p-0">
                <Command>
                  <CommandInput placeholder="Search project..." />
                  <CommandEmpty>No project found.</CommandEmpty>
                  <CommandGroup>
                    {fetchProjectsQuery.data.map(({ project }) => (
                      <Link key={project.id} to={`/project/${project.id}`}>
                        <CommandItem
                          key={project.id}
                          value={project.id}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue,
                            );
                            setOpen(false);
                          }}
                          className="cursor-pointer"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === project.id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {project.name}
                        </CommandItem>
                      </Link>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          ) : null}
        </div>
      </header>
      <Outlet />
    </main>
  );
}
