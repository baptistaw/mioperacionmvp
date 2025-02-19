import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <LoginForm />
    </div>
  );
}
