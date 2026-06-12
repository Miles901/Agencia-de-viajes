"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Como puedo reservar un vuelo?",
    answer:
      "Simplemente ingresa tu origen, destino, fechas de viaje y numero de pasajeros en nuestro buscador. Te mostraremos las mejores opciones disponibles y podras completar tu reserva en pocos minutos.",
  },
  {
    question: "Los operadores de tours estan verificados?",
    answer:
      "Si, todos nuestros operadores pasan por un riguroso proceso de verificacion. Revisamos licencias, seguros, opiniones de clientes y anos de experiencia antes de incluirlos en nuestra plataforma.",
  },
  {
    question: "Puedo cancelar o modificar mi reserva?",
    answer:
      "Si, puedes modificar o cancelar tu reserva segun las politicas de cada vuelo u operador. Te recomendamos revisar los terminos especificos al momento de reservar. Nuestro equipo de soporte esta disponible 24/7 para ayudarte.",
  },
  {
    question: "Que metodos de pago aceptan?",
    answer:
      "Aceptamos tarjetas de credito y debito (Visa, Mastercard, American Express), transferencias bancarias y pagos a traves de plataformas como PayPal. Todas las transacciones estan protegidas con encriptacion SSL.",
  },
  {
    question: "Ofrecen seguro de viaje?",
    answer:
      "Si, trabajamos con companias de seguros de viaje reconocidas. Puedes agregar un seguro durante el proceso de reserva que cubre cancelaciones, emergencias medicas y perdida de equipaje.",
  },
  {
    question: "Como contacto al soporte si tengo problemas durante mi viaje?",
    answer:
      "Nuestro equipo de soporte esta disponible 24/7 por telefono, WhatsApp y correo electronico. Tambien puedes acceder a tu cuenta para ver tus reservas y contactar directamente al operador de tour.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="h-4 w-4" />
            Preguntas Frecuentes
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Tienes Dudas?
          </h2>
          <p className="text-muted-foreground text-pretty">
            Encuentra respuestas a las preguntas mas comunes sobre nuestros servicios
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-xl overflow-hidden shadow-sm border border-border"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
