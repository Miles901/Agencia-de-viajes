"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-primary/80">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
          Recibe Ofertas Exclusivas
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-pretty">
          Suscribete a nuestro boletin y recibe las mejores ofertas de vuelos y tours directamente
          en tu correo. Sin spam, solo oportunidades de viaje increibles.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-3 bg-primary-foreground/20 text-primary-foreground px-6 py-4 rounded-xl">
            <CheckCircle className="h-6 w-6" />
            <span className="font-medium">Gracias por suscribirte. Pronto recibiras nuestras ofertas.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Tu correo electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 bg-primary-foreground text-foreground placeholder:text-muted-foreground border-0"
            />
            <Button
              type="submit"
              className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90"
            >
              Suscribirme
              <Send className="h-4 w-4 ml-2" />
            </Button>
          </form>
        )}

        <p className="text-primary-foreground/60 text-sm mt-4">
          Al suscribirte aceptas nuestra politica de privacidad
        </p>
      </div>
    </section>
  );
}
