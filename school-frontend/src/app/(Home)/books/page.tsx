"use client";

import Breadcrumbs from "@/utils/Breadcrumb";
import GetInTouch from "@/utils/GetInTouch";
import useBooks from "@/hooks/useBooks";
import { TBook } from "@/types/books.type";

import Image from "next/image";
import Link from "next/link";

import BookPlaceholder from "@/assets/book-cover-placeholder.png";

import { FaBookOpen, FaArrowRight, FaUserEdit } from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";

const Books = () => {
  const { booksData } = useBooks();

  const hasBooks = booksData.data && booksData.data.length > 0;

  return (
    <section>
      <Breadcrumbs title="বইসমূহ" />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-primary">
              আমাদের <span className="text-[#ffd54f]">বইসমূহ</span>
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-8">
              কুরআন, তাজবীদ ও ইসলামী জ্ঞান অর্জনের জন্য আমাদের নির্বাচিত বইসমূহ
              সংগ্রহ করুন।
            </p>
          </div>

          {hasBooks ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {booksData.data?.map((book: TBook) => (
                <div
                  key={book._id}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl duration-300"
                >
                  <div className="relative h-96 flex justify-center items-center overflow-hidden">
                    <Image
                      src={book.cover || BookPlaceholder}
                      alt={book.title}
                      width={300}
                      height={450}
                      className="object-cover w-[50%] group-hover:scale-105 duration-500"
                    />

                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                      <HiOutlineBadgeCheck className="text-base" />
                      <span>বিনামূল্যে</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="flex items-start gap-2 text-xl font-bold text-darker leading-8 line-clamp-2">
                      <FaBookOpen className="text-primary mt-1 shrink-0" />
                      {book.title}
                    </h3>

                    <p className="mt-3 flex items-center gap-2 text-primary font-medium">
                      <FaUserEdit />
                      <span>লেখক: {book.author || "অজানা"}</span>
                    </p>

                    <p className="mt-4 text-gray-600 leading-7 text-sm line-clamp-3">
                      {book.description ||
                        "এই বইটির কোনো বিবরণ পাওয়া যায়নি।"}
                    </p>

                    <Link
                      href={book.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white transition hover:bg-dark"
                    >
                      <FaBookOpen />
                      <span>পিডিএফ পড়ুন</span>
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="bg-primary/10 p-6 rounded-full mb-6">
                <FaBookOpen className="text-5xl text-primary" />
              </div>

              <h3 className="text-2xl font-bold text-darker mb-2">
                কোনো বই পাওয়া যায়নি
              </h3>

              <p className="text-gray-500 max-w-md leading-7">
                এই মুহূর্তে আমাদের সংগ্রহে কোনো বই যুক্ত নেই। অনুগ্রহ করে পরে
                আবার চেক করুন, নতুন বই শীঘ্রই যুক্ত করা হবে।
              </p>
            </div>
          )}
        </div>
      </section>

      <GetInTouch />
    </section>
  );
};

export default Books;