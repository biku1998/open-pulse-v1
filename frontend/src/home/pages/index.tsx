import Header from "../../components/header";
import ProjectsList from "../components/projects-list";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex flex-col px-10 py-6">
        <ProjectsList />
      </main>
    </>
  );
}
