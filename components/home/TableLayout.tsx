"use client";

import Image from "next/image";

import { PlayerSeat } from "./PlayerSeat";
import { seats } from "./seats";
import { getTutorialStep } from "./tutorial/tutorialConfig";
import type { TutorialSubFocus } from "./tutorial/types";

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
        aria-label="Center player board"
        onClick={layoutZoomTutorial ? () => onTutorialSubFocus("center") : undefined}
      >
        <Image src="/images/board.png" alt="Center board" width={711} height={711} priority />
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
