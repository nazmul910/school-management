"use client";

import Tooltip from "@/utils/Tooltip";
import useAxios from "@/hooks/useAxios";
import { TBook } from "@/types/books.type";
import Link from "next/link";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import bookCoverIcon from "@/assets/book-cover-placeholder.png";
import Image from "next/image";
interface IBookBox {
  book: TBook;
  refetch: () => void;
}

const BookBox = ({ book, refetch }: IBookBox) => {
  const axiosSecure = useAxios();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed && typeof window !== "undefined") {
        axiosSecure.delete(`/books/${book?._id}`).then((res) => {
          if (res.status === 200) {
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
    <section className="relative rounded-lg w-52 md:w-60 lg:w-72 hover:shadow-xl transition border border-primary h-fit">
      <Link href={book?.url || "/"} target="_blank" rel="noopener noreferrer">
        <Image
          width={300}
          height={450}
          src={book?.cover || bookCoverIcon}
          alt={book?.title}
          className="object-cover rounded-t-lg"
        />
      </Link>

      <div className="px-3 py-2 mt-2">
        <p className="text-md md:text-lg xl:text-xl text-primary font-semibold">
          {book?.title}
        </p>
        <p className="italic text-sm md:text-base text-gray-600">
          - {book?.author || "Unknown Author"}
        </p>
        <p className="text-xs md:text-sm  text-gray-500 mt-4">
          {book?.description || "No Description"}
        </p>
      </div>
      <div className="absolute bottom-2 right-2 flex gap-3">
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
            className="text-xl cursor-pointer text-red-500 "
          />
        </Tooltip>
      </div>
    </section>
  );
};

export default BookBox;
