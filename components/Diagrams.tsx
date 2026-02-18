/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Activity, Server, Database, CheckCircle, AlertCircle, BarChart2, Brain, Rocket, Search, ArrowRight } from 'lucide-react';

// --- SECURITY ARCHITECTURE DIAGRAM ---
export const SecurityArchitectureDiagram: React.FC = () => {
  const [activeRequests, setActiveRequests] = useState<number[]>([]);
  const [hoveredControl, setHoveredControl] = useState<number | null>(null);
  
  const adjacency: Record<number, number[]> = {
    0: [0, 1],
    1: [0, 2],
    2: [1, 3],
    3: [2, 3],
    4: [0, 1, 2, 3], 
  };

  const controlDetails = [
    { id: 0, title: "AUTH", desc: "Verifies user identity and permissions via SSO & MFA." },
    { id: 1, title: "ENC", desc: "Enforces AES-256 encryption for data at rest and in transit." },
    { id: 2, title: "LOG", desc: "Records immutable ledgers of every data access event." },
    { id: 3, title: "SOC2", desc: "Automated policy checks and governance monitoring." },
  ];

  const toggleRequest = (id: number) => {
    setActiveRequests(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const activeControls = [0, 1, 2, 3].filter(controlId => {
    let hasTraffic = false;
    Object.entries(adjacency).forEach(([endpointId, controls]) => {
        if (activeRequests.includes(parseInt(endpointId)) && controls.includes(controlId)) {
            hasTraffic = true;
        }
    });
    return hasTraffic;
  });

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-int-navy/10 my-8" data-testid="diagram-security">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="text-int-teal" size={24} />
        <h3 className="font-serif text-xl text-int-navy">Zero-Trust Data Venue</h3>
      </div>
      <p className="text-sm text-gray-500 mb-6 text-center max-w-md">
        Click the <strong>Endpoints</strong> to simulate data requests. Hover over <strong>Security Controls</strong> to see their function.
      </p>
      
      <div className="relative w-64 h-64 bg-int-cream rounded-lg border border-int-navy/10 p-4 flex flex-wrap justify-between content-between">
         {/* Grid Lines */}
         <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
            <div className="w-2/3 h-2/3 border border-int-navy"></div>
            <div className="absolute w-full h-[1px] bg-int-navy"></div>
            <div className="absolute h-full w-[1px] bg-int-navy"></div>
         </div>

         {/* Security Controls */}
         {[
             {id: 0, x: '50%', y: '20%', color: 'bg-int-teal'},
             {id: 1, x: '20%', y: '50%', color: 'bg-int-gold'},
             {id: 2, x: '80%', y: '50%', color: 'bg-int-gold'},
             {id: 3, x: '50%', y: '80%', color: 'bg-int-teal'},
         ].map(stab => {
             const detail = controlDetails.find(d => d.id === stab.id);
             return (
               <motion.div
                  key={`ctrl-${stab.id}`}
                  data-testid={`security-control-${detail?.title}`}
                  className={`absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center text-white text-[10px] font-bold rounded-lg shadow-sm transition-all duration-300 cursor-help ${hoveredControl === stab.id ? 'z-50 scale-110' : 'z-30'} ${activeControls.includes(stab.id) ? stab.color + ' opacity-100 ring-4 ring-offset-2 ring-int-cream' : 'bg-gray-300 opacity-50'}`}
                  style={{ left: stab.x, top: stab.y }}
                  onMouseEnter={() => setHoveredControl(stab.id)}
                  onMouseLeave={() => setHoveredControl(null)}
               >
                   {activeControls.includes(stab.id) ? <CheckCircle size={16} /> : <Lock size={14} />}
                   
                   <AnimatePresence>
                     {hoveredControl === stab.id && detail && (
                       <motion.div
                         data-testid={`tooltip-security-${detail.title}`}
                         initial={{ opacity: 0, y: 10, scale: 0.9 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         exit={{ opacity: 0, y: 5, scale: 0.9 }}
                         transition={{ duration: 0.15 }}
                         className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 bg-slate-900 text-white text-[10px] leading-tight p-3 rounded-md shadow-2xl pointer-events-none"
                       >
                          <div className="text-int-gold font-bold mb-1 border-b border-white/10 pb-1 uppercase tracking-wider">{detail.title}</div>
                          <div className="text-gray-200 mt-1">{detail.desc}</div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                       </motion.div>
                     )}
                   </AnimatePresence>
               </motion.div>
             );
         })}

         {/* Client Endpoints */}
         {[
             {id: 0, x: '20%', y: '20%'}, {id: 1, x: '80%', y: '20%'},
             {id: 4, x: '50%', y: '50%'}, 
             {id: 2, x: '20%', y: '80%'}, {id: 3, x: '80%', y: '80%'},
         ].map(q => (
             <button
                key={`end-${q.id}`}
                data-testid={`security-endpoint-${q.id}`}
                onClick={() => toggleRequest(q.id)}
                className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 z-20 ${activeRequests.includes(q.id) ? 'bg-int-navy border-int-navy text-white shadow-lg' : 'bg-white border-gray-300 hover:border-int-teal'}`}
                style={{ left: q.x, top: q.y }}
             >
                {activeRequests.includes(q.id) ? <Activity size={14} /> : <div className="w-2 h-2 rounded-full bg-gray-300"></div>}
             </button>
         ))}
      </div>

      <div className="mt-6 flex items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-int-navy"></div> Active Data</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-int-teal"></div> Governance</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-int-gold"></div> Encryption</div>
      </div>
      
      <div className="mt-4 h-6 text-sm font-serif italic text-int-navy">
        {activeRequests.length === 0 ? "System Idle. Zero Trust Active." : `Securing ${activeRequests.length} Data Streams via ${activeControls.length} Controls.`}
      </div>
    </div>
  );
};

// --- SERVICE PIPELINE DIAGRAM ---
export const AIServicePipelineDiagram: React.FC = () => {
  const [step, setStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stages = [
      { id: 0, label: "Assessment", icon: <Search size={24} />, description: "Identifying high-ROI AI opportunities and data readiness assessments." },
      { id: 1, label: "Architecture", icon: <Brain size={24} />, description: "Designing secure, isolated multi-tenant data venue infrastructure." },
      { id: 2, label: "Deployment", icon: <Server size={24} />, description: "Swift provisioning of SOC 2 compliant production environments." },
      { id: 3, label: "Optimization", icon: <Rocket size={24} />, description: "Continuous cost monitoring and performance refinement." }
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-int-navy rounded-xl border border-int-teal/20 my-8 shadow-2xl overflow-visible" data-testid="diagram-pipeline">
      <h3 className="font-serif text-xl mb-4 text-white">Managed AI Lifecycle</h3>
      <p className="text-sm text-gray-300 mb-8 text-center max-w-md">
        From initial readiness assessment to continuous model optimization, we handle the entire infrastructure pipeline.
      </p>

      <div className="relative w-full max-w-lg flex items-center justify-between mb-8 px-4">
        {stages.map((stage, i) => (
            <React.Fragment key={stage.id}>
                <motion.div 
                  className="flex flex-col items-center gap-3 relative z-10"
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                  data-testid={`pipeline-stage-${stage.label}`}
                >
                    <AnimatePresence>
                      {hoveredStep === i && (
                        <motion.div
                          data-testid={`tooltip-pipeline-${stage.label}`}
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.9 }}
                          className="absolute bottom-full mb-4 w-48 bg-slate-900 border border-int-gold/30 text-white text-[10px] leading-snug p-3 rounded-lg shadow-2xl z-[100] pointer-events-none"
                        >
                           <p className="font-bold text-int-gold uppercase tracking-widest mb-1 border-b border-white/10 pb-1">{stage.label}</p>
                           <p className="text-gray-300 pt-1 leading-relaxed">{stage.description}</p>
                           <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div 
                        className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-help ${step === i ? 'border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.2)] ' + (i===1 ? 'bg-int-teal' : i===2 ? 'bg-int-gold' : i===3 ? 'bg-int-navy border-int-teal' : 'bg-gray-800') : 'border-gray-600 text-gray-500 bg-int-dark'} ${hoveredStep === i ? 'border-int-gold text-white shadow-[0_0_20px_rgba(197,160,89,0.4)]' : ''}`}
                        animate={{ 
                          scale: hoveredStep === i ? 1.15 : (step === i ? 1.1 : 1),
                          y: step === i ? -4 : 0
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        {stage.icon}
                    </motion.div>
                    <span className={`text-[10px] uppercase font-bold tracking-wider transition-colors duration-300 ${step === i || hoveredStep === i ? 'text-white' : 'text-gray-600'}`}>
                        {stage.label}
                    </span>
                </motion.div>
                {i < stages.length - 1 && (
                    <div className="flex-1 h-[2px] bg-gray-700 mx-2 relative overflow-hidden">
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-int-teal to-int-gold"
                            initial={{ x: '-100%' }}
                            animate={{ x: step > i ? '0%' : '-100%' }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>
                )}
            </React.Fragment>
        ))}
      </div>

      <div className="w-full bg-int-dark/50 p-4 rounded-lg border border-gray-700/50 min-h-[80px] flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.p 
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-gray-300 italic"
            >
                {step === 0 && "Analyzing organization data readiness and high-ROI use cases..."}
                {step === 1 && "Designing secure multi-tenant data venues and model governance..."}
                {step === 2 && "Deploying SOC 2 compliant infrastructure in isolated tenants..."}
                {step === 3 && "Monitoring costs, latency, and optimizing prompt performance..."}
            </motion.p>
          </AnimatePresence>
      </div>
    </div>
  );
};

// --- ROI COMPARISON CHART ---
export const ROIComparisonChart: React.FC = () => {
    type MetricType = 'success' | 'speed' | 'cost';
    const [metric, setMetric] = useState<MetricType>('success');
    const [hoveredBar, setHoveredBar] = useState<'diy' | 'int' | null>(null);
    
    const data = {
        success: { 
            title: "Project Success Rate", 
            unit: "%", 
            diy: 33, 
            int: 92, 
            desc: "Percentage of AI projects reaching production." 
        },
        speed: { 
            title: "Time to Value", 
            unit: " Months", 
            diy: 14, 
            int: 3, 
            desc: "Average time from concept to deployment.",
            invert: true
        },
        cost: { 
            title: "Ops Cost Reduction", 
            unit: "%", 
            diy: 0, 
            int: 45, 
            desc: "Reduction in ongoing operational overhead vs internal hiring." 
        } 
    };

    const currentData = data[metric];
    const maxVal = Math.max(currentData.diy, currentData.int) * 1.2;
    
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-white text-int-navy rounded-xl my-8 border border-gray-200 shadow-md" data-testid="diagram-roi">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-2xl mb-2 text-int-navy">The Partnership Advantage</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    Comparing internal "Do-It-Yourself" AI implementation versus INT Inc.'s Managed AIaaS approach.
                </p>
                
                <div className="flex flex-col gap-2 mt-4">
                    <motion.button 
                        onClick={() => setMetric('success')} 
                        data-testid="roi-toggle-success"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 border flex items-center justify-between ${metric === 'success' ? 'bg-int-navy text-white border-int-navy shadow-lg' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                    >
                        <span>Success Rate</span>
                        {metric === 'success' && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle size={16} className="text-int-teal"/></motion.div>}
                    </motion.button>
                    <motion.button 
                        onClick={() => setMetric('speed')} 
                        data-testid="roi-toggle-speed"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 border flex items-center justify-between ${metric === 'speed' ? 'bg-int-navy text-white border-int-navy shadow-lg' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                    >
                        <span>Speed to Deploy</span>
                        {metric === 'speed' && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Rocket size={16} className="text-int-teal"/></motion.div>}
                    </motion.button>
                    <motion.button 
                        onClick={() => setMetric('cost')} 
                        data-testid="roi-toggle-cost"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 border flex items-center justify-between ${metric === 'cost' ? 'bg-int-navy text-white border-int-navy shadow-lg' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                    >
                        <span>Cost Efficiency</span>
                        {metric === 'cost' && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><BarChart2 size={16} className="text-int-teal"/></motion.div>}
                    </motion.button>
                </div>
            </div>
            
            <div className="relative w-64 h-72 bg-int-cream rounded-xl border border-gray-200 p-6 flex justify-around items-end">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-10">
                   <div className="w-full h-[1px] bg-int-navy"></div>
                   <div className="w-full h-[1px] bg-int-navy"></div>
                   <div className="w-full h-[1px] bg-int-navy"></div>
                   <div className="w-full h-[1px] bg-int-navy"></div>
                </div>

                {/* DIY Bar */}
                <div 
                    className="w-20 flex flex-col justify-end items-center h-full z-10 transition-opacity duration-300"
                    style={{ opacity: hoveredBar && hoveredBar !== 'diy' ? 0.4 : 1 }}
                    onMouseEnter={() => setHoveredBar('diy')}
                    onMouseLeave={() => setHoveredBar(null)}
                    data-testid="roi-bar-diy"
                >
                    <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <AnimatePresence>
                             {hoveredBar === 'diy' && (
                                <motion.div 
                                    data-testid="tooltip-roi-diy"
                                    className="absolute bottom-full mb-3 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded shadow-xl whitespace-nowrap z-50 pointer-events-none"
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    {currentData.diy}{currentData.unit}
                                     <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900"></div>
                                </motion.div>
                             )}
                        </AnimatePresence>

                        <motion.div 
                            className="w-full bg-slate-400 rounded-t-sm cursor-pointer origin-bottom hover:bg-slate-500 transition-colors"
                            initial={{ height: 0 }}
                            animate={{ 
                                height: `${(currentData.diy / maxVal) * 100}%`,
                                scale: hoveredBar === 'diy' ? 1.05 : 1
                            }}
                            transition={{ 
                                height: { type: "spring", stiffness: 140, damping: 12, mass: 0.8 },
                                scale: { duration: 0.2 }
                            }}
                        />
                    </div>
                    <div className="h-8 flex items-center text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">DIY / Internal</div>
                </div>

                {/* INT Bar */}
                <div 
                    className="w-20 flex flex-col justify-end items-center h-full z-10 transition-opacity duration-300"
                    style={{ opacity: hoveredBar && hoveredBar !== 'int' ? 0.4 : 1 }}
                    onMouseEnter={() => setHoveredBar('int')}
                    onMouseLeave={() => setHoveredBar(null)}
                    data-testid="roi-bar-int"
                >
                     <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                         <AnimatePresence>
                             {hoveredBar === 'int' && (
                                <motion.div 
                                    data-testid="tooltip-roi-int"
                                    className="absolute bottom-full mb-3 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded shadow-xl whitespace-nowrap z-50 pointer-events-none"
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    {currentData.int}{currentData.unit}
                                     <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900"></div>
                                </motion.div>
                             )}
                        </AnimatePresence>

                        <motion.div 
                            className="w-full bg-gradient-to-t from-int-navy to-int-teal rounded-t-md shadow-lg relative overflow-hidden cursor-pointer origin-bottom"
                            initial={{ height: 0 }}
                            animate={{ 
                                height: Math.max(2, (currentData.int / maxVal) * 100) + '%',
                                scale: hoveredBar === 'int' ? 1.05 : 1
                            }}
                            transition={{ 
                                height: { type: "spring", stiffness: 140, damping: 12, mass: 0.8, delay: 0.05 },
                                scale: { duration: 0.2 }
                            }}
                        >
                           <div className="absolute inset-0 bg-white/10"></div>
                        </motion.div>
                    </div>
                     <div className="h-8 flex items-center text-[10px] font-bold text-int-navy uppercase tracking-wider text-center">INT Partnered</div>
                </div>
            </div>
        </div>
    )
}