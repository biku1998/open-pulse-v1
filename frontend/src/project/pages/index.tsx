import { Outlet } from "react-router-dom";
import { HEADER_HEIGHT } from "../../constants";
import Navbar from "../components/navbar";
import ProjectHeader from "../components/project-header";

export default function ProjectPage() {
  return (
    <>
      <ProjectHeader />
      <main className="relative">
        <Navbar />
        <div
          style={{
            paddingTop: `${HEADER_HEIGHT}px`,
          }}
          className="w-full "
        >
          <Outlet />
        </div>
      </main>
    </>
  );
}
