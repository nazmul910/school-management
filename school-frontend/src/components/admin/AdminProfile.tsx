"use client";

import useAxios from "@/hooks/useAxios";
import DashboardTitle from "@/utils/DashboardTitle";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { LuCamera, LuArrowLeft, LuCheck, LuLoader } from "react-icons/lu";
import { toast } from "react-toastify";
import avatarPlaceholder from "@/assets/Avatar/male_avatar.png";
import LoadingSpinner from "@/utils/LoadingSpinner";

type JwtPayload = {
  userId: string;
  role: "student" | "admin";
  exp: number;
  iat: number;
  [key: string]: any;
};

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const axiosSecure = useAxios();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "",
    bio: "",
    avatar: "",
  });

  const [decoded, setDecoded] = useState({
    userId: "",
  });

  const fetchProfile = () => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    if (token) {
      const { userId } = jwtDecode<JwtPayload>(token);
      axiosSecure
        .get(`users/${userId}`)
        .then(({ data }) => {
          setDecoded({ userId });
          setProfile({
            name: data.data.name || "",
            email: data.data.email || "",
            contact: data.data?.contact || "",
            bio: data.data?.bio || "",
            avatar: data.data?.image || "",
          });
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load admin profile");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const { avatar: _, ...safeProfile } = profile;
    try {
      const { data } = await axiosSecure.patch(`/users/update-user/${decoded.userId}`, safeProfile);
      if (data.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        fetchProfile();
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "school_users");

    try {
      // Upload to Cloudinary via backend
      const { data } = await axiosSecure.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success && data.data?.url) {
        const uploadedImgUrl = data.data.url;
        await axiosSecure.patch(`/users/update-user/${decoded.userId}`, {
          image: uploadedImgUrl,
        });
        setProfile((prev) => ({ ...prev, avatar: uploadedImgUrl }));
        toast.success("Profile photo updated successfully!");
      } else {
        toast.error("Photo upload failed.");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Could not upload photo.");
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const currentAvatarSrc = profile.avatar || avatarPlaceholder.src;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <DashboardTitle blackText="Admin" greenText="Profile" className="text-center" />

      {isLoading ? (
        <div className="mt-12 flex justify-center">
          <LoadingSpinner />
        </div>
      ) : !isEditing ? (
        /* VIEW MODE */
        <section className="bg-white rounded-3xl shadow-xl shadow-[#1e3a5f]/5 border border-[#B4E1EB]/60 p-6 sm:p-8 mt-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#1e3a5f]">Administrator Profile</h2>
              <p className="text-xs text-gray-500 mt-0.5">Account details and contact information</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B4E1EB]/30 text-[#1e3a5f] hover:bg-[#78A4CB] hover:text-white transition-all duration-200 text-xs font-bold cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
            >
              <AiOutlineEdit size={16} />
              <span>Edit Profile</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="w-28 h-28 relative shrink-0 rounded-full ring-4 ring-[#B4E1EB] ring-offset-4 overflow-hidden bg-gray-100 shadow-md">
              <Image
                src={currentAvatarSrc}
                alt="avatar"
                fill
                className="object-cover"
                onError={(e) => {
                  (e.currentTarget as any).src = avatarPlaceholder.src;
                }}
              />
            </div>

            <div className="flex-1 w-full space-y-4">
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Full Name
                </label>
                <p className="text-base font-bold text-[#1e3a5f] mt-0.5">{profile.name || "—"}</p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Email Address
                </label>
                <p className="text-sm font-semibold text-gray-800 mt-0.5 font-mono">{profile.email || "—"}</p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Contact Number
                </label>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{profile.contact || "Not provided"}</p>
              </div>

              {profile.bio && (
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Bio / Overview
                  </label>
                  <p className="text-sm font-medium text-gray-700 mt-0.5 leading-relaxed">{profile.bio}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        /* EDIT MODE */
        <section className="bg-white rounded-3xl shadow-xl shadow-[#1e3a5f]/5 border border-[#B4E1EB]/60 p-6 sm:p-8 mt-6">
          <div className="border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-xl font-extrabold text-[#1e3a5f]">Edit Profile</h2>
            <p className="text-xs text-gray-500 mt-0.5">Update administrator account details</p>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="relative w-28 h-28 group">
              <div className="w-28 h-28 rounded-full ring-4 ring-[#78A4CB] ring-offset-4 overflow-hidden bg-gray-100 shadow-md relative">
                <Image
                  src={currentAvatarSrc}
                  alt="Profile Avatar"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.currentTarget as any).src = avatarPlaceholder.src;
                  }}
                />
                {isUploadingPhoto && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white text-xs gap-1">
                    <LuLoader className="animate-spin text-xl text-[#F9E8A2]" />
                    <span>Uploading...</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleAvatarClick}
                disabled={isUploadingPhoto}
                className="absolute bottom-0 right-0 p-2.5 bg-[#78A4CB] text-white rounded-full shadow-lg hover:bg-[#1e3a5f] hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white"
                title="Change photo"
              >
                <LuCamera size={16} />
              </button>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-400 mt-3 font-medium">Click camera icon to select a new avatar</p>
          </div>

          <form className="space-y-4" onSubmit={handleSave}>
            <InputField
              label="Full Name"
              value={profile.name}
              onChange={(v) => handleChange("name", v)}
              required
            />
            <InputField
              label="Email Address"
              type="email"
              value={profile.email}
              onChange={(v) => handleChange("email", v)}
              icon
              required
            />
            <InputField
              label="Contact Number"
              value={profile.contact}
              onChange={(v) => handleChange("contact", v)}
              icon
              placeholder="01XXXXXXXXX"
            />
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Bio / Overview</label>
              <textarea
                value={profile.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                rows={3}
                placeholder="Short bio..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] bg-white transition-colors"
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handleBack}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-100 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <LuArrowLeft size={16} />
                <span>Go Back</span>
              </button>

              <button
                type="submit"
                disabled={isSaving || isUploadingPhoto}
                className={`w-full sm:w-auto px-7 py-2.5 rounded-xl text-white text-sm font-bold shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.03] active:scale-95 ${
                  isSaving || isUploadingPhoto
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#78A4CB] hover:bg-[#6894bb] hover:shadow-lg shadow-[#78A4CB]/30"
                }`}
              >
                {isSaving ? (
                  <>
                    <LuLoader className="animate-spin text-base" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <LuCheck size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  icon = false,
  placeholder = "",
  required = false,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  icon?: boolean;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] bg-white transition-colors"
        />
        {icon && value && (
          <AiOutlineCheckCircle className="absolute top-3.5 right-3 text-emerald-500 text-base" />
        )}
      </div>
    </div>
  );
}
