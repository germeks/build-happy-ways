import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Landmark,
  UtensilsCrossed,
  MapPin,
  Compass,
  Sparkles,
  Clock,
  Sun,
  Wallet,
  Train,
  ChevronDown,
} from "lucide-react";
import heroRoma from "@/assets/hero-roma.jpg";
import gastronomia from "@/assets/gastronomia.jpg";
import trevi from "@/assets/trevi.jpg";
import pantheon from "@/assets/pantheon.jpg";
import trastevere from "@/assets/trastevere.jpg";
import vaticano from "@/assets/vaticano.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guía de Viaje a Roma | La Ciudad Eterna" },
      {
        name: "description",
        content:
          "Guía premium e interactiva para descubrir Roma: monumentos, barrios, gastronomía romana e itinerarios día a día.",
      },
      { property: "og:title", content: "Guía de Viaje a Roma" },
      {
        property: "og:description",
        content: "Monumentos, barrios, gastronomía e itinerarios para vivir Roma como un local.",
      },
    ],
  }),
  component: Index,
});

const atracciones = [
  {
    nombre: "Coliseo",
    barrio: "Centro Histórico",
    img: heroRoma,
    tag: "Imprescindible",
    descripcion:
      "El anfiteatro más grande del mundo antiguo. Reserva entrada combinada con el Foro Romano y el Palatino.",
    horario: "8:30 – 19:15",
  },
  {
    nombre: "Fontana di Trevi",
    barrio: "Trevi",
    img: trevi,
    tag: "Icono",
    descripcion:
      "Obra maestra del barroco. Lánzala moneda con la mano derecha sobre el hombro izquierdo: volverás a Roma.",
    horario: "Abierta 24 h",
  },
  {
    nombre: "Panteón",
    barrio: "Pigna",
    img: pantheon,
    tag: "Arquitectura",
    descripcion:
      "La cúpula de hormigón sin refuerzo más grande del mundo. El óculo crea un haz de luz casi sagrado.",
    horario: "9:00 – 19:00",
  },
  {
    nombre: "Ciudad del Vaticano",
    barrio: "Vaticano",
    img: vaticano,
    tag: "Día completo",
    descripcion:
      "Basílica de San Pedro, cúpula de Miguel Ángel y los Museos Vaticanos con la Capilla Sixtina.",
    horario: "7:00 – 19:00",
  },
];

const itinerario = [
  {
    dia: "Día 1",
    titulo: "Roma Imperial",
    paradas: ["Coliseo", "Foro Romano", "Palatino", "Piazza Venezia", "Campidoglio al atardecer"],
  },
  {
    dia: "Día 2",
    titulo: "Centro Barroco",
    paradas: ["Panteón", "Piazza Navona", "Fontana di Trevi", "Plaza de España", "Cena en Trastevere"],
  },
  {
    dia: "Día 3",
    titulo: "Vaticano & Más Allá",
    paradas: ["Museos Vaticanos", "Capilla Sixtina", "Basílica de San Pedro", "Castel Sant'Angelo"],
  },
];

const consejos = [
  { icon: Sun, titulo: "Mejor época", texto: "Abril–junio y septiembre–octubre. Temperaturas suaves y menos colas." },
  { icon: Wallet, titulo: "Presupuesto diario", texto: "Medio: 90–130 € · Alto: 200 €+ · Imprescindible: Roma Pass." },
  { icon: Train, titulo: "Cómo moverse", texto: "El centro se recorre a pie. Metro A y B para distancias largas." },
  { icon: Clock, titulo: "Reserva con tiempo", texto: "Coliseo y Vaticano se agotan. Compra online con 2–3 semanas." },
];

const gastronomiaItems = [
  { nombre: "Cacio e Pepe", desc: "Pasta, pecorino romano y pimienta negra. Tres ingredientes, técnica infalible." },
  { nombre: "Carbonara", desc: "Guanciale, huevo, pecorino y pimienta. Sin nata, jamás." },
  { nombre: "Saltimbocca alla Romana", desc: "Ternera, jamón y salvia al vino blanco." },
  { nombre: "Supplì", desc: "Croqueta de arroz con tomate y mozzarella fundida en el corazón." },
  { nombre: "Carciofi alla Giudia", desc: "Alcachofas fritas crujientes del barrio judío." },
  { nombre: "Maritozzo", desc: "Bollo dulce relleno de nata. El desayuno romano por excelencia." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <SectionAtracciones />
      <SectionGastronomia />
      <SectionItinerario />
      <SectionBarrios />
      <SectionConsejos />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <header className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <img
        src={heroRoma}
        alt="El Coliseo de Roma al amanecer"
        className="absolute inset-0 h-full w-full object-cover"
        width={1080}
        height={1920}
      />
      <div className="absolute inset-0 gradient-overlay" />

      <nav className="relative z-10 flex items-center justify-between px-6 pt-6">
        <span className="font-display text-lg text-white/95 tracking-wide">Roma</span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">Guía 2026</span>
      </nav>

      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-12">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold">La Ciudad Eterna</p>
        <h1 className="font-display text-5xl leading-[1.02] text-white text-balance sm:text-6xl">
          Roma,<br />
          <span className="italic text-gold">como un local.</span>
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-white/85">
          Una guía interactiva con los monumentos imprescindibles, los barrios más auténticos
          y los sabores que solo conocen los romanos.
        </p>
        <div className="mt-8 flex items-center gap-2 text-white/70">
          <span className="text-xs uppercase tracking-widest">Desliza</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </header>
  );
}

