"use client";

import { TUTORIAL_STEPS } from "./tutorialConfig";
import { TutorialStepOneBody } from "./steps/TutorialStepOneBody";
import { TutorialStepTwoBody } from "./steps/TutorialStepTwoBody";
import { TutorialStepThreeBody } from "./steps/TutorialStepThreeBody";

type TutorialStepContentProps = {
  stepIndex: number;
  /** Current step title for zoom banner copy ("Back to …"). */
  stepTitle: string;
  /** When set, card shows drill-in banner instead of tappable keywords (layout zoom or shared corner). */
  drillInBannerLabel: string | null;
  onSetSubFocus: (key: string) => void;
};

export function TutorialStepContent({
  stepIndex,
  stepTitle,
  drillInBannerLabel,
  onSetSubFocus
}: TutorialStepContentProps) {
  const step = TUTORIAL_STEPS[stepIndex];

  if (stepIndex === 0) {
    return (
      <TutorialStepOneBody
        stepTitle={stepTitle}
        drillInBannerLabel={drillInBannerLabel}
        onSetSubFocus={onSetSubFocus}
      />
    );
  }

  if (stepIndex === 1) {
    return (
      <TutorialStepTwoBody
        stepTitle={stepTitle}
        drillInBannerLabel={drillInBannerLabel}
        onSetSubFocus={onSetSubFocus}
      />
    );
  }

  if (stepIndex === 2) {
    return <TutorialStepThreeBody onSetSubFocus={onSetSubFocus} />;
  }

  if (step) {
    return <>{step.description}</>;
  }

  return null;
}
