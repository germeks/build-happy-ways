import { Day, ExtraItem, Flight, RestaurantItem } from "./types";
import imgFontana from "./assets/images/fontana_di_trevi_1781120077212.png";
import imgPiazzaColonna from "./assets/images/piazza_colonna_1781120094872.png";
import imgSantIgnazio from "./assets/images/sant_ignazio_loyola_1781120110503.png";
import imgPiazzaNavona from "./assets/images/piazza_navona_1781120129652.png";
import imgChiesaGesu from "./assets/images/chiesa_del_gesu_1781120146272.png";
import imgMercadoTrajano from "./assets/images/mercado_trajano_1781120805055.png";
import imgCampidoglio from "./assets/images/campidoglio_1781120821008.png";
import imgBocaVerdad from "./assets/images/boca_verdad_1781120835542.png";
import imgTrastevere from "./assets/images/trastevere_1781120847984.png";
import imgCastilloSantAngelo from "./assets/images/castillo_sant_angelo_1781120861264.png";
import imgPuenteUmbertoI from "./assets/images/puente_umberto_i_1781120876342.png";
import imgPiazzaSpagna from "./assets/images/piazza_spagna_1781120890662.png";
import imgForoRomano from "./assets/images/foro_romano_1781120905349.png";
import imgSanJuanLetran from "./assets/images/san_juan_letran_1781120917726.png";
import imgSantaMariaNeve from "./assets/images/santa_maria_neve_1781120930710.png";
import imgRomaLlegadaHeader from "./assets/images/roma_dia_1_sunset_1781121878855.png";
import imgRomaCorazonHeader from "./assets/images/roma_corazon_header_1781121613767.png";
import imgPanteonAgripa from "./assets/images/panteon_agripa_1781121629731.png";
import imgRomaImperialHeader from "./assets/images/roma_imperial_header_1781121643511.png";
import imgColiseoRoma from "./assets/images/coliseo_roma_1781121656522.png";
import imgVaticanoHeader from "./assets/images/vaticano_header_1781121669132.png";
import imgPlazaSanPietro from "./assets/images/plaza_san_pietro_1781121683791.png";
import imgCatacumbasSebastian from "./assets/images/catacumbas_sebastian_1781123649749.png";
import imgMoisesMichelangelo from "./assets/images/moises_michelangelo_1781123667213.png";
import imgSanPabloExtramuros from "./assets/images/san_pablo_extramuros_1781123683817.png";

export const FLIGHT_IDA: Flight = {
  number: "IB 655",
  airline: "Iberia",
  originCode: "MAD",
  originName: "Madrid Barajas T4",
  originTime: "17:10",
  destCode: "FCO",
  destName: "Roma Fiumicino T1",
  destTime: "19:40",
  duration: "~2h 30min"
};

export const FLIGHT_VUELTA: Flight = {
  number: "IB 0652",
  airline: "Iberia",
  originCode: "FCO",
  originName: "Roma Fiumicino T1",
  originTime: "16:15",
  destCode: "MAD",
  destName: "Madrid Barajas T4",
  destTime: "18:50",
  duration: "~2h 35min"
};

export const GENERAL_RESTAURANTS: RestaurantItem[] = [
  { name: "L'Antico Vinaio", type: "Focaccia", emoji: "🥖" },
  { name: "Mariuccia", type: "Pizza", emoji: "🍕" },
  { name: "Pastaciutta", type: "Pasta · Barata para llevar", emoji: "🍝" },
  { name: "Piccolo Buco", type: "Pizza", emoji: "🍕" },
  { name: "La Romana", type: "Heladería", emoji: "🍦" },
  { name: "Frigidarium", type: "Helado con chocolate", emoji: "🍦" },
  { name: "Fatamorgana", type: "Heladería artesanal", emoji: "🍦" },
  { name: "Venchi", type: "Heladería · Chocolate", emoji: "🍦" },
  { name: "L'Antico Forno di Fontana di Trevi", type: "Desayuno · Croissant pistacho", emoji: "🥐" },
  { name: "Taza D'Oro", type: "Café · Junto al Panteón", emoji: "☕" }
];

