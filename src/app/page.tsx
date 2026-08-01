'use client';
import React, { useEffect, useRef, useState } from 'react';
import { CTA } from '../config/cta';

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

  function close() {
    setPhase('gone');
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.currentTime = 0; }
    setTimeout(() => { onDone && onDone(); }, 1000);
  }

  function run() {
    setPhase('pulsing');
    vibrate(40);

    const trace = traceRef.current;
    const scan = scanRef.current;
    const pressureEl = pressureRef.current;
    const audio = audioRef.current;
    const len = trace ? trace.getTotalLength() : 2000;

    if (!audio) { setPhase('reveal'); setTimeout(close, 1000); return; }

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
        setTimeout(close, 1000);
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
      <button className="enter-btn" onClick={run}>Enter The Arena</button>
      <button className="intro-skip" onClick={close}>Skip Intro</button>
      <audio ref={audioRef} src="/audio/heartbeat.mp3" preload="auto" />
    </div>
  );
}

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="page-wrapper">
      {!introDone && <PressureIntro onDone={() => setIntroDone(true)} />}

      {/* ===== HERO ===== */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-inner wrap">
          <div className="hero-social-proof">
             <div className="avatar-stack">
                <div className="avatar-sm"></div>
                <div className="avatar-sm"></div>
                <div className="avatar-sm"></div>
             </div>
             <p>AI scoring and training for competitive players.<br/>Build pressure resilience.</p>
          </div>
          
          <div className="hero-text-bottom">
            <div className="hero-eyebrow">Clutch Command</div>
            <h1>Win The Points<br/>That Decide Matches.</h1>
          </div>
        </div>
      </header>

      {/* ===== STATEMENT (Light Section) ===== */}
      <section className="statement light-section" id="product">
        <div className="wrap bento-split">
          <div className="bento-text-left">
            <div className="section-eyebrow dark-text">The Problem</div>
            <h2 className="dark-text">You don't lose matches because of technique. You lose them in two points.</h2>
            <p className="dark-text">
              We focus on the exact moments where matches are won or lost: 30-30 in the final set, 5-5 in the breaker, or 8-8 in the deciding tiebreak. Traditional academies spend years drilling perfect technique and physical endurance, but they completely ignore the cognitive load of a high-pressure situation.
            </p>
            <p className="dark-text">
              When you have chances to close out a match, something else takes over. Your heart rate spikes, your vision narrows, and you revert to defensive habits. That is not a skill you are missing. It is a biological response that has never actually been measured or trained for - until now.
            </p>
            <a href={CTA.url} className="btn-dark mt-6">{CTA.labelArrow}</a>
          </div>
          <div className="bento-images-right">
             <div className="bento-img-card" style={{ backgroundImage: "url('/media__1783528039061.png')" }}>
                <div className="bento-card-label">Match Point</div>
             </div>
             <div className="bento-img-card" style={{ backgroundImage: "url('/bento_player_serve_1783528130916.jpg')" }}>
                <div className="bento-card-label">Coaching Session</div>
             </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS (Bento Grid) ===== */}
      <section className="programs light-section" id="programs">
        <div className="wrap">
          <div className="programs-header flex-between">
            <h2 className="dark-text">Training For Every Competitive Level</h2>
            <a href={CTA.url} className="btn-dark">{CTA.labelArrow}</a>
          </div>
          <div className="bento-3-col">
            <div className="bento-card-tall" style={{ backgroundImage: "url('/bento_player_serve_1783528130916.jpg')" }}>
               <div className="bento-card-content">
                  <h3>CLUTCH<br/>Singles Academy</h3>
                  <p>Grand Slam singles coaching led by Vlado Platenik. Weekly tactical blueprints, high-intensity repetition drills, and pressure conditioning from a coach behind tour-level players.</p>
               </div>
            </div>
            <div className="bento-card-tall" style={{ backgroundImage: "url('/bento_player_celebrate_1783528150116.jpg')" }}>
               <div className="bento-card-content">
                  <h3>CLUTCH<br/>Doubles Academy</h3>
                  <p>Doubles mastery with Dan Kiernan, the coach who took Dabrowski and Routliffe to World No.1 and two US Open titles. Court positioning, communication, and exploiting opponent weaknesses.</p>
               </div>
            </div>
            <div className="bento-card-tall" style={{ backgroundImage: "url('/bento_player_backhand_1783528140582.jpg')" }}>
               <div className="bento-card-content">
                  <h3>AI Pressure<br/>Scoring</h3>
                  <p>Upload your match footage and get scored against the 30 variables of the Clutch Quotient. Receive a 3D Memory Surface report detailing exactly where your cognitive execution breaks down.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BLACK & WHITE CARDS (Like the Padel Reference) ===== */}
      <section className="about-founder light-section" id="co-founders">
        <div className="wrap bento-split-reverse">
          <div className="bento-black-card">
            <h2>Built to answer a question no one could answer him.</h2>
            <p>Clutch Quotient started life in the military: training people to make life-or-death decisions with no action replay. Mark Jeffery took that same thinking and turned it into a way to diagnose tennis.</p>
            <div className="bento-black-footer">
              <div className="founder-name">Mark Jeffery</div>
              <div className="founder-title">Founder</div>
            </div>
          </div>
          <div className="bento-white-text">
            <div className="section-eyebrow dark-text">Who Built This</div>
            <h2 className="dark-text">Experience the best in pressure training</h2>
            <div className="bento-img-card-small" style={{ backgroundImage: "url('/mark_jeffery.png')" }}></div>
            <p className="dark-text mt-4">
              He didn't build it from a theory. He built it from a memory. Two match points up against the RAF's number one, on the grass at Wimbledon, and still finding a way to give it away. Pressure hijacked his brain and body, and the next thing he knew, it was game, set, and match to his opponent. He had no way, then, to know why. That's the gap Clutch Quotient closes.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials light-section" id="promises">
        <div className="wrap">
          <div className="section-eyebrow dark-text btn-outline-pill">Testimonials</div>
          <h2 className="dark-text mt-4">What Our Members Say</h2>
          
          <div className="testi-bento mt-8">
            <div className="testi-image" style={{ backgroundImage: "url('/bento_player_celebrate_1783528150116.jpg')" }}></div>
            <div className="testi-content">
              <div className="testi-quote-mark">“</div>
              <p className="testi-quote-text dark-text">
                [Testimonial slot - an academy student on what changed once their pressure game was scored objectively, not self-assessed.]
              </p>
              <p className="testi-author dark-text mt-6">
                Player Name, <em>Academy Student</em>
              </p>
              
              <div className="testi-controls">
                <button className="testi-arrow-btn">&larr;</button>
                <button className="testi-arrow-btn">&rarr;</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIAGNOSTIC CTA ===== */}
      <section className="diagnostic-footer">
        <div className="diagnostic-bg" style={{ backgroundImage: "url('/hero_tennis_court_1783528122643.jpg')" }}></div>
        <div className="diagnostic-overlay"></div>
        <div className="wrap diagnostic-content">
           <h2 className="light-text">Ready to train<br/>with us ?</h2>
           <p className="light-text">Experience pressure training like never before – tactical drills, AI scoring, and a community that builds resilience.</p>
           <a href={CTA.url} className="btn-dark mt-6">{CTA.labelArrow}</a>
        </div>
      </section>
    </div>
  );
}
