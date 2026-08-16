"use client";

import { useState } from "react";
import Image from "next/image";
import female from "@/assets/Avatar/women-teacher.png";
import male from "@/assets/Avatar/male_avatar.png";
import { TTeacher } from "@/types/teacher.type";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";

interface Props {
  teacher: TTeacher;
}

const TeacherCard = ({ teacher }: Props) => {
  const [showAllSubjects, setShowAllSubjects] = useState(false);

  const subjects = Array.isArray(teacher.subject)
    ? teacher.subject
    : [teacher.subject];

  const visibleSubjects = showAllSubjects
    ? subjects
    : subjects.slice(0, 3);

  return (
    <div className="group cursor-pointer relative w-full overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={
            teacher.profileImage
              ? teacher.profileImage
              : teacher.gender === "female"
              ? female
              : male
          }
          alt={teacher.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#1c2638] via-primary/10 to-transparent" />

        <div className="absolute right-4 top-4 rounded-full bg-[#ffd54f] px-4 py-1.5 text-xs font-bold text-primary">
          {teacher.gender === "female" ? "শিক্ষিকা" : "শিক্ষক"}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6">
          <h2 className="text-2xl font-bold text-white">{teacher.name}</h2>

          <div className="mt-2 h-[3px] w-16 rounded-full bg-[#ffd54f]" />
        </div>
      </div>

      <div className="px-7 py-6">
        <p className="text-center text-gray-500 font-medium">
          {teacher.education}
        </p>

        <div className="mt-5 border-t pt-4">
          <h3 className="mb-3 text-primary font-semibold">
            পাঠদানকৃত বিষয়সমূহ
          </h3>

          <ul className="space-y-2">
            {visibleSubjects.map((subject, index) => (
              <li key={index} className="flex gap-2 text-sm text-gray-700">
                <span className="font-semibold text-primary">
                  {new Intl.NumberFormat("bn-BD").format(index + 1)}.
                </span>

                <span>{subject}</span>
              </li>
            ))}
          </ul>

          {subjects.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAllSubjects(!showAllSubjects)}
              className="mt-3 text-sm font-medium text-primary hover:underline"
            >
              {showAllSubjects
                ? "কম দেখান"
                : `+ আরও ${new Intl.NumberFormat("bn-BD").format(
                    subjects.length - 3
                  )}টি বিষয়`}
            </button>
          )}
        </div>

        <div>
            <h3 className="mb-3 mt-5 text-primary font-semibold">যোগাযোগ</h3>  
            <div>
                <p className="text-sm text-gray-700">
                  {teacher.email && (
                    <span className="flex items-center gap-2">
                      <MdOutlineEmail />
                      {teacher.email}
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-700">
                  {teacher.number && (
                    <span className="flex items-center gap-2">
                      <MdOutlinePhone />
                      {teacher.number}
                    </span>
                  )}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;