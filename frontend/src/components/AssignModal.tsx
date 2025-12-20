import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/user.api";
import { updateTask } from "../api/task.api";

export default function AssignModal({ task, onClose }: any) {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const assign = async (userId: string) => {
    await updateTask(task.id, { assignedToId: userId });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-80">
        <h2 className="font-bold mb-3">Assign Task</h2>

        {users.map((u: any) => (
          <button
            key={u.id}
            onClick={() => assign(u.id)}
            className="block w-full text-left p-2 hover:bg-gray-100"
          >
            {u.name}
          </button>
        ))}

        <button onClick={onClose} className="mt-3 text-red-500">
          Close
        </button>
      </div>
    </div>
  );
}
