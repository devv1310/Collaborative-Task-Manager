import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  status: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(setTasks)
      .catch(console.error);
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Tasks</h2>

      {tasks.length === 0 && (
        <p className="text-gray-500">No tasks found</p>
      )}

      {tasks.map(task => (
        <div key={task.id} className="border p-2 mb-2 rounded">
          <div className="font-medium">{task.title}</div>
          <div className="text-sm text-gray-500">{task.status}</div>
        </div>
      ))}
    </div>
  );
}
