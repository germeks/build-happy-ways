import { useEffect, useMemo, useState } from "react";
import {
  Plane,
  MapPin,
  Calendar,
  Train,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Utensils,
  Search,
  BookOpen,
  Printer,
  ChevronRight,
  Sparkles,
  Info,
  Car,
  Footprints,
  Navigation,
  Home
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FLIGHT_IDA, FLIGHT_VUELTA, GENERAL_RESTAURANTS, DAYS, EXTRAS } from "./data";
import { Day, Activity, ExtraItem } from "./types";
import TicketModal, { PrintableColosseumTickets } from "./components/TicketModal";

export default function App() {
  // Navigation active tab / scroll helper
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRestCategory, setSelectedRestCategory] = useState<string>("all");
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [printWithPageBreaks, setPrintWithPageBreaks] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isPrintingTicketsOnly, setIsPrintingTicketsOnly] = useState(false);

  // Checklist of visited activities
  const [visited, setVisited] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("rome_visited_activities");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Calculate stats
  const totalActivities = useMemo(() => {
    return DAYS.reduce((sum, day) => sum + day.items.length, 0);
  }, []);

  const visitedCount = useMemo(() => {
    return visited.length;
  }, [visited]);

  const progressPercentage = useMemo(() => {
    if (totalActivities === 0) return 0;
    return Math.round((visitedCount / totalActivities) * 100);
  }, [visitedCount, totalActivities]);

  // Persist visited checklist
  useEffect(() => {
    localStorage.setItem("rome_visited_activities", JSON.stringify(visited));
  }, [visited]);

  const toggleVisited = (id: string) => {
    setVisited((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // State for Countdown Timer
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    status: "countdown" | "ongoing" | "completed";
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, status: "countdown" });

  useEffect(() => {
    const tripStart = new Date("2026-06-12T17:10:00Z").getTime();
    const tripEnd = new Date("2026-06-15T18:50:00Z").getTime();

    const calculateTime = () => {
      const now = new Date().getTime(); // Standard system clock load

      if (now < tripStart) {
        const diff = tripStart - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds, status: "countdown" as const };
      } else if (now >= tripStart && now <= tripEnd) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, status: "ongoing" as const };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, status: "completed" as const };
      }
    };

    setTimeLeft(calculateTime());
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Filtered days list (if day-specific tabs are used)
  const filteredDays = useMemo(() => {
    if (activeTab === "all" || activeTab === "food" || activeTab === "extras") {
      return DAYS;
    }
    const dayNum = parseInt(activeTab);
    return DAYS.filter((d) => d.number === dayNum);
  }, [activeTab]);

  // Handle scrolling to sections dynamically
  const scrollToId = (id: string, delay = 120) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const topOfs = el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0);
        window.scrollTo({
          top: Math.max(0, topOfs - 75),
          behavior: "smooth"
        });
      }
    }, delay);
  };

  // Switch tabs and scroll immediately to the beginning of the selected module
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    
    if (tabId === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Delay slightly to let React update the filtered elements in the DOM
    setTimeout(() => {
      let targetId = "";
      if (tabId === "food") {
        targetId = "gastronomy";
      } else if (tabId === "extras") {
        targetId = "extras-section";
      } else {
        targetId = `day-section-${tabId}`;
      }

      const el = document.getElementById(targetId);
      if (el) {
        const topOfs = el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0);
        window.scrollTo({
          top: Math.max(0, topOfs - 75),
          behavior: "smooth"
        });
      }
    }, 120);
  };

  // Get transportation icon
  const getTransportIcon = (type: string) => {
    switch (type) {
      case "train":
        return <Train className="w-4 h-4 text-amber-600" />;
      case "bus":
        return <Car className="w-4 h-4 text-emerald-600" />;
      case "walk":
        return <Footprints className="w-4 h-4 text-zinc-500" />;
      default:
        return <Navigation className="w-4 h-4 text-zinc-500" />;
    }
  };

  // Helper for printer view
  const triggerPrint = () => {
    setIsPrintModalOpen(true);
  };

  // Auto-trigger printing/PDF logic if specified in URL query params
  // This bypasses preview iframe sandbox restrictions beautifully and reliably.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("print") === "true") {
      const breaksEnabled = params.get("breaks") === "true";
      setPrintWithPageBreaks(breaksEnabled);
      
      // Let the page render fully before calling print
      const timer = setTimeout(() => {
        try {
          window.print();
        } catch (e) {
          console.error("Auto print failed:", e);
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (params.get("ticket") === "true") {
      document.body.classList.add("printing-tickets-only");
      setIsPrintingTicketsOnly(true);
      
      const timer = setTimeout(() => {
        try {
          window.print();
        } catch (e) {
          console.error("Auto ticket print failed:", e);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handlePrintOnlyTickets = () => {
    setIsTicketModalOpen(false);

    // If running in an iframe, direct window.print() is blocked.
    // Opening a new tab with the ticket=true parameter is a highly reliable pattern.
    const isIframe = window.top !== window.self;

    if (isIframe) {
      const printUrl = `${window.location.origin}${window.location.pathname}?ticket=true`;
      window.open(printUrl, "_blank");
    } else {
      document.body.classList.add("printing-tickets-only");
      setIsPrintingTicketsOnly(true);
      setTimeout(() => {
        try {
          window.print();
        } catch (e) {
          const printUrl = `${window.location.origin}${window.location.pathname}?ticket=true`;
          window.open(printUrl, "_blank");
        } finally {
          // Note: we can remove the class or keep it. It's clean to remove it.
          document.body.classList.remove("printing-tickets-only");
          setIsPrintingTicketsOnly(false);
        }
      }, 300);
    }
  };

  const confirmPrint = (withPageBreaks: boolean) => {
    setPrintWithPageBreaks(withPageBreaks);
    setIsPrintModalOpen(false);

    // If the application is running inside an iframe, direct window.print() is blocked by most browsers.
    // Opening a new tab with the print=true parameter is a highly reliable UX pattern.
    const isIframe = window.top !== window.self;

    if (isIframe) {
      const printUrl = `${window.location.origin}${window.location.pathname}?print=true&breaks=${withPageBreaks}`;
      window.open(printUrl, "_blank");
    } else {
      setTimeout(() => {
        try {
          window.print();
        } catch (e) {
          // Fallback if browser security rejects direct print trigger
          const printUrl = `${window.location.origin}${window.location.pathname}?print=true&breaks=${withPageBreaks}`;
          window.open(printUrl, "_blank");
        }
      }, 300);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#FAF7F2] text-zinc-800 font-sans selection:bg-amber-100 selection:text-amber-900 pb-20 print-itinerary-app">
      {/* ================= HERO COVER ================= */}
      <header className="relative w-full h-[65vh] min-h-[480px] bg-zinc-950 flex flex-col justify-end overflow-hidden print:h-[25vh] print:min-h-0">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&q=80"
            alt="Roma Coliseo"
            className="w-full h-full object-cover opacity-40 scale-105 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#16213e]/70 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-xl mx-auto px-6 pb-12 print:pb-4">

          <h1 className="font-serif font-bold text-6xl text-white tracking-tight leading-none mb-2 print:text-4xl">
            ROMA
          </h1>
          <p className="font-serif italic text-xl text-amber-100/90 mb-6 print:text-sm">
            La Ciudad Eterna te espera · Junio 2026
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4 border-t border-zinc-700/50 text-sm text-zinc-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>12 – 15 de Junio, 2026</span>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Vaticano+Venticinque+Guest+House+by+Ghor,+Roma"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors group cursor-pointer"
              title="Ver Vaticano Guest House en Google Maps"
            >
              <MapPin className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="underline decoration-amber-400/40 underline-offset-4 group-hover:decoration-white transition-colors">
                Vaticano Guest House
              </span>
            </a>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 sm:right-6 z-20">
          <button
            onClick={triggerPrint}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full px-4 py-2.5 text-xs font-bold border border-white/25 transition cursor-pointer active:scale-95 shadow-md"
          >
            <Printer className="w-4 h-4" /> Imprimir Guía (PDF)
          </button>
        </div>
      </header>

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <main className="w-full max-w-xl mx-auto px-4 mt-6">
        
        {/* COUNTDOWN BANNER */}
        <div className="mb-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between text-amber-900 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-amber-500/20 text-amber-800 animate-bounce">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800/80">
                {timeLeft.status === "countdown" && "Cuenta Atrás para Despegue"}
                {timeLeft.status === "ongoing" && "¡Tu viaje está en curso!"}
                {timeLeft.status === "completed" && "¡Memorias de la Ciudad Eterna!"}
              </p>
              <h3 className="font-serif font-black text-lg">
                {timeLeft.status === "countdown" && (
                  <span>
                    Faltan {timeLeft.days}d, {timeLeft.hours}h y {timeLeft.minutes}m
                  </span>
                )}
                {timeLeft.status === "ongoing" && <span>🇮🇹 ¡Ya estás disfrutando de Roma! 🍕</span>}
                {timeLeft.status === "completed" && <span>¡Esperamos que haya sido un viaje increíble! ✈</span>}
              </h3>
            </div>
          </div>
          <span className="text-xl font-bold">🇮🇹</span>
        </div>

        {/* COMPREHENSIVE ROADMAP PROGRESS BAR */}
        <div className="mb-6 bg-white border border-[#E8E0D0] rounded-2xl p-4 shadow-sm print:hidden">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Progreso del Itinerario
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              {visitedCount} de {totalActivities} actividades completadas ({progressPercentage}%)
            </span>
          </div>
          <div className="w-full bg-[#FAF7F2] h-2.5 rounded-full overflow-hidden border border-zinc-200">
            <motion.div
              className="bg-emerald-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* FLIGHT TICKET / BOARDING PASS CONTAINER */}
        <div className="print-keep-together">
          <h2 id="flights-hotel" className="font-serif font-bold text-xl text-zinc-800 tracking-tight flex items-center gap-2 mb-3 mt-8">
            <Plane className="w-5 h-5 text-[#C8102E]" /> Información de Vuelos
          </h2>

          {/* IB655 Outbound Flight Card */}
          <div className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden shadow-sm mb-4">
            <div className="bg-zinc-900 px-4 py-2 text-white flex justify-between items-center text-xs">
              <span className="font-semibold uppercase tracking-widest text-[#B8965A]">IDA · VUELO DE SALIDA</span>
              <span className="font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                {FLIGHT_IDA.number}
              </span>
            </div>
            <div className="p-4 flex items-center gap-4">
              <div className="flex-1 text-center">
                <p className="font-mono text-xs text-zinc-400">ORIGEN</p>
                <h4 className="font-serif font-bold text-3xl text-zinc-800 leading-tight">{FLIGHT_IDA.originCode}</h4>
                <p className="text-[10px] text-zinc-500 uppercase truncate mt-0.5">{FLIGHT_IDA.originName}</p>
                <p className="text-sm font-bold text-[#C8102E] mt-2 bg-red-50 py-1 px-2 rounded-full inline-block">
                  {FLIGHT_IDA.originTime}
                </p>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">{FLIGHT_IDA.duration}</span>
                <div className="w-full flex items-center my-1.5 px-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-400" />
                  <div className="flex-1 border-t border-dashed border-zinc-300 relative">
                    <Plane className="w-4 h-4 text-[#B8965A] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-90" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-zinc-400" />
                </div>
                <span className="text-[10px] text-zinc-400">Directo · Iberia</span>
              </div>

              <div className="flex-1 text-center">
                <p className="font-mono text-xs text-zinc-400">DESTINO</p>
                <h4 className="font-serif font-bold text-3xl text-zinc-800 leading-tight">{FLIGHT_IDA.destCode}</h4>
                <p className="text-[10px] text-zinc-500 uppercase truncate mt-0.5">{FLIGHT_IDA.destName}</p>
                <p className="text-sm font-bold text-[#C8102E] mt-2 bg-red-50 py-1 px-2 rounded-full inline-block">
                  {FLIGHT_IDA.destTime}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* IB0652 Return Flight Card */}
        <div className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden shadow-sm mb-12 print-keep-together">
          <div className="bg-zinc-900 px-4 py-2 text-white flex justify-between items-center text-xs">
            <span className="font-semibold uppercase tracking-widest text-[#B8965A]">VUELTA · VUELO DE RETORNO</span>
            <span className="font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
              {FLIGHT_VUELTA.number}
            </span>
          </div>
          <div className="p-4 flex items-center gap-4">
            <div className="flex-1 text-center">
              <p className="font-mono text-xs text-zinc-400">ORIGEN</p>
              <h4 className="font-serif font-bold text-3xl text-zinc-800 leading-tight">{FLIGHT_VUELTA.originCode}</h4>
              <p className="text-[10px] text-zinc-500 uppercase truncate mt-0.5">{FLIGHT_VUELTA.originName}</p>
              <p className="text-sm font-bold text-[#C8102E] mt-2 bg-red-50 py-1 px-2 rounded-full inline-block">
                {FLIGHT_VUELTA.originTime}
              </p>
            </div>
            
            <div className="flex-1 flex flex-col items-center">
              <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">{FLIGHT_VUELTA.duration}</span>
              <div className="w-full flex items-center my-1.5 px-2">
                <div className="w-2 h-2 rounded-full bg-zinc-400" />
                <div className="flex-1 border-t border-dashed border-zinc-300 relative">
                  <Plane className="w-4 h-4 text-[#B8965A] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-90" />
                </div>
                <div className="w-2 h-2 rounded-full bg-zinc-400" />
              </div>
              <span className="text-[10px] text-zinc-400">Directo · Iberia</span>
            </div>

            <div className="flex-1 text-center">
              <p className="font-mono text-xs text-zinc-400">DESTINO</p>
              <h4 className="font-serif font-bold text-3xl text-zinc-800 leading-tight">{FLIGHT_VUELTA.destCode}</h4>
              <p className="text-[10px] text-zinc-500 uppercase truncate mt-0.5">{FLIGHT_VUELTA.destName}</p>
              <p className="text-sm font-bold text-[#C8102E] mt-2 bg-red-50 py-1 px-2 rounded-full inline-block">
                {FLIGHT_VUELTA.destTime}
              </p>
            </div>
          </div>
        </div>

        {/* HOTEL INFORMATION */}
        <div className="print-keep-together">
          <h2 id="hotel" className="font-serif font-bold text-xl text-zinc-800 tracking-tight flex items-center gap-2 mb-3">
            <span>🏨</span> Hotel y Alojamiento
          </h2>
          <div className="bg-white border border-[#E8E0D0] rounded-2xl p-4 shadow-sm mb-12 flex gap-4 pr-1">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-700 border border-amber-500/20 text-2xl flex items-center justify-center rounded-xl flex-shrink-0">
              🏨
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-serif font-bold text-base text-zinc-900">
                Vaticano Venticinque Guest House by Ghor
              </h4>
              <p className="text-xs text-zinc-500 font-medium flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /> Zona del Vaticano · Roma
              </p>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                Tu base para los 4 días en la Ciudad Eterna, a solo unos pasos de la majestuosa Plaza de San Pedro. Es una ubicación estratégica ideal para empezar los trayectos diarios.
              </p>
              <div className="mt-3 flex gap-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Vaticano+Venticinque+Guest+House,+Roma"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg px-3 py-1 text-xs font-semibold transition"
                >
                  Abrir en Maps <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* AIRPORT ROADMAP GUIDE */}
        <div className="print-keep-together">
          <h2 id="airport-transfer" className="font-serif font-bold text-xl text-zinc-800 tracking-tight flex items-center gap-2 mb-3">
            <Train className="w-5 h-5 text-[#B8965A]" /> Traslado desde el Aeropuerto
          </h2>
          <div className="bg-gradient-to-br from-[#E8F4FD] to-[#F0E6FF] border border-[#d2e3f5] rounded-2xl p-5 shadow-sm mb-12 leading-relaxed">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#1a5c8a] flex items-center gap-1.5 mb-4">
              <Info className="w-4 h-4" /> Cómo llegar desde Fiumicino al hotel
            </h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                  🚆
                </div>
                <div className="text-xs">
                  <strong className="block text-sm text-[#1A1A2E] font-serif">Leonardo Express</strong>
                  Desde el aeropuerto de Fiumicino hasta la Estación Central de Roma Termini. Trayecto directo de <strong>30 minutos</strong> por un coste de <strong>14 € por persona</strong>.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                  🚌
                </div>
                <div className="text-xs">
                  <strong className="block text-sm text-[#1A1A2E] font-serif">Desde Termini a Vaticano</strong>
                  Una vez en la Estación Termini, conectar mediante transporte urbano (p. ej. autobús) hacia Piazza del Risorgimento, muy cerca del Vaticano y del hotel.
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-blue-200/40">
              <span className="text-[10px] font-bold uppercase bg-white/70 text-[#1a5c8a] px-2.5 py-1 rounded-full shadow-xs">
                ⏰ Horario: 6:30h – 23:30h
              </span>
              <span className="text-[10px] font-bold uppercase bg-white/70 text-[#1a5c8a] px-2.5 py-1 rounded-full shadow-xs">
                🔄 Frecuencia: 15–30 min
              </span>
              <span className="text-[10px] font-bold uppercase bg-white/70 text-[#1a5c8a] px-2.5 py-1 rounded-full shadow-xs">
                💳 Compra en quioscos u online
              </span>
            </div>
          </div>
        </div>

        {/* ================= INTERACTIVE TABS BAR (FIXED TOP BAR) ================= */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md py-3.5 border-b border-[#E8E0D0] print:hidden shadow-xs">
          <div className="w-full max-w-xl mx-auto px-4">
            <div className="flex justify-center items-center gap-2 md:gap-3">
              <button
                onClick={() => handleTabClick("all")}
                title="Ver todo"
                className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-200 border cursor-pointer ${
                  activeTab === "all"
                    ? "bg-zinc-900 border-zinc-950 text-white shadow-md scale-105"
                    : "bg-white text-zinc-600 border-[#E8E0D0] hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-400 hover:scale-102"
                }`}
              >
                <Home className="w-[18px] h-[18px] md:w-5 md:h-5 stroke-[2.5]" />
              </button>

              {DAYS.map((day) => (
                <button
                  key={day.number}
                  onClick={() => handleTabClick(day.number.toString())}
                  title={`Día ${day.number}`}
                  className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-200 border cursor-pointer ${
                    activeTab === day.number.toString()
                      ? "bg-[#C8102E] border-[#B00E26] text-white shadow-md scale-105"
                      : "bg-white text-zinc-600 border-[#E8E0D0] hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-400 hover:scale-102"
                  }`}
                >
                  <span className="text-xs md:text-sm font-black leading-none">{day.number}</span>
                </button>
              ))}

              <button
                onClick={() => handleTabClick("food")}
                title="🍕 Gastronomía"
                className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-200 border cursor-pointer ${
                  activeTab === "food"
                    ? "bg-amber-600 border-amber-700 text-white shadow-md scale-105"
                    : "bg-white text-zinc-600 border-[#E8E0D0] hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-400 hover:scale-102"
                }`}
              >
                <Utensils className="w-[18px] h-[18px] md:w-5 md:h-5 stroke-[2.5]" />
              </button>

              <button
                onClick={() => handleTabClick("extras")}
                title="✨ Extras"
                className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-200 border cursor-pointer ${
                  activeTab === "extras"
                    ? "bg-indigo-600 border-indigo-700 text-white shadow-md scale-105"
                    : "bg-white text-zinc-600 border-[#E8E0D0] hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-400 hover:scale-102"
                }`}
              >
                <Sparkles className="w-[18px] h-[18px] md:w-5 md:h-5 stroke-[2.5]" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>



        {/* ================= ITINERARY DAYS CONTAINER ================= */}
        <div className="space-y-12">
          {DAYS.map((day) => {
            const isVisibleOnScreen = activeTab === "all" || activeTab === day.number.toString();
            return (
              <div
                key={day.number}
                className={`w-full ${isVisibleOnScreen ? "" : "hidden print-force-visible"}`}
              >
                {printWithPageBreaks && (
                  <div className="hidden print:block h-0 w-full" style={{ breakBefore: "page", pageBreakBefore: "always" }} />
                )}
                <motion.div
                  initial={isVisibleOnScreen ? { opacity: 0, y: 15 } : undefined}
                  animate={isVisibleOnScreen ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.3 }}
                  className="day-section"
                  id={`day-section-${day.number}`}
                >
                  {/* Day Header */}
                  <div className={`bg-gradient-to-r ${day.gradient} text-white rounded-t-2xl p-6 shadow-sm relative overflow-hidden`}>
                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
                    <div className="absolute right-8 top-4 w-12 h-12 rounded-full bg-white/5 pointer-events-none" />

                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1 flex items-center gap-1">
                      <span>📆 Roma En Detalle ·</span>
                      <span>Día {day.number}</span>
                    </div>

                    <h3 className="font-serif font-extrabold text-2xl tracking-tight leading-tight">
                      {day.name}
                    </h3>
                    <p className="text-xs font-medium text-amber-200 mt-1">{day.date}</p>

                    {/* Day summary badges */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-1.5">
                      {day.summary.map((summaryItem, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-zinc-100 font-medium opacity-90">
                          <span className="text-amber-400">•</span>
                          <span>{summaryItem}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Day Banner Photo */}
                  <div className="relative h-40">
                    <img
                      src={day.image}
                      alt={day.name}
                      className="w-full h-full object-cover filter brightness-90 border-x border-[#E8E0D0]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  </div>

                  {/* Day Schedule Activities */}
                  <div className="bg-white border-x border-b border-[#E8E0D0] rounded-b-2xl p-4 space-y-5">
                    {day.items.map((item, idx) => {
                      const activityId = item.activity.id;
                      const isVisited = visited.includes(activityId);

                      return (
                        <div key={idx} className="group relative print-activity-item">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex gap-4 flex-1">
                              {/* Checklist Bullet & Timeline line */}
                              <div className="flex flex-col items-center flex-shrink-0">
                                <button
                                  onClick={() => toggleVisited(activityId)}
                                  className={`w-6 h-6 rounded-full border flex items-center justify-center transition focus:outline-hidden cursor-pointer ${
                                    isVisited
                                      ? "bg-emerald-500 border-emerald-500 text-white"
                                      : "bg-zinc-50 hover:bg-zinc-100 border-[#E8E0D0]"
                                  }`}
                                >
                                  {isVisited ? (
                                    <svg className="w-3.5 h-3.5 stroke-2 stroke-current" viewBox="0 0 24 24" fill="none">
                                      <path d="M5 12l5 5L20 7" />
                                    </svg>
                                  ) : (
                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                                  )}
                                </button>
                                {idx < day.items.length - 1 && (
                                  <div className="w-0.5 grow bg-dashed border-r border-[#E8E0D0] my-2" />
                                )}
                              </div>

                              {/* Activity Context */}
                              <div className="flex-1 min-w-0 pb-4">
                                <div className="flex justify-between items-start gap-2">
                                  <h4
                                    className={`font-serif font-black text-base text-zinc-900 leading-tight transition ${
                                      isVisited ? "line-through text-zinc-400" : ""
                                    }`}
                                  >
                                    {item.activity.title}
                                  </h4>
                                </div>

                                {item.activity.subtitle && (
                                  <p className="text-xs text-zinc-500 font-medium mt-0.5">
                                    {item.activity.subtitle}
                                  </p>
                                )}

                                {/* Activity Main Description */}
                                <p className={`text-xs text-zinc-600 mt-2 leading-relaxed ${isVisited ? "opacity-60" : ""}`}>
                                  {item.activity.body}
                                </p>

                                {/* Tags (if any) */}
                                <div className="flex flex-wrap gap-1.5 mt-2.5">
                                  {item.activity.blueTags?.map((tag, tIdx) => (
                                    <span key={tIdx} className="text-[10px] font-bold bg-blue-50 border border-blue-200 text-[#0D47A1] px-2.5 py-0.5 rounded-md">
                                      {tag}
                                    </span>
                                  ))}
                                  {item.activity.greenTags?.map((tag, tIdx) => (
                                    <span key={tIdx} className="text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-[#1B5E20] px-2.5 py-0.5 rounded-md">
                                      {tag}
                                    </span>
                                  ))}
                                  {item.activity.alertTags?.map((tag, tIdx) => {
                                    const isColosseoTicket = item.activity.id === "d3-a5";
                                    if (isColosseoTicket) {
                                      return (
                                        <button
                                          key={tIdx}
                                          onClick={() => setIsTicketModalOpen(true)}
                                          className="text-[10.5px] font-extrabold bg-[#E8965A] hover:bg-[#D37F43] border border-[#D37F43] text-white px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow-sm cursor-pointer transition active:scale-95"
                                          title="Haga clic para abrir, descargar o imprimir las entradas oficiales"
                                        >
                                          <span>{tag}</span>
                                          <span className="text-[10px] opacity-90 border-l border-white/20 pl-1.5">📂 Ver Billetes</span>
                                        </button>
                                      );
                                    }
                                    return (
                                      <span key={tIdx} className="text-[10px] font-bold bg-[#FFF3CD] border border-[#FFCC80] text-[#7B4F00] px-2.5 py-0.5 rounded-md">
                                        {tag}
                                      </span>
                                    );
                                  })}
                                  {item.activity.tags?.map((tag, tIdx) => (
                                    <span key={tIdx} className="text-[10px] font-semibold bg-zinc-100 border border-zinc-200 text-zinc-600 px-2.5 py-0.5 rounded-md">
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                {/* Photo side-by-side or stacked cleanly */}
                                {item.activity.image && (
                                  <div className="mt-3 relative rounded-xl overflow-hidden aspect-video border border-[#E8E0D0] h-32 sm:h-40 w-full">
                                    <img
                                      src={item.activity.image}
                                      alt={item.activity.title}
                                      className="w-full h-full object-cover filter brightness-95"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* COMPACT MAP BUTTON RIGHT-ALIGNED AND VERTICALLY CENTERED */}
                            {item.activity.mapsUrl && (
                              <div className="flex items-center justify-center pl-2 shrink-0 print:hidden self-center">
                                <a
                                  href={item.activity.mapsUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/20 hover:bg-[#4285F4]/20 text-[#4285F4] flex items-center justify-center transition shadow-xs cursor-pointer active:scale-95"
                                  title="Ver en Google Maps"
                                >
                                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                  </svg>
                                </a>
                              </div>
                            )}
                          </div>

                          {/* Next Transport Step Divider (visual connection) */}
                          {item.nextTransport && (
                            <div className="pl-10 pb-4 pr-2">
                              <div className="flex items-center gap-3 py-1.5 px-3 bg-zinc-50 border border-zinc-100 rounded-xl text-zinc-500 text-xs font-medium">
                                <div className="p-1 rounded-full bg-amber-500/10">
                                  {getTransportIcon(item.nextTransport.type)}
                                </div>
                                <span className="text-zinc-600">{item.nextTransport.description}</span>
                                {item.nextTransport.badge && (
                                  <span className="ml-auto font-bold bg-amber-500/10 text-amber-700 text-[10px] px-2 py-0.5 rounded">
                                    {item.nextTransport.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Day Local Restaurants Block */}
                  {day.restaurants && day.restaurants.length > 0 && (
                    <div className="bg-[#FEF3E8]/85 border-x border-b border-[#E8E0D0] rounded-b-2xl p-4 -mt-2.5 pt-6 relative z-10">
                      <div className="border-t border-[#E8965A]/20 pt-3">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#E8965A] mb-3.5 block flex items-center gap-1">
                          <Utensils className="w-3.5 h-3.5" /> Restaurantes Recomendados en {day.name}
                        </span>
                        
                        <div className="space-y-1.5 md:space-y-2">
                          {/* Table Header */}
                          <div className="grid grid-cols-[1.3fr_0.8fr_1.1fr] md:grid-cols-[1.5fr_1fr_1.5fr] gap-2 md:gap-4 pb-1.5 border-b border-[#E8965A]/35 text-[9px] md:text-[10px] font-extrabold text-[#9E5D2A] uppercase tracking-wider">
                            <div>Establecimiento</div>
                            <div>Especialidad</div>
                            <div className="text-right">Dirección & Mapa</div>
                          </div>
                          
                          {day.restaurants.map((rest, restIdx) => (
                            <div
                              key={restIdx}
                              className="grid grid-cols-[1.3fr_0.8fr_1.1fr] md:grid-cols-[1.5fr_1fr_1.5fr] gap-2 md:gap-4 py-2 border-b border-[#E8965A]/10 text-xs text-zinc-700 items-center hover:bg-[#FEF6F0] rounded-lg px-1 md:px-2 transition"
                            >
                              {/* Column 1: Emoji & Name */}
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="text-sm md:text-base leading-none shrink-0" role="img" aria-label="emoji">{rest.emoji}</span>
                                <span className="font-bold text-zinc-900 truncate text-[11px] md:text-xs" title={rest.name}>
                                  {rest.name}
                                </span>
                              </div>
                              
                              {/* Column 2: Specialty / Type Badge */}
                              <div className="min-w-0">
                                <span className="text-[9px] md:text-[10px] bg-white border border-[#E8965A]/20 px-1.5 py-0.5 rounded-md text-zinc-600 font-medium inline-block truncate max-w-full">
                                  {rest.type}
                                </span>
                              </div>
                              
                              {/* Column 3: Address and Google Maps Button */}
                              <div className="flex items-center justify-end gap-1.5 min-w-0 text-right">
                                {rest.address && (
                                  <span className="text-[9px] md:text-[10px] text-zinc-500 font-medium truncate hidden min-[360px]:inline max-w-[50px] xs:max-w-[75px] sm:max-w-[130px] md:max-w-none" title={rest.address}>
                                    {rest.address}
                                  </span>
                                )}
                                {rest.mapsUrl && (
                                  <a
                                    href={rest.mapsUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-5.5 h-5.5 md:w-6.5 md:h-6.5 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/20 hover:bg-[#4285F4]/20 text-[#4285F4] flex items-center justify-center transition shrink-0 cursor-pointer active:scale-95"
                                    title={`Ver ${rest.name} en Google Maps`}
                                  >
                                    <svg className="w-3 md:w-3.5 h-3 md:h-3.5 fill-current" viewBox="0 0 24 24">
                                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  </motion.div>
                </div>
              );
            })}

          {/* ================= GENERAL REC GUIDE (TAB OR SCROLL-ONLY) ================= */}
          <div className={`w-full ${activeTab === "all" || activeTab === "food" ? "" : "hidden print-force-visible"}`}>
              {printWithPageBreaks && (
                <div className="hidden print:block h-0 w-full" style={{ breakBefore: "page", pageBreakBefore: "always" }} />
              )}
              <motion.div
                layoutId="general-restaurants"
                className="w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
              <div id="gastronomy" className="bg-zinc-900 text-white rounded-t-2xl p-5 shadow-sm flex items-center gap-3">
                <span className="text-2xl leading-none">🍽</span>
                <div>
                  <h3 className="font-serif font-extrabold text-xl tracking-tight leading-none">
                    Restaurantes Recomendados
                  </h3>
                  <p className="text-[10px] text-amber-400 font-medium uppercase mt-1 tracking-wider">
                    Selección Gastronómica para Cualquier Momento
                  </p>
                </div>
              </div>

              <div className="bg-white border-x border-b border-[#E8E0D0] rounded-b-2xl p-4">
                {/* Search / Filter mini-input for restaurants */}
                <div className="mb-4 relative print:hidden">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-zinc-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Buscar platos o restaurantes (focaccia, pizza, tiramisú, etc)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition"
                  />
                </div>

                {/* Categorization Pills */}
                <div className="flex gap-1 overflow-x-auto pb-3 mb-4 no-scrollbar print:hidden">
                  {["all", "pizza", "pasta", "helado", "desayuno"].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedRestCategory(category)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition cursor-pointer flex-shrink-0 ${
                        selectedRestCategory === category
                          ? "bg-amber-100 text-amber-800 border-none"
                          : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                      }`}
                    >
                      {category === "all" && "Todos"}
                      {category === "pizza" && "🍕 Pizza"}
                      {category === "pasta" && "🍝 Pasta"}
                      {category === "helado" && "🍦 Helado"}
                      {category === "desayuno" && "☕ Desayuno/Café"}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                  {GENERAL_RESTAURANTS.filter((rest) => {
                    const matchQuery =
                      rest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      rest.type.toLowerCase().includes(searchQuery.toLowerCase());

                    if (selectedRestCategory === "all") return matchQuery;
                    if (selectedRestCategory === "pizza") {
                      return matchQuery && rest.type.toLowerCase().includes("pizza");
                    }
                    if (selectedRestCategory === "pasta") {
                      return matchQuery && rest.type.toLowerCase().includes("pasta");
                    }
                    if (selectedRestCategory === "helado") {
                      return matchQuery && rest.type.toLowerCase().includes("helader");
                    }
                    if (selectedRestCategory === "desayuno") {
                      return (
                        matchQuery &&
                        (rest.type.toLowerCase().includes("desayuno") ||
                          rest.type.toLowerCase().includes("caf"))
                      );
                    }
                    return matchQuery;
                  }).map((rest, restIdx) => (
                    <div
                      key={restIdx}
                      className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/65 rounded-xl p-3 flex flex-col items-center justify-between text-center transition"
                    >
                      <span className="text-3xl leading-none mb-2">{rest.emoji}</span>
                      <div>
                        <h4 className="font-bold text-xs text-zinc-900 leading-tight block">
                          {rest.name}
                        </h4>
                        <span className="text-[10px] text-zinc-500 font-medium block mt-1">
                          {rest.type}
                        </span>
                      </div>
                      
                      {/* Action Map Search Button */}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          rest.name + ", Roma"
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3.5 inline-flex items-center gap-1 text-[10px] font-bold text-[#4285F4] hover:underline print:hidden cursor-pointer"
                      >
                        Indicaciones <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        {/* ================= EXTRAS SECTION (TAB OR SCROLL-ONLY) ================= */}
        <div className={`w-full ${activeTab === "all" || activeTab === "extras" ? "" : "hidden print-force-visible"}`}>
            {printWithPageBreaks && (
              <div className="hidden print:block h-0 w-full" style={{ breakBefore: "page", pageBreakBefore: "always" }} />
            )}
            <motion.div
              layoutId="extras-section-motion"
              className="w-full animate-fade-in"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div id="extras-section" className="bg-zinc-900 text-white rounded-t-2xl p-5 shadow-sm flex items-center gap-3">
                <span className="text-2xl leading-none">✨</span>
                <div>
                  <h3 className="font-serif font-extrabold text-xl tracking-tight leading-none">
                    Atracciones Extras y Visitas Alternativas
                  </h3>
                  <p className="text-[10px] text-amber-400 font-medium uppercase mt-1 tracking-wider">
                    Opciones recomendadas para complementar tu itinerario
                  </p>
                </div>
              </div>

              <div className="bg-white border-x border-b border-[#E8E0D0] rounded-b-2xl p-5 space-y-6">
                <p className="text-xs text-zinc-600 leading-relaxed max-w-xl">
                  Si dispones de tiempo adicional o quieres explorar alternativas de gran nivel histórico y artístico, estas cuatro paradas son auténticos tesoros de la Ciudad Eterna.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {EXTRAS.map((extra) => (
                    <div
                      key={extra.id}
                      className="bg-zinc-50 border border-zinc-200/70 rounded-2xl overflow-hidden hover:shadow-xs transition duration-200 flex flex-col justify-between print-activity-item"
                    >
                      <div>
                        {/* Rich Thumbnail */}
                        <div className="relative h-48 w-full bg-zinc-900 overflow-hidden">
                          <img
                            src={extra.image}
                            alt={extra.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                            {extra.tags?.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[9px] font-black uppercase bg-zinc-900/80 text-white/95 px-2 py-0.5 rounded-md backdrop-blur-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Detail fields */}
                        <div className="p-4 space-y-3.5">
                          <div>
                            <h4 className="font-serif font-black text-base text-zinc-900 leading-snug">
                              {extra.title}
                            </h4>
                            {extra.subtitle && (
                              <p className="text-[11px] text-zinc-500 font-medium mt-0.5 italic">
                                {extra.subtitle}
                              </p>
                            )}
                          </div>

                          <p className="text-[11.5px] text-zinc-600 leading-relaxed">
                            {extra.body}
                          </p>

                          {extra.howToGet && (
                            <div className="bg-[#EBF5FF] border border-[#C6E2FF] rounded-xl p-3 text-[11px] text-[#0060C0] leading-relaxed">
                              <strong className="font-bold block mb-0.5">🚇 Cómo llegar:</strong>
                              {extra.howToGet}
                            </div>
                          )}

                          {extra.tips && extra.tips.length > 0 && (
                            <div className="space-y-1.5 pt-1">
                              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
                                💡 Consejos Prácticos:
                              </span>
                              <ul className="space-y-1 text-[11px] text-zinc-600 list-disc list-inside leading-normal">
                                {extra.tips.map((tip, tIdx) => (
                                  <li key={tIdx} className="pl-1">
                                    <span className="text-zinc-600 pl-0.5">{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      {extra.mapsUrl && (
                        <div className="p-4 pt-0">
                          <a
                            href={extra.mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full inline-flex items-center justify-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 rounded-xl py-2 text-xs font-bold transition print:hidden cursor-pointer"
                          >
                            <span>Ver ubicación en Google Maps</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* ================= PORTABLE TRAVEL TIPS CORNER ================= */}
      <section className="w-full max-w-xl mx-auto px-4 mt-8 print:hidden">
        <div className="bg-white border border-[#E8E0D0] rounded-2xl p-5 shadow-xs leading-relaxed">
          <h4 className="font-serif font-bold text-base text-zinc-800 flex items-center gap-2 mb-3">
            <span className="text-rose-600">🇮🇹</span> Consejos Esenciales para el Viajero
          </h4>
          <ul className="space-y-3.5 text-xs text-zinc-600">
            <li className="flex gap-2.5">
              <span className="text-amber-500 font-bold shrink-0">1.</span>
              <span>
                <strong>Reservas Online:</strong> El Panteón y la Fontana di Trevi (nivel inferior) ahora requieren reserva anticipada. El horario del Coliseo a las 18:00h es ideal, recuerda estar 15 minutos antes.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-amber-500 font-bold shrink-0">2.</span>
              <span>
                <strong>Agua Gratis:</strong> Llévate una botella recargable. Roma está llena de <em>nasoni</em> (pequeñas fuentes públicas con agua fría potable deliciosa).
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-amber-500 font-bold shrink-0">3.</span>
              <span>
                <strong>Zapatos Cómodos:</strong> Andarás una media de 18.000 pasos al día sobre calzada romana de adoquines (<em>sanpietrini</em>), calzado deportivo de primera es obligatorio.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-zinc-900 text-zinc-400 text-center py-12 px-6 mt-16 border-t border-zinc-800">
        <div className="max-w-xl mx-auto space-y-3">
          <p className="font-serif italic font-bold text-lg text-white">
            ROMA · JUNIO 2026
          </p>
          <p className="text-xs">¡Buen viaje! · Buon viaggio 🇮🇹</p>
          <p className="text-[10px] text-zinc-500 pt-4 border-t border-zinc-800">
            Todos los horarios y destinos permanecen fieles al itinerario original.
          </p>
        </div>
      </footer>

      {/* Dynamic style injection for high-fidelity print rendering */}
      <style>{`
        @media print {
          body {
            background-color: #FAF7F2 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color: #27272a !important;
          }
          /* Ensure headers and essential backgrounds render correctly in printed PDFs */
          .day-section {
            border: 1px solid #E8E0D0 !important;
            break-inside: avoid !important;
          }
          /* Prevent maps controls / tabs / modals / scroll indicators from showing up in print */
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>

      {/* ================= PRINT CONFIGURATION MODAL ================= */}
      <AnimatePresence>
        {isPrintModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 print:hidden">
            {/* Backdrop with transition */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrintModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-[#FAF7F2] border border-[#E8E0D0] rounded-2xl p-6 shadow-2xl z-20 overflow-hidden text-zinc-800"
            >
              {/* Top abstract graphic lines */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-[#C8102E] to-amber-600" />

              {/* Title Header */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-[#E8E0D0] mb-5 mt-1">
                <div className="p-3 rounded-full bg-amber-500/10 text-amber-700 shrink-0">
                  <Printer className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-lg text-zinc-950 leading-tight">
                    Preparar Impresión / PDF
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-medium mt-0.5">
                    Personaliza cómo se distribuirá el itinerario en las hojas
                  </p>
                </div>
              </div>

              {/* Options lists */}
              <div className="space-y-3.5">
                {/* Option A: Continuous flow */}
                <button
                  onClick={() => confirmPrint(false)}
                  className="w-full text-left bg-white hover:bg-zinc-50/50 border border-[#E8E0D0] hover:border-zinc-400 p-4 rounded-xl transition cursor-pointer group flex gap-3.5 items-start active:scale-[0.99]"
                >
                  <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-700 font-bold text-xs shrink-0 mt-0.5 group-hover:bg-zinc-900 group-hover:text-white transition">
                    A
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-xs text-zinc-900 transition">
                      Todo Corrido (Económico / Continuo)
                    </h4>
                    <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                      Imprime el contenido de forma corrida sin forzar saltos de hoja. Excelente opción para visualizaciones en pantallas anchas, tabletas secundarias o para ahorrar papel físico.
                    </p>
                  </div>
                </button>

                {/* Option B: Separated pages by section */}
                <button
                  onClick={() => confirmPrint(true)}
                  className="w-full text-left bg-white hover:bg-amber-50/10 border border-[#E8E0D0] hover:border-amber-500 p-4 rounded-xl transition cursor-pointer group flex gap-3.5 items-start active:scale-[0.99]"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition">
                    B
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-xs text-zinc-900 group-hover:text-amber-800 transition">
                      Sección Limpia por Página (Folleto) 📑
                    </h4>
                    <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                      Efectúa saltos de página inteligentes automatizados antes de empezar cada Día e iniciando el bloque de Gastronomía. Crea un folleto de viaje impecable y ordenado.
                    </p>
                  </div>
                </button>
              </div>

              {/* Modal controls footer */}
              <div className="flex justify-end gap-2.5 pt-4 border-t border-[#E8E0D0] mt-6">
                <button
                  onClick={() => setIsPrintModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/80 rounded-xl transition cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>

      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        onPrintOnlyTickets={handlePrintOnlyTickets}
      />

      <PrintableColosseumTickets />
    </>
  );
}
