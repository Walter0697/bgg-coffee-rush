export const seats = [
  { side: "top", color: "red", src: "/images/red.png", label: "Red player board" },
  { side: "right", color: "green", src: "/images/green.png", label: "Green player board" },
  { side: "bottom", color: "blue", src: "/images/blue.png", label: "Blue player board" },
  { side: "left", color: "yellow", src: "/images/yellow.png", label: "Yellow player board" }
] as const;

export type Seat = (typeof seats)[number];

export type SeatSide = Seat["side"];
