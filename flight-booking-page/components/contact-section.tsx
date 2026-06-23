"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "+57 (1) 234-5678",
    href: "tel:+5712345678",
  },
  {
    icon: Mail,
    label: "Correo",
    value: "info@airvon.com",
    href: "mailto:info@airvon.com",
  },
  {
    icon: MapPin,
    label: "Oficina",
    value: "Calle 93 #13-24, Bogotá, Colombia",
    href: "https://maps.google.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+57 310 000 0000",
    href: "https://wa.me/573100000000",
  },
];

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    toast.success("Mensaje enviado correctamente. Te contactaremos pronto.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Mail className="h-4 w-4" />
            Contáctanos
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            ¿Tienes alguna pregunta?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Nuestro equipo está disponible para ayudarte a planificar el viaje de tus sueños.
            Escríbenos y te responderemos en menos de 24 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="bg-primary/10 p-2.5 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground leading-snug">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-foreground mb-2">Horario de atención</h3>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Lunes – Viernes</span>
                  <span className="font-medium text-foreground">8:00 – 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado</span>
                  <span className="font-medium text-foreground">9:00 – 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo</span>
                  <span className="font-medium text-foreground">Solo WhatsApp</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-2xl border border-border p-8 shadow-sm">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <h3 className="text-xl font-bold text-foreground">¡Mensaje enviado!</h3>
                <p className="text-muted-foreground">Te contactaremos en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Nombre *
                    </label>
                    <Input
                      placeholder="Tu nombre completo"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Correo *
                    </label>
                    <Input
                      type="email"
                      placeholder="tu@correo.com"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Asunto
                  </label>
                  <Input
                    placeholder="¿En qué podemos ayudarte?"
                    value={form.subject}
                    onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Mensaje *
                  </label>
                  <textarea
                    placeholder="Cuéntanos sobre tu viaje ideal, fechas, destino, número de personas..."
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    required
                    rows={5}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={sending}>
                  {sending ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
