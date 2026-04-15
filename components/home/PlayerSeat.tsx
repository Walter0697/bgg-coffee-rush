"use client";

import Image from "next/image";

import type { Seat, SeatSide } from "./seats";
import type { TutorialSubFocus } from "./tutorial/types";

type PlayerSeatProps = {
  seat: Seat;
  layoutZoomTutorial: boolean;
  layoutZoomSubFocus: TutorialSubFocus;
  onLayoutZoomSelect: (side: SeatSide) => void;
  seatPartsTutorial: boolean;
  seatPartsSubFocus: TutorialSubFocus;
  onSeatPartSelect: (part: "board" | "cups" | "meeple") => void;
  skillTilesTutorial: boolean;
  skillTilesFrozen: boolean;
  startQuestionCardsMode: "step1" | "step2" | null;
  /** Shown under the start question cards (Prepare cups), small + tilted */
  startFirstPlayerTokenUnderCardsSrc: string | null;
  /** Objective step: show coffee, milk & steam in the first (left) cup */
  objectiveFirstCupIngredients?: boolean;
  /** Keep the objective steam inside the first cup instead of floating above it. */
  objectiveCupSteamInCup?: boolean;
  /** When true, render cup ingredients (coffee/milk/steam) in a horizontal row above the cup. */
  cupIngredientsRow?: boolean;
  /** Start step 5: animate steam from meeple toward first cup */
  startSteamFlyFromMeeple?: boolean;
};

