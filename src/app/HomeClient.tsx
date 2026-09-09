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
import AnimatedCounter from '../components/AnimatedCounter';
import PlatformSneakPeek from '../components/PlatformSneakPeek';
import PricingTiers from '../components/PricingTiers';
import TestimonialWall from '../components/TestimonialWall';
import VideoModal from '../components/VideoModal';
import CQAssessment from '../components/CQAssessment';

import { BlogPost } from '@/lib/markdown';

const ECG_PATH =
  "M0,75 L14,75 Q16,52 18,60 L22,75 L34,75 L38,83 L42,75 L46,40 L50,130 L54,70 L58,92 L62,68 L66,75 L150,75 " +
  "L164,75 Q166,52 168,60 L172,75 L184,75 L188,83 L192,75 L196,20 L200,130 L204,70 L208,92 L212,68 L216,75 L300,75 " +
  "L314,75 Q316,52 318,60 L322,75 L334,75 L338,83 L342,75 L346,6 L350,130 L354,70 L358,92 L362,68 L366,75 L450,75 " +
  "L464,75 Q466,52 468,60 L472,75 L484,75 L488,83 L492,75 L496,22 L500,130 L504,70 L508,92 L512,68 L516,75 L600,75 " +
  "L614,75 Q616,52 618,60 L622,75 L634,75 L638,83 L642,75 L646,42 L650,130 L654,70 L658,92 L662,68 L666,75 L750,75 L760,75";

const TOTAL_MS = 3200;

function vibrate(pattern: number | number[]) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try { navigator.vibrate(pattern); } catch (e) { /* noop */ }
  }
}

