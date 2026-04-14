import type { SeatSide } from "../seats";

/** Tutorial themes; only `setup` is implemented — others reserved for future flows. */
export type TutorialKind =
  | "setup"
  | "objective"
  | "how-to-play"
  | "end-game"
  | "powerup"
  | "scoring";

/** Sub-step drill-down within the current tutorial step (meaning depends on step). */
export type TutorialSubFocus = string | null;

export type TutorialLayoutZoomInteraction = {
  mode: "layout-zoom";
  /** Which layout focus CSS suffixes exist: `table-layout--focus-${key}` */
  focusKeys: readonly string[];
};

export type TutorialSeatPartsInteraction = {
  mode: "seat-elements";
  seat: SeatSide;
  /** Click targets under that seat; maps to sub-focus strings */
  elements: readonly ("board" | "cups" | "meeple")[];
};

export type TutorialSharedAreaInteraction = {
  mode: "shared-area-elements";
  /** Corner supplies everyone shares; maps to sub-focus strings */
  elements: readonly ("supply" | "rush" | "deck")[];
};

export type TutorialSkillTilesInteraction = {
  mode: "skill-tiles";
  /** Seat to showcase (today: bottom player board). */
  seat: SeatSide;
};

export type TutorialInteractionConfig =
  | TutorialLayoutZoomInteraction
  | TutorialSharedAreaInteraction
  | TutorialSeatPartsInteraction
  | TutorialSkillTilesInteraction;

export type TutorialStepConfig = {
  /** Shown on "Back to …" and similar; keep short. */
  title: string;
  /** Optional phase label for this step (e.g. "Objective of the game"). */
  phaseTitle?: string;
  /** Hide "Step x of y" when this phase should read like a section header. */
  hideStepCounter?: boolean;
  description: string;
  interaction: TutorialInteractionConfig;
  /** Labels for zoom / drill-in banner copy (`focusLabels[subFocus]`) */
  focusLabels: Partial<Record<string, string>>;
  /** Extra root classes on `.table-layout` while this step is active (camera / overview). */
  layoutClasses: (subFocus: TutorialSubFocus) => string[];
};

export type TutorialModuleConfig = {
  kind: TutorialKind;
  /** Module label in the progress line, e.g. "Setup". */
  title: string;
  steps: readonly TutorialStepConfig[];
};
