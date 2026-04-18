"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/** Matches `.table-layout { transition: transform 560ms ease }` when idle tilt → tutorial face-up. */
const TUTORIAL_FACEUP_TRANSITION_MS = 560;

import { PageHero } from "../components/home/PageHero";
import { TutorialStepFinderDialog } from "../components/home/TutorialStepFinderDialog";
import { TableLayout } from "../components/home/TableLayout";
import { TutorialCard } from "../components/home/TutorialCard";
import { TUTORIAL_SECTION_STARTS, TUTORIAL_STEPS } from "../components/home/tutorial/tutorialConfig";
import type { TutorialSubFocus } from "../components/home/tutorial/types";

export default function HomePage() {
  const [tutorialStarted, setTutorialStarted] = useState(false);
  /** After the table finishes animating to top-down, strip perspective / Z (see `.mahjong-shell--tutorial`). */
  const [tutorialShellUn3d, setTutorialShellUn3d] = useState(false);
  const [findStepDialogOpen, setFindStepDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialSubFocus, setTutorialSubFocus] = useState<TutorialSubFocus>(null);
  const [tutorialOpenedFromFindStep, setTutorialOpenedFromFindStep] = useState(false);

  const isFinalStep = currentStep === TUTORIAL_STEPS.length - 1;
  const walkingRestrictionStepIndex = TUTORIAL_STEPS.findIndex(
    (step) => step.phaseTitle === "How to play" && step.title === "Valid moves"
  );
  const rushTokenStepOneIndex = TUTORIAL_STEPS.findIndex(
    (step) => step.phaseTitle === "How to play" && step.title === "Special"
  );
  const rushTokenStepTwoIndex = TUTORIAL_STEPS.findIndex(
    (step) => step.phaseTitle === "How to play" && step.title === "Flow of time~"
  );
  const whenToEndStepIndex = TUTORIAL_STEPS.findIndex(
    (step) => step.phaseTitle === "How to play" && step.title === "Cards settled"
  );
  const showTopRightSupplyBin = tutorialStarted && Boolean(TUTORIAL_STEPS[currentStep]?.showTopRightSupplyBin);

  useEffect(() => {
    if (!tutorialStarted) {
      setTutorialShellUn3d(false);
      return;
    }
    const id = window.setTimeout(() => {
      setTutorialShellUn3d(true);
    }, TUTORIAL_FACEUP_TRANSITION_MS);
    return () => window.clearTimeout(id);
  }, [tutorialStarted]);

  const startTutorial = () => {
    setTutorialStarted(true);
    setFindStepDialogOpen(false);
    setTutorialOpenedFromFindStep(false);
    setCurrentStep(0);
    setTutorialSubFocus(null);
  };

  const openFindStepDialog = () => {
    setTutorialStarted(false);
    setTutorialOpenedFromFindStep(false);
    setCurrentStep(0);
    setTutorialSubFocus(null);
    setFindStepDialogOpen(true);
  };

  const startTutorialAtStep = (stepIndex: number, fromFindStep = false) => {
    setTutorialStarted(true);
    setFindStepDialogOpen(false);
    setTutorialOpenedFromFindStep(fromFindStep);
    setCurrentStep(stepIndex);
    setTutorialSubFocus(null);
  };

  const nextStep = () => {
    if (isFinalStep) {
      closeTutorial();
      return;
    }

    const nextStepIndex = currentStep + 1;
    setCurrentStep(nextStepIndex);
    setTutorialSubFocus(null);
  };

  const previousStep = () => {
    if (tutorialSubFocus) {
      setTutorialSubFocus(null);
      return;
    }
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
      setTutorialSubFocus(null);
    }
  };

  const closeTutorial = () => {
    const reopenFindStepDialog = tutorialOpenedFromFindStep;
    setTutorialStarted(false);
    setCurrentStep(0);
    setTutorialSubFocus(null);
    setTutorialOpenedFromFindStep(false);
    setFindStepDialogOpen(reopenFindStepDialog);
  };

  const closeFindStepDialog = () => {
    setFindStepDialogOpen(false);
    setTutorialOpenedFromFindStep(false);
    setTutorialStarted(false);
    setCurrentStep(0);
    setTutorialSubFocus(null);
  };

  return (
    <main
      className={`page-shell mahjong-shell${tutorialShellUn3d ? " mahjong-shell--tutorial" : ""}`}
    >
      <PageHero
        onHowToPlay={startTutorial}
        onFindStep={openFindStepDialog}
        showHowToPlay={!tutorialStarted}
      />

      <TutorialStepFinderDialog
        open={findStepDialogOpen}
        shortcuts={
          [
            walkingRestrictionStepIndex >= 0
              ? { label: "Walking Restriction", stepIndex: walkingRestrictionStepIndex }
              : null,
            rushTokenStepOneIndex >= 0
              ? { label: "How to get Rush Token (1/2)", stepIndex: rushTokenStepOneIndex }
              : null,
            rushTokenStepTwoIndex >= 0
              ? { label: "How to get Rush Token (2/2)", stepIndex: rushTokenStepTwoIndex }
              : null,
            whenToEndStepIndex >= 0
              ? { label: "When to end", stepIndex: whenToEndStepIndex }
              : null
          ].filter((item): item is { label: string; stepIndex: number } => item !== null)
        }
        sections={TUTORIAL_SECTION_STARTS}
        onClose={closeFindStepDialog}
        onSelectStep={(stepIndex) => startTutorialAtStep(stepIndex, true)}
      />

      {tutorialStarted ? (
        <TutorialCard
          stepIndex={currentStep}
          subFocus={tutorialSubFocus}
          onSetSubFocus={setTutorialSubFocus}
          onClose={closeTutorial}
          onPrevious={previousStep}
          onNext={nextStep}
        />
      ) : null}

      <TableLayout
        tutorialActive={tutorialStarted}
        tutorialStepIndex={currentStep}
        tutorialSubFocus={tutorialSubFocus}
        onTutorialSubFocus={setTutorialSubFocus}
      />

      {showTopRightSupplyBin ? (
        <div className="page__how-to-play-top-right-supply-bin" aria-hidden>
          <Image src="/images/supply.png" alt="" width={240} height={120} />
        </div>
      ) : null}
    </main>
  );
}
