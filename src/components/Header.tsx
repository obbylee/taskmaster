import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import useProject from "@/hooks/useProject";
import { Textarea } from "./ui/textarea";
import { Task, NewTaskInputProps } from "@/types";

export default function Header() {
  return (
    <header className="flex flex-col justify-center p-8 gap-4">
      <div className="flex justify-between items-center">
        <ProjectList />
        <ButtonAddNewProject />
      </div>

      <ProjectInfo />
    </header>
  );
}

const ProjectList = () => {
  const { projects, updateActiveProject } = useProject();
  const allProject = JSON.parse(projects);

  return (
    <Select
      onValueChange={(val) => {
        const id = Number(val) || 0;
        updateActiveProject(id);
      }}
    >
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Choose Projects" />
      </SelectTrigger>
      <SelectContent>
        {allProject.map((val: any) => (
          <SelectItem key={val.id} value={val.id}>
            {val.project}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const ButtonAddNewProject = () => {
  const { updateProjects } = useProject();

  const { register, handleSubmit, control, reset } = useForm<NewTaskInputProps>(
    {
      defaultValues: {
        project: "",
        priority: "low",
        duedate: new Date(),
        tags: "",
      },
    }
  );
  const onSubmit: SubmitHandler<NewTaskInputProps> = (data) => {
    const payload = {
      id: Date.now(),
      project: data.project,
      priority: data.priority,
      duedate: format(data.duedate, "yyyy-MM-dd"),
      tags: data.tags,
      tasks: [],
    };

    updateProjects(payload);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
          <DialogDescription>
            Start your idea here, Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Name</Label>
            <Input
              placeholder="Enter project name ..."
              className="col-span-3"
              {...register("project", { required: true })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Priority</Label>
            <Controller
              name="priority"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                );
              }}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Duedate</Label>
            <Controller
              name="duedate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                );
              }}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Tags</Label>
            <Input
              placeholder="Enter tags ..."
              className="col-span-3"
              {...register("tags", { required: true })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit(onSubmit)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ProjectInfo = () => {
  const { currentActiveProject } = useProject();
  return (
    <div className="flex gap-8">
      <div className="flex flex-col">
        <span>Priority</span>
        <span>Due date</span>
        <span>Tags</span>
        <span>Tasks</span>
      </div>

      <div className="flex flex-col">
        <span>{currentActiveProject?.priority ?? "-"}</span>
        <span>{currentActiveProject?.duedate ?? "-"}</span>
        <span>{currentActiveProject?.tags ?? "-"}</span>
        <span>
          {currentActiveProject?.tasks?.length >= 0 ? <AddNewTasks /> : "-"}
        </span>
      </div>
    </div>
  );
};

const AddNewTasks = () => {
  const { updateTask } = useProject();

  const { register, handleSubmit, control, reset } = useForm<Task>({
    defaultValues: {
      id: 0,
      content: "",
      state: "todo",
    },
  });
  const onSubmit: SubmitHandler<Task> = (data) => {
    const payload = {
      id: Date.now(),
      content: data.content,
      state: data.state,
    };
    updateTask(payload);
    reset();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">New Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tasks</DialogTitle>
          <DialogDescription>
            Start your idea here, Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Content</Label>
            <Textarea
              placeholder="Type your message here."
              className="col-span-3"
              {...register("content", { required: true })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">State</Label>
            <Controller
              name="state"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="inprogress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                );
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit(onSubmit)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
