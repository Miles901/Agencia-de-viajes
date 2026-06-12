import Link from "next/link";
import { Plane, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/airvon", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/airvon", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/airvon", label: "Twitter / X" },
  { icon: Youtube, href: "https://youtube.com/airvon", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <Plane className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Airvon</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-5">
              Tu plataforma de confianza para reservar vuelos y tours en Colombia y Peru. Viaja con seguridad y los mejores precios.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Enlaces Rapidos</h4>
            <ul className="space-y-2 text-background/70 text-sm">
              <li>
                <a href="#vuelos" className="hover:text-background transition-colors">
                  Buscar Vuelos
                </a>
              </li>
              <li>
                <Link href="/destinos" className="hover:text-background transition-colors">
                  Destinos Populares
                </Link>
              </li>
              <li>
                <a href="#tours" className="hover:text-background transition-colors">
                  Operadores de Tours
                </a>
              </li>
              <li>
                <Link href="/api-docs" className="hover:text-background transition-colors">
                  API REST
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-background transition-colors">
                  Panel Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Destinos</h4>
            <ul className="space-y-2 text-background/70 text-sm">
              <li>
                <Link href="/destinos/1" className="hover:text-background transition-colors">
                  Cartagena, Colombia
                </Link>
              </li>
              <li>
                <Link href="/destinos/2" className="hover:text-background transition-colors">
                  Cusco, Peru
                </Link>
              </li>
              <li>
                <Link href="/destinos/3" className="hover:text-background transition-colors">
                  Medellin, Colombia
                </Link>
              </li>
              <li>
                <Link href="/destinos/4" className="hover:text-background transition-colors">
                  Lima, Peru
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-3 text-background/70 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@airvon.com" className="hover:text-background transition-colors">
                  info@airvon.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+1234567890" className="hover:text-background transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Bogota, Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            &copy; 2026 Airvon. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-background/60 text-sm">
            <a href="#" className="hover:text-background transition-colors">
              Terminos y Condiciones
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Politica de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
