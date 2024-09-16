import { useContext } from "react";
import { ProjectContext } from "@/context/ProjectContext";

export default function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used in domain of ProjectProvider");
  }
  return context;
}