function PressureIntro({ onDone }: { onDone?: () => void }) {
  const introRef = useRef<HTMLDivElement>(null);
  const traceRef = useRef<SVGPathElement>(null);
  const scanRef = useRef<SVGCircleElement>(null);
  const pressureRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [phase, setPhase] = useState<'idle' | 'pulsing' | 'reveal' | 'gone'>('idle');

  useEffect(() => {
    if (traceRef.current) {
      const len = traceRef.current.getTotalLength();
      traceRef.current.style.strokeDasharray = `${len}`;
      traceRef.current.style.strokeDashoffset = `${len}`;
    }
  }, []);

  function handleSkip() {
    const audio = audioRef.current;
    if (audio) { 
      try { audio.pause(); audio.currentTime = 0; } catch (e) {} 
    }
    if (onDone) onDone();
  }

  function run() {
    setPhase('pulsing');
    vibrate(40);

    const trace = traceRef.current;
    const scan = scanRef.current;
    const pressureEl = pressureRef.current;
    const audio = audioRef.current;
    const len = trace ? trace.getTotalLength() : 2000;

    if (!audio) { setPhase('reveal'); setTimeout(() => { if (onDone) onDone(); }, 1000); return; }

    let actx: AudioContext | undefined, analyser: AnalyserNode | null = null, dataArr: Uint8Array | undefined, gainNode: GainNode | undefined;
    try {
      // @ts-ignore
      actx = new (window.AudioContext || window.webkitAudioContext)();
      const srcNode = actx.createMediaElementSource(audio);
      analyser = actx.createAnalyser();
      analyser.fftSize = 512;
      dataArr = new Uint8Array(analyser.frequencyBinCount);
      gainNode = actx.createGain();
      srcNode.connect(analyser);
      analyser.connect(gainNode);
      gainNode.connect(actx.destination);
    } catch (e) {
      analyser = null;
    }

    let start: number | null = null;
    let lastBeat = -999;
    let rafId: number;

    function frame(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(elapsed / TOTAL_MS, 1);

      if (trace) trace.style.strokeDashoffset = `${len * (1 - p)}`;
      if (scan && trace) {
        const pt = trace.getPointAtLength(len * p);
        scan.setAttribute('cx', `${pt.x}`);
        scan.setAttribute('cy', `${pt.y}`);
        scan.style.opacity = '1';
      }
      if (pressureEl) pressureEl.textContent = (p * 87.4).toFixed(1);

      if (analyser && dataArr) {
        // @ts-ignore
        analyser.getByteTimeDomainData(dataArr);
        let maxDev = 0;
        for (let i = 0; i < dataArr.length; i++) {
          const d = Math.abs(dataArr[i] - 128);
          if (d > maxDev) maxDev = d;
        }
        if (maxDev > 34 && elapsed - lastBeat > 140) {
          lastBeat = elapsed;
          if (scan) scan.setAttribute('r', '7');
          vibrate(30);
          setTimeout(() => { if (scan) scan.setAttribute('r', '4'); }, 90);
        }
      }

      if (elapsed < TOTAL_MS) {
        rafId = requestAnimationFrame(frame);
      } else {
        setPhase('reveal');
        setTimeout(() => { if (onDone) onDone(); }, 1000);
      }
    }

    audio.currentTime = 0;
    if (gainNode && actx) {
      const now = actx.currentTime;
      const fadeStart = TOTAL_MS - 900;
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(1, now);
      gainNode.gain.setValueAtTime(1, now + fadeStart / 1000);
      gainNode.gain.linearRampToValueAtTime(0.0001, now + TOTAL_MS / 1000);
    }
    const playPromise = audio.play();
    rafId = requestAnimationFrame(frame);
    setTimeout(() => { if (audio) audio.pause(); }, TOTAL_MS);
    if (playPromise && playPromise.catch) {
      playPromise.catch(() => { /* autoplay blocked */ });
    }

    return () => { if (rafId) cancelAnimationFrame(rafId); };
  }

  if (phase === 'gone') return null;

  const content = (
    <div
      id="intro"
      ref={introRef}
      className={phase === 'pulsing' ? 'pulsing' : phase === 'reveal' ? 'pulsing reveal' : ''}
    >
      <div className="grid-bg"></div>
      <div className="vignette"></div>
      <div className="intro-readout">
        <span>CLUTCH&#8202;//&#8202;PRESSURE&nbsp;SIGNAL</span>
        <span className="live">Live Feed</span>
      </div>
      <div className="ecg">
        <svg viewBox="0 0 760 150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ecgGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6FD9C9" />
              <stop offset="32%" stopColor="#8FE3FF" />
              <stop offset="50%" stopColor="#EAFFC8" />
              <stop offset="68%" stopColor="#8FE3FF" />
              <stop offset="100%" stopColor="#6FD9C9" />
            </linearGradient>
          </defs>
          <line className="base" x1="0" y1="75" x2="760" y2="75" />
          <path className="trace" ref={traceRef} d={ECG_PATH} />
          <circle className="scan" ref={scanRef} r="4" cx="0" cy="75" />
        </svg>
      </div>
      <div className="intro-metrics">
        <div><div className="k">Signal</div><div className="v">CQ&nbsp;<b>3D</b></div></div>
        <div><div className="k">Pressure Index</div><div className="v" ref={pressureRef}>00.0</div></div>
        <div><div className="k">Status</div><div className="v"><b>Locked</b></div></div>
      </div>
      <div className="intro-score">
        30&#8202;&#8211;&#8202;30
        <small>The point that decides it</small>
      </div>
      <div style={{ display: 'flex', gap: '16px', marginTop: '38px', position: 'relative', zIndex: 10 }}>
        <button className="enter-btn" style={{ marginTop: 0 }} onClick={run}>Enter The Arena</button>
        <button className="intro-skip" style={{ marginTop: 0, padding: '15px 34px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: '#fff', fontSize: '11px', letterSpacing: '0.2em', cursor: 'pointer' }} onClick={handleSkip}>Skip Animation</button>
      </div>
      <audio ref={audioRef} src="/audio/heartbeat.mp3" preload="auto" />
    </div>
  );

  if (typeof window === 'undefined') return content;
  
  // Need react-dom/client portal, but React.createPortal is available directly from react-dom
  const ReactDOM = require('react-dom');
  return ReactDOM.createPortal(content, document.body);
}

export default function HomeClient({ posts }: { posts: Omit<BlogPost, 'content'>[] }) {
  const [introDone, setIntroDone] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('clutch_intro_done')) {
      setIntroDone(false);
    }
  }, []);

  function handleIntroDone() {
    sessionStorage.setItem('clutch_intro_done', 'true');
    setIntroDone(true);
  }

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
      {!introDone && <PressureIntro onDone={handleIntroDone} />}

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
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '20px', maxWidth: '560px', lineHeight: 1.6, marginBottom: '40px', fontWeight: 400 }}>Pressure training engineered by Grand Slam coaches Vlado Platenik and Dan Kiernan. Diagnose your cognitive breakdown, train under real match stress, and close out the points that matter.</p>
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

      {/* ===== STATS COUNTER ===== */}
      <section style={{ background: 'var(--bg-dark)', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, color: '#fff', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                <span>25+</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '12px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Years On Tour</p>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, color: 'var(--lime)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                <span>7</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '12px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>WTA Top 10 Players Coached</p>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, color: '#fff', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                <span>3</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '12px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Grand Slam Titles</p>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, color: '#fff', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                <span>2</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '12px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Points That Decide It</p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', marginTop: '4px', fontStyle: 'italic' }}>Based on ATP/WTA training analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE PROBLEM (Asymmetrical) ===== */}
      <section className="airy-section section-fade-out section-fade-to-white" id="product">
        <ScrollReveal className="wrap">
          <SectionHeader eyebrow="The Problem" title="You don't lose matches because of technique. You lose them in two points." />
          <div className="grid-asym-3" style={{ alignItems: 'flex-start' }}>
            <div className="text-col" style={{ position: 'sticky', top: '140px' }}>
              <p>We focus on the exact moments where matches are won or lost: 30-30 in the final set, 5-5 in the breaker, or 8-8 in the deciding tiebreak. Traditional clubs and academies spend years drilling perfect technique and physical endurance, but they completely ignore the cognitive load of a high-pressure situation.</p>
              <br/>
              <p>When you have chances to close out a match, something else takes over. Your brain gets hijacked. Your strokes fall apart. Your heart rate spikes, your vision narrows, and you revert to defensive habits. That is not a skill you are missing. It is a biological response that has never actually been measured or trained for - until now.</p>
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
              <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>Take our cognitive diagnostic. We establish your baseline pressure threshold and identify the specific patterns causing you to revert to defensive habits during match points.</p>
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(0,0,0,0.05)" className="step-card" style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ color: 'var(--lime)', WebkitTextStroke: '1px var(--bg-dark)', fontWeight: 800, fontSize: '56px', marginBottom: '16px', lineHeight: 1 }}>02</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: 600 }}>Match Film Analysis</h3>
              <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>Submit footage of your most difficult matches. Our Grand Slam coaching team — led by Vlado Platenik (WTA Top 10) and Dan Kiernan (ATP/WTA Doubles) — analyze your movement, decision-making, and stroke degradation under pressure.</p>
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(0,0,0,0.05)" className="step-card" style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ color: 'var(--lime)', WebkitTextStroke: '1px var(--bg-dark)', fontWeight: 800, fontSize: '56px', marginBottom: '16px', lineHeight: 1 }}>03</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: 600 }}>Tactical Blueprint</h3>
              <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>Receive a custom training plan. We provide specific drills engineered to artificially inflate cognitive load and simulate championship points on the practice court.</p>
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(0,0,0,0.05)" className="step-card" style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ color: 'var(--lime)', WebkitTextStroke: '1px var(--bg-dark)', fontWeight: 800, fontSize: '56px', marginBottom: '16px', lineHeight: 1 }}>04</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: 600 }}>Execution & Review</h3>
              <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>Execute the blueprint. Every two weeks, you review new training footage with your designated coach to measure your Clutch Quotient progress and recalibrate.</p>
            </SpotlightCard>
          </StaggerReveal>
        </ScrollReveal>
      </section>


      {/* ===== THE SCIENCE (Bento Grid) ===== */}
      <section className="airy-section dark" id="science">
        <div className="wrap">
          <SectionHeader eyebrow="The Science" title="We Don't Guess. We Measure Pressure." />
          
          <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '48px auto 0', height: '600px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Image src="/tennis_court_night.jpg" alt="Training Film Analysis" fill style={{ objectFit: 'cover' }} />
            
            {/* Dark overlay for contrast */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)' }} />

            {/* Telestrator SVG Graphics */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 1000 600">
              {/* Circle around player position */}
              <circle cx="300" cy="400" r="40" fill="none" stroke="var(--lime)" strokeWidth="4" strokeDasharray="8 4" />
              {/* Bio-mechanic angle lines */}
              <path d="M 300 440 L 320 360 L 380 340" fill="none" stroke="#ff3333" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              {/* Court positioning arrow */}
              <path d="M 340 400 Q 450 350 550 420" fill="none" stroke="var(--lime)" strokeWidth="4" strokeDasharray="12 6" />
              <polygon points="540 410 560 425 535 430" fill="var(--lime)" />
            </svg>

            {/* PIP Coach Video Box */}
            <div style={{ position: 'absolute', top: '32px', right: '32px', width: '200px', height: '120px', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--lime)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
              <Image src="/tennis_coach_talk.jpg" alt="Coach Analysis" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.7)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Feedback</div>
            </div>

            {/* Playback Controls & Info */}
            <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ display: 'inline-block', background: 'var(--lime)', color: '#000', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Training Diagnostic Report</div>
                <h3 style={{ color: '#fff', fontSize: '28px', margin: 0, maxWidth: '500px', lineHeight: 1.3 }}>A comprehensive breakdown of your submitted training footage.</h3>
              </div>
              
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" fill="#fff"></polygon></svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== PROGRAMS (Pill Cards) ===== */}
      <section className="airy-section section-fade-out section-fade-to-dark" id="programs">
        <div className="wrap">
          <SectionHeader eyebrow="The Academy Membership" title="Everything You Need to Win Deciding Points" />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginTop: '48px' }}>
            
            {/* Left Path: The Curriculum */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '48px', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ color: 'var(--lime)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Path 01: The Curriculum</div>
              <h3 style={{ fontSize: '32px', color: '#fff', marginBottom: '24px' }}>Clutch Academies</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>High-intensity pressure repetition drills designed by elite tour coaches.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <Image src="/bento_player_serve.jpg" alt="Singles" width={80} height={80} style={{ borderRadius: '12px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '4px' }}>Singles Masterclass</h4>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Led by Vlado Platenik. Weekly tactical blueprints for singles play.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <Image src="/bento_player_celebrate_1783528150116.jpg" alt="Doubles" width={80} height={80} style={{ borderRadius: '12px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '4px' }}>Doubles Mastery</h4>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Led by Dan Kiernan. Court positioning and exploiting opponent weaknesses.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Path: The Analysis */}
            <div style={{ background: 'linear-gradient(145deg, rgba(202, 255, 51, 0.05) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid var(--lime)', borderRadius: '24px', padding: '48px', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ color: 'var(--lime)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Path 02: The Analysis</div>
              <h3 style={{ fontSize: '32px', color: '#fff', marginBottom: '24px' }}>Clutch Command</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>Upload your training footage to the members area for elite coaching intervention.</p>
              
              <div style={{ position: 'relative', width: '100%', height: '184px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Image src="/tennis_shoe_clay.jpg" alt="Analysis" fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#000"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===== DELIVERABLES (Bento Grid) ===== */}
      <section className="airy-section dark" id="deliverables">
        <div className="wrap">
          <SectionHeader eyebrow="What You Get" title="The Complete Pressure Toolkit" />
          
          <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '48px auto 0', height: '600px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Image src="/tennis_court_night.jpg" alt="Training Film Analysis" fill style={{ objectFit: 'cover' }} />
            
            {/* Dark overlay for contrast */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)' }} />

            {/* Telestrator SVG Graphics */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 1000 600">
              {/* Circle around player position */}
              <circle cx="300" cy="400" r="40" fill="none" stroke="var(--lime)" strokeWidth="4" strokeDasharray="8 4" />
              {/* Bio-mechanic angle lines */}
              <path d="M 300 440 L 320 360 L 380 340" fill="none" stroke="#ff3333" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              {/* Court positioning arrow */}
              <path d="M 340 400 Q 450 350 550 420" fill="none" stroke="var(--lime)" strokeWidth="4" strokeDasharray="12 6" />
              <polygon points="540 410 560 425 535 430" fill="var(--lime)" />
            </svg>

            {/* PIP Coach Video Box */}
            <div style={{ position: 'absolute', top: '32px', right: '32px', width: '200px', height: '120px', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--lime)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
              <Image src="/tennis_coach_talk.jpg" alt="Coach Analysis" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.7)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Feedback</div>
            </div>

            {/* Playback Controls & Info */}
            <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ display: 'inline-block', background: 'var(--lime)', color: '#000', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Training Diagnostic Report</div>
                <h3 style={{ color: '#fff', fontSize: '28px', margin: 0, maxWidth: '500px', lineHeight: 1.3 }}>A comprehensive breakdown of your submitted training footage.</h3>
              </div>
              
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" fill="#fff"></polygon></svg>
                </div>
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
                  <p style={{ color: 'var(--lime)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '13px' }}>Founder & Head of CLUTCH</p>
               </div>
            </ClipReveal>
            <div>
              <h3 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '24px', lineHeight: 1.1, color: '#fff' }}>Built to answer a question no one could answer him.</h3>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '24px' }}>
                Trust the training. The training will kick in. And the realisation that wasn't training for tennis, for when it's all on the line. That you could trust and will kick in. He didn't build it from a theory. He built it from a memory. Two match points up against the RAF's number one, on the grass at Wimbledon, and still finding a way to give it away. 
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
          <CQAssessment />
        </ScrollReveal>
      </section>

      
      
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
           <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '500px', fontSize: '18px' }}>Experience pressure training like never before — tactical drills, expert coaching from Grand Slam veterans, and a community that builds resilience.</p>
           <MagneticElement strength={25}>
             <a href={CTA.url} className="btn-dark" style={{ marginTop: '32px', background: 'var(--lime)', color: '#111', padding: '16px 32px', fontSize: '15px' }}>{CTA.labelArrow}</a>
           </MagneticElement>
        </div>
      </section>

    </div>
  );
}
