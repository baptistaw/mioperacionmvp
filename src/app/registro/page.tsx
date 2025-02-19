import RegisterForm from "../../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <RegisterForm />
    </div>
  );
}
