'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const HOTMART_CHECKOUT_URL = 'https://pay.hotmart.com/D106784212B?checkoutMode=10';

export default function LandingPage() {
  const [modalType, setModalType] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'success'>('details');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    // Scroll listener for sticky CTA bar
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Load GSAP scripts dynamically for smooth animations
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = reject;
        document.body.appendChild(s);
      });
    };

    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'),
    ]).then(() => {
      const gsap = (window as unknown as { gsap: any }).gsap;
      const ScrollTrigger = (window as unknown as { ScrollTrigger: any }).ScrollTrigger;

      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Hero entrance animations
        gsap.from('#hero-badge', { opacity: 0, y: -20, duration: 0.8, ease: 'power2.out' });
        gsap.from('#hero-title', { opacity: 0, y: 30, duration: 1, delay: 0.2, ease: 'power3.out' });
        gsap.from('#hero-text', { opacity: 0, y: 25, duration: 1, delay: 0.4, ease: 'power3.out' });
        gsap.from('#hero-cta-group', { opacity: 0, scale: 0.95, duration: 0.8, delay: 0.6, ease: 'back.out(1.5)' });
        gsap.from('#hero-book-wrap', { opacity: 0, x: 50, duration: 1.2, delay: 0.3, ease: 'power2.out' });

        // Pillars reveal
        gsap.utils.toArray('.pillar-card').forEach((card: any, index: number) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            opacity: 0,
            y: 35,
            duration: 0.7,
            delay: index * 0.12,
            ease: 'power2.out',
          });
        });

        // Bonuses cards reveal
        gsap.utils.toArray('.bonus-card').forEach((card: any, index: number) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            opacity: 0,
            y: 35,
            duration: 0.7,
            delay: index * 0.12,
            ease: 'power2.out',
          });
        });

        // Offer section reveal
        gsap.from('#offer-box', {
          scrollTrigger: {
            trigger: '#offer-box',
            start: 'top 80%',
          },
          opacity: 0,
          scale: 0.97,
          duration: 0.9,
          ease: 'power2.out',
        });
      }
    }).catch((err) => {
      console.warn('Animation scripts skipped:', err);
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCheckout = () => {
    window.location.href = HOTMART_CHECKOUT_URL;
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = HOTMART_CHECKOUT_URL;
  };

  return (
    <div className="min-h-screen bg-[#060B19] text-[#FFFFFF] font-sans selection:bg-[#D4AF37] selection:text-[#060B19] overflow-x-hidden relative">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] left-[-10%] w-[500px] h-[500px] bg-[#111D42]/80 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/8 rounded-full blur-[160px]" />
      </div>

      {/* 1. Header Fijo Minimalista */}
      <header id="header" className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#060B19]/90 border-b border-[rgba(212,175,55,0.2)] transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-10 rounded-[4px] bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <svg className="w-6 h-6 text-[#060B19]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 2h2v7h7v2h-7v11h-2v-11H4V9h7V2z" />
              </svg>
            </div>
            <div>
              <span className="font-serif font-bold tracking-[2px] text-lg sm:text-xl text-[#D4AF37]">
                FINANZAS ESPIRITUALES
              </span>
              <p className="text-[10px] text-[#A0AEC0] font-sans tracking-widest uppercase -mt-1 hidden sm:block">
                Paquete Completo de Prosperidad Bíblica
              </p>
            </div>
          </div>

          <a
            id="header-cta-btn"
            href={HOTMART_CHECKOUT_URL}
            className="group relative px-5 py-2 sm:px-6 sm:py-2.5 rounded-[4px] font-sans font-extrabold text-xs sm:text-sm tracking-wider uppercase text-[#060B19] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:brightness-105 active:scale-95 transition-all duration-300 cursor-pointer border-none inline-flex items-center"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>QUIERO ENTENDER LA BIBLIA - COMPRAR AHORA</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </div>
      </header>

      <main className="relative z-10 pt-28 sm:pt-32">
        
        {/* 2. Hero Section - Mockups y Botón Fácil de Compra en el Top (Invertido) */}
        <section id="hero" className="max-w-5xl mx-auto px-4 sm:px-8 pt-6 pb-12 sm:pt-8 sm:pb-16 text-center">
          
          {/* Badge Superior */}
          <div id="hero-badge" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-[rgba(212,175,55,0.1)] border border-[#D4AF37] text-[11px] sm:text-xs font-semibold text-[#D4AF37] uppercase tracking-[1px] mb-4 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>PAQUETE REVELADO: 5 LIBROS COMPLETOS POR SOLO $6.90 USD</span>
          </div>

          {/* Headline Magnética */}
          <h1 id="hero-title" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight mb-3 max-w-4xl mx-auto bg-gradient-to-b from-[#FFFFFF] via-[#F3E5AB] to-[#D4AF37] bg-clip-text text-transparent">
            Alinea tu Economía con los Principios Divinos y Rompe para Siempre la Escasez
          </h1>

          <p className="text-sm sm:text-base text-[#CBD5E1] max-w-2xl mx-auto mb-6">
            Obtén hoy el manual definitivo <strong className="text-[#D4AF37]">Finanzas Espirituales</strong> más los 4 libros devocionales exclusivos por un único pago especial.
          </p>

          {/* ÁREA DE MOCKUPS PRINCIPAL (En el Top de la Página) */}
          <div id="hero-book-wrap" className="relative my-4 flex flex-col items-center justify-center">
            
            {/* Contenedor Mockup con Halo Dorado */}
            <div className="relative group w-full max-w-[340px] sm:max-w-[420px]">
              <div className="absolute inset-0 -m-6 bg-gradient-to-tr from-[#D4AF37]/30 via-[#111D42]/60 to-[#D4AF37]/20 rounded-2xl blur-3xl group-hover:scale-105 transition-transform duration-700" />
              
              <div className="relative z-10 rounded-[10px] overflow-hidden border-2 border-[#D4AF37] bg-[#040916] shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-2.5 transition-transform duration-500 hover:-translate-y-1">
                <Image
                  id="bundle-main-img"
                  src="/paquete-completo.svg"
                  alt="Paquete Completo de Prosperidad Total - Finanzas Espirituales y 4 Bonos"
                  width={420}
                  height={540}
                  referrerPolicy="no-referrer"
                  priority
                  className="w-full h-auto object-cover rounded-[6px]"
                />

                {/* Cinta en la Base del Mockup */}
                <div className="mt-2 py-2 px-3 bg-[#111D42] border-t border-[#D4AF37]/40 flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-[#F3E5AB] tracking-wide">PAQUETE COMPLETO (5 LIBROS)</span>
                  <div className="flex items-center gap-1.5">
                    <span className="line-through text-[#718096] text-[11px]">$47.00</span>
                    <span className="font-bold text-[#D4AF37] text-base font-serif">$6.90 USD</span>
                  </div>
                </div>
              </div>

              {/* Badge Flotante de Descuento Inmediato */}
              <div className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#060B19] font-extrabold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[8px] shadow-[0_10px_25px_rgba(0,0,0,0.7)] text-center border border-[#FFF6D1]">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold">¡OFERTA HOY!</div>
                <div className="text-[17px] sm:text-[20px] font-serif font-black leading-tight">SOLO $6.90</div>
              </div>
            </div>

            {/* Miniaturas de los 5 libros incluidos abajo del mockup principal */}
            <div className="mt-5 grid grid-cols-5 gap-2 max-w-md mx-auto w-full px-2">
              <div className="flex flex-col items-center">
                <div className="w-12 sm:w-16 h-16 sm:h-20 bg-[#060B19] rounded border border-[#D4AF37] overflow-hidden p-0.5 shadow">
                  <Image src="/finanzas-espirituales.svg" alt="Principal" width={60} height={80} className="w-full h-full object-contain" />
                </div>
                <span className="text-[9px] sm:text-[10px] text-[#D4AF37] font-semibold mt-1">Principal</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 sm:w-16 h-16 sm:h-20 bg-[#060B19] rounded border border-[#D4AF37]/50 overflow-hidden p-0.5 shadow">
                  <Image src="/bono-codigo-divino.svg" alt="Bono 1" width={60} height={80} className="w-full h-full object-contain" />
                </div>
                <span className="text-[9px] sm:text-[10px] text-[#A0AEC0] font-medium mt-1">Bono 1</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 sm:w-16 h-16 sm:h-20 bg-[#060B19] rounded border border-[#D4AF37]/50 overflow-hidden p-0.5 shadow">
                  <Image src="/bono-oracion.svg" alt="Bono 2" width={60} height={80} className="w-full h-full object-contain" />
                </div>
                <span className="text-[9px] sm:text-[10px] text-[#A0AEC0] font-medium mt-1">Bono 2</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 sm:w-16 h-16 sm:h-20 bg-[#060B19] rounded border border-[#D4AF37]/50 overflow-hidden p-0.5 shadow">
                  <Image src="/bono-devocionales.svg" alt="Bono 3" width={60} height={80} className="w-full h-full object-contain" />
                </div>
                <span className="text-[9px] sm:text-[10px] text-[#A0AEC0] font-medium mt-1">Bono 3</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 sm:w-16 h-16 sm:h-20 bg-[#060B19] rounded border border-[#D4AF37]/50 overflow-hidden p-0.5 shadow">
                  <Image src="/bono-historias.svg" alt="Bono 4" width={60} height={80} className="w-full h-full object-contain" />
                </div>
                <span className="text-[9px] sm:text-[10px] text-[#A0AEC0] font-medium mt-1">Bono 4</span>
              </div>
            </div>

          </div>

          {/* BOTÓN FÁCIL DE COMPRA DIRECTO EN EL TOPO */}
          <div id="hero-cta-group" className="mt-6 flex flex-col items-center gap-3 max-w-xl mx-auto">
            <a
              id="hero-buy-btn"
              href={HOTMART_CHECKOUT_URL}
              className="w-full py-4 sm:py-5 px-6 sm:px-10 rounded-[8px] font-sans font-black text-base sm:text-xl tracking-wider uppercase text-[#060B19] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] shadow-[0_10px_35px_rgba(212,175,55,0.45)] hover:shadow-[0_15px_50px_rgba(212,175,55,0.65)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer border-none text-center"
            >
              <span>¡COMPRAR AHORA POR $6.90 USD!</span>
              <svg className="w-5 h-5 text-[#060B19] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <div className="text-xs text-[#F3E5AB] font-semibold tracking-wide">
              ⚡ QUIERO ENTENDER LA BIBLIA — ACCESO DIGITAL INMEDIATO
            </div>

            {/* Badges de Confianza Rápidos */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[#A0AEC0]">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Descarga Inmediata a tu Correo
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Pago 100% Blindado
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Garantía Incondicional de 7 Días
              </span>
            </div>

            <div className="mt-2 flex items-center justify-center gap-2 text-xs text-[#CBD5E1]">
              <span className="text-[#38A169]">✓</span>
              <span>Entrega Inmediata a tu Correo • Acceso Vitalicio</span>
            </div>
          </div>

          {/* TEXTO PERSUASIVO Y CONTEXTO ESPIRITUAL (INVERTIDO - AHORA ABAJO DE LOS MOCKUPS Y BOTÓN) */}
          <div className="mt-12 pt-8 border-t border-[rgba(212,175,55,0.2)] max-w-3xl mx-auto text-left">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFFFF] mb-4 text-center">
              ¿Por qué los métodos humanos de dinero fallan sin la revelación bíblica?
            </h2>
            <p id="hero-text" className="text-base sm:text-lg text-[#CBD5E1] leading-[1.7] mb-6">
              ¿Trabajas sin parar pero el dinero se escapa como arena entre tus manos? No es falta de esfuerzo ni de capacidad intelectual. La Biblia contiene más de <strong className="text-[#D4AF37]">2.350 versículos sobre finanzas, posesiones y mayordomía</strong>. Cuando alineas tu economía con las leyes inmutables del Reino celestial, la angustia de las deudas desaparece y la paz financiera entra en tu hogar.
            </p>
            <div className="p-4 sm:p-5 rounded-[8px] bg-[#111D42] border border-[rgba(212,175,55,0.3)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <div className="text-xs text-[#A0AEC0] uppercase tracking-wider">Acceso Completo Vitalicio</div>
                <div className="text-base sm:text-lg font-bold text-[#F3E5AB]">
                  5 Libros Digitales: Libro Principal + 4 Bonos Exclusivos
                </div>
                <div className="text-xs text-[#38A169] font-medium mt-0.5">
                  ✓ Descarga inmediata en PDF compatible con tu teléfono, tablet o PC
                </div>
              </div>
              <a
                href={HOTMART_CHECKOUT_URL}
                className="px-6 py-3 rounded-[6px] font-sans font-black text-xs uppercase tracking-wider text-[#060B19] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] hover:brightness-105 active:scale-95 transition-all cursor-pointer border-none shrink-0 shadow-[0_4px_15px_rgba(212,175,55,0.3)] inline-block text-center"
              >
                COMPRAR POR $6.90 USD
              </a>
            </div>
          </div>

        </section>

        {/* 3. Barra de Principios Clave */}
        <section id="pilares-banner" className="bg-[#111D42] border-y border-[rgba(212,175,55,0.2)] py-8 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="text-[#D4AF37] text-2xl mb-1.5">✧</div>
              <div className="font-bold text-sm sm:text-base text-[#FFFFFF] mb-0.5">Sabiduría Práctica</div>
              <div className="text-xs text-[#A0AEC0]">Principios de Proverbios aplicados.</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-[#D4AF37] text-2xl mb-1.5">⚔</div>
              <div className="font-bold text-sm sm:text-base text-[#FFFFFF] mb-0.5">Ruptura de Deudas</div>
              <div className="text-xs text-[#A0AEC0]">Vence la mentalidad de escasez.</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-[#D4AF37] text-2xl mb-1.5">🌱</div>
              <div className="font-bold text-sm sm:text-base text-[#FFFFFF] mb-0.5">Ley de Siembra</div>
              <div className="text-xs text-[#A0AEC0]">Multiplicación y generosidad bíblica.</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-[#D4AF37] text-2xl mb-1.5">👑</div>
              <div className="font-bold text-sm sm:text-base text-[#FFFFFF] mb-0.5">Mayordomía Fiel</div>
              <div className="text-xs text-[#A0AEC0]">Administración con propósito eterno.</div>
            </div>
          </div>
        </section>

        {/* 4. Sección El Secreto Bíblico: Por qué la mayoría de creyentes sufren financieramente */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-20">
          <div className="p-8 sm:p-12 rounded-[10px] bg-gradient-to-b from-[#111D42] to-[#0a132c] border border-[rgba(212,175,55,0.25)] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[rgba(212,175,55,0.1)] border border-[#D4AF37] text-[11px] font-semibold text-[#D4AF37] uppercase tracking-[1px] mb-4">
                La Verdad que Nadie te Enseñó
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFFFFF] mb-6 leading-tight">
                ¿Dios Quiere que Vivas Preocupado por el Dinero?
              </h2>
              <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mb-8" />
              <div className="space-y-4 text-left text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                <p>
                  Muchos creyentes sinceros han sido educados creyendo que la pobreza es señal de santidad, o por el contrario, han caído en falsas promesas vacías. Sin embargo, la Escritura es tajante:
                </p>
                <blockquote className="p-4 rounded-[6px] bg-[#060B19] border-l-4 border-[#D4AF37] text-[#FFFFFF] italic font-serif text-base my-4 shadow-md">
                  &ldquo;El rico se enseñorea de los pobres, y el que toma prestado es siervo del que presta.&rdquo; — Proverbios 22:7
                </blockquote>
                <p>
                  Dios no te llamó a ser siervo de los bancos, de las deudas o de la zozobra cada fin de mes. Te llamó a ser un <strong className="text-[#D4AF37]">mayordomo fiel</strong>, un canal por donde fluyan Sus recursos para bendecir a tu familia, extender Su Reino y vivir en serena abundancia.
                </p>
                <p>
                  Este paquete de <strong className="text-[#FFFFFF]">5 Libros de Finanzas Espirituales y Código Divino</strong> te entrega el mapa exacto, versículo por versículo, para reorganizar tu economía terrenal de acuerdo con el diseño celestial.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[rgba(212,175,55,0.15)] flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={HOTMART_CHECKOUT_URL}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-[6px] font-sans font-bold text-sm tracking-wider uppercase text-[#060B19] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:brightness-105 active:scale-95 transition-all cursor-pointer border-none inline-block text-center"
                >
                  QUIERO ENTENDER LA BIBLIA - ACCEDER AHORA
                </a>
                <span className="text-xs text-[#A0AEC0]">Solo $6.90 USD • 5 Libros Incluidos</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Los 4 Pilares de la Prosperidad Bíblica */}
        <section id="pilares" className="max-w-6xl mx-auto px-4 sm:px-8 py-16 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[rgba(212,175,55,0.1)] border border-[#D4AF37] text-[11px] font-semibold text-[#D4AF37] uppercase tracking-[1px] mb-3">
              Fundamentos Inquebrantables
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF] mb-4">
              Los 4 Pilares de la Prosperidad Bíblica
            </h2>
            <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto mb-6" />
            <p className="text-base text-[#A0AEC0] leading-relaxed">
              Una estructura sólida para llevarte de la angustia de las cuentas pendientes a la paz de la provisión continua, uniendo la soberanía de Dios con tu responsabilidad diaria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Pilar 1 */}
            <div className="pillar-card p-8 rounded-[8px] bg-[#111D42] border border-[rgba(212,175,55,0.2)] hover:border-[#D4AF37] shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[4px] bg-[#060B19] border border-[#D4AF37] flex items-center justify-center mb-5 text-[#D4AF37] text-xl">
                  ✧
                </div>
                <div className="text-[11px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase mb-1">Pilar 01</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFFFFF] mb-3 group-hover:text-[#F3E5AB] transition-colors">
                  Sabiduría Práctica & Presupuesto
                </h3>
                <p className="text-[#A0AEC0] text-sm sm:text-base leading-relaxed">
                  Aplica las instrucciones de Salomón y las parábolas de Jesús para blindar tus decisiones contra el impulso emocional. Aprende a elaborar un presupuesto espiritual, evitar trampas de consumo y edificar un fondo de reserva para tu hogar.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[rgba(212,175,55,0.1)] flex items-center justify-between text-xs text-[#A0AEC0]">
                <span className="italic">&ldquo;Porque Jehová da la sabiduría, y de su boca viene el conocimiento...&rdquo;</span>
                <span className="text-[#D4AF37] font-semibold">Pr 2:6</span>
              </div>
            </div>

            {/* Pilar 2 */}
            <div className="pillar-card p-8 rounded-[8px] bg-[#111D42] border border-[rgba(212,175,55,0.2)] hover:border-[#D4AF37] shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[4px] bg-[#060B19] border border-[#D4AF37] flex items-center justify-center mb-5 text-[#D4AF37] text-xl">
                  ⚔
                </div>
                <div className="text-[11px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase mb-1">Pilar 02</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFFFFF] mb-3 group-hover:text-[#F3E5AB] transition-colors">
                  Ruptura de Cadenas de Deuda
                </h3>
                <p className="text-[#A0AEC0] text-sm sm:text-base leading-relaxed">
                  Rompe los patrones de endeudamiento crónico y culpa que han perseguido a tu familia por generaciones. Renueva tu mentalidad mediante la Palabra para cancelar deudas con disciplina y negociar con la sabiduría de lo alto.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[rgba(212,175,55,0.1)] flex items-center justify-between text-xs text-[#A0AEC0]">
                <span className="italic">&ldquo;Transformaos por medio de la renovación de vuestro entendimiento...&rdquo;</span>
                <span className="text-[#D4AF37] font-semibold">Ro 12:2</span>
              </div>
            </div>

            {/* Pilar 3 */}
            <div className="pillar-card p-8 rounded-[8px] bg-[#111D42] border border-[rgba(212,175,55,0.2)] hover:border-[#D4AF37] shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[4px] bg-[#060B19] border border-[#D4AF37] flex items-center justify-center mb-5 text-[#D4AF37] text-xl">
                  🌱
                </div>
                <div className="text-[11px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase mb-1">Pilar 03</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFFFFF] mb-3 group-hover:text-[#F3E5AB] transition-colors">
                  Leyes de Siembra y Cosecha
                </h3>
                <p className="text-[#A0AEC0] text-sm sm:text-base leading-relaxed">
                  Comprende el principio espiritual de la cosecha y el poder liberador de la generosidad consciente. Descubre cómo honrar a Dios con las primicias y abrir las ventanas de los cielos sobre el esfuerzo honrado de tus manos.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[rgba(212,175,55,0.1)] flex items-center justify-between text-xs text-[#A0AEC0]">
                <span className="italic">&ldquo;El que siembra generosamente, generosamente también segará.&rdquo;</span>
                <span className="text-[#D4AF37] font-semibold">2Co 9:6</span>
              </div>
            </div>

            {/* Pilar 4 */}
            <div className="pillar-card p-8 rounded-[8px] bg-[#111D42] border border-[rgba(212,175,55,0.2)] hover:border-[#D4AF37] shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[4px] bg-[#060B19] border border-[#D4AF37] flex items-center justify-center mb-5 text-[#D4AF37] text-xl">
                  👑
                </div>
                <div className="text-[11px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase mb-1">Pilar 04</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFFFFF] mb-3 group-hover:text-[#F3E5AB] transition-colors">
                  Mayordomía Fiel y Multiplicación
                </h3>
                <p className="text-[#A0AEC0] text-sm sm:text-base leading-relaxed">
                  Todo en la creación le pertenece al Creador; nosotros somos Sus administradores en la Tierra. Multiplica tus talentos con excelencia, vive con transparencia intachable y construye un legado de bendición para tus hijos y nietos.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[rgba(212,175,55,0.1)] flex items-center justify-between text-xs text-[#A0AEC0]">
                <span className="italic">&ldquo;Bien, buen siervo y fiel; sobre poco has sido fiel...&rdquo;</span>
                <span className="text-[#D4AF37] font-semibold">Mt 25:21</span>
              </div>
            </div>

          </div>
        </section>

        {/* 6. El Paquete Completo: Desglose Detallado de los 5 Productos */}
        <section id="productos" className="max-w-6xl mx-auto px-4 sm:px-8 py-20 bg-[#070D1F] border-y border-[rgba(212,175,55,0.15)]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[rgba(212,175,55,0.1)] border border-[#D4AF37] text-[11px] font-semibold text-[#D4AF37] uppercase tracking-[1px] mb-3">
              Todo Incluido en Tu Orden
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF] mb-4">
              El Paquete Completo de Prosperidad Bíblica
            </h2>
            <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto mb-6" />
            <p className="text-base text-[#A0AEC0]">
              Al adquirir hoy el producto principal de <strong className="text-[#D4AF37]">Finanzas Espirituales</strong>, recibirás de forma automática y gratuita los 4 bonos de transformación espiritual y familiar.
            </p>
          </div>

          {/* Producto Principal Showcase Card */}
          <div className="mb-14 p-6 sm:p-10 rounded-[10px] bg-[#111D42] border-2 border-[#D4AF37] shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 flex justify-center">
                <div className="w-full max-w-[280px] p-2 bg-[#060B19] rounded-[8px] border border-[#D4AF37]/50 shadow-2xl">
                  <Image
                    src="/finanzas-espirituales.svg"
                    alt="Finanzas Espirituales - Libro Principal"
                    width={280}
                    height={380}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain rounded"
                  />
                </div>
              </div>
              <div className="md:col-span-7">
                <div className="inline-block px-3 py-1 rounded bg-[#D4AF37] text-[#060B19] text-[11px] font-black uppercase tracking-wider mb-3">
                  ★ PRODUCTO PRINCIPAL ★
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFFFF] mb-3">
                  Finanzas Espirituales: Principios Bíblicos para una Vida Financiera Abundante
                </h3>
                <p className="text-sm sm:text-base text-[#A0AEC0] leading-relaxed mb-4">
                  El manual definitivo que te guía paso a paso a través de la sabiduría del Pentateuco, los Proverbios y el Nuevo Testamento. Aprende a ordenar tus ingresos, pagar deudas sin angustia, erradicar la mentalidad de escasez y convertir tu economía en un testimonio viviente del favor de Dios.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#CBD5E1]">
                  <span className="flex items-center gap-1.5 text-[#D4AF37]">
                    ✓ Guía práctica fundamentada en principios bíblicos
                  </span>
                  <span className="flex items-center gap-1.5 text-[#D4AF37]">
                    ✓ Formato PDF digital compatible con todo dispositivo
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-[rgba(212,175,55,0.2)] flex items-center justify-between">
                  <span className="text-xs uppercase text-[#A0AEC0] tracking-wider">Valor Comercial Individual:</span>
                  <span className="font-serif font-bold text-lg text-[#D4AF37]">$47.00 USD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de los 4 Bonos Gratuitos */}
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F3E5AB]">
              + Tus 4 Bonos Exclusivos (100% Gratis Hoy)
            </h3>
            <p className="text-xs sm:text-sm text-[#A0AEC0] mt-1">
              Diseñados para complementar tu edificación espiritual, de oración y de convivencia familiar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Bono 1 */}
            <div className="bonus-card p-6 rounded-[8px] bg-[#111D42] border border-[rgba(212,175,55,0.25)] flex flex-col justify-between hover:border-[#D4AF37] transition-all">
              <div>
                <div className="w-full h-[220px] rounded-[6px] overflow-hidden bg-[#060B19] p-2 border border-[#D4AF37]/30 mb-4 flex items-center justify-center">
                  <Image
                    src="/bono-codigo-divino.svg"
                    alt="Bono 1 - Código Divino"
                    width={200}
                    height={280}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                  BONO #1 • EDICIÓN DIGITAL
                </div>
                <h4 className="font-serif text-lg font-bold text-[#FFFFFF] mb-2">
                  Código Divino: Claves Ocultas para la Abundancia
                </h4>
                <p className="text-xs text-[#A0AEC0] leading-relaxed">
                  Descubre las llaves bíblicas ocultas en las Sagradas Escrituras para abrir puertas financieras cerradas y vencer temores económicos.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[rgba(212,175,55,0.15)] flex items-center justify-between text-xs">
                <span className="line-through text-[#718096]">$19.00 USD</span>
                <span className="font-bold text-[#38A169] uppercase">¡HOY GRATIS!</span>
              </div>
            </div>

            {/* Bono 2 */}
            <div className="bonus-card p-6 rounded-[8px] bg-[#111D42] border border-[rgba(212,175,55,0.25)] flex flex-col justify-between hover:border-[#D4AF37] transition-all">
              <div>
                <div className="w-full h-[220px] rounded-[6px] overflow-hidden bg-[#060B19] p-2 border border-[#D4AF37]/30 mb-4 flex items-center justify-center">
                  <Image
                    src="/bono-oracion.svg"
                    alt="Bono 2 - 30 Días de Oración"
                    width={200}
                    height={280}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                  BONO #2 • DEVOCIONAL
                </div>
                <h4 className="font-serif text-lg font-bold text-[#FFFFFF] mb-2">
                  30 Días de Oración con Versículos del Pentateuco
                </h4>
                <p className="text-xs text-[#A0AEC0] leading-relaxed">
                  Una guía diaria de intercesión basada en Génesis a Deuteronomio para clamar con autoridad por provisión, paz y dirección.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[rgba(212,175,55,0.15)] flex items-center justify-between text-xs">
                <span className="line-through text-[#718096]">$15.00 USD</span>
                <span className="font-bold text-[#38A169] uppercase">¡HOY GRATIS!</span>
              </div>
            </div>

            {/* Bono 3 */}
            <div className="bonus-card p-6 rounded-[8px] bg-[#111D42] border border-[rgba(212,175,55,0.25)] flex flex-col justify-between hover:border-[#D4AF37] transition-all">
              <div>
                <div className="w-full h-[220px] rounded-[6px] overflow-hidden bg-[#060B19] p-2 border border-[#D4AF37]/30 mb-4 flex items-center justify-center">
                  <Image
                    src="/bono-devocionales.svg"
                    alt="Bono 3 - Devocionales de Poder"
                    width={200}
                    height={280}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                  BONO #3 • CRECIMIENTO DIARIO
                </div>
                <h4 className="font-serif text-lg font-bold text-[#FFFFFF] mb-2">
                  Devocionales de Poder: 30 Días para Profundizar
                </h4>
                <p className="text-xs text-[#A0AEC0] leading-relaxed">
                  Reflexiones de alto impacto para nutrir tu fe matutina, desarrollar constancia espiritual y mantener el enfoque en las promesas de Dios.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[rgba(212,175,55,0.15)] flex items-center justify-between text-xs">
                <span className="line-through text-[#718096]">$17.00 USD</span>
                <span className="font-bold text-[#38A169] uppercase">¡HOY GRATIS!</span>
              </div>
            </div>

            {/* Bono 4 */}
            <div className="bonus-card p-6 rounded-[8px] bg-[#111D42] border border-[rgba(212,175,55,0.25)] flex flex-col justify-between hover:border-[#D4AF37] transition-all">
              <div>
                <div className="w-full h-[220px] rounded-[6px] overflow-hidden bg-[#060B19] p-2 border border-[#D4AF37]/30 mb-4 flex items-center justify-center">
                  <Image
                    src="/bono-historias.svg"
                    alt="Bono 4 - Historias Bíblicas"
                    width={200}
                    height={280}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                  BONO #4 • LECTURA FAMILIAR
                </div>
                <h4 className="font-serif text-lg font-bold text-[#FFFFFF] mb-2">
                  Historias Bíblicas para Toda la Familia
                </h4>
                <p className="text-xs text-[#A0AEC0] leading-relaxed">
                  Relatos cautivadores y edificantes para compartir con tus hijos o nietos, inculcando principios morales y fe en el hogar.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[rgba(212,175,55,0.15)] flex items-center justify-between text-xs">
                <span className="line-through text-[#718096]">$19.00 USD</span>
                <span className="font-bold text-[#38A169] uppercase">¡HOY GRATIS!</span>
              </div>
            </div>

          </div>

          {/* Resumen de Valor Total */}
          <div className="mt-12 p-6 rounded-[8px] bg-[#060B19] border border-[#D4AF37] text-center max-w-2xl mx-auto">
            <div className="text-xs text-[#A0AEC0] uppercase tracking-widest">
              Valor Total de los 5 Libros por Separado:
            </div>
            <div className="text-2xl font-bold line-through text-[#E53E3E] my-1">
              $117.00 USD
            </div>
            <div className="text-sm font-semibold text-[#CBD5E1]">
              Hoy adquieres todo el paquete completo por solo:
            </div>
            <div className="text-4xl sm:text-5xl font-black text-[#D4AF37] font-serif my-2">
              $6.90 USD
            </div>
            <a
              href={HOTMART_CHECKOUT_URL}
              className="mt-3 px-8 py-3.5 rounded-[6px] font-sans font-extrabold text-sm uppercase tracking-wider text-[#060B19] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] shadow-[0_6px_20px_rgba(212,175,55,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer border-none inline-block text-center"
            >
              QUIERO EL PAQUETE COMPLETO POR $6.90 USD
            </a>
          </div>
        </section>

        {/* 7. Sección de Oferta Principal (El Checkout Box) */}
        <section id="oferta" className="max-w-4xl mx-auto px-4 sm:px-8 py-20">
          <div id="offer-box" className="p-8 sm:p-12 rounded-[12px] bg-[#111D42] border-2 border-[#D4AF37] shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative text-center">
            
            {/* Tag superior de la oferta */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-[4px] bg-[#D4AF37] text-[#060B19] font-black text-xs uppercase tracking-[2px] -mt-16 mb-8 shadow-lg">
              ★ OFERTA EXCLUSIVA: 5 LIBROS POR $6.90 USD ★
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFFFF] mb-3">
              Descarga Inmediata del Paquete Completo
            </h2>
            <p className="text-sm sm:text-base text-[#A0AEC0] max-w-xl mx-auto mb-8">
              Recibe acceso vitalicio e inmediato a los <strong className="text-[#D4AF37]">5 Libros Digitales</strong> en tu correo electrónico segundos después de completar tu pago seguro.
            </p>

            {/* Checklist de Entrega Inmediata */}
            <div className="bg-[#060B19] rounded-[8px] p-6 sm:p-8 border border-[rgba(212,175,55,0.25)] max-w-2xl mx-auto mb-8 text-left">
              <h4 className="text-xs uppercase tracking-[1px] text-[#D4AF37] font-bold mb-4">
                Lo que recibirás inmediatamente hoy:
              </h4>
              <ul className="space-y-3.5 text-sm sm:text-base text-[#CBD5E1]">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-[4px] bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37] text-xs font-bold">
                    ✓
                  </div>
                  <span><strong className="text-[#FFFFFF]">Libro Principal: Finanzas Espirituales</strong> — Manual paso a paso de los 4 Pilares de Prosperidad Bíblica (Valor $47 USD).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-[4px] bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37] text-xs font-bold">
                    ✓
                  </div>
                  <span><strong className="text-[#FFFFFF]">Bono #1: Código Divino</strong> — Claves ocultas para activar abundancia y romper ataduras de escasez (Valor $19 USD).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-[4px] bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37] text-xs font-bold">
                    ✓
                  </div>
                  <span><strong className="text-[#FFFFFF]">Bono #2: 30 Días de Oración con el Pentateuco</strong> — Guía de clamor e intercesión económica diaria (Valor $15 USD).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-[4px] bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37] text-xs font-bold">
                    ✓
                  </div>
                  <span><strong className="text-[#FFFFFF]">Bono #3: Devocionales de Poder</strong> — 30 días de renovación mental y fe activa (Valor $17 USD).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-[4px] bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37] text-xs font-bold">
                    ✓
                  </div>
                  <span><strong className="text-[#FFFFFF]">Bono #4: Historias Bíblicas para Toda la Familia</strong> — Relatos de fe para educar a tus hijos (Valor $19 USD).</span>
                </li>
              </ul>
            </div>

            {/* Anclaje de Precio Definitivo */}
            <div className="mb-8">
              <div className="text-[#A0AEC0] line-through text-lg sm:text-xl font-medium">
                Precio Normal: $47.00 USD
              </div>
              <div className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mt-1">
                Precio Especial de Lanzamiento:
              </div>
              <div className="flex items-baseline justify-center gap-1.5 my-2">
                <span className="text-3xl sm:text-4xl font-bold text-[#D4AF37]">$</span>
                <span className="font-serif text-6xl sm:text-7xl font-black text-[#D4AF37] tracking-tight">
                  6.90
                </span>
                <span className="text-base sm:text-lg font-bold text-[#A0AEC0] ml-1">USD</span>
              </div>
              <div className="text-xs sm:text-sm text-[#38A169] font-bold">
                ✓ Pago único • Sin cuotas ni suscripciones mensuales
              </div>
            </div>

            {/* Botón de Acción Principal con Gatillo de Conversión */}
            <a
              id="cta-offer-btn"
              href={HOTMART_CHECKOUT_URL}
              className="w-full max-w-lg mx-auto py-4 sm:py-5 px-8 rounded-[8px] font-sans font-black text-base sm:text-xl tracking-wider uppercase text-[#060B19] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] shadow-[0_10px_35px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_50px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer border-none block text-center"
            >
              ¡SÍ! QUIERO ENTENDER LA BIBLIA Y COMPRAR AHORA
            </a>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-[#A0AEC0]">
              <span className="flex items-center gap-1">🔒 Encriptación SSL 256-Bit</span>
              <span>•</span>
              <span className="flex items-center gap-1">⚡ Acceso Inmediato a tu Email</span>
              <span>•</span>
              <span className="flex items-center gap-1">📱 Compatible con Celular, Tablet y PC</span>
            </div>

            {/* Sello de Garantía Blindada de 7 Días */}
            <div id="guarantee-badge" className="mt-12 pt-8 border-t border-[rgba(212,175,55,0.15)] max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="w-16 h-16 rounded-[6px] bg-[#060B19] border-2 border-[#D4AF37] flex flex-col items-center justify-center shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                <span className="font-serif text-2xl font-black text-[#D4AF37]">7</span>
                <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider -mt-1">DÍAS</span>
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#D4AF37] mb-1">
                  Garantía Incondicional de Satisfacción Total
                </h4>
                <p className="text-xs sm:text-sm text-[#A0AEC0] leading-relaxed">
                  Tienes 7 días completos para descargar, leer y aplicar los principios. Si por cualquier motivo sientes que este material no superó tus expectativas, solicita el reembolso y te devolveremos el 100% de tu dinero sin preguntas ni complicaciones.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 9. Preguntas Frecuentes (FAQ) de Alta Conversión */}
        <section className="max-w-4xl mx-auto px-4 sm:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFFFF] mb-3">
              Preguntas Frecuentes
            </h3>
            <p className="text-xs sm:text-sm text-[#A0AEC0]">
              Respuestas claras a las dudas más comunes sobre la entrega y el contenido.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-[8px] bg-[#111D42] border border-[rgba(212,175,55,0.2)]">
              <h4 className="font-bold text-sm sm:text-base text-[#F3E5AB] mb-2">
                ¿Cómo recibiré los 5 libros tras comprar?
              </h4>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                Inmediatamente después de confirmarse tu pago de $6.90 USD, recibirás un correo electrónico con tu enlace de descarga directa. Podrás guardar los 5 libros en tu teléfono celular, tablet o computadora para leerlos cuando quieras, incluso sin conexión a internet.
              </p>
            </div>

            <div className="p-5 rounded-[8px] bg-[#111D42] border border-[rgba(212,175,55,0.2)]">
              <h4 className="font-bold text-sm sm:text-base text-[#F3E5AB] mb-2">
                ¿Por qué el precio es tan accesible ($6.90 USD)?
              </h4>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                Nuestra misión principal es que ninguna familia se quede sin acceso a esta revelación bíblica por motivos económicos. Queremos que el precio sea completamente asequible para cualquier creyente en cualquier país de habla hispana.
              </p>
            </div>

            <div className="p-5 rounded-[8px] bg-[#111D42] border border-[rgba(212,175,55,0.2)]">
              <h4 className="font-bold text-sm sm:text-base text-[#F3E5AB] mb-2">
                ¿Es un pago único o me cobrarán cada mes?
              </h4>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                Es un pago único y definitivo de $6.90 USD. No hay mensualidades, ni renovaciones automáticas, ni cargos ocultos jamás.
              </p>
            </div>

            <div className="p-5 rounded-[8px] bg-[#111D42] border border-[rgba(212,175,55,0.2)]">
              <h4 className="font-bold text-sm sm:text-base text-[#F3E5AB] mb-2">
                ¿Qué métodos de pago están disponibles?
              </h4>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                Aceptamos todas las tarjetas de crédito y débito internacionales (Visa, Mastercard, American Express), PayPal y los principales métodos de pago locales según tu país a través de pasarelas 100% seguras.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href={HOTMART_CHECKOUT_URL}
              className="px-8 py-3.5 rounded-[6px] font-sans font-bold text-sm uppercase tracking-wider text-[#060B19] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer border-none inline-block text-center"
            >
              QUIERO ENTENDER LA BIBLIA - COMPRAR AHORA POR $6.90 USD
            </a>
          </div>
        </section>

      </main>

      {/* 10. Sticky Bottom Bar para Conversión en Mobile y Desktop */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#060B19]/95 backdrop-blur-md border-t border-[#D4AF37]/40 p-3 sm:p-4 shadow-[0_-5px_25px_rgba(0,0,0,0.8)] transition-all">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="hidden sm:block text-2xl text-[#D4AF37]">📖</div>
              <div>
                <div className="font-serif font-bold text-xs sm:text-sm text-[#FFFFFF]">
                  Paquete Completo de 5 Libros de Prosperidad Bíblica
                </div>
                <div className="text-[11px] text-[#A0AEC0]">
                  De <span className="line-through">$47.00</span> por solo <strong className="text-[#D4AF37]">$6.90 USD</strong> (Acceso Inmediato)
                </div>
              </div>
            </div>

            <a
              href={HOTMART_CHECKOUT_URL}
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-[6px] font-sans font-extrabold text-xs sm:text-sm uppercase tracking-wider text-[#060B19] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] shadow-[0_4px_15px_rgba(212,175,55,0.4)] hover:brightness-105 active:scale-95 transition-all cursor-pointer border-none shrink-0 text-center inline-block"
            >
              COMPRAR AHORA POR $6.90 USD
            </a>
          </div>
        </div>
      )}

      {/* 11. Footer en Español en Conformidad con Meta Ads (Sin Autor) */}
      <footer id="rodape" className="bg-[#060B19] border-t border-[rgba(255,255,255,0.05)] py-12 px-4 sm:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[4px] bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-[#060B19] font-bold">
                †
              </div>
              <span className="font-serif font-bold tracking-[2px] text-sm sm:text-base text-[#D4AF37]">
                FINANZAS ESPIRITUALES
              </span>
            </div>

            {/* Enlaces de Conformidad Meta Ads */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#718096]">
              <button
                type="button"
                onClick={() => setModalType('termos')}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Términos de Uso
              </button>
              <button
                type="button"
                onClick={() => setModalType('privacidad')}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Políticas de Privacidad
              </button>
              <button
                type="button"
                onClick={() => setModalType('contacto')}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Contacto & Soporte
              </button>
              <span>© {new Date().getFullYear()} Finanzas Espirituales. Todos los derechos reservados.</span>
            </div>
          </div>

          {/* Descargo Legal Explícito */}
          <div className="pt-6 text-[10px] text-[#4A5568] leading-relaxed space-y-2 text-justify sm:text-center max-w-4xl mx-auto">
            <p>
              AVISO LEGAL: Los resultados espirituales y financieros pueden variar de acuerdo con la aplicación personal y disciplina de cada individuo. Este material es de carácter estrictamente educativo, devocional y de orientación basada en principios bíblicos. No constituye asesoramiento financiero regulado, contable ni promesa de enriquecimiento rápido sin trabajo diligente.
            </p>
            <p>
              Este sitio web no forma parte de Meta Platforms, Inc., Facebook o Instagram. Adicionalmente, este sitio NO está patrocinado ni respaldado por Meta de ninguna forma. FACEBOOK e INSTAGRAM son marcas registradas de Meta Platforms, Inc.
            </p>
          </div>

        </div>
      </footer>

      {/* 12. Modal de Checkout de Alta Conversión */}
      {modalType === 'checkout' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111D42] border-2 border-[#D4AF37] rounded-[10px] max-w-md w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-left shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative">
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-[4px] bg-[#060B19] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#060B19] flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>

            {checkoutStep === 'details' ? (
              <div>
                <div className="text-center mb-6">
                  <div className="inline-block px-3 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37] text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                    Acceso Seguro Inmediato
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFFFFF]">
                    Finaliza tu Orden Segura
                  </h3>
                  <p className="text-xs text-[#A0AEC0] mt-1">
                    Recibirás los 5 Libros Digitales de inmediato en tu correo.
                  </p>
                </div>

                {/* Resumen del Pedido */}
                <div className="p-3.5 rounded-[6px] bg-[#060B19] border border-[#D4AF37]/30 mb-5 text-xs">
                  <div className="flex justify-between font-bold text-[#FFFFFF] mb-1">
                    <span>Paquete 5 Libros de Prosperidad Total</span>
                    <span className="text-[#D4AF37]">$6.90 USD</span>
                  </div>
                  <div className="text-[11px] text-[#38A169]">
                    ✓ Incluye Finanzas Espirituales + 4 Bonos de Regalo
                  </div>
                </div>

                <form onSubmit={handleCompleteOrder} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#CBD5E1] font-semibold mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Ej. Juan Pérez"
                      className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#060B19] border border-[#D4AF37]/40 text-[#FFFFFF] placeholder-[#718096] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#CBD5E1] font-semibold mb-1">
                      Correo Electrónico (Donde recibirás los libros)
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="tu-correo@ejemplo.com"
                      className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#060B19] border border-[#D4AF37]/40 text-[#FFFFFF] placeholder-[#718096] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <a
                    href={HOTMART_CHECKOUT_URL}
                    className="w-full py-3.5 px-6 rounded-[6px] font-sans font-black text-sm uppercase tracking-wider text-[#060B19] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:brightness-105 active:scale-95 transition-all cursor-pointer border-none mt-2 block text-center"
                  >
                    CONFIRMAR Y DESCARGAR POR $6.90 USD
                  </a>
                </form>

                <div className="mt-4 pt-4 border-t border-[rgba(212,175,55,0.15)] text-center text-[10px] text-[#A0AEC0] space-y-1">
                  <div>🔒 Pasarela de pago encriptada con tecnología SSL 256-bit</div>
                  <div>🛡️ Garantía Incondicional de 7 Días</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-[#38A169]/20 border-2 border-[#38A169] text-[#38A169] text-3xl flex items-center justify-center mx-auto mb-4 font-bold">
                  ✓
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#FFFFFF] mb-2">
                  ¡Felicidades, {buyerName || 'Hermano'}!
                </h3>
                <p className="text-sm text-[#CBD5E1] mb-4">
                  Tu acceso al <strong className="text-[#D4AF37]">Paquete Completo de 5 Libros</strong> ha sido enviado a:
                </p>
                <div className="p-3 bg-[#060B19] rounded border border-[#D4AF37] font-mono text-sm text-[#F3E5AB] mb-6">
                  {buyerEmail}
                </div>
                <p className="text-xs text-[#A0AEC0] mb-6 leading-relaxed">
                  Por favor revisa tu bandeja de entrada (y la carpeta de promociones o spam). Que esta revelación sea el inicio de una temporada de fruto y paz en tu hogar.
                </p>
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-6 py-2.5 rounded-[4px] bg-[#D4AF37] text-[#060B19] font-bold text-xs uppercase tracking-wider hover:brightness-105 cursor-pointer border-none"
                >
                  Cerrar Ventana
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 13. Modales Legales en Español (Sin Autor) */}
      {modalType && modalType !== 'checkout' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111D42] border border-[#D4AF37] rounded-[8px] max-w-xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto text-[#A0AEC0] text-sm leading-relaxed shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(212,175,55,0.2)] mb-4">
              <h3 className="font-serif text-lg font-bold text-[#D4AF37]">
                {modalType === 'termos' && 'Términos de Uso'}
                {modalType === 'privacidad' && 'Políticas de Privacidad'}
                {modalType === 'contacto' && 'Contacto & Soporte'}
              </h3>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="w-8 h-8 rounded-[4px] bg-[#060B19] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#060B19] flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {modalType === 'termos' && (
              <div className="space-y-3 text-xs sm:text-sm">
                <p><strong>1. Objeto:</strong> El presente documento rige el acceso y uso del paquete digital &ldquo;Finanzas Espirituales&rdquo; y sus 4 bonos complementarios, comercializados exclusivamente con fines educativos y de crecimiento espiritual.</p>
                <p><strong>2. Propiedad Intelectual:</strong> Todos los textos, ilustraciones, diseños y conceptos contenidos en los materiales están protegidos por leyes de derechos de autor. Queda prohibida la reproducción, duplicación, reventa o distribución no autorizada.</p>
                <p><strong>3. Responsabilidad del Usuario:</strong> La aplicación de los principios bíblicos y la gestión financiera personal corresponden exclusivamente a la disciplina y libre criterio del lector.</p>
              </div>
            )}

            {modalType === 'privacidad' && (
              <div className="space-y-3 text-xs sm:text-sm">
                <p><strong>1. Recolección de Datos:</strong> Solicitamos únicamente el nombre y correo electrónico necesarios para procesar la transacción y enviar los enlaces de descarga digital.</p>
                <p><strong>2. Seguridad:</strong> Toda la información se procesa mediante pasarelas de pago con encriptación SSL de 256 bits conforme a estándares internacionales.</p>
                <p><strong>3. No Comercialización:</strong> No vendemos, no alquilamos ni compartimos tus datos con terceros para publicidad no deseada ni spam.</p>
              </div>
            )}

            {modalType === 'contacto' && (
              <div className="space-y-3 text-xs sm:text-sm">
                <p>¿Tienes dudas sobre el material o necesitas asistencia para descargar tus libros?</p>
                <p><strong>Correo de Soporte:</strong> soporte@finanzasespirituales.com</p>
                <p><strong>Horario de Atención:</strong> Lunes a Viernes de 09:00 a 18:00 (Hora Central / GMT-5).</p>
                <p>Tiempo estimado de respuesta: dentro de 24 horas hábiles.</p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-[rgba(212,175,55,0.2)] flex justify-end">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="px-5 py-2 rounded-[4px] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#060B19] font-bold text-xs uppercase tracking-wider hover:brightness-105 cursor-pointer border-none"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
