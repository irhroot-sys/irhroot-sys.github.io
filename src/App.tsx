import { motion, animate, useInView, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, ChevronRight, ChevronUp, Recycle, Truck, Factory, ShieldCheck, Phone, Mail, MapPin, Search, X, Play, AlertCircle, Loader2, Plus, Minus, ImageOff, Linkedin, Twitter, Facebook, Zap, Anvil, Feather, CheckCircle2, XCircle, Sun, Moon } from 'lucide-react';
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const MaterialPage = lazy(() => import('./components/MaterialPage'));

const mockChartData = [
  { month: 'Jan', copper: 3.80, steel: 1.20, aluminum: 1.05 },
  { month: 'Feb', copper: 3.85, steel: 1.25, aluminum: 1.10 },
  { month: 'Mar', copper: 4.02, steel: 1.30, aluminum: 1.15 },
  { month: 'Apr', copper: 4.15, steel: 1.35, aluminum: 1.22 },
  { month: 'May', copper: 4.30, steel: 1.40, aluminum: 1.28 },
  { month: 'Jun', copper: 4.25, steel: 1.42, aluminum: 1.30 },
  { month: 'Jul', copper: 4.40, steel: 1.48, aluminum: 1.35 },
  { month: 'Aug', copper: 4.60, steel: 1.50, aluminum: 1.40 },
  { month: 'Sep', copper: 4.55, steel: 1.45, aluminum: 1.38 },
  { month: 'Oct', copper: 4.70, steel: 1.55, aluminum: 1.45 },
  { month: 'Nov', copper: 4.85, steel: 1.60, aluminum: 1.50 },
  { month: 'Dec', copper: 5.10, steel: 1.65, aluminum: 1.55 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-sm shadow-xl">
        <p className="text-zinc-500 text-xs font-mono mb-3 uppercase tracking-widest border-b border-zinc-800/50 pb-2">
          Month: <span className="text-zinc-300 font-semibold">{label}</span>
        </p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-6 font-mono text-sm">
              <div className="flex items-center gap-2 text-zinc-400">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: entry.color }}></div>
                <span className="uppercase">{entry.name}</span>
              </div>
              <span className="text-white font-bold tracking-wider">${entry.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

function AnimatedNumber({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (value) => {
          setCount(Math.round(value));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}


const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const SEARCH_DATA = [
  { title: "Services", type: "Section", id: "services", url: "#services" },
  { title: "Why Choose Us", type: "Section", id: "why-us", url: "#why-us" },
  { title: "Materials & Pricing", type: "Section", id: "materials", url: "#materials" },
  { title: "Contact Us", type: "Section", id: "contact", url: "#contact" },
  { title: "About Company", type: "Section", id: "about", url: "#about" },
  { title: "FAQ / Knowledge Base", type: "Section", id: "faq", url: "#faq" },
  { title: "Privacy Policy", type: "Legal", id: "privacy", url: "#privacy" },
  { title: "Terms of Service", type: "Legal", id: "terms", url: "#terms" },
  { title: "Copper Scrap", type: "Material", id: "copper", url: "#material-copper" },
  { title: "Steel Scrap", type: "Material", id: "steel", url: "#material-steel" },
  { title: "Aluminum Scrap", type: "Material", id: "aluminum", url: "#material-aluminum" },
  { title: "Container Service", type: "Service", id: "service-container", url: "#services" },
  { title: "Industrial Demolition", type: "Service", id: "service-demolition", url: "#services" },
  { title: "Scrap Purchasing", type: "Service", id: "service-purchasing", url: "#services" },
  { title: "Heavy Logistics", type: "Service", id: "service-logistics", url: "#services" },
  { title: "Metal Sorting", type: "Service", id: "service-sorting", url: "#services" },
  { title: "Global Export", type: "Service", id: "service-export", url: "#services" },
];

const ALL_SERVICES = [
  {
    icon: Truck,
    title: "Container Service",
    desc: "We offer 10 to 40-yard roll-off containers, flatbeds, and specialized transport designed to meet your specific site requirements.",
    category: "Collection"
  },
  {
    icon: Factory,
    title: "Industrial Demolition",
    desc: "Complete asset recovery and dismantling services for obsolete machinery, structural steel, and entire industrial facilities.",
    category: "Processing"
  },
  {
    icon: Recycle,
    title: "Scrap Purchasing",
    desc: "Competitive, market-indexed pricing for all ferrous and non-ferrous metals, ensuring maximum return on your material.",
    category: "Trading"
  },
  {
    icon: Truck,
    title: "Heavy Logistics",
    desc: "Custom fleet management for massive industrial relocations and bulk scrap transport across the Kingdom.",
    category: "Collection"
  },
  {
    icon: Factory,
    title: "Metal Sorting",
    desc: "Advanced laser and XRF sorting technologies for precise identification of complex alloys and mixed metals.",
    category: "Processing"
  },
  {
    icon: Recycle,
    title: "Global Export",
    desc: "Direct supply chain to international foundries and mills, optimizing value through global trade channels.",
    category: "Trading"
  }
];

const highlightMatch = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() 
          ? <span key={i} className="text-primary font-bold">{part}</span> 
          : <span key={i}>{part}</span>
      )}
    </span>
  );
};

function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const results = query ? SEARCH_DATA.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.type.toLowerCase().includes(query.toLowerCase())
  ) : [];

  return (
    <div className="relative group z-50">
      <div className="relative">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input 
          type="text" 
          placeholder="Search materials, services..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm pl-9 pr-8 py-2 text-[11px] text-zinc-900 dark:text-zinc-300 focus:outline-none focus:border-primary transition-all w-36 lg:w-48 focus:w-56 lg:focus:w-64 placeholder:text-zinc-500 shadow-sm" 
        />
        {query && (
          <button 
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
      
      {isFocused && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm shadow-xl p-1 max-h-64 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold px-3 py-2 border-b border-zinc-100 dark:border-zinc-900 mb-1 font-mono">Search Results</div>
          {results.length > 0 ? (
            results.map((result, idx) => (
              <a 
                key={idx} 
                href={result.url} 
                className="block px-3 py-2 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-sm transition-colors group/item border-l-2 border-transparent hover:border-primary"
                onClick={() => setQuery('')}
              >
                <div className="text-zinc-700 dark:text-zinc-300 text-sm group-hover/item:text-zinc-950 dark:group-hover/item:text-white transition-colors">
                  {highlightMatch(result.title, query)}
                </div>
                <div className="text-zinc-400 text-[10px] uppercase tracking-widest mt-0.5 group-hover/item:text-zinc-500">
                  {highlightMatch(result.type, query)}
                </div>
              </a>
            ))
          ) : (
            <div className="px-3 py-6 text-zinc-400 text-xs text-center italic">No results found for "{query}"</div>
          )}
        </div>
      )}
    </div>
  );
}

