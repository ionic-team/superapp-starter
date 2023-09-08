export type KudoEvent = {
  id: number;
  giver: number;
  receiver: number;
  created_at: string;
  amount: number;
  reason: string;
};

export type UnsavedKudoEvent = Omit<KudoEvent, "id" | "created_at">;
