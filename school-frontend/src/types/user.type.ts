export type TUser = {
  _id: string;
  name: string;
  email: string;
  status: "approved" | "blocked";
  role: "admin" | "student";
  isDeleted: boolean;
  image?: string;
};
