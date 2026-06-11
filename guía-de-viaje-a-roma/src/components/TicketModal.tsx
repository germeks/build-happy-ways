import React, { useState } from "react";
import { X, Printer, Download, Eye, QrCode, ShieldAlert, FileText, ChevronLeft, ChevronRight, Check } from "lucide-react";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrintOnlyTickets: () => void;
}

export interface ColosseumTicketData {
  name: string;
  code: string;
  price: string;
  qrCodeUrl: string;
  bookingNo: string;
  date: string;
  time: string;
}

export const TICKETS_LIST: ColosseumTicketData[] = [
  {
    name: "JIMENA AGUILERA RECUERO",
    code: "SPCOB2WPL4XXJVDL",
    price: "Gratuito - Under 18 (0,00 €)",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=SPCOB2WPL4XXJVDL",
    bookingNo: "OCO4167914",
    date: "14/06/2026",
    time: "18:00"
  },
  {
    name: "JAIME AGUILERA SANCHEZ",
    code: "SPCOQDJK3AQDL88P",
    price: "Intero (18,00 €)",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=SPCOQDJK3AQDL88P",
    bookingNo: "OCO4167914",
    date: "14/06/2026",
    time: "18:00"
  },
  {
    name: "RAQUEL RECUERO DE HARO",
    code: "SPCOZPQE4LDD86WG",
    price: "Intero (18,00 €)",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=SPCOZPQE4LDD86WG",
    bookingNo: "OCO4167914",
    date: "14/06/2026",
    time: "18:00"
  }
];