export const DAYS: Day[] = [
  {
    number: 1,
    name: "Llegada a Roma",
    date: "Viernes · 12 de Junio",
    summary: [
      "✈ Vuelo IB655 · 17:10–19:40",
      "🏨 Check-in hotel",
      "🍽 Cena en Trastevere"
    ],
    image: imgRomaLlegadaHeader,
    gradient: "from-[#2C5F8A] to-[#1A3A5C]",
    items: [
      {
        activity: {
          id: "d1-a1",
          title: "Aterrizaje en Roma Fiumicino",
          subtitle: "Terminal 1",
          body: "Llegada a las 19:40h. Recoge equipaje y dirígete al Leonardo Express.",
          blueTags: ["⏰ 19:40h · T1"]
        },
        nextTransport: {
          type: "train",
          description: "Leonardo Express · 30 min",
          badge: "14€ / persona"
        }
      },
      {
        activity: {
          id: "d1-a2",
          title: "Check-in en el Hotel",
          subtitle: "Vaticano Venticinque Guest House by Ghor",
          body: "Instalación en el alojamiento y preparación para la cena.",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Vaticano+Venticinque+Guest+House+by+Ghor,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "11 min caminando"
        }
      },
      {
        activity: {
          id: "d1-a3",
          title: "Cena · Tonnarello San Pietro",
          subtitle: "Primer sabor romano",
          body: "A 11 minutos andando del hotel. Uno de los clásicos de la zona del Vaticano. Hay muchos otros sitios para cenar en la zona por si hay espera.",
          tags: ["🚶 11 min desde hotel"],
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Tonnarello+San+Pietro,+Roma"
        }
      }
    ]
  },
  {
    number: 2,
    name: "El Corazón Histórico",
    date: "Sábado · 13 de Junio",
    summary: [
      "Fontana di Trevi · Panteón · Piazza Navona",
      "Altare della Patria · Coliseo",
      "Trastevere"
    ],
    image: imgRomaCorazonHeader,
    gradient: "from-[#7B3F6E] to-[#4A1A42]",
    items: [
      {
        activity: {
          id: "d2-a1",
          title: "Desayuno",
          subtitle: "Cerca del hotel o en destino",
          body: "Puedes desayunar cerca del hotel o esperar a llegar cerca de la Fontana di Trevi y hacerlo en L'Antico Forno Di Fontana Di Trevi — famoso por su croissant de pistacho.",
          greenTags: ["🥐 Croissant de pistacho imprescindible"]
        },
        nextTransport: {
          type: "bus",
          description: "Bus 492 · 36 min",
          badge: "o 🚶 44 min caminando"
        }
      },
      {
        activity: {
          id: "d2-a2",
          title: "Fontana di Trevi",
          subtitle: "📍 Piazza di Trevi, Roma",
          body: "Uno de los monumentos más icónicos del mundo. El acceso al nivel inferior es de pago. Compra tu entrada con antelación en la página oficial o en la zona de acceso.",
          alertTags: ["💶 2€ acceso nivel inferior · 9h–22h"],
          blueTags: ["🎟 Reserva online recomendada"],
          image: imgFontana,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fontana+di+Trevi,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "Paseo por Via dei Pastini"
        }
      },
      {
        activity: {
          id: "d2-a3",
          title: "Via dei Pastini → Plaza Colonna",
          subtitle: "Templo de Adriano · Columna de Marco Aurelio",
          body: "Recorre la Via dei Pastini pasando por las esbeltas columnas del Templo de Adriano (año 145) hasta llegar a la Plaza Colonna, presidida por la impresionante Columna de Marco Aurelio.",
          image: imgPiazzaColonna,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Piazza+Colonna,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "🚶 ~8 min caminando"
        }
      },
      {
        activity: {
          id: "d2-a4",
          title: "Iglesia San Ignacio de Loyola",
          subtitle: "Obras del barroco",
          body: "Fascinante ejemplo del barroco romano con sus ilusiones ópticas en el techo con falsas cúpulas pintadas en perspectiva.",
          image: imgSantIgnazio,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sant+Ignazio+di+Loyola,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "🚶 8 min caminando desde Fontana di Trevi"
        }
      },
      {
        activity: {
          id: "d2-a5",
          title: "Panteón de Agripa",
          subtitle: "Templo antiguo",
          body: "Al salir, tómate uno de los mejores cafés de Roma en La Casa del Caffè Tazza D'oro — también puedes comprar café molido o en grano como recuerdo perfecto.",
          greenTags: ["☕ Tazza D'Oro al salir — imprescindible"],
          image: imgPanteonAgripa,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantheon,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "🚶 ~5 min caminando"
        }
      },
      {
        activity: {
          id: "d2-a6",
          title: "Piazza Navona",
          subtitle: "Plaza barroca",
          body: "Una de las plazas más animadas de Roma. Aprovecha para probar el tiramisú de pistacho en Two Sizes o los helados cubiertos de chocolate caliente en Frigidarium.",
          tags: ["🍮 Two Sizes · Tiramisú de pistacho", "🍦 Frigidarium · Helado con chocolate"],
          image: imgPiazzaNavona,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Piazza+Navona,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "🚶 ~8 min caminando"
        }
      },
      {
        activity: {
          id: "d2-a7",
          title: "Comida",
          subtitle: "Opciones en la zona",
          body: "Varias opciones cercanas para el almuerzo:",
          tags: ["🍝 Osteria Fortunata", "🍦 Giolitti (helado)", "🥖 Forno Campo de Fiori · Para llevar"],
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Osteria+Fortunata,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "🚶 ~4 min caminando"
        }
      },
      {
        activity: {
          id: "d2-a8",
          title: "Chiesa del Gesù",
          subtitle: "Iglesia madre de la Compañía de Jesús",
          body: "Iglesia madre de la Compañía de Jesús, con una de las decoraciones barrocas más espectaculares de Roma.",
          image: imgChiesaGesu,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Chiesa+del+Gesu,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "🚶 ~3 min caminando"
        }
      },
      {
        activity: {
          id: "d2-a9",
          title: "Altare della Patria",
          subtitle: "Vittoriano",
          body: "El monumento más imponente de Roma. Vistas panorámicas gratuitas desde la terraza.",
          image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800&q=80",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Altare+della+Patria,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "🚶 ~6 min caminando"
        }
      },
      {
        activity: {
          id: "d2-a10",
          title: "Mercado de Trajano",
          subtitle: "Centro comercial imperial",
          body: "El primer centro comercial del mundo, construido hace casi 2.000 años.",
          image: imgMercadoTrajano,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mercati+di+Traiano,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "🚶 ~7 min caminando"
        }
      },
      {
        activity: {
          id: "d2-a11",
          title: "Campidoglio",
          subtitle: "Via Monte Tarpeo",
          body: "La colina capitolina diseñada por Miguel Ángel, con vistas privilegiadas sobre el Foro Romano.",
          image: imgCampidoglio,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Piazza+del+Campidoglio,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "🚶 ~8 min caminando"
        }
      },
      {
        activity: {
          id: "d2-a12",
          title: "Boca de la Verdad",
          subtitle: "Bocca della Verità",
          body: "Uno de los símbolos más emblemáticos de Roma, ubicado en el pórtico de Santa María in Cosmedin.",
          image: imgBocaVerdad,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bocca+della+Verita,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "🚶 ~15 min caminando hacia Trastevere"
        }
      },
      {
        activity: {
          id: "d2-a13",
          title: "Tarde / Noche en Trastevere",
          subtitle: "El barrio más bohemio de Roma",
          body: "Callejuelas medievales, terrazas animadas y una ambiente únicamente romano. Elige entre los mejores restaurantes del barrio.",
          image: imgTrastevere,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Trastevere,+Roma"
        }
      }
    ],
    restaurants: [
      {
        name: "Da Enzo al 29",
        type: "Pasta",
        emoji: "🍝",
        address: "Via dei Vascellari, 29",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Da+Enzo+al+29,+Roma"
      },
      {
        name: "La Prosciutteria Cantina Dei Papi",
        type: "Tabla de quesos/embutidos",
        emoji: "🧀",
        address: "Via della Scala, 71",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=La+Prosciutteria+Trastevere,+Roma"
      },
      {
        name: "Dar Poeta",
        type: "Pizza",
        emoji: "🍕",
        address: "Vicolo del Bologna, 45",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Dar+Poeta,+Roma"
      },
      {
        name: "Nannarella",
        type: "Pasta",
        emoji: "🍝",
        address: "Piazza di S. Calisto, 7a",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Nannarella,+Roma"
      },
      {
        name: "Tonnarello",
        type: "Clásico romano",
        emoji: "🍽",
        address: "Via de' Pagliares, 8",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Tonnarello+Trastevere,+Roma"
      },
      {
        name: "Fior di Luna",
        type: "Heladería",
        emoji: "🍦",
        address: "Via della Lungaretta, 96",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fior+di+Luna,+Roma"
      },
      {
        name: "Gelateria del Viale",
        type: "Heladería",
        emoji: "🍦",
        address: "Piazza G. G. Belli, 9F",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gelateria+del+Viale,+Roma"
      }
    ]
  },
  {
    number: 3,
    name: "Roma Imperial",
    date: "Domingo · 14 de Junio",
    summary: [
      "Castel Sant'Angelo · Foro Romano",
      "Coliseo · Entrada 18:00h",
      "Basílicas históricas"
    ],
    image: imgRomaImperialHeader,
    gradient: "from-[#1E6B5A] to-[#0D3D32]",
    items: [
      {
        activity: {
          id: "d3-a1",
          title: "Castillo Sant'Angelo",
          subtitle: "Mausoleo Imperial · Fortaleza Papal",
          body: "Antiguo mausoleo de Adriano reconvertido en fortaleza papal, con vistas espectaculares sobre el Tíber y el Vaticano.",
          image: imgCastilloSantAngelo,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Castel+Sant+Angelo,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "🚶 ~10 min caminando por el río"
        }
      },
      {
        activity: {
          id: "d3-a2",
          title: "Puente Umberto I",
          subtitle: "Vistas del Tíber",
          body: "Elegante puente Belle Époque con vistas perfectas sobre el Tíber y la cúpula de San Pedro.",
          image: imgPuenteUmbertoI,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ponte+Umberto+I,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "🚶 ~5 min caminando"
        }
      },
      {
        activity: {
          id: "d3-a3",
          title: "Piazza di Spagna",
          subtitle: "Escalinata de la Trinidad · Via Condotti",
          body: "La famosa escalinata de 135 peldaños y una de las plazas más fotografiadas de Roma, rodeada de boutiques de lujo.",
          image: imgPiazzaSpagna,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Piazza+di+Spagna,+Roma"
        },
        nextTransport: {
          type: "bus", // representing metro/walking
          description: "🚇 Metro o 🚶 Caminando"
        }
      },
      {
        activity: {
          id: "d3-a4",
          title: "Foro Romano",
          subtitle: "Terraza Belvedere incluida",
          body: "El corazón de la Roma Antigua. Pasea entre templos, arcos de triunfo y la Vía Sacra. Sube a la Terraza Belvedere para las mejores vistas sobre el foro.",
          image: imgForoRomano,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Foro+Romano,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "🚶 5 min caminando"
        }
      },
      {
        activity: {
          id: "d3-a5",
          title: "Coliseo",
          subtitle: "Horario dorado",
          body: "El anfiteatro más grande jamás construido. Tu entrada es a las 18:00h — el horario dorado para evitar el calor y las multitudes.",
          alertTags: ["🎟 Entrada reservada · 18:00h"],
          image: imgColiseoRoma,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Colosseo,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "🚶 ~6 min caminando"
        }
      },
      {
        activity: {
          id: "d3-a6",
          title: "Archibasílica de San Juan de Letrán",
          subtitle: "Catedral de Roma",
          body: "La catedral más antigua del mundo cristiano occidental, sede del Papa como Obispo de Roma.",
          image: imgSanJuanLetran,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=San+Giovanni+in+Laterano,+Roma"
        },
        nextTransport: {
          type: "walk",
          description: "🚶 ~15 min caminando hacia Trastevere"
        }
      },
      {
        activity: {
          id: "d3-a7",
          title: "Basílica Santa María della Neve",
          subtitle: "Basílica de Santa Maria Maggiore",
          body: "Basílica dedicada a la Virgen de las Nieves, con su famosa historia del milagro de agosto.",
          image: imgSantaMariaNeve,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Santa+Maria+Maggiore,+Roma"
        }
      }
    ]
  },
  {
    number: 4,
    name: "El Vaticano y Vuelta a Casa",
    date: "Lunes · 15 de Junio",
    summary: [
      "⛪ Vaticano · Plaza y Basílica",
      "✈ Vuelo IB0652 · 16:15h",
      "🏠 Madrid T4 · 18:50h"
    ],
    image: imgVaticanoHeader,
    gradient: "from-[#8B4513] to-[#5C2D0E]",
    items: [
      {
        activity: {
          id: "d4-a1",
          title: "Ciudad del Vaticano",
          subtitle: "Plaza de San Pedro · Basílica de San Pedro",
          body: "El estado más pequeño del mundo, a pasos de tu hotel. Visita la imponente Plaza de San Pedro y la Basílica de San Pedro, una de las iglesias más grandes del mundo. La entrada a la basílica es gratuita.",
          greenTags: ["✅ Acceso libre a la Plaza y Basílica"],
          image: imgPlazaSanPietro,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Piazza+San+Pietro,+Vaticano"
        },
        nextTransport: {
          type: "walk",
          description: "⏰ Salida hotel antes de mediodía"
        }
      },
      {
        activity: {
          id: "d4-a2",
          title: "Check-out y traslado al aeropuerto",
          subtitle: "Traslado a Fiumicino",
          body: "Recoge tu equipaje y dirígete a la estación para coger el Leonardo Express de vuelta al aeropuerto Fiumicino.",
          alertTags: ["⏰ Vuelo a las 16:15h · Llegar al aeropuerto con 2h de antelación"]
        }
      }
    ]
  }
];

