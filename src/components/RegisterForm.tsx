"use client";
import { useState } from "react";
import { supabase } from "@/app/supabaseClient";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("paciente");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Guardar información adicional en la tabla profiles
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        user_id: data.user?.id,
        full_name: fullName,
        role,
      },
    ]);

    if (profileError) {
      setError(profileError.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Registro</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-4">
        <input
          type="text"
          placeholder="Nombre Completo"
          className="border p-2 rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className="border p-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="paciente">Paciente</option>
          <option value="anestesiólogo">Anestesiólogo</option>
          <option value="cirujano">Cirujano</option>
          <option value="gestor">Gestor</option>
          <option value="administrador">Administrador</option>
        </select>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Registrarse
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
