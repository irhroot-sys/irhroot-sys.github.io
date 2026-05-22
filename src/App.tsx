import { motion, animate, useInView, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, ChevronRight, ChevronUp, Recycle, Truck, Factory, ShieldCheck, Phone, Mail, MapPin, Search, X, Play, AlertCircle, Loader2, Plus, Minus, ImageOff, Linkedin, Twitter, Facebook, Zap, Anvil, Feather, CheckCircle2, XCircle, Sun, Moon, Layers, Sparkles, Menu } from 'lucide-react';
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const MaterialPage = lazy(() => import('./components/MaterialPage'));

import logoImg from './assets/images/aalkkoo.png';
import footerLogoImg from './assets/images/regenerated_image_1778927709543.jpg';

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
      <div className="bg-zinc-950/85 backdrop-blur-md border border-zinc-800/80 p-4 rounded shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-l-2 border-l-primary">
        <p className="text-zinc-400 text-[10px] font-mono mb-3 uppercase tracking-widest border-b border-zinc-800/50 pb-2 flex justify-between items-center gap-4">
          <span>PERIOD</span> <span className="text-zinc-200 font-bold">{label}</span>
        </p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-zinc-400">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="uppercase">{entry.name}</span>
              </div>
              <span className="text-white font-bold tracking-wider">${entry.value.toFixed(2)}/LB</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const TICKER_ITEMS = [
  { 
    name: 'LME Copper', 
    value: '$8,945.50', 
    change: '+1.4%', 
    up: true,
    symbol: 'LME-Cu',
    contract: '3M Seller',
    low: '$8,850.00',
    high: '$9,010.00',
    sparkline: 'M 0 25 Q 15 10, 30 22 T 60 12 T 90 5 T 100 8'
  },
  { 
    name: 'LME Aluminum', 
    value: '$2,240.00', 
    change: '-0.3%', 
    up: false,
    symbol: 'LME-Al',
    contract: '3M Seller',
    low: '$2,230.00',
    high: '$2,260.00',
    sparkline: 'M 0 10 Q 15 18, 30 12 T 60 22 T 90 18 T 100 24'
  },
  { 
    name: 'LME Nickel', 
    value: '$17,215.00', 
    change: '+2.1%', 
    up: true,
    symbol: 'LME-Ni',
    contract: '3M Seller',
    low: '$16,980.00',
    high: '$17,350.00',
    sparkline: 'M 0 25 Q 15 15, 30 8 T 60 12 T 90 4 T 100 5'
  },
  { 
    name: 'LME Steel Scrap', 
    value: '$382.50', 
    change: '+0.8%', 
    up: true,
    symbol: 'LME-Steel',
    contract: 'FOB Bosphorus',
    low: '$378.00',
    high: '$385.00',
    sparkline: 'M 0 18 Q 15 14, 30 16 T 60 10 T 90 8 T 100 6'
  },
  { 
    name: 'LME Zinc', 
    value: '$2,610.50', 
    change: '-0.9%', 
    up: false,
    symbol: 'LME-Zn',
    contract: '3M Seller',
    low: '$2,590.00',
    high: '$2,640.00',
    sparkline: 'M 0 8 Q 15 14, 30 20 T 60 16 T 90 22 T 100 26'
  },
  { 
    name: 'LME Lead', 
    value: '$2,085.00', 
    change: '+0.5%', 
    up: true,
    symbol: 'LME-Pb',
    contract: '3M Seller',
    low: '$2,070.00',
    high: '$2,100.00',
    sparkline: 'M 0 20 Q 15 18, 30 15 T 60 10 T 90 12 T 100 8'
  },
];

const CALCULATOR_METALS = [
  { id: 'copper', name: 'Copper #1 Millberry', usdPricePerTon: 8900 },
  { id: 'steel', name: 'Steel HMS 1&2', usdPricePerTon: 380 },
  { id: 'aluminum', name: 'Aluminum 6063', usdPricePerTon: 2200 },
  { id: 'brass', name: 'Honey Brass', usdPricePerTon: 4500 },
  { id: 'stainless', name: 'Stainless Steel 304', usdPricePerTon: 1800 },
];