export default function TicketModal({ isOpen, onClose, onPrintOnlyTickets }: TicketModalProps) {
  const [activeTab, setActiveTab] = useState<"pass" | "pdf">("pass");
  const [activeTicketIndex, setActiveTicketIndex] = useState(0);

  if (!isOpen) return null;

  const currentTicket = TICKETS_LIST[activeTicketIndex];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-sm print:hidden">
      <div className="bg-[#FAF7F2] text-zinc-900 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-[#E8E0D0]">
        
        {/* Header Section */}
        <div className="border-b border-[#E8E0D0] bg-[#FAF7F2] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 border border-amber-500/20">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-lg text-zinc-900">
                Billetes Electrónicos Oficiales
              </h3>
              <p className="text-xs text-zinc-500">
                Coliseo, Foro Romano y Palatino · Entrada Reservada 18:00h
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-zinc-200/50 flex items-center justify-center text-zinc-500 hover:text-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Toggle Bar (Mobile / Desktop) */}
        <div className="bg-[#FEF6F0] px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#E8E0D0]">
          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-zinc-200/50 rounded-lg self-start">
            <button
              onClick={() => setActiveTab("pass")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                activeTab === "pass"
                  ? "bg-white text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <QrCode className="w-4 h-4" /> Tarjeta Digital ({activeTicketIndex + 1}/3)
            </button>
            <button
              onClick={() => setActiveTab("pdf")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                activeTab === "pdf"
                  ? "bg-white text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <Eye className="w-4 h-4" /> Vista PDF Original (A4)
            </button>
          </div>

          {/* Print/Download button */}
          <button
            onClick={onPrintOnlyTickets}
            className="flex items-center justify-center gap-2 bg-[#E8965A] hover:bg-[#D37F43] text-white px-5 py-2 rounded-xl text-xs font-bold transition shadow-xs hover:shadow-md cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4" /> Imprimir o Descargar PDF de Entrada
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#FCFAF7] custom-scrollbar">
          
          {/* TAB 1: PASS VIEW (SMART PHONE MOBILE FRIENDLY CARD) */}
          {activeTab === "pass" && (
            <div className="max-w-md mx-auto py-4">
              {/* Ticket selector chips */}
              <div className="flex justify-between gap-1.5 mb-5 bg-[#FAF7F2] p-1.5 border border-[#E8E0D0] rounded-xl shadow-2xs">
                {TICKETS_LIST.map((ticket, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTicketIndex(idx)}
                    className={`flex-1 px-2.5 py-1.5 rounded-lg text-2xs md:text-xs font-bold transition text-center truncate cursor-pointer ${
                      activeTicketIndex === idx
                        ? "bg-[#E8965A]/15 text-[#9E5D2A] border border-[#E8965A]/30"
                        : "text-zinc-500 hover:bg-zinc-100"
                    }`}
                  >
                    {ticket.name.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Mobile Ticket Layout */}
              <div className="bg-[#1A1A2E] text-white rounded-3xl overflow-hidden shadow-xl border border-zinc-800 flex flex-col text-sm">
                
                {/* Header card branding */}
                <div className="bg-[#0D0D1B] px-6 py-4 flex items-center justify-between border-b border-zinc-800">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                      Entrada Oficial
                    </span>
                    <span className="text-xs font-bold text-amber-400">
                      P·AR·C Colosseo & Foro
                    </span>
                  </div>
                  <div className="bg-red-600/10 text-red-400 px-2 py-0.5 rounded-md border border-red-500/20 text-[9px] font-bold">
                    18:00h Reservado
                  </div>
                </div>

                {/* Big Info section */}
                <div className="p-6 flex flex-col items-center text-center border-b border-dashed border-zinc-800 relative">
                  {/* Decorative ticket cutouts */}
                  <div className="absolute top-full -left-3 w-6 h-6 rounded-full bg-[#FCFAF7] -translate-y-1/2 z-10" />
                  <div className="absolute top-full -right-3 w-6 h-6 rounded-full bg-[#FCFAF7] -translate-y-1/2 z-10" />

                  {/* QR Code Container */}
                  <div className="bg-white p-3 rounded-2xl mb-4 border border-zinc-700 shadow-inner flex flex-col items-center">
                    <img
                      src={currentTicket.qrCodeUrl}
                      alt="QR Code"
                      className="w-40 h-40 object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[10px] font-mono font-bold text-zinc-500 mt-2 tracking-wider">
                      {currentTicket.code}
                    </span>
                  </div>

                  <p className="text-[10px] uppercase font-bold text-amber-500/80 tracking-widest">
                    Titular del Billete
                  </p>
                  <h4 className="font-serif font-black text-lg tracking-wide mt-0.5 text-zinc-100 uppercase">
                    {currentTicket.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 font-medium bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                    {currentTicket.price}
                  </p>
                </div>

                {/* Booking details footer grid */}
                <div className="p-5 grid grid-cols-2 gap-y-4 gap-x-2 bg-[#121222] text-xs">
                  <div>
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">
                      Grupo Resoli / Reserva
                    </span>
                    <span className="font-bold text-zinc-100 text-sm mt-0.5 block font-mono">
                      {currentTicket.bookingNo}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">
                      Validez de Acceso
                    </span>
                    <span className="font-bold text-zinc-100 text-sm mt-0.5 block">
                      24 Horas
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">
                      Fecha de Entrada
                    </span>
                    <span className="font-bold text-zinc-100 text-sm mt-0.5 block">
                      {currentTicket.date}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">
                      Hora de Entrada
                    </span>
                    <span className="font-bold text-amber-400 text-sm mt-0.5 block animate-pulse">
                      ⏰ 18:00h
                    </span>
                  </div>
                </div>

                {/* Help block inside card */}
                <div className="bg-[#0D0D1B] px-6 py-3 border-t border-zinc-800 flex items-center gap-2.5 text-[10px] text-zinc-400">
                  <span className="text-[#34A853] text-[15px] leading-none">●</span>
                  <span>Presentar en el acceso de entrada 15min antes con DNI / Pasaporte</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PDF DOCUMENT PREVIEW (HIGH-FIDELITY DESIGNED A4 PAGES) */}
          {activeTab === "pdf" && (
            <div className="max-w-2xl mx-auto space-y-8">
              
              {/* Document Pager info */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3.5 flex items-center gap-3 text-xs text-amber-900">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                <span>
                  A continuación se muestra el <b>documento oficial de entrada</b> (réplica fidedigna digital del PDF). 
                  Al imprimir o descargar, se formateará de manera perfecta a 3 folios A4 independientes que sirven como carné físico legal en la puerta del monumento.
                </span>
              </div>

              {/* Render PDF page representation */}
              <div className="bg-white border border-[#E8E0D0] rounded-2xl shadow-xl p-6 md:p-10 font-sans text-zinc-800 relative text-[11px] leading-relaxed max-w-[21cm] mx-auto overflow-x-auto">
                <div className="min-w-[620px]">
                  
                  {/* Page selector */}
                  <div className="flex items-center justify-between border-b pb-4 mb-6">
                    <span className="text-zinc-500 text-xs font-bold tracking-wider uppercase">
                      PÁGINA {activeTicketIndex + 1} DE 3 DEL DOCUMENTO PDF
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTicketIndex((idx) => Math.max(0, idx - 1))}
                        disabled={activeTicketIndex === 0}
                        className="w-7 h-7 bg-zinc-100 border rounded-full flex items-center justify-center text-zinc-600 disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-bold text-zinc-800 w-16 text-center">
                        Doc {activeTicketIndex + 1} / 3
                      </span>
                      <button
                        onClick={() => setActiveTicketIndex((idx) => Math.min(TICKETS_LIST.length - 1, idx + 1))}
                        disabled={activeTicketIndex === TICKETS_LIST.length - 1}
                        className="w-7 h-7 bg-zinc-100 border rounded-full flex items-center justify-center text-zinc-600 disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Header Line of PDF (QR and Ticket code) */}
                  <div className="grid grid-cols-[150px_1fr_180px] gap-6 items-start pb-6 border-b-2 border-zinc-900">
                    <div className="flex flex-col items-center">
                      <img
                        src={currentTicket.qrCodeUrl}
                        alt="Official QR"
                        className="w-[124px] h-[124px] object-contain"
                        referrerPolicy="no-referrer"
                      />
                      <span className="font-mono text-[9px] font-bold text-zinc-600 tracking-wider mt-1.5 break-all max-w-[120px]">
                        {currentTicket.code}
                      </span>
                    </div>

                    <div className="space-y-2 mt-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-700 block">
                        BIGLIETTO ELETTRONICO
                      </span>
                      <div className="font-mono space-y-1 text-zinc-800">
                        <div className="text-sm font-black text-zinc-950">
                          {currentTicket.bookingNo}
                        </div>
                        <div className="text-[13px] font-black text-amber-600 flex items-center gap-1.5">
                          <span className="bg-amber-100 px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-800 uppercase">Validez</span>
                          {currentTicket.date} - 18:00
                        </div>
                        <div className="text-sm font-black text-red-600 uppercase">
                          {currentTicket.price}
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <span className="text-[9px] text-zinc-500 uppercase font-black block tracking-wider">
                          TITOLARE / PASSENGER
                        </span>
                        <span className="text-md font-black text-zinc-950 uppercase border-b border-zinc-300 pb-0.5 block w-fit">
                          {currentTicket.name}
                        </span>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end self-stretch justify-between">
                      <div className="text-right">
                        <div className="font-serif font-black text-zinc-900 border border-zinc-800 px-2 py-1 inline-block text-[11px] tracking-tight bg-zinc-50">
                          P · AR · C <br />
                          ARCHEOLOGICO <br />
                          DEL COLOSSEO
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-500 font-bold block bg-zinc-100 rounded px-1.5 py-0.5 mt-4 self-end">
                        Pagina {activeTicketIndex + 1} / 3
                      </span>
                    </div>
                  </div>

                  {/* Title of Event */}
                  <div className="py-5 text-center">
                    <h2 className="text-lg font-black text-zinc-950 uppercase tracking-widest border-y border-zinc-200 py-2.5">
                      COLOSSEO - FORO ROMANO PALATINO 24H
                    </h2>
                  </div>

                  {/* PDF Matrix info */}
                  <div className="grid grid-cols-2 gap-4 border-b pb-6">
                    <div className="space-y-3.5 border-r pr-4">
                      <div className="grid grid-cols-[80px_1fr] items-start gap-2">
                        <span className="font-black text-zinc-900 uppercase tracking-wide">VALID</span>
                        <p className="text-zinc-600 text-[10px]">
                          <b>Colosseum:</b> one entrance only on the day and booked time.<br />
                          <b>Roman Forum / Palatine Hill / Imperial Fora:</b> one entrance only within the 24h before or after the Colosseum’s booking time.
                        </p>
                      </div>

                      <div className="grid grid-cols-[80px_1fr] items-start gap-2 pt-1 border-t border-zinc-100">
                        <span className="font-black text-zinc-900 uppercase tracking-wide">WHAT IS INCLUDED</span>
                        <p className="text-zinc-600 text-[10px]">
                          Colosseum (First Level • Second Level), Roman Forum, Palatine Hill, Imperial Fora, Exhibitions • Museums.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3.5 pl-4">
                      <div className="grid grid-cols-[80px_1fr] items-start gap-2">
                        <span className="font-black text-zinc-900 uppercase tracking-wide text-zinc-500">WHAT IS NOT INCLUDED</span>
                        <p className="text-zinc-600 text-[10px]">
                          Colosseum Arena • Underground • Attic, Roman Forum/Palatine Hill super sites, Domus Area.
                        </p>
                      </div>

                      <div className="grid grid-cols-[80px_1fr] items-start gap-2 pt-1 border-t border-zinc-100">
                        <span className="font-black text-zinc-900 text-amber-700 uppercase tracking-wide">ENTRANCE TIME</span>
                        <p className="text-zinc-600 text-[10px]">
                          <b>Colosseum:</b> Booking time (<b>18:00h</b>). Please show up strictly 15 minutes before.<br />
                          <b>Roman Forum / Palatine Hill / Imperial Fora:</b> For opening hours, please check the web page colosseo.it
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mid grid guidelines */}
                  <div className="grid grid-cols-2 gap-4 py-5 border-b">
                    <div className="space-y-2 pr-4 border-r border-zinc-100">
                      <h4 className="font-black text-zinc-950 uppercase tracking-wider text-[10px] pb-1 border-b border-zinc-200">
                        GUIDELINES FOR A GOOD VISIT COLOSSEUM
                      </h4>
                      <ul className="space-y-1.5 text-zinc-600 text-[9.5px]">
                        <li className="flex items-start gap-1">
                          <span className="text-amber-500">➤</span> Show up at the entrance of the Colosseum 15 minutes before.
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-amber-500">➤</span> Ticket valid for 75 min visiting time inside the Colosseum.
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-amber-500">➤</span> Show ID/Passport at the entrance for validation.
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-amber-500">➤</span> The itinerary follows a strict one-way route.
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-amber-500">➤</span> Do not stray from the marked paths or touch structures.
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2 pl-4">
                      <h4 className="font-black text-zinc-950 uppercase tracking-wider text-[10px] pb-1 border-b border-zinc-200">
                        ROMAN FORUM • PALATINE HILL • IMPERIAL FORA
                      </h4>
                      <ul className="space-y-1.5 text-zinc-600 text-[9.5px]">
                        <li className="flex items-start gap-1">
                          <span className="text-zinc-500">➤</span> Show ID/Passport at the entrance.
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-zinc-500">➤</span> Follow the marked routes inside the archaeological sites.
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-zinc-500">➤</span> It is highly recommended to wear comfortable sports/walking shoes.
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Forbidden Section */}
                  <div className="pt-5 pb-2">
                    <h4 className="font-black text-zinc-950 text-center uppercase tracking-widest text-[10px] mb-4">
                      WHAT IS FORBIDDEN / ESTÁ PROHIBIDO
                    </h4>
                    
                    <div className="grid grid-cols-5 gap-3 text-center text-[8.5px] font-bold text-zinc-500">
                      <div className="flex flex-col items-center">
                        <span className="w-8 h-8 rounded-full border border-dashed border-red-300 text-red-500 flex items-center justify-center text-md mb-1 bg-red-50">✏️</span>
                        <span>No writing on the walls</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="w-8 h-8 rounded-full border border-dashed border-red-300 text-red-500 flex items-center justify-center text-md mb-1 bg-red-50">🧳</span>
                        <span>No backpacks / suitcases</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="w-8 h-8 rounded-full border border-dashed border-red-300 text-red-500 flex items-center justify-center text-md mb-1 bg-red-50">🐕</span>
                        <span>No animals (except therapy)</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="w-8 h-8 rounded-full border border-dashed border-red-300 text-red-500 flex items-center justify-center text-md mb-1 bg-red-50">🔪</span>
                        <span>No weapons / glass</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="w-8 h-8 rounded-full border border-dashed border-red-300 text-red-500 flex items-center justify-center text-md mb-1 bg-red-50">🚁</span>
                        <span>No drones</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Info Footer */}
        <div className="border-t border-[#E8E0D0] bg-[#FAF7F2] p-4 flex flex-col sm:flex-row items-center justify-between text-2xs text-zinc-500 gap-3">
          <span>📅 Reserva validada el 09/06/2026. Grupo: Jimena, Jaime y Raquel.</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><span className="text-[#34A853]">✓</span> Entrada Directa</span>
            <span className="flex items-center gap-1"><span className="text-[#34A853]">✓</span> Validada por ID</span>
          </div>
        </div>

      </div>
    </div>
  );
}

/* 
========================================================================================
  PRINT LAYOUT DEFINITION (This renders offscreen and only activates inside window.print())
========================================================================================
*/
export function PrintableColosseumTickets() {
  return (
    <div className="hidden print:block bg-white text-zinc-900 font-sans p-0 m-0 w-full min-h-screen">
      {TICKETS_LIST.map((ticket, idx) => (
        <div 
          key={idx} 
          className="print-page w-full min-h-screen bg-white p-8 md:p-12 relative flex flex-col justify-between"
          style={{ 
            boxSizing: "border-box", 
            pageBreakAfter: "always",
            breakAfter: "page",
            pageBreakInside: "avoid"
          }}
        >
          {/* Main Ticket Block */}
          <div>
            {/* Header row */}
            <div 
              className="flex justify-between items-start pb-6 mb-4" 
              style={{ borderBottom: "2px solid #000" }}
            >
              <div className="flex flex-col items-center">
                <img
                  src={ticket.qrCodeUrl}
                  alt={`QR ${ticket.name}`}
                  className="w-32 h-32 object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="font-mono text-[9px] font-black tracking-wider mt-1 block">
                  {ticket.code}
                </span>
              </div>

              <div className="flex-1 px-8 space-y-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-zinc-600 block">
                  BIGLIETTO ELETTRONICO
                </span>
                <div className="font-mono space-y-1">
                  <div className="text-md font-black text-zinc-950 leading-none">
                    PRENOTAZIONE: {ticket.bookingNo}
                  </div>
                  <div className="text-sm font-black text-amber-700">
                    INGRESSO: {ticket.date} - {ticket.time} HORAS
                  </div>
                  <div className="text-xs font-black text-zinc-800 uppercase">
                    TARIFF / PREZZO: {ticket.price}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[9px] text-zinc-400 font-black tracking-wider uppercase block">
                    TITOLARE DEL BIGLIETTO / TICKET VISITOR
                  </span>
                  <span className="text-md font-black text-zinc-950 uppercase border-b border-zinc-900 pb-0.5 block w-fit">
                    {ticket.name}
                  </span>
                </div>
              </div>

              <div className="text-right flex flex-col items-end justify-between self-stretch">
                <div className="text-right font-serif font-black text-zinc-950 border border-zinc-950 p-2 text-[10px] leading-tight bg-zinc-50 w-fit">
                  P · AR · C <br />
                  ARCHEOLOGICO <br />
                  DEL COLOSSEO
                </div>
                <span className="text-[9px] font-bold text-zinc-500">
                  Página {idx + 1} de 3
                </span>
              </div>
            </div>

            {/* Event title */}
            <div className="py-4 text-center my-2">
              <h2 className="text-md font-extrabold text-[#111] uppercase tracking-widest border-y border-zinc-300 py-2">
                COLOSSEO - FORO ROMANO PALATINO 24H
              </h2>
            </div>

            {/* Matrix details */}
            <div className="grid grid-cols-2 gap-4 border-b border-zinc-300 pb-6 my-2 text-[10px] leading-relaxed">
              <div className="space-y-3.5 border-r border-zinc-200 pr-4">
                <div className="grid grid-cols-[80px_1fr] items-start gap-2">
                  <span className="font-extrabold text-zinc-950 uppercase">VALID</span>
                  <p className="text-zinc-600">
                    <b>Colosseum:</b> one entrance only on the day and booked time.<br />
                    <b>Roman Forum / Palatine Hill / Imperial Fora:</b> one entrance only within the 24h before or after the Colosseum’s booking time.
                  </p>
                </div>

                <div className="grid grid-cols-[80px_1fr] items-start gap-2 pt-1 border-t border-zinc-100">
                  <span className="font-extrabold text-zinc-950 uppercase">INCLUDED</span>
                  <p className="text-zinc-600">
                    Colosseum (First Level • Second Level), Roman Forum, Palatine Hill, Imperial Fora, Exhibitions • Museums.
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 pl-4">
                <div className="grid grid-cols-[80px_1fr] items-start gap-2">
                  <span className="font-extrabold text-zinc-500 uppercase">EXCLUDED</span>
                  <p className="text-zinc-600">
                    Colosseum Arena • Underground • Attic, Roman Forum/Palatine Hill super sites, Domus Area.
                  </p>
                </div>

                <div className="grid grid-cols-[80px_1fr] items-start gap-2 pt-1 border-t border-zinc-100">
                  <span className="font-extrabold text-amber-800 uppercase">ACCESS TIME</span>
                  <p className="text-zinc-600">
                    <b>Colosseum:</b> Booking time (<b>18:00h</b>). Please show up strictly 15 minutes before.<br />
                    <b>Roman Forum / Palatine Hill / Imperial Fora:</b> For opening hours, please check the webpage colosseo.it
                  </p>
                </div>
              </div>
            </div>

            {/* Guidelines grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-b border-zinc-200 text-[9.5px]">
              <div className="space-y-1.5 pr-4 border-r border-zinc-200">
                <h4 className="font-extrabold text-zinc-950 uppercase border-b pb-1">
                  GUIDELINES FOR A GOOD VISIT COLOSSEUM
                </h4>
                <ul className="space-y-1 text-zinc-600">
                  <li>➤ Show up at the entrance of the Colosseum 15 minutes before booking time.</li>
                  <li>➤ Ticket valid for 75 min visiting time inside the Colosseum.</li>
                  <li>➤ Show ID/Passport at the entrance for validation.</li>
                  <li>➤ The itinerary follows a strict one-way route.</li>
                  <li>➤ Do not stray from the marked paths or touch historical ruins.</li>
                </ul>
              </div>

              <div className="space-y-1.5 pl-4 flex flex-col justify-start">
                <h4 className="font-extrabold text-zinc-950 uppercase border-b pb-1">
                  ROMAN FORUM • PALATINE HILL • IMPERIAL FORA
                </h4>
                <ul className="space-y-1 text-zinc-600">
                  <li>➤ Show ID/Passport at the entrance.</li>
                  <li>➤ Follow the marked routes inside the archaeological sites.</li>
                  <li>➤ It is recommended to wear comfortable sports/walking shoes.</li>
                </ul>
              </div>
            </div>

            {/* Forbidden Section */}
            <div className="pt-4 text-center">
              <h4 className="font-extrabold text-zinc-950 uppercase tracking-widest text-[9px] mb-4">
                WHAT IS FORBIDDEN / ESTÁ PROHIBIDO
              </h4>
              <div className="flex justify-around items-center text-[8px] font-bold text-zinc-600">
                <div className="flex flex-col items-center">
                  <span className="text-[18px] mb-0.5 block">✏️</span>
                  <span>No writing on the walls</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[18px] mb-0.5 block">🧳</span>
                  <span>No backpacks/luggage</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[18px] mb-0.5 block">🐕</span>
                  <span>No animals (except therapy)</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[18px] mb-0.5 block">🔪</span>
                  <span>No weapons / glass</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[18px] mb-0.5 block">🚁</span>
                  <span>No drones</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer of sheet */}
          <div className="border-t border-zinc-400 pt-3 flex justify-between items-center text-[8px] text-zinc-500 font-mono">
            <span>Prenotazione n. OCO4167914 effettuata il giorno 09/06/2026 alle ore 16:07</span>
            <span>PARCO ARCHEOLOGICO DEL COLOSSEO</span>
          </div>
        </div>
      ))}
    </div>
  );
}
