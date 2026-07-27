import { useState } from "react";

interface Props {
  onDone: () => void;
}

const slides = [
  {
    eyebrow: "Welcome",
    title: "Atlas Repo Game",
    body: "A public idle game about building a real ecosystem from one room, real products and a transparent founder journey.",
    note: "You are not entering a random clicker. You are entering the control room of FabricBot, AtlasRepo, Want2View and future experiments.",
    tag: "Our ecosystem",
    visual: "bot"
  },
  {
    eyebrow: "What it is",
    title: "Life as a Tycoon",
    body: "Tap, earn BP, buy room upgrades, unlock terminals, reserve product perks and help projects move toward real revenue.",
    note: "The game layer is simple on purpose: it gives people a playful way to understand what is being built.",
    tag: "Idle tycoon",
    visual: "factory"
  },
  {
    eyebrow: "For you",
    title: "What You Can Get",
    body: "Earn BP, reserve promos, unlock previews, get access drops and participate in the growth of products you may actually use.",
    note: "Some rewards are prototype-only today. The goal is to turn the useful ones into real product mechanics over time.",
    tag: "Perks & access",
    visual: "room"
  },
  {
    eyebrow: "Author",
    title: "Built by Kirill",
    body: "This is Kirill's public build room: products, videos, lessons, experiments, supporters and decisions become game updates.",
    note: "The story matters because the project is meant to be watched, played and improved in public.",
    tag: "Founder story",
    visual: "heart"
  },
  {
    eyebrow: "Direction",
    title: "Where We Are Going",
    body: "First target: products reach $3k/month. Then growth, partner projects, community slots, wallet receipts and maybe TON mechanics later.",
    note: "No empty token promises. First the ecosystem has to become useful, understandable and alive.",
    tag: "Roadmap",
    visual: "coin"
  },
  {
    eyebrow: "Start",
    title: "Begin in the Room",
    body: "Start by tapping the core, collecting BP, buying the first auto clicker and opening the room sections: upgrades, quests, products and strategy.",
    note: "FBC is only a support credit for now: no equity, no profit promise, no guaranteed token and no cash redemption.",
    tag: "Start playing",
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
            <em>{slide.note}</em>
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
