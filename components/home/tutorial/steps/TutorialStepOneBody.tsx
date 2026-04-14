"use client";

import { TutorialActionKeyword } from "../TutorialActionKeyword";

type TutorialStepOneBodyProps = {
  stepTitle: string;
  /** From config `focusLabels`; when set, show zoom banner instead of tappable keywords. */
  drillInBannerLabel: string | null;
  onSetSubFocus: (key: string) => void;
};

export function TutorialStepOneBody({
  stepTitle,
  drillInBannerLabel,
  onSetSubFocus
}: TutorialStepOneBodyProps) {
  if (drillInBannerLabel) {
    return (
      <>
        {`Zoomed into the ${drillInBannerLabel}. Tap the back arrow below to return to the full setup view.`}
      </>
    );
  }

  return (
    <>
      Place the <TutorialActionKeyword onClick={() => onSetSubFocus("center")}>ingredient board</TutorialActionKeyword>
      , player boards (
      <TutorialActionKeyword onClick={() => onSetSubFocus("right")}>blue</TutorialActionKeyword>,{" "}
      <TutorialActionKeyword onClick={() => onSetSubFocus("top")}>red</TutorialActionKeyword>,{" "}
      <TutorialActionKeyword onClick={() => onSetSubFocus("bottom")}>green</TutorialActionKeyword>,{" "}
      <TutorialActionKeyword onClick={() => onSetSubFocus("left")}>yellow</TutorialActionKeyword>) like how we show it
      here. 
    </>
  );
}
