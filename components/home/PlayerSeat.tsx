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
  onSeatPartSelect: (part: "board" | "cups" | "mable") => void;
};

export function PlayerSeat({
  seat,
  layoutZoomTutorial,
  layoutZoomSubFocus,
  onLayoutZoomSelect,
  seatPartsTutorial,
  seatPartsSubFocus,
  onSeatPartSelect
}: PlayerSeatProps) {
  const isZoomedLayout = layoutZoomTutorial && layoutZoomSubFocus !== null;
  const cupsDimWhenMableFocused =
    seatPartsTutorial && seatPartsSubFocus === "mable"
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
        />
      </div>
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
          className={cupsDimWhenMableFocused}
          src="/images/glass.png"
          alt={`${seat.label} cup 1`}
          width={220}
          height={157}
        />
        <Image
          className={cupsDimWhenMableFocused}
          src="/images/glass.png"
          alt={`${seat.label} cup 2`}
          width={220}
          height={157}
        />
        <Image
          className={cupsDimWhenMableFocused}
          src="/images/glass.png"
          alt={`${seat.label} cup 3`}
          width={220}
          height={157}
        />
        <Image
          className={`mable-token ${seatPartsTutorial ? "tutorial-target" : ""} ${
            seatPartsTutorial && seatPartsSubFocus === "mable" ? "tutorial-target--active" : ""
          } ${
            seatPartsTutorial && seatPartsSubFocus !== null && seatPartsSubFocus !== "mable"
              ? "tutorial-target--dimmed"
              : ""
          }`}
          src={`/images/mable_${seat.color}.png`}
          alt={`${seat.label} mable`}
          width={98}
          height={144}
          onClick={
            seatPartsTutorial
              ? (event) => {
                  event.stopPropagation();
                  onSeatPartSelect("mable");
                }
              : undefined
          }
        />
      </div>
    </section>
  );
}
