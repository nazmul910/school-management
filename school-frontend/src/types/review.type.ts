export type TReview = {
  _id: string;
  title: string;
  name: string;
  comment: string;
  status: "pending" | "approved";
  designation: string;
  createdAt: string;
  updatedAt: string;
};
