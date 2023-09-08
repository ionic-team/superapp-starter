import { Photo } from './photo';

export interface Expense {
  id: number;
  merchant: string;
  cost: number;
  note?: string;
  category: string;
  date: string;
  receipt?: Photo;

  // constructor(c) {
  //   this.receipt = new Photo();
  // }
}
