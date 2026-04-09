"use client";

import Image from "next/image";

import TopNav from "./top-nav";

export default function HeroHeader({ activePath, roundsCount, spreadsheetUrl }) {
  return (
    <div className="hero-copy">
      <div className="hero-topline">
        <p className="eyebrow">Warhammer: The Old World</p>
      </div>
      <h1>Battle March</h1>
      <p className="hero-subtitle">
        {roundsCount} {roundsCount === 1 ? "round" : "rounds"}
      </p>
      <TopNav activePath={activePath} spreadsheetUrl={spreadsheetUrl} />
      <Image
        alt="Twin-Tailed Comet"
        className="hero-comet"
        height={120}
        priority
        src="/twin-tailed-comet.png"
        width={113}
      />
    </div>
  );
}
