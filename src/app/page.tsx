'use client';
import React, { useEffect, useRef, useState } from 'react';
import { CTA } from '../config/cta';
import Link from 'next/link';

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

  return (
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
}

export default function Home() {
  const [introDone, setIntroDone] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem('clutch_intro_done')) {
      setIntroDone(false);
    }
  }, []);

  function handleIntroDone() {
    sessionStorage.setItem('clutch_intro_done', 'true');
    setIntroDone(true);
  }

  return (
    <div className="page-wrapper">
      {!introDone && <PressureIntro onDone={handleIntroDone} />}

      {/* ===== HERO ===== */}
      {/* ===== HERO SECTION ===== */}
      <section className="hero" id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '60px', overflow: 'hidden', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/hero_colosseum.png')", backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }}></div>
        {/* Light overlay just for text readability on the bottom left if needed, but keeping it mostly transparent */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 40%)', zIndex: 1 }}></div>
        
        {/* NAV (Padel Sport Style) */}
        <nav style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100, padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: 1, display: 'flex', gap: '32px' }}>
            <a href="/product" style={{ color: '#fff', fontSize: '15px', textDecoration: 'none', fontWeight: 300 }}>Product</a>
            <a href="/promises" style={{ color: '#fff', fontSize: '15px', textDecoration: 'none', fontWeight: 300 }}>Promises</a>
            <a href="/co-founders" style={{ color: '#fff', fontSize: '15px', textDecoration: 'none', fontWeight: 300 }}>Co-Founders</a>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <img src="/logo.png" alt="Clutch Command" style={{ height: '24px' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '16px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 6px 6px 20px', borderRadius: '100px', display: 'flex', alignItems: 'center', color: '#fff', fontSize: '13px', backdropFilter: 'blur(10px)', gap: '12px', fontWeight: 300 }}>
              Search here... 
              <span style={{ background: '#fff', color: '#111', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>🔍</span>
            </div>
            <button style={{ background: '#000', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 28px', borderRadius: '100px', fontSize: '14px', fontWeight: 300, cursor: 'pointer' }}>Start Diagnostic ↗</button>
          </div>
        </nav>

        {/* HERO CONTENT */}
        <div style={{ position: 'relative', zIndex: 2, padding: '0 40px', width: '100%' }}>
          
          <div style={{ marginBottom: '80px', maxWidth: '300px' }}>
            <div style={{ display: 'inline-flex', padding: '6px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '16px' }}>
              <div className="avatar-stack" style={{ display: 'flex' }}>
                 <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundImage: "url('/mark_jeffery.png')", backgroundSize: 'cover', border: '2px solid rgba(255,255,255,0.2)' }}></div>
                 <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#999', border: '2px solid rgba(255,255,255,0.2)', marginLeft: '-12px' }}></div>
                 <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#666', border: '2px solid rgba(255,255,255,0.2)', marginLeft: '-12px' }}></div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', fontWeight: 300, lineHeight: 1.4 }}>AI scoring and training for competitive players. Build resilience.</p>
          </div>

          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '6px 20px', borderRadius: '100px', color: '#fff', fontSize: '13px', fontWeight: 300, marginBottom: '24px' }}>
            Clutch Quotient
          </div>
          
          <h1 style={{ color: '#fff', fontSize: 'clamp(48px, 6vw, 84px)', fontWeight: 300, maxWidth: '1000px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Win The Points That<br/>Decide Matches.
          </h1>
        </div>
      </section>

      {/* ===== THE PROBLEM (Asymmetrical) ===== */}
      <section className="airy-section" id="product">
        <div className="wrap">
          <div className="section-eyebrow">The Problem</div>
          <h2 className="section-header">You don't lose matches because of technique. You lose them in two points.</h2>
          <div className="grid-asym-3">
            <div className="text-col">
              <p>We focus on the exact moments where matches are won or lost: 30-30 in the final set, 5-5 in the breaker, or 8-8 in the deciding tiebreak. Traditional academies spend years drilling perfect technique and physical endurance, but they completely ignore the cognitive load of a high-pressure situation.</p>
              <br/>
              <p>When you have chances to close out a match, something else takes over. Your heart rate spikes, your vision narrows, and you revert to defensive habits. That is not a skill you are missing. It is a biological response that has never actually been measured or trained for - until now.</p>
              <a href={CTA.url} className="btn-dark" style={{ marginTop: '32px' }}>{CTA.labelArrow}</a>
            </div>
            <div className="img-col" style={{ backgroundImage: "url('/media__1783528039061.png')" }}></div>
            <div className="img-col" style={{ backgroundImage: "url('/bento_player_serve_1783528130916.jpg')" }}></div>
          </div>
        </div>
      </section>

      {/* ===== THE SCIENCE (Asymmetrical) ===== */}
      <section className="airy-section dark" id="science">
        <div className="wrap">
          <div className="section-eyebrow" style={{ color: 'var(--lime)' }}>The Science</div>
          <h2 className="section-header">We Don't Guess. We Measure Pressure.</h2>
          <div className="grid-asym-3">
            <div className="text-col">
              <h3 style={{ fontSize: '28px', marginBottom: '16px' }}>The Clutch Quotient (CQ)</h3>
              <p>Pressure isn't a feeling—it's a biological response that ruins technique. The Clutch Quotient (CQ) is the first AI-driven framework to measure cognitive breakdown on the court.</p>
              <br/>
              <p>We analyze 30 specific variables, including shot selection under score-pressure, court positioning during breakpoints, and recovery time between high-stress points.</p>
            </div>
            <div className="img-col" style={{ backgroundImage: "url('/bento_player_celebrate_1783528150116.jpg')", position: 'relative' }}>
               <div style={{ position: 'absolute', bottom: 24, left: 24, background: '#111', padding: '16px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                 <h4 style={{ color: 'var(--lime)', marginBottom: '8px' }}>Biometric Syncing</h4>
                 <p style={{ margin: 0, fontSize: '13px' }}>Overlay heart rate data onto your match footage.</p>
               </div>
            </div>
            <div className="img-col" style={{ backgroundImage: "url('/bento_player_backhand_1783528140582.jpg')", position: 'relative' }}>
               <div style={{ position: 'absolute', bottom: 24, left: 24, background: '#111', padding: '16px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                 <h4 style={{ color: 'var(--lime)', marginBottom: '8px' }}>Cognitive Mapping</h4>
                 <p style={{ margin: 0, fontSize: '13px' }}>See exactly when decision-making shifts.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS (Pill Cards) ===== */}
      <section className="airy-section" id="programs">
        <div className="wrap">
          <div className="section-eyebrow">Programs</div>
          <h2 className="section-header">Training For Every Competitive Level</h2>
          <div className="grid-cards-3">
            <div className="pill-card" style={{ backgroundImage: "url('/bento_player_serve_1783528130916.jpg')" }}>
               <div className="pill-card-content">
                  <h3>CLUTCH Singles</h3>
                  <p>Grand Slam singles coaching led by Vlado Platenik. Weekly tactical blueprints and high-intensity repetition drills.</p>
               </div>
            </div>
            <div className="pill-card" style={{ backgroundImage: "url('/bento_player_celebrate_1783528150116.jpg')" }}>
               <div className="pill-card-content">
                  <h3>CLUTCH Doubles</h3>
                  <p>Doubles mastery with Dan Kiernan. Court positioning, communication, and exploiting opponent weaknesses.</p>
               </div>
            </div>
            <div className="pill-card" style={{ backgroundImage: "url('/bento_player_backhand_1783528140582.jpg')" }}>
               <div className="pill-card-content">
                  <h3>AI Pressure Scoring</h3>
                  <p>Upload your match footage and get scored against the 30 variables of the Clutch Quotient.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DELIVERABLES (Pill Cards) ===== */}
      <section className="airy-section dark" id="deliverables">
        <div className="wrap">
          <div className="section-eyebrow" style={{ color: 'var(--lime)' }}>What You Get</div>
          <h2 className="section-header">The Complete Pressure Toolkit</h2>
          <div className="grid-cards-3">
            <div className="pill-card" style={{ background: '#1B2214', border: '1px solid rgba(255,255,255,0.05)' }}>
               <div className="pill-card-content">
                  <div style={{ fontFamily: 'Outfit', fontSize: '64px', fontWeight: 800, color: 'rgba(255,255,255,0.05)', lineHeight: 0.8, marginBottom: '24px' }}>01</div>
                  <h3>3D Memory Surface Report</h3>
                  <p>A comprehensive digital dashboard breaking down your match footage. See your exact CQ score and where your pressure threshold broke.</p>
               </div>
            </div>
            <div className="pill-card" style={{ background: '#1B2214', border: '1px solid rgba(255,255,255,0.05)' }}>
               <div className="pill-card-content">
                  <div style={{ fontFamily: 'Outfit', fontSize: '64px', fontWeight: 800, color: 'rgba(255,255,255,0.05)', lineHeight: 0.8, marginBottom: '24px' }}>02</div>
                  <h3>Weekly Tactical Blueprints</h3>
                  <p>Custom high-intensity drill routines designed by Grand Slam coaches to rewire your specific pressure weaknesses.</p>
               </div>
            </div>
            <div className="pill-card" style={{ background: '#1B2214', border: '1px solid rgba(255,255,255,0.05)' }}>
               <div className="pill-card-content">
                  <div style={{ fontFamily: 'Outfit', fontSize: '64px', fontWeight: 800, color: 'rgba(255,255,255,0.05)', lineHeight: 0.8, marginBottom: '24px' }}>03</div>
                  <h3>1-on-1 Coach Reviews</h3>
                  <p>Bi-weekly video calls with your designated elite coach to review your latest match footage and adjust your training cognitive load.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT FOUNDER ===== */}
      <section className="airy-section" id="co-founders">
        <div className="wrap">
          <div style={{ display: 'flex', gap: '80px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="founder-dark-card">
              <div className="founder-dark-img" style={{ backgroundImage: "url('/bento_player_serve_1783528130916.jpg')" }}></div>
              <div className="founder-dark-text">
                <h3>Built to answer a question no one could answer him.</h3>
                <p>Clutch Quotient started life in the military: training people to make life-or-death decisions with no action replay.</p>
                <Link href="/co-founders" className="btn-dark" style={{ alignSelf: 'flex-start', marginTop: '32px', background: 'rgba(255,255,255,0.1)' }}>Read Story &rarr;</Link>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundImage: "url('/mark_jeffery.png')", backgroundSize: 'cover', marginBottom: '24px' }}></div>
              <h3 style={{ fontSize: '32px', marginBottom: '16px' }}>Experience the best in pressure training</h3>
              <p>He didn't build it from a theory. He built it from a memory. Two match points up against the RAF's number one, on the grass at Wimbledon, and still finding a way to give it away. Pressure hijacked his brain and body, and the next thing he knew, it was game, set, and match to his opponent.</p>
              <div style={{ marginTop: '24px', fontWeight: 600, color: 'var(--text-dark)' }}>Mark Jeffery, <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>Founder</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS (Airy Layout) ===== */}
      <section className="airy-section" id="promises">
        <div className="wrap">
          <div className="section-eyebrow">Testimonials</div>
          <h2 className="section-header">What Our Members Say</h2>
          
          <div className="testi-airy">
            <div className="testi-airy-img" style={{ backgroundImage: "url('/bento_player_celebrate_1783528150116.jpg')" }}></div>
            <div className="testi-airy-content">
              <span className="testi-quote-mark">“</span>
              <div className="testi-quote-text">
                [Testimonial slot - an academy student on what changed once their pressure game was scored objectively, not self-assessed.]
              </div>
              <div className="testi-author">
                Player Name, <em>Academy Student</em>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHO IS THIS FOR ===== */}
      <section className="airy-section dark">
        <div className="wrap">
          <div className="grid-asym-3" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
            <div className="text-col">
              <h2 className="section-header" style={{ marginBottom: '32px' }}>Built For Competitors.<br/>Not Beginners.</h2>
            </div>
            <div className="text-col">
              <p style={{ fontSize: '18px' }}>Clutch Command isn't for learning how to hit a forehand. It is an elite finishing school for players who already have the technique, but need the mental framework to close out matches. Built for tournament juniors, high-level club competitors, and aspiring professionals.</p>
            </div>
          </div>
        </div>
      </section>
      {/* ===== DIAGNOSTIC CTA ===== */}
      <section className="airy-section" style={{ position: 'relative', overflow: 'hidden', minHeight: '500px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/hero_tennis_court_1783528122643.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,20,10,0.95) 0%, rgba(10,20,10,0.4) 100%)', zIndex: 1 }}></div>
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
           <h2 className="section-header" style={{ color: '#fff', marginBottom: '24px', fontSize: 'clamp(40px, 6vw, 72px)' }}>Ready to train<br/>with us ?</h2>
           <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '500px', fontSize: '18px' }}>Experience pressure training like never before – tactical drills, AI scoring, and a community that builds resilience.</p>
           <a href={CTA.url} className="btn-dark" style={{ marginTop: '32px', background: 'var(--lime)', color: '#111', padding: '16px 32px', fontSize: '15px' }}>{CTA.labelArrow}</a>
        </div>
      </section>

    </div>
  );
}
