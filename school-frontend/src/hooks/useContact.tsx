
import { useMutation } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useSendMailContact = () => {
  const axiosSecure = useAxios();

  const {
    mutate: sendMail,
    isPending: mailSending,
  } = useMutation({
    mutationFn: async (mailData: {
      from_name: string;
      from_email: string;
      message: string;
    }) => {
      const res = await axiosSecure.post("/mails/contact", mailData);

      return res.data;
    },
  });

  return {
    sendMail,
    mailSending,
  };
};

export default useSendMailContact;