export function PlayerSeat({
  seat,
  layoutZoomTutorial,
  layoutZoomSubFocus,
  onLayoutZoomSelect,
  seatPartsTutorial,
  seatPartsSubFocus,
  onSeatPartSelect,
  skillTilesTutorial,
  skillTilesFrozen,
  startQuestionCardsMode,
  startFirstPlayerTokenUnderCardsSrc,
  objectiveFirstCupIngredients = false,
  objectiveCupSteamInCup = false,
  cupIngredientsRow = false,
  startSteamFlyFromMeeple = false
}: PlayerSeatProps) {
  const isZoomedLayout = layoutZoomTutorial && layoutZoomSubFocus !== null;
  const cupsDimWhenMeepleFocused =
    seatPartsTutorial && seatPartsSubFocus === "meeple"
      ? "tutorial-target tutorial-target--dimmed"
      : undefined;

  return (
    <section
      className={`seat seat--${seat.side} ${layoutZoomTutorial ? "tutorial-target" : ""} ${
        layoutZoomSubFocus === seat.side ? "tutorial-target--active" : ""
      } ${isZoomedLayout && layoutZoomSubFocus !== seat.side ? "tutorial-target--dimmed" : ""}`}
      onClick={layoutZoomTutorial ? () => onLayoutZoomSelect(seat.side) : undefined}
    >
      <div
        className={`player-board player-board--${seat.color} ${seatPartsTutorial ? "tutorial-target" : ""} ${
          seatPartsTutorial && seatPartsSubFocus === "board" ? "tutorial-target--active" : ""
        } ${
          seatPartsTutorial && seatPartsSubFocus !== null && seatPartsSubFocus !== "board"
            ? "tutorial-target--dimmed"
            : ""
        }`}
        onClick={seatPartsTutorial ? () => onSeatPartSelect("board") : undefined}
      >
        <Image
          src={seat.src}
          alt={seat.label}
          width={288}
          height={626}
          priority={seat.side === "bottom"}
          unoptimized
        />
      </div>
      {startQuestionCardsMode ? (
        <div className="seat-start-question-wrap">
          <div className={`seat-start-question-cards seat-start-question-cards--${startQuestionCardsMode}`} aria-hidden>
            <Image className="seat-start-question-cards__card-1" src="/images/question.png" alt="" width={220} height={320} unoptimized />
            <Image className="seat-start-question-cards__card-2" src="/images/question.png" alt="" width={220} height={320} unoptimized />
            {startQuestionCardsMode === "step2" ? (
              <Image className="seat-start-question-cards__card-3" src="/images/question.png" alt="" width={220} height={320} unoptimized />
            ) : null}
          </div>
          {startFirstPlayerTokenUnderCardsSrc && startQuestionCardsMode === "step2" ? (
            <div className="seat-start-first-token" aria-hidden>
              <Image
                className="seat-start-first-token__img"
                src={startFirstPlayerTokenUnderCardsSrc}
                alt=""
                width={220}
                height={220}
                unoptimized
              />
            </div>
          ) : null}
        </div>
      ) : null}
      {skillTilesTutorial ? (
        <div
          className={`skill-tiles-group skill-tiles-group--left ${skillTilesFrozen ? "skill-tiles-group--frozen" : ""}`}
          aria-label={`${seat.label} skill tiles`}
        >
          <Image src="/images/e1.png" alt="Skill tile e1" width={72} height={72} unoptimized />
          <Image src="/images/e2.png" alt="Skill tile e2" width={72} height={72} unoptimized />
          <Image src="/images/e3.png" alt="Skill tile e3" width={72} height={72} unoptimized />
          <Image src="/images/e4.png" alt="Skill tile e4" width={72} height={72} unoptimized />
        </div>
      ) : null}
      <div
        className={`edge-glass-group edge-glass-group--${seat.side} ${seatPartsTutorial ? "tutorial-target" : ""} ${
          seatPartsTutorial && seatPartsSubFocus === "cups" ? "tutorial-target--active" : ""
        } ${
          seatPartsTutorial && seatPartsSubFocus === "board" ? "tutorial-target--dimmed" : ""
        }`}
        aria-label={`${seat.label} cups`}
        onClick={seatPartsTutorial ? () => onSeatPartSelect("cups") : undefined}
      >
        {seat.side === "bottom" && objectiveFirstCupIngredients ? (
          <div
            className={`edge-glass-cup edge-glass-cup--objective ${cupsDimWhenMeepleFocused ?? ""}`.trim()}
          >
            <Image
              className="edge-glass-cup__glass"
              src="/images/glass.png"
              alt={`${seat.label} cup 1`}
              width={220}
              height={157}
            />
            <div className="edge-glass-cup__ingredients" aria-hidden>
              <Image
                className="edge-glass-cup__ingredient edge-glass-cup__ingredient--coffee"
                src="/images/ingredient/coffee.png"
                alt=""
                width={64}
                height={64}
                unoptimized
              />
              <Image
                className="edge-glass-cup__ingredient edge-glass-cup__ingredient--milk"
                src="/images/ingredient/milk.png"
                alt=""
                width={64}
                height={64}
                unoptimized
              />
              {cupIngredientsRow ? (
                <Image
                  className="edge-glass-cup__ingredient edge-glass-cup__ingredient--steam"
                  src="/images/ingredient/steam.png"
                  alt=""
                  width={64}
                  height={64}
                  unoptimized
                />
              ) : null}
            </div>
            {!cupIngredientsRow && !objectiveCupSteamInCup ? (
              <Image
                className="edge-glass-cup__ingredient edge-glass-cup__ingredient--steam"
                src="/images/ingredient/steam.png"
                alt=""
                width={64}
                height={64}
                unoptimized
              />
            ) : null}
            {!cupIngredientsRow && objectiveCupSteamInCup ? (
              <Image
                className="edge-glass-cup__ingredient edge-glass-cup__ingredient--steam edge-glass-cup__ingredient--steam-in-cup"
                src="/images/ingredient/steam.png"
                alt=""
                width={64}
                height={64}
                unoptimized
              />
            ) : null}
          </div>
        ) : (
          <Image
            className={`edge-glass-group__cup edge-glass-group__cup--1 ${cupsDimWhenMeepleFocused ?? ""}`.trim()}
            src="/images/glass.png"
            alt={`${seat.label} cup 1`}
            width={220}
            height={157}
          />
        )}
        <Image
          className={`edge-glass-group__cup edge-glass-group__cup--2 ${cupsDimWhenMeepleFocused ?? ""}`.trim()}
          src="/images/glass.png"
          alt={`${seat.label} cup 2`}
          width={220}
          height={157}
        />
        <Image
          className={`edge-glass-group__cup edge-glass-group__cup--3 ${cupsDimWhenMeepleFocused ?? ""}`.trim()}
          src="/images/glass.png"
          alt={`${seat.label} cup 3`}
          width={220}
          height={157}
        />
        {seat.side === "bottom" && cupIngredientsRow ? (
          <>
            <div className="edge-glass-group__ingredients-row" aria-hidden>
              <Image
                className="edge-glass-group__ingredient edge-glass-group__ingredient--coffee"
                src="/images/ingredient/coffee.png"
                alt=""
                width={64}
                height={64}
                unoptimized
              />
              <Image
                className="edge-glass-group__ingredient edge-glass-group__ingredient--milk"
                src="/images/ingredient/milk.png"
                alt=""
                width={64}
                height={64}
                unoptimized
              />
              <Image
                className="edge-glass-group__ingredient edge-glass-group__ingredient--steam"
                src="/images/ingredient/steam.png"
                alt=""
                width={64}
                height={64}
                unoptimized
              />
            </div>
            <Image
              className="edge-glass-group__ingredient-in-cup edge-glass-group__ingredient-in-cup--steam"
              src="/images/ingredient/steam.png"
              alt=""
              width={64}
              height={64}
              unoptimized
            />
            <Image
              className="edge-glass-group__ingredient-in-cup edge-glass-group__ingredient-in-cup--coffee"
              src="/images/ingredient/coffee.png"
              alt=""
              width={64}
              height={64}
              unoptimized
            />
            <Image
              className="edge-glass-group__ingredient-in-cup edge-glass-group__ingredient-in-cup--milk"
              src="/images/ingredient/milk.png"
              alt=""
              width={64}
              height={64}
              unoptimized
            />
            <Image
              className="edge-glass-group__ingredient-in-cup edge-glass-group__ingredient-in-cup--steam-cup-one"
              src="/images/ingredient/steam.png"
              alt=""
              width={64}
              height={64}
              unoptimized
            />
            <Image
              className="edge-glass-group__ingredient-in-cup edge-glass-group__ingredient-in-cup--ice"
              src="/images/ingredient/ice.png"
              alt=""
              width={64}
              height={64}
              unoptimized
            />
          </>
        ) : null}
        {seat.side === "bottom" && startSteamFlyFromMeeple ? (
          <div
            className={`seat-start-five-meeple-anchor ${seatPartsTutorial ? "tutorial-target" : ""} ${
              seatPartsTutorial && seatPartsSubFocus === "meeple" ? "tutorial-target--active" : ""
            } ${
              seatPartsTutorial && seatPartsSubFocus !== null && seatPartsSubFocus !== "meeple"
                ? "tutorial-target--dimmed"
                : ""
            }`}
            onClick={
              seatPartsTutorial
                ? (event) => {
                    event.stopPropagation();
                    onSeatPartSelect("meeple");
                  }
                : undefined
            }
          >
            <Image
              className="meeple-token"
              src={`/images/meeple_${seat.color}.png`}
              alt={`${seat.label} meeple`}
              width={98}
              height={144}
              unoptimized
            />
            <div className="seat-start-five-steam-fly" aria-hidden>
              <Image
                className="seat-start-five-steam-fly__img"
                src="/images/ingredient/steam.png"
                alt=""
                width={64}
                height={64}
                unoptimized
              />
            </div>
          </div>
        ) : (
          <Image
            className={`meeple-token ${seatPartsTutorial ? "tutorial-target" : ""} ${
              seatPartsTutorial && seatPartsSubFocus === "meeple" ? "tutorial-target--active" : ""
            } ${
              seatPartsTutorial && seatPartsSubFocus !== null && seatPartsSubFocus !== "meeple"
                ? "tutorial-target--dimmed"
                : ""
            }`}
            src={`/images/meeple_${seat.color}.png`}
            alt={`${seat.label} meeple`}
            width={98}
            height={144}
            onClick={
              seatPartsTutorial
                ? (event) => {
                    event.stopPropagation();
                    onSeatPartSelect("meeple");
                  }
                : undefined
            }
            unoptimized
          />
        )}
      </div>
    </section>
  );
}
