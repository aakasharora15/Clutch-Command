"use client";
import React, { useEffect, useRef, useState } from 'react';
import { CTA } from '../config/cta';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '../components/SectionHeader';
import FAQAccordion from '../components/FAQAccordion';
import ScrollReveal from '../components/ScrollReveal';
import MagneticElement from '../components/MagneticElement';
import TiltCard from '../components/TiltCard';
import ClipReveal from '../components/ClipReveal';
import StaggerReveal from '../components/StaggerReveal';
import SpotlightCard from '../components/SpotlightCard';
import Marquee from '../components/Marquee';
import PricingTiers from '../components/PricingTiers';
import TestimonialWall from '../components/TestimonialWall';
import VideoModal from '../components/VideoModal';

import { BlogPost } from '@/lib/markdown';

export default function HomeClient({ posts }: { posts: Omit<BlogPost, 'content'>[] }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);


  // Parallax hero observer
  useEffect(() => {
    const heroVideo = document.querySelector('.hero video') as HTMLElement;
    const handleScroll = () => {
      if (heroVideo) {
        const scrollY = window.scrollY;
        heroVideo.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="page-wrapper">

      {/* ===== HERO ===== */}
      <header className="hero" style={{ background: 'none' }}>
        {/* Video Background Structure */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/media__1783528047317.jpg"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        >
          {/* <source src="/hero-video.mp4" type="video/mp4" /> */}
        </video>
        <div className="hero-overlay" style={{ zIndex: 1 }}></div>
        <div className="hero-inner wrap" style={{ zIndex: 2 }}>
          <div>
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '16px', 
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)',
              padding: '6px 20px 6px 8px', borderRadius: '40px', marginBottom: '24px' 
            }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'url(/mark_jeffery.png) center/cover', border: '2px solid #111' }}></div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ddd', border: '2px solid #111', marginLeft: '-12px' }}></div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#bbb', border: '2px solid #111', marginLeft: '-12px' }}></div>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#fff', fontWeight: 500 }}>The Official Online Academy for Competitive Players.</p>
            </div>
            
            <h1 style={{ fontSize: 'clamp(64px, 8vw, 120px)', lineHeight: 0.9, letterSpacing: '-0.02em', margin: '0 0 24px 0', textTransform: 'uppercase' }}>Win The Points<br/>That Decide Matches.</h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '20px', maxWidth: '560px', lineHeight: 1.6, marginBottom: '40px', fontWeight: 400 }}>AI-powered pressure training for competitive tennis players. Diagnose your cognitive breakdown, train under simulated match stress, and close out the points that matter.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <MagneticElement strength={25}>
                <a href={CTA.url} className="btn-dark" style={{ background: 'var(--lime)', color: '#111', padding: '16px 32px', fontSize: '15px' }}>{CTA.labelArrow}</a>
              </MagneticElement>
              <button 
                onClick={() => setIsVideoOpen(true)}
                style={{ 
                  background: 'none', border: 'none', color: '#fff', fontSize: '15px', fontWeight: 600, 
                  display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
                  padding: '16px 0'
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </div>
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===== SCROLLING MARQUEE ===== */}
      <Marquee text="Mental Toughness • Tactical Execution • Cognitive Resilience" speed="20s" />

      {/* ===== THE PROBLEM (Asymmetrical) ===== */}
      <section className="airy-section section-fade-out section-fade-to-white" id="product">
        <ScrollReveal className="wrap">
          <SectionHeader eyebrow="The Problem" title="You don't lose matches because of technique. You lose them in two points." />
          <div className="grid-asym-3" style={{ alignItems: 'flex-start' }}>
            <div className="text-col" style={{ position: 'sticky', top: '140px' }}>
              <p>We focus on the exact moments where matches are won or lost: 30-30 in the final set, 5-5 in the breaker, or 8-8 in the deciding tiebreak. Traditional academies spend years drilling perfect technique and physical endurance, but they completely ignore the cognitive load of a high-pressure situation.</p>
              <br/>
              <p>When you have chances to close out a match, something else takes over. Your heart rate spikes, your vision narrows, and you revert to defensive habits. That is not a skill you are missing. It is a biological response that has never actually been measured or trained for - until now.</p>
              <MagneticElement strength={20}>
                <a href={CTA.url} className="btn-dark" style={{ marginTop: '48px' }}>{CTA.labelArrow}</a>
              </MagneticElement>
            </div>
            <ClipReveal className="img-col" style={{ position: 'relative', overflow: 'hidden' }}>
               <Image src="/tennis_player_exhausted.jpg" alt="Exhausted Player" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
            </ClipReveal>
            <ClipReveal className="img-col" style={{ position: 'relative', overflow: 'hidden' }}>
               <Image src="/bento_player_serve_1783528130916.jpg" alt="Player Serve" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
            </ClipReveal>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== HOW IT WORKS (The Process) ===== */}
      <section className="airy-section section-fade-out section-fade-to-dark" id="how-it-works" style={{ background: '#fff', color: '#111', paddingTop: '40px' }}>
        <ScrollReveal className="wrap">
          <SectionHeader eyebrow="The Academy" title="How We Engineer Resilience" />
          <StaggerReveal className="grid-cards-4" style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px' }}>
            <SpotlightCard spotlightColor="rgba(0,0,0,0.05)" className="step-card" style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ color: 'var(--lime)', WebkitTextStroke: '1px var(--bg-dark)', fontWeight: 800, fontSize: '56px', marginBottom: '16px', lineHeight: 1 }}>01</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: 600 }}>Diagnostic Testing</h3>
              <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>Take our cognitive diagnostic. We establish your baseline pressure threshold and identify exactly which of the 30 variables causes you to revert to defensive habits during match points.</p>
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(0,0,0,0.05)" className="step-card" style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ color: 'var(--lime)', WebkitTextStroke: '1px var(--bg-dark)', fontWeight: 800, fontSize: '56px', marginBottom: '16px', lineHeight: 1 }}>02</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: 600 }}>Match Film Analysis</h3>
              <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>Submit footage of your most difficult matches. Our proprietary AI and Grand Slam coaches analyze your movement, decision-making, and stroke degradation under pressure.</p>
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(0,0,0,0.05)" className="step-card" style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ color: 'var(--lime)', WebkitTextStroke: '1px var(--bg-dark)', fontWeight: 800, fontSize: '56px', marginBottom: '16px', lineHeight: 1 }}>03</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: 600 }}>Tactical Blueprint</h3>
              <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>Receive a custom training plan. We provide specific drills engineered to artificially inflate cognitive load and simulate championship points on the practice court.</p>
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(0,0,0,0.05)" className="step-card" style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ color: 'var(--lime)', WebkitTextStroke: '1px var(--bg-dark)', fontWeight: 800, fontSize: '56px', marginBottom: '16px', lineHeight: 1 }}>04</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: 600 }}>Execution & Review</h3>
              <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>Execute the blueprint. Every two weeks, you review new match footage with your designated coach to measure your Clutch Quotient progress and recalibrate.</p>
            </SpotlightCard>
          </StaggerReveal>
        </ScrollReveal>
      </section>


      {/* ===== THE SCIENCE (Bento Grid) ===== */}
      <section className="airy-section dark" id="science">
        <div className="wrap">
          <SectionHeader eyebrow="The Science" title="We Don't Guess. We Measure Pressure." />
          <div className="bento-grid">
            
            <div className="bento-item" style={{ gridColumn: 'span 5', minHeight: '500px', display: 'flex', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '32px', marginBottom: '24px', color: '#fff' }}>The Clutch Quotient (CQ)</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.6, marginBottom: '24px' }}>Pressure isn't a feeling—it's a biological response that ruins technique. The Clutch Quotient (CQ) is the first AI-driven framework to measure cognitive breakdown on the court.</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.6 }}>We analyze 30 specific variables, including shot selection under score-pressure, court positioning during breakpoints, and recovery time between high-stress points.</p>
            </div>

            <div className="bento-item" style={{ gridColumn: 'span 7', padding: 0, minHeight: '500px' }}>
               <Image src="/tennis_coach_talk.jpg" alt="Biometric Syncing" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 60vw" />
               <div className="bento-item glass" style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                 <h4 style={{ color: 'var(--lime)', fontSize: '20px', marginBottom: '8px' }}>Biometric Syncing</h4>
                 <p style={{ margin: 0, fontSize: '15px', color: '#fff' }}>Overlay heart rate data onto your match footage.</p>
               </div>
            </div>

            <div className="bento-item" style={{ gridColumn: 'span 12', padding: 0, minHeight: '400px' }}>
               <Image src="/tennis_shoe_clay.jpg" alt="Cognitive Mapping" fill style={{ objectFit: 'cover', objectPosition: 'center 70%' }} sizes="100vw" />
               <div className="bento-item glass" style={{ position: 'absolute', bottom: '24px', left: '24px', maxWidth: '400px', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                 <h4 style={{ color: 'var(--lime)', fontSize: '24px', marginBottom: '12px' }}>Cognitive Mapping</h4>
                 <p style={{ margin: 0, fontSize: '16px', color: '#fff' }}>See exactly when decision-making shifts from offensive to defensive survival mode.</p>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== PROGRAMS (Pill Cards) ===== */}
      <section className="airy-section section-fade-out section-fade-to-dark" id="programs">
        <div className="wrap">
          <SectionHeader eyebrow="The Academy Membership" title="Everything You Need to Win Deciding Points" />
          <div className="grid-cards-3">
            <div className="pill-card" style={{ position: 'relative', overflow: 'hidden', padding: '16px' }}>
               <Image src="/tennis_serve_shadow.jpg" alt="Singles Blueprint" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
               <div className="pill-card-content" style={{ position: 'relative', zIndex: 10, background: 'rgba(10,15,10,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h3 style={{ color: 'var(--lime)', fontSize: '22px' }}>Singles Masterclass</h3>
                  <p style={{ margin: 0, fontSize: '14px' }}>Grand Slam singles coaching led by Vlado Platenik. Weekly tactical blueprints and high-intensity repetition drills.</p>
               </div>
            </div>
            <div className="pill-card" style={{ position: 'relative', overflow: 'hidden', padding: '16px' }}>
               <Image src="/bento_player_celebrate_1783528150116.jpg" alt="Doubles Blueprint" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
               <div className="pill-card-content" style={{ position: 'relative', zIndex: 10, background: 'rgba(10,15,10,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h3 style={{ color: 'var(--lime)', fontSize: '22px' }}>Doubles Mastery</h3>
                  <p style={{ margin: 0, fontSize: '14px' }}>Elite doubles strategies with Dan Kiernan. Court positioning, communication, and exploiting opponent weaknesses.</p>
               </div>
            </div>
            <div className="pill-card" style={{ position: 'relative', overflow: 'hidden', padding: '16px' }}>
               <Image src="/bento_player_backhand_1783528140582.jpg" alt="AI Pressure Scoring" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
               <div className="pill-card-content" style={{ position: 'relative', zIndex: 10, background: 'rgba(10,15,10,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h3 style={{ color: 'var(--lime)', fontSize: '22px' }}>Proprietary AI Scoring</h3>
                  <p style={{ margin: 0, fontSize: '14px' }}>Our exclusive backend engine scores your match footage against 30 variables to expose your pressure leaks.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DELIVERABLES (Bento Grid) ===== */}
      <section className="airy-section dark" id="deliverables">
        <div className="wrap">
          <SectionHeader eyebrow="What You Get" title="The Complete Pressure Toolkit" />
          <div className="bento-grid">
            
            <div className="bento-item" style={{ gridColumn: 'span 4', padding: 0, minHeight: '480px' }}>
               <Image src="/tennis_court_night.jpg" alt="3D Memory Surface" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
               <div className="bento-item glass" style={{ position: 'absolute', inset: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px' }}>
                  <div style={{ fontSize: '72px', fontWeight: 800, color: 'rgba(255,255,255,0.15)', lineHeight: 0.8, marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>01</div>
                  <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '12px' }}>3D Memory Surface Report</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', margin: 0 }}>A comprehensive digital dashboard breaking down your match footage. See your exact CQ score and where your pressure threshold broke.</p>
               </div>
            </div>

            <div className="bento-item" style={{ gridColumn: 'span 4', padding: 0, minHeight: '480px' }}>
               <Image src="/tennis_blueprint.jpg" alt="Tactical Blueprints" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
               <div className="bento-item glass" style={{ position: 'absolute', inset: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px' }}>
                  <div style={{ fontSize: '72px', fontWeight: 800, color: 'rgba(255,255,255,0.15)', lineHeight: 0.8, marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>02</div>
                  <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '12px' }}>Weekly Tactical Blueprints</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', margin: 0 }}>Custom high-intensity drill routines designed by Grand Slam coaches to rewire your specific pressure weaknesses.</p>
               </div>
            </div>

            <div className="bento-item" style={{ gridColumn: 'span 4', padding: 0, minHeight: '480px' }}>
               <Image src="/tennis_racquet_hit.jpg" alt="Coach Reviews" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
               <div className="bento-item glass" style={{ position: 'absolute', inset: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px' }}>
                  <div style={{ fontSize: '72px', fontWeight: 800, color: 'rgba(255,255,255,0.15)', lineHeight: 0.8, marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>03</div>
                  <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '12px' }}>1-on-1 Coach Reviews</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', margin: 0 }}>Bi-weekly video calls with your designated elite coach to review your latest match footage and adjust your training cognitive load.</p>
               </div>
            </div>

          </div>
        </div>
      </section>

      <PricingTiers />

      {/* ===== ABOUT FOUNDER ===== */}
      <section className="airy-section section-fade-out section-fade-to-light dark" id="co-founders">
        <div className="wrap">
          <SectionHeader eyebrow="The Founder" title="Forged in the Military. Perfected on the Court." />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginTop: '64px' }}>
            <ClipReveal className="img-col" style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', aspectRatio: '0.8', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
               <Image src="/bento_player_serve_1783528130916.jpg" alt="Mark Jeffery Serving" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,10,0.9), transparent)' }}></div>
               <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'url(/mark_jeffery.png) center/cover', border: '2px solid var(--lime)', marginBottom: '16px' }}></div>
                  <h3 style={{ color: '#fff', fontSize: '28px', marginBottom: '8px' }}>Mark Jeffery</h3>
                  <p style={{ color: 'var(--lime)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '13px' }}>Founder & Head of Human Performance</p>
               </div>
            </ClipReveal>
            <div>
              <h3 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '24px', lineHeight: 1.1, color: '#fff' }}>Built to answer a question no one could answer him.</h3>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '24px' }}>
                He didn't build it from a theory. He built it from a memory. Two match points up against the RAF's number one, on the grass at Wimbledon, and still finding a way to give it away. 
              </p>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '40px' }}>
                Pressure hijacked his brain and body, and the next thing he knew, it was game, set, and match to his opponent. Clutch Quotient started life in the military: training people to make life-or-death decisions with no action replay. Now, it's the ultimate weapon for competitive tennis players.
              </p>
              <MagneticElement strength={20}>
                <Link href="/co-founders" className="btn-dark" style={{ background: 'var(--lime)', color: '#111', padding: '16px 32px', fontSize: '15px' }}>Read The Full Story &rarr;</Link>
              </MagneticElement>
            </div>
          </div>
        </div>
      </section>

      <TestimonialWall />

      {/* ===== FAQ ===== */}
      <section className="airy-section dark" id="faq" style={{ paddingBottom: '160px' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'start' }}>
            <div>
              <SectionHeader eyebrow="FAQ" title="Common Questions" />
              <p style={{ marginTop: '24px', fontSize: '18px', color: 'var(--muted)', lineHeight: 1.6, maxWidth: '90%' }}>
                Everything you need to know about the TRUST protocol, our 100% guarantee, and how we engineer elite cognitive resilience on the court.
              </p>
            </div>
            <div style={{ marginTop: 0 }}>
              <FAQAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* ===== LATEST ARTICLES ===== */}
      <section className="airy-section" style={{ background: '#ffffff', color: '#111' }}>
        <ScrollReveal className="wrap">
          <SectionHeader eyebrow="Blog" title="Read Latest Articles" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginTop: '48px' }}>
            
            {posts && posts.map((post) => (
              <TiltCard key={post.slug} style={{ display: 'flex', flexDirection: 'column' }}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>
                    <Image src={post.thumbnail} alt={post.title} fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '11px', padding: '4px 12px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)' }}>
                      {post.category}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: `url(${post.authorImage}) center/cover` }}></div>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{post.author}</span>
                    <span style={{ fontSize: '13px', color: '#888', marginLeft: 'auto' }}>{post.date}</span>
                  </div>
                  <h3 style={{ fontSize: '20px', lineHeight: 1.3, marginBottom: '12px' }}>{post.title}</h3>
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6 }}>{post.excerpt}</p>
                </Link>
              </TiltCard>
            ))}

          </div>
        </ScrollReveal>
      </section>

      {/* ===== INTERACTIVE LEAD MAGNET ===== */}
      <section className="airy-section dark" style={{ paddingBottom: '160px' }}>
        <ScrollReveal className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 className="section-header" style={{ textAlign: 'center', marginBottom: '24px' }}>Test Your Pressure Threshold</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>Take the 60-second Clutch Quotient Diagnostic to uncover exactly why your game breaks down on deciding points.</p>
          </div>
        </ScrollReveal>
      </section>

      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      
      {/* ===== DIAGNOSTIC CTA ===== */}
      <section className="airy-section" style={{ position: 'relative', overflow: 'hidden', minHeight: '500px', display: 'flex', alignItems: 'center' }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/hero_tennis_court_1783528122643.jpg"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        >
          {/* <source src="/cta-video.mp4" type="video/mp4" /> */}
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,20,10,0.95) 0%, rgba(10,20,10,0.4) 100%)', zIndex: 1 }}></div>
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
           <h2 className="section-header" style={{ color: '#fff', marginBottom: '24px', fontSize: 'clamp(40px, 6vw, 72px)' }}>Ready to train<br/>with us ?</h2>
           <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '500px', fontSize: '18px' }}>Experience pressure training like never before – tactical drills, AI scoring, and a community that builds resilience.</p>
           <MagneticElement strength={25}>
             <a href={CTA.url} className="btn-dark" style={{ marginTop: '32px', background: 'var(--lime)', color: '#111', padding: '16px 32px', fontSize: '15px' }}>{CTA.labelArrow}</a>
           </MagneticElement>
        </div>
      </section>

    </div>
  );
}
