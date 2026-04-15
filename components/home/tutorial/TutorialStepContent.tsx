"use client";

import { TUTORIAL_STEPS } from "./tutorialConfig";
import { TutorialObjectiveBody } from "./steps/TutorialObjectiveBody";
import { TutorialStartGameStepIntroBody } from "./steps/TutorialStartGameStepIntroBody";
import { TutorialStartGameStepOneBody } from "./steps/TutorialStartGameStepOneBody";
import { TutorialStartGameStepThreeBody } from "./steps/TutorialStartGameStepThreeBody";
import { TutorialStartGameStepTwoBody } from "./steps/TutorialStartGameStepTwoBody";
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
  const phaseTitle = step?.phaseTitle ?? "";
  const phaseStepIndexes = TUTORIAL_STEPS.map((item, index) =>
    item.phaseTitle === phaseTitle ? index : -1
  ).filter((index) => index >= 0);
  const phaseStepIndex = phaseStepIndexes.indexOf(stepIndex);

  if (phaseTitle === "Setup" && phaseStepIndex === 0) {
    return (
      <TutorialStepOneBody
        stepTitle={stepTitle}
        drillInBannerLabel={drillInBannerLabel}
        onSetSubFocus={onSetSubFocus}
      />
    );
  }

  if (phaseTitle === "Setup" && phaseStepIndex === 1) {
    return (
      <TutorialStepTwoBody
        stepTitle={stepTitle}
        drillInBannerLabel={drillInBannerLabel}
        onSetSubFocus={onSetSubFocus}
      />
    );
  }

  if (phaseTitle === "Setup" && phaseStepIndex === 2) {
    return <TutorialStepThreeBody onSetSubFocus={onSetSubFocus} />;
  }

  if (phaseTitle === "Objective of the game") {
    return <TutorialObjectiveBody />;
  }

  if (phaseTitle === "Start of the game" && phaseStepIndex === 0) {
    return <TutorialStartGameStepIntroBody />;
  }

  if (phaseTitle === "Start of the game" && phaseStepIndex === 1) {
    return <TutorialStartGameStepOneBody />;
  }

  if (phaseTitle === "Start of the game" && phaseStepIndex === 2) {
    return <TutorialStartGameStepTwoBody />;
  }

  if (phaseTitle === "Start of the game" && phaseStepIndex === 3) {
    return <TutorialStartGameStepThreeBody />;
  }

  if (step) {
    const descriptionRows = step.description.split("\n");
    if (descriptionRows.length === 1) return <>{step.description}</>;

    return (
      <>
        {descriptionRows.map((row, index) => (
          <span key={`${step.title}-${index}`}>
            {row}
            {index < descriptionRows.length - 1 ? <br /> : null}
          </span>
        ))}
      </>
    );
  }

  return null;
}
