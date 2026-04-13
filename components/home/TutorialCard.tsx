"use client";

import { TUTORIAL_STEPS, getActiveTutorialModule } from "./tutorial/tutorialConfig";
import { TutorialStepContent } from "./tutorial/TutorialStepContent";
import type { TutorialSubFocus } from "./tutorial/types";

type TutorialCardProps = {
  stepIndex: number;
  subFocus: TutorialSubFocus;
  isFinalStep: boolean;
  onSetSubFocus: (value: TutorialSubFocus) => void;
  onClose: () => void;
  onNext: () => void;
};

export function TutorialCard({
  stepIndex,
  subFocus,
  isFinalStep,
  onSetSubFocus,
  onClose,
  onNext
}: TutorialCardProps) {
  const module = getActiveTutorialModule();
  const step = TUTORIAL_STEPS[stepIndex];
  const layoutZoomBannerLabel =
    step?.interaction.mode === "layout-zoom" && subFocus
      ? step.focusLabels[subFocus] ?? `${subFocus} player area`
      : null;

  const showBackToLayoutStep =
    step?.interaction.mode === "layout-zoom" && layoutZoomBannerLabel !== null;

  const showBackToSeatPartsStep =
    step?.interaction.mode === "seat-elements" && subFocus !== null;

  const totalSteps = module.steps.length;
  const progressPercent =
    totalSteps > 0 ? Math.round(((stepIndex + 1) / totalSteps) * 100) : 0;

  return (
    <>
      <section className="tutorial-card" aria-label="Tutorial steps">
        <p className="tutorial-step-label">
          {module.title} · Step {stepIndex + 1} of {totalSteps}
        </p>
        <p className="tutorial-step-text">
          <TutorialStepContent
            stepIndex={stepIndex}
            stepTitle={step?.title ?? "this step"}
            layoutZoomBannerLabel={layoutZoomBannerLabel}
            onSetSubFocus={(key) => onSetSubFocus(key)}
          />
        </p>
        <div className="tutorial-actions">
          {showBackToLayoutStep && step ? (
            <button
              type="button"
              className="tutorial-button tutorial-button--ghost"
              onClick={() => onSetSubFocus(null)}
            >
              Back to {step.title}
            </button>
          ) : null}
          {showBackToSeatPartsStep && step ? (
            <button
              type="button"
              className="tutorial-button tutorial-button--ghost"
              onClick={() => onSetSubFocus(null)}
            >
              Back to {step.title}
            </button>
          ) : null}
          <button type="button" className="tutorial-button tutorial-button--ghost" onClick={onClose}>
            Exit
          </button>
          <button type="button" className="tutorial-button" onClick={onNext}>
            {isFinalStep ? "Finish" : "Next"}
          </button>
        </div>
      </section>

      <div
        className="tutorial-step-progress"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuenow={stepIndex + 1}
        aria-label={`${module.title}: step ${stepIndex + 1} of ${totalSteps}`}
      >
        <div className="tutorial-step-progress__track">
          <div
            className="tutorial-step-progress__fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </>
  );
}
