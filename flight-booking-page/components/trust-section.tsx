import { ShieldCheck, Lock, BadgeCheck, RefreshCw, Clock, HeartHandshake } from "lucide-react";

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Operadores verificados",
    description: "Trabajamos solo con agencias registradas y con licencia turistica vigente.",
  },
  {
    icon: Lock,
    title: "Pagos encriptados",
    description: "Tus datos viajan cifrados con seguridad de nivel bancario SSL.",
  },
  {
    icon: RefreshCw,
    title: "Cancelacion flexible",
    description: "Cancela gratis hasta 48 horas antes de tu viaje sin penalizacion.",
  },
  {
    icon: HeartHandshake,
    title: "Atencion personalizada",
    description: "Un asesor de viajes te acompana antes, durante y despues del viaje.",
  },
];

const certifications = [
  "Registro Nacional de Turismo",
  "IATA Certified",
  "ANATO Colombia",
  "CANATUR Peru",
];

const paymentMethods = ["Visa", "Mastercard", "American Express", "PSE", "PayPal"];

export function TrustSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-3">
            <BadgeCheck className="h-4 w-4" />
            Viaja con total confianza
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            Tu seguridad y tranquilidad son nuestra prioridad
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Miles de viajeros confian en Airvon cada año. Estas son las garantias que
            respaldan cada reserva.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {guarantees.map((g) => (
            <div
              key={g.title}
              className="bg-card rounded-2xl p-6 border border-border flex flex-col items-start"
            >
              <div className="bg-primary/10 p-3 rounded-xl mb-4">
                <g.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{g.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-accent" />
              Certificaciones y afiliaciones
            </h3>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="bg-secondary text-secondary-foreground text-sm font-medium px-4 py-2 rounded-lg border border-border"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-accent" />
              Metodos de pago seguros
            </h3>
            <div className="flex flex-wrap gap-3">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="bg-secondary text-secondary-foreground text-sm font-medium px-4 py-2 rounded-lg border border-border"
                >
                  {method}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Confirmacion inmediata tras el pago
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
