export interface ITeacher {
  name: string;
  teacherId?: string;
  email: string;
  number: string;
  designation: string;
  department?: string;
  education: string;
  experience?: string;
  subject: string[];
  classes?: string[];
  gender: "male" | "female";
  profileImage?: string;
  profileImagePublicId?: string;
  joiningDate?: string;
  bio?: string;
  isDeleted: boolean;
}