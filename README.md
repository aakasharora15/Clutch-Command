# Clutch Command - Frontend

> **The digital storefront and interactive training portal for Clutch Command.**
> A premium tennis pressure-training platform engineered for competitive athletes, juniors, and club players.

## 🚀 Overview

Clutch Command is a modern, high-performance web application built to showcase elite Grand Slam coaching methodologies and AI pressure scoring. The frontend is designed with a premium, cinematic, and earthy aesthetic (dark olives, creams, and neon limes), completely discarding generic layouts in favor of an expansive, highly crafted editorial feel.

## ✨ Key Features

*   **Interactive 'Heartbeat' Pre-loader:** Engineered using the native browser **Web Audio API** (`AudioContext` and `AnalyserNode`). It reads the live amplitude of an `.mp3` heartbeat file to dynamically draw a sweeping SVG ECG trace and utilizes the HTML5 Vibration API to pulse supported devices in sync with the audio.
*   **Expansive UI Architecture:** Features massive macro-gaps (160px–200px) and wide containers (1240px) to ensure the UI feels uncrowded and expensive.
*   **Bento Grid Layouts:** 'Programs' are housed in a massive dark-olive container with extreme rounded corners to frame cinematic photography perfectly.
*   **Dynamic Image Collages:** Utilizes advanced CSS transforms (rotations, negative margins, z-index overlapping) to create an editorial "thrown photographs" effect, complete with un-tilt hover micro-interactions.

## 🛠 Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (React)
*   **Language:** TypeScript
*   **Styling:** Vanilla CSS (Precision crafted for cinematic layouts)
*   **APIs:** Web Audio API, HTML5 Vibration API

## 🚦 Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📂 Project Structure

*   `/src/app/page.tsx` - The main single-page application structure, including the `PressureIntro` audio engine.
*   `/src/app/globals.css` - The master stylesheet containing the precise macro-gaps, bento styling, and dynamic CSS transforms.
*   `/public/audio/` - Contains the `heartbeat.mp3` file used by the `AnalyserNode`.
*   `/public/` - Contains all cinematic and hero imagery.
