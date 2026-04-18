"use client";

import { TUTORIAL_STEPS } from "./tutorial/tutorialConfig";
import { TutorialStepContent } from "./tutorial/TutorialStepContent";
import type { TutorialSubFocus } from "./tutorial/types";

function IconChevronLeft() {
  return (
    <svg className="tutorial-nav-icon" viewBox="0 0 24 24" width={22} height={22} aria-hidden>
      <path
        fill="currentColor"
        d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
      />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg className="tutorial-nav-icon" viewBox="0 0 24 24" width={22} height={22} aria-hidden>
      <path
        fill="currentColor"
        d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
      />
    </svg>
  );
}

function IconClose() {
  return (
    <svg className="tutorial-nav-icon" viewBox="0 0 24 24" width={22} height={22} aria-hidden>
      <path
        fill="currentColor"
        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
      />
    </svg>
  );
}

type TutorialCardProps = {
  stepIndex: number;
  subFocus: TutorialSubFocus;
  onSetSubFocus: (value: TutorialSubFocus) => void;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function TutorialCard({
  stepIndex,
  subFocus,
  onSetSubFocus,
  onClose,
  onPrevious,
  onNext
}: TutorialCardProps) {
  const step = TUTORIAL_STEPS[stepIndex];
  const phaseTitle = step?.phaseTitle ?? "Setup";
  const hideStepCounter = Boolean(step?.hideStepCounter);
  const drillInBannerLabel =
    subFocus && step
      ? step.interaction.mode === "layout-zoom"
        ? (step.focusLabels[subFocus] ?? `${subFocus} player area`)
        : step.interaction.mode === "shared-area-elements"
          ? (step.focusLabels[subFocus] ?? subFocus)
          : null
      : null;

  const phaseStepIndexes = TUTORIAL_STEPS.map((item, index) =>
    item.phaseTitle === phaseTitle ? index : -1
  ).filter((index) => index >= 0);
  const totalSteps = phaseStepIndexes.length;
  const stepPosition = phaseStepIndexes.indexOf(stepIndex);
  const setupStepNumber = stepPosition >= 0 ? stepPosition + 1 : 1;
  const totalTutorialSteps = TUTORIAL_STEPS.length;
  const currentTutorialStep = stepIndex + 1;
  const hasNextStep = stepIndex < totalTutorialSteps - 1;
  const previousDisabled = stepIndex === 0 && subFocus === null;
  const progressPercent =
    totalTutorialSteps > 0 ? Math.round((currentTutorialStep / totalTutorialSteps) * 100) : 0;

  return (
    <>
      <div className="tutorial-card-shell">
        <p className="tutorial-step-label">
          {hideStepCounter ? phaseTitle : `${phaseTitle} · Step ${setupStepNumber} of ${totalSteps}`}
        </p>
        <section className="tutorial-card" aria-label="Tutorial steps">
          <p className="tutorial-step-text">
            <TutorialStepContent
              stepIndex={stepIndex}
              stepTitle={step?.title ?? "this step"}
              drillInBannerLabel={drillInBannerLabel}
              onSetSubFocus={(key) => onSetSubFocus(key)}
            />
          </p>
          <div className="tutorial-actions">
            <button
              type="button"
              className="tutorial-button tutorial-button--ghost tutorial-button--icon"
              onClick={onClose}
              aria-label="Exit tutorial"
            >
              <IconClose />
            </button>
            <div className="tutorial-actions__nav">
              {subFocus !== null ? (
                <button
                  type="button"
                  className="tutorial-button tutorial-button--icon"
                  onClick={() => onSetSubFocus(null)}
                  aria-label="Back to step overview"
                >
                  <IconChevronLeft />
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="tutorial-button tutorial-button--ghost tutorial-button--icon"
                    onClick={onPrevious}
                    disabled={previousDisabled}
                    aria-label="Previous step"
                  >
                    <IconChevronLeft />
                  </button>
                <button
                  type="button"
                  className={`tutorial-button tutorial-button--icon ${
                    hasNextStep ? "" : "tutorial-button--blank"
                  }`}
                  onClick={onNext}
                  disabled={!hasNextStep}
                  aria-label={hasNextStep ? "Next step" : undefined}
                >
                  {hasNextStep ? <IconChevronRight /> : null}
                </button>
              </>
            )}
            </div>
          </div>
        </section>
      </div>

      <div
        className="tutorial-step-progress"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={totalTutorialSteps}
        aria-valuenow={currentTutorialStep}
        aria-label={`Tutorial progress: step ${currentTutorialStep} of ${totalTutorialSteps}`}
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
