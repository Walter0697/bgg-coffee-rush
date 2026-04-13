import type { TutorialModuleConfig, TutorialStepConfig, TutorialSubFocus } from "./types";

function stepOneLayout(subFocus: TutorialSubFocus): string[] {
  const base = ["table-layout--face-up", "table-layout--tutorial-overview"];
  if (!subFocus) return base;
  return ["table-layout--focused", `table-layout--focus-${subFocus}`];
}

function stepTwoLayout(subFocus: TutorialSubFocus): string[] {
  const base = ["table-layout--step-two", "table-layout--focused"];
  const tail =
    subFocus === "board"
      ? "table-layout--focus-bottom-board"
      : subFocus === "cups"
        ? "table-layout--focus-bottom-cups"
        : subFocus === "mable"
          ? "table-layout--focus-bottom-mable"
          : "table-layout--focus-bottom";
  return [...base, tail];
}

const SETUP_TUTORIAL_STEPS = [
  {
    title: "Table layout",
    description:
      "Setup — place the main board in the center and the four player boards on the top, right, bottom, and left.",
    interaction: {
      mode: "layout-zoom",
      focusKeys: ["center", "top", "right", "bottom", "left"]
    },
    focusLabels: {
      center: "main board",
      top: "top player area",
      right: "right player area",
      bottom: "bottom player area",
      left: "left player area"
    },
    layoutClasses: stepOneLayout
  },
  {
    title: "Player pieces",
    description: "Setup — for each seat: one player board, three cups, and one mable.",
    interaction: {
      mode: "seat-elements",
      seat: "bottom",
      elements: ["board", "cups", "mable"]
    },
    focusLabels: {},
    layoutClasses: stepTwoLayout
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
