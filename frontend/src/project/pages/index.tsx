import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function ProjectPage() {
  return (
    <main className="flex flex-col items-center relative pt-24">
      <Navbar />

      <Outlet />
    </main>
  );
}
