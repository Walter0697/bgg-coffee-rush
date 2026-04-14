"use client";

import type { CSSProperties, KeyboardEvent } from "react";
import Image from "next/image";

import { PlayerSeat } from "./PlayerSeat";
import { seats } from "./seats";
import { SKILL_TILES_STEP_INDEX, getTutorialStep } from "./tutorial/tutorialConfig";
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
  const skillTilesConfig =
    tutorialActive && step?.interaction?.mode === "skill-tiles" ? step.interaction : null;
  const shouldKeepSkillTilesVisible =
    tutorialActive && SKILL_TILES_STEP_INDEX >= 0 && tutorialStepIndex >= SKILL_TILES_STEP_INDEX;
  const shouldFreezeSkillTiles =
    tutorialActive && SKILL_TILES_STEP_INDEX >= 0 && tutorialStepIndex > SKILL_TILES_STEP_INDEX;

  const sharedAreaInteractive = tutorialActive && interaction?.mode === "shared-area-elements";
  const sharedAreaTutorial =
    sharedAreaInteractive && step?.interaction?.mode === "shared-area-elements" ? step.interaction : null;
  const centerOverlaySrc =
    tutorialActive && step?.centerOverlayImageSrc ? step.centerOverlayImageSrc : null;
  const centerOverlayPlacement = step?.centerOverlayPlacement ?? "table-center";
  const showTableCenterFirstPlayerOverlay =
    Boolean(centerOverlaySrc && centerOverlayPlacement === "table-center");
  const startFirstPlayerTokenUnderCardsSrc =
    centerOverlaySrc && centerOverlayPlacement === "under-bottom-start-cards"
      ? centerOverlaySrc
      : null;
  const commonAreaInteractive = layoutZoomTutorial;
  const objectiveCardVisible = tutorialActive && step?.phaseTitle === "Objective of the game";
  const isStartGameStepOne =
    tutorialActive &&
    step?.phaseTitle === "Start of the game" &&
    step?.title === "Player board first";
  const isStartGameStepTwo =
    tutorialActive &&
    step?.phaseTitle === "Start of the game" &&
    step?.title === "Prepare cups";
  const startQuestionCardsMode: "step1" | "step2" | null = isStartGameStepOne
    ? "step1"
    : isStartGameStepTwo
      ? "step2"
      : null;
  const disableSeatPartClicksForStartStepOne = isStartGameStepOne;

  function onCommonAreaKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!commonAreaInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onTutorialSubFocus("shared-area");
    }
  }

  function onSharedAreaKeyDown(event: KeyboardEvent<HTMLDivElement>, subFocus: "supply" | "rush" | "deck") {
    if (!sharedAreaInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onTutorialSubFocus(subFocus);
    }
  }

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
        className={`table-layout__shared-area-hitbox ${commonAreaInteractive ? "tutorial-target" : ""} ${
          layoutZoomSubFocus === "shared-area" ? "tutorial-target--active" : ""
        } ${
          commonAreaInteractive && layoutZoomSubFocus !== null && layoutZoomSubFocus !== "shared-area"
            ? "tutorial-target--dimmed"
            : ""
        }`}
        aria-hidden={!commonAreaInteractive}
        aria-label={commonAreaInteractive ? "Common area" : undefined}
        role={commonAreaInteractive ? "button" : undefined}
        tabIndex={commonAreaInteractive ? 0 : -1}
        onClick={commonAreaInteractive ? () => onTutorialSubFocus("shared-area") : undefined}
        onKeyDown={onCommonAreaKeyDown}
      />

      <div
        className={`table-layout__supply ${sharedAreaInteractive ? "tutorial-target" : ""} ${
          sharedAreaInteractive && tutorialSubFocus === "supply" ? "tutorial-target--active" : ""
        } ${
          sharedAreaTutorial && tutorialSubFocus !== null && tutorialSubFocus !== "supply"
            ? "tutorial-target--dimmed"
            : ""
        } ${
          layoutZoomTutorial && layoutZoomSubFocus !== null && layoutZoomSubFocus !== "shared-area"
            ? "tutorial-target--dimmed"
            : ""
        }`}
        aria-hidden={!sharedAreaInteractive}
        aria-label={sharedAreaInteractive ? "Ingredient tray" : undefined}
        role={sharedAreaInteractive ? "button" : undefined}
        tabIndex={sharedAreaInteractive ? 0 : -1}
        onClick={sharedAreaInteractive ? () => onTutorialSubFocus("supply") : undefined}
        onKeyDown={(event) => onSharedAreaKeyDown(event, "supply")}
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
        className={`table-layout__rush-stack ${sharedAreaInteractive ? "tutorial-target" : ""} ${
          sharedAreaInteractive && tutorialSubFocus === "rush" ? "tutorial-target--active" : ""
        } ${
          sharedAreaTutorial && tutorialSubFocus !== null && tutorialSubFocus !== "rush"
            ? "tutorial-target--dimmed"
            : ""
        } ${
          layoutZoomTutorial && layoutZoomSubFocus !== null && layoutZoomSubFocus !== "shared-area"
            ? "tutorial-target--dimmed"
            : ""
        }`}
        aria-hidden={!sharedAreaInteractive}
        aria-label={sharedAreaInteractive ? "Rush token" : undefined}
        role={sharedAreaInteractive ? "button" : undefined}
        tabIndex={sharedAreaInteractive ? 0 : -1}
        onClick={sharedAreaInteractive ? () => onTutorialSubFocus("rush") : undefined}
        onKeyDown={(event) => onSharedAreaKeyDown(event, "rush")}
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
        className={`table-layout__card-deck-stack ${sharedAreaInteractive ? "tutorial-target" : ""} ${
          sharedAreaInteractive && tutorialSubFocus === "deck" ? "tutorial-target--active" : ""
        } ${
          sharedAreaTutorial && tutorialSubFocus !== null && tutorialSubFocus !== "deck"
            ? "tutorial-target--dimmed"
            : ""
        } ${
          layoutZoomTutorial && layoutZoomSubFocus !== null && layoutZoomSubFocus !== "shared-area"
            ? "tutorial-target--dimmed"
            : ""
        }`}
        aria-hidden={!sharedAreaInteractive}
        aria-label={sharedAreaInteractive ? "Draw pile" : undefined}
        role={sharedAreaInteractive ? "button" : undefined}
        tabIndex={sharedAreaInteractive ? 0 : -1}
        onClick={sharedAreaInteractive ? () => onTutorialSubFocus("deck") : undefined}
        onKeyDown={(event) => onSharedAreaKeyDown(event, "deck")}
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
        const partsForThisSeat =
          !disableSeatPartClicksForStartStepOne && seatPartsConfig && seat.side === seatPartsConfig.seat;
        const skillTilesForThisSeat =
          (skillTilesConfig && seat.side === skillTilesConfig.seat) ||
          (shouldKeepSkillTilesVisible && seat.side === "bottom");

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
            skillTilesTutorial={Boolean(skillTilesForThisSeat)}
            skillTilesFrozen={shouldFreezeSkillTiles}
            startQuestionCardsMode={seat.side === "bottom" ? startQuestionCardsMode : null}
            startFirstPlayerTokenUnderCardsSrc={
              seat.side === "bottom" ? startFirstPlayerTokenUnderCardsSrc : null
            }
            objectiveFirstCupIngredients={seat.side === "bottom" && Boolean(objectiveCardVisible)}
          />
        );
      })}

      {objectiveCardVisible ? (
        <div className="table-layout__objective-card" aria-hidden>
          <Image src="/images/card.png" alt="" width={240} height={320} unoptimized />
        </div>
      ) : null}

      {showTableCenterFirstPlayerOverlay && centerOverlaySrc ? (
        <div className="table-layout__center-spotlight-art">
          <Image
            className="table-layout__center-spotlight-img"
            src={centerOverlaySrc}
            alt=""
            width={640}
            height={640}
            unoptimized
          />
        </div>
      ) : null}

    </section>
  );
}
