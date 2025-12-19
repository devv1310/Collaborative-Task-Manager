import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../api/auth.api";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: any) => {
    await registerUser(data);
    alert("Registered successfully");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto space-y-4"
    >
      <h2 className="text-xl font-bold">Register</h2>

      <input {...register("name")} placeholder="Name" className="border p-2 w-full" />
      {errors.name && <p className="text-red-500">Name required</p>}

      <input {...register("email")} placeholder="Email" className="border p-2 w-full" />
      {errors.email && <p className="text-red-500">Invalid email</p>}

      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className="border p-2 w-full"
      />
      {errors.password && <p className="text-red-500">Min 6 chars</p>}

      <button className="bg-green-600 text-white px-4 py-2 w-full">
        Register
      </button>
    </form>
  );
}
