export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  contact: {
    email: string;
    phone: string;
    cell: string;
  };
  office: string;
  birthDate: string;
  title: string;
  department: string;
  images: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

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

export interface Photo {
  name: string;
  // tempPath?: string;
  filePath: string;
  webviewPath: string;
}

export type KudoEvent = {
  id: number;
  giver: number;
  receiver: number;
  created_at: string;
  amount: number;
  reason: string;
};

export type UnsavedKudoEvent = Omit<KudoEvent, "id" | "created_at">;

export type Context = {
  auth0: {
    accessToken: string;
    idToken: string;
    refreshToken: string;
  };
  resourceId: string;
};
