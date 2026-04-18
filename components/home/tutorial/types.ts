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

/** Meeples overlaid on the ingredient board (positions via CSS modifiers). */
export type HowToPlayIngredientBoardMeepleItem = {
  slot: "blue" | "green" | "red" | "yellow";
  src: string;
};

/** Ice tokens overlaid on the ingredient board (positions via CSS modifiers). */
export type HowToPlayIngredientBoardIceItem = {
  slot: "left" | "right" | "top-left" | "bottom-left" | "top-right" | "bottom-right";
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
  /** Optional badge overlaid on the center image (e.g. rush token). */
  centerOverlayBadgeImageSrc?: string;
  /** Optional card image shown in the objective-card slot near cups. */
  tableOverlayCardSrc?: string;
  /** Where to place `tableOverlayCardSrc` (default: floating table center). */
  tableOverlayCardPlacement?: "table-center" | "bottom-player-board";
  /** Optional card image shown beside the bottom player's board. */
  boardOverlayCardSrc?: string;
  /** Optional multi-card stack placed on the bottom player board. */
  boardOverlayCardStackMode?: "step1" | "step2" | "step3";
  /** Optional multi-card stack anchored to the bottom player's board. */
  boardOverlayCardStackBottomBoardMode?: "step3";
  /** Optional override for the right seat's overlay-card stack mode. */
  boardOverlayCardStackRightSeatMode?: "step2" | "step3";
  /** Optional two-card stack anchored to the bottom player's board corner. */
  showBottomBoardCornerCards?: "step11";
  /** Optional rush token anchored to the bottom player's board corner. */
  showBottomBoardRushToken?: "step12";
  /** Where to show `centerOverlayImageSrc` (default: full table center). */
  centerOverlayPlacement?: "table-center" | "under-bottom-start-cards";
  /** Full dim + move yes/no overlay (How to play). */
  howToPlayMoveLegend?: HowToPlayMoveLegendConfig;
  /** Coffee / milk / steam on the ingredient board (How to play — ingredient board focus). */
  howToPlayIngredientBoardMarkers?: readonly HowToPlayIngredientBoardMarkerItem[];
  /** Extra meeples on the ingredient board (How to play — ingredient board focus). */
  howToPlayIngredientBoardMeeples?: readonly HowToPlayIngredientBoardMeepleItem[];
  /** Ice tokens on the ingredient board (How to play — power up step 2). */
  howToPlayIngredientBoardIces?: readonly HowToPlayIngredientBoardIceItem[];
  /** Show coffee + milk + steam ingredients in the first bottom cup. */
  showCupIngredientsInCup?: boolean;
  /** When the first cup is rendered, keep the steam inside the cup instead of floating above it. */
  showCupSteamInCup?: boolean;
  showCupIngredients?: boolean;
  /** Show upside-down cup stack with a cross marker (How to play — invalid cup setup). */
  showCupStackCross?: boolean;
  /** Show the start-of-game question-card stack beside the bottom player board. */
  showBottomQuestionCards?: "step1" | "step2" | "step3";
  /** Animate the question-card stack for the player-board-size callout. */
  showBottomQuestionCardFlight?: "board-corner";
  /** Show the bottom cup contents for the player-board-size callout. */
  showBottomCupContents?: "player-board-size" | "how-to-play-cups-invalid" | "how-to-play-cups-preview";
  /** Show a floating supply bin image in the top-right corner for how-to-play previews. */
  showTopRightSupplyBin?: boolean;
  /** Show a skill tile anchored to the ingredient board for how-to-play previews. */
  showBottomRightSkillTileSrc?: string;
  /** Show multiple skill tiles anchored to the ingredient board for how-to-play previews. */
  showBottomRightSkillTileSrcs?: readonly string[];
};

export type TutorialModuleConfig = {
  kind: TutorialKind;
  /** Module label in the progress line, e.g. "Setup". */
  title: string;
  steps: readonly TutorialStepConfig[];
};
