"use client";

import type { CSSProperties, KeyboardEvent } from "react";
import Image from "next/image";

import { PlayerSeat } from "./PlayerSeat";
import { seats } from "./seats";
import {
  READY_TO_BREW_TUTORIAL_STEP_INDEX,
  SKILL_TILES_STEP_INDEX,
  getTutorialStep
} from "./tutorial/tutorialConfig";
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
  const centerOverlayBadgeSrc =
    tutorialActive && step?.centerOverlayBadgeImageSrc ? step.centerOverlayBadgeImageSrc : null;
  const centerOverlayPlacement = step?.centerOverlayPlacement ?? "table-center";
  const showTableCenterFirstPlayerOverlay =
    Boolean(centerOverlaySrc && centerOverlayPlacement === "table-center");
  const startFirstPlayerTokenUnderCardsSrc =
    centerOverlaySrc && centerOverlayPlacement === "under-bottom-start-cards"
      ? centerOverlaySrc
      : null;
  const howToPlayMoveLegend =
    tutorialActive && step?.howToPlayMoveLegend ? step.howToPlayMoveLegend : null;
  const howToPlayIngredientBoardMarkers =
    tutorialActive && step?.howToPlayIngredientBoardMarkers?.length
      ? step.howToPlayIngredientBoardMarkers
      : null;
  const howToPlayIngredientBoardMeeples =
    tutorialActive && step?.howToPlayIngredientBoardMeeples?.length
      ? step.howToPlayIngredientBoardMeeples
      : null;
  const howToPlayIngredientBoardIces =
    tutorialActive && step?.howToPlayIngredientBoardIces?.length ? step.howToPlayIngredientBoardIces : null;
  const howToPlayBottomRightSkillTileSrc =
    tutorialActive && step?.showBottomRightSkillTileSrc ? step.showBottomRightSkillTileSrc : null;
  const commonAreaInteractive = layoutZoomTutorial;
  const objectivePhaseActive = tutorialActive && step?.phaseTitle === "Objective of the game";
  const tableOverlayCardSrc =
    tutorialActive ? step?.tableOverlayCardSrc ?? null : null;
  const tableOverlayCardPlacement = step?.tableOverlayCardPlacement ?? "table-center";
  const cupIngredientsVisible =
    tutorialActive && (objectivePhaseActive || Boolean(step?.showCupIngredientsInCup));
  const cupSteamInCup = tutorialActive && Boolean(step?.showCupSteamInCup);
  const cupIngredientsRow = tutorialActive && Boolean(step?.showCupIngredients);
  const cupStackCrossVisible = tutorialActive && Boolean(step?.showCupStackCross);
  const bottomCupContentsMode = tutorialActive ? step?.showBottomCupContents ?? null : null;
  const bottomBoardCornerCardsMode = tutorialActive ? step?.showBottomBoardCornerCards ?? null : null;
  const bottomBoardRushTokenMode = tutorialActive ? step?.showBottomBoardRushToken ?? null : null;
  const bottomBoardOverlayCardStackMode = tutorialActive ? step?.boardOverlayCardStackBottomBoardMode ?? null : null;
  const showTopRightSupplyBin = tutorialActive && Boolean(step?.showTopRightSupplyBin);
  const isStartGameStepOne =
    tutorialActive &&
    step?.phaseTitle === "Start of the game" &&
    step?.title === "Player board first";
  const isStartGameStepTwo =
    tutorialActive &&
    step?.phaseTitle === "Start of the game" &&
    step?.title === "Prepare cups";
  const isStartGameStepFive =
    tutorialActive &&
    step?.phaseTitle === "Start of the game" &&
    step?.title === "Ready to brew";
  const holdStartGameStepFiveVisual =
    tutorialActive &&
    READY_TO_BREW_TUTORIAL_STEP_INDEX >= 0 &&
    tutorialStepIndex > READY_TO_BREW_TUTORIAL_STEP_INDEX;
  const startGameTablePassive =
    tutorialActive && step?.phaseTitle === "Start of the game";
  const startQuestionCardsMode: "step1" | "step2" | "step3" | null = step?.showBottomQuestionCards
    ? step.showBottomQuestionCards
    : isStartGameStepOne
      ? "step1"
      : isStartGameStepTwo
        ? "step2"
        : null;
  const bottomQuestionCardFlightMode = tutorialActive ? step?.showBottomQuestionCardFlight ?? null : null;
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
      className={`table-layout ${tutorialClassNames}${
        startGameTablePassive ? " table-layout--start-game-passive" : ""
      }${holdStartGameStepFiveVisual ? " table-layout--start-step-five-hold" : ""}`.trim()}
      aria-label="Coffee Rush table layout"
    >
      <div
        className={`center-zone${
          howToPlayIngredientBoardMarkers || howToPlayIngredientBoardMeeples || howToPlayIngredientBoardIces
            ? " center-zone--with-ingredient-markers"
            : ""
        } ${layoutZoomTutorial ? "tutorial-target" : ""} ${
          layoutZoomSubFocus === "center" ? "tutorial-target--active" : ""
        } ${layoutZoomTutorial && layoutZoomSubFocus !== null && layoutZoomSubFocus !== "center" ? "tutorial-target--dimmed" : ""}`}
        aria-label="Ingredient board"
        onClick={layoutZoomTutorial ? () => onTutorialSubFocus("center") : undefined}
      >
        <div className="center-zone__board">
          <Image src="/images/board.png" alt="Ingredient board" width={711} height={711} priority />
          {howToPlayIngredientBoardMarkers ? (
            <div className="center-zone__ingredient-markers" aria-hidden>
              {howToPlayIngredientBoardMarkers.map((marker) => (
                <Image
                  key={marker.slot}
                  className={`center-zone__ingredient-marker center-zone__ingredient-marker--${marker.slot}`}
                  src={marker.src}
                  alt=""
                  width={96}
                  height={96}
                  unoptimized
                />
              ))}
            </div>
          ) : null}
          {howToPlayIngredientBoardMeeples ? (
            <div className="center-zone__ingredient-meeples" aria-hidden>
              {howToPlayIngredientBoardMeeples.map((meeple) => (
                <Image
                  key={meeple.slot}
                  className={`center-zone__ingredient-meeple center-zone__ingredient-meeple--${meeple.slot}`}
                  src={meeple.src}
                  alt=""
                  width={98}
                  height={144}
                  unoptimized
                />
              ))}
            </div>
          ) : null}
          {howToPlayIngredientBoardIces ? (
            <div className="center-zone__ingredient-ices" aria-hidden>
              {howToPlayIngredientBoardIces.map((ice) => (
                <Image
                  key={ice.slot}
                  className={`center-zone__ingredient-ice center-zone__ingredient-ice--${ice.slot}`}
                  src={ice.src}
                  alt=""
                  width={84}
                  height={84}
                  unoptimized
                />
              ))}
            </div>
          ) : null}
        </div>
        {howToPlayBottomRightSkillTileSrc ? (
          <div className="center-zone__board-skill-tile" aria-hidden>
            <Image src={howToPlayBottomRightSkillTileSrc} alt="" width={96} height={96} unoptimized />
          </div>
        ) : null}
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

      {showTopRightSupplyBin ? (
        <div className="table-layout__how-to-play-top-right-supply-bin" aria-hidden>
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
      ) : null}

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
        const partsForThisSeat = seatPartsConfig && seat.side === seatPartsConfig.seat;
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
            bottomQuestionCardFlightMode={seat.side === "bottom" ? bottomQuestionCardFlightMode : null}
            startFirstPlayerTokenUnderCardsSrc={
              seat.side === "bottom" ? startFirstPlayerTokenUnderCardsSrc : null
            }
            objectiveFirstCupIngredients={seat.side === "bottom" && Boolean(cupIngredientsVisible)}
            objectiveCupSteamInCup={seat.side === "bottom" && cupSteamInCup}
            cupIngredientsRow={seat.side === "bottom" && Boolean(cupIngredientsRow)}
            bottomCupContentsMode={seat.side === "bottom" ? bottomCupContentsMode : null}
            boardOverlayCardSrc={
              seat.side === "bottom" && tableOverlayCardPlacement === "bottom-player-board"
                ? tableOverlayCardSrc
                : null
            }
            boardOverlayCardStackMode={
              tutorialActive ? step?.boardOverlayCardStackMode ?? null : null
            }
            boardOverlayCardStackBottomBoardMode={
              seat.side === "bottom" ? bottomBoardOverlayCardStackMode : null
            }
            bottomBoardCornerCardsMode={
              seat.side === "bottom" ? bottomBoardCornerCardsMode : null
            }
            showBottomBoardRushToken={seat.side === "bottom" ? bottomBoardRushTokenMode : null}
            startSteamFlyFromMeeple={
              seat.side === "bottom" && (Boolean(isStartGameStepFive) || holdStartGameStepFiveVisual)
            }
          />
        );
      })}

      {tableOverlayCardSrc && tableOverlayCardPlacement === "table-center" ? (
        <div className="table-layout__objective-card" aria-hidden>
          <Image src={tableOverlayCardSrc} alt="" width={240} height={320} unoptimized />
        </div>
      ) : null}

      {cupStackCrossVisible ? (
        <div className="table-layout__how-to-play-cups-cross" aria-hidden>
          <Image
            className="table-layout__how-to-play-cups-cross-icon"
            src="/images/cross.png"
            alt=""
            width={120}
            height={120}
            unoptimized
          />
        </div>
      ) : null}

      {showTableCenterFirstPlayerOverlay && centerOverlaySrc ? (
        <div className="table-layout__center-spotlight-art">
          <div className="table-layout__center-spotlight-frame">
            <Image
              className="table-layout__center-spotlight-img"
              src={centerOverlaySrc}
              alt=""
              width={640}
              height={640}
              unoptimized
            />
            {centerOverlayBadgeSrc ? (
              <Image
                className="table-layout__center-spotlight-badge"
                src={centerOverlayBadgeSrc}
                alt=""
                width={160}
                height={160}
                unoptimized
              />
            ) : null}
          </div>
        </div>
      ) : null}

      {howToPlayMoveLegend ? (
        <div className="table-layout__how-to-play-move-legend">
          {howToPlayMoveLegend?.centerImageSrcs && howToPlayMoveLegend.centerImageSrcs.length > 0 ? (
            <div className="table-layout__how-to-play-move-legend-prelude">
              {howToPlayMoveLegend.centerImageSrcs.map((src) => (
                <Image
                  key={src}
                  className="table-layout__how-to-play-move-legend-prelude-img"
                  src={src}
                  alt=""
                  width={72}
                  height={72}
                  unoptimized
                />
              ))}
            </div>
          ) : null}
          {howToPlayMoveLegend ? (
            <div className="table-layout__how-to-play-move-legend-pair">
              <div className="table-layout__how-to-play-move-legend-item table-layout__how-to-play-move-legend-item--yes">
                <Image
                  className="table-layout__how-to-play-move-legend-icon"
                  src={howToPlayMoveLegend.tickSrc ?? "/images/tick.png"}
                  alt=""
                  width={120}
                  height={120}
                  unoptimized
                />
                <Image
                  className="table-layout__how-to-play-move-legend-move"
                  src={howToPlayMoveLegend.moveYesSrc ?? "/images/move_yes.png"}
                  alt=""
                  width={400}
                  height={280}
                  unoptimized
                />
              </div>
              <div className="table-layout__how-to-play-move-legend-item table-layout__how-to-play-move-legend-item--no">
                <Image
                  className="table-layout__how-to-play-move-legend-icon"
                  src={howToPlayMoveLegend.crossSrc ?? "/images/cross.png"}
                  alt=""
                  width={120}
                  height={120}
                  unoptimized
                />
                <Image
                  className="table-layout__how-to-play-move-legend-move"
                  src={howToPlayMoveLegend.moveNoSrc ?? "/images/move_no.png"}
                  alt=""
                  width={400}
                  height={280}
                  unoptimized
                />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

    </section>
  );
}