function SectionHeading({ eyebrow, title, icon: Icon }: { eyebrow: string; title: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-2 text-primary">
        <Icon className="h-4 w-4" />
        <span className="text-[10px] uppercase tracking-[0.3em]">{eyebrow}</span>
      </div>
      <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">{title}</h2>
      <div className="gold-divider mt-5 w-24" />
    </div>
  );
}

function SectionAtracciones() {
  const [activo, setActivo] = useState(0);
  const item = atracciones[activo];

  return (
    <section className="px-6 py-20">
      <SectionHeading eyebrow="Imprescindibles" title="Monumentos icónicos" icon={Landmark} />

      <div className="-mx-6 mb-6 flex gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {atracciones.map((a, i) => (
          <button
            key={a.nombre}
            onClick={() => setActivo(i)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
              activo === i
                ? "border-primary bg-primary text-primary-foreground shadow-soft"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {a.nombre}
          </button>
        ))}
      </div>

      <article className="overflow-hidden rounded-3xl bg-card shadow-lift">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <img
            key={item.img}
            src={item.img}
            alt={item.nombre}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            width={1024}
            height={1280}
          />
          <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-primary backdrop-blur">
            {item.tag}
          </div>
        </div>
        <div className="p-6">
          <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {item.barrio}
          </div>
          <h3 className="font-display text-2xl">{item.nombre}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.descripcion}</p>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3 w-3" /> {item.horario}
            </span>
            <span className="font-medium uppercase tracking-widest text-gold">
              {activo + 1} / {atracciones.length}
            </span>
          </div>
        </div>
      </article>
    </section>
  );
}

function SectionGastronomia() {
  return (
    <section className="bg-secondary px-6 py-20">
      <SectionHeading eyebrow="Cucina romana" title="Sabores de Roma" icon={UtensilsCrossed} />

      <div className="overflow-hidden rounded-3xl shadow-lift">
        <img
          src={gastronomia}
          alt="Cacio e pepe, pasta romana tradicional"
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
          width={1024}
          height={1024}
        />
      </div>

      <ul className="mt-8 space-y-4">
        {gastronomiaItems.map((g, i) => (
          <li key={g.nombre} className="flex gap-4 rounded-2xl bg-card p-5 shadow-soft">
            <span className="font-display text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex-1">
              <h3 className="font-display text-lg">{g.nombre}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{g.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SectionItinerario() {
  const [abierto, setAbierto] = useState(0);
  return (
    <section className="px-6 py-20">
      <SectionHeading eyebrow="3 días perfectos" title="Itinerario día a día" icon={Compass} />

      <div className="space-y-3">
        {itinerario.map((d, i) => {
          const open = abierto === i;
          return (
            <div
              key={d.dia}
              className={`overflow-hidden rounded-2xl border transition-all ${
                open ? "border-primary bg-card shadow-lift" : "border-border bg-card/60"
              }`}
            >
              <button
                onClick={() => setAbierto(open ? -1 : i)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{d.dia}</p>
                  <h3 className="mt-1 font-display text-xl">{d.titulo}</h3>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ol className="space-y-2 px-5 pb-5">
                    {d.paradas.map((p, idx) => (
                      <li key={p} className="flex items-center gap-3 text-sm">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-medium text-primary">
                          {idx + 1}
                        </span>
                        <span className="text-foreground/85">{p}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SectionBarrios() {
  return (
    <section className="px-6 py-20">
      <SectionHeading eyebrow="Vita romana" title="Barrios con alma" icon={Sparkles} />

      <article className="overflow-hidden rounded-3xl shadow-lift">
        <div className="relative aspect-[3/4] w-full">
          <img
            src={trastevere}
            alt="Calle empedrada de Trastevere al atardecer"
            loading="lazy"
            className="h-full w-full object-cover"
            width={1024}
            height={1280}
          />
          <div className="absolute inset-0 gradient-overlay" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Trastevere</p>
            <h3 className="mt-2 font-display text-3xl">El corazón bohemio</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/85">
              Callejuelas adoquinadas, hiedra en las paredes ocres y trattorias donde se cena
              tarde. Cruza el Tíber al caer la noche y déjate perder.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

function SectionConsejos() {
  return (
    <section className="bg-secondary px-6 py-20">
      <SectionHeading eyebrow="Antes de viajar" title="Consejos prácticos" icon={Compass} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {consejos.map((c) => (
          <div key={c.titulo} className="rounded-2xl bg-card p-5 shadow-soft">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg">{c.titulo}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 text-center">
      <p className="font-display text-2xl italic text-primary">Arrivederci, Roma.</p>
      <div className="gold-divider mx-auto mt-6 w-16" />
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Guía de Viaje · Edición 2026
      </p>
    </footer>
  );
}
