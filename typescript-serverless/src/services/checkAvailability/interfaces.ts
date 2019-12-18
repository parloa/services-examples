export interface ServiceInput {
  // as defined in the tab Service Input
  room: string;
  amountOfPeople: number;
  bookingTime: string;
}

export interface ServiceOutput {
  // as defined in the tab Service Output
  timeBufferAfterwards: number;
  bookingSlot: string;
}

export type Branches = "available" | "not available";
// as defined in the tab Branches
