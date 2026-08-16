"use client";

import { useAuth } from "@/app/providers/AuthContext";
import person from "@/assets/testimonial-person.webp";
import useAxios from "@/hooks/useAxios";
import { TReview } from "@/types/review.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonial = () => {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const axiosSecure = useAxios();

  useEffect(() => {
    axiosSecure.get("/reviews").then((res) => {
      setReviews(res.data?.data);
    });
  }, []);

  console.log(reviews);
  // Swiper Config
  const swiperConfig = {
    pagination: { clickable: true },
    autoplay: { delay: 5000, disableOnInteraction: false },
    // loop: true,
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 30 },
    },
    modules: [Pagination, Autoplay],
  };

  return (
    <section className="container my-20 lg:my-32">
      <h2 className="text-3xl lg:text-4xl xl:text-5xl duration-200 text-center text-darker font-bold mt-12 mb-6 lg:mt-20 lg:mb-10">
        শিক্ষার্থীদের <span className="text-primary">মন্তব্য</span>
      </h2>
      {/* swiper starts */}
      <Swiper {...swiperConfig}>
        {reviews &&
          reviews
            .filter((review) => review?.status == "approved")
            .map((review: TReview, index: number) => (
              <SwiperSlide key={index}>
                <div className="bg-light p-10 rounded-lg h-72 relative flex flex-col justify-between cursor-grab">
                  <div>
                    <p className="text-xl text-primary mb-2">{review.title}</p>
                    <p className="mb-5 italic line-clamp-4 overflow-hidden">
                      {review?.comment}
                    </p>
                  </div>
                  <div className="absolute bottom-5 left-10 flex items-center gap-5">
                    <Image width={50} height={50} src={person} alt="Person" />
                    <div>
                      <article className="text-lg">{review?.name}</article>
                      <article className="text-zinc-500">
                        {review?.designation}
                      </article>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>

      <ToastContainer />
    </section>
  );
};

export default Testimonial;
