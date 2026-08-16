"use client";
import useCourses from "@/hooks/useCourses";
import useMails from "@/hooks/useMails";
import useNotices from "@/hooks/useNotices";
import useStudent from "@/hooks/useStudent";
import useTeachers from "@/hooks/useTeachers";
import DashboardTitle from "@/utils/DashboardTitle";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdLibraryBooks, MdOutlineMail } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";

export default function AdminHome() {
  const { coursesData } = useCourses();
  const { teachersData } = useTeachers();
  const { studentData } = useStudent();
  const { noticesData } = useNotices();
  const { mailsData } = useMails();

  return (
    <div className="max-w-4xl mx-auto">
      <DashboardTitle
        blackText="Welcome to the"
        greenText="Admin Dashboard"
        className="text-center mt-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 shadow-lg shadow-gray-300 rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-md md:text-lg xl:text:xl font-bold">
              Total Student
            </h2>
            <p className="text-md md:text-lg xl:text:xl mt-2">
              {studentData?.data?.length}
            </p>
          </div>
          <PiStudentBold className="text-4xl text-blue-600" />
        </div>

        <div className="bg-white p-4 shadow-lg shadow-gray-300 rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-md md:text-lg xl:text:xl font-bold">
              Total Teacher
            </h2>
            <p className="text-md md:text-lg xl:text:xl mt-2">
              {teachersData?.data?.length}
            </p>
          </div>
          <FaChalkboardTeacher className="text-4xl text-green-600" />
        </div>

        <div className="bg-white p-4 shadow-lg shadow-gray-300 rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-md md:text-lg xl:text:xl font-bold">
              Total Course
            </h2>
            <p className="text-md md:text-lg xl:text:xl mt-2">
              {coursesData?.data?.length}
            </p>
          </div>
          <MdLibraryBooks className="text-4xl text-purple-600" />
        </div>
        <div className="bg-white p-4 shadow-lg shadow-gray-300 rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-md md:text-lg xl:text:xl font-bold">
              Total Notice
            </h2>
            <p className="text-md md:text-lg xl:text:xl mt-2">
              {noticesData?.data?.length}
            </p>
          </div>
          <IoNotificationsSharp className="text-4xl text-yellow-600" />
        </div>
        <div className="bg-white p-4 shadow-lg shadow-gray-300 rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-md md:text-lg xl:text:xl font-bold">
              Total Mails
            </h2>
            <p className="text-md md:text-lg xl:text:xl mt-2">
              {mailsData?.data?.length}
            </p>
          </div>
          <MdOutlineMail className="text-4xl text-cyan-600" />
        </div>
      </div>
      {/* <AdminDashboard /> */}
    </div>
  );
}
