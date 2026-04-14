"use client";

import { useEffect, useState } from "react";

/** Matches `.table-layout { transition: transform 560ms ease }` when idle tilt → tutorial face-up. */
const TUTORIAL_FACEUP_TRANSITION_MS = 560;

import { PageHero } from "../components/home/PageHero";
import { TableLayout } from "../components/home/TableLayout";
import { TutorialCard } from "../components/home/TutorialCard";
import { TUTORIAL_STEPS } from "../components/home/tutorial/tutorialConfig";
import type { TutorialSubFocus } from "../components/home/tutorial/types";

export default function HomePage() {
  const [tutorialStarted, setTutorialStarted] = useState(false);
  /** After the table finishes animating to top-down, strip perspective / Z (see `.mahjong-shell--tutorial`). */
  const [tutorialShellUn3d, setTutorialShellUn3d] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialSubFocus, setTutorialSubFocus] = useState<TutorialSubFocus>(null);

  const isFinalStep = currentStep === TUTORIAL_STEPS.length - 1;

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
    setCurrentStep(0);
    setTutorialSubFocus(null);
  };

  const nextStep = () => {
    if (isFinalStep) {
      setTutorialStarted(false);
      setCurrentStep(0);
      setTutorialSubFocus(null);
      return;
    }
    setCurrentStep((step) => step + 1);
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
    setTutorialStarted(false);
    setCurrentStep(0);
    setTutorialSubFocus(null);
  };

  return (
    <main
      className={`page-shell mahjong-shell${tutorialShellUn3d ? " mahjong-shell--tutorial" : ""}`}
    >
      <PageHero onHowToPlay={startTutorial} showHowToPlay={!tutorialStarted} />

      {tutorialStarted ? (
        <TutorialCard
          stepIndex={currentStep}
          subFocus={tutorialSubFocus}
          isFinalStep={isFinalStep}
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
    </main>
  );
}
