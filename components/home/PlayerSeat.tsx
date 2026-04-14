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
  startQuestionCardsMode
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
        <div className={`seat-start-question-cards seat-start-question-cards--${startQuestionCardsMode}`} aria-hidden>
          <Image className="seat-start-question-cards__card-1" src="/images/question.png" alt="" width={220} height={320} unoptimized />
          <Image className="seat-start-question-cards__card-2" src="/images/question.png" alt="" width={220} height={320} unoptimized />
          {startQuestionCardsMode === "step2" ? (
            <Image className="seat-start-question-cards__card-3" src="/images/question.png" alt="" width={220} height={320} unoptimized />
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
        <Image
          className={cupsDimWhenMeepleFocused}
          src="/images/glass.png"
          alt={`${seat.label} cup 1`}
          width={220}
          height={157}
        />
        <Image
          className={cupsDimWhenMeepleFocused}
          src="/images/glass.png"
          alt={`${seat.label} cup 2`}
          width={220}
          height={157}
        />
        <Image
          className={cupsDimWhenMeepleFocused}
          src="/images/glass.png"
          alt={`${seat.label} cup 3`}
          width={220}
          height={157}
        />
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
      </div>
    </section>
  );
}
