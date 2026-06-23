"use client";

import { useEffect, useRef, useState } from "react";
import { Users, MapPin, Plane, Star } from "lucide-react";

const stats = [
  { icon: Users, value: 50000, suffix: "+", label: "Viajeros Felices" },
  { icon: MapPin, value: 120, suffix: "+", label: "Destinos" },
  { icon: Plane, value: 15000, suffix: "+", label: "Vuelos Reservados" },
  { icon: Star, value: 4.9, suffix: "/5", label: "Calificacion Promedio", isDecimal: true },
];

function AnimatedNumber({
  value,
  suffix,
  isDecimal,
  run,
}: {
  value: number;
  suffix: string;
  isDecimal?: boolean;
  run: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!run) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [run, value]);

  return (
    <span>
      {isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun) {
          setHasRun(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasRun]);

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                  run={hasRun}
                />
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
