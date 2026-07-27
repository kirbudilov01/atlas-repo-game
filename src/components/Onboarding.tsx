import { useState } from "react";

interface Props {
  onDone: () => void;
}

const slides = [
  {
    eyebrow: "Welcome",
    title: "Kirill's Room",
    body: "This room is the starting map. Products, videos, tools, supporters and decisions become game progress here.",
    note: "You are entering a real build room, not a random token screen.",
    tag: "Our ecosystem",
    visual: "room",
    loop: ["Room", "Products", "Support", "Story"]
  },
  {
    eyebrow: "Game loop",
    title: "Tap For BP",
    body: "Tap the sofa, earn BP, buy auto-generators and unlock better rooms, quests and product actions.",
    note: "BP is the playful energy of the game. It is for progress, upgrades and perk reservations.",
    tag: "Idle tycoon",
    visual: "coin",
    loop: ["Tap", "+BP", "Upgrade", "Idle"]
  },
  {
    eyebrow: "Support",
    title: "FBC Is Memory",
    body: "Support can create FBC credits in the prototype: a public memory of help, not equity and not a guaranteed token.",
    note: "No profit promise, no cash redemption, no fake investment language.",
    tag: "FBC credits",
    visual: "heart",
    loop: ["Support", "Journal", "FBC", "Thanks"]
  },
  {
    eyebrow: "Goal",
    title: "$3k MRR First",
    body: "The first serious target is products reaching $3k/month so Kirill can build calmly and keep shipping.",
    note: "Donations help the path, but product revenue is the real roadmap KPI.",
    tag: "Autonomy",
    visual: "factory",
    loop: ["Products", "$3k MRR", "Runway", "Next"]
  },
  {
    eyebrow: "Start",
    title: "Start Playing",
    body: "Begin with three actions: tap the sofa, open the product desk, or inspect the Mac mini support goal.",
    note: "The game gets better as real projects, videos and community actions are connected.",
    tag: "Start playing",
    visual: "bot",
    loop: ["Tap", "Open", "Support", "Grow"]
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
            <em>{slide.note}</em>
            <strong>{slide.tag}</strong>
            <div className="onboarding-loop-preview" aria-hidden="true">
              {slide.loop.map((item) => <span key={item}>{item}</span>)}
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
