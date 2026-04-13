"use client";

type TutorialActionKeywordProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export function TutorialActionKeyword({ children, onClick }: TutorialActionKeywordProps) {
  return (
    <button type="button" className="tutorial-keyword tutorial-keyword--action" onClick={onClick}>
      {children}
    </button>
  );
}
