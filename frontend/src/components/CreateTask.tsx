import { useForm } from "react-hook-form";
import { createTask } from "../api/task.api";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateTask() {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

 const onSubmit = async (data: any) => {
  await createTask(data);
  queryClient.invalidateQueries({ queryKey: ["tasks"] });
  reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 rounded shadow space-y-3"
    >
      <h2 className="text-lg font-bold">Create Task</h2>

      <input
        {...register("title")}
        placeholder="Task title"
        className="border p-2 w-full"
      />

      <textarea
        {...register("description")}
        placeholder="Description"
        className="border p-2 w-full"
      />

      <input
        type="date"
        {...register("dueDate")}
        className="border p-2 w-full"
      />

      <select {...register("priority")} className="border p-2 w-full">
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="URGENT">Urgent</option>
      </select>

      <select {...register("status")} className="border p-2 w-full">
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="REVIEW">Review</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <input
        {...register("assignedToId")}
        placeholder="Assign User ID"
        className="border p-2 w-full"
      />

      <button className="bg-blue-600 text-white w-full py-2 rounded">
        Create Task
      </button>
    </form>
  );
}
