"use client";

import { FormEvent, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone, BsStarFill } from "react-icons/bs";
import { FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import { LuMessageSquarePlus, LuSend, LuGraduationCap } from "react-icons/lu";
import Swal from "sweetalert2";
import useAxios from "@/hooks/useAxios";
import useSendMailContact from "@/hooks/useContact";

export default function ContactPage() {
  const axios = useAxios();
  const { sendMail } = useSendMailContact();

  // Feedback form state
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackRole, setFeedbackRole] = useState("অভিভাবক");
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Handle general inquiry contact email
  const handleSendInquiry = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const mailData = {
      from_name: formData.get("from_name") as string,
      from_email: formData.get("from_email") as string,
      message: formData.get("message") as string,
    };

    sendMail(mailData, {
      onSuccess: () => {
        form.reset();
        Swal.fire({
          icon: "success",
          title: "ধন্যবাদ!",
          text: "আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।",
          confirmButtonColor: "#78A4CB",
        });
      },
      onError: (err: any) => {
        Swal.fire({
          icon: "error",
          title: "দুঃখিত",
          text: err?.response?.data?.message || "বার্তা পাঠানো সম্ভব হয়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।",
          confirmButtonColor: "#78A4CB",
        });
      },
    });
  };

  // Handle Review / Testimonial submission to backend /reviews
  const handleReviewSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!feedbackName || !feedbackComment) {
      Swal.fire({
        icon: "warning",
        title: "তথ্য অসম্পূর্ণ",
        text: "দয়া করে আপনার নাম ও মতামত লিখুন।",
        confirmButtonColor: "#78A4CB",
      });
      return;
    }

    setIsSubmittingReview(true);
    try {
      await axios.post("/reviews", {
        name: feedbackName,
        designation: feedbackRole,
        title: feedbackTitle || "মতামত",
        comment: feedbackComment,
        rating: feedbackRating,
        status: "approved",
      });

      Swal.fire({
        icon: "success",
        title: "মতামত জমা হয়েছে!",
        text: "আপনার মূল্যবান মতামত ও রিভিউ সফলভাবে সংরক্ষিত হয়েছে।",
        confirmButtonColor: "#78A4CB",
      });

      setFeedbackName("");
      setFeedbackTitle("");
      setFeedbackComment("");
      setFeedbackRating(5);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "ত্রুটি",
        text: err?.response?.data?.message || "মতামত জমা দেওয়া সম্ভব হয়নি।",
        confirmButtonColor: "#78A4CB",
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F8FC] py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] p-8 md:p-12 rounded-3xl text-white shadow-xl mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 text-[#F9E8A2] rounded-full text-xs font-bold mb-3">
            <LuGraduationCap />
            <span>যোগাযোগ ও সহায়তা কেন্দ্র</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            বিদ্যালয়ের সাথে যোগাযোগ ও মতামত
          </h1>
          <p className="text-sm md:text-base text-gray-200 mt-2 max-w-2xl">
            ভর্তি তথ্য, পরীক্ষা সংক্রান্ত জিজ্ঞাসা অথবা আপনার মূল্যবান মতামত জানাতে আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Phone */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex items-center gap-5 hover:shadow-md transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#B4E1EB]/40 text-[#1e3a5f] flex items-center justify-center text-2xl shrink-0">
              <BsTelephone />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#1e3a5f]">ফোন ও হটলাইন</h3>
              <p className="text-xs text-gray-500 mt-1">+৮৮০ ২-৯৮৭৬৫৪৩</p>
              <p className="text-sm font-bold text-[#78A4CB]">+৮৮০ ১৭০০-০০০০০০</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex items-center gap-5 hover:shadow-md transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#F9E8A2]/50 text-[#5c4300] flex items-center justify-center text-2xl shrink-0">
              <AiOutlineMail />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#1e3a5f]">অফিসিয়াল ইমেইল</h3>
              <p className="text-xs text-gray-500 mt-1">info@idealschool.edu.bd</p>
              <p className="text-sm font-bold text-[#78A4CB]">admission@idealschool.edu.bd</p>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex items-center gap-5 hover:shadow-md transition-all">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl shrink-0">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#1e3a5f]">বিদ্যালয় প্রাঙ্গণ</h3>
              <p className="text-xs text-gray-500 mt-1">বাড়ি নং ১২, রোড নং ৫, ব্লক-বি</p>
              <p className="text-sm font-bold text-gray-700">মিরপুর-১০, ঢাকা-১২১৬</p>
            </div>
          </div>
        </div>

        {/* Two Forms Grid: Message Inquiry + Review/Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Form 1: Send Message / Inquiry */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#B4E1EB]/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#78A4CB]/20 text-[#1e3a5f] flex items-center justify-center text-xl">
                <LuSend />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1e3a5f]">সাধারণ জিজ্ঞাসা ও বার্তা পাঠান</h2>
                <p className="text-xs text-gray-500">যেকোনো প্রশ্ন বা তথ্যের জন্য বার্তা পাঠান</p>
              </div>
            </div>

            <form onSubmit={handleSendInquiry} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">আপনার পূর্ণ নাম *</label>
                <input
                  type="text"
                  name="from_name"
                  placeholder="যেমন: মোঃ কামরুল হাসান"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">ইমেইল ঠিকানা *</label>
                <input
                  type="email"
                  name="from_email"
                  placeholder="example@mail.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">আপনার বার্তা বা প্রশ্ন *</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="এখানে আপনার বার্তা লিখুন..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all flex items-center justify-center gap-2"
              >
                <LuSend />
                <span>বার্তা পাঠান</span>
              </button>
            </form>
          </div>

          {/* Form 2: Submit School Feedback / Review */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#B4E1EB]/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#F9E8A2] text-[#5c4300] flex items-center justify-center text-xl">
                <LuMessageSquarePlus />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1e3a5f]">বিদ্যালয় সম্পর্কে আপনার মতামত দিন</h2>
                <p className="text-xs text-gray-500">আপনার রিভিউ সরাসরি ওয়েবসাইটে প্রকাশিত হবে</p>
              </div>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">আপনার নাম *</label>
                  <input
                    type="text"
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    placeholder="আপনার নাম লিখুন"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">আপনার পরিচয় / পদবি *</label>
                  <select
                    value={feedbackRole}
                    onChange={(e) => setFeedbackRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] bg-white font-medium"
                  >
                    <option value="অভিভাবক (১০ম শ্রেণি)">অভিভাবক (১০ম শ্রেণি)</option>
                    <option value="অভিভাবক (৯ম শ্রেণি)">অভিভাবক (৯ম শ্রেণি)</option>
                    <option value="অভিভাবক (৮ম শ্রেণি)">অভিভাবক (৮ম শ্রেণি)</option>
                    <option value="অভিভাবক (৭ম শ্রেণি)">অভিভাবক (৭ম শ্রেণি)</option>
                    <option value="অভিভাবক (৬ষ্ঠ শ্রেণি)">অভিভাবক (৬ষ্ঠ শ্রেণি)</option>
                    <option value="শিক্ষার্থী">শিক্ষার্থী</option>
                    <option value="প্রাক্তন শিক্ষার্থী">প্রাক্তন শিক্ষার্থী</option>
                    <option value="শুভাকাঙ্ক্ষী">শুভাকাঙ্ক্ষী</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">রেটিং প্রদান করুন *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFeedbackRating(star)}
                      className={`text-2xl transition-transform hover:scale-125 ${
                        star <= feedbackRating ? "text-amber-400" : "text-gray-300"
                      }`}
                    >
                      <BsStarFill />
                    </button>
                  ))}
                  <span className="text-xs text-gray-500 font-semibold ml-2">({feedbackRating} স্টার)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">শিরোনাম (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={feedbackTitle}
                  onChange={(e) => setFeedbackTitle(e.target.value)}
                  placeholder="যেমন: অসাধারণ শিক্ষা ব্যবস্থা ও শৃংখলা"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">আপনার মতামত বা মন্তব্য *</label>
                <textarea
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  rows={3}
                  placeholder="বিদ্যালয়ের মান, শিক্ষক ও পরিবেশ সম্পর্কে আপনার মূল্যবান অভিজ্ঞতা লিখুন..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] text-white font-bold text-sm hover:opacity-95 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <LuMessageSquarePlus />
                <span>{isSubmittingReview ? "জমা হচ্ছে..." : "মতামত সাবমিট করুন"}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-white aspect-[21/9] w-full">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.700319488313!2d90.3654215!3d23.8043977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d6f6b8b0e7%3A0x7d94f29235e1975e!2sMirpur-10%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
