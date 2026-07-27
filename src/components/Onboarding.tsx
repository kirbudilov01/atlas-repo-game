import { useState } from "react";

interface Props {
  onDone: () => void;
}

const slides = [
  {
    eyebrow: "Step 1",
    title: "FabricBot Ecosystem",
    body: "A real room becomes a business game: AtlasRepo, Want2View, FabricBot and future products grow from one place.",
    tag: "Our ecosystem"
  },
  {
    eyebrow: "Step 2",
    title: "Launch SaaS",
    body: "Tap, earn room points, open tools and turn ideas into small products with visible progress.",
    tag: "Build products"
  },
  {
    eyebrow: "Step 3",
    title: "Support The System",
    body: "Funding is shown as crowdfunding/support in prototype mode. No token, equity or return promises.",
    tag: "Participate"
  },
  {
    eyebrow: "Step 4",
    title: "Unlock My Room",
    body: "Players get a personal room later: upgrades, items, levels and their own virtual points.",
    tag: "Personal tycoon"
  },
  {
    eyebrow: "Step 5",
    title: "Earn Game Credits",
    body: "Credits can reserve prototype perks: lessons, promos, tools, render priority and access previews.",
    tag: "Market perks"
  },
  {
    eyebrow: "Step 6",
    title: "Grow To $30k MRR",
    body: "Season goal: subscriptions, users and support move the ecosystem toward a sustainable business.",
    tag: "Roadmap"
  }
];

export function Onboarding({ onDone }: Props) {
  const roomMapSrc = `${import.meta.env.BASE_URL}assets/our-room-map.png`;
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const canEnter = index === slides.length - 1;
  const next = () => {
    if (canEnter) {
      onDone();
      return;
    }
    setIndex((value) => Math.min(slides.length - 1, value + 1));
  };

  return (
    <main className="onboarding">
      <div className="onboarding-room">
        <img src={roomMapSrc} alt="" draggable={false} />
        <div className="onboarding-grade" />
        <div className="mini-core" />
        <div className="mini-character kirill-mini" />
        <div className="mini-character box-mini" />
      </div>
      <div className="onboarding-copy">
        <div className="onboarding-slider">
          <article className="onboarding-slide" key={slide.title}>
            <span className="eyebrow">{slide.eyebrow}</span>
            <h1>{slide.title}</h1>
            <p>{slide.body}</p>
            <strong>{slide.tag}</strong>
          </article>
        </div>
        <div className="onboarding-progress" aria-label="Onboarding progress">
          {slides.map((item, dotIndex) => (
            <button key={item.title} className={dotIndex === index ? "is-current" : ""} onClick={() => setIndex(dotIndex)} aria-label={`Open ${item.title}`} />
          ))}
        </div>
        <div className="onboarding-actions">
          <button className="ghost-button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>Back</button>
          <button className="primary-cta" onClick={next}>{canEnter ? "Enter Our Room" : "Swipe Next"}</button>
        </div>
      </div>
    </main>
  );
}
