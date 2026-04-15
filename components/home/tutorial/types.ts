import type { SeatSide } from "../seats";

/** Tutorial themes; only `setup` is implemented — others reserved for future flows. */
export type TutorialKind =
  | "setup"
  | "objective"
  | "start-of-game"
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

/** Full-table overview dimmed via CSS; center art uses `centerOverlayImageSrc` on the step. */
export type TutorialCenterImageSpotlightInteraction = {
  mode: "center-image-spotlight";
};

/** Table is display-only: no board / cups / meeple drill-in clicks or sub-focus. */
export type TutorialPassiveInteraction = {
  mode: "passive";
};

/** How to play — move yes/no legend: full-table dim + centered art (optional) and tick/cross above move images. */
export type HowToPlayMoveLegendConfig = {
  /** Extra images above the yes/no row (e.g. ingredients). */
  centerImageSrcs?: readonly string[];
  moveYesSrc?: string;
  moveNoSrc?: string;
  tickSrc?: string;
  crossSrc?: string;
};

/** Ingredient icons overlaid on the ingredient board (positions via CSS modifiers). */
export type HowToPlayIngredientBoardMarkerItem = {
  slot: "coffee" | "milk" | "steam";
  src: string;
};

export type TutorialInteractionConfig =
  | TutorialLayoutZoomInteraction
  | TutorialSharedAreaInteraction
  | TutorialSeatPartsInteraction
  | TutorialSkillTilesInteraction
  | TutorialCenterImageSpotlightInteraction
  | TutorialPassiveInteraction;

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
  /** Optional image centered on the table (e.g. first player token). */
  centerOverlayImageSrc?: string;
  /** Optional card image shown in the objective-card slot near cups. */
  tableOverlayCardSrc?: string;
  /** Where to show `centerOverlayImageSrc` (default: full table center). */
  centerOverlayPlacement?: "table-center" | "under-bottom-start-cards";
  /** Full dim + move yes/no overlay (How to play). */
  howToPlayMoveLegend?: HowToPlayMoveLegendConfig;
  /** Coffee / milk / steam on the ingredient board (How to play — ingredient board focus). */
  howToPlayIngredientBoardMarkers?: readonly HowToPlayIngredientBoardMarkerItem[];
  /** Show coffee + milk + steam ingredients in the first bottom cup. */
  showCupIngredientsInCup?: boolean;
  /** When the first cup is rendered, keep the steam inside the cup instead of floating above it. */
  showCupSteamInCup?: boolean;
  showCupIngredients?: boolean;
  /** Show upside-down cup stack with a cross marker (How to play — invalid cup setup). */
  showCupStackCross?: boolean;
};

export type TutorialModuleConfig = {
  kind: TutorialKind;
  /** Module label in the progress line, e.g. "Setup". */
  title: string;
  steps: readonly TutorialStepConfig[];
};
