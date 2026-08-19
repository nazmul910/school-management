"use client";

import { FormEvent, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone, BsStarFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { LuMessageSquarePlus, LuSend, LuGraduationCap } from "react-icons/lu";
import Swal from "sweetalert2";
import useAxios from "@/hooks/useAxios";
import useSendMailContact from "@/hooks/useContact";

export default function ContactPage() {
  const axios = useAxios();
  const { sendMail } = useSendMailContact();

  // Feedback form state
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackRole, setFeedbackRole] = useState("Guardian (Class 10)");
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
          title: "Thank You!",
          text: "Your message has been sent successfully. We will get back to you shortly.",
          confirmButtonColor: "#78A4CB",
        });
      },
      onError: (err: any) => {
        Swal.fire({
          icon: "error",
          title: "Error Sending Message",
          text: err?.response?.data?.message || "Failed to send your message. Please try again.",
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
        title: "Incomplete Information",
        text: "Please provide both your name and feedback comments.",
        confirmButtonColor: "#78A4CB",
      });
      return;
    }

    setIsSubmittingReview(true);
    try {
      await axios.post("/reviews", {
        name: feedbackName,
        designation: feedbackRole,
        title: feedbackTitle || "Feedback",
        comment: feedbackComment,
        rating: feedbackRating,
        status: "approved",
      });

      Swal.fire({
        icon: "success",
        title: "Review Submitted!",
        text: "Thank you! Your feedback has been saved and submitted successfully.",
        confirmButtonColor: "#78A4CB",
      });

      setFeedbackName("");
      setFeedbackTitle("");
      setFeedbackComment("");
      setFeedbackRating(5);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: err?.response?.data?.message || "Could not submit your review at this moment.",
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
            <span>Contact & Help Desk</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Get in Touch & Share Your Feedback
          </h1>
          <p className="text-sm md:text-base text-gray-200 mt-2 max-w-2xl">
            Have queries regarding admissions, fees, or academics? Reach out to our administrative office or leave your valuable review.
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
              <h3 className="font-bold text-lg text-[#1e3a5f]">Phone & Hotline</h3>
              <p className="text-xs text-gray-500 mt-1">+880 2-9876543</p>
              <p className="text-sm font-bold text-[#78A4CB]">+880 1700-000000</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex items-center gap-5 hover:shadow-md transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#F9E8A2]/50 text-[#5c4300] flex items-center justify-center text-2xl shrink-0">
              <AiOutlineMail />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#1e3a5f]">Official Email</h3>
              <p className="text-xs text-gray-500 mt-1">info@idealschool.edu.bd</p>
              <p className="text-sm font-bold text-[#78A4CB]">admission@fatemahalim.edu.bd</p>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex items-center gap-5 hover:shadow-md transition-all">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl shrink-0">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#1e3a5f]">School Address</h3>
              <p className="text-sm font-bold text-gray-700">Hamidpur, Tangail</p>
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
                <h2 className="text-xl font-bold text-[#1e3a5f]">Send General Inquiry</h2>
                <p className="text-xs text-gray-500">Ask any questions regarding academics or admission</p>
              </div>
            </div>

            <form onSubmit={handleSendInquiry} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  name="from_name"
                  placeholder="e.g. John Doe"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  name="from_email"
                  placeholder="example@mail.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Your Message *</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Write your inquiry or question here..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all flex items-center justify-center gap-2"
              >
                <LuSend />
                <span>Send Message</span>
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
                <h2 className="text-xl font-bold text-[#1e3a5f]">Leave a Review / Testimonial</h2>
                <p className="text-xs text-gray-500">Share your experience with our school community</p>
              </div>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Role / Designation *</label>
                  <select
                    value={feedbackRole}
                    onChange={(e) => setFeedbackRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] bg-white font-medium"
                  >
                    <option value="Guardian (Class 10)">Guardian (Class 10)</option>
                    <option value="Guardian (Class 9)">Guardian (Class 9)</option>
                    <option value="Guardian (Class 8)">Guardian (Class 8)</option>
                    <option value="Guardian (Class 7)">Guardian (Class 7)</option>
                    <option value="Guardian (Class 6)">Guardian (Class 6)</option>
                    <option value="Current Student">Current Student</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Well-wisher">Well-wisher</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Rating (1 to 5 Stars) *</label>
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
                  <span className="text-xs text-gray-500 font-semibold ml-2">({feedbackRating} Stars)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Review Headline (Optional)</label>
                <input
                  type="text"
                  value={feedbackTitle}
                  onChange={(e) => setFeedbackTitle(e.target.value)}
                  placeholder="e.g. Outstanding academic culture and discipline"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Your Feedback / Review *</label>
                <textarea
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  rows={3}
                  placeholder="Write your experience regarding teachers, campus environment, and quality of education..."
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
                <span>{isSubmittingReview ? "Submitting..." : "Submit Review"}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-white aspect-[21/9] w-full">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1108.310005728464!2d89.9949186!3d24.3935397!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fdf626015a42f5%3A0x83c4acee64dbc15!2s9XVW%2BP8M%20Uttar%20Betdoba%20Fatema%20Halim%20High%20School%2C%20Joydevpur%20-%20Tangail%20-%20Jamalpur%20Hwy%2C%20Kalihati%201970!5e1!3m2!1sen!2sbd!4v1787144799212!5m2!1sen!2sbd"
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
