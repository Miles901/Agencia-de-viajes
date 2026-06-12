import { Shield, Headphones, CreditCard, Award } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Pago Seguro",
    description: "Transacciones 100% protegidas",
  },
  {
    icon: Headphones,
    title: "Soporte 24/7",
    description: "Asistencia en espanol siempre",
  },
  {
    icon: CreditCard,
    title: "Mejores Precios",
    description: "Garantia de precio bajo",
  },
  {
    icon: Award,
    title: "Operadores Verificados",
    description: "Solo los mejores tours",
  },
];

export function BenefitsBar() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-primary-foreground/10 p-3 rounded-full mb-3">
                <benefit.icon className="h-6 w-6" />
              </div>
              <h4 className="font-bold mb-1">{benefit.title}</h4>
              <p className="text-primary-foreground/70 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
