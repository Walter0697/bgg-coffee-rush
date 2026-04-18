"use client";

import Image from "next/image";

type PageHeroProps = {
  onHowToPlay: () => void;
  onFindStep: () => void;
  /** Hide the CTA while the tutorial is open so it doesn’t stack on the same flow. */
  showHowToPlay?: boolean;
};

export function PageHero({ onHowToPlay, onFindStep, showHowToPlay = true }: PageHeroProps) {
  return (
    <>
      <div className="table-title" aria-label="Coffee Rush title">
        <div className="table-title__text">H H C</div>
        <Image src="/images/title.png" alt="Coffee Rush title" width={1024} height={340} priority />
      </div>

      {showHowToPlay ? (
        <div className="how-to-play-actions" aria-label="Tutorial actions">
          <button
            type="button"
            className="how-to-play-button"
            aria-label="How To Play?"
            onClick={onHowToPlay}
          >
            How To Play?
          </button>
          <button
            type="button"
            className="how-to-play-button how-to-play-button--secondary"
            aria-label="Find a specific step"
            onClick={onFindStep}
          >
            Find a Step
          </button>
        </div>
      ) : null}
    </>
  );
}
