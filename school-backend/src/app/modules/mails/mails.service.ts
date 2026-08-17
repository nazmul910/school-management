import ApiError from "../../utils/AppError";
import sendEmail from "../../utils/sendEmail";
import sendEmailContact from "../../utils/sendEmailContact";
import { Student } from "../students/student.model";
import { IMailContact } from "./mails.interface";
import { Mail } from "./mails.model";
import httpStatus from "http-status";

const getAllMails = async () => {
  const result = await Mail.find().sort({ createdAt: -1 });
  return result;
};

const createMail = async (subject: string, message: string) => {
  const students = await Student.find({}, "email").lean();
  const emails = students
    .map((s) => s.email)
    .filter((e): e is string => Boolean(e) && typeof e === "string");

  if (emails.length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "No student email addresses found to send"
    );
  }

  const accepted: string[] = [];
  for (const email of emails) {
    const info = await sendEmail(email, subject, message);
    if (info?.accepted) {
      const acceptedAddresses = Array.isArray(info.accepted)
        ? info.accepted
        : [info.accepted];
      accepted.push(
        ...acceptedAddresses.filter(
          (addr): addr is string => typeof addr === "string"
        )
      );
    }
  }
  if (accepted.length > 0) {
    await Mail.create({ subject, message });
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Some emails were not sent successfully. Try again"
    );
  }
  return {
    accepted,
  };
};

const createMailContact = async (payload: IMailContact) => {
  await sendEmailContact(payload);
  return {
    success: true,
    message: "Mail sent successfully",
  };
};

export const MailServices = {
  getAllMails,
  createMail,
  createMailContact,
};
