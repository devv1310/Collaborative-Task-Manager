import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../api/auth.api";
import { useAuth } from "../store/auth.context";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: any) => {
    const res = await loginUser(data);
    setUser(res.user);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto space-y-4"
    >
      <h2 className="text-xl font-bold">Login</h2>

      <input
        {...register("email")}
        placeholder="Email"
        className="border p-2 w-full"
      />
      {errors.email && <p className="text-red-500">Invalid email</p>}

      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className="border p-2 w-full"
      />
      {errors.password && <p className="text-red-500">Invalid password</p>}

      <button className="bg-blue-600 text-white px-4 py-2 w-full">
        Login
      </button>
    </form>
  );
}
