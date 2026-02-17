/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Activity, Server, Database, CheckCircle, AlertCircle, BarChart2, Brain, Rocket, Search, ArrowRight } from 'lucide-react';

// --- SECURITY ARCHITECTURE DIAGRAM (Was Surface Code) ---
export const SecurityArchitectureDiagram: React.FC = () => {
  // 3x3 grid of "Client Endpoints" (was Data Qubits)
  // Interspersed with "Security Controls" (was Stabilizers)
  const [activeRequests, setActiveRequests] = useState<number[]>([]);
  
  // Adjacency: Endpoint Index -> Control Indices
  const adjacency: Record<number, number[]> = {
    0: [0, 1],
    1: [0, 2],
    2: [1, 3],
    3: [2, 3],
    4: [0, 1, 2, 3], 
  };

  const toggleRequest = (id: number) => {
    setActiveRequests(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  // Active controls light up when adjacent endpoints have traffic
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
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-int-navy/10 my-8">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="text-int-teal" size={24} />
        <h3 className="font-serif text-xl text-int-navy">Zero-Trust Data Venue</h3>
      </div>
      <p className="text-sm text-gray-500 mb-6 text-center max-w-md">
        Click the <strong>Endpoints</strong> to simulate data requests. Watch INT's <strong>Security Controls</strong> instantly verify and isolate traffic.
      </p>
      
      <div className="relative w-64 h-64 bg-int-cream rounded-lg border border-int-navy/10 p-4 flex flex-wrap justify-between content-between relative">
         {/* Grid Lines */}
         <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
            <div className="w-2/3 h-2/3 border border-int-navy"></div>
            <div className="absolute w-full h-[1px] bg-int-navy"></div>
            <div className="absolute h-full w-[1px] bg-int-navy"></div>
         </div>

         {/* Security Controls (Stabilizers) */}
         {[
             {id: 0, x: '50%', y: '20%', label: 'AUTH', color: 'bg-int-teal'},
             {id: 1, x: '20%', y: '50%', label: 'ENC', color: 'bg-int-gold'},
             {id: 2, x: '80%', y: '50%', label: 'LOG', color: 'bg-int-gold'},
             {id: 3, x: '50%', y: '80%', label: 'SOC2', color: 'bg-int-teal'},
         ].map(stab => (
             <motion.div
                key={`ctrl-${stab.id}`}
                className={`absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center text-white text-[10px] font-bold rounded-lg shadow-sm transition-all duration-300 z-10 ${activeControls.includes(stab.id) ? stab.color + ' opacity-100 scale-110 ring-4 ring-offset-2 ring-int-cream' : 'bg-gray-300 opacity-50'}`}
                style={{ left: stab.x, top: stab.y }}
             >
                 {activeControls.includes(stab.id) ? <CheckCircle size={16} /> : <Lock size={14} />}
             </motion.div>
         ))}

         {/* Client Endpoints (Data Qubits) */}
         {[
             {id: 0, x: '20%', y: '20%'}, {id: 1, x: '80%', y: '20%'},
             {id: 4, x: '50%', y: '50%'}, 
             {id: 2, x: '20%', y: '80%'}, {id: 3, x: '80%', y: '80%'},
         ].map(q => (
             <button
                key={`end-${q.id}`}
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

// --- SERVICE PIPELINE DIAGRAM (Was Transformer Decoder) ---
export const AIServicePipelineDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const stages = [
      { id: 0, label: "Assessment", icon: <Search size={24} />, color: "border-gray-400 bg-gray-800" },
      { id: 1, label: "Architecture", icon: <Brain size={24} />, color: "border-int-teal bg-int-teal/20" },
      { id: 2, label: "Deployment", icon: <Server size={24} />, color: "border-int-gold bg-int-gold/20" },
      { id: 3, label: "Optimization", icon: <Rocket size={24} />, color: "border-white bg-white/10" }
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-int-navy rounded-xl border border-int-teal/20 my-8 shadow-2xl">
      <h3 className="font-serif text-xl mb-4 text-white">Managed AI Lifecycle</h3>
      <p className="text-sm text-gray-300 mb-8 text-center max-w-md">
        From initial readiness assessment to continuous model optimization, we handle the entire infrastructure pipeline.
      </p>

      <div className="relative w-full max-w-lg flex items-center justify-between mb-8 px-4">
        {stages.map((stage, i) => (
            <React.Fragment key={stage.id}>
                <div className="flex flex-col items-center gap-3 relative z-10">
                    <motion.div 
                        className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${step === i ? 'scale-110 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.3)] ' + (i===1 ? 'bg-int-teal' : i===2 ? 'bg-int-gold' : 'bg-int-navy') : 'border-gray-600 text-gray-500 bg-int-dark'}`}
                        animate={step === i ? { y: -5 } : { y: 0 }}
                    >
                        {stage.icon}
                    </motion.div>
                    <span className={`text-[10px] uppercase font-bold tracking-wider transition-colors duration-300 ${step === i ? 'text-white' : 'text-gray-600'}`}>
                        {stage.label}
                    </span>
                </div>
                {i < stages.length - 1 && (
                    <div className="flex-1 h-[2px] bg-gray-700 mx-2 relative overflow-hidden">
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-int-teal to-int-gold"
                            initial={{ x: '-100%' }}
                            animate={{ x: step > i ? '0%' : '-100%' }}
                            transition={{ duration: 0.5 }}
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

// --- ROI COMPARISON CHART (Was Performance Metric) ---
export const ROIComparisonChart: React.FC = () => {
    type MetricType = 'success' | 'speed' | 'cost';
    const [metric, setMetric] = useState<MetricType>('success');
    
    // Data config for comparison
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
            invert: true // Lower is better
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
    // Calculate max for bar height scaling
    const maxVal = Math.max(currentData.diy, currentData.int) * 1.2;
    
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-white text-int-navy rounded-xl my-8 border border-gray-200 shadow-md">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-2xl mb-2 text-int-navy">The Partnership Advantage</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    Comparing internal "Do-It-Yourself" AI implementation versus INT Inc.'s Managed AIaaS approach.
                </p>
                
                <div className="flex flex-col gap-2 mt-4">
                    <button onClick={() => setMetric('success')} className={`px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 border flex items-center justify-between ${metric === 'success' ? 'bg-int-navy text-white border-int-navy' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}>
                        <span>Success Rate</span>
                        {metric === 'success' && <CheckCircle size={16} className="text-int-teal"/>}
                    </button>
                    <button onClick={() => setMetric('speed')} className={`px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 border flex items-center justify-between ${metric === 'speed' ? 'bg-int-navy text-white border-int-navy' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}>
                        <span>Speed to Deploy</span>
                        {metric === 'speed' && <Rocket size={16} className="text-int-teal"/>}
                    </button>
                    <button onClick={() => setMetric('cost')} className={`px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 border flex items-center justify-between ${metric === 'cost' ? 'bg-int-navy text-white border-int-navy' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}>
                        <span>Cost Efficiency</span>
                        {metric === 'cost' && <BarChart2 size={16} className="text-int-teal"/>}
                    </button>
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
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                    <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <div className="absolute -top-8 w-full text-center text-sm font-mono text-gray-500 font-bold">{currentData.diy}{currentData.unit}</div>
                        <motion.div 
                            className="w-full bg-gray-400 rounded-t-sm"
                            initial={{ height: 0 }}
                            animate={{ height: `${(currentData.diy / maxVal) * 100}%` }}
                            transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        />
                    </div>
                    <div className="h-8 flex items-center text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">DIY / Internal</div>
                </div>

                {/* INT Bar */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                     <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <div className="absolute -top-8 w-full text-center text-sm font-mono text-int-navy font-bold bg-white px-1 shadow-sm rounded-sm border border-int-teal/20">{currentData.int}{currentData.unit}</div>
                        <motion.div 
                            className="w-full bg-gradient-to-t from-int-navy to-int-teal rounded-t-md shadow-lg relative overflow-hidden"
                            initial={{ height: 0 }}
                            animate={{ height: Math.max(2, (currentData.int / maxVal) * 100) + '%' }}
                            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
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