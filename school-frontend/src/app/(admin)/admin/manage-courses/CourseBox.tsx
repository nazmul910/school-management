"use client";

import Tooltip from "@/utils/Tooltip";
import useAxios from "@/hooks/useAxios";
import { TCourse } from "@/types/course.type";
import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";

interface ICourseBox {
  course: TCourse;
  refetch: () => void;
}

const CourseBox = ({ course, refetch }: ICourseBox) => {
  const axiosSecure = useAxios();
  const [showAll, setShowAll] = useState<{ [key: string]: boolean }>({});

  const toggleDetails = (courseId: string) => {
    setShowAll((prevState) => ({
      ...prevState,
      [courseId]: !prevState[courseId],
    }));
  };



  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed && typeof window !== "undefined") {
        axiosSecure.delete(`/courses/${course?._id}`).then((res) => {
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
    <section className="relative p-5 rounded-lg w-[220px] sm:w-52 md:w-60 lg:w-64 2xl:w-96  hover:shadow-xl transition border border-primary h-fit">
      <img
        width={250}
        height={200}
        src={course?.img}
        alt={course?.name}
        className="object-cover object-center rounded-lg mb-3 mx-auto"
      />
      <div className="mt-2">
        <p className="text-md md:text-lg xl:text-xl text-primary mb-2">
          {course?.name}
        </p>
        <p className="mb-1 text-sm lg:text-md xl:text-lg font-semibold">
          Fee: ${course?.fee}
        </p>
        <p className="mb-1 text-sm md:text-md xl:text-lg">
          Method: {course?.method}
        </p>
        <p className="mb-1 text-sm md:text-md xl:text-lg">
          Duration: {course?.duration}
        </p>
        <ul className="list-disc list-inside text-sm  text-gray-700 mt-2">
          {(showAll[course._id]
            ? course.details
            : course.details.slice(0, 2)
          ).map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>

        {!showAll[course._id] && course.details.length > 2 && (
          <button
            onClick={() => toggleDetails(course._id)}
            className="text-sm text-zinc-500 mt-2 mb-4 underline cursor-pointer text-left"
          >
            + আরও {course.details.length - 2}টি বিষয়
          </button>
        )}

        {showAll[course._id] && (
          <button
            onClick={() => toggleDetails(course._id)}
            className="text-sm text-zinc-500 mt-2 mb-4 underline cursor-pointer"
          >
            কম দেখান
          </button>
        )}
      </div>

      <div className="absolute bottom-5 right-5 flex gap-3">
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
            className="text-xl cursor-pointer text-red-500"
          />
        </Tooltip>
      </div>
    </section>
  );
};

export default CourseBox;
