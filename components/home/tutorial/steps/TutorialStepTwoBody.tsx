"use client";

import { TutorialActionKeyword } from "../TutorialActionKeyword";

type TutorialStepTwoBodyProps = {
  onSetSubFocus: (key: string) => void;
};

export function TutorialStepTwoBody({ onSetSubFocus }: TutorialStepTwoBodyProps) {
  return (
    <>
      For each user, get a{" "}
      <TutorialActionKeyword onClick={() => onSetSubFocus("board")}>player board</TutorialActionKeyword>,{" "}
      <TutorialActionKeyword onClick={() => onSetSubFocus("cups")}>3 cups</TutorialActionKeyword>, and{" "}
      <TutorialActionKeyword onClick={() => onSetSubFocus("mable")}>one mable</TutorialActionKeyword> (the player token
      under cups). You can click words or image.
    </>
  );
}
