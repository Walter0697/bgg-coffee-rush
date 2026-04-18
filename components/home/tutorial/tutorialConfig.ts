import type { TutorialModuleConfig, TutorialStepConfig, TutorialSubFocus } from "./types";

function stepOneLayout(subFocus: TutorialSubFocus): string[] {
  const base = ["table-layout--face-up", "table-layout--tutorial-overview"];
  if (!subFocus) return base;
  if (subFocus === "shared-area") {
    return ["table-layout--focused", "table-layout--focus-shared-area"];
  }
  if (subFocus === "supply" || subFocus === "rush" || subFocus === "deck") {
    return ["table-layout--focused", `table-layout--focus-shared-${subFocus}`];
  }
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

function stepFourLayout(): string[] {
  return ["table-layout--face-up", "table-layout--step-four", "table-layout--focused", "table-layout--focus-bottom-board"];
}

function objectiveIntroLayout(subFocus: TutorialSubFocus): string[] {
  return [
    "table-layout--face-up",
    "table-layout--step-three",
    "table-layout--objective-cups",
    "table-layout--focused",
    "table-layout--focus-bottom"
  ];
}

function startGameStepOneLayout(subFocus: TutorialSubFocus): string[] {
  const base = ["table-layout--face-up", "table-layout--step-three", "table-layout--focused"];
  const tail =
    subFocus === "cups"
      ? "table-layout--focus-bottom-cups"
      : subFocus === "meeple"
        ? "table-layout--focus-bottom-meeple"
        : "table-layout--focus-bottom-board";
  return [...base, tail];
}

function startGameMeeplesOverviewLayout(subFocus: TutorialSubFocus): string[] {
  return ["table-layout--face-up", "table-layout--tutorial-overview", "table-layout--start-meeples"];
}

/** Ingredient board + bottom cups + meeples all undimmed; other seats / corners faded. */
function startGameStepFiveLayout(_subFocus: TutorialSubFocus): string[] {
  return [
    "table-layout--face-up",
    "table-layout--start-step-five",
    "table-layout--focused",
    "table-layout--focus-bottom"
  ];
}

function startGameCenterSpotlightLayout(_subFocus: TutorialSubFocus): string[] {
  return ["table-layout--face-up", "table-layout--tutorial-overview", "table-layout--center-spotlight"];
}

/** How to play — rush token center spotlight + steam dim + rush art fade-in (see tutorial-step-how-to-play.css). */
function howToPlayRushTokenSpotlightLayout(_subFocus: TutorialSubFocus): string[] {
  return [
    "table-layout--face-up",
    "table-layout--tutorial-overview",
    "table-layout--center-spotlight",
    "table-layout--how-to-play-rush-token"
  ];
}

/** How to play — special center spotlight with the same fade-in treatment as rush token. */
function howToPlaySpecialSpotlightLayout(_subFocus: TutorialSubFocus): string[] {
  return [
    "table-layout--face-up",
    "table-layout--tutorial-overview",
    "table-layout--center-spotlight",
    "table-layout--how-to-play-special"
  ];
}

/** How to play — turn flow: blue meeple demos grid moves on the ingredient board (CSS animation). */
function howToPlayTurnFlowLayout(_subFocus: TutorialSubFocus): string[] {
  return ["table-layout--face-up", "table-layout--tutorial-overview", "table-layout--how-to-play-turn-flow"];
}

/** How to play — valid vs invalid moves: table fully dimmed; tick/move_yes and cross/move_no in the center. */
function howToPlayMoveLegendLayout(_subFocus: TutorialSubFocus): string[] {
  return ["table-layout--face-up", "table-layout--tutorial-overview", "table-layout--how-to-play-move-legend"];
}

/** How to play — spotlight ingredient board + meeple only. */
function howToPlayIngredientBoardSpotlightLayout(_subFocus: TutorialSubFocus): string[] {
  return ["table-layout--face-up", "table-layout--tutorial-overview", "table-layout--how-to-play-ingredient-board"];
}

/** How to play step 4 — ingredient board spotlight with stronger ingredient glow. */
function howToPlayIngredientBoardGlowLayout(_subFocus: TutorialSubFocus): string[] {
  return [
    "table-layout--face-up",
    "table-layout--tutorial-overview",
    "table-layout--how-to-play-ingredient-board",
    "table-layout--how-to-play-ingredient-board-glow"
  ];
}

/** How to play — full-board overview with the ingredient bin spotlighted. */
function howToPlayIngredientBinLayout(_subFocus: TutorialSubFocus): string[] {
  return ["table-layout--face-up", "table-layout--tutorial-overview", "table-layout--how-to-play-ingredient-bin"];
}

/** How to play — cups only spotlight, with everything else dimmed. */
function howToPlayCupsLayout(_subFocus: TutorialSubFocus): string[] {
  return [
    "table-layout--face-up",
    "table-layout--step-three",
    "table-layout--objective-cups",
    "table-layout--focused",
    "table-layout--focus-bottom",
    "table-layout--how-to-play-cups"
  ];
}

/** How to play — invalid cups example: upside-down cups stack + cross indicator. */
function howToPlayInvalidCupsLayout(_subFocus: TutorialSubFocus): string[] {
  return [
    "table-layout--face-up",
    "table-layout--step-three",
    "table-layout--objective-cups",
    "table-layout--focused",
    "table-layout--focus-bottom",
    "table-layout--how-to-play-cups",
    "table-layout--how-to-play-cups-invalid"
  ];
}

/** How to play — keep cups centered like step 6 but freeze any cup rotation/motion. */
function howToPlayCupsNoRotateLayout(_subFocus: TutorialSubFocus): string[] {
  return [
    "table-layout--face-up",
    "table-layout--step-three",
    "table-layout--objective-cups",
    "table-layout--focused",
    "table-layout--focus-bottom",
    "table-layout--how-to-play-cups",
    "table-layout--how-to-play-cups-no-rotate"
  ];
}

/** How to play — same no-rotate cup scene, but with the loose ingredients flying toward the bin. */
function howToPlayCupsNoRotateBinFlightLayout(_subFocus: TutorialSubFocus): string[] {
  return [...howToPlayCupsNoRotateLayout(_subFocus), "table-layout--how-to-play-cups-no-rotate-bin-flight"];
}

/** How to play — objective-like layout with one centered cup and a question card. */
function howToPlaySingleCupQuestionLayout(_subFocus: TutorialSubFocus): string[] {
  return [
    "table-layout--face-up",
    "table-layout--step-three",
    "table-layout--objective-cups",
    "table-layout--focused",
    "table-layout--focus-bottom",
    "table-layout--how-to-play-single-cup-question"
  ];
}

/** How to play — board-size callout: zoom the player board while the rest of the table fades away. */
function howToPlayPlayerBoardSizeLayout(_subFocus: TutorialSubFocus): string[] {
  return [
    "table-layout--face-up",
    "table-layout--step-three",
    "table-layout--focused",
    "table-layout--focus-bottom",
    "table-layout--how-to-play-player-board-size"
  ];
}

/** How to play — whole table visible, but the ingredient board is dimmed for the next explanation. */
function howToPlayWholeBoardFocusLayout(_subFocus: TutorialSubFocus): string[] {
  return [
    "table-layout--face-up",
    "table-layout--tutorial-overview",
    "table-layout--how-to-play-whole-board-focus"
  ];
}

/** How to play — zoom back in on the bottom player board while keeping the same corner-card stack. */
function howToPlayPlayerBoardFocusLayout(_subFocus: TutorialSubFocus): string[] {
  return [
    "table-layout--face-up",
    "table-layout--step-three",
    "table-layout--focused",
    "table-layout--focus-bottom-board",
    "table-layout--how-to-play-player-board-focus",
    "table-layout--how-to-play-player-board-focus-step12"
  ];
}

/** How to play — keep the same board camera, but freeze the card stack in its settled end position. */
function howToPlayPlayerBoardSettledLayout(_subFocus: TutorialSubFocus): string[] {
  return [
    "table-layout--face-up",
    "table-layout--step-three",
    "table-layout--focused",
    "table-layout--focus-bottom-board",
    "table-layout--how-to-play-player-board-focus",
    "table-layout--how-to-play-player-board-focus-step13"
  ];
}

/** Power up — keep the settled player-board camera, then dim the whole bottom board too. */
function powerUpStepOneLayout(subFocus: TutorialSubFocus): string[] {
  return [...howToPlayPlayerBoardSettledLayout(subFocus), "table-layout--how-to-play-powerup-step1"];
}

/** Power up — switch the camera back to the ingredient board. */
function powerUpStepTwoLayout(_subFocus: TutorialSubFocus): string[] {
  return [
    "table-layout--face-up",
    "table-layout--tutorial-overview",
    "table-layout--how-to-play-ingredient-board",
    "table-layout--how-to-play-powerup-step2"
  ];
}

/** Power up — keep the ingredient-board meeple moving toward the bottom player's board corner. */
function powerUpStepThreeLayout(_subFocus: TutorialSubFocus): string[] {
  return [...powerUpStepTwoLayout(null), "table-layout--how-to-play-powerup-step3"];
}

/** Power up — move the ingredient-board meeple into the top-right corner cell. */
function powerUpStepFourLayout(_subFocus: TutorialSubFocus): string[] {
  return [...powerUpStepTwoLayout(null), "table-layout--how-to-play-powerup-step4"];
}

/** Power up — keep the ingredient board visible and emphasize the skill tile. */
function powerUpStepFiveLayout(_subFocus: TutorialSubFocus): string[] {
  return [...powerUpStepTwoLayout(null), "table-layout--how-to-play-powerup-step5"];
}

/** Power up — keep the ingredient board visible and show a pair of skill tiles. */
function powerUpStepSixLayout(_subFocus: TutorialSubFocus): string[] {
  return [...powerUpStepTwoLayout(null), "table-layout--how-to-play-powerup-step6"];
}

/** Power up — return to the player board so the final score can be read off the completed orders. */
function powerUpFinalScoringLayout(subFocus: TutorialSubFocus): string[] {
  return [...howToPlayPlayerBoardSettledLayout(subFocus), "table-layout--powerup-final-scoring"];
}

const SETUP_TUTORIAL_STEPS = [
  {
    title: "Table layout",
    description:
      "Setup — place the ingredient board in the center and the four player boards on the top, right, bottom, and left. Put other resources on the side where everyone can reach.",
    interaction: {
      mode: "layout-zoom",
      focusKeys: ["center", "top", "right", "bottom", "left", "shared-area"]
    },
    focusLabels: {
      center: "ingredient board",
      top: "top player area",
      right: "right player area",
      bottom: "bottom player area",
      left: "left player area",
      "shared-area": "common area",
      supply: "ingredient tray",
      rush: "rush token",
      deck: "draw pile"
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
  },
  {
    title: "Skill tiles",
    description:
      "Place all 4 skills tile backward (the side without +2) on top, into the correct place of the player board.",
    interaction: {
      mode: "skill-tiles",
      seat: "bottom"
    },
    focusLabels: {},
    layoutClasses: stepFourLayout
  }
] as const satisfies readonly TutorialStepConfig[];

const OBJECTIVE_TUTORIAL_STEPS = [
  {
    title: "Objective of the game",
    phaseTitle: "Objective of the game",
    hideStepCounter: true,
    description:
      "the goal of the game is to fulfill as much orders as possible until the end of the game. Whoever did more orders, win!",
    interaction: {
      mode: "seat-elements",
      seat: "bottom",
      elements: ["board", "cups", "meeple"]
    },
    focusLabels: {},
    layoutClasses: objectiveIntroLayout
  }
] as const satisfies readonly TutorialStepConfig[];

const START_OF_GAME_TUTORIAL_STEPS = [
  {
    title: "First player",
    description:
      "Start of the game — pick a first player and give them the first player token. For example: who is the last one to drink coffee today?",
    interaction: {
      mode: "center-image-spotlight"
    },
    focusLabels: {},
    layoutClasses: startGameCenterSpotlightLayout,
    centerOverlayImageSrc: "/images/first.png"
  },
  {
    title: "Player board first",
    description:
      "Start of the game — begin from your player board. Check your board space before handling pieces.",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: startGameStepOneLayout
  },
  {
    title: "Prepare cups",
    description: "Start of the game — place your three cups in your play area and keep them visible.",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: startGameStepOneLayout,
    centerOverlayImageSrc: "/images/first.png",
    centerOverlayPlacement: "under-bottom-start-cards"
  },
  {
    title: "Meeple ready",
    description: "Start of the game — place your meeple in your player area and get ready to begin.",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: startGameMeeplesOverviewLayout
  },
  {
    title: "Ready to brew",
    description:
      "Start of the game — for each player, pick up the ingredient where the meeple is standing at.",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: startGameStepFiveLayout
  }
] as const satisfies readonly TutorialStepConfig[];

/** First step of the main rules walkthrough (after setup + start-of-game). */
const HOW_TO_PLAY_TUTORIAL_STEPS = [
  {
    title: "Turn flow",
    description:
      "In your turn, your meeple can move 3 steps on the ingredient board.\n⬆️ ⬇️ ⬅️ ➡️ Up down left right only.",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    /** Full table top-down + blue meeple path demo. */
    layoutClasses: howToPlayTurnFlowLayout
  },
  {
    title: "Rush token",
    description:
      "you can use the rush token to walk one more time; you can use it as much as you want. I will let you know how to get rush tokens in a later step.",
    interaction: {
      mode: "center-image-spotlight"
    },
    focusLabels: {},
    layoutClasses: howToPlayRushTokenSpotlightLayout,
    centerOverlayImageSrc: "/images/rush.png"
  },
  {
    title: "Valid moves",
    description:
      "✅ You can walk into other meeple, you can also walk to the previous tile.\n❌ But the final stop cannot have other meeple.",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: howToPlayMoveLegendLayout,
    howToPlayMoveLegend: {
      moveYesSrc: "/images/move_yes.png",
      moveNoSrc: "/images/move_no.png",
      tickSrc: "/images/tick.png",
      crossSrc: "/images/cross.png"
    }
  },
  {
    title: "Ingredient board focus",
    description:
      "For every tile that your meeple stepped on, you get the ingredient on that tile!",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: howToPlayIngredientBoardGlowLayout,
    howToPlayIngredientBoardMarkers: [
      { slot: "steam", src: "/images/ingredient/steam.png" },
      { slot: "coffee", src: "/images/ingredient/coffee.png" },
      { slot: "milk", src: "/images/ingredient/milk.png" }
    ]
  },
  {
    title: "Cups",
    description:
      "you can then put the ingredient to whichever cups you like",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: howToPlayCupsLayout,
    showCupIngredients: true
  },
  {
    title: "Wrong cup setup",
    description:
      "After you put those ingredients into one cup, you cannot put them into another cup. After all, you already mixed those ingredients into your drink. If you mess up one cup, you can only try another recipe or drop the whole thing.",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: howToPlayInvalidCupsLayout,
    showCupStackCross: true,
    showBottomCupContents: "how-to-play-cups-invalid"
  },
  {
    title: "Wrong cup setup (preview)",
    description:
      "you cannot leave any ingredients on the table but not inside the cup. if it doesn’t fit your needs, you just have to throw it away (put it back into supply bin)",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: howToPlayCupsNoRotateBinFlightLayout,
    showBottomCupContents: "how-to-play-cups-preview",
    showTopRightSupplyBin: true
  },
  {
    title: "New order card",
    description:
      "you finished the order if your cup contains the exact same ingredients that show in one of your card! you can finish up to 3 orders each round since you have 3 cups",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: howToPlaySingleCupQuestionLayout,
    tableOverlayCardSrc: "/images/question.png",
    showCupIngredientsInCup: true,
    showCupSteamInCup: true
  },
  {
    title: "Special",
    description: "if your completed order is a special menu, you will get a rush token!",
    interaction: {
      mode: "center-image-spotlight"
    },
    focusLabels: {},
    layoutClasses: howToPlaySpecialSpotlightLayout,
    centerOverlayImageSrc: "/images/special.png",
    centerOverlayBadgeImageSrc: "/images/rush.png"
  },
  {
    title: "Player board size",
    description:
      "Put your completed order card on the top left of your player card. This is your score now! Then put the ingredients of the finished order cup into the supply bins.",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: howToPlayPlayerBoardSizeLayout,
    showBottomCupContents: "player-board-size",
    showTopRightSupplyBin: true
  },
  {
    title: "Whole board",
    description:
      "Now look at the whole table. The ingredient board is dimmed so you can focus on the rest of the board. For every order you complete, add one card to the first row of the next 2 players.",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: howToPlayWholeBoardFocusLayout,
    showBottomBoardCornerCards: "step11",
    boardOverlayCardStackMode: "step3"
  },
  {
    title: "Flow of time~",
    description:
      "Flow of time~ After finishing (or not finishing) your orders, move all your cards one row down. For the last row, move it to the left and flip it to the back. For every card we lose, you will get one rush token.",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: howToPlayPlayerBoardFocusLayout,
    showBottomBoardCornerCards: "step11",
    showBottomBoardRushToken: "step12",
    boardOverlayCardStackBottomBoardMode: "step3"
  },
  {
    title: "Cards settled",
    description:
      "If one player has 5 or more penalty cards, we will play one more round and then the game will end.",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: howToPlayPlayerBoardSettledLayout,
    showBottomBoardCornerCards: "step11",
    boardOverlayCardStackBottomBoardMode: "step3"
  }
] as const satisfies readonly TutorialStepConfig[];

const POWERUP_TUTORIAL_STEPS = [
  {
    title: "Power up",
    description:
      "You can use 3 completed order cards to learn a skill at any time. Please note that a skill is worth 2 points, so you are essentially losing 1 point but gaining an extra ability.",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: powerUpStepOneLayout,
    showBottomBoardCornerCards: "step11",
    boardOverlayCardStackBottomBoardMode: "step3"
  },
  {
    title: "Ingredient board",
    description:
      "For this upgrade, you can get 2 ingredients if you walk into a celll with a another meeple in it.",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: powerUpStepTwoLayout,
    howToPlayIngredientBoardMeeples: [
      { slot: "green", src: "/images/meeple_green.png" }
    ],
    howToPlayIngredientBoardIces: [
      { slot: "left", src: "/images/ingredient/ice.png" },
      { slot: "right", src: "/images/ingredient/ice.png" }
    ],
    showBottomRightSkillTileSrc: "/images/e1.png"
  },
  {
    title: "Ingredient board",
    description: "with this upgrade, your meeple can walk diagonally",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: powerUpStepThreeLayout,
    howToPlayIngredientBoardMeeples: [
      { slot: "blue", src: "/images/meeple_blue.png" }
    ],
    showBottomRightSkillTileSrc: "/images/e2.png"
  },
  {
    title: "Ingredient board",
    description:
      "with this upgrade, you can get 2 coffee ingredients when walking into the corner cell",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: powerUpStepFourLayout,
    howToPlayIngredientBoardMeeples: [
      { slot: "blue", src: "/images/meeple_blue.png" }
    ],
    howToPlayIngredientBoardIces: [
      { slot: "left", src: "/images/ingredient/coffee.png" },
      { slot: "right", src: "/images/ingredient/coffee.png" }
    ],
    showBottomRightSkillTileSrc: "/images/e3.png"
  },
  {
    title: "Ingredient board",
    description:
      "with this upgrade, you can get 2 chocolate ingredients when walking into the cell with golden ribbon",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: powerUpStepFiveLayout,
    howToPlayIngredientBoardMeeples: [
      { slot: "blue", src: "/images/meeple_blue.png" }
    ],
    howToPlayIngredientBoardIces: [
      { slot: "left", src: "/images/ingredient/choco.png" },
      { slot: "right", src: "/images/ingredient/choco.png" }
    ],
    showBottomRightSkillTileSrc: "/images/e4.png"
  },
  {
    title: "Ingredient board",
    description:
      "Upgrades can be used together. That means if you have one upgrade that gives you double ingredients when touching another meeple and another upgrade that gives you double ingredients when moving into the corner cell, you will get 4 ingredients.",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: powerUpStepSixLayout,
    howToPlayIngredientBoardMeeples: [
      { slot: "blue", src: "/images/meeple_blue.png" },
      { slot: "green", src: "/images/meeple_green.png" }
    ],
    howToPlayIngredientBoardIces: [
      { slot: "top-left", src: "/images/ingredient/coffee.png" },
      { slot: "bottom-left", src: "/images/ingredient/coffee.png" },
      { slot: "top-right", src: "/images/ingredient/coffee.png" },
      { slot: "bottom-right", src: "/images/ingredient/coffee.png" }
    ],
    showBottomRightSkillTileSrcs: ["/images/e1.png", "/images/e3.png"]
  }
] as const satisfies readonly TutorialStepConfig[];

const FINAL_SCORING_TUTORIAL_STEPS = [
  {
    title: "Final scoring",
    description:
      "Final scoring — the final score will be the number of your completed orders + the number of activated upgrades × 2 - the number of your penalty orders.",
    interaction: {
      mode: "passive"
    },
    focusLabels: {},
    layoutClasses: powerUpFinalScoringLayout
  }
] as const satisfies readonly TutorialStepConfig[];

/**
 * Ordered tutorial modules. `DEFAULT_TUTORIAL_MODULE_INDEX` can limit which slice runs in dev.
 */
export const TUTORIAL_MODULES: readonly TutorialModuleConfig[] = [
  { kind: "setup", title: "Setup", steps: SETUP_TUTORIAL_STEPS },
  { kind: "objective", title: "Objective of the game", steps: OBJECTIVE_TUTORIAL_STEPS },
  { kind: "start-of-game", title: "Start of the game", steps: START_OF_GAME_TUTORIAL_STEPS },
  { kind: "how-to-play", title: "How to play", steps: HOW_TO_PLAY_TUTORIAL_STEPS },
  { kind: "powerup", title: "Power up", steps: POWERUP_TUTORIAL_STEPS },
  { kind: "scoring", title: "Final scoring", steps: FINAL_SCORING_TUTORIAL_STEPS }
] as const;

export const DEFAULT_TUTORIAL_MODULE_INDEX = 0;

export function getActiveTutorialModule(): TutorialModuleConfig {
  return TUTORIAL_MODULES[DEFAULT_TUTORIAL_MODULE_INDEX];
}

/** Steps for the currently active tutorial module (today: setup only). */
export const TUTORIAL_STEPS: readonly TutorialStepConfig[] = TUTORIAL_MODULES.flatMap((module) =>
  module.steps.map((step) => ({
    ...step,
    phaseTitle: step.phaseTitle ?? module.title
  }))
);

/** Index of "Ready to brew" in the flattened tutorial; steps after this keep its meeple/steam end pose. */
export const READY_TO_BREW_TUTORIAL_STEP_INDEX = TUTORIAL_STEPS.findIndex(
  (step) => step.phaseTitle === "Start of the game" && step.title === "Ready to brew"
);

export const SETUP_STEP_COUNT = SETUP_TUTORIAL_STEPS.length;
export const SKILL_TILES_STEP_INDEX = TUTORIAL_STEPS.findIndex(
  (step) => step.interaction.mode === "skill-tiles"
);

export function getTutorialStep(stepIndex: number): TutorialStepConfig | undefined {
  return TUTORIAL_STEPS[stepIndex];
}
