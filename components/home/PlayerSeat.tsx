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
  startQuestionCardsMode: "step1" | "step2" | "step3" | null;
  /** Step 10: animate specific question cards toward the player board corner. */
  bottomQuestionCardFlightMode?: "board-corner" | null;
  /** Shown under the start question cards (Prepare cups), small + tilted */
  startFirstPlayerTokenUnderCardsSrc: string | null;
  /** Objective step: show coffee, milk & steam in the first (left) cup */
  objectiveFirstCupIngredients?: boolean;
  /** Keep the objective steam inside the first cup instead of floating above it. */
  objectiveCupSteamInCup?: boolean;
  /** When true, render cup ingredients (coffee/milk/steam) in a horizontal row above the cup. */
  cupIngredientsRow?: boolean;
  /** How to play: render extra ingredients inside the bottom cups. */
  bottomCupContentsMode?: "player-board-size" | "how-to-play-cups-invalid" | "how-to-play-cups-preview" | null;
  /** Optional question/order card placed on the bottom player board. */
  boardOverlayCardSrc?: string | null;
  /** Optional question-card stack placed beside the bottom player board. */
  boardOverlayCardStackMode?: "step1" | "step2" | "step3" | null;
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
  bottomQuestionCardFlightMode = null,
  startFirstPlayerTokenUnderCardsSrc,
  objectiveFirstCupIngredients = false,
  objectiveCupSteamInCup = false,
  cupIngredientsRow = false,
  bottomCupContentsMode = null,
  boardOverlayCardSrc = null,
  boardOverlayCardStackMode = null,
  startSteamFlyFromMeeple = false
}: PlayerSeatProps) {
  const isZoomedLayout = layoutZoomTutorial && layoutZoomSubFocus !== null;
  const cupsDimWhenMeepleFocused =
    seatPartsTutorial && seatPartsSubFocus === "meeple"
      ? "tutorial-target tutorial-target--dimmed"
      : undefined;
  const showPlayerBoardSizeCups = seat.side === "bottom" && bottomCupContentsMode === "player-board-size";
  const showInvalidCupStackContents = seat.side === "bottom" && bottomCupContentsMode === "how-to-play-cups-invalid";
  const showPreviewCupContents = seat.side === "bottom" && bottomCupContentsMode === "how-to-play-cups-preview";

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
        {seat.side === "bottom" && boardOverlayCardSrc ? (
          <Image
            className="player-board__overlay-card"
            src={boardOverlayCardSrc}
            alt=""
            width={240}
            height={320}
            unoptimized
          />
        ) : null}
      </div>
      {boardOverlayCardStackMode ? (
        <div
          className={`seat-board-overlay-stack seat-board-overlay-stack--${boardOverlayCardStackMode} seat-board-overlay-stack--${seat.side}`}
          aria-hidden
        >
          <Image className="seat-board-overlay-stack__card-1" src="/images/question.png" alt="" width={220} height={320} unoptimized />
          <Image className="seat-board-overlay-stack__card-2" src="/images/question.png" alt="" width={220} height={320} unoptimized />
          {boardOverlayCardStackMode === "step2" || boardOverlayCardStackMode === "step3" ? (
            <Image className="seat-board-overlay-stack__card-3" src="/images/question.png" alt="" width={220} height={320} unoptimized />
          ) : null}
          {boardOverlayCardStackMode === "step3" ? (
            <>
              <Image className="seat-board-overlay-stack__card-4" src="/images/question.png" alt="" width={220} height={320} unoptimized />
              <Image className="seat-board-overlay-stack__card-5" src="/images/question.png" alt="" width={220} height={320} unoptimized />
              <Image className="seat-board-overlay-stack__card-6" src="/images/question.png" alt="" width={220} height={320} unoptimized />
              <Image className="seat-board-overlay-stack__card-7" src="/images/question.png" alt="" width={220} height={320} unoptimized />
            </>
          ) : null}
        </div>
      ) : null}
      {startQuestionCardsMode ? (
        <div
          className={`seat-start-question-wrap ${
            bottomQuestionCardFlightMode === "board-corner" ? "seat-start-question-wrap--board-corner-flight" : ""
          }`}
        >
          <div
            className={`seat-start-question-cards seat-start-question-cards--${startQuestionCardsMode}${
              bottomQuestionCardFlightMode === "board-corner" ? " seat-start-question-cards--board-corner-flight" : ""
            }`}
            aria-hidden
          >
            <Image className="seat-start-question-cards__card-1" src="/images/question.png" alt="" width={220} height={320} unoptimized />
            <Image className="seat-start-question-cards__card-2" src="/images/question.png" alt="" width={220} height={320} unoptimized />
            {startQuestionCardsMode === "step2" || startQuestionCardsMode === "step3" ? (
              <Image className="seat-start-question-cards__card-3" src="/images/question.png" alt="" width={220} height={320} unoptimized />
            ) : null}
            {startQuestionCardsMode === "step3" ? (
              <>
                <Image className="seat-start-question-cards__card-4" src="/images/question.png" alt="" width={220} height={320} unoptimized />
                <Image className="seat-start-question-cards__card-5" src="/images/question.png" alt="" width={220} height={320} unoptimized />
                <Image className="seat-start-question-cards__card-6" src="/images/question.png" alt="" width={220} height={320} unoptimized />
                <Image className="seat-start-question-cards__card-7" src="/images/question.png" alt="" width={220} height={320} unoptimized />
              </>
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
        {showPlayerBoardSizeCups ? (
          <div className="edge-glass-group__cup-shell edge-glass-group__cup-shell--cup-1" aria-hidden>
            <img
              className={`edge-glass-group__cup edge-glass-group__cup--1 ${cupsDimWhenMeepleFocused ?? ""}`.trim()}
              src="/images/glass.png"
              alt={`${seat.label} cup 1`}
            />
            <div className="edge-glass-group__cup-contents edge-glass-group__cup-contents--cup-1" aria-hidden>
              <img
                className="edge-glass-group__cup-contents-ingredient edge-glass-group__cup-contents-ingredient--coffee"
                src="/images/ingredient/coffee.png"
                alt=""
              />
              <img
                className="edge-glass-group__cup-contents-ingredient edge-glass-group__cup-contents-ingredient--steam"
                src="/images/ingredient/steam.png"
                alt=""
              />
            </div>
          </div>
        ) : objectiveFirstCupIngredients ? (
          <div className={`edge-glass-cup edge-glass-cup--objective ${cupsDimWhenMeepleFocused ?? ""}`.trim()}>
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
        {showPlayerBoardSizeCups ? (
          <div className="edge-glass-group__cup-shell edge-glass-group__cup-shell--cup-2" aria-hidden>
            <img
              className={`edge-glass-group__cup edge-glass-group__cup--2 ${cupsDimWhenMeepleFocused ?? ""}`.trim()}
              src="/images/glass.png"
              alt={`${seat.label} cup 2`}
            />
            <div className="edge-glass-group__cup-contents edge-glass-group__cup-contents--cup-2" aria-hidden>
              <img
                className="edge-glass-group__cup-contents-ingredient edge-glass-group__cup-contents-ingredient--steam"
                src="/images/ingredient/steam.png"
                alt=""
              />
            </div>
          </div>
        ) : showInvalidCupStackContents || showPreviewCupContents ? (
          <div className="edge-glass-group__cup-shell edge-glass-group__cup-shell--cup-2" aria-hidden>
            <Image
              className={`edge-glass-group__cup edge-glass-group__cup--2 ${cupsDimWhenMeepleFocused ?? ""}`.trim()}
              src="/images/glass.png"
              alt={`${seat.label} cup 2`}
              width={220}
              height={157}
            />
            <div className="edge-glass-group__cup-contents edge-glass-group__cup-contents--cup-2" aria-hidden>
              <Image
                className="edge-glass-group__cup-contents-ingredient edge-glass-group__cup-contents-ingredient--steam"
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
            className={`edge-glass-group__cup edge-glass-group__cup--2 ${cupsDimWhenMeepleFocused ?? ""}`.trim()}
            src="/images/glass.png"
            alt={`${seat.label} cup 2`}
            width={220}
            height={157}
          />
        )}
        {showPlayerBoardSizeCups ? (
          <div className="edge-glass-group__cup-shell edge-glass-group__cup-shell--cup-3" aria-hidden>
            <Image
              className={`edge-glass-group__cup edge-glass-group__cup--3 ${cupsDimWhenMeepleFocused ?? ""}`.trim()}
              src="/images/glass.png"
              alt={`${seat.label} cup 3`}
              width={220}
              height={157}
            />
            <div className="edge-glass-group__cup-contents edge-glass-group__cup-contents--cup-3" aria-hidden>
              <Image
                className="edge-glass-group__cup-contents-ingredient edge-glass-group__cup-contents-ingredient--ice"
                src="/images/ingredient/ice.png"
                alt=""
                width={64}
                height={64}
                unoptimized
              />
            </div>
          </div>
        ) : showPreviewCupContents ? (
          <div className="edge-glass-group__cup-shell edge-glass-group__cup-shell--cup-3" aria-hidden>
            <Image
              className={`edge-glass-group__cup edge-glass-group__cup--3 ${cupsDimWhenMeepleFocused ?? ""}`.trim()}
              src="/images/glass.png"
              alt={`${seat.label} cup 3`}
              width={220}
              height={157}
            />
            <div className="edge-glass-group__cup-contents edge-glass-group__cup-contents--cup-3" aria-hidden>
              <Image
                className="edge-glass-group__cup-contents-ingredient edge-glass-group__cup-contents-ingredient--ice"
                src="/images/ingredient/ice.png"
                alt=""
                width={64}
                height={64}
                unoptimized
              />
            </div>
          </div>
        ) : (
          <Image
            className={`edge-glass-group__cup edge-glass-group__cup--3 ${cupsDimWhenMeepleFocused ?? ""}`.trim()}
            src="/images/glass.png"
            alt={`${seat.label} cup 3`}
            width={220}
            height={157}
          />
        )}
        {showInvalidCupStackContents || showPreviewCupContents ? (
          <div className="edge-glass-group__cup-contents edge-glass-group__cup-contents--cup-1" aria-hidden>
            <Image
              className="edge-glass-group__cup-contents-ingredient edge-glass-group__cup-contents-ingredient--coffee"
              src="/images/ingredient/coffee.png"
              alt=""
              width={64}
              height={64}
              unoptimized
            />
            <Image
              className="edge-glass-group__cup-contents-ingredient edge-glass-group__cup-contents-ingredient--milk"
              src="/images/ingredient/milk.png"
              alt=""
              width={64}
              height={64}
              unoptimized
            />
          </div>
        ) : null}
        {showPreviewCupContents ? (
          <div className="edge-glass-group__cup-contents edge-glass-group__cup-contents--cup-2 edge-glass-group__cup-contents--cup-2-preview" aria-hidden>
            <Image
              className="edge-glass-group__cup-contents-ingredient edge-glass-group__cup-contents-ingredient--steam"
              src="/images/ingredient/steam.png"
              alt=""
              width={64}
              height={64}
              unoptimized
            />
          </div>
        ) : null}
        {showPreviewCupContents ? (
          <div className="edge-glass-group__spill-ingredients" aria-hidden>
            <Image
              className="edge-glass-group__spill-ingredient edge-glass-group__spill-ingredient--coffee"
              src="/images/ingredient/coffee.png"
              alt=""
              width={64}
              height={64}
              unoptimized
            />
            <Image
              className="edge-glass-group__spill-ingredient edge-glass-group__spill-ingredient--steam"
              src="/images/ingredient/steam.png"
              alt=""
              width={64}
              height={64}
              unoptimized
            />
          </div>
        ) : null}
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