export const EXTRAS: ExtraItem[] = [
  {
    id: "extra-catacumbas",
    title: "Catacumbas de San Sebastián",
    subtitle: "Catacombe di San Sebastiano",
    body: "Uno de los cementerios subterráneos más famosos de Roma, situado en la Via Appia Antica. Son célebres por haber albergado temporalmente los restos de San Pedro y San Pablo durante las persecuciones cristianas. Constan de cuatro niveles de galerías excavadas sobre roca de toba volcánica y albergan valiosos frescos históricos, grafitis antiguos y hermosos nichos sepulcrales.",
    image: imgCatacumbasSebastian,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Catacombe+di+San+Sebastiano,+Roma",
    tags: ["🏺 Historia Cristiana", "🪦 Subterráneo", "🏛️ Via Appia Antica"],
    tips: [
      "Se requiere visita guiada (incluida en el precio de la entrada) para recorrer las complejas galerías subterráneas por motivos de seguridad.",
      "La temperatura bajo tierra se mantiene fresca (~15°C) y constante todo el año; te sugerimos llevar una chaqueta ligera incluso en el caluroso mes de junio.",
      "Aprovecha tu visita para dar un paseo por la histórica Vía Appia Antica, una de las calzadas de piedra más antiguas y mejor conservadas de Roma."
    ],
    howToGet: "🚌 Autobús línea 118 o 218 desde el centro histórico de Roma, bajando en la parada 'Catacombe di San Sebastiano'."
  },
  {
    id: "extra-moises",
    title: "El Moisés de Miguel Ángel",
    subtitle: "Basílica de San Pietro in Vincoli (San Pedro Encadenado)",
    body: "Ubicada muy cerca del Coliseo, esta basílica alberga una de las obras cumbres de la escultura del Renacimiento: el majestuoso Moisés de Miguel Ángel, tallado en mármol de Carrara en 1513 como parte del mausoleo del Papa Julio II. La escultura impresiona por su realismo anatómico, la sobrecogedora fuerza de su mirada divina (conceptuada artísticamente como terribilità) y el minucioso detalle de sus barbas. La basílica también expone bajo el altar mayor las sagradas cadenas de San Pedro.",
    image: imgMoisesMichelangelo,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=San+Pietro+in+Vincoli,+Roma",
    tags: ["🎨 Renacimiento", "🗿 Miguel Ángel", "🗝️ Reliquias Sagradas"],
    tips: [
      "El acceso a la basílica es completamente libre e indefinidamente gratuito.",
      "Lleva algunas monedas de 1€ o 2€: al lado del monumento hay una pequeña caja de luz que ilumina el retablo por unos minutos para admirarlo a la perfección.",
      "Es una visita excelente y muy rápida de hacer (20–30 minutos) aprovechando tu trayecto al Coliseo."
    ],
    howToGet: "🚶 A 7 minutos subiendo por las escaleras esculpidas de la Via San Francesco di Paola desde la estación de Metro Colosseo."
  },
  {
    id: "extra-san-pablo",
    title: "Basílica de San Pablo Extramuros",
    subtitle: "Basilica di San Paolo fuori le Mura",
    body: "Es una de las cuatro basílicas papales mayores de Roma, erigida justo encima del sepulcro donde reposan los restos martirizados del apóstol San Pablo. Aunque fue destruida por un grave incendio fortuito en 1823, resurgió conservando al detalle su esplendor paleocristiano. Son imperdibles su espectacular atrio exterior con un frondoso bosque de 150 columnas monolíticas de granito, sus mosaicos dorados del ábside y el friso circular con los medallones retratados en mosaico de absolutamente todos los Papas.",
    image: imgSanPabloExtramuros,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Basilica+di+San+Paolo+fuori+le+Mura,+Roma",
    tags: ["⛪ Basílica Mayor", "✨ Mosaicos Dorados", "🌿 Jardín de Columnas"],
    tips: [
      "El acceso general al templo principal es gratuito; solo se abonan unos 4€ opcionales si decides acceder a su claustro medieval bizantino (altamente sugerido).",
      "Diviértete localizando el retrato del Papa Francisco: siempre brilla con una sutil luz dirigida. La profecía dice que al acabarse los medallones, coincidirá con el fin celestial.",
      "La tienda de productos naturales del convento benedictino anejo ofrece mieles y dulces exclusivos hechos a mano por los monjes."
    ],
    howToGet: "🚇 Metro Línea B, apeándote directamente en la estación 'Basilica San Paolo'. La entrada principal se halla a menos de un minuto."
  },
  {
    id: "extra-santa-maria",
    title: "Basílica de Santa María la Mayor",
    subtitle: "Basilica di Santa Maria Maggiore",
    body: "La mayor iglesia dedicada a la Virgen en Roma, fechada en el siglo V, es un crisol donde conviven armónicamente el arte paleocristiano, medieval, renacentista y barroco. Adornada con los espléndidos mosaicos antiguos del año 430, conserva bajo el altar de la Confesión la preciada reliquia fósil de la Cuna del Niño Jesús. En esta basílica yace también sepultado de manera austera el genio máximo del barroco, Gian Lorenzo Bernini.",
    image: imgSantaMariaNeve,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Basilica+di+Santa+Maria+Maggiore,+Roma",
    tags: ["⛪ Basílica Mayor", "💎 Mosaicos Siglo V", "🏺 Reliquias de la Cuna"],
    tips: [
      "La entrada es libre y gratuita; no olvides que hay controles de metal avanzados obligatorios a la entrada.",
      "La tumba de Bernini no es un monumento colosal, sino una modesta losa a la derecha del ábside principal grabada únicamente con su nombre familiar. ¡Atento a no pasarla de largo!",
      "Contempla detenidamente el artesonado dorado del techo: se revistió enteramente empleando la primera remesa de metales preciosos embarcada desde las Américas por los Reyes Católicos."
    ],
    howToGet: "🚇 Metro Líneas A o B, apeándote en la parada 'Termini'. Camina un breve trecho llano de apenas 4 minutos rodeado de pintorescas tiendas."
  }
];

