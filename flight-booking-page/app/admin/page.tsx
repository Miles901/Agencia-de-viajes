import { AdminDashboard } from "@/components/admin-dashboard";
import { Header } from "@/components/header";

export const metadata = {
  title: "Panel de Administracion - Airvon",
  description: "Gestiona reservas y solicitudes de Airvon",
};

export default function AdminPage() {
  return (
    <>
      <Header />
      <AdminDashboard />
    </>
  );
}