const FAQ_DATA = [
  {
    question: "What types of scrap metal do you accept?",
    answer: "We purchase a wide variety of ferrous and non-ferrous metals including copper, aluminum, brass, stainless steel, cast iron, heavy melt steel, and structural steel. If you have a specific material, feel free to contact us for verification."
  },
  {
    question: "Do you offer collection services from industrial sites?",
    answer: "Yes, we provide prompt and reliable collection services and logistics. For high-volume producers, we offer container swap guarantees and dedicated account management spanning the entire Eastern Province."
  },
  {
    question: "How do you determine the price for scrap materials?",
    answer: "Our pricing is transparent and tied to live global market indexes. We use state-of-the-art grading equipment, and materials are weighed on our certified scales to guarantee honest, market-competitive value for every load."
  },
  {
    question: "Are your facilities environmentally compliant?",
    answer: "Absolutely. We are an ISO 14001 Certified Facility, adhering to strict environmental and safety regulations. Sustainability and responsible recycling are at the core of our operations."
  },
  {
    question: "What is your typical payment process for suppliers?",
    answer: "We offer fast and reliable payment processing tailored to your business needs. After materials are analyzed and weighed, payment terms are instantly initiated."
  }
];

function FAQItem({ question, answer, isOpen, onClick }: { key?: number | string, question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col group overflow-hidden transition-colors duration-300">
      <button 
        type="button"
        onClick={onClick}
        className={`flex items-center justify-between p-6 w-full text-left transition-colors ${isOpen ? 'bg-zinc-50 dark:bg-zinc-900/50' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900/50'}`}
      >
        <span className="font-semibold text-zinc-900 dark:text-white tracking-widest uppercase text-sm pr-6">{question}</span>
        <span className={`shrink-0 p-1.5 rounded-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 group-hover:text-primary transition-colors ${isOpen ? 'text-primary border-primary/20 bg-primary/5' : ''}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
           <div className="p-6 pt-0 text-zinc-500 dark:text-zinc-500 text-sm leading-relaxed border-t border-zinc-100 dark:border-zinc-900/50">
             {answer}
           </div>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-primary"></div>
          <span className="text-primary font-semibold tracking-widest uppercase text-xs">Knowledge Base</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-zinc-900 dark:text-white mb-10">Frequently Asked <span className="text-zinc-400 dark:text-zinc-600">Questions</span></h3>
        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => (
            <FAQItem 
              key={idx} 
              question={faq.question} 
              answer={faq.answer} 
              isOpen={openIndex === idx} 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MaterialsGuide() {
  const guideData = [
    {
      metal: "Copper",
      icon: Zap,
      color: "text-[#f97316]",
      bg: "bg-[#f97316]/10",
      border: "border-[#f97316]/20",
      acceptable: ["Bare bright wire (uncoated, unalloyed)", "Clean copper tubing (No solder, paint)", "#1 Heavy Copper"],
      unacceptable: ["Insulated wire (requires processing)", "Burnt copper wire", "Mixed with brass/steel"]
    },
    {
      metal: "Steel",
      icon: Anvil,
      color: "text-[#a1a1aa]",
      bg: "bg-[#a1a1aa]/10",
      border: "border-[#a1a1aa]/20",
      acceptable: ["Heavy melt steel (HMS 1 & 2)", "Structural beams (cut to size)", "Clean automotive scrap"],
      unacceptable: ["Sealed tanks or cylinders", "Excessive rust/corrosion", "Non-depleted hazardous containers"]
    },
    {
      metal: "Aluminum",
      icon: Feather,
      color: "text-[#38bdf8]",
      bg: "bg-[#38bdf8]/10",
      border: "border-[#38bdf8]/20",
      acceptable: ["Clean extruded aluminum", "Aluminum rims (clean, no tires)", "Clean sheet aluminum"],
      unacceptable: ["Die cast with steel attachments", "Irony aluminum (excessive screws/bolts)", "Litho plates with paper"]
    }
  ];

  return (
    <div className="mt-24 border-t border-zinc-800 pt-20">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-primary"></div>
          <span className="text-primary font-semibold tracking-widest uppercase text-xs">Quality Standards</span>
        </div>
        <h3 className="font-display text-3xl md:text-5xl uppercase tracking-wide text-white mb-6">
          Grading & <span className="text-zinc-600">Acceptance</span>
        </h3>
        <p className="text-zinc-400 max-w-2xl text-sm leading-relaxed">
          To ensure the highest market value and safety standards, AALKC employs a strict grading criteria. Please review our visual guide for condition requirements prior to scheduling a pickup.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {guideData.map((item, idx) => (
          <div key={idx} className="border border-zinc-800 bg-zinc-900/50 p-6 md:p-8 rounded-sm hover:border-zinc-700 transition-colors flex flex-col relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-[40px] rounded-full pointer-events-none transition-all duration-500 group-hover:scale-150 group-hover:opacity-20" style={{ backgroundColor: item.color.replace('text-[', '').replace(']', '') }}></div>
             
             <div className="flex items-center gap-4 border-b border-zinc-800/80 pb-6 mb-6 relative z-10">
               <div className={`p-4 rounded-full ${item.bg} ${item.border} border flex items-center justify-center`}>
                 <item.icon className={`w-6 h-6 ${item.color}`} />
               </div>
               <h4 className="text-xl font-display uppercase tracking-widest text-white m-0">
                 {item.metal}
               </h4>
             </div>
             
             <div className="w-full text-left space-y-8 relative z-10">
               <div>
                  <h5 className="text-[10px] uppercase tracking-widest text-green-500 font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Acceptable Conditions
                  </h5>
                  <ul className="space-y-3">
                    {item.acceptable.map((desc, i) => (
                      <li key={i} className="text-zinc-400 text-xs sm:text-sm flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full mt-1.5 shrink-0"></div>
                        <span className="leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
               </div>

               <div className="pt-6 border-t border-zinc-800/50">
                  <h5 className="text-[10px] uppercase tracking-widest text-red-500 font-bold mb-4 flex items-center gap-2">
                    <XCircle className="w-3.5 h-3.5" /> Common Downgrades
                  </h5>
                  <ul className="space-y-3">
                    {item.unacceptable.map((desc, i) => (
                      <li key={i} className="text-zinc-500 text-xs sm:text-sm flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 bg-red-500/50 rounded-full mt-1.5 shrink-0"></div>
                        <span className="leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const HERO_SLIDES = [
  {
    title: ["Transform", "Waste into", "Capital"],
    desc: "We provide premium, transparent, and efficient metal recycling services for industrial, commercial, and construction businesses nationwide.",
    image: "https://images.unsplash.com/photo-1620317616140-106ebd05eb1b?q=80&w=2070&auto=format&fit=crop",
    primaryButton: { text: "Request Roll-Off", icon: Truck },
    secondaryButton: { text: "View Pricing", icon: ChevronRight }
  },
  {
    title: ["Global", "Market Direct", "Pricing"],
    desc: "Leverage our real-time market data and direct mill relationships to ensure you get the highest possible return for your scrap materials.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop", 
    primaryButton: { text: "Check Live Rates", icon: Zap },
    secondaryButton: { text: "Contact Trading", icon: Phone }
  },
  {
    title: ["Sustainable", "Industrial", "Excellence"],
    desc: "Committed to zero-waste initiatives and ISO 14001 environmental compliance for a greener, more sustainable industrial future.",
    image: "https://images.unsplash.com/photo-1473876637968-47eacfd48023?q=80&w=2070&auto=format&fit=crop",
    primaryButton: { text: "View Certifications", icon: ShieldCheck },
    secondaryButton: { text: "Learn More", icon: Factory }
  }
];

function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, currentIndex]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const slide = HERO_SLIDES[currentIndex];

  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.4 } }
  };

  return (
    <section 
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-[90vh] flex items-center bg-zinc-950"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-[0.65] transition-opacity duration-1000"
          key={slide.title[0]} // Causes subtle flash/re-render hack for video, actually let's not key the video to avoid restart.
        >
          <source src="/AALKC.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-zinc-950/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50"></div>
        
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mt-10 md:mt-12 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 15, transition: { duration: 0.3 } }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="max-w-3xl border-l-2 border-primary/40 pl-8 md:pl-12 py-4 relative backdrop-blur-sm bg-zinc-950/20 rounded-r-3xl"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-4 mb-6">
              <div className="flex bg-primary/20 p-1.5 rounded-sm">
                <Truck className="w-4 h-4 text-primary" />
              </div>
              <span className="text-primary font-semibold tracking-[0.3em] uppercase text-xs">AALKC Solutions</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn} 
              className="font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95] text-white mb-8 uppercase tracking-tight font-medium drop-shadow-2xl"
            >
              {slide.title[0]} <br />
              <span className="text-zinc-300 font-light italic">{slide.title[1]}</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">{slide.title[2]}</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-zinc-300/90 text-lg md:text-xl font-light max-w-lg mb-10 text-balance leading-relaxed h-[80px]">
              {slide.desc}
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <a href="#contact" className="bg-primary hover:bg-orange-500 text-white px-8 py-4 uppercase tracking-widest font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 rounded-sm">
                {slide.primaryButton.text} <slide.primaryButton.icon className="w-4 h-4" />
              </a>
              <a href="#services" className="bg-zinc-900/50 backdrop-blur-md hover:bg-zinc-800/80 border border-zinc-700/50 hover:border-zinc-500 text-white px-8 py-4 uppercase tracking-widest font-semibold text-sm transition-all flex items-center justify-center gap-3 group rounded-sm">
                {slide.secondaryButton.text} <slide.secondaryButton.icon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white px-8 py-4 uppercase tracking-widest font-semibold text-sm transition-all flex items-center justify-center gap-3 group rounded-sm bg-black/20 hover:bg-black/40 backdrop-blur-sm">
                Contact <Phone className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Global Slider Controls positioned independently so they don't animate out */}
        <div className="flex items-center gap-8 mt-16 md:mt-24 pl-8 md:pl-12">
          <div className="flex gap-2">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-white/10 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-white/10 dark:hover:bg-zinc-900 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-white/10 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-white/10 dark:hover:bg-zinc-900 transition-all"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="h-4 w-px bg-zinc-800"></div>

          <div className="flex gap-3">
            {HERO_SLIDES.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="relative h-2 w-16 bg-white/20 dark:bg-zinc-800 rounded-full overflow-hidden group"
              >
                {idx === currentIndex && (
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: isHovered ? 0 : 6, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-primary"
                  />
                )}
                {/* Hover preview indicator */}
                <div className={`absolute inset-0 bg-white/10 dark:bg-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity ${idx === currentIndex ? 'hidden' : ''}`} />
              </button>
            ))}
          </div>
          
          <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">
            0{currentIndex + 1} &mdash; 0{HERO_SLIDES.length}
          </span>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity hidden md:flex">
         <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">Scroll</span>
         <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent"></div>
      </div>
      
      {/* Decorative pulse element */}
      <div className="absolute bottom-12 right-12 z-10 hidden lg:block group">
        <div className="flex items-center gap-4 bg-zinc-950/60 backdrop-blur-md border border-white/10 px-6 py-4 rounded-sm transition-all group-hover:bg-zinc-900/80 group-hover:border-primary/30">
          <div className="text-right">
            <div className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">Operational Status</div>
            <div className="text-primary text-xs font-mono tracking-widest mt-1 uppercase font-semibold flex items-center gap-2 justify-end">
              <CheckCircle2 className="w-3 h-3" /> System Active
            </div>
          </div>
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-primary/20">
            <div className="w-2.5 h-2.5 bg-primary rounded-full animate-ping absolute opacity-80"></div>
            <div className="w-2.5 h-2.5 bg-primary rounded-full relative shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60] bg-primary hover:bg-orange-600 text-white p-3 md:p-4 rounded-sm shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all border border-orange-400/20 group flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5 md:w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function MaterialPageLoader() {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-2 border-zinc-800 border-t-primary rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-zinc-800"></div>
          <span className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold">Initialising Resource</span>
          <div className="h-px w-8 bg-zinc-800"></div>
        </div>
        <div className="h-[1px] w-32 bg-zinc-900 overflow-hidden relative">
          <motion.div 
            animate={{ x: [-128, 128] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const [marketTab, setMarketTab] = useState<'live' | 'history'>('history');
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || '#home');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [hiddenSeries, setHiddenSeries] = useState<Record<string, boolean>>({});
  const [serviceFilter, setServiceFilter] = useState('All');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);



  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    else if (formData.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
    
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Please enter a valid email address';
    
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^\+?[0-9\s-]{8,}$/.test(formData.phone)) errors.phone = 'Please enter a valid phone number';
    
    if (!formData.message.trim()) errors.message = 'Message is required';
    else if (formData.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[id]) {
      setFormErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const toggleSeries = (dataKey: string) => {
    setHiddenSeries(prev => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#home');
      if (window.location.hash.startsWith('#material-')) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);




  const renderLegalPage = () => {
    const isPrivacy = currentHash === '#privacy';
    const isTerms = currentHash === '#terms';
    
    if (!isPrivacy && !isTerms) return null;

    return (
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 min-h-screen">
        <a href="#" className="inline-flex items-center gap-2 text-primary hover:text-white uppercase tracking-widest text-xs font-semibold mb-8 transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to Home
        </a>
        <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tight text-white mb-6">
          {isPrivacy ? "Privacy Policy" : "Terms of Service"}
        </h1>
        <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 leading-relaxed">
          {isPrivacy ? (
            <div className="space-y-6">
               <p className="text-lg">At Amanat Al-Kalima Company (AALKC), we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or use our services.</p>
               <h3 className="text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-800 pb-2">Information Collection</h3>
               <p>We may collect personal information such as your name, email address, phone number, and company details when you utilize our "Request a Quote" form or contact us via email. We also collect anonymous usage data through cookies to analyze website traffic and improve our user experience.</p>
               <h3 className="text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-800 pb-2">Use of Information</h3>
               <p>The information we collect is used primarily to process your service requests, provide accurate pricing for materials, and communicate effectively with our industrial partners. We do not sell or share your personal data with third parties for marketing purposes.</p>
               <h3 className="text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-800 pb-2">Data Security</h3>
               <p>We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and access is restricted to authorized personnel who are required to keep the information confidential.</p>
               <h3 className="text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-800 pb-2">Contact Us</h3>
               <p>If you have any questions regarding this Privacy Policy, you may contact us at <a href="mailto:contact@aalkc.com" className="text-primary hover:underline">contact@aalkc.com</a>.</p>
            </div>
          ) : (
            <div className="space-y-6">
               <p className="text-lg">By accessing or using the services provided by Amanat Al-Kalima Company (AALKC), you agree to be bound by these Terms of Service and all applicable laws and regulations in the Kingdom of Saudi Arabia.</p>
               <h3 className="text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-800 pb-2">Service Terms</h3>
               <p>AALKC provides professional scrap metal recycling and trading services. All material weights are determined by our certified industrial scales, and we reserve the right to inspect all materials for quality and safety compliance before purchase.</p>
               <h3 className="text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-800 pb-2">Pricing & Quotes</h3>
               <p>Estimates provided through our website or via email are based on current market conditions and are subject to change until materials are physically inspected and weighed at our Dammam facility.</p>
               <h3 className="text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-800 pb-2">Compliance & Safety</h3>
               <p>Suppliers are responsible for ensuring that all scrap metal provided is free from hazardous materials, including but not limited to, explosive, radioactive, or pressurized containers. Suppliers must also confirm legal ownership of all materials sold to AALKC.</p>
               <h3 className="text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-800 pb-2">Governing Law</h3>
               <p>These terms are governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia, and any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of Saudi Arabia.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-300 transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/50 shadow-lg' : 'bg-transparent border-b border-transparent'}`}>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 md:h-24 flex items-center justify-between">
          
          {/* Logo Container */}
          <div className="flex items-center shrink-0 w-auto lg:w-[280px]">
            <a href="#" className={`flex items-center relative group py-2 outline-none transition-opacity duration-300 ${!isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <img 
                src="/src/assets/images/aalkkoo.png" 
                alt="AALKC Logo" 
                className="h-12 sm:h-14 md:h-16 lg:h-16 w-auto object-contain transition-all duration-500 relative z-10 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]" 
              />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-10 text-[13px] font-bold tracking-widest uppercase">
            <a href="#services" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300">Services</a>
            <a href="#why-us" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300">Why Us</a>
            <a href="#materials" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300">Materials</a>
            <a href="#faq" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300">FAQ</a>
            <a href="#contact" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300">Contact</a>
          </div>

          {/* CTA & Search */}
          <div className="hidden lg:flex items-center justify-end shrink-0 w-auto gap-4">
             <SearchBar />
             
             {/* Theme Toggle */}
             <button 
               onClick={toggleTheme}
               className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-primary active:scale-95"
               aria-label="Toggle theme"
             >
               {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>

             <button onClick={() => window.location.hash = '#contact'} className="bg-primary hover:bg-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] text-white px-6 py-2.5 rounded font-bold text-[13px] transition-all uppercase tracking-widest flex items-center gap-2 active:scale-95 group border border-primary hover:border-orange-500 whitespace-nowrap">
               Get Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
          
          {/* Mobile Menu Icon (Placeholder for layout balance) */}
          <div className="md:hidden flex items-center justify-end">
             <button className="text-zinc-400 hover:text-white p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
             </button>
          </div>
        </div>
      </nav>

      {currentHash.startsWith('#material-') && (
        <Suspense fallback={<MaterialPageLoader />}>
          <MaterialPage currentHash={currentHash} />
        </Suspense>
      )}
      {renderLegalPage()}

      {!currentHash.startsWith('#material-') && currentHash !== '#privacy' && currentHash !== '#terms' && (
        <>
          {/* Hero Section */}
          <HeroSlider />

      {/* Services Grid */}
      <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800 relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-wide text-zinc-900 dark:text-white mb-4">Core Services</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-xl">Comprehensive scrap management tailored to industrial scale operations.</p>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex bg-white dark:bg-zinc-950 p-1 border border-zinc-200 dark:border-zinc-800 rounded-sm shadow-sm">
               {['All', 'Collection', 'Processing', 'Trading'].map((cat) => (
                 <button 
                  key={cat}
                  onClick={() => setServiceFilter(cat)}
                  className={`px-4 py-2 text-[10px] sm:text-xs uppercase tracking-widest font-bold transition-all ${serviceFilter === cat ? 'bg-primary text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {ALL_SERVICES.filter(s => serviceFilter === 'All' || s.category === serviceFilter).map((service) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={service.title} 
                className="group p-8 border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 bg-white dark:bg-zinc-950 transition-colors relative overflow-hidden flex flex-col shadow-sm hover:shadow-md"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full translate-x-12 -translate-y-12 group-hover:bg-primary/10 transition-colors"></div>
                
                <service.icon className="w-10 h-10 text-zinc-300 dark:text-zinc-600 group-hover:text-primary transition-colors mb-6" />
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] text-primary font-mono uppercase tracking-widest border border-primary/20 px-2 py-0.5 rounded-full">{service.category}</span>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-500 leading-relaxed text-sm flex-1">{service.desc}</p>
                
                <div className="mt-8 h-px w-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-primary/30 transition-colors relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-primary transition-colors flex items-center justify-center">
                    <ChevronRight className="w-2 h-2 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Materials & Pricing */}
      <section id="materials" className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-primary"></div>
                <span className="text-primary font-semibold tracking-widest uppercase text-xs">What We Buy</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-wide text-zinc-900 dark:text-white mb-8">
                Ferrous & <br/><span className="text-zinc-400 dark:text-zinc-600">Non-Ferrous</span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed max-w-lg">
                We accept a wide variety of metals and alloys. Our state-of-the-art analyzing equipment ensures precise grading and honest pricing for every load.
              </p>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 font-mono text-sm uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                <a href="#material-copper" className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer group"><Zap className="w-4 h-4 text-[#f97316] group-hover:scale-125 transition-transform" /> Copper</a>
                <a href="#material-steel" className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer group"><Anvil className="w-4 h-4 text-[#a1a1aa] group-hover:scale-125 transition-transform" /> Heavy Melt Steel</a>
                <a href="#material-aluminum" className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer group"><Feather className="w-4 h-4 text-[#38bdf8] group-hover:scale-125 transition-transform" /> Aluminum</a>
                <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-500"></div> Rebar</div>
                <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-primary"></div> Brass</div>
                <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-500"></div> Cast Iron</div>
                <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-primary"></div> Stainless Steel</div>
                <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-500"></div> Plate & Structural</div>
              </div>
            </div>
            
            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 sm:p-8 pt-8 relative overflow-hidden flex flex-col h-full min-h-[400px] shadow-sm">
               {/* Abstract grid background */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
               
               <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 relative z-10">
                 <h3 className="font-display text-2xl uppercase tracking-widest text-zinc-900 dark:text-white m-0">
                   Market Trends
                 </h3>
                 <div className="flex bg-zinc-100 dark:bg-zinc-950 p-1 rounded border border-zinc-200 dark:border-zinc-800">
                   <button 
                     onClick={() => setMarketTab('live')}
                     className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded-sm ${marketTab === 'live' ? 'bg-primary text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                   >
                     Live
                   </button>
                   <button 
                     onClick={() => setMarketTab('history')}
                     className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded-sm ${marketTab === 'history' ? 'bg-primary text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                   >
                     History
                   </button>
                 </div>
               </div>
               
               <div className="flex-1 relative z-10">
                 {marketTab === 'live' ? (
                   <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }} 
                     exit={{ opacity: 0 }} 
                     className="space-y-4"
                   >
                     {[
                       { name: "Copper #1 Bare Bright", trend: "+2.4%", up: true, link: "#material-copper" },
                       { name: "Aluminum Extrusion", trend: "+0.8%", up: true, link: "#material-aluminum" },
                       { name: "Stainless 304", trend: "-1.2%", up: false },
                       { name: "Heavy Melt Steel", trend: "Steady", up: null, link: "#material-steel" }
                     ].map((item, idx) => {
                       const Wrapper = item.link ? 'a' : 'div';
                       return (
                         <Wrapper 
                           key={idx} 
                           href={item.link}
                           className={`flex justify-between items-center py-4 border-b border-zinc-800/80 ${item.link ? 'hover:bg-zinc-800/50 -mx-4 px-4 cursor-pointer transition-colors group' : ''}`}
                         >
                           <span className={`font-mono text-sm uppercase text-zinc-300 ${item.link ? 'group-hover:text-primary transition-colors' : ''}`}>{item.name}</span>
                           <span className={`text-sm font-semibold tracking-wider ${item.up === true ? 'text-green-500' : item.up === false ? 'text-red-500' : 'text-zinc-500'}`}>
                             {item.trend}
                           </span>
                         </Wrapper>
                       );
                     })}
                     <div className="mt-8 text-xs text-zinc-600 font-mono tracking-widest">
                       UPDATED: TODAY 08:00 AM EST. CONTACT FOR SPOT PRICING.
                     </div>
                   </motion.div>
                 ) : (
                   <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }} 
                     exit={{ opacity: 0 }} 
                     className="h-[280px] w-full"
                   >
                     <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={mockChartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                         <defs>
                           <linearGradient id="colorCopper" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                           </linearGradient>
                           <linearGradient id="colorSteel" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#a1a1aa" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#a1a1aa" stopOpacity={0}/>
                           </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                         <XAxis dataKey="month" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                         <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                         <Tooltip content={<CustomTooltip />} />
                         <Legend 
                           payload={[
                             { value: 'Copper', type: 'rect', color: '#f97316', dataKey: 'copper' },
                             { value: 'Steel', type: 'rect', color: '#a1a1aa', dataKey: 'steel' }
                           ]}
                           content={(props: any) => {
                             const { payload } = props;
                             return (
                               <div className="flex justify-center gap-8 mt-4 pt-4 border-t border-zinc-800/50">
                                 {payload?.map((entry: any, index: number) => {
                                   const isHidden = hiddenSeries[entry.dataKey];
                                   return (
                                     <button 
                                       key={`item-${index}`} 
                                       onClick={() => toggleSeries(entry.dataKey)}
                                       className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${isHidden ? 'opacity-40 grayscale' : 'opacity-100 hover:opacity-80'}`}
                                     >
                                       <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }}></div>
                                       <span className="text-zinc-300">{entry.value}</span>
                                     </button>
                                   )
                                 })}
                               </div>
                             );
                           }}
                         />
                         {!hiddenSeries.copper && <Area type="monotone" dataKey="copper" name="Copper" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorCopper)" />}
                         {!hiddenSeries.steel && <Area type="monotone" dataKey="steel" name="Steel" stroke="#a1a1aa" strokeWidth={2} fillOpacity={1} fill="url(#colorSteel)" />}
                       </AreaChart>
                     </ResponsiveContainer>
                     <div className="mt-4 text-xs text-zinc-600 font-mono tracking-widest text-center">
                       12-MONTH HISTORICAL PRICE TRENDS ($/LB)
                     </div>
                   </motion.div>
                 )}
               </div>
            </div>
          </div>
          <MaterialsGuide />
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-24 bg-primary text-zinc-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-wide mb-8">
              Built on <br/>Integrity
            </h2>
            <p className="mb-8 leading-relaxed max-w-lg font-medium text-zinc-900/80">
              For over three decades, we have partnered with leading manufacturers, fabricators, and demolition contractors. Our reputation is our most valuable asset.
            </p>
            <ul className="space-y-6">
              {[
                "Certified, transparent weighting processes on every load.",
                "Fast, reliable payment terms tailored to your business needs.",
                "Full environmental compliance and sustainability reporting.",
                "Dedicated account managers for high-volume producers."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4 font-medium uppercase tracking-wide text-xs sm:text-sm text-zinc-900">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-zinc-950" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900 dark:bg-zinc-950 text-white p-8 border border-black/20 text-center flex flex-col justify-center items-center h-48 sm:h-56 shadow-lg">
               <div className="font-display text-5xl sm:text-6xl text-primary mb-2"><AnimatedNumber to={30} suffix="+" /></div>
               <div className="text-xs uppercase tracking-widest text-zinc-400">Years in Business</div>
            </div>
            <div className="bg-white text-zinc-950 p-8 border border-zinc-200 dark:border-black/20 text-center flex flex-col justify-center items-center h-48 sm:h-56 mt-[-20px] shadow-xl">
               <div className="font-display text-5xl sm:text-6xl mb-2 text-zinc-900"><AnimatedNumber to={500} suffix="+" /></div>
               <div className="text-xs uppercase tracking-widest text-zinc-500">Active Clients</div>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white p-8 border border-zinc-200 dark:border-black/20 text-center flex flex-col justify-center items-center h-48 sm:h-56 shadow-xl relative overflow-hidden">
               {/* Diagonal strip background effect */}
               <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.02)_10px,rgba(0,0,0,0.02)_20px)] dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)]"></div>
               <div className="relative z-10 font-display text-4xl sm:text-5xl uppercase tracking-widest text-zinc-900 dark:text-white"><AnimatedNumber to={5} suffix="M+" /></div>
               <div className="relative z-10 text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mt-2">Tons Processed</div>
            </div>
            <div className="bg-zinc-900 dark:bg-zinc-950 text-white p-8 border border-black/20 text-center flex flex-col justify-center items-center h-48 sm:h-56 mt-[-20px] shadow-lg">
               <div className="font-display text-5xl sm:text-6xl text-primary mb-2"><AnimatedNumber to={24} suffix="h" /></div>
               <div className="text-xs uppercase tracking-widest text-zinc-400">Container Swap<br/>Time Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Article Section */}
      <section id="about" className="py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-primary"></div>
              <span className="text-primary font-semibold tracking-widest uppercase text-xs">Company Profile</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-zinc-900 dark:text-white mb-6">
              About Amanat <br/><span className="text-zinc-400 dark:text-zinc-600">Al-Kalima Company</span>
            </h2>
            <div className="prose dark:prose-invert prose-zinc max-w-none text-zinc-600 dark:text-zinc-400">
              <p className="text-lg leading-relaxed mb-6">
                Established in 2017, AMANAT AL-KALIMA COMPANY (ﺷﺮﻛﺔ أﻣﺎﻧﺔ اﻟﻜﻠﻤﺔ) is a premier licensed scrap metal dealer based in Dammam, Eastern Province, Kingdom Of Saudi Arabia. We specialize in providing comprehensive and professional metal recycling services tailored to industrial, commercial, and construction businesses. 
              </p>
              <p className="text-lg leading-relaxed mb-12">
                Our commitment to integrity, efficiency, and environmental sustainability has made us a trusted partner in the region's expanding industrial sector. We manage the complete lifecycle of scrap metal trading—from reliable site collection to meticulous sorting and processing.
              </p>

              {/* Facility Tour / Overview Video */}
              <div className="relative w-full aspect-video mb-12 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 group overflow-hidden rounded-sm flex flex-col justify-center items-center shadow-md transition-colors duration-300">
                {!isVideoPlaying ? (
                  <>
                    <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 m-2 pointer-events-none z-10 flex flex-col justify-center items-center">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.1),transparent_50%)] pointer-events-none"></div>
                      <button onClick={() => setIsVideoPlaying(true)} className="w-20 h-20 bg-primary/90 hover:bg-orange-500 rounded-full flex items-center justify-center text-white z-20 pointer-events-auto transition-all duration-300 hover:scale-110 shadow-[0_0_30px_rgba(249,115,22,0.4)] backdrop-blur-sm border border-orange-400 active:scale-95">
                        <Play className="w-8 h-8 ml-1 fill-white" />
                      </button>
                      <p className="mt-6 text-zinc-500 dark:text-zinc-400 text-sm tracking-widest uppercase font-semibold relative z-20">Watch Facility Tour</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1536617621572-1d5f1e62675b?q=80&w=2070&auto=format&fit=crop" alt="Facility Tour Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500 contrast-125 saturate-50 mix-blend-luminosity" />
                  </>
                ) : (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1" 
                    title="AALKC Facility Tour" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="z-20 border border-zinc-200 dark:border-zinc-800 m-2 w-[calc(100%-16px)] h-[calc(100%-16px)]"
                  ></iframe>
                )}
              </div>

              <h3 className="text-2xl font-display uppercase tracking-wide text-zinc-900 dark:text-white mb-6 mt-12 border-b border-zinc-200 dark:border-zinc-800 pb-4">Our Services Include</h3>
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {[
                  "Scrap Metal Buying and Selling",
                  "Ferrous and Non-Ferrous Scrap Trading",
                  "Industrial Scrap Collection and Sorting",
                  "Large-Scale Recycling Support",
                  "Purchasing of Copper, Aluminum, and Steel",
                  "Purchasing of Iron, Brass, and Stainless Steel"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 border border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-950 rounded-sm shadow-sm transition-colors duration-300">
                    <div className="w-2 h-2 mt-2 shrink-0 bg-primary rounded-full"></div>
                    <span className="text-zinc-700 dark:text-zinc-300 tracking-wide font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-display uppercase tracking-wide text-zinc-900 dark:text-white mb-6 mt-12 border-b border-zinc-200 dark:border-zinc-800 pb-4">Why Choose Amanat Al-Kalima Company</h3>
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {[
                  { title: "Licensed & Compliant", desc: "Fully licensed dealer adhering to environmental regulations and best practices." },
                  { title: "Competitive Pricing", desc: "Honest, market-indexed pricing to ensure maximum value for your materials." },
                  { title: "Reliable Logistics", desc: "Prompt collection services and logistics spanning the entire Eastern Province." },
                  { title: "Established 2017", desc: "Years of proven track record serving top-tier industrial partners in Saudi Arabia." }
                ].map((item, i) => (
                  <div key={i} className="p-5 border-l-2 border-zinc-200 dark:border-zinc-800 hover:border-primary bg-white dark:bg-zinc-950/50 transition-colors shadow-sm">
                    <h4 className="text-zinc-900 dark:text-white font-semibold mb-2 uppercase tracking-wide text-sm">{item.title}</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Official Contact Card */}
            <div className="mt-16 p-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center relative overflow-hidden shadow-md transition-colors duration-300">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none"></div>
               <div className="relative z-10 max-w-lg">
                 <h4 className="text-primary text-xs font-bold tracking-widest uppercase mb-4">Official Contact Details</h4>
                 <h3 className="text-zinc-900 dark:text-white text-xl md:text-2xl font-bold tracking-wider mb-1">AMANAT AL-KALIMA COMPANY</h3>
                 <p className="text-zinc-400 dark:text-zinc-500 font-sans tracking-wide mb-6 text-lg" dir="rtl">ﺷﺮﻛﺔ أﻣﺎﻧﺔ اﻟﻜﻠﻤﺔ</p>
                 <address className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base not-italic leading-relaxed flex flex-col gap-3">
                   <span>3508 Al Qatif 1, Unit 7260, Dammam 32517, Eastern Province, Kingdom Of Saudi Arabia</span>
                   <span className="font-sans text-zinc-400 dark:text-zinc-500" dir="rtl">اﻟﻘﻄﻴﻒ ٣٥٠٨ ١، وﺣﺪة ٧٢٦٠ ، اﻟﺪﻣﺎم ٣٢٥١٧ ، اﻟﻤﻨﻄﻘﺔ اﻟﺸﺮﻗﻴﺔ، اﻟﻤﻤﻠﻜﺔ اﻟﻌﺮﺑﻴﺔ اﻟﺴﻌﻮدﻳﺔ</span>
                 </address>
               </div>
               <div className="relative z-10 flex flex-col gap-4 text-sm md:text-base lg:text-right w-full lg:w-auto mt-2 lg:mt-0 border-t lg:border-t-0 border-zinc-100 dark:border-zinc-800 pt-6 lg:pt-0">
                 <a href="tel:+966551811700" className="flex items-center lg:justify-end gap-4 text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-white transition-colors group">
                    <span className="lg:order-2 bg-zinc-100 dark:bg-zinc-900 p-2.5 rounded group-hover:bg-primary transition-colors group-hover:text-white"><Phone className="w-5 h-5" /></span>
                    <span className="lg:order-1 font-semibold tracking-widest text-zinc-900 dark:text-zinc-300">+966 55 181 1700</span>
                 </a>
                 <a href="mailto:contact@aalkc.com" className="flex items-center lg:justify-end gap-4 text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-white transition-colors group">
                    <span className="lg:order-2 bg-zinc-100 dark:bg-zinc-900 p-2.5 rounded group-hover:bg-primary transition-colors group-hover:text-white"><Mail className="w-5 h-5" /></span>
                    <span className="lg:order-1 tracking-wider font-medium text-zinc-900 dark:text-zinc-300">contact@aalkc.com</span>
                 </a>
                 <a href="https://www.aalkc.com" target="_blank" rel="noopener noreferrer" className="flex items-center lg:justify-end gap-4 text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-white transition-colors group">
                    <span className="lg:order-2 bg-zinc-100 dark:bg-zinc-900 p-2.5 rounded group-hover:bg-primary transition-colors group-hover:text-white"><MapPin className="w-5 h-5" /></span>
                    <span className="lg:order-1 tracking-wider font-medium text-zinc-900 dark:text-zinc-300">www.aalkc.com</span>
                 </a>
               </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA / Contact Center */}
      <section id="contact" className="py-32 relative text-center bg-white dark:bg-zinc-950 transition-colors duration-300">
         <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full bg-zinc-50 dark:bg-zinc-900/50 shadow-sm transition-colors duration-300">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-medium">Currently Buying</span>
            </div>
            
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight text-zinc-900 dark:text-white mb-10">
              Start Maximizing <br/><span className="text-zinc-400 dark:text-zinc-600">Your Scrap Value</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
               <a href="tel:+966551811700" className="bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-8 py-4 uppercase tracking-widest font-bold text-sm transition-colors flex items-center justify-center gap-3 shadow-md">
                 <Phone className="w-5 h-5" /> Call Now: +966 55 181 1700
               </a>
               <a href="mailto:contact@aalkc.com" className="bg-primary hover:bg-orange-600 text-white px-8 py-4 uppercase tracking-widest font-bold text-sm transition-colors flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                 <Mail className="w-5 h-5" /> contact@aalkc.com
               </a>
            </div>

            <div className="mt-20 w-full h-[400px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden relative group shadow-inner transition-colors duration-300">
               <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:bg-primary/0 transition-colors z-10"></div>
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114399.23126756627!2d49.9576435!3d26.360155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49fb02029c0a6b%3A0xe67de76652df6e5b!2sDammam%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1714850000000!5m2!1sen!2ssa" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, filter: theme === 'dark' ? 'grayscale(1) invert(0.9) contrast(1.2) brightness(0.8)' : 'grayscale(0.5)' }} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="opacity-60 group-hover:opacity-100 transition-opacity duration-700"
               ></iframe>
               <div className="absolute bottom-6 left-6 z-20 bg-white dark:bg-zinc-950/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-4 shadow-2xl max-w-xs text-left transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-sm">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-zinc-900 dark:text-white font-bold uppercase tracking-widest text-xs mb-2">Visit Our Yard</h4>
                      <p className="text-zinc-500 dark:text-zinc-400 text-[10px] leading-relaxed uppercase tracking-wider">
                        3508 Al Qatif 1, Unit 7260, Dammam 32517, Eastern Province, KSA
                      </p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 text-center border-t border-zinc-100 dark:border-zinc-800 pt-16 transition-colors duration-300">
               <div>
                  <div className="w-12 h-12 mx-auto mb-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:border-primary/50 transition-colors shadow-sm">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold uppercase tracking-widest text-sm text-zinc-900 dark:text-white mb-2">Headquarters</h4>
                  <p className="text-zinc-500 dark:text-zinc-500 text-xs sm:text-sm leading-relaxed mb-3">
                    3508 Al Qatif 1, Unit 7260<br/>Dammam 32517, Eastern Province<br/>Kingdom Of Saudi Arabia
                  </p>
                  <p className="text-zinc-400 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans" dir="rtl">
                    اﻟﻘﻄﻴﻒ ٣٥٠٨ ١، وﺣﺪة ٧٢٦٠<br/>اﻟﺪﻣﺎم ٣٢٥١٧ ، اﻟﻤﻨﻄﻘﺔ اﻟﺸﺮﻗﻴﺔ<br/>اﻟﻤﻤﻠﻜﺔ اﻟﻌﺮﺑﻴﺔ اﻟﺴﻌﻮدﻳﺔ
                  </p>
               </div>
               <div className="flex flex-col items-center justify-start">
                  <Phone className="w-6 h-6 mx-auto mb-4 text-zinc-300 dark:text-zinc-600" />
                  <h4 className="font-semibold uppercase tracking-widest text-sm text-zinc-900 dark:text-white mb-2">Contact Us</h4>
                  <p className="text-zinc-500 dark:text-zinc-500 text-sm flex flex-col gap-2">
                    <a href="tel:+966551811700" className="hover:text-primary transition-colors">+966 55 181 1700</a>
                    <a href="mailto:contact@aalkc.com" className="hover:text-primary transition-colors">contact@aalkc.com</a>
                    <a href="https://www.aalkc.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">www.aalkc.com</a>
                  </p>
               </div>
               <div>
                  <Truck className="w-6 h-6 mx-auto mb-4 text-zinc-300 dark:text-zinc-600" />
                  <h4 className="font-semibold uppercase tracking-widest text-sm text-zinc-900 dark:text-white mb-2">Operations</h4>
                  <p className="text-zinc-500 dark:text-zinc-500 text-sm leading-relaxed">
                    Premium metal scrap<br/>dealership and industrial<br/>dismantling services.
                  </p>
               </div>
            </div>

            {/* Request a Quote Form */}
            <div className="mt-20 max-w-2xl mx-auto border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-8 text-left relative overflow-hidden shadow-xl transition-colors duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] pointer-events-none"></div>
              <h3 className="font-display text-2xl uppercase tracking-widest text-zinc-900 dark:text-white mb-2">Request a Quote</h3>
              <p className="text-zinc-500 dark:text-zinc-500 mb-8 text-sm">Fill out the form below and our team will get back to you with competitive pricing for your materials.</p>
              
              <form 
                className="space-y-5 relative z-10" 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!validateForm()) return;
                  setFormStatus('submitting');
                  setFormMessage('');
                  // Simulate network request
                  setTimeout(() => {
                    setFormStatus('success');
                    setFormMessage('Thank you for your request. Our team will contact you shortly.');
                    setFormData({ name: '', company: '', email: '', phone: '', message: '' });
                  }, 1500);
                }}
              >
                {formStatus === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-sm flex items-start gap-4 mb-6">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">{formMessage}</p>
                  </div>
                )}
                {formStatus === 'success' && (
                  <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-4 rounded-sm flex items-start gap-4 mb-6">
                    <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">{formMessage}</p>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block">Name *</label>
                    <input value={formData.name} onChange={handleInputChange} type="text" id="name" className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-zinc-200 dark:border-zinc-800 focus:border-primary focus:ring-primary shadow-sm'} rounded-sm px-4 py-3 text-sm text-zinc-900 dark:text-zinc-300 focus:outline-none focus:ring-1 transition-all`} placeholder="Enter your name" />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block">Company Name</label>
                    <input value={formData.company} onChange={handleInputChange} type="text" id="company" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm px-4 py-3 text-sm text-zinc-900 dark:text-zinc-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm" placeholder="Enter your company" />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block">Email *</label>
                    <input value={formData.email} onChange={handleInputChange} type="email" id="email" className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-zinc-200 dark:border-zinc-800 focus:border-primary focus:ring-primary shadow-sm'} rounded-sm px-4 py-3 text-sm text-zinc-900 dark:text-zinc-300 focus:outline-none focus:ring-1 transition-all`} placeholder="your@email.com" />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block">Phone Number *</label>
                    <input value={formData.phone} onChange={handleInputChange} type="tel" id="phone" className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${formErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-zinc-200 dark:border-zinc-800 focus:border-primary focus:ring-primary shadow-sm'} rounded-sm px-4 py-3 text-sm text-zinc-900 dark:text-zinc-300 focus:outline-none focus:ring-1 transition-all`} placeholder="+966 5X XXX XXXX" />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block">Message *</label>
                  <textarea value={formData.message} onChange={handleInputChange} id="message" rows={4} className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${formErrors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-zinc-200 dark:border-zinc-800 focus:border-primary focus:ring-primary shadow-sm'} rounded-sm px-4 py-3 text-sm text-zinc-900 dark:text-zinc-300 focus:outline-none focus:ring-1 transition-all resize-none`} placeholder="Please describe the materials, estimated quantity, and your location..."></textarea>
                  {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
                </div>
                
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-primary hover:bg-orange-600 disabled:opacity-70 disabled:hover:bg-primary text-white font-bold tracking-widest text-sm uppercase py-4 rounded-sm transition-colors mt-2 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-primary flex items-center justify-center gap-2"
                >
                  {formStatus === 'submitting' ? (
                    <><Loader2 className="w-4 h-4 animate-spin text-white" /> Submitting</>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </form>
            </div>
         </div>
      </section>
      </>
      )}

      {/* Footer */}
      <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 py-12 text-center text-zinc-500 dark:text-zinc-600 text-sm uppercase tracking-widest font-medium transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
           <div className="flex flex-col items-center md:items-start gap-4">
             <div className="flex items-center gap-2 text-zinc-900 dark:text-white opacity-80 hover:opacity-100 transition-opacity">
               <img src="/src/assets/images/regenerated_image_1778927709543.jpg" alt="AALKC" className="h-10 md:h-12 w-auto object-contain transition-all duration-300" />
             </div>
             <div className="text-left leading-relaxed">
               <div className="text-zinc-700 dark:text-zinc-300 text-xs tracking-widest">AMANAT AL-KALIMA COMPANY</div>
               <div className="text-zinc-500 dark:text-zinc-500 text-xs tracking-wider mt-1 font-sans" dir="rtl">ﺷﺮﻛﺔ أﻣﺎﻧﺔ اﻟﻜﻠﻤﺔ</div>
             </div>
           </div>
           <div className="flex flex-col items-center gap-3">
             <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs text-zinc-400">
               <a href="tel:+966551811700" className="hover:text-primary transition-colors flex items-center gap-2 whitespace-nowrap"><Phone className="w-3 h-3" /> +966 55 181 1700</a>
               <span className="hidden sm:inline text-zinc-800">|</span>
               <a href="mailto:contact@aalkc.com" className="hover:text-primary transition-colors flex items-center gap-2"><Mail className="w-3 h-3" /> contact@aalkc.com</a>
               <span className="hidden sm:inline text-zinc-800">|</span>
               <a href="https://www.aalkc.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:underline">www.aalkc.com</a>
             </div>
             <div className="mt-2 text-xs text-zinc-600">&copy; {new Date().getFullYear()} Amanat Al-Kalima Company (AALKC). All Rights Reserved.</div>
           </div>
           <div className="flex flex-col gap-4 items-center md:items-end">
             <div className="flex gap-4 text-xs font-semibold text-zinc-500">
               <a href="#about" className="hover:text-primary transition-colors">About Company</a>
               <span className="text-zinc-800">|</span>
               <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
               <span className="text-zinc-800">|</span>
               <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
             </div>
             <div className="flex gap-4 text-zinc-500">
               <a href="#" className="hover:text-primary transition-colors hover:-translate-y-1 transform duration-300">
                 <Linkedin className="w-5 h-5" />
                 <span className="sr-only">LinkedIn</span>
               </a>
               <a href="#" className="hover:text-primary transition-colors hover:-translate-y-1 transform duration-300">
                 <Twitter className="w-5 h-5" />
                 <span className="sr-only">Twitter</span>
               </a>
               <a href="#" className="hover:text-primary transition-colors hover:-translate-y-1 transform duration-300">
                 <Facebook className="w-5 h-5" />
                 <span className="sr-only">Facebook</span>
               </a>
             </div>
           </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
}

