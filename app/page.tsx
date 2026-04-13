"use client";

import { useState } from "react";

import { PageHero } from "../components/home/PageHero";
import { TableLayout } from "../components/home/TableLayout";
import { TutorialCard } from "../components/home/TutorialCard";
import { TUTORIAL_STEPS } from "../components/home/tutorial/tutorialConfig";
import type { TutorialSubFocus } from "../components/home/tutorial/types";

export default function HomePage() {
  const [tutorialStarted, setTutorialStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialSubFocus, setTutorialSubFocus] = useState<TutorialSubFocus>(null);

  const isFinalStep = currentStep === TUTORIAL_STEPS.length - 1;

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

  const closeTutorial = () => {
    setTutorialStarted(false);
    setCurrentStep(0);
    setTutorialSubFocus(null);
  };

  return (
    <main className="page-shell mahjong-shell">
      <PageHero onHowToPlay={startTutorial} showHowToPlay={!tutorialStarted} />

      {tutorialStarted ? (
        <TutorialCard
          stepIndex={currentStep}
          subFocus={tutorialSubFocus}
          isFinalStep={isFinalStep}
          onSetSubFocus={setTutorialSubFocus}
          onClose={closeTutorial}
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
