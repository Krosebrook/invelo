/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, DataVaultScene } from './components/QuantumScene';
import { SecurityArchitectureDiagram, AIServicePipelineDiagram, ROIComparisonChart } from './components/Diagrams';
import { ArrowDown, Menu, X, ArrowRight, CheckCircle2, Brain, ShieldCheck, Database, Users, Landmark, Target, History } from 'lucide-react';

const CapabilityCard = ({ title, description, icon: Icon, delay }: { title: string, description: string, icon: any, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 w-full h-full hover:border-int-gold/50" style={{ animationDelay: delay }}>
      <div className="mb-6 text-int-navy group-hover:text-int-gold transition-colors duration-300">
        <Icon size={40} strokeWidth={1.5} />
      </div>
      <h3 className="font-serif text-xl text-int-navy text-center mb-3">{title}</h3>
      <div className="w-8 h-0.5 bg-int-gold mb-4 opacity-60"></div>
      <p className="text-sm text-gray-500 font-medium text-center leading-relaxed">{description}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-int-navy selection:bg-int-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="nav-logo">
            <div className="w-10 h-10 bg-int-navy rounded-sm flex items-center justify-center text-white font-sans font-bold text-xl shadow-md">
                <span className="text-int-gold">I</span>
            </div>
            <div className="flex flex-col">
                 <span className={`font-serif font-bold text-lg tracking-wide leading-none transition-colors ${scrolled ? 'text-int-navy' : 'text-int-navy md:text-white'}`}>
                  INT INC.
                </span>
                <span className={`text-[10px] font-bold tracking-[0.2em] uppercase leading-none mt-1 ${scrolled ? 'text-int-gold' : 'text-int-gold/80'}`}>AI Services</span>
            </div>
          </div>
          
          <div className={`hidden md:flex items-center gap-8 text-sm font-medium tracking-wide ${scrolled ? 'text-gray-600' : 'text-gray-200'}`}>
            <a href="#challenge" onClick={scrollToSection('challenge')} className="hover:text-int-gold transition-colors cursor-pointer uppercase" data-testid="nav-link-gap">The Gap</a>
            <a href="#security" onClick={scrollToSection('security')} className="hover:text-int-gold transition-colors cursor-pointer uppercase" data-testid="nav-link-security">Security</a>
            <a href="#roi" onClick={scrollToSection('roi')} className="hover:text-int-gold transition-colors cursor-pointer uppercase" data-testid="nav-link-roi">ROI</a>
            <a href="https://intinc.com/#about" onClick={scrollToSection('about')} className="hover:text-int-gold transition-colors cursor-pointer uppercase" data-testid="nav-link-about">About Us</a>
            <a href="#capabilities" onClick={scrollToSection('capabilities')} className="hover:text-int-gold transition-colors cursor-pointer uppercase" data-testid="nav-link-capabilities">Capabilities</a>
            <a 
              href="#contact" 
              className="px-6 py-2 bg-int-gold text-white font-bold rounded-full hover:bg-white hover:text-int-gold transition-all shadow-sm cursor-pointer border border-int-gold"
              data-testid="nav-cta"
            >
              Get Started
            </a>
          </div>

          <button 
            className={`md:hidden p-2 ${scrolled ? 'text-int-navy' : 'text-int-navy'}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-int-cream flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in text-int-navy" data-testid="mobile-menu-container">
            <a href="#challenge" onClick={scrollToSection('challenge')} className="hover:text-int-gold transition-colors cursor-pointer uppercase">The Challenge</a>
            <a href="#security" onClick={scrollToSection('security')} className="hover:text-int-gold transition-colors cursor-pointer uppercase">Security Architecture</a>
            <a href="#roi" onClick={scrollToSection('roi')} className="hover:text-int-gold transition-colors cursor-pointer uppercase">ROI</a>
            <a href="https://intinc.com/#about" onClick={scrollToSection('about')} className="hover:text-int-gold transition-colors cursor-pointer uppercase">About Us</a>
            <a href="#capabilities" onClick={scrollToSection('capabilities')} className="hover:text-int-gold transition-colors cursor-pointer uppercase">Capabilities</a>
            <a 
              href="#contact"
              onClick={() => setMenuOpen(false)} 
              className="px-8 py-3 bg-int-navy text-white rounded-full shadow-lg cursor-pointer"
            >
              Schedule Assessment
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-int-dark">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(30,58,95,0.4)_0%,rgba(15,23,42,0.8)_60%,rgba(15,23,42,1)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className="inline-block mb-6 px-4 py-1 border border-int-teal/50 text-int-teal text-xs tracking-[0.25em] uppercase font-bold rounded-full backdrop-blur-md bg-int-navy/30 shadow-[0_0_15px_rgba(13,148,136,0.3)]">
            HumanX 2026 • San Francisco
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-8 drop-shadow-lg">
            AI as a Service <br/>
            <span className="italic font-light text-gray-300 text-3xl md:text-5xl block mt-4">Operationalize AI. Securely. At Scale.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-12">
            INT Inc. deploys production-grade AI infrastructure for mid-market businesses—with SOC 2 governance, tenant isolation, and 25 years of managed services expertise.
          </p>
          
          <div className="flex justify-center mt-12">
             <a 
               href="#challenge" 
               onClick={scrollToSection('challenge')} 
               data-testid="hero-discover-cta"
               className="group relative inline-flex items-center gap-4 px-12 py-5 rounded-full border border-int-gold/80 bg-int-navy/40 text-int-gold shadow-[0_0_20px_rgba(197,160,89,0.2)] backdrop-blur-md transition-all duration-500 hover:bg-int-gold hover:text-int-navy hover:shadow-[0_0_60px_rgba(197,160,89,0.6)] hover:-translate-y-1 hover:scale-105"
             >
                <span className="text-sm font-bold tracking-[0.3em] uppercase transition-colors duration-300">Discover</span>
                <ArrowDown size={20} className="transition-transform duration-500 group-hover:translate-y-1" />
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Intro: The Gap */}
        <section id="challenge" className="py-24 bg-white" data-testid="section-challenge">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-int-gold uppercase">The Challenge</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-int-navy">The AI Adoption Gap</h2>
              <div className="w-20 h-1 bg-int-teal mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-gray-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-int-navy">95%</span> of enterprise AI implementations fail to reach production. Why? Because while tools like ChatGPT are accessible, <strong>operationalizing</strong> them requires infrastructure, governance, and security that most mid-market IT teams lack.
              </p>
              <p>
                The gap between "experimental AI" and "production AI" is widening. INT Inc. bridges this gap. We don't just advise; we <strong className="text-int-navy font-medium">build, deploy, and manage</strong> the secure data venues required to run AI safely on your proprietary data.
              </p>
            </div>
          </div>
        </section>

        {/* Security Architecture */}
        <section id="security" className="py-24 bg-[#F5F7FA] border-t border-gray-200" data-testid="section-security">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-int-navy text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-gray-200 shadow-sm">
                            <CheckCircle2 size={14} className="text-int-teal"/> SOC 2 TYPE II CERTIFIED
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-int-navy">Secure Data Venue</h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                           Our proprietary <strong>Data Venue Architecture</strong> isolates your corporate knowledge base from public model providers. We utilize zero-trust principles, ensuring your data is encrypted in transit and at rest.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-int-teal/20 flex items-center justify-center text-int-teal"><CheckCircle2 size={12}/></div>
                                <span className="text-gray-700"><strong>Tenant Isolation:</strong> Your data never mingles with other clients.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-int-teal/20 flex items-center justify-center text-int-teal"><CheckCircle2 size={12}/></div>
                                <span className="text-gray-700"><strong>PII Redaction:</strong> Automatic filtering of sensitive information.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-int-teal/20 flex items-center justify-center text-int-teal"><CheckCircle2 size={12}/></div>
                                <span className="text-gray-700"><strong>Audit Trails:</strong> Full logging of every AI interaction.</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <SecurityArchitectureDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* How It Works: Pipeline */}
        <section className="py-24 bg-int-navy text-white overflow-hidden relative" data-testid="section-pipeline">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-int-teal blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-int-gold blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <AIServicePipelineDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-int-dark/50 text-int-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-int-gold/20">
                            ENGAGEMENT MODEL
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Managed Operations</h2>
                        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                            We are not consultants who leave you with a slide deck. We are partners who operate your AI infrastructure. Our 4-stage pipeline ensures continuous value delivery.
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed border-l-2 border-int-gold pl-6">
                            "INT's managed service model allowed us to deploy a customer service agent in 6 weeks, cutting our response times by 40%."
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* Results: ROI */}
        <section id="roi" className="py-24 bg-white" data-testid="section-roi">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-int-navy">The ROI of Partnership</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Building an internal AI team is slow, risky, and expensive. Partnering with INT Inc. accelerates your timeline and guarantees security compliance from Day 1.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <ROIComparisonChart />
                </div>
            </div>
        </section>

        {/* New: About Us Section */}
        <section id="about" className="py-24 bg-int-cream border-t border-gray-200" data-testid="section-about">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-int-gold uppercase">OUR HERITAGE</div>
                <h2 className="font-serif text-4xl md:text-5xl mb-8 text-int-navy">25 Years of Managed Excellence</h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    Founded in the late 90s as a specialized Managed Service Provider, <strong>INT Inc.</strong> has navigated every major technological shift—from the birth of the cloud to the mobile revolution.
                  </p>
                  <p>
                    Today, we apply that deep operational DNA to the frontier of Artificial Intelligence. We believe that for AI to be truly transformative, it must be as reliable and secure as the power grid.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <History className="text-int-gold mb-4" size={32} />
                  <h4 className="font-serif text-lg mb-2">Legacy</h4>
                  <p className="text-sm text-gray-500">Established in 1999, headquartered in Lincolnshire, IL.</p>
                </div>
                <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <Target className="text-int-teal mb-4" size={32} />
                  <h4 className="font-serif text-lg mb-2">Mission</h4>
                  <p className="text-sm text-gray-500">Empowering mid-market enterprise with secure AI.</p>
                </div>
                <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <Landmark className="text-int-navy mb-4" size={32} />
                  <h4 className="font-serif text-lg mb-2">Stability</h4>
                  <p className="text-sm text-gray-500">Private, profitable, and client-obsessed since day one.</p>
                </div>
                <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <ShieldCheck className="text-int-teal mb-4" size={32} />
                  <h4 className="font-serif text-lg mb-2">Commitment</h4>
                  <p className="text-sm text-gray-500">Uncompromising security standards and SOC 2 governance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact: Future Proofing */}
        <section className="py-24 bg-[#F5F7FA] border-t border-gray-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-int-dark rounded-xl overflow-hidden relative border border-gray-200 shadow-2xl">
                        <DataVaultScene />
                        <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-int-gold font-sans font-bold tracking-widest opacity-80">LIVE MONITORING ACTIVE</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-int-teal uppercase">FUTURE PROOFING</div>
                    <h2 className="font-serif text-4xl mb-6 text-int-navy">Ready for What's Next</h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        The AI landscape changes weekly. New models, new regulations, new capabilities. By abstracting your infrastructure through INT's Data Venue, you can swap models without rewriting your business logic.
                    </p>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        We maintain the plumbing so you can focus on the business value.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
                            <div className="text-3xl font-serif text-int-gold mb-2">65%</div>
                            <p className="text-sm text-gray-500 font-medium">Organizations adopting data-driven decisions by 2026</p>
                        </div>
                        <div className="flex-1 p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
                            <div className="text-3xl font-serif text-int-gold mb-2">25+</div>
                            <p className="text-sm text-gray-500 font-medium">Years of Managed Services Excellence</p>
                        </div>
                    </div>
                </div>
             </div>
        </section>

        {/* Capabilities (was Team) */}
        <section id="capabilities" className="py-24 bg-white border-t border-gray-200" data-testid="section-capabilities">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-int-gold uppercase">CAPABILITIES</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-int-navy">What We Deliver</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Enterprise AI capabilities backed by 25+ years of managed services expertise and SOC 2 Type II compliance.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <CapabilityCard 
                        title="AI Strategy" 
                        description="Custom AI roadmaps aligned to your business goals — not generic playbooks. We evaluate 60+ platforms to find what actually fits your workflows."
                        icon={Brain}
                        delay="0s" 
                    />
                    <CapabilityCard 
                        title="Security Operations" 
                        description="SOC 2 Type II certified infrastructure with zero-trust architecture. Your data stays isolated, encrypted, and auditable at every layer."
                        icon={ShieldCheck}
                        delay="0.1s" 
                    />
                    <CapabilityCard 
                        title="Data Architecture" 
                        description="Multi-tenant vault design with row-level security and customer-managed encryption. Built for MSPs who can't afford cross-tenant exposure."
                        icon={Database}
                        delay="0.2s" 
                    />
                    <CapabilityCard 
                        title="Client Success" 
                        description="We're not consultants — we're partners. Dedicated support with proactive monitoring, 24/7 helpdesk, and quarterly business reviews."
                        icon={Users}
                        delay="0.3s" 
                    />
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-int-navy text-gray-400 py-16 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2 flex items-center gap-2 justify-center md:justify-start">
                    <span className="text-int-gold">I</span> INT INC.
                </div>
                <p className="text-sm opacity-80">We are not consultants. We are partners.</p>
            </div>
            <div className="flex gap-8 text-sm font-medium">
                <a href="https://intinc.com/#about" onClick={scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">About Us</a>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">SOC 2 Report</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-gray-600">
            © 2026 INT Inc. All rights reserved. | Lincolnshire, IL
        </div>
      </footer>
    </div>
  );
};

export default App;