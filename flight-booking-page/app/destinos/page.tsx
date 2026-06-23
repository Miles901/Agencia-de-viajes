import { DestinationCatalog } from "@/components/destination-catalog";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Catalogo de Destinos - Airvon",
  description: "Explora todos los destinos disponibles en Colombia y Peru con Airvon.",
};

export default function DestinosPage() {
  return (
    <>
      <Header />
      <DestinationCatalog />
      <Footer />
    </>
  );
}
