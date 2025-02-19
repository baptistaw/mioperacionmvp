"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/app/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        router.push("/");
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Bienvenido al Dashboard</h2>
      {user && <p>Email: {user.email}</p>}
      <button
        className="bg-red-500 text-white p-2 rounded mt-4"
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/");
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
