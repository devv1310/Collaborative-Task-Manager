import { updateTask } from "../api/task.api";
import { useQueryClient } from "@tanstack/react-query";

export default function StatusDropdown({ task }: any) {
  const queryClient = useQueryClient();

const changeStatus = async (status: string) => {
  await updateTask(task.id, { status });
  queryClient.invalidateQueries({ queryKey: ["tasks"] });
};


  return (
    <select
      value={task.status}
      onChange={(e) => changeStatus(e.target.value)}
      className="border px-2 py-1 rounded text-sm"
    >
      <option value="TODO">To Do</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="REVIEW">Review</option>
      <option value="COMPLETED">Completed</option>
    </select>
  );
}
