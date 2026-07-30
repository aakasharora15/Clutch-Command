'use client';
import React, { useEffect, useRef, useState } from 'react';

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
        // @ts-ignore - Bypass strict Uint8Array generic type mismatch in newer TS versions
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
    <>
      {!introDone && <PressureIntro onDone={() => setIntroDone(true)} />}

      <header className="hero">
        <div className="hero-photo">
          <div className="hero-copy">
            <div className="hero-copy-inner">
              <p className="hero-para">
                Clutch Command Is A Modern Pressure-Training System Helping Players Of All Levels
                Win The Points That Decide Matches, Built With Grand Slam Coaches And AI.
              </p>
              <a href="https://theclutchquotient.scoreapp.com" className="pill" style={{ marginTop: '30px', display: 'inline-block' }}>Start the Diagnostic</a>
              <div className="hero-badge"></div>
            </div>
          </div>
        </div>
        <div className="wordmark"><span>clutch</span></div>
      </header>

      <section className="statement">
        <div className="wrap">
          <h2>At Clutch Command, We Train Players To Win Two More Points — The Ones That Decide Every Match.</h2>
          <div className="statement-row">
            <p>
              We focus on the moments matches turn on — 30-30, 5-5 in the breaker, 8-8 in the decider.
              TRUST training and AI scoring are built for juniors, club players, and competitive athletes
              who want real progress under pressure.
            </p>
            <div className="statement-photos">
              <div className="ph"><em>Match Point</em></div>
              <div className="ph"><em>Coaching Session</em></div>
            </div>
          </div>
        </div>
      </section>

      <section className="programs wrap" id="programs" style={{ marginTop: 110 }}>
        <h2>Training For<br />Every Competitive Level</h2>
        <div className="prog-grid">
          <div className="prog-card">
            <h3>CLUTCH<br />Singles Academy</h3>
            <p>Grand Slam singles coaching with Vlado Platenik — tactics, repetition, and pressure training from the coach behind tour-level players.</p>
            <a href="https://theclutchquotient.scoreapp.com">Start the Diagnostic →</a>
          </div>
          <div className="ph"><em>Singles Academy</em></div>

          <div className="ph"><em>Doubles Academy</em></div>
          <div className="prog-card">
            <h3>CLUTCH<br />Doubles Academy</h3>
            <p>Doubles mastery with Dan Kiernan — the coach who took Dabrowski &amp; Routliffe to World No.1 and two US Open titles.</p>
            <a href="https://theclutchquotient.scoreapp.com">Start the Diagnostic →</a>
          </div>

          <div className="prog-card">
            <h3>AI Pressure<br />Scoring</h3>
            <p>Upload match footage and get scored against the Clutch Quotient — pressure performance made objective for the first time.</p>
            <a href="https://theclutchquotient.scoreapp.com">Start the Diagnostic →</a>
          </div>
          <div className="ph"><em>AI Scoring</em></div>
        </div>
      </section>

      <section className="moments" id="moments">
        <div className="wrap">
          <h2>Moments From The Court</h2>
          <p className="moments-sub">A Glimpse Into The Training, The Matches, And The Pressure Moments That Drive Clutch Command Forward.</p>
        </div>
        <div className="wrap" style={{ overflow: 'visible' }}>
          <div className="carousel">
            <div className="ph"><em>Academy</em></div>
            <div className="ph"><em>Training</em></div>
            <div className="ph"><em>Match Play</em></div>
            <div className="ph"><em>The Breaker</em></div>
            <div className="ph"><em>Coaching</em></div>
            <div className="ph"><em>Progress</em></div>
          </div>
          <div className="moments-cta"><a href="https://theclutchquotient.scoreapp.com" className="pill">Start the Diagnostic</a></div>
        </div>
      </section>

      <section className="trusted" id="coaches">
        <div className="wrap">
          <h2>Trusted By<br />Players &amp; Coaches</h2>
          <div className="testi-grid">
            <div className="testi">
              <div className="testi-quote">&quot;[Testimonial slot — an academy student on what changed once their pressure game was scored objectively, not self-assessed.]&quot;</div>
              <div className="testi-person"><div className="avatar"></div><div><div className="testi-name">Player Name</div><div className="testi-role">Academy Student</div></div></div>
            </div>
            <div className="testi">
              <div className="testi-quote">&quot;[Testimonial slot — a parent or coach on the difference TRUST training made in tight matches.]&quot;</div>
              <div className="testi-person"><div className="avatar"></div><div><div className="testi-name">Player Name</div><div className="testi-role">Parent / Coach</div></div></div>
            </div>
            <div className="testi">
              <div className="testi-quote">&quot;[Testimonial slot — a military academy testimonial crediting Mark&apos;s methodology under real pressure.]&quot;</div>
              <div className="testi-person"><div className="avatar"></div><div><div className="testi-name">Player Name</div><div className="testi-role">Military Academy</div></div></div>
            </div>
          </div>
          <div className="stats">
            <div className="stat"><div className="stat-num">30</div><div className="stat-lab">Clutch Quotient Skills Scored</div></div>
            <div className="stat"><div className="stat-num">3</div><div className="stat-lab">Grand Slam-Credentialed Coaches</div></div>
            <div className="stat"><div className="stat-num">2+2=5</div><div className="stat-lab">AI + Coaches, The Complete Package</div></div>
          </div>
        </div>
      </section>

      <section className="tips" id="tips">
        <div className="wrap tips-grid">
          <div className="tips-left">
            <h2>Pressure Tips &amp;<br />Training Insights</h2>
            <p>Expert Advice, Drills, And Strategies From Grand Slam Coaches To Help You Win The Points That Matter — On And Off The Court.</p>
            <a href="https://theclutchquotient.scoreapp.com" className="pill">Start the Diagnostic</a>
          </div>
          <div>
            <div className="article">
              <div className="ph"></div>
              <div className="article-meta">Tactics <i></i> 4 Min</div>
              <h3>Two More Points At 5-5: How To Win The Tiebreak</h3>
            </div>
            <div className="article">
              <div className="ph"></div>
              <div className="article-meta">Identity <i></i> 3 Min</div>
              <h3>The Identity Shift That Survives Championship Point</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
