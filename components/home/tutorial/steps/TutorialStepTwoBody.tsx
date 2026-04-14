"use client";

import { TutorialActionKeyword } from "../TutorialActionKeyword";

type TutorialStepTwoBodyProps = {
  stepTitle: string;
  drillInBannerLabel: string | null;
  onSetSubFocus: (key: string) => void;
};

export function TutorialStepTwoBody({ stepTitle, drillInBannerLabel, onSetSubFocus }: TutorialStepTwoBodyProps) {
  if (drillInBannerLabel) {
    return (
      <>
        {`Zoomed into the ${drillInBannerLabel}. Tap the back arrow below to return to the full corner view.`}
      </>
    );
  }

  return (
    <>
      Put the <TutorialActionKeyword onClick={() => onSetSubFocus("supply")}>ingredient tray</TutorialActionKeyword>,{" "}
      <TutorialActionKeyword onClick={() => onSetSubFocus("rush")}>rush token</TutorialActionKeyword>, and{" "}
      <TutorialActionKeyword onClick={() => onSetSubFocus("deck")}>draw pile</TutorialActionKeyword> in a common area
      that everyone can access. You can tap the words or the table.
    </>
  );
}
