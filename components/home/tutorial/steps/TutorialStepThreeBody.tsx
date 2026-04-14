"use client";

import { TutorialActionKeyword } from "../TutorialActionKeyword";

type TutorialStepThreeBodyProps = {
  onSetSubFocus: (key: string) => void;
};

export function TutorialStepThreeBody({ onSetSubFocus }: TutorialStepThreeBodyProps) {
  return (
    <>
      For each user, get a{" "}
      <TutorialActionKeyword onClick={() => onSetSubFocus("board")}>player board</TutorialActionKeyword>,{" "}
      <TutorialActionKeyword onClick={() => onSetSubFocus("cups")}>3 cups</TutorialActionKeyword>, and{" "}
      <TutorialActionKeyword onClick={() => onSetSubFocus("meeple")}>one meeple</TutorialActionKeyword> (the player token
      under cups). You can click words or image.
    </>
  );
}
