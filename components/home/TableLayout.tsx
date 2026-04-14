"use client";

import type { CSSProperties } from "react";
import Image from "next/image";

import { PlayerSeat } from "./PlayerSeat";
import { seats } from "./seats";
import { getTutorialStep } from "./tutorial/tutorialConfig";
import type { TutorialSubFocus } from "./tutorial/types";

/** Fixed offsets so the stack looks casually piled (stable across SSR/hydration). */
const RUSH_STACK_STYLE: CSSProperties[] = [
  { transform: "translate(5px, 9px) rotate(-7deg)" },
  { transform: "translate(2px, 5px) rotate(5deg)" },
  { transform: "translate(-2px, 2px) rotate(-3deg)" },
  { transform: "translate(-4px, -2px) rotate(8deg)" }
];

/** Tight stepped offsets + wobble so it reads like a thick deck (deterministic for SSR). */
const CARD_BACK_STACK_STYLE: CSSProperties[] = Array.from({ length: 20 }, (_, i) => {
  const wobbleX = Math.sin(i * 2.07) * 1.85;
  const y = i * 0.62;
  const rot = ((i * 9) % 7) - 3;
  return {
    transform: `translate(${wobbleX.toFixed(2)}px, ${y}px) rotate(${rot}deg)`,
    zIndex: i
  };
});

type TableLayoutProps = {
  tutorialActive: boolean;
  tutorialStepIndex: number;
  tutorialSubFocus: TutorialSubFocus;
  onTutorialSubFocus: (value: TutorialSubFocus) => void;
};

export function TableLayout({
  tutorialActive,
  tutorialStepIndex,
  tutorialSubFocus,
  onTutorialSubFocus
}: TableLayoutProps) {
  const step = tutorialActive ? getTutorialStep(tutorialStepIndex) : undefined;
  const tutorialClassNames = step ? step.layoutClasses(tutorialSubFocus).join(" ") : "";

  const interaction = step?.interaction;
  const layoutZoomTutorial = tutorialActive && interaction?.mode === "layout-zoom";
  const layoutZoomSubFocus = layoutZoomTutorial ? tutorialSubFocus : null;

  const seatPartsConfig =
    tutorialActive && step?.interaction?.mode === "seat-elements" ? step.interaction : null;

  const sharedAreaTutorial =
    tutorialActive && step?.interaction?.mode === "shared-area-elements" ? step.interaction : null;

  return (
    <section
      className={`table-layout ${tutorialClassNames}`.trim()}
      aria-label="Coffee Rush table layout"
    >
      <div
        className={`center-zone ${layoutZoomTutorial ? "tutorial-target" : ""} ${
          layoutZoomSubFocus === "center" ? "tutorial-target--active" : ""
        } ${
          layoutZoomTutorial && layoutZoomSubFocus !== null && layoutZoomSubFocus !== "center"
            ? "tutorial-target--dimmed"
            : ""
        }`}
        aria-label="Ingredient board"
        onClick={layoutZoomTutorial ? () => onTutorialSubFocus("center") : undefined}
      >
        <div className="center-zone__board">
          <Image src="/images/board.png" alt="Ingredient board" width={711} height={711} priority />
        </div>
      </div>

      <div
        className={`table-layout__supply ${sharedAreaTutorial ? "tutorial-target" : ""} ${
          sharedAreaTutorial && tutorialSubFocus === "supply" ? "tutorial-target--active" : ""
        } ${
          sharedAreaTutorial && tutorialSubFocus !== null && tutorialSubFocus !== "supply"
            ? "tutorial-target--dimmed"
            : ""
        }`}
        aria-hidden={!sharedAreaTutorial}
        aria-label={sharedAreaTutorial ? "Ingredient tray" : undefined}
        onClick={sharedAreaTutorial ? () => onTutorialSubFocus("supply") : undefined}
      >
        <div className="table-layout__supply-3d">
          <Image
            className="table-layout__supply-img"
            src="/images/supply.png"
            alt=""
            width={240}
            height={120}
          />
        </div>
      </div>

      <div
        className={`table-layout__rush-stack ${sharedAreaTutorial ? "tutorial-target" : ""} ${
          sharedAreaTutorial && tutorialSubFocus === "rush" ? "tutorial-target--active" : ""
        } ${
          sharedAreaTutorial && tutorialSubFocus !== null && tutorialSubFocus !== "rush"
            ? "tutorial-target--dimmed"
            : ""
        }`}
        aria-hidden={!sharedAreaTutorial}
        aria-label={sharedAreaTutorial ? "Rush token" : undefined}
        onClick={sharedAreaTutorial ? () => onTutorialSubFocus("rush") : undefined}
      >
        {RUSH_STACK_STYLE.map((style, index) => (
          <Image
            key={index}
            className="table-layout__rush-tile"
            src="/images/rush.png"
            alt=""
            width={160}
            height={160}
            style={style}
          />
        ))}
      </div>

      <div
        className={`table-layout__card-deck-stack ${sharedAreaTutorial ? "tutorial-target" : ""} ${
          sharedAreaTutorial && tutorialSubFocus === "deck" ? "tutorial-target--active" : ""
        } ${
          sharedAreaTutorial && tutorialSubFocus !== null && tutorialSubFocus !== "deck"
            ? "tutorial-target--dimmed"
            : ""
        }`}
        aria-hidden={!sharedAreaTutorial}
        aria-label={sharedAreaTutorial ? "Draw pile" : undefined}
        onClick={sharedAreaTutorial ? () => onTutorialSubFocus("deck") : undefined}
      >
        {CARD_BACK_STACK_STYLE.map((style, index) => (
          <Image
            key={index}
            className="table-layout__card-deck-tile"
            src="/images/card_back.png"
            alt=""
            width={200}
            height={280}
            style={style}
          />
        ))}
      </div>

      {seats.map((seat) => {
        const partsForThisSeat = seatPartsConfig && seat.side === seatPartsConfig.seat;

        return (
          <PlayerSeat
            key={seat.side}
            seat={seat}
            layoutZoomTutorial={Boolean(layoutZoomTutorial)}
            layoutZoomSubFocus={layoutZoomSubFocus}
            onLayoutZoomSelect={(side) => onTutorialSubFocus(side)}
            seatPartsTutorial={Boolean(partsForThisSeat)}
            seatPartsSubFocus={partsForThisSeat ? tutorialSubFocus : null}
            onSeatPartSelect={(part) => onTutorialSubFocus(part)}
          />
        );
      })}
    </section>
  );
}
