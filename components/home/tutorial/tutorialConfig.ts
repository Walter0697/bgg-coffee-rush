import type { TutorialModuleConfig, TutorialStepConfig, TutorialSubFocus } from "./types";

function stepOneLayout(subFocus: TutorialSubFocus): string[] {
  const base = ["table-layout--face-up", "table-layout--tutorial-overview"];
  if (!subFocus) return base;
  return ["table-layout--focused", `table-layout--focus-${subFocus}`];
}

function stepSharedAreaLayout(subFocus: TutorialSubFocus): string[] {
  const base = ["table-layout--face-up", "table-layout--step-shared-area", "table-layout--focused"];
  if (!subFocus) {
    return [...base, "table-layout--tutorial-overview", "table-layout--focus-shared-area"];
  }
  return [...base, `table-layout--focus-shared-${subFocus}`];
}

function stepThreeLayout(subFocus: TutorialSubFocus): string[] {
  /* face-up matches steps 1–2: top-down table, no idle board tilt */
  const base = ["table-layout--face-up", "table-layout--step-three", "table-layout--focused"];
  const tail =
    subFocus === "board"
      ? "table-layout--focus-bottom-board"
      : subFocus === "cups"
        ? "table-layout--focus-bottom-cups"
        : subFocus === "meeple"
          ? "table-layout--focus-bottom-meeple"
          : "table-layout--focus-bottom";
  return [...base, tail];
}

const SETUP_TUTORIAL_STEPS = [
  {
    title: "Table layout",
    description:
      "Setup — place the ingredient board in the center and the four player boards on the top, right, bottom, and left.",
    interaction: {
      mode: "layout-zoom",
      focusKeys: ["center", "top", "right", "bottom", "left"]
    },
    focusLabels: {
      center: "ingredient board",
      top: "top player area",
      right: "right player area",
      bottom: "bottom player area",
      left: "left player area"
    },
    layoutClasses: stepOneLayout
  },
  {
    title: "Common area",
    description:
      "Setup — put the ingredient tray, rush token, and cards in a common area that everyone can access.",
    interaction: {
      mode: "shared-area-elements",
      elements: ["supply", "rush", "deck"]
    },
    focusLabels: {
      supply: "ingredient tray",
      rush: "rush token",
      deck: "draw pile"
    },
    layoutClasses: stepSharedAreaLayout
  },
  {
    title: "Player pieces",
    description: "Setup — for each seat: one player board, three cups, and one meeple.",
    interaction: {
      mode: "seat-elements",
      seat: "bottom",
      elements: ["board", "cups", "meeple"]
    },
    focusLabels: {},
    layoutClasses: stepThreeLayout
  }
] as const satisfies readonly TutorialStepConfig[];

/**
 * Ordered tutorial modules. More kinds (objective, scoring, …) will get their own entries later.
 * `DEFAULT_TUTORIAL_MODULE_INDEX` picks which one "How to play" runs today.
 */
export const TUTORIAL_MODULES: readonly TutorialModuleConfig[] = [
  { kind: "setup", title: "Setup", steps: SETUP_TUTORIAL_STEPS }
] as const;

export const DEFAULT_TUTORIAL_MODULE_INDEX = 0;

export function getActiveTutorialModule(): TutorialModuleConfig {
  return TUTORIAL_MODULES[DEFAULT_TUTORIAL_MODULE_INDEX];
}

/** Steps for the currently active tutorial module (today: setup only). */
export const TUTORIAL_STEPS: readonly TutorialStepConfig[] = getActiveTutorialModule().steps;

export function getTutorialStep(stepIndex: number): TutorialStepConfig | undefined {
  return TUTORIAL_STEPS[stepIndex];
}
