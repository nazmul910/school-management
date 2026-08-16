export type TCourse = {
  _id: string;
  name: string;
  img: string;
  fee: number;
  method: "One to One" | "Batch";
  duration: string;
  details: string[];
   createdAt: string;
  updatedAt: string;
};
