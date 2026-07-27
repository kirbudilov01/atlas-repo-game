import { useState } from "react";

interface Props {
  onDone: () => void;
}

const slides = [
  {
    eyebrow: "Step 1",
    title: "Our Real Story",
    body: "This starts from the real room and current products: AtlasRepo, Want2View, FabricBot, payments, video and the public build journey.",
    tag: "Real ecosystem",
    visual: "bot"
  },
  {
    eyebrow: "Step 2",
    title: "Production Chain",
    body: "Collect ideas, research, prototype, launch, grow distribution and push project MRR. Every reward opens the next loop.",
    tag: "Idea to launch",
    visual: "factory"
  },
  {
    eyebrow: "Step 3",
    title: "Agents & Bottlenecks",
    body: "Upgrade rooms, assign agents, clear bottlenecks and choose whether to push compute, attention, trust or autonomy.",
    tag: "Idle strategy",
    visual: "room"
  },
  {
    eyebrow: "Step 4",
    title: "Season Events",
    body: "Launch Sprints, Autonomy Sprints and Content Raids give the ecosystem a calendar of reasons to return.",
    tag: "LiveOps",
    visual: "heart"
  },
  {
    eyebrow: "Step 5",
    title: "Collections & Status",
    body: "Founder cards, agent blueprints, room items and badges create long-term identity, utility and visible history.",
    tag: "Legacy sets",
    visual: "coin"
  },
  {
    eyebrow: "Step 6",
    title: "Safe Game Credits",
    body: "FBC is a prototype support credit for perks and access previews: no equity, no profit promise, no guaranteed token.",
    tag: "Fair economy",
    visual: "coin"
  }
];

export function Onboarding({ onDone }: Props) {
  const roomMapSrc = `${import.meta.env.BASE_URL}assets/game/our-room-game-bg-v1.png`;
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
        <div className={`onboarding-art-card art-${slide.visual}`}>
          <i />
          <strong>{slide.tag}</strong>
        </div>
      </div>
      <div className="onboarding-copy">
        <div className="onboarding-slider">
          <article className="onboarding-slide" key={slide.title}>
            <span className="eyebrow">{slide.eyebrow}</span>
            <h1>{slide.title}</h1>
            <p>{slide.body}</p>
            <strong>{slide.tag}</strong>
            <div className="onboarding-loop-preview" aria-hidden="true">
              <span>Collect</span>
              <span>Upgrade</span>
              <span>Assign</span>
              <span>Event</span>
            </div>
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
