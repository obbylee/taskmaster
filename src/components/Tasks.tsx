// @ts-nocheck
import "react-grid-layout/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import { FaEye, FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import useProject from "@/hooks/useProject";
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
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Textarea } from "./ui/textarea";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Tasks() {
  const { currentActiveProject, currentTasks } = useProject();

  if (!currentActiveProject || currentTasks?.length === 0) {
    return <div className="px-8">No tasks available.</div>;
  }

  return (
    <div className="">
      <ResponsiveGridLayout
        width={1200}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 3, sm: 3, xs: 3, xxs: 3 }}
        isResizable={false}
      >
        {currentTasks?.map((task) => {
          return (
            <div key={task.id}>
              <div className="h-full flex flex-col border border-gray-300 rounded">
                <div className="flex justify-end gap-2 p-2 border border-b-gray-300">
                  <div className="rounded cursor-pointer text-gray-500 hover:bg-slate-100">
                    <FaEye />
                  </div>
                  <div className="rounded cursor-pointer text-yellow-500 hover:bg-slate-100">
                    <FaPenToSquare />
                  </div>
                  <div className="rounded cursor-pointer text-red-500 hover:bg-slate-100">
                    <FaRegTrashCan />
                  </div>
                </div>
                <div className="px-2 flex-grow">{task.content}</div>
              </div>
            </div>
          );
        })}

        <div key="B" data-grid={{ i: 1234, x: 1, y: 1, w: 1, h: 1 }}>
          <div className="h-full flex flex-col border border-gray-300 rounded">
            <div className="flex justify-end gap-2 p-2 border border-b-gray-300">
              <div className="rounded cursor-pointer text-gray-500 hover:bg-slate-100">
                <FaEye />
              </div>
              <div className="rounded cursor-pointer text-yellow-500 hover:bg-slate-100">
                <FaPenToSquare />
              </div>
              <div className="rounded cursor-pointer text-red-500 hover:bg-slate-100">
                <FaRegTrashCan />
              </div>
            </div>
            <div className="px-2 flex-grow">Lorem ipsum dolor sit amet.</div>
          </div>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}
const AddNewTasks = () => {
  const { updateTask } = useProject();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: {
      id: Date.now(),
      content: "",
      state: "todo",
    },
  });
  const onSubmit: SubmitHandler<Task> = (data) => {
    const payload = {
      id: data.id,
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
