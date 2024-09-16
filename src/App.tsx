import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { ProjectProvider } from "./context/ProjectContext";

export default function App() {
  return (
    <div className="max-w-screen-lg min-h-screen mx-auto border border-x-gray-300">
      <ProjectProvider>
        <Header />
        <Tasks />
      </ProjectProvider>
    </div>
  );
}
