"use client";

import { TUTORIAL_STEPS } from "./tutorialConfig";
import { TutorialStepOneBody } from "./steps/TutorialStepOneBody";
import { TutorialStepTwoBody } from "./steps/TutorialStepTwoBody";
type TutorialStepContentProps = {
  stepIndex: number;
  /** Current step title for zoom banner copy ("Back to …"). */
  stepTitle: string;
  /** When set (step 1 layout zoom), card shows the zoom banner instead of tappable keywords. */
  layoutZoomBannerLabel: string | null;
  onSetSubFocus: (key: string) => void;
};

export function TutorialStepContent({
  stepIndex,
  stepTitle,
  layoutZoomBannerLabel,
  onSetSubFocus
}: TutorialStepContentProps) {
  const step = TUTORIAL_STEPS[stepIndex];

  if (stepIndex === 0) {
    return (
      <TutorialStepOneBody
        stepTitle={stepTitle}
        layoutZoomBannerLabel={layoutZoomBannerLabel}
        onSetSubFocus={onSetSubFocus}
      />
    );
  }

  if (stepIndex === 1) {
    return <TutorialStepTwoBody onSetSubFocus={onSetSubFocus} />;
  }

  if (step) {
    return <>{step.description}</>;
  }

  return null;
}
