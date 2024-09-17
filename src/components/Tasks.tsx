import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";

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
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Task, DialogManageTaskProps } from "@/types";
import useProject from "@/hooks/useProject";
import GridLayout from "./GridLayout";

export default function Tasks() {
  const { currentActiveProject, currentTasks } = useProject();

  if (!currentActiveProject || currentTasks?.length === 0) {
    return <div className="px-8">No tasks available.</div>;
  }
  return (
    <GridLayout>
      {currentTasks?.map((task: Task) => {
        return (
          <div key={task.id}>
            <div className="h-full flex flex-col border border-gray-300 rounded">
              <div className="flex justify-end gap-2 p-2 border border-b-gray-300">
                <DialogManageTasks
                  CustomLabel={
                    <div className="nonDraggableAreaClassName rounded cursor-pointer text-yellow-500 hover:bg-slate-100">
                      <FaPenToSquare />
                    </div>
                  }
                  task={task}
                />
                <DialogDeleteTask
                  CustomLabel={
                    <div className="nonDraggableAreaClassName rounded cursor-pointer text-red-500 hover:bg-slate-100">
                      <FaRegTrashCan />
                    </div>
                  }
                  task={task}
                />
              </div>
              <div className="px-2 flex-grow">{task.content}</div>
            </div>
          </div>
        );
      })}
    </GridLayout>
  );
}
const DialogManageTasks = ({ CustomLabel, task }: DialogManageTaskProps) => {
  const { updateTask } = useProject();
  const [openDialog, setOpenDialog] = useState(false);

  const { register, handleSubmit, control, reset } = useForm<Task>({
    defaultValues: {
      ...task,
    },
  });

  const onSubmit: SubmitHandler<Task> = (data) => {
    const payload = {
      id: data.id,
      content: data.content,
      state: data.state,
    };

    updateTask(payload);
    setOpenDialog(false);
    reset();
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{CustomLabel}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] nonDraggableAreaClassName">
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
          <DialogClose asChild>
            <Button type="button" onClick={handleSubmit(onSubmit)}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const DialogDeleteTask = ({ CustomLabel, task }: DialogManageTaskProps) => {
  const { deleteTask } = useProject();
  return (
    <Dialog>
      <DialogTrigger asChild>{CustomLabel}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] nonDraggableAreaClassName">
        <DialogHeader>
          <DialogTitle>Delete Tasks</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This action cannot be undone. Are you sure?
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() => {
                deleteTask(task);
              }}
            >
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
