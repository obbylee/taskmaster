import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, FC, ReactNode, useState } from "react";

type Task = {
  id: number;
  content: string;
  state: "todo" | "inprogress" | "completed";
};

type Project = {
  id: number;
  project: string;
  priority: string;
  duedate: string;
  tags: string;
  tasks: Task[];
};

type ProjectContextProps = {
  projects: string;
  currentActiveProject: Project;
  currentTasks: Task[];
  updateProjects: (value: Project) => void;
  updateTask: (task: Task) => void;
  updateActiveProject: (id: number) => void;
};

export const ProjectContext = createContext<ProjectContextProps | null>(null);

export const ProjectProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useLocalStorage<string>("taskmaster", "[]");
  const [activeProject, setActiveProject] = useState<number>(0);

  const allProjects = JSON.parse(projects);

  const currentActiveProject = allProjects.find(
    (val: Project) => val.id === activeProject
  );

  const currentTasks = currentActiveProject?.tasks;

  function updateProjects(value: Project) {
    const data = JSON.parse(projects);

    data.push(value);

    setProjects(JSON.stringify(data));
  }

  function updateTask(task: Task) {
    const data = JSON.parse(projects);
    try {
      const indexOfProject = allProjects.indexOf(currentActiveProject);

      const isExist = data[indexOfProject]?.tasks?.find(
        (current: Task) => current.id === task.id
      );

      if (isExist) {
        isExist.content = task.content;
        isExist.state = task.state;
      } else {
        data[indexOfProject]?.tasks?.push(task);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProjects(JSON.stringify(data));
    }
  }

  function updateActiveProject(id: number) {
    setActiveProject(id);
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentActiveProject,
        currentTasks,
        updateProjects,
        updateTask,
        updateActiveProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
