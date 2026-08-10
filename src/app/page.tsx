'use client';
import React, { useEffect, useRef, useState } from 'react';
import { CTA } from '../config/cta';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '../components/SectionHeader';
import FAQAccordion from '../components/FAQAccordion';

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
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-inner wrap">
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
            
            <h1>Win The Points<br/>That Decide Matches.</h1>
          </div>
        </div>
      </header>

      {/* ===== THE PROBLEM (Asymmetrical) ===== */}
      <section className="airy-section" id="product">
        <div className="wrap">
          <SectionHeader eyebrow="The Problem" title="You don't lose matches because of technique. You lose them in two points." />
          <div className="grid-asym-3">
            <div className="text-col">
              <p>We focus on the exact moments where matches are won or lost: 30-30 in the final set, 5-5 in the breaker, or 8-8 in the deciding tiebreak. Traditional academies spend years drilling perfect technique and physical endurance, but they completely ignore the cognitive load of a high-pressure situation.</p>
              <br/>
              <p>When you have chances to close out a match, something else takes over. Your heart rate spikes, your vision narrows, and you revert to defensive habits. That is not a skill you are missing. It is a biological response that has never actually been measured or trained for - until now.</p>
              <a href={CTA.url} className="btn-dark" style={{ marginTop: '32px' }}>{CTA.labelArrow}</a>
            </div>
            <div className="img-col" style={{ position: 'relative', overflow: 'hidden' }}>
               <Image src="/tennis_player_exhausted.jpg" alt="Exhausted Player" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="img-col" style={{ position: 'relative', overflow: 'hidden' }}>
               <Image src="/bento_player_serve_1783528130916.jpg" alt="Player Serve" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS (The Process) ===== */}
      <section className="airy-section" id="how-it-works" style={{ background: '#fff', color: '#111', paddingTop: '40px' }}>
        <div className="wrap">
          <SectionHeader eyebrow="The Academy" title="How We Engineer Resilience" />
          <div className="grid-cards-4" style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px' }}>
            <div className="step-card" style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ color: 'var(--lime)', WebkitTextStroke: '1px #111', fontWeight: 800, fontSize: '56px', marginBottom: '16px', lineHeight: 1 }}>01</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: 600 }}>Diagnostic Testing</h3>
              <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>Take our cognitive diagnostic. We establish your baseline pressure threshold and identify exactly which of the 30 variables causes you to revert to defensive habits during match points.</p>
            </div>
            <div className="step-card" style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ color: 'var(--lime)', WebkitTextStroke: '1px #111', fontWeight: 800, fontSize: '56px', marginBottom: '16px', lineHeight: 1 }}>02</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: 600 }}>Match Film Analysis</h3>
              <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>Submit footage of your most difficult matches. Our proprietary AI and Grand Slam coaches analyze your movement, decision-making, and stroke degradation under pressure.</p>
            </div>
            <div className="step-card" style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ color: 'var(--lime)', WebkitTextStroke: '1px #111', fontWeight: 800, fontSize: '56px', marginBottom: '16px', lineHeight: 1 }}>03</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: 600 }}>Tactical Blueprint</h3>
              <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>Receive a custom training plan. We provide specific drills engineered to artificially inflate cognitive load and simulate championship points on the practice court.</p>
            </div>
            <div className="step-card" style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ color: 'var(--lime)', WebkitTextStroke: '1px #111', fontWeight: 800, fontSize: '56px', marginBottom: '16px', lineHeight: 1 }}>04</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: 600 }}>Execution & Review</h3>
              <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>Execute the blueprint. Every two weeks, you review new match footage with your designated coach to measure your Clutch Quotient progress and recalibrate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE SCIENCE (Asymmetrical) ===== */}
      <section className="airy-section dark" id="science">
        <div className="wrap">
          <SectionHeader eyebrow="The Science" title="We Don't Guess. We Measure Pressure." />
          <div className="grid-asym-3">
            <div className="text-col">
              <h3 style={{ fontSize: '28px', marginBottom: '16px' }}>The Clutch Quotient (CQ)</h3>
              <p>Pressure isn't a feeling—it's a biological response that ruins technique. The Clutch Quotient (CQ) is the first AI-driven framework to measure cognitive breakdown on the court.</p>
              <br/>
              <p>We analyze 30 specific variables, including shot selection under score-pressure, court positioning during breakpoints, and recovery time between high-stress points.</p>
            </div>
            <div className="img-col" style={{ position: 'relative', overflow: 'hidden' }}>
               <Image src="/tennis_coach_talk.jpg" alt="Biometric Syncing" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
               <div style={{ position: 'absolute', bottom: 24, left: 24, background: '#111', padding: '16px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', zIndex: 10 }}>
                 <h4 style={{ color: 'var(--lime)', marginBottom: '8px' }}>Biometric Syncing</h4>
                 <p style={{ margin: 0, fontSize: '13px' }}>Overlay heart rate data onto your match footage.</p>
               </div>
            </div>
            <div className="img-col" style={{ position: 'relative', overflow: 'hidden' }}>
               <Image src="/tennis_shoe_clay.jpg" alt="Cognitive Mapping" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
               <div style={{ position: 'absolute', bottom: 24, left: 24, background: '#111', padding: '16px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', zIndex: 10 }}>
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
          <SectionHeader eyebrow="The Academy Membership" title="Everything You Need to Win Deciding Points" />
          <div className="grid-cards-3">
            <div className="pill-card" style={{ position: 'relative', overflow: 'hidden' }}>
               <Image src="/tennis_serve_shadow.jpg" alt="Singles Blueprint" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
               <div className="pill-card-content" style={{ position: 'relative', zIndex: 10 }}>
                  <h3>Singles Masterclass</h3>
                  <p>Grand Slam singles coaching led by Vlado Platenik. Weekly tactical blueprints and high-intensity repetition drills.</p>
               </div>
            </div>
            <div className="pill-card" style={{ position: 'relative', overflow: 'hidden' }}>
               <Image src="/bento_player_celebrate_1783528150116.jpg" alt="Doubles Blueprint" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
               <div className="pill-card-content" style={{ position: 'relative', zIndex: 10 }}>
                  <h3>Doubles Mastery</h3>
                  <p>Elite doubles strategies with Dan Kiernan. Court positioning, communication, and exploiting opponent weaknesses.</p>
               </div>
            </div>
            <div className="pill-card" style={{ position: 'relative', overflow: 'hidden' }}>
               <Image src="/bento_player_backhand_1783528140582.jpg" alt="AI Pressure Scoring" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
               <div className="pill-card-content" style={{ position: 'relative', zIndex: 10 }}>
                  <h3>Proprietary AI Scoring</h3>
                  <p>Our exclusive backend engine scores your match footage against 30 variables to expose your pressure leaks.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DELIVERABLES (Pill Cards) ===== */}
      <section className="airy-section dark" id="deliverables">
        <div className="wrap">
          <SectionHeader eyebrow="What You Get" title="The Complete Pressure Toolkit" />
          <div className="grid-cards-3">
            <div className="pill-card" style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
               <Image src="/tennis_court_night.jpg" alt="3D Memory Surface" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
               <div className="pill-card-content" style={{ position: 'relative', zIndex: 10 }}>
                  <div style={{ fontFamily: 'Outfit', fontSize: '64px', fontWeight: 800, color: 'rgba(255,255,255,0.2)', lineHeight: 0.8, marginBottom: '24px' }}>01</div>
                  <h3>3D Memory Surface Report</h3>
                  <p>A comprehensive digital dashboard breaking down your match footage. See your exact CQ score and where your pressure threshold broke.</p>
               </div>
            </div>
            <div className="pill-card" style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
               <Image src="/tennis_blueprint.jpg" alt="Tactical Blueprints" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
               <div className="pill-card-content" style={{ position: 'relative', zIndex: 10 }}>
                  <div style={{ fontFamily: 'Outfit', fontSize: '64px', fontWeight: 800, color: 'rgba(255,255,255,0.2)', lineHeight: 0.8, marginBottom: '24px' }}>02</div>
                  <h3>Weekly Tactical Blueprints</h3>
                  <p>Custom high-intensity drill routines designed by Grand Slam coaches to rewire your specific pressure weaknesses.</p>
               </div>
            </div>
            <div className="pill-card" style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
               <Image src="/tennis_racquet_hit.jpg" alt="Coach Reviews" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
               <div className="pill-card-content" style={{ position: 'relative', zIndex: 10 }}>
                  <div style={{ fontFamily: 'Outfit', fontSize: '64px', fontWeight: 800, color: 'rgba(255,255,255,0.2)', lineHeight: 0.8, marginBottom: '24px' }}>03</div>
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
      <section className="airy-section" id="testimonials">
        <div className="wrap">
          <SectionHeader eyebrow="Testimonials" title="What Our Members Say" />
          
          <div className="testi-airy">
            <div className="testi-airy-img" style={{ backgroundImage: "url('/tennis_portrait.jpg')" }}></div>
            <div className="testi-airy-content">
              <span className="testi-quote-mark">“</span>
              <div className="testi-quote-text">
                I used to choke constantly when serving for the set at 5-4. I was drilling my serve for hours but nothing worked in matches. The TRUST protocol showed me that my cognitive load was spiking, not my technique failing. Within 14 days of rewiring my biological response, I closed out 3 matches straight.
              </div>
              <div className="testi-author">
                Liam Davies, <em>ITF Competitor</em>
              </div>
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
        <div className="wrap">
          <SectionHeader eyebrow="Blog" title="Read Latest Articles" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginTop: '48px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
                <Image src="/tennis_shoe_clay.jpg" alt="Article 1" fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '11px', padding: '4px 12px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)' }}>Tactics</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'url(/mark_jeffery.png) center/cover' }}></div>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Mark Jeffery</span>
                <span style={{ fontSize: '13px', color: '#888', marginLeft: 'auto' }}>10 Aug 2026</span>
              </div>
              <h3 style={{ fontSize: '20px', lineHeight: 1.3, marginBottom: '12px' }}>The Evolution of Baseline Tactics: From Set Plays to Analytical.</h3>
              <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6 }}>Delve into the transformation of basketball strategies, tracing the journey from traditional set plays to the era of analytical tactics...</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
                <Image src="/tennis_court_night.jpg" alt="Article 2" fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '11px', padding: '4px 12px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)' }}>Psychology</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'url(/bento_player_serve_1783528130916.jpg) center/cover' }}></div>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Vlado Platenik</span>
                <span style={{ fontSize: '13px', color: '#888', marginLeft: 'auto' }}>05 Aug 2026</span>
              </div>
              <h3 style={{ fontSize: '20px', lineHeight: 1.3, marginBottom: '12px' }}>Cognitive Load on Breakpoints: How the Mind Sabotages the Body.</h3>
              <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6 }}>Explore the profound influence of cognitive stress on match point execution. We examine how the nervous system reacts to high stakes...</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
                <Image src="/bento_player_serve_1783528130916.jpg" alt="Article 3" fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '11px', padding: '4px 12px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)' }}>Doubles</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'url(/bento_player_celebrate_1783528150116.jpg) center/cover' }}></div>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Dan Kiernan</span>
                <span style={{ fontSize: '13px', color: '#888', marginLeft: 'auto' }}>01 Aug 2026</span>
              </div>
              <h3 style={{ fontSize: '20px', lineHeight: 1.3, marginBottom: '12px' }}>A Slam Dunk, Icy Battles, and Shuttlecock Symphony.</h3>
              <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6 }}>Embark on a thrilling journey through the exhilarating worlds of doubles positioning in our latest articles. From the thunderous applause...</p>
            </div>

          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER BREAKOUT ===== */}
      <section className="airy-section" style={{ background: '#ffffff', paddingTop: '40px', paddingBottom: '120px' }}>
        <div className="wrap" style={{ position: 'relative' }}>
          
          {/* Breakout Image */}
          <div style={{ 
            position: 'absolute', 
            top: '-120px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            width: '350px', 
            height: '350px', 
            zIndex: 10,
            pointerEvents: 'none'
          }}>
            {/* Using CSS mix-blend-mode multiply to knock out the white background if placed over a light area. Over the dark box it will show the white square unless we mask it. We'll use a CSS mask image with a gradient to fade the bottom so the white square doesn't ruin the dark box. */}
            <div style={{ position: 'relative', width: '100%', height: '100%', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)', maskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)', mixBlendMode: 'multiply' }}>
              <Image src="/tennis_player_cutout.jpg" alt="Breakout Player" fill style={{ objectFit: 'contain' }} />
            </div>
          </div>

          <div style={{ 
            background: 'linear-gradient(135deg, #222 0%, #111 100%)', 
            borderRadius: '24px', 
            padding: '64px 48px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '40px',
            position: 'relative',
            zIndex: 1,
            boxShadow: '0 32px 64px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#fff', fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.1, margin: 0, maxWidth: '400px' }}>
              Newsletter Subscription
            </h2>
            <div style={{ flex: '1', minWidth: '280px', maxWidth: '400px' }}>
              <form style={{ display: 'flex', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '6px' }}>
                <input type="email" placeholder="clutchcommand@gmail.com" style={{ background: 'transparent', border: 'none', color: '#fff', padding: '12px 20px', flex: 1, outline: 'none', fontSize: '15px' }} />
                <button type="button" style={{ background: 'rgba(255,255,255,0.3)', border: 'none', borderRadius: '100px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s ease', color: '#fff' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </form>
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
