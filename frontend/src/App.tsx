import { socket } from "./socket/socket";
import { useEffect, useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./store/auth.context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

interface User {
  id: string;
  name?: string;
  email?: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch current user from your backend or auth service
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return user;
}

function App() {
  const user = useUser();

  useEffect(() => {
    if (user?.id) {
      socket.emit("join", user.id);
    }
  }, [user]);

  useEffect(() => {
    socket.on("taskCreated", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("taskUpdated", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("taskAssigned", (data) => {
      alert(data.message);
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskAssigned");
    };
  }, []);

  return (
    <AuthProvider>
      {/* routes come later */}
      <div className="p-4">Collaborative Task Manager</div>
    </AuthProvider>
  );
}

export default App;