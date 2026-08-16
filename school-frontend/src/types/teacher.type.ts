export type TTeacher = {
  _id: string;
  name: string;
  email: string;
  number: string;
  education: string;
  gender: "male" | "female";

  subject: string[]; 

  profileImage?: string; 

  createdAt?: string;
  updatedAt?: string;
};