"use client";

import type { TutorialSectionStart } from "./tutorial/tutorialConfig";

function IconClose() {
  return (
    <svg className="tutorial-step-finder-dialog__close-icon" viewBox="0 0 24 24" width={20} height={20} aria-hidden>
      <path
        fill="currentColor"
        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
      />
    </svg>
  );
}

type TutorialStepFinderDialogProps = {
  open: boolean;
  shortcuts?: readonly {
    label: string;
    stepIndex: number;
  }[];
  sections: readonly TutorialSectionStart[];
  onClose: () => void;
  onSelectStep: (stepIndex: number) => void;
};

export function TutorialStepFinderDialog({
  open,
  shortcuts = [],
  sections,
  onClose,
  onSelectStep
}: TutorialStepFinderDialogProps) {
  if (!open) return null;

  return (
    <div className="tutorial-step-finder-dialog__backdrop" role="presentation" onClick={onClose}>
      <section
        className="tutorial-step-finder-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-step-finder-dialog-title"
        aria-describedby="tutorial-step-finder-dialog-description"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="tutorial-step-finder-dialog__header">
          <div>
            <p className="tutorial-step-finder-dialog__eyebrow">Find a step</p>
            <h2 id="tutorial-step-finder-dialog-title" className="tutorial-step-finder-dialog__title">
              Jump to a section
            </h2>
          </div>

          <button
            type="button"
            className="tutorial-step-finder-dialog__close"
            onClick={onClose}
            aria-label="Close step finder"
          >
            <IconClose />
          </button>
        </div>

        <p id="tutorial-step-finder-dialog-description" className="tutorial-step-finder-dialog__description">
          Pick a shortcut or jump to the first step of a section.
        </p>

        <div className="tutorial-step-finder-dialog__list" role="list">
          {sections.map((section) => (
            <button
              key={section.kind}
              type="button"
              className="tutorial-step-finder-dialog__button"
              onClick={() => onSelectStep(section.stepIndex)}
            >
              <span className="tutorial-step-finder-dialog__button-title">{section.title}</span>
            </button>
          ))}
        </div>

        <div className="tutorial-step-finder-dialog__notes" aria-label="Tutorial reminders">
          {shortcuts.map((shortcut) => (
            <button
              key={shortcut.label}
              type="button"
              className="tutorial-step-finder-dialog__button tutorial-step-finder-dialog__button--shortcut tutorial-step-finder-dialog__notes-button"
              onClick={() => onSelectStep(shortcut.stepIndex)}
            >
              <span className="tutorial-step-finder-dialog__button-title">{shortcut.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
