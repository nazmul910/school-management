"use client";

import Tooltip from "@/utils/Tooltip";
import useAxios from "@/hooks/useAxios";
import { TTeacher } from "@/types/teacher.type";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import Image from "next/image";
import maleIcon from "@/assets/Avatar/male_avatar.png";
import femaleIcon from "@/assets/Avatar/female_avatar.png";

interface ITeacherBox {
  teacher: TTeacher;
  refetch: () => void;
}

const TeacherBox = ({ teacher, refetch }: ITeacherBox) => {
  const axiosSecure = useAxios();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed && typeof window !== "undefined") {
        axiosSecure.delete(`/teachers/${teacher?._id}`).then((res) => {
          if (res.data.statusCode === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Deleted Successfully!",
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <section className="relative border border-primary rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300">
  {/* Teacher Image */}
  <div className="w-full h-56 bg-gray-100">
    <Image
      width={500}
      height={500}
      src={
        teacher?.profileImage
          ? teacher.profileImage
          : teacher?.gender === "female"
          ? femaleIcon
          : maleIcon
      }
      alt={teacher?.name}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Details */}
  <div className="p-5 space-y-4">
    <div className="text-center">
      <h2 className="text-xl font-semibold text-primary">
        {teacher?.name}
      </h2>

      {teacher?.education && (
        <p className="text-gray-500 text-sm mt-1">
          ({teacher.education})
        </p>
      )}
    </div>

    {/* Subjects */}
    <div>
      <h3 className="font-semibold text-primary mb-2">
        বিষয়সমূহ
      </h3>

      {Array.isArray(teacher?.subject) ? (
        <ul className="space-y-1">
          {teacher.subject.map((item, index) => (
            <li
              key={index}
              className="text-sm text-gray-700"
            >
              {new Intl.NumberFormat("bn-BD").format(index + 1)}. {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-700">
          ১. {teacher?.subject}
        </p>
      )}
    </div>

    {/* Contact */}
    <div className="border-t pt-4">
      <h3 className="font-semibold text-primary mb-2">
        যোগাযোগ
      </h3>

      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Email:</span>{" "}
          {teacher?.email || "N/A"}
        </p>

        <p>
          <span className="font-medium">Phone:</span>{" "}
          {teacher?.number || "N/A"}
        </p>
      </div>
    </div>
  </div>

  {/* Delete Button */}
  <div className="absolute bottom-3 right-3">
    <Tooltip
      text="Delete"
      styles={{
        bottom: "0",
        top: "-7",
        right: "0",
        left: "0",
      }}
    >
      <MdOutlineDelete
        onClick={handleDelete}
        className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition"
      />
    </Tooltip>
  </div>
</section>
  );
};

export default TeacherBox;
