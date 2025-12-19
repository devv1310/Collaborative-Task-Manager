import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/task.api";
import { useAuth } from "../store/auth.context";
import type { Task } from "../types/task";
import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { useQueryClient } from "@tanstack/react-query";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortByDate, setSortByDate] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("taskUpdated", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("taskCreated", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    return () => {
      socket.off("taskUpdated");
      socket.off("taskCreated");
    };
  }, [queryClient]);

  if (isLoading) {
    return <div className="animate-pulse">Loading tasks...</div>;
  }

  const now = new Date();

  let filteredTasks = tasks.filter((task: Task) => {
    if (statusFilter && task.status !== statusFilter) return false;
    if (priorityFilter && task.priority !== priorityFilter) return false;
    return true;
  });

  if (sortByDate) {
    filteredTasks.sort(
      (a: Task, b: Task) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  }

  const assignedToMe = filteredTasks.filter(
    (t: Task) => t.assignedToId === user?.id
  );

  const createdByMe = filteredTasks.filter(
    (t: Task) => t.creatorId === user?.id
  );

  const overdue = filteredTasks.filter(
    (t: Task) => new Date(t.dueDate) < now && t.status !== "COMPLETED"
  );

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2"
        >
          <option value="">All Status</option>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="REVIEW">Review</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <select
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border p-2"
        >
          <option value="">All Priority</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>

        <button
          onClick={() => setSortByDate(!sortByDate)}
          className="border px-4"
        >
          Sort by Due Date
        </button>
      </div>

      {/* Sections */}
      <Section title="Assigned to Me" tasks={assignedToMe} />
      <Section title="Created by Me" tasks={createdByMe} />
      <Section title="Overdue Tasks" tasks={overdue} />


      <div className="p-4">
      <h1 className="text-2xl font-bold">
        Welcome {user?.name || "User"} 🎉
      </h1>
      <p>Dashboard Loaded Successfully</p>
    </div>
    </div>
  );
}

function Section({ title, tasks }: { title: string; tasks: Task[] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      {tasks.length === 0 && <p className="text-gray-500">No tasks</p>}
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="border p-3 rounded flex justify-between"
          >
            <span>{task.title}</span>
            <span className="text-sm text-gray-500">{task.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
