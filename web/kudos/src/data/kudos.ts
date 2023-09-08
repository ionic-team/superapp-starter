import { KudoEvent } from "../models/KudoEvent";

export const kudosData: KudoEvent[] = [
  {
    id: 100,
    giver: 1,
    receiver: 2,
    created_at: "2023-08-28",
    amount: 10,
    reason: "security jam session",
  },
  {
    id: 101,
    giver: 2,
    receiver: 3,
    created_at: "2023-08-30",
    amount: 25,
    reason: "data management sync",
  },
  {
    id: 102,
    giver: 5,
    receiver: 4,
    created_at: "2023-09-01",
    amount: 5,
    reason: "pricebook explanation",
  },
  {
    id: 103,
    giver: 8,
    receiver: 7,
    created_at: "2023-09-05",
    amount: 10,
    reason: "quick landing page fix",
  },
  {
    id: 104,
    giver: 14,
    receiver: 11,
    created_at: "2023-09-05",
    amount: 20,
    reason: "data sheet feedback",
  },
];
