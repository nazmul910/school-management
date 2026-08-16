"use client";
import { TMail } from "@/types/mail.type";
import { useState } from "react";

interface IMailBox {
  mail: TMail;
}

const MailBox = ({ mail }: IMailBox) => {
  const [expanded, setExpanded] = useState(false);

  // Helper function to get word count and truncate text
  const getWords = (text: string) => text?.trim().split(/\s+/) || [];
  const words = getWords(mail?.message || "");
  const shouldShowReadMore = words.length > 100;

  // Get first 100 words for preview
  const previewText = shouldShowReadMore
    ? words.slice(0, 100).join(" ") + "..."
    : mail?.message;

  return (
    <section className="relative px-5 py-3 w-full rounded-lg hover:shadow-xl transition border border-primary h-fit">
      <div className="mt-2">
        <p className="text-xs text-gray-500 mb-2">
          {mail?.createdAt &&
            new Date(mail.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
        </p>
        <p className="text-lg sm:text-2xl text-primary mb-2">{mail.subject}</p>

        <p className="text-gray-700 text-sm leading-relaxed">
          {expanded ? mail?.message : previewText}
        </p>
        {shouldShowReadMore && (
          <button
            className="mt-2 text-sm text-green-600 hover:underline"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "See more..."}
          </button>
        )}
      </div>
    </section>
  );
};

export default MailBox;
