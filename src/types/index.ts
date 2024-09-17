import React from "react";

export type Task = {
  id: number;
  content: string;
  state: "todo" | "inprogress" | "completed";
};

export type Project = {
  id: number;
  project: string;
  priority: string;
  duedate: string;
  tags: string;
  tasks: Task[];
};

export type ProjectContextProps = {
  projects: string;
  currentActiveProject: Project;
  currentTasks: Task[];
  updateProjects: (value: Project) => void;
  updateTask: (task: Task) => void;
  updateActiveProject: (id: number) => void;
  deleteTask: (task: Task) => void;
};

export type DialogManageTaskProps = {
  CustomLabel: React.ReactNode;
  task: Task;
};

export type NewTaskInputProps = {
  id: number;
  project: string;
  priority: string;
  duedate: Date;
  tags: string;
  tasks: Task[];
};
