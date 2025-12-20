import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/task.api";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import CreateTask from "../components/CreateTask";

export default function Dashboard() {
const { data = [], isLoading, isError } = useQuery({
  queryKey: ["tasks"],
  queryFn: fetchTasks,
});

if (isLoading) return <div className="p-10">Loading tasks...</div>;
if (isError) return <div className="p-10">No tasks / API error</div>;
const tasks = data;
  

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="grid md:grid-cols-3 gap-6 p-6">
        {/* LEFT: CREATE TASK */}
        <CreateTask />

        {/* RIGHT: TASK LIST */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold">All Tasks</h2>

          {tasks.length === 0 && <p>No tasks found</p>}

          <div className="grid md:grid-cols-2 gap-4">
            {tasks.map((task: any) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
