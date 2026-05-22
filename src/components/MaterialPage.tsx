import React, { useState } from 'react';
import { ChevronRight, ShieldCheck, Factory, Recycle, ArrowRight, Zap, Anvil, Feather, Phone, Mail, CheckCircle2, Calculator } from 'lucide-react';

const SPEC_DATA: Record<string, {
  properties: Record<string, string>;
  chemical: Record<string, string>;
  compliance: string[];
  whatsappMessage: string;
}> = {
  copper: {
    properties: {
      "Material Name": "Copper Scrap (Millberry / Barley)",
      "Density": "8.96 g/cm³",
      "Melting Point": "1085 °C (1984 °F)",
      "Electrical Conductivity": "101% IACS (Standard annealed)",
      "Thermal Conductivity": "401 W/(m·K)",
      "Recycled Yield": "≥ 99.5% typical recovery rate",
      "Classification": "Non-Ferrous Red Metal"
    },
    chemical: {
      "Copper (Cu)": "≥ 99.95% (Bare Bright Grade)",
      "Phosphorus (P)": "≤ 0.015%",
      "Iron (Fe)": "≤ 0.002%",
      "Sulfur (S)": "≤ 0.003%",
      "Lead (Pb)": "≤ 0.005%",
      "Zinc (Zn)": "≤ 0.003%"
    },
    compliance: [
      "ISO 9001:2015 Quality Inspected",
      "KSA Environmental License Compliant",
      "100% Radiation Screening Certified",
      "Industry Standard Compliance"
    ],
    whatsappMessage: "Hello AALKC team, I am looking for a spot price quote for Copper Scrap. Please provide the current rates for Grade #1 Millberry."
  },
  steel: {
    properties: {
      "Material Name": "Heavy Melting Steel (HMS 1 & 2)",
      "Density": "7.85 g/cm³",
      "Melting Point": "1370 - 1520 °C (2500 - 2760 °F)",
      "Tensile Strength": "400 - 550 MPa",
      "Magnetic Behavior": "Highly Ferromagnetic",
      "Recycled Yield": "≥ 95% typical furnace yield",
      "Classification": "Ferrous Heavy Scrap"
    },
    chemical: {
      "Iron (Fe)": "97.0 - 99.5% typical",
      "Carbon (C)": "0.15 - 0.30% (Medium Carbon)",
      "Manganese (Mn)": "0.60 - 0.90%",
      "Silicon (Si)": "0.15 - 0.30%",
      "Phosphorus (P)": "≤ 0.04%",
      "Sulfur (S)": "≤ 0.04%"
    },
    compliance: [
      "ISO 9001:2015 Quality Inspected",
      "Chamber of Commerce Verified License",
      "Heavy Shear Dimension Standardized",
      "Environmental Waste Management Compliant"
    ],
    whatsappMessage: "Hello AALKC team, I want to inquire about selling/purchasing Heavy Melting Steel (HMS 1 & 2). Please share the current market price per ton."
  },
  aluminum: {
    properties: {
      "Material Name": "Aluminum Extrusions (6061 / 6063)",
      "Density": "2.70 g/cm³",
      "Melting Point": "660 °C (1220 °F)",
      "Thermal Conductivity": "205 W/(m·K)",
      "Tensile Strength": "130 - 310 MPa (alloy dependent)",
      "Recycled Yield": "≥ 98% typical recovery",
      "Classification": "Non-Ferrous Light Metal"
    },
    chemical: {
      "Aluminum (Al)": "97.2 - 99.5% typical",
      "Silicon (Si)": "0.20 - 0.60%",
      "Magnesium (Mg)": "0.45 - 0.90%",
      "Iron (Fe)": "≤ 0.35%",
      "Copper (Cu)": "≤ 0.10%",
      "Zinc (Zn)": "≤ 0.10%"
    },
    compliance: [
      "ISO 14001:2015 Eco Management",
      "KSA Ministry of Environment Authorized",
      "100% Alloy Inspected (XRF Analyzed)",
      "Industry Grade Standard"
    ],
    whatsappMessage: "Hello AALKC team, I would like to get a quote for Aluminum Scrap (Extrusions/Rims). Please advise."
  }
};

