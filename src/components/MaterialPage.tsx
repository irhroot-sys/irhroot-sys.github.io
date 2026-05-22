import React from 'react';
import { ChevronRight, ShieldCheck, Factory, Recycle, ArrowRight, Zap, Anvil, Feather } from 'lucide-react';

export default function MaterialPage({ currentHash }: { currentHash: string }) {
  const isCopper = currentHash === '#material-copper';
  const isSteel = currentHash === '#material-steel';
  const isAluminum = currentHash === '#material-aluminum';
  
  if (!isCopper && !isSteel && !isAluminum) return null;

  const data = {
    title: isCopper ? "Copper Scrap" : isSteel ? "Steel Scrap" : "Aluminum Scrap",
    icon: isCopper ? <Zap className="w-12 h-12 md:w-16 md:h-16 text-[#f97316] drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" /> 
      : isSteel ? <Anvil className="w-12 h-12 md:w-16 md:h-16 text-[#a1a1aa] drop-shadow-[0_0_15px_rgba(161,161,170,0.5)]" />
      : <Feather className="w-12 h-12 md:w-16 md:h-16 text-[#38bdf8] drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />,
    properties: isCopper ? "High thermal & electrical conductivity, excellent corrosion resistance. A highly sought-after non-ferrous metal in global markets." 
      : isSteel ? "High tensile strength, magnetic (ferrous), highly durable. The backbone of modern construction and manufacturing." 
      : "Lightweight, non-magnetic, corrosion-resistant. Crucial for aerospace, automotive, and packaging industries.",
    uses: isCopper ? "Electrical wiring, telecommunications cables, motors, plumbing pipes, and electronic components." 
      : isSteel ? "Construction beams, vehicles, appliances, industrial machinery, and infrastructure projects." 
      : "Automotive parts, aerospace components, cans, window frames, and consumer electronics.",
    criteria: isCopper ? "We accept Bare Bright (#1), #2 Copper, insulated wire, and copper tubing. Must be free of excessive brass or steel attachments." 
      : isSteel ? "Sorted by grade (e.g., Heavy Melt, Plate & Structural). Must be free of excessive rust, dirt, or non-metallic attachments." 
      : "Extrusions, cast aluminum, sheet, and aluminum cans. Must be clean and free of iron or zinc attachments.",
    priceTrend: isCopper ? "Highly volatile but trending upward due to electrification demand. Current range: $3.80 - $5.10 / lb." 
      : isSteel ? "Steady global demand creates stable pricing. Current range: $1.20 - $1.65 / lb." 
      : "Moderate fluctuation based on packaging and auto manufacturing demand. Current range: $1.05 - $1.55 / lb."
  };

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 min-h-screen">
      <a href="#materials" className="inline-flex items-center gap-2 text-orange-700 dark:text-primary hover:text-zinc-900 dark:hover:text-white uppercase tracking-widest text-xs font-semibold mb-8 transition-colors">
        <ChevronRight className="w-4 h-4 rotate-180" /> Back to Materials
      </a>
      <div className="flex items-center gap-6 mb-6">
        <div className="shrink-0 p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
          {data.icon}
        </div>
        <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tight text-zinc-900 dark:text-white mb-0">
          {data.title}
        </h1>
      </div>
      <div className="prose dark:prose-invert prose-zinc max-w-none text-zinc-600 dark:text-zinc-400">
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 mb-8 relative overflow-hidden shadow-sm">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] pointer-events-none"></div>
           <div className="relative z-10">
             <h3 className="text-xl font-display uppercase tracking-widest text-zinc-900 dark:text-white mb-4">Current Market Trend</h3>
             <p className="text-xl text-orange-700 dark:text-primary font-mono font-bold tracking-wider">{data.priceTrend}</p>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 shadow-sm">
            <h3 className="text-lg font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-orange-700 dark:text-primary" /> Properties
            </h3>
            <p className="leading-relaxed text-sm">{data.properties}</p>
          </div>
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 shadow-sm">
            <h3 className="text-lg font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
              <Factory className="w-5 h-5 text-orange-700 dark:text-primary" /> Common Uses
            </h3>
            <p className="leading-relaxed text-sm">{data.uses}</p>
          </div>
        </div>

        <div className="p-8 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 shadow-sm">
          <h3 className="text-lg font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
            <Recycle className="w-5 h-5 text-orange-700 dark:text-primary" /> AALKC Purchasing Criteria
          </h3>
          <p className="leading-relaxed">{data.criteria}</p>
          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <a href="#contact" className="inline-flex items-center gap-2 bg-primary hover:bg-orange-600 text-white font-bold tracking-widest text-xs uppercase px-6 py-3 rounded-sm transition-colors shadow-lg">
              Request Spot Pricing <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
