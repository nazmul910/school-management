"use client";

import BookBox from "@/app/(admin)/admin/manage-books/BookBox";
import useAxios from "@/hooks/useAxios";
import useBooks from "@/hooks/useBooks";
import { TBook } from "@/types/books.type";
import CustomModal from "@/utils/CustomModal";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface IFormInput {
  title: string;
  author?: string;
  description?: string;
  url: string;
}

const ManageBooks = () => {
  const axiosSecure = useAxios();
  const { booksData, booksRefetch, booksLoading } = useBooks();
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File states
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  // Handle cover image selection
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setCoverFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setCoverPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Please select a valid image file");
      }
    }
  };

  // Cancel cover selection
  const cancelCover = () => {
    setCoverFile(null);
    setCoverPreview(null);
  };

  // Reset all form data
  const resetForm = () => {
    reset();
    setCoverFile(null);
    setCoverPreview(null);
  };

  // Upload image to ImgBB
  const uploadImageToImgBB = async (file: File) => {
    const apiKey = process.env.NEXT_PUBLIC_IMG_BB_API_KEY;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      if (!data.success) {
        toast.error(data.error?.message || "Image upload failed");
        return;
      }
      return data.data.url;
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image");
    }
  };

 const onBookDataSubmit: SubmitHandler<IFormInput> = async (data) => {
  if (!coverFile) {
    toast.error("Please upload a book cover image");
    return;
  }

  setIsSubmitting(true);

  try {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("author", data.author || "");
    formData.append("description", data.description || "");
    formData.append("url", data.url);

    // Backend upload.single("cover")
    formData.append("cover", coverFile);

    const res = await axiosSecure.post("/books", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.statusCode === 201) {
      Swal.fire({
        title: "Book added successfully",
        icon: "success",
        timer: 1500,
      });

      setIsBookModalOpen(false);
      resetForm();
      booksRefetch();
    }
  } catch (error: any) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Could not add book"
    );
  } finally {
    setIsSubmitting(false);
  }
};

  if (booksLoading) return <LoadingSpinner />;

  return (
    <section>
      <div className="sm:flex justify-between items-center mt-10">
        <DashboardTitle blackText="Manage" greenText="Books" />
        <button
          className="bg-primary hover:bg-lightduration-300 text-white px-4 py-2 rounded-md flex items-center gap-2 my-3 sm:my-0"
          onClick={() => setIsBookModalOpen(true)}
        >
          <AiOutlinePlus /> Add Book
        </button>
      </div>

      <div className="flex flex-wrap gap-5 my-5">
        {booksData.data && booksData.data.length > 0 ? (
          booksData.data.map((book: TBook) => (
            <BookBox key={book?._id} book={book} refetch={booksRefetch} />
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
              <BsImage className="text-5xl text-primary" />
            </div>

            <h3 className="text-2xl font-bold text-primary mb-2">
              কোনো বই পাওয়া যায়নি
            </h3>

            <p className="text-gray-500 max-w-md leading-7">
              এখনো কোনো বই যোগ করা হয়নি। উপরের &quot;Add Book&quot; বাটনে
              ক্লিক করে নতুন বই যোগ করুন।
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isBookModalOpen && (
        <CustomModal
          isModalOpen={isBookModalOpen}
          setIsModalOpen={setIsBookModalOpen}
        >
          <form onSubmit={handleSubmit(onBookDataSubmit)}>
            <h3 className="font-bold text-xl mb-2">Add Book Information</h3>
            <p className="border-t border-dark mb-5"></p>

            {/* Title */}
            <div className="w-full mb-3">
              <label className="text-dark text-sm">
                Book Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("title", { required: "Book title is required" })}
                className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary ${
                  errors.title && "border border-red-500"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="w-full mb-3">
              <label className="text-dark text-sm">
                Book Cover <span className="text-red-500">*</span>
              </label>

              {!coverFile ? (
                <div className="mt-2">
                  <label
                    htmlFor="cover-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-dark/40 rounded-lg cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <BsImage className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        book cover
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, JPEG (MAX. 5MB)
                      </p>
                      <p className="text-xs text-gray-500">
                        Try to maintain the aspect ratio of 2:3
                      </p>
                    </div>
                    <input
                      id="cover-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleCoverChange}
                    />
                  </label>
                </div>
              ) : (
                <div className="mt-2 relative">
                  <div className="relative w-full h-48 border border-dark/40 rounded-lg overflow-hidden">
                    <img
                      src={coverPreview!}
                      alt="Cover preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={cancelCover}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <AiOutlineClose size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{coverFile.name}</p>
                </div>
              )}
            </div>

            <div className="w-full mb-3">
              <label className="text-dark text-sm">
                Book URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                {...register("url", {
                  required: "Book URL is required",
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "Please enter a valid URL",
                  },
                })}
                placeholder="বইয়ের ড্রাইভ লিংক"
                className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary ${
                  errors.url && "border border-red-500"
                }`}
              />
              {errors.url && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.url.message}
                </p>
              )}
            </div>
            <div className="w-full mb-3">
              <label className="text-dark text-sm">Book Author</label>
              <input
                type="text"
                {...register("author")}
                placeholder="বইয়ের লেখক/ প্রকাশনীর নাম"
                className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary ${
                  errors.author && "border border-red-500"
                }`}
              />
            </div>

            <div className="w-full mb-3">
              <label className="text-dark text-sm">Book Description</label>
              <textarea
                {...register("description")}
                placeholder="বইয়ের বর্ণনা"
                rows={3}
                className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary resize-vertical ${
                  errors.description && "border border-red-500"
                }`}
              />
            </div>

            <input
              className={`text-center px-3 md:px-5 py-1 md:py-3 duration-300 rounded-lg text-white cursor-pointer ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-green-800"
              }`}
              type="submit"
              value={isSubmitting ? "Adding Book..." : "Add Book"}
              disabled={isSubmitting}
            />
          </form>
        </CustomModal>
      )}
    </section>
  );
};

export default ManageBooks;