export default function MaterialPage({ currentHash }: { currentHash: string }) {
  const isCopper = currentHash === '#material-copper';
  const isSteel = currentHash === '#material-steel';
  const isAluminum = currentHash === '#material-aluminum';

  if (!isCopper && !isSteel && !isAluminum) return null;

  const materialKey = isCopper ? 'copper' : isSteel ? 'steel' : 'aluminum';
  const spec = SPEC_DATA[materialKey];

  const data = {
    title: isCopper ? "Copper Scrap" : isSteel ? "Steel Scrap" : "Aluminum Scrap",
    icon: isCopper ? <Zap className="w-12 h-12 md:w-16 md:h-16 text-[#f97316] drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" /> 
      : isSteel ? <Anvil className="w-12 h-12 md:w-16 md:h-16 text-[#a1a1aa] drop-shadow-[0_0_15px_rgba(161,161,170,0.5)]" />
      : <Feather className="w-12 h-12 md:w-16 md:h-16 text-[#38bdf8] drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />,
    priceRange: isCopper ? "$3.80 - $5.10 / lb" : isSteel ? "$1.20 - $1.65 / lb" : "$1.05 - $1.55 / lb",
    desc: isCopper ? "High thermal & electrical conductivity, excellent corrosion resistance. A highly sought-after non-ferrous metal in global markets." 
      : isSteel ? "High tensile strength, magnetic (ferrous), highly durable. The backbone of modern construction and manufacturing." 
      : "Lightweight, non-magnetic, corrosion-resistant. Crucial for aerospace, automotive, and packaging industries."
  };

  const accentTextClass = isCopper ? 'text-[#f97316]' : isSteel ? 'text-[#a1a1aa]' : 'text-[#38bdf8]';
  const accentBorderHover = isCopper ? 'hover:border-[#f97316]/50' : isSteel ? 'hover:border-[#a1a1aa]/50' : 'hover:border-[#38bdf8]/50';
  const accentGlow = isCopper ? 'hover:shadow-[0_0_30px_rgba(249,115,22,0.12)]' : isSteel ? 'hover:shadow-[0_0_30px_rgba(161,161,170,0.12)]' : 'hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]';
  const accentBg = isCopper ? 'bg-[#f97316]/10' : isSteel ? 'bg-[#a1a1aa]/10' : 'bg-[#38bdf8]/10';
  const accentOrb = isCopper ? 'bg-primary/10' : isSteel ? 'bg-zinc-400/10' : 'bg-sky-400/10';

  // Calculator States
  const [calcGrade, setCalcGrade] = useState<string>(
    isCopper ? "millberry" : isSteel ? "hms1" : "extrusion"
  );
  const [calcWeight, setCalcWeight] = useState<number>(5.0);
  const [calcCurrency, setCalcCurrency] = useState<'SAR' | 'USD'>('SAR');

  const gradeRates: Record<string, { name: string; rateUSD: number }> = {
    // Copper
    millberry: { name: "Grade #1 Millberry (Cu ≥ 99.95%)", rateUSD: 10690 },
    birchcliff: { name: "Grade #2 Birch/Cliff (Cu 96%)", rateUSD: 9800 },
    insulated: { name: "Insulated Copper Wire (Cu 45%)", rateUSD: 4500 },
    // Steel
    hms1: { name: "Heavy Melting Steel HMS 1", rateUSD: 3307 },
    hms2: { name: "Heavy Melting Steel HMS 2", rateUSD: 3050 },
    plate: { name: "Plate & Structural Steel Scrap", rateUSD: 3550 },
    // Aluminum
    extrusion: { name: "Aluminum Extrusions (6063)", rateUSD: 2976 },
    wheels: { name: "Aluminum Wheels (Clean Rims)", rateUSD: 2750 },
    tense: { name: "Tense/Taint Sheet Aluminum", rateUSD: 2300 }
  };

  const activeGrades = isCopper 
    ? ["millberry", "birchcliff", "insulated"] 
    : isSteel 
      ? ["hms1", "hms2", "plate"] 
      : ["extrusion", "wheels", "tense"];

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 overflow-hidden pt-32 pb-24 transition-colors duration-300">
      {/* Background Mesh and Orbs */}
      <div className="absolute inset-0 bg-grid-mesh opacity-20 pointer-events-none"></div>
      <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] ${accentOrb} rounded-full blur-[150px] animate-pulse-glow pointer-events-none`}></div>
      <div className="absolute bottom-1/3 right-10 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Back Button */}
        <a href="#materials" className="inline-flex items-center gap-2 text-orange-700 dark:text-primary hover:text-zinc-950 dark:hover:text-white uppercase tracking-widest text-xs font-semibold mb-8 transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to Materials
        </a>

        {/* Main Title & Description */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 pb-8 border-b border-zinc-200 dark:border-zinc-800/80">
          <div className="flex items-center gap-6">
            <div className="shrink-0 p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 flex items-center justify-center shadow-inner">
              {data.icon}
            </div>
            <div>
              <span className="text-[10px] text-orange-700 dark:text-primary font-mono uppercase tracking-[0.3em] font-bold block mb-1">Industrial Resource</span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-zinc-900 dark:text-white mb-0 font-semibold">
                {data.title}
              </h1>
            </div>
          </div>
          <div className="max-w-md lg:text-right">
            <div className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-1">Target Price Range</div>
            <div className="text-2xl sm:text-3xl text-orange-700 dark:text-primary font-mono font-bold tracking-wider">{data.priceRange}</div>
            <div className="text-[9px] text-zinc-550 dark:text-zinc-400 font-mono mt-1">LME INDEXED | SPOT KSA MARKET RATES APPLY</div>
          </div>
        </div>

        {/* Grid Dashboard */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Physical properties */}
          <div className={`tech-card border border-zinc-200/80 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/40 backdrop-blur-sm p-6 sm:p-8 rounded-sm shadow-sm relative overflow-hidden group hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 text-zinc-400/25 dark:text-zinc-750/30 ${isCopper ? 'hover:text-[#f97316]' : isSteel ? 'hover:text-[#a1a1aa]' : 'hover:text-[#38bdf8]'} ${accentGlow}`}>
            {/* Tech Blueprint Corners */}
            <div className="tech-corner tech-corner-tl"></div>
            <div className="tech-corner tech-corner-tr"></div>
            <div className="tech-corner tech-corner-bl"></div>
            <div className="tech-corner tech-corner-br"></div>
            

            
            <div className={`absolute top-0 right-0 w-24 h-24 ${accentBg} blur-2xl rounded-full`}></div>
            <h3 className="text-lg font-display uppercase tracking-widest text-zinc-900 dark:text-white mb-6 flex items-center gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800/60 relative z-10">
              <ShieldCheck className={`w-5 h-5 ${accentTextClass}`} /> Physical Properties
            </h3>
            <div className="space-y-2.5 font-sans text-sm relative z-10">
              {Object.entries(spec.properties).map(([label, val], idx) => (
                <div key={idx} className="flex justify-between items-center py-2 px-3 border-b border-zinc-200/40 dark:border-zinc-850/20 last:border-0 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/30 transition-colors rounded-sm">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">{label}</span>
                  <span className="font-semibold text-zinc-855 dark:text-zinc-200 text-right max-w-xs">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chemical properties */}
          <div className={`tech-card border border-zinc-200/80 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/40 backdrop-blur-sm p-6 sm:p-8 rounded-sm shadow-sm relative overflow-hidden group hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 text-zinc-400/25 dark:text-zinc-750/30 ${isCopper ? 'hover:text-[#f97316]' : isSteel ? 'hover:text-[#a1a1aa]' : 'hover:text-[#38bdf8]'} ${accentGlow}`}>
            {/* Tech Blueprint Corners */}
            <div className="tech-corner tech-corner-tl"></div>
            <div className="tech-corner tech-corner-tr"></div>
            <div className="tech-corner tech-corner-bl"></div>
            <div className="tech-corner tech-corner-br"></div>
            


            <div className={`absolute top-0 right-0 w-24 h-24 ${accentBg} blur-2xl rounded-full`}></div>
            <h3 className="text-lg font-display uppercase tracking-widest text-zinc-900 dark:text-white mb-6 flex items-center gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800/60 relative z-10">
              <Factory className={`w-5 h-5 ${accentTextClass}`} /> Chemical Composition
            </h3>
            <div className="space-y-2.5 font-sans text-sm relative z-10">
              {Object.entries(spec.chemical).map(([label, val], idx) => (
                <div key={idx} className="flex justify-between items-center py-2 px-3 border-b border-zinc-200/40 dark:border-zinc-850/20 last:border-0 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/30 transition-colors rounded-sm">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">{label}</span>
                  <span className="font-bold text-zinc-855 dark:text-zinc-200 text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compliance Section */}
        <div className={`tech-card border border-zinc-200/80 dark:border-zinc-800/60 bg-zinc-50/30 dark:bg-zinc-950/20 backdrop-blur-sm p-8 rounded-sm shadow-sm mb-12 text-zinc-400/25 dark:text-zinc-750/30 ${isCopper ? 'hover:text-[#f97316]' : isSteel ? 'hover:text-[#a1a1aa]' : 'hover:text-[#38bdf8]'} ${accentGlow} transition-all duration-300`}>
          {/* Tech Blueprint Corners */}
          <div className="tech-corner tech-corner-tl"></div>
          <div className="tech-corner tech-corner-tr"></div>
          <div className="tech-corner tech-corner-bl"></div>
          <div className="tech-corner tech-corner-br"></div>
          


          <h3 className="text-lg font-display uppercase tracking-widest text-zinc-900 dark:text-white mb-6 flex items-center gap-3 relative z-10">
            <Recycle className={`w-5 h-5 ${accentTextClass}`} /> Grade Inspection & Compliance
          </h3>
          <p className="text-zinc-650 dark:text-zinc-400 mb-8 text-sm leading-relaxed max-w-3xl relative z-10">
            {data.desc} Every dispatch lot undergoes structural grading, X-Ray Fluorescence (XRF) alloy verification, and radiation screening at our Dammam scrap terminal.
          </p>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {spec.compliance.map((item, idx) => (
              <div key={idx} className={`p-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-sm flex items-start gap-3 transition-colors ${accentBorderHover}`}>
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-zinc-700 dark:text-zinc-300 font-mono text-xs uppercase tracking-wide leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spot Payout Calculator */}
        <div className={`tech-card border border-zinc-200/80 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/40 backdrop-blur-sm p-8 rounded-sm shadow-lg mb-12 relative overflow-hidden text-zinc-400/25 dark:text-zinc-750/30 ${isCopper ? 'hover:text-[#f97316]' : isSteel ? 'hover:text-[#a1a1aa]' : 'hover:text-[#38bdf8]'} ${accentGlow} transition-all duration-300`}>
          {/* Tech Blueprint Corners */}
          <div className="tech-corner tech-corner-tl"></div>
          <div className="tech-corner tech-corner-tr"></div>
          <div className="tech-corner tech-corner-bl"></div>
          <div className="tech-corner tech-corner-br"></div>
          


          <div className="relative z-10">
            <h3 className="text-lg font-display uppercase tracking-widest text-zinc-900 dark:text-white mb-6 flex items-center gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800/60">
              <Calculator className={`w-5 h-5 ${accentTextClass}`} /> {data.title} Payout Estimator
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8 text-zinc-700 dark:text-zinc-300">
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-1.5 font-bold">Select Sub-Grade</label>
                <select 
                  value={calcGrade} 
                  onChange={(e) => setCalcGrade(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white px-3 py-2.5 rounded text-xs focus:border-primary outline-none transition-colors"
                >
                  {activeGrades.map((g) => (
                    <option key={g} value={g}>{gradeRates[g].name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-1.5 font-bold">Currency</label>
                <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded border border-zinc-200 dark:border-zinc-800">
                  <button 
                    type="button"
                    onClick={() => setCalcCurrency('SAR')}
                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase transition-all rounded-sm ${calcCurrency === 'SAR' ? 'bg-orange-700 dark:bg-primary text-white dark:text-zinc-950 shadow-sm' : 'text-zinc-500'}`}
                  >
                    SAR
                  </button>
                  <button 
                    type="button"
                    onClick={() => setCalcCurrency('USD')}
                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase transition-all rounded-sm ${calcCurrency === 'USD' ? 'bg-orange-700 dark:bg-primary text-white dark:text-zinc-950 shadow-sm' : 'text-zinc-500'}`}
                  >
                    USD
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase font-bold">Weight (Metric Tons)</label>
                  <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">{calcWeight.toFixed(1)} Tons</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="50" 
                  step="0.1"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary mt-2.5"
                />
              </div>
            </div>

            {/* Calculations and Output */}
            {(() => {
              const activeGradeRateUSD = gradeRates[calcGrade].rateUSD;
              const exchangeRate = 3.75;
              const baseRate = calcCurrency === 'SAR' ? activeGradeRateUSD * exchangeRate : activeGradeRateUSD;
              
              let bonusPercent = 0;
              let bonusLabel = "None";
              if (calcWeight >= 25) {
                bonusPercent = 0.08;
                bonusLabel = "+8% (Premium Tier)";
              } else if (calcWeight >= 10) {
                bonusPercent = 0.05;
                bonusLabel = "+5% (Bulk Tier 2)";
              } else if (calcWeight >= 5) {
                bonusPercent = 0.03;
                bonusLabel = "+3% (Bulk Tier 1)";
              }

              const rawTotal = baseRate * calcWeight;
              const bonusAmount = rawTotal * bonusPercent;
              const grandTotal = rawTotal + bonusAmount;

              const whatsAppMsg = `Hello AALKC Team, I used the calculator for ${data.title} (${gradeRates[calcGrade].name}) and estimated ${calcWeight.toFixed(1)} Tons at a payout of ${grandTotal.toLocaleString(undefined, {maximumFractionDigits:2})} ${calcCurrency}. I'd like to lock in this rate and book an inspection.`;

              return (
                <div className="grid md:grid-cols-2 gap-6 items-center bg-white dark:bg-zinc-950 p-6 border border-zinc-200 dark:border-zinc-800/80 rounded-sm">
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                      <span className="text-zinc-500 uppercase tracking-widest text-[9px]">Selected Grade:</span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-200 text-right">{gradeRates[calcGrade].name}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                      <span className="text-zinc-500 uppercase tracking-widest text-[9px]">Base Rate:</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                        {baseRate.toLocaleString(undefined, {maximumFractionDigits: 2})} {calcCurrency}/Ton
                      </span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-zinc-500 uppercase tracking-widest text-[9px]">Bulk Bonus:</span>
                      <span className={`font-bold ${bonusPercent > 0 ? 'text-green-600 dark:text-green-400' : 'text-zinc-500'}`}>
                        {bonusLabel}
                      </span>
                    </div>
                  </div>

                  <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-zinc-200 dark:border-zinc-800 pt-6 md:pt-0 md:pl-6 flex flex-col items-center md:items-end justify-center">
                    <span className="text-[10px] text-zinc-550 dark:text-zinc-400 font-mono tracking-widest uppercase font-bold">Estimated Total Payout</span>
                    <span className="text-3xl font-mono font-extrabold text-orange-700 dark:text-primary tracking-wider mt-1 mb-4">
                      {grandTotal.toLocaleString(undefined, {maximumFractionDigits: 2})} {calcCurrency}
                    </span>

                    <a 
                      href={`https://wa.me/966551811700?text=${encodeURIComponent(whatsAppMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-bold tracking-widest text-xs uppercase px-6 py-3 rounded-sm transition-all hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

        {/* Calls to Action */}
        <div className={`tech-card border border-zinc-200/80 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 p-8 rounded-sm shadow-lg flex flex-col lg:flex-row justify-between items-center gap-8 relative overflow-hidden text-zinc-400/25 dark:text-zinc-750/30 hover:text-primary ${accentGlow} transition-all duration-300`}>
          {/* Tech Blueprint Corners */}
          <div className="tech-corner tech-corner-tl"></div>
          <div className="tech-corner tech-corner-tr"></div>
          <div className="tech-corner tech-corner-bl"></div>
          <div className="tech-corner tech-corner-br"></div>
          
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.03] to-transparent pointer-events-none"></div>
          <div className="relative z-10 text-center lg:text-left">
            <h4 className="text-orange-700 dark:text-primary text-xs font-bold tracking-widest uppercase mb-1">Direct Spot Trading</h4>
            <h3 className="text-zinc-900 dark:text-white text-xl sm:text-2xl font-bold tracking-wide uppercase">Request Live Custom Rates</h3>
            <p className="text-zinc-550 dark:text-zinc-400 text-xs mt-1">Connect with our trading department to lock in rates for your load.</p>
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* WhatsApp Spot Quote */}
            <a 
              href={`https://wa.me/966551811700?text=${encodeURIComponent(spec.whatsappMessage)}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 sm:flex-initial bg-green-600 hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-500 text-white px-6 py-4 uppercase tracking-widest font-bold text-xs transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 rounded-sm shadow-md"
            >
              <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.008c6.56 0 11.895-5.336 11.898-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Rates
            </a>

            {/* Call Trading */}
            <a 
              href="tel:+966551811700" 
              className="flex-1 sm:flex-initial bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-6 py-4 uppercase tracking-widest font-bold text-xs transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 rounded-sm shadow-md"
            >
              <Phone className="w-4 h-4 shrink-0" /> Call Trading
            </a>

            {/* Email quote */}
            <a 
              href="mailto:contact@aalkc.com" 
              className="flex-1 sm:flex-initial bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white px-6 py-4 uppercase tracking-widest font-bold text-xs transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 rounded-sm"
            >
              <Mail className="w-4 h-4 shrink-0" /> Email Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