function TiltCard({ children, className = "", ...props }: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Tilt calculation - max 8 degrees for premium visual subtlety
    const tiltX = ((y / rect.height) - 0.5) * -10;
    const tiltY = ((x / rect.width) - 0.5) * 10;
    
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    
    setTilt({ x: tiltX, y: tiltY });
    setShine({ x: shineX, y: shineY, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setShine(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 preserve-3d transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.015, 1.015, 1.015)`,
      }}
      {...props}
    >
      {/* Glare Shine Overlay */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 rounded-sm overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
          opacity: shine.opacity,
        }}
      />
      {children}
    </div>
  );
}

function PrecisionCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hoveredEl, setHoveredEl] = useState<{ type: string; label?: string } | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const isTouch = !window.matchMedia('(pointer: fine)').matches;
    setIsMobile(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, select, input, [role="button"], .tech-card, [data-cursor-label]');
      if (interactive) {
        let label = interactive.getAttribute('data-cursor-label') || '';
        if (!label) {
          const header = interactive.querySelector('h3');
          if (header) label = header.textContent || '';
        }
        setHoveredEl({ 
          type: interactive.tagName.toLowerCase(), 
          label: label ? label.slice(0, 20).toUpperCase() : ''
        });
      } else {
        setHoveredEl(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let frameId: number;
    const animateTrail = () => {
      setTrail(prev => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        };
      });
      frameId = requestAnimationFrame(animateTrail);
    };
    frameId = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(frameId);
  }, [position, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Rotating Reticle Ring */}
      <div 
        className="fixed pointer-events-none z-[9999] transition-transform duration-200 ease-out select-none"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          transform: `translate(-50%, -50%) scale(${hoveredEl ? 1.35 : 1})`,
        }}
      >
        <div className={`w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center relative animate-reticle-spin`}>
          <div className="absolute top-0 w-[1.5px] h-1.5 bg-primary/75"></div>
          <div className="absolute bottom-0 w-[1.5px] h-1.5 bg-primary/75"></div>
          <div className="absolute left-0 h-[1.5px] w-1.5 bg-primary/75"></div>
          <div className="absolute right-0 h-[1.5px] w-1.5 bg-primary/75"></div>
        </div>
      </div>
      
      {/* Inner Dot and HUD Display */}
      <div 
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full bg-primary/90 flex items-center justify-center select-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {hoveredEl?.label && (
          <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-zinc-950/95 dark:bg-black/95 text-[9px] font-mono tracking-widest text-primary border border-primary/45 px-2.5 py-1 whitespace-nowrap rounded-sm shadow-[0_4px_12px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-left-2 duration-200">
            <span className="opacity-50 mr-1.5">&gt;&gt;</span>{hoveredEl.label}
          </div>
        )}
      </div>
    </>
  );
}

function CardCrosshairs({ refLabel = "REF: SEC-A / KSA", lotLabel = "LOT-ID: 2026/AAL" }: { refLabel?: string; lotLabel?: string }) {
  return (
    <>
      {/* Tech Blueprint Corners */}
      <div className="tech-corner tech-corner-tl text-primary/30 pointer-events-none"></div>
      <div className="tech-corner tech-corner-tr text-primary/30 pointer-events-none"></div>
      <div className="tech-corner tech-corner-bl text-primary/30 pointer-events-none"></div>
      <div className="tech-corner tech-corner-br text-primary/30 pointer-events-none"></div>
      
      {/* Technical crosshairs at corners */}
      <div className="tech-crosshair absolute top-2 left-2 text-primary/35 pointer-events-none w-3 h-3"></div>
      <div className="tech-crosshair absolute top-2 right-2 text-primary/35 pointer-events-none w-3 h-3"></div>
      <div className="tech-crosshair absolute bottom-2 left-2 text-primary/35 pointer-events-none w-3 h-3"></div>
      <div className="tech-crosshair absolute bottom-2 right-2 text-primary/35 pointer-events-none w-3 h-3"></div>

      {/* Coordinate reference texts */}
      <div className="absolute top-2.5 left-4 font-mono text-[8px] tracking-widest text-zinc-500/40 select-none pointer-events-none">{refLabel}</div>
      <div className="absolute bottom-2.5 right-4 font-mono text-[8px] tracking-widest text-zinc-550/40 select-none pointer-events-none">{lotLabel}</div>
    </>
  );
}

function AnimatedNumber({ to, suffix = "", formatter }: { to: number; suffix?: string; formatter?: (val: number) => string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevToRef = useRef(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(prevToRef.current, to, {
        duration: 0.8,
        ease: "easeOut",
        onUpdate: (value) => {
          setDisplayValue(value);
        }
      });
      prevToRef.current = to;
      return () => controls.stop();
    }
  }, [isInView, to]);

  return (
    <span ref={ref}>
      {formatter ? formatter(displayValue) : `${Math.round(displayValue)}${suffix}`}
    </span>
  );
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

const MATERIALS_LIST = [
  { name: 'Copper', href: '#material-copper', icon: Zap, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', isLink: true, spec: "Grade #1 Millberry", purity: "≥ 99.9%", industry: "Electrical & Power" },
  { name: 'Heavy Melt Steel', href: '#material-steel', icon: Anvil, color: 'text-zinc-400', bg: 'bg-zinc-400/10', border: 'border-zinc-400/20', isLink: true, spec: "HMS 1 & 2 (80:20)", purity: "Industrial Grade", industry: "Infrastructure & Casting" },
  { name: 'Aluminum', href: '#material-aluminum', icon: Feather, color: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/20', isLink: true, spec: "6061 / 6063 Alloys", purity: "≥ 99.5%", industry: "Aerospace & Automotive" },
  { name: 'Rebar', href: '#materials', icon: Layers, color: 'text-zinc-500', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20', isLink: false, spec: "Deformed Steel Bars", purity: "Grade 60/75", industry: "Structural Concrete" },
  { name: 'Brass', href: '#materials', icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', isLink: false, spec: "Honey Brass & Shells", purity: "Cu-Zn Alloy", industry: "Marine & Plumbing" },
  { name: 'Cast Iron', href: '#materials', icon: Anvil, color: 'text-stone-400', bg: 'bg-stone-400/10', border: 'border-stone-400/20', isLink: false, spec: "Grey & Ductile Iron", purity: "High Carbon", industry: "Automotive & Pipes" },
  { name: 'Stainless Steel', href: '#materials', icon: ShieldCheck, color: 'text-zinc-300', bg: 'bg-zinc-300/10', border: 'border-zinc-300/20', isLink: false, spec: "304 & 316 Grades", purity: "18/8 Cr-Ni", industry: "Food & Chemical" },
  { name: 'Plate & Structural', href: '#materials', icon: Factory, color: 'text-slate-400', bg: 'bg-slate-400/10', border: 'border-slate-400/20', isLink: false, spec: "A36 & Equivalent", purity: "Carbon Steel", industry: "Bridges & Building" },
];


const highlightMatch = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() 
          ? <span key={i} className="text-orange-700 dark:text-primary font-bold">{part}</span> 
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
          name="search"
          autoComplete="off"
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
            aria-label="Clear search query"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
      
      {isFocused && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm shadow-xl p-1 max-h-64 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-400 font-bold px-3 py-2 border-b border-zinc-100 dark:border-zinc-900 mb-1 font-mono">Search Results</div>
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
                <div className="text-zinc-500 dark:text-zinc-400 text-[10px] uppercase tracking-widest mt-0.5 group-hover/item:text-zinc-500">
                  {highlightMatch(result.type, query)}
                </div>
              </a>
            ))
          ) : (
            <div className="px-3 py-6 text-zinc-600 dark:text-zinc-400 text-xs text-center italic">No results found for "{query}"</div>
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
           <div className="p-6 pt-0 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed border-t border-zinc-100 dark:border-zinc-900/50">
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
          <span className="text-orange-700 dark:text-primary font-semibold tracking-widest uppercase text-xs">Knowledge Base</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-zinc-900 dark:text-white mb-10">Frequently Asked <span className="text-zinc-500 dark:text-zinc-400">Questions</span></h2>
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
    <div className="mt-24 border-t border-zinc-200 dark:border-zinc-800 pt-20">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-primary"></div>
          <span className="text-orange-700 dark:text-primary font-semibold tracking-widest uppercase text-xs">Quality Standards</span>
        </div>
        <h3 className="font-display text-3xl md:text-5xl uppercase tracking-wide text-zinc-900 dark:text-white mb-6">
          Grading & <span className="text-zinc-500 dark:text-zinc-400">Acceptance</span>
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-sm leading-relaxed">
          To ensure the highest market value and safety standards, AALKC employs a strict grading criteria. Please review our visual guide for condition requirements prior to scheduling a pickup.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {guideData.map((item, idx) => (
          <div key={idx} className="border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 md:p-8 rounded-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex flex-col relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-[40px] rounded-full pointer-events-none transition-all duration-500 group-hover:scale-150 group-hover:opacity-20" style={{ backgroundColor: item.color.replace('text-[', '').replace(']', '') }}></div>
             
             <div className="flex items-center gap-4 border-b border-zinc-200 dark:border-zinc-800/80 pb-6 mb-6 relative z-10">
               <div className={`p-4 rounded-full ${item.bg} ${item.border} border flex items-center justify-center`}>
                 <item.icon className={`w-6 h-6 ${item.color}`} />
               </div>
               <h4 className="text-xl font-display uppercase tracking-widest text-zinc-900 dark:text-white m-0">
                 {item.metal}
               </h4>
             </div>
             
             <div className="w-full text-left space-y-8 relative z-10">
               <div>
                  <h5 className="text-[10px] uppercase tracking-widest text-green-600 dark:text-green-500 font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Acceptable Conditions
                  </h5>
                  <ul className="space-y-3">
                    {item.acceptable.map((desc, i) => (
                      <li key={i} className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full mt-1.5 shrink-0"></div>
                        <span className="leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
               </div>

               <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/50">
                  <h5 className="text-[10px] uppercase tracking-widest text-red-600 dark:text-red-500 font-bold mb-4 flex items-center gap-2">
                    <XCircle className="w-3.5 h-3.5" /> Common Downgrades
                  </h5>
                  <ul className="space-y-3">
                    {item.unacceptable.map((desc, i) => (
                      <li key={i} className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm flex items-start gap-2.5">
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
      {/* Video & Background Visual Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-[0.55] transition-opacity duration-1000"
        >
          <source src="/AALKC.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60"></div>
        
        {/* Engineering Grid Mesh */}
        <div className="absolute inset-0 bg-grid-mesh opacity-25 pointer-events-none"></div>
        
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-pulse-glow pointer-events-none"></div>
        <div className="absolute bottom-1/3 left-10 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[120px] animate-float pointer-events-none"></div>

        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" 
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
              <span className="text-orange-700 dark:text-primary font-semibold tracking-[0.3em] uppercase text-xs">AALKC Solutions</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn} 
              className="font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95] text-white mb-8 uppercase tracking-tight font-medium drop-shadow-2xl"
            >
              {slide.title[0]} <br />
              <span className="text-zinc-300 font-light italic">{slide.title[1]}</span> <br />
              <span className={`text-transparent bg-clip-text font-bold ${
                currentIndex === 0 ? 'text-liquid-copper' :
                currentIndex === 1 ? 'text-gold-gradient' :
                'text-sterling-silver font-extrabold'
              }`}>
                {slide.title[2]}
              </span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-zinc-300/90 text-lg md:text-xl font-light max-w-lg mb-10 text-balance leading-relaxed h-[80px]">
              {slide.desc}
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <a href="#contact" className="bg-orange-700 hover:bg-orange-600 dark:bg-primary dark:hover:bg-orange-500 text-white dark:text-zinc-950 px-8 py-4 uppercase tracking-widest font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(249,115,22,0.2)] dark:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] dark:hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:-translate-y-0.5 rounded-sm">
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
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-white/10 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-white/10 dark:hover:bg-zinc-900 transition-all"
              aria-label="Next slide"
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
                aria-label={`Go to slide ${idx + 1}`}
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
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60] bg-orange-700 hover:bg-orange-600 dark:bg-primary dark:hover:bg-orange-500 text-white p-3 md:p-4 rounded-sm shadow-[0_0_20px_rgba(249,115,22,0.3)] dark:shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] dark:hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] transition-all border border-orange-600/20 dark:border-orange-400/20 group flex items-center justify-center"
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


function CredentialsSection() {
  return (
    <section id="credentials" className="py-20 bg-zinc-900 text-white border-t border-zinc-800 relative overflow-hidden">
      {/* Mesh Grid & Glow Orbs */}
      <div className="absolute inset-0 bg-grid-mesh opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-amber-500"></div>
            <span className="text-amber-500 font-semibold tracking-widest uppercase text-xs">Official Certification</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wide text-white mb-6">
            Institutional <span className="text-zinc-400">Integrity & Trust</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-sm leading-relaxed">
            Amanat Al-Kalima Company is fully authenticated by the Ministry of Commerce of Saudi Arabia and operates in strict accordance with international quality, environmental, and occupational safety standards.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* KSA Chamber/CR Card */}
          <div className="lg:col-span-1 border border-zinc-800 bg-zinc-950/60 backdrop-blur-sm p-8 flex flex-col justify-between relative overflow-hidden rounded-sm glow-border-gold-hover">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-xl rounded-full"></div>
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase font-bold">KSA Business Credentials</span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping-slow"></span>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Commercial Registration</h3>
              <p className="text-zinc-500 text-xs mb-8 uppercase tracking-wide">Official License Details for Amanat Al-Kalima Company</p>
              
              <div className="space-y-4 font-mono text-xs border-y border-zinc-800 py-6 mb-6">
                <div className="flex justify-between">
                  <span className="text-zinc-500">CR NUMBER:</span>
                  <span className="font-bold text-white tracking-wider">2050116034</span>
                </div>
                <div className="flex justify-between" dir="rtl">
                  <span className="text-zinc-500 font-sans">السجل التجاري:</span>
                  <span className="font-bold text-white tracking-wider">٢٠٥٠١١٦٠٣٤</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">REGISTERED:</span>
                  <span className="text-white">DAMMAM, KSA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">STATUS:</span>
                  <span className="text-green-400 font-bold">ACTIVE / VERIFIED</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Saudi Flag SVG element */}
              <div className="w-8 h-5 bg-green-700 flex items-center justify-center border border-green-600 rounded-sm">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2a1 1 0 0 0-1 1v4.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L9.586 9H5a1 1 0 0 0 0 2h4.586l-2.293 2.293a1 1 0 1 0 1.414 1.414L11 13.414V18a1 1 0 0 0 2 0v-4.586l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 11H19a1 1 0 0 0 0-2h-4.586l2.293-2.293a1 1 0 0 0-1.414-1.414L13 7.586V3a1 1 0 0 0-1-1z"/>
                </svg>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">NATIONAL ENTITY / DAMMAM</span>
            </div>
          </div>

          {/* Compliance & Quality Certification badges */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "ISO 9001:2015",
                subtitle: "Quality Management",
                desc: "Certified workflow controls guaranteeing honest weight calibration, metal grading accuracy, and transaction security.",
                svg: (
                  <svg className="w-12 h-12 text-amber-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3"/>
                    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1"/>
                    <path d="M40 50 L47 57 L60 42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <text x="50" y="80" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold" fontFamily="monospace">ISO 9001</text>
                  </svg>
                )
              },
              {
                title: "ISO 14001:2015",
                subtitle: "Environmental Systems",
                desc: "Authorized processing procedures that mitigate site run-off, optimize fuel cycles, and guarantee ecological conservation.",
                svg: (
                  <svg className="w-12 h-12 text-green-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3"/>
                    <path d="M50 25 C65 25 70 45 50 75 C30 45 35 25 50 25 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M50 35 L50 65" stroke="currentColor" strokeWidth="1.5"/>
                    <text x="50" y="87" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" fontFamily="monospace">ISO 14001</text>
                  </svg>
                )
              },
              {
                title: "ISO 45001:2018",
                subtitle: "Health & Safety Standard",
                desc: "Certified heavy materials handling safeguards that ensure secure container swap cycles and zero-accident operation rules.",
                svg: (
                  <svg className="w-12 h-12 text-sky-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3"/>
                    <path d="M50 28 L72 70 L28 70 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <circle cx="50" cy="48" r="4" fill="currentColor"/>
                    <rect x="48" y="56" width="4" height="8" fill="currentColor"/>
                    <text x="50" y="87" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" fontFamily="monospace">ISO 45001</text>
                  </svg>
                )
              },
              {
                title: "MOC VERIFIED",
                subtitle: "Saudi Ministry of Commerce",
                desc: "Verified commercial registry and corporate entities compliance, ensuring legal validity and compliance in corporate trade.",
                svg: (
                  <svg className="w-12 h-12 text-amber-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3"/>
                    <path d="M50 20 L75 32 L75 58 C75 73 64 82 50 85 C36 82 25 73 25 58 L25 32 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M42 46 L47 51 L58 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <text x="50" y="73" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold" fontFamily="monospace">KSA GOVERNMENT</text>
                  </svg>
                )
              }
            ].map((badge, idx) => (
              <div key={idx} className="border border-zinc-800 bg-zinc-950/40 p-6 flex gap-5 rounded-sm hover:border-zinc-700 transition-colors">
                <div className="shrink-0 flex items-center justify-center bg-zinc-900 p-2.5 border border-zinc-800 rounded-sm">
                  {badge.svg}
                </div>
                <div className="text-left">
                  <h4 className="font-display font-semibold text-white tracking-widest text-sm uppercase mb-1">{badge.title}</h4>
                  <div className="text-amber-500 font-mono text-[9px] uppercase tracking-wider mb-2 font-bold">{badge.subtitle}</div>
                  <p className="text-zinc-500 text-xs leading-relaxed font-sans">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [calcMetal, setCalcMetal] = useState('copper');
  const [calcWeight, setCalcWeight] = useState(5);
  const [calcCurrency, setCalcCurrency] = useState<'SAR' | 'USD'>('SAR');

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'AALKC ESTIMATOR OS v4.8 - SECURE CONNECT ESTABLISHED',
    'SYSTEM READY. READY TO COMMENCE ESTIMATES...',
  ]);

  useEffect(() => {
    const metalObj = CALCULATOR_METALS.find(m => m.id === calcMetal) || CALCULATOR_METALS[0];
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    
    const log1 = `[${timestamp}] [SYS] CALIBRATING SCALE -> METAL: ${metalObj.name.toUpperCase()}`;
    const log2 = `[${timestamp}] [SYS] CURRENT MASS LOAD -> ${calcWeight.toFixed(1)} TONS`;
    const log3 = `[${timestamp}] [SYS] EXCHANGE SETTING -> CURRENCY: ${calcCurrency}`;
    
    setTerminalLogs(prev => {
      const next = [...prev, log1, log2, log3];
      return next.slice(-4); // Keep last 4 logs to fit console window height
    });
  }, [calcMetal, calcWeight, calcCurrency]);

  const [activeTickerTooltip, setActiveTickerTooltip] = useState<{
    item: typeof TICKER_ITEMS[0];
    x: number;
    y: number;
  } | null>(null);

  const [marketTab, setMarketTab] = useState<'live' | 'history' | 'calculator'>('history');
  const [chartRendered, setChartRendered] = useState(false);

  useEffect(() => {
    // Defer chart rendering to ensure the parent container is fully mounted and has positive dimensions
    const timer = setTimeout(() => {
      setChartRendered(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
      
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }
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
        <a href="#" className="inline-flex items-center gap-2 text-orange-700 dark:text-primary hover:text-orange-950 dark:hover:text-white uppercase tracking-widest text-xs font-semibold mb-8 transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to Home
        </a>
        <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tight text-zinc-900 dark:text-white mb-6">
          {isPrivacy ? "Privacy Policy" : "Terms of Service"}
        </h1>
        <div className="prose dark:prose-invert prose-zinc max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {isPrivacy ? (
            <div className="space-y-6">
               <p className="text-lg">At Amanat Al-Kalima Company (AALKC), we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or use our services.</p>
               <h3 className="text-zinc-900 dark:text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-200 dark:border-zinc-800 pb-2">Information Collection</h3>
               <p>We may collect personal information such as your name, email address, phone number, and company details when you utilize our "Request a Quote" form or contact us via email. We also collect anonymous usage data through cookies to analyze website traffic and improve our user experience.</p>
               <h3 className="text-zinc-900 dark:text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-200 dark:border-zinc-800 pb-2">Use of Information</h3>
               <p>The information we collect is used primarily to process your service requests, provide accurate pricing for materials, and communicate effectively with our industrial partners. We do not sell or share your personal data with third parties for marketing purposes.</p>
               <h3 className="text-zinc-900 dark:text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-200 dark:border-zinc-800 pb-2">Data Security</h3>
               <p>We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and access is restricted to authorized personnel who are required to keep the information confidential.</p>
               <h3 className="text-zinc-900 dark:text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-200 dark:border-zinc-800 pb-2">Contact Us</h3>
               <p>If you have any questions regarding this Privacy Policy, you may contact us at <a href="mailto:contact@aalkc.com" className="text-orange-700 dark:text-primary hover:underline">contact@aalkc.com</a>.</p>
            </div>
          ) : (
            <div className="space-y-6">
               <p className="text-lg">By accessing or using the services provided by Amanat Al-Kalima Company (AALKC), you agree to be bound by these Terms of Service and all applicable laws and regulations in the Kingdom of Saudi Arabia.</p>
               <h3 className="text-zinc-900 dark:text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-200 dark:border-zinc-800 pb-2">Service Terms</h3>
               <p>AALKC provides professional scrap metal recycling and trading services. All material weights are determined by our certified industrial scales, and we reserve the right to inspect all materials for quality and safety compliance before purchase.</p>
               <h3 className="text-zinc-900 dark:text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-200 dark:border-zinc-800 pb-2">Pricing & Quotes</h3>
               <p>Estimates provided through our website or via email are based on current market conditions and are subject to change until materials are physically inspected and weighed at our Dammam facility.</p>
               <h3 className="text-zinc-900 dark:text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-200 dark:border-zinc-800 pb-2">Compliance & Safety</h3>
               <p>Suppliers are responsible for ensuring that all scrap metal provided is free from hazardous materials, including but not limited to, explosive, radioactive, or pressurized containers. Suppliers must also confirm legal ownership of all materials sold to AALKC.</p>
               <h3 className="text-zinc-900 dark:text-white uppercase tracking-widest text-lg font-bold mt-12 border-b border-zinc-200 dark:border-zinc-800 pb-2">Governing Law</h3>
               <p>These terms are governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia, and any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of Saudi Arabia.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-300 transition-colors duration-300">
      {/* High-tech top scroll progress bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-primary z-[60] transition-all duration-100 ease-out origin-left pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 flex flex-col ${isScrolled ? 'bg-white/90 dark:bg-zinc-950/85 backdrop-blur-lg border-b border-zinc-200/50 dark:border-zinc-850/50 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)]' : 'bg-transparent border-b border-transparent'}`}>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-50 pointer-events-none"></div>
        
        {/* Main Nav Row */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 h-20 md:h-24 flex items-center justify-between">
          
          {/* Logo Container */}
          <div className="flex items-center shrink-0 w-auto lg:w-[280px]">
            <a href="#" data-cursor-label="NAV: HOME" className="flex items-center relative group py-2 outline-none transition-all duration-300 opacity-100">
              <img 
                src={logoImg} 
                alt="AALKC Logo" 
                className={`w-auto object-contain transition-all duration-500 relative z-10 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.3)] ${isScrolled ? 'h-10 sm:h-12 md:h-14' : 'h-12 sm:h-14 md:h-16'}`} 
              />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-10 text-[13px] font-bold tracking-widest uppercase">
            <a href="#services" data-cursor-label="NAV: SERVICES" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300">Services</a>
            <a href="#why-us" data-cursor-label="NAV: WHY US" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300">Why Us</a>
            <a href="#materials" data-cursor-label="NAV: MATERIALS" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300">Materials</a>
            <a href="#faq" data-cursor-label="NAV: FAQ" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300">FAQ</a>
            <a href="#contact" data-cursor-label="NAV: CONTACT" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300">Contact</a>
          </div>

          {/* CTA & Search */}
          <div className="hidden lg:flex items-center justify-end shrink-0 w-auto gap-4">
             <SearchBar />
             
             {/* Theme Toggle */}
             <button 
               onClick={toggleTheme}
               data-cursor-label="THEME: SWAP"
               className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-655 dark:text-zinc-400 hover:text-primary active:scale-95"
               aria-label="Toggle theme"
             >
               {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>

             <button onClick={() => window.location.hash = '#contact'} data-cursor-label="GET QUOTE" className="bg-orange-700 hover:bg-orange-600 dark:bg-primary dark:hover:bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.15)] dark:shadow-[0_0_25px_rgba(249,115,22,0.35)] text-white dark:text-zinc-950 px-6 py-2.5 rounded font-bold text-[13px] transition-all uppercase tracking-widest flex items-center gap-2 active:scale-95 group border border-orange-700 hover:border-orange-600 dark:border-primary dark:hover:border-orange-500 whitespace-nowrap">
               Get Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
          
          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center justify-end gap-3">
             <button 
               onClick={toggleTheme}
               className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-655 dark:text-zinc-400"
               aria-label="Toggle theme"
             >
               {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
             <button 
               onClick={() => setIsMobileMenuOpen(true)}
               className="text-zinc-655 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white p-2 border border-zinc-200 dark:border-zinc-800 rounded-sm"
               aria-label="Open mobile menu"
             >
                <Menu className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* LME Commodity Ticker Tape Row */}
        <div className="w-full bg-zinc-900 dark:bg-black/90 border-t border-b border-zinc-200/10 dark:border-zinc-800/80 py-2.5 overflow-hidden">
          <div className="ticker-wrap flex items-center">
            <div className="ticker-content flex gap-12 select-none uppercase font-mono text-[10px] tracking-wider text-zinc-400">
              {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
                <div 
                  key={idx} 
                  className="inline-flex items-center gap-2 cursor-crosshair relative py-0.5 px-2.5 rounded hover:bg-zinc-800/40 transition-colors"
                  onMouseEnter={(e) => {
                    setActiveTickerTooltip({
                      item,
                      x: e.clientX,
                      y: e.clientY
                    });
                  }}
                  onMouseMove={(e) => {
                    setActiveTickerTooltip({
                      item,
                      x: e.clientX,
                      y: e.clientY
                    });
                  }}
                  onMouseLeave={() => {
                    setActiveTickerTooltip(null);
                  }}
                  data-cursor-label="LME DATA"
                >
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${item.up ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${item.up ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  </span>
                  <span className="font-bold text-white">{item.name}</span>
                  <span className="text-zinc-300 font-semibold">{item.value}</span>
                  <span className={`font-bold ${item.up ? 'text-green-400' : 'text-red-400'}`}>
                    {item.up ? '↑' : '↓'} {item.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isScrolled && (
          <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-primary/45 to-transparent z-50 pointer-events-none animate-in fade-in duration-300"></div>
        )}
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

      <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800 relative transition-colors duration-300 overflow-hidden">
        {/* Engineering Grid Mesh & Ambient Glow */}
        <div className="absolute inset-0 bg-grid-mesh opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-glow pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-zinc-400/5 rounded-full blur-[100px] animate-float pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
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
                   className={`px-4 py-2 text-[10px] sm:text-xs uppercase tracking-widest font-bold transition-all ${serviceFilter === cat ? 'bg-orange-700 dark:bg-primary text-white dark:text-zinc-950 shadow-lg' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
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
                className="h-full"
              >
                <TiltCard 
                  className="tech-card group p-8 border border-zinc-200/80 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/40 backdrop-blur-sm transition-all duration-300 relative overflow-hidden flex flex-col h-full shadow-sm hover:shadow-[0_0_35px_rgba(249,115,22,0.12)] hover:border-primary/40 rounded-sm text-zinc-300/30 dark:text-zinc-750/30 hover:text-primary"
                  data-cursor-label={`SERVICE: ${service.title}`}
                >
                  <CardCrosshairs refLabel={`REF: SRV-${service.category.toUpperCase().slice(0,3)}`} lotLabel={`LOT-ID: 2026/AAL-${service.title.toUpperCase().slice(0,3)}`} />

                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full translate-x-12 -translate-y-12 group-hover:bg-primary/10 transition-colors"></div>
                  
                  <div className="w-16 h-16 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-center mb-6 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-300 shadow-inner">
                    <service.icon className="w-8 h-8 text-zinc-400 dark:text-zinc-500 group-hover:text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] text-orange-700 dark:text-primary font-mono uppercase tracking-widest border border-orange-700/20 dark:border-primary/20 px-2 py-0.5 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">{service.category}</span>
                  </div>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 dark:text-white mb-4">{service.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm flex-1">{service.desc}</p>
                  
                  <div className="mt-8 h-[1px] w-full bg-zinc-200/80 dark:bg-zinc-800/80 group-hover:bg-primary/30 transition-colors relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 group-hover:border-primary/50 group-hover:bg-primary transition-all duration-300 flex items-center justify-center shadow-sm">
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-white dark:group-hover:text-zinc-950 transition-colors" />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Materials & Pricing */}
      <section id="materials" className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-300 relative overflow-hidden">
        {/* Ambient Glows & Grid Mesh */}
        <div className="absolute inset-0 bg-grid-mesh opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-glow pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] animate-float pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-primary"></div>
                <span className="text-orange-700 dark:text-primary font-semibold tracking-widest uppercase text-xs">What We Buy</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-wide text-zinc-900 dark:text-white mb-8">
                Ferrous & <br/><span className="text-zinc-500 dark:text-zinc-400">Non-Ferrous</span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed max-w-lg">
                We accept a wide variety of metals and alloys. Our state-of-the-art analyzing equipment ensures precise grading and honest pricing for every load.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs uppercase tracking-wider">
                {MATERIALS_LIST.map((mat, index) => {
                  const Icon = mat.icon;
                  const Wrapper = mat.isLink ? 'a' : 'div';
                  const linkProps = mat.isLink ? { href: mat.href } : {};
                  
                  return (
                    <TiltCard 
                      key={index}
                      className="h-full"
                    >
                      <Wrapper 
                        {...linkProps}
                        className={`tech-card flex flex-col p-4 border border-zinc-200/80 dark:border-zinc-800/60 bg-zinc-50/30 dark:bg-zinc-950/25 backdrop-blur-sm transition-all duration-300 rounded-sm relative group shadow-sm h-full ${
                          mat.isLink 
                            ? 'text-zinc-400/30 dark:text-zinc-700/30 hover:text-primary hover:border-primary/50 hover:bg-primary/[0.02] cursor-pointer hover:shadow-[0_8px_20px_rgba(249,115,22,0.08)]' 
                            : 'text-zinc-400/20 dark:text-zinc-700/20 hover:text-zinc-650 dark:hover:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100/30 dark:hover:bg-zinc-900/30'
                        }`}
                        data-cursor-label={mat.isLink ? `SPEC SHEET: ${mat.name}` : `MATERIAL: ${mat.name}`}
                      >
                        <CardCrosshairs refLabel={`REF: MAT-${mat.name.toUpperCase().slice(0,3)}`} lotLabel={`LOT-ID: 2026/AAL-${mat.spec.toUpperCase().split(' ')[0]}`} />
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-sm ${mat.bg} ${mat.border} border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}>
                            <Icon className={`w-4 h-4 ${mat.color}`} />
                          </div>
                          <span className="text-sm font-semibold tracking-widest text-zinc-900 dark:text-white transition-colors">{mat.name}</span>
                        </div>
                        
                        <div className="space-y-1.5 border-t border-zinc-200/50 dark:border-zinc-800/40 pt-3 text-[10px] text-zinc-600 dark:text-zinc-400 font-sans tracking-wide">
                          <div className="flex justify-between">
                            <span className="font-mono text-[9px] tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">SPEC:</span>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-300 text-right">{mat.spec}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-mono text-[9px] tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">PURITY:</span>
                            <span className="font-bold text-orange-700 dark:text-primary text-right">{mat.purity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-mono text-[9px] tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">INDUSTRY:</span>
                            <span className="text-zinc-800 dark:text-zinc-400 text-right">{mat.industry}</span>
                          </div>
                        </div>

                        {mat.isLink && (
                          <div className="mt-3 pt-2.5 border-t border-zinc-200/30 dark:border-zinc-800/20 flex items-center justify-end text-[10px] text-orange-700 dark:text-primary font-semibold tracking-wider transition-colors group-hover:text-orange-600 dark:group-hover:text-orange-400">
                            TECHNICAL SPEC SHEET <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </Wrapper>
                    </TiltCard>
                  );
                })}
              </div>

            </div>
            
            <div className="border border-zinc-200/80 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/40 backdrop-blur-sm p-6 sm:p-8 pt-8 relative overflow-hidden flex flex-col h-full min-h-[420px] shadow-xl glow-border-hover rounded-sm">
               {/* Abstract grid background */}
               <div className="absolute inset-0 bg-grid-mesh opacity-10 pointer-events-none"></div>
               
               <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 relative z-10">
                 <div className="flex items-center gap-3">
                   <h3 className="font-display text-2xl uppercase tracking-widest text-zinc-900 dark:text-white m-0">
                     Market Trends
                   </h3>
                   <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500/10 dark:bg-green-500/20 border border-green-500/20 text-[9px] text-green-600 dark:text-green-400 font-mono tracking-widest uppercase font-semibold">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                     Live KSA
                   </div>
                 </div>
                 
                 <div className="flex bg-zinc-100 dark:bg-zinc-950 p-1 rounded border border-zinc-200 dark:border-zinc-800">
                   <button 
                     onClick={() => setMarketTab('live')}
                     className={`px-3 py-1 text-[11px] font-semibold tracking-wider uppercase transition-colors rounded-sm cursor-pointer ${marketTab === 'live' ? 'bg-orange-700 dark:bg-primary text-white dark:text-zinc-950' : 'text-zinc-650 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
                   >
                     Live
                   </button>
                   <button 
                     onClick={() => setMarketTab('history')}
                     className={`px-3 py-1 text-[11px] font-semibold tracking-wider uppercase transition-colors rounded-sm cursor-pointer ${marketTab === 'history' ? 'bg-orange-700 dark:bg-primary text-white dark:text-zinc-950' : 'text-zinc-655 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
                   >
                     History
                   </button>
                   <button 
                     onClick={() => setMarketTab('calculator')}
                     className={`px-3 py-1 text-[11px] font-semibold tracking-wider uppercase transition-colors rounded-sm cursor-pointer ${marketTab === 'calculator' ? 'bg-orange-700 dark:bg-primary text-white dark:text-zinc-950' : 'text-zinc-655 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
                   >
                     Estimator
                   </button>
                 </div>
               </div>
               
               <div className="flex-1 flex flex-col justify-center relative z-10">
                  <AnimatePresence mode="wait">
                    {marketTab === 'live' && (
                      <motion.div 
                        key="live"
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }}
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
                              className={`flex justify-between items-center py-4 border-b border-zinc-200 dark:border-zinc-800/80 ${item.link ? 'hover:bg-zinc-100 dark:hover:bg-zinc-900/50 -mx-4 px-4 cursor-pointer transition-colors group' : ''}`}
                            >
                              <span className={`font-mono text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 ${item.link ? 'group-hover:text-orange-700 dark:group-hover:text-primary transition-colors' : ''}`}>{item.name}</span>
                              <span className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded border flex items-center gap-2 ${item.up === true ? 'text-green-600 dark:text-green-400 border-green-500/20 bg-green-500/5' : item.up === false ? 'text-red-600 dark:text-red-400 border-red-500/20 bg-red-500/5' : 'text-zinc-500 dark:text-zinc-400 border-zinc-500/20 bg-zinc-500/5'}`}>
                                <span className="relative flex h-1.5 w-1.5">
                                   <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${item.up === true ? 'bg-green-500' : item.up === false ? 'bg-red-500' : 'bg-zinc-400'}`}></span>
                                   <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${item.up === true ? 'bg-green-500' : item.up === false ? 'bg-red-500' : 'bg-zinc-500'}`}></span>
                                </span>
                                {item.up === true ? '↑' : item.up === false ? '↓' : '→'} {item.trend}
                              </span>
                            </Wrapper>
                          );
                        })}
                        <div className="mt-8 text-[10px] text-zinc-500 dark:text-zinc-400 font-mono tracking-widest text-center">
                          UPDATED: LIVE KSA TIME. CONTACT FOR DIRECT SPOT QUOTES.
                        </div>
                      </motion.div>
                    )}
                    {marketTab === 'calculator' && (
                      <motion.div 
                        key="calculator"
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }}
                        className="border-beam-container border-beam-glow rounded-sm w-full"
                      >
                        <div className="border-beam-inner bg-white/95 dark:bg-zinc-950/95 p-5 md:p-6 rounded-sm text-zinc-700 dark:text-zinc-300">
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Left Side: LED Segmented Progress Gauge */}
                            <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-3 bg-zinc-100 dark:bg-zinc-900/60 p-3 rounded border border-zinc-200/50 dark:border-zinc-800/50 shrink-0">
                              <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 [writing-mode:vertical-lr] rotate-180 hidden md:block select-none">MASS LOAD LEVEL</span>
                              <div className="flex flex-row md:flex-col-reverse gap-1.5 h-3 md:h-64 w-full md:w-3.5 items-center justify-between flex-1 md:flex-initial">
                                {Array.from({ length: 20 }).map((_, i) => {
                                  const threshold = (i + 1) * 2.5;
                                  const isActive = calcWeight >= threshold;
                                  return (
                                    <div 
                                      key={i} 
                                      className={`h-2.5 md:h-2 w-full md:w-3.5 rounded-[1px] transition-all duration-300 ${
                                        isActive 
                                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]' 
                                          : 'bg-zinc-250 dark:bg-zinc-800'
                                      }`}
                                      title={`${threshold} Tons`}
                                    />
                                  );
                                })}
                              </div>
                              <span className="font-mono text-[9px] font-bold text-orange-600 dark:text-primary mt-0 md:mt-2 shrink-0">{calcWeight.toFixed(1)}T</span>
                            </div>

                            {/* Main Area */}
                            <div className="flex-1 flex flex-col gap-4">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                  <label className="block text-[9px] font-mono tracking-widest text-zinc-450 dark:text-zinc-500 uppercase mb-1.5 font-bold">Select Material</label>
                                  <select 
                                    value={calcMetal} 
                                    onChange={(e) => setCalcMetal(e.target.value)}
                                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-205 dark:border-zinc-800 text-zinc-900 dark:text-white px-2.5 py-2.5 rounded text-xs focus:border-primary outline-none transition-colors font-mono uppercase tracking-wider cursor-pointer"
                                    data-cursor-label="SELECT METAL"
                                  >
                                    {CALCULATOR_METALS.map((m) => (
                                      <option key={m.id} value={m.id}>{m.name.toUpperCase()}</option>
                                    ))}
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-[9px] font-mono tracking-widest text-zinc-450 dark:text-zinc-500 uppercase mb-1.5 font-bold">Currency</label>
                                  <div className="flex bg-zinc-150 dark:bg-zinc-900 p-0.5 rounded border border-zinc-200 dark:border-zinc-800">
                                    <button 
                                      type="button"
                                      onClick={() => setCalcCurrency('SAR')}
                                      className={`flex-1 py-2 text-[9px] font-bold uppercase transition-all rounded-sm cursor-pointer ${calcCurrency === 'SAR' ? 'bg-orange-700 dark:bg-primary text-white dark:text-zinc-950 shadow-sm' : 'text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-250'}`}
                                      data-cursor-label="SET CURRENCY: SAR"
                                    >
                                      SAR (SR)
                                    </button>
                                    <button 
                                      type="button"
                                      onClick={() => setCalcCurrency('USD')}
                                      className={`flex-1 py-2 text-[9px] font-bold uppercase transition-all rounded-sm cursor-pointer ${calcCurrency === 'USD' ? 'bg-orange-700 dark:bg-primary text-white dark:text-zinc-950 shadow-sm' : 'text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-250'}`}
                                      data-cursor-label="SET CURRENCY: USD"
                                    >
                                      USD ($)
                                    </button>
                                  </div>
                                </div>

                                <div>
                                  <div className="flex justify-between items-center mb-1.5">
                                    <label className="text-[9px] font-mono tracking-widest text-zinc-450 dark:text-zinc-500 uppercase font-bold">Weight (Tons)</label>
                                    <span className="text-xs font-mono font-bold text-orange-600 dark:text-primary">{calcWeight.toFixed(1)} Tons</span>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="0.1" 
                                    max="50" 
                                    step="0.1"
                                    value={calcWeight}
                                    onChange={(e) => setCalcWeight(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary mt-3"
                                    data-cursor-label="ADJUST WEIGHT"
                                  />
                                  <div className="flex justify-between text-[8px] font-mono text-zinc-400 mt-1">
                                    <span>MIN: 0.1T</span>
                                    <span>MAX: 50.0T</span>
                                  </div>
                                </div>
                              </div>

                              {/* Real-time Monospace System Terminal Console Log */}
                              <div className="bg-black/95 dark:bg-zinc-950/95 border border-zinc-800/80 p-3 rounded font-mono text-[9px] text-green-500 shadow-inner space-y-1 select-none overflow-hidden h-28 relative">
                                <div className="absolute top-2 right-3 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                  <span className="text-[8px] text-green-500/60 uppercase tracking-widest">AALKC-CALIB</span>
                                </div>
                                <div className="text-green-500/40 border-b border-zinc-800/40 pb-1 mb-1.5 uppercase tracking-widest text-[8px]">--- ESTIMATOR OSCILLOSCOPE LOGS ---</div>
                                {terminalLogs.map((log, idx) => (
                                  <div key={idx} className="whitespace-pre-wrap leading-relaxed animate-in fade-in slide-in-from-bottom-1 duration-150">
                                    <span className="text-green-600 font-bold mr-1">&gt;</span> {log}
                                  </div>
                                ))}
                              </div>

                              {(() => {
                                const metalObj = CALCULATOR_METALS.find(m => m.id === calcMetal) || CALCULATOR_METALS[0];
                                const activeUSDRate = metalObj.usdPricePerTon;
                                const exchangeRate = 3.75;
                                const baseRate = calcCurrency === 'SAR' ? activeUSDRate * exchangeRate : activeUSDRate;
                                
                                let bonusPercent = 0;
                                let bonusLabel = "No Bulk Bonus";
                                if (calcWeight >= 25) {
                                  bonusPercent = 0.08;
                                  bonusLabel = "+8% Bulk Tier 3 (Premium)";
                                } else if (calcWeight >= 10) {
                                  bonusPercent = 0.05;
                                  bonusLabel = "+5% Bulk Tier 2";
                                } else if (calcWeight >= 5) {
                                  bonusPercent = 0.03;
                                  bonusLabel = "+3% Bulk Tier 1";
                                }

                                const rawTotal = baseRate * calcWeight;
                                const bonusAmount = rawTotal * bonusPercent;
                                const grandTotal = rawTotal + bonusAmount;

                                const whatsAppMsg = `Hello AALKC Team, I used the calculator for ${metalObj.name} and estimated ${calcWeight.toFixed(1)} Tons at a payout of ${grandTotal.toLocaleString(undefined, {maximumFractionDigits:2})} ${calcCurrency}. I'd like to lock in this rate and book an inspection.`;

                                return (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-zinc-50 dark:bg-zinc-900/40 p-4 border border-zinc-200 dark:border-zinc-800/80 rounded-sm">
                                    <div className="space-y-2.5 font-mono text-[10px]">
                                      <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-800/50 pb-1.5">
                                        <span className="text-zinc-550 dark:text-zinc-400 uppercase tracking-widest text-[9px]">Rate / Ton:</span>
                                        <span className="font-semibold text-zinc-900 dark:text-zinc-250">
                                          {baseRate.toLocaleString(undefined, {maximumFractionDigits: 2})} {calcCurrency}
                                        </span>
                                      </div>
                                      <div className="flex justify-between pb-1.5 border-b border-zinc-200/50 dark:border-zinc-800/50">
                                        <span className="text-zinc-550 dark:text-zinc-400 uppercase tracking-widest text-[9px]">Discounts/Bonus:</span>
                                        <span className={`font-bold ${bonusPercent > 0 ? 'text-green-600 dark:text-green-400' : 'text-zinc-550 dark:text-zinc-400'}`}>
                                          {bonusLabel}
                                        </span>
                                      </div>
                                      <div className="flex justify-between text-[9px] text-zinc-500 dark:text-zinc-400">
                                        <span>SYS REF:</span>
                                        <span>REF-LME-{calcMetal.toUpperCase()}-EST</span>
                                      </div>
                                    </div>

                                    <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-zinc-200 dark:border-zinc-800/80 pt-3.5 md:pt-0 md:pl-4 flex flex-col items-center md:items-end justify-center">
                                      <span className="text-[9px] text-zinc-550 dark:text-zinc-400 font-mono tracking-widest uppercase font-bold">Estimated Grand Payout</span>
                                      <span className="text-3xl font-mono font-extrabold text-orange-700 dark:text-primary tracking-wider mt-1.5 mb-3.5 flex items-baseline">
                                        <AnimatedNumber to={grandTotal} formatter={(val) => val.toLocaleString(undefined, { maximumFractionDigits: 2 })} />
                                        <span className="text-xs font-semibold ml-1.5 text-zinc-500 dark:text-zinc-400">{calcCurrency}</span>
                                      </span>

                                      <a 
                                        href={`https://wa.me/966551811700?text=${encodeURIComponent(whatsAppMsg)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold tracking-widest text-[9px] uppercase px-4 py-2.5 rounded-sm transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-sm cursor-pointer border border-green-700/20"
                                        data-cursor-label="LOCK CONTRACT"
                                      >
                                        <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.008c6.56 0 11.895-5.336 11.898-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                        </svg>
                                        Lock Rate via WhatsApp
                                      </a>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {marketTab === 'history' && (
                      <motion.div 
                        key="history"
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }}
                        className="h-[280px] w-full"
                      >
                        {chartRendered ? (
                          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <AreaChart data={mockChartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                              <defs>
                                <linearGradient id="colorCopper" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorSteel" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#a1a1aa" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#a1a1aa" stopOpacity={0}/>
                                </linearGradient>
                                <filter id="neonCopper" x="-10%" y="-10%" width="120%" height="120%">
                                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#f97316" floodOpacity="0.4"/>
                                </filter>
                                <filter id="neonSteel" x="-10%" y="-10%" width="120%" height="120%">
                                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#a1a1aa" floodOpacity="0.3"/>
                                </filter>
                              </defs>
                              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
                              <XAxis dataKey="month" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                              <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                              <Tooltip content={<CustomTooltip />} />
                              <Legend 
                                payload={[
                                  { value: 'Copper', type: 'rect', color: '#f97316', dataKey: 'copper' },
                                  { value: 'Steel', type: 'rect', color: '#a1a1aa', dataKey: 'steel' }
                                ]}
                                content={(props: any) => {
                                  const { payload } = props;
                                  return (
                                    <div className="flex justify-center gap-8 mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800/50">
                                      {payload?.map((entry: any, index: number) => {
                                        const isHidden = hiddenSeries[entry.dataKey];
                                        return (
                                          <button 
                                            key={`item-${index}`} 
                                            onClick={() => toggleSeries(entry.dataKey)}
                                            className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${isHidden ? 'opacity-40 grayscale' : 'opacity-100 hover:opacity-80'}`}
                                          >
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                            <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{entry.value}</span>
                                          </button>
                                        )
                                      })}
                                    </div>
                                  );
                                }}
                              />
                              {!hiddenSeries.copper && <Area type="monotone" dataKey="copper" name="Copper" stroke="#f97316" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCopper)" filter="url(#neonCopper)" />}
                              {!hiddenSeries.steel && <Area type="monotone" dataKey="steel" name="Steel" stroke="#a1a1aa" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSteel)" filter="url(#neonSteel)" />}
                            </AreaChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="w-full h-full bg-transparent" />
                        )}
                        <div className="mt-4 text-[10px] text-zinc-500 dark:text-zinc-400 font-mono tracking-widest text-center uppercase">
                          12-Month Historical Trading Trend ($/LB)
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>
          </div>
          <MaterialsGuide />
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-24 bg-zinc-900 dark:bg-zinc-950 text-white border-y border-zinc-200/20 dark:border-zinc-800/80 transition-colors duration-300 relative overflow-hidden">
        {/* Engineering Grid Mesh & Ambient Glow */}
        <div className="absolute inset-0 bg-grid-mesh opacity-15 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[150px] animate-pulse-glow pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px] animate-float pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-wide text-white mb-8">
              Built on <br/>Integrity
            </h2>
            <p className="mb-8 leading-relaxed max-w-lg text-zinc-400 text-sm md:text-base">
              For over three decades, we have partnered with leading manufacturers, fabricators, and demolition contractors. Our reputation is our most valuable asset.
            </p>
            <ul className="space-y-6">
              {[
                "Certified, transparent weighting processes on every load.",
                "Fast, reliable payment terms tailored to your business needs.",
                "Full environmental compliance and sustainability reporting.",
                "Dedicated account managers for high-volume producers."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4 font-mono uppercase tracking-wide text-xs sm:text-sm text-zinc-300">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <TiltCard 
              className="h-48 sm:h-56"
              data-cursor-label="STAT: 30+ YEARS"
            >
              <div className="bg-zinc-950/40 backdrop-blur-sm text-white p-8 border border-zinc-200/10 dark:border-zinc-800/80 transition-all duration-300 text-center flex flex-col justify-center items-center h-full shadow-2xl relative group rounded-sm text-zinc-600/30 hover:text-primary">
                 <CardCrosshairs refLabel="REF: STAT-YRS" lotLabel="LOT-ID: 1996/AAL" />
                 <div className="font-display text-5xl sm:text-6xl text-primary mb-2 group-hover:scale-105 transition-transform duration-300"><AnimatedNumber to={30} suffix="+" /></div>
                 <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Years in Business</div>
              </div>
            </TiltCard>
            <TiltCard 
              className="h-48 sm:h-56 mt-[-20px]"
              data-cursor-label="STAT: 500+ CLIENTS"
            >
              <div className="bg-zinc-950/40 backdrop-blur-sm text-white p-8 border border-zinc-200/10 dark:border-zinc-800/80 transition-all duration-300 text-center flex flex-col justify-center items-center h-full shadow-2xl relative group rounded-sm text-zinc-600/30 hover:text-primary">
                 <CardCrosshairs refLabel="REF: STAT-CLT" lotLabel="LOT-ID: 2026/CLT" />
                 <div className="font-display text-5xl sm:text-6xl text-primary mb-2 group-hover:scale-105 transition-transform duration-300"><AnimatedNumber to={500} suffix="+" /></div>
                 <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Active Clients</div>
              </div>
            </TiltCard>
            <TiltCard 
              className="h-48 sm:h-56 mt-[-20px]"
              data-cursor-label="STAT: 5M+ TONS"
            >
              <div className="bg-zinc-950/40 backdrop-blur-sm text-white p-8 border border-zinc-200/10 dark:border-zinc-800/80 transition-all duration-300 text-center flex flex-col justify-center items-center h-full shadow-2xl relative group rounded-sm overflow-hidden text-zinc-600/30 hover:text-primary">
                 <CardCrosshairs refLabel="REF: STAT-TON" lotLabel="LOT-ID: 2026/TON" />
                 {/* Diagonal strip background effect */}
                 <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.02)_10px,rgba(0,0,0,0.02)_20px)] dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)]"></div>
                 <div className="relative z-10 font-display text-4xl sm:text-5xl uppercase tracking-widest text-primary mb-2 group-hover:scale-105 transition-transform duration-300"><AnimatedNumber to={5} suffix="M+" /></div>
                 <div className="relative z-10 text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold mt-2">Tons Processed</div>
              </div>
            </TiltCard>
            <TiltCard 
              className="h-48 sm:h-56 mt-[-20px]"
              data-cursor-label="STAT: 24H SWAP"
            >
              <div className="bg-zinc-950/40 backdrop-blur-sm text-white p-8 border border-zinc-200/10 dark:border-zinc-800/80 transition-all duration-300 text-center flex flex-col justify-center items-center h-full shadow-2xl relative group rounded-sm text-zinc-600/30 hover:text-primary">
                 <CardCrosshairs refLabel="REF: STAT-SWP" lotLabel="LOT-ID: 2026/SWP" />
                 <div className="font-display text-5xl sm:text-6xl text-primary mb-2 group-hover:scale-105 transition-transform duration-300"><AnimatedNumber to={24} suffix="h" /></div>
                 <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Container Swap<br/>Time Guarantee</div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Company Article Section */}
      <section id="about" className="py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300 relative overflow-hidden">
        {/* Engineering Grid Mesh & Ambient Glow */}
        <div className="absolute inset-0 bg-grid-mesh opacity-20 pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-glow pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px] animate-float pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="mb-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-primary"></div>
              <span className="text-orange-700 dark:text-primary font-semibold tracking-widest uppercase text-xs">Company Profile</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-zinc-900 dark:text-white mb-6">
              About Amanat <br/><span className="text-zinc-500 dark:text-zinc-400">Al-Kalima Company</span>
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
                      <button onClick={() => setIsVideoPlaying(true)} className="w-20 h-20 bg-primary/90 hover:bg-orange-600 rounded-full flex items-center justify-center text-white z-20 pointer-events-auto transition-all duration-300 hover:scale-110 shadow-[0_0_30px_rgba(249,115,22,0.4)] backdrop-blur-sm border border-orange-400 active:scale-95" aria-label="Play facility tour video">
                        <Play className="w-8 h-8 ml-1 fill-white" />
                      </button>
                      <p className="mt-6 text-zinc-600 dark:text-zinc-400 text-sm tracking-widest uppercase font-semibold relative z-20">Watch Facility Tour</p>
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
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Official Contact Card */}
            <div className="mt-16 p-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center relative overflow-hidden shadow-md transition-colors duration-300">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none"></div>
               <div className="relative z-10 max-w-lg">
                 <h4 className="text-orange-700 dark:text-primary text-xs font-bold tracking-widest uppercase mb-4">Official Contact Details</h4>
                 <h3 className="text-zinc-900 dark:text-white text-xl md:text-2xl font-bold tracking-wider mb-1">AMANAT AL-KALIMA COMPANY</h3>
                 <p className="text-zinc-600 dark:text-zinc-400 font-sans tracking-wide mb-6 text-lg" dir="rtl">ﺷﺮﻛﺔ أﻣﺎﻧﺔ اﻟﻜﻠﻤﺔ</p>
                 <address className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base not-italic leading-relaxed flex flex-col gap-3">
                   <span>3508 Al Qatif 1, Unit 7260, Dammam 32517, Eastern Province, Kingdom Of Saudi Arabia</span>
                   <span className="font-sans text-zinc-600 dark:text-zinc-400" dir="rtl">اﻟﻘﻄﻴﻒ ٣٥٠٨ ١، وﺣﺪة ٧٢٦٠ ، اﻟﺪﻣﺎم ٣٢٥١٧ ، اﻟﻤﻨﻄﻘﺔ اﻟﺸﺮﻗﻴﺔ، اﻟﻤﻤﻠﻜﺔ اﻟﻌﺮﺑﻴﺔ اﻟﺴﻌﻮدﻳﺔ</span>
                 </address>
               </div>
               <div className="relative z-10 flex flex-col gap-4 text-sm md:text-base lg:text-right w-full lg:w-auto mt-2 lg:mt-0 border-t lg:border-t-0 border-zinc-100 dark:border-zinc-800 pt-6 lg:pt-0">
                 <a href="tel:+966551811700" className="flex items-center lg:justify-end gap-4 text-zinc-600 dark:text-zinc-300 hover:text-orange-700 dark:hover:text-white transition-colors group">
                    <span className="lg:order-2 bg-zinc-100 dark:bg-zinc-900 p-2.5 rounded group-hover:bg-primary transition-colors group-hover:text-white"><Phone className="w-5 h-5" /></span>
                    <span className="lg:order-1 font-semibold tracking-widest text-zinc-900 dark:text-zinc-300">+966 55 181 1700</span>
                 </a>
                 <a href="mailto:contact@aalkc.com" className="flex items-center lg:justify-end gap-4 text-zinc-600 dark:text-zinc-300 hover:text-orange-700 dark:hover:text-white transition-colors group">
                    <span className="lg:order-2 bg-zinc-100 dark:bg-zinc-900 p-2.5 rounded group-hover:bg-primary transition-colors group-hover:text-white"><Mail className="w-5 h-5" /></span>
                    <span className="lg:order-1 tracking-wider font-medium text-zinc-900 dark:text-zinc-300">contact@aalkc.com</span>
                 </a>
                 <a href="https://www.aalkc.com" target="_blank" rel="noopener noreferrer" className="flex items-center lg:justify-end gap-4 text-zinc-600 dark:text-zinc-300 hover:text-orange-700 dark:hover:text-white transition-colors group">
                    <span className="lg:order-2 bg-zinc-100 dark:bg-zinc-900 p-2.5 rounded group-hover:bg-primary transition-colors group-hover:text-white"><MapPin className="w-5 h-5" /></span>
                    <span className="lg:order-1 tracking-wider font-medium text-zinc-900 dark:text-zinc-300">www.aalkc.com</span>
                 </a>
               </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <CredentialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA / Contact Center */}
      <section id="contact" className="py-32 relative text-center bg-white dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
        {/* Grid Mesh & Ambient Glow */}
        <div className="absolute inset-0 bg-grid-mesh opacity-25 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-pulse-glow pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full bg-zinc-50 dark:bg-zinc-900/50 shadow-sm transition-colors duration-300">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-medium">Currently Buying</span>
            </div>
            
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight text-zinc-900 dark:text-white mb-10">
              Start Maximizing <br/><span className="text-zinc-500 dark:text-zinc-400">Your Scrap Value</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
               <a href="tel:+966551811700" className="bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-8 py-4 uppercase tracking-widest font-bold text-sm transition-colors flex items-center justify-center gap-3 shadow-md">
                 <Phone className="w-5 h-5" /> Call Now: +966 55 181 1700
               </a>
               <a href="mailto:contact@aalkc.com" className="bg-orange-700 hover:bg-orange-600 dark:bg-primary dark:hover:bg-orange-500 text-white dark:text-zinc-950 px-8 py-4 uppercase tracking-widest font-bold text-sm transition-colors flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(249,115,22,0.2)] dark:shadow-[0_0_15px_rgba(249,115,22,0.4)]">
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
                 title="Google Maps showing AALKC location"
               ></iframe>
               <div className="absolute bottom-6 left-6 z-20 bg-white dark:bg-zinc-950/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-4 shadow-2xl max-w-xs text-left transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-sm">
                      <MapPin className="w-5 h-5 text-orange-700 dark:text-primary" />
                    </div>
                    <div>
                      <h3 className="text-zinc-900 dark:text-white font-bold uppercase tracking-widest text-xs mb-2">Visit Our Yard</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-[10px] leading-relaxed uppercase tracking-wider">
                        3508 Al Qatif 1, Unit 7260, Dammam 32517, Eastern Province, KSA
                      </p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 text-center border-t border-zinc-100 dark:border-zinc-800 pt-16 transition-colors duration-300">
               <div>
                  <div className="w-12 h-12 mx-auto mb-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:border-primary/50 transition-colors shadow-sm">
                    <MapPin className="w-6 h-6 text-orange-700 dark:text-primary" />
                  </div>
                  <h3 className="font-semibold uppercase tracking-widest text-sm text-zinc-900 dark:text-white mb-2">Headquarters</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-3">
                    3508 Al Qatif 1, Unit 7260<br/>Dammam 32517, Eastern Province<br/>Kingdom Of Saudi Arabia
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans" dir="rtl">
                    اﻟﻘﻄﻴﻒ ٣٥٠٨ ١، وﺣﺪة ٧٢٦٠<br/>اﻟﺪﻣﺎم ٣٢٥١٧ ، اﻟﻤﻨﻄﻘﺔ اﻟﺸﺮﻗﻴﺔ<br/>اﻟﻤﻤﻠﻜﺔ اﻟﻌﺮﺑﻴﺔ اﻟﺴﻌﻮدﻳﺔ
                  </p>
               </div>
               <div className="flex flex-col items-center justify-start">
                  <Phone className="w-6 h-6 mx-auto mb-4 text-zinc-600 dark:text-zinc-400" />
                  <h3 className="font-semibold uppercase tracking-widest text-sm text-zinc-900 dark:text-white mb-2">Contact Us</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm flex flex-col gap-2">
                    <a href="tel:+966551811700" className="hover:text-orange-700 dark:hover:text-primary transition-colors">+966 55 181 1700</a>
                    <a href="mailto:contact@aalkc.com" className="hover:text-orange-700 dark:hover:text-primary transition-colors">contact@aalkc.com</a>
                    <a href="https://www.aalkc.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-700 dark:hover:text-primary transition-colors">www.aalkc.com</a>
                  </p>
               </div>
               <div>
                  <Truck className="w-6 h-6 mx-auto mb-4 text-zinc-600 dark:text-zinc-400" />
                  <h3 className="font-semibold uppercase tracking-widest text-sm text-zinc-900 dark:text-white mb-2">Operations</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    Premium metal scrap<br/>dealership and industrial<br/>dismantling services.
                  </p>
               </div>
            </div>

            {/* Request a Quote Form */}
            <div className="mt-20 max-w-2xl mx-auto border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-8 text-left relative overflow-hidden shadow-xl transition-colors duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] pointer-events-none"></div>
              <h3 className="font-display text-2xl uppercase tracking-widest text-zinc-900 dark:text-white mb-2">Request a Quote</h3>
              <p className="text-zinc-700 dark:text-zinc-400 mb-8 text-sm">Fill out the form below and our team will get back to you with competitive pricing for your materials.</p>
              
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
                    <label htmlFor="name" className="text-xs font-semibold tracking-wider uppercase text-zinc-600 dark:text-zinc-400 block">Name *</label>
                    <input value={formData.name} onChange={handleInputChange} type="text" id="name" name="name" autoComplete="name" className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-zinc-200 dark:border-zinc-800 focus:border-primary focus:ring-primary shadow-sm'} rounded-sm px-4 py-3 text-sm text-zinc-900 dark:text-zinc-300 focus:outline-none focus:ring-1 transition-all`} placeholder="Enter your name" />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-xs font-semibold tracking-wider uppercase text-zinc-600 dark:text-zinc-400 block">Company Name</label>
                    <input value={formData.company} onChange={handleInputChange} type="text" id="company" name="company" autoComplete="organization" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm px-4 py-3 text-sm text-zinc-900 dark:text-zinc-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm" placeholder="Enter your company" />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold tracking-wider uppercase text-zinc-600 dark:text-zinc-400 block">Email *</label>
                    <input value={formData.email} onChange={handleInputChange} type="email" id="email" name="email" autoComplete="email" className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-zinc-200 dark:border-zinc-800 focus:border-primary focus:ring-primary shadow-sm'} rounded-sm px-4 py-3 text-sm text-zinc-900 dark:text-zinc-300 focus:outline-none focus:ring-1 transition-all`} placeholder="your@email.com" />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold tracking-wider uppercase text-zinc-600 dark:text-zinc-400 block">Phone Number *</label>
                    <input value={formData.phone} onChange={handleInputChange} type="tel" id="phone" name="phone" autoComplete="tel" className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${formErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-zinc-200 dark:border-zinc-800 focus:border-primary focus:ring-primary shadow-sm'} rounded-sm px-4 py-3 text-sm text-zinc-900 dark:text-zinc-300 focus:outline-none focus:ring-1 transition-all`} placeholder="+966 5X XXX XXXX" />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold tracking-wider uppercase text-zinc-600 dark:text-zinc-400 block">Message *</label>
                  <textarea value={formData.message} onChange={handleInputChange} id="message" rows={4} className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${formErrors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-zinc-200 dark:border-zinc-800 focus:border-orange-700 focus:ring-orange-700 dark:focus:border-primary dark:focus:ring-primary shadow-sm'} rounded-sm px-4 py-3 text-sm text-zinc-900 dark:text-zinc-300 focus:outline-none focus:ring-1 transition-all resize-none`} placeholder="Please describe the materials, estimated quantity, and your location..."></textarea>
                  {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
                </div>
                
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-orange-700 hover:bg-orange-600 dark:bg-primary dark:hover:bg-orange-500 disabled:opacity-70 disabled:hover:bg-orange-700 dark:disabled:hover:bg-primary text-white dark:text-zinc-950 font-bold tracking-widest text-sm uppercase py-4 rounded-sm transition-colors mt-2 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-orange-700 dark:focus:ring-primary flex items-center justify-center gap-2"
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
      <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 py-12 text-center text-zinc-700 dark:text-zinc-400 text-sm uppercase tracking-widest font-medium transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
           <div className="flex flex-col items-center md:items-start gap-4">
             <div className="flex items-center gap-2 text-zinc-900 dark:text-white opacity-80 hover:opacity-100 transition-opacity">
               <img src={footerLogoImg} alt="AALKC" className="h-10 md:h-12 w-auto object-contain transition-all duration-300" />
             </div>
             <div className="text-left leading-relaxed">
               <div className="text-zinc-800 dark:text-zinc-200 text-xs tracking-widest font-semibold">AMANAT AL-KALIMA COMPANY</div>
               <div className="text-zinc-600 dark:text-zinc-400 text-xs tracking-wider mt-1 font-sans" dir="rtl">ﺷﺮﻛﺔ أﻣﺎﻧﺔ اﻟﻜﻠﻤﺔ</div>
             </div>
           </div>
           <div className="flex flex-col items-center gap-3">
             <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs text-zinc-600 dark:text-zinc-400">
               <a href="tel:+966551811700" className="hover:text-orange-700 dark:hover:text-primary transition-colors flex items-center gap-2 whitespace-nowrap"><Phone className="w-3 h-3" /> +966 55 181 1700</a>
               <span className="hidden sm:inline text-zinc-300 dark:text-zinc-800">|</span>
               <a href="mailto:contact@aalkc.com" className="hover:text-orange-700 dark:hover:text-primary transition-colors flex items-center gap-2"><Mail className="w-3 h-3" /> contact@aalkc.com</a>
               <span className="hidden sm:inline text-zinc-300 dark:text-zinc-800">|</span>
               <a href="https://www.aalkc.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-700 dark:hover:text-primary transition-colors hover:underline">www.aalkc.com</a>
             </div>
             <div className="mt-2 text-xs text-zinc-700 dark:text-zinc-400">&copy; {new Date().getFullYear()} Amanat Al-Kalima Company (AALKC). All Rights Reserved.</div>
           </div>
           <div className="flex flex-col gap-4 items-center md:items-end">
             <div className="flex gap-4 text-xs font-semibold text-zinc-700 dark:text-zinc-400">
               <a href="#about" className="hover:text-orange-700 dark:hover:text-primary transition-colors">About Company</a>
               <span className="text-zinc-300 dark:text-zinc-800">|</span>
               <a href="#privacy" className="hover:text-orange-700 dark:hover:text-primary transition-colors">Privacy Policy</a>
               <span className="text-zinc-300 dark:text-zinc-800">|</span>
               <a href="#terms" className="hover:text-orange-700 dark:hover:text-primary transition-colors">Terms of Service</a>
             </div>
             <div className="flex gap-4 text-zinc-700 dark:text-zinc-400">
               <a href="#" className="hover:text-orange-700 dark:hover:text-primary transition-colors hover:-translate-y-1 transform duration-300">
                 <Linkedin className="w-5 h-5" />
                 <span className="sr-only">LinkedIn</span>
               </a>
               <a href="#" className="hover:text-orange-700 dark:hover:text-primary transition-colors hover:-translate-y-1 transform duration-300">
                 <Twitter className="w-5 h-5" />
                 <span className="sr-only">Twitter</span>
               </a>
               <a href="#" className="hover:text-orange-700 dark:hover:text-primary transition-colors hover:-translate-y-1 transform duration-300">
                 <Facebook className="w-5 h-5" />
                 <span className="sr-only">Facebook</span>
               </a>
             </div>
           </div>
        </div>
      </footer>

      {/* Glassmorphic Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 md:hidden"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[320px] sm:max-w-[360px] bg-zinc-950/90 backdrop-blur-xl border-l border-zinc-800/80 z-50 md:hidden flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
              {/* Engineering accents inside drawer */}
              <CardCrosshairs refLabel="REF: MOB-DRAWER / KSA" lotLabel="LOT-ID: 2026/NAV" />
              
              {/* Upper Section */}
              <div className="p-6 relative z-10">
                {/* Drawer Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-850/80">
                  <div className="flex items-center gap-2">
                    <img src={logoImg} alt="AALKC" className="h-8 w-auto object-contain" />
                    <span className="font-display font-semibold tracking-wider text-[10px] text-zinc-400 uppercase">MENU</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-sm border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
                    aria-label="Close mobile menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Search Bar wrapper */}
                <div className="mb-8 select-none">
                  <SearchBar />
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {[
                    { label: 'Services', href: '#services' },
                    { label: 'Why Us', href: '#why-us' },
                    { label: 'Materials', href: '#materials' },
                    { label: 'FAQ', href: '#faq' },
                    { label: 'Contact', href: '#contact' },
                  ].map((link, idx) => (
                    <motion.a
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.04 }}
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`hover:text-primary transition-all py-2.5 border-b border-zinc-900/50 flex items-center justify-between group ${currentHash === link.href ? 'text-primary' : 'text-zinc-400'}`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Lower Section / Contact & Meta info */}
              <div className="p-6 bg-zinc-950/45 border-t border-zinc-900/80 relative z-10">
                {/* Active Indicator Pulse */}
                <div className="flex items-center gap-2 mb-4 font-mono text-[9px] tracking-widest text-zinc-500">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </span>
                  <span>DAMMAM HQ: ACTIVE | SCALE: CERTIFIED</span>
                </div>

                {/* Quick contact buttons */}
                <div className="flex flex-col gap-2.5 mb-6">
                  <a 
                    href="tel:+966551811700" 
                    className="flex items-center justify-center gap-2.5 bg-zinc-900 border border-zinc-800 text-white py-3 rounded-sm font-semibold text-xs tracking-widest uppercase hover:bg-zinc-850 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Direct
                  </a>
                  <a 
                    href="https://wa.me/966551811700" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-2.5 bg-green-700/20 border border-green-600/30 text-green-400 py-3 rounded-sm font-semibold text-xs tracking-widest uppercase hover:bg-green-700/30 transition-all shadow-[0_0_15px_rgba(34,197,94,0.05)]"
                  >
                    <Zap className="w-3.5 h-3.5" /> WhatsApp Rates
                  </a>
                </div>

                {/* Theme Toggle row */}
                <div className="flex items-center justify-between text-zinc-500 text-[10px] tracking-widest font-mono border-t border-zinc-900/50 pt-4">
                  <span>THEME SELECT</span>
                  <button 
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-zinc-800 bg-zinc-900 hover:border-zinc-700 text-zinc-300 transition-colors active:scale-95 cursor-pointer"
                  >
                    {theme === 'dark' ? (
                      <><Sun className="w-3 h-3 text-primary" /> LIGHT</>
                    ) : (
                      <><Moon className="w-3 h-3 text-zinc-400" /> DARK</>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {activeTickerTooltip && (
        <div 
          className="fixed bg-zinc-950/95 dark:bg-black/95 backdrop-blur-md border border-zinc-800 text-left p-3.5 rounded-md shadow-2xl z-[9999] pointer-events-none select-none transition-all duration-155 w-52"
          style={{
            left: `${activeTickerTooltip.x}px`,
            top: `${activeTickerTooltip.y - 12}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-[8px] font-mono text-zinc-500 tracking-wider">SYMBOL: {activeTickerTooltip.item.symbol}</span>
            <span className="text-[8px] font-mono text-zinc-500 tracking-wider">{activeTickerTooltip.item.contract}</span>
          </div>
          <div className="font-display text-[11px] font-bold text-white uppercase mb-1">{activeTickerTooltip.item.name}</div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs font-mono font-bold text-orange-400">{activeTickerTooltip.item.value}</span>
            <span className={`text-[9px] font-mono font-bold ${activeTickerTooltip.item.up ? 'text-green-400' : 'text-red-400'}`}>
              {activeTickerTooltip.item.up ? '↑' : '↓'} {activeTickerTooltip.item.change}
            </span>
          </div>
          <div className="h-10 w-full bg-zinc-900/50 rounded-sm border border-zinc-800/40 p-1 flex items-center justify-center relative overflow-hidden mb-1.5">
            <svg className="w-full h-full" viewBox="0 0 100 30" fill="none">
              <path 
                d={activeTickerTooltip.item.sparkline} 
                stroke={activeTickerTooltip.item.up ? '#22c55e' : '#ef4444'} 
                strokeWidth="1.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path 
                d={`${activeTickerTooltip.item.sparkline} L 100 30 L 0 30 Z`} 
                fill={activeTickerTooltip.item.up ? 'url(#tooltip-green-glow)' : 'url(#tooltip-red-glow)'}
                className="opacity-15"
              />
              <defs>
                <linearGradient id="tooltip-green-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="tooltip-red-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex justify-between text-[7.5px] font-mono text-zinc-500 uppercase tracking-widest">
            <span>24H LOW: {activeTickerTooltip.item.low}</span>
            <span>HIGH: {activeTickerTooltip.item.high}</span>
          </div>
        </div>
      )}

      <ScrollToTop />
      <PrecisionCursor />
    </div>
  );
}

