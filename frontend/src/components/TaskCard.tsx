import { useState } from "react";
import StatusDropdown from "./StatusDropdown";
import AssignModal from "./AssignModal";

export default function TaskCard({ task }: any) {
  const [open, setOpen] = useState(false);

  const statusColor: any = {
    TODO: "bg-gray-200",
    IN_PROGRESS: "bg-yellow-200",
    REVIEW: "bg-purple-200",
    COMPLETED: "bg-green-200",
  };

  const priorityColor: any = {
    LOW: "text-green-600",
    MEDIUM: "text-yellow-600",
    HIGH: "text-orange-600",
    URGENT: "text-red-600",
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      {/* Title + Status */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <span className={`px-2 py-1 text-sm rounded ${statusColor[task.status]}`}>
          {task.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-2">
        {task.description}
      </p>

      {/* Meta */}
      <div className="flex justify-between mt-3 text-sm text-gray-500">
        <span className={`font-semibold ${priorityColor[task.priority]}`}>
          Priority: {task.priority}
        </span>
        <span>Due: {new Date(task.dueDate).toDateString()}</span>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-4">
        <StatusDropdown task={task} />

        <button
          onClick={() => setOpen(true)}
          className="text-blue-600 text-sm hover:underline"
        >
          Assign
        </button>
      </div>

      {/* Assign Modal */}
      {open && (
        <AssignModal
          task={task}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
