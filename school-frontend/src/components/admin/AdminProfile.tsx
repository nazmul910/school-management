"use client";
import useAxios from "@/hooks/useAxios";
import DashboardTitle from "@/utils/DashboardTitle";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { toast } from "react-toastify";

type JwtPayload = {
  userId: string;
  role: "student" | "admin";
  exp: number;
  iat: number;
  [key: string]: any;
};

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
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
    const token = localStorage.getItem("accessToken");
    if (token) {
      const { userId } = jwtDecode<JwtPayload>(token);
      axiosSecure
        .get(`users/${userId}`)
        .then(({ data }) => {
          setDecoded({ userId });
          setProfile({
            name: data.data.name,
            email: data.data.email,
            contact: data.data?.contact,
            bio: data.data?.bio,
            avatar: data.data?.image,
          });
        })
        .then((err) => err);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const { avatar, ...safeProfile } = profile;
    axiosSecure
      .patch(`/users/update-user/${decoded.userId}`, safeProfile)
      .then(({ data }) => {
        if (data.success) {
          toast.success("Teacher Profile Updated!");
        }
      })
      .catch((err) => console.log(err));
    setIsEditing(false);
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

    const previewUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatar: previewUrl }));

    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMG_BB_API_KEY;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        const uploadedImgUrl = data.data.url;
        toast.success("Image uploaded successfully!");
        await axiosSecure.patch(`/users/update-user/${decoded.userId}`, {
          image: uploadedImgUrl,
        });
        setProfile((prev) => ({ ...prev, avatar: uploadedImgUrl }));
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="max-w-4xl flex flex-col justify-center px-4 mx-auto">
      <DashboardTitle blackText="Teacher" greenText="Profile" />
      {!isEditing ? (
        // VIEW MODE
        <section
          className="container flex flex-col
        shadow-lg shadow-gray-300 rounded-lg p-4 sm:p-6 mt-6"
        >
          <div className="flex flex-col self-end sm:flex-row sm:items-center sm:justify-between mb-4">
            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 sm:mt-0 flex items-center gap-1 text-primary-600 cursor-pointer"
            >
              <AiOutlineEdit size={20} />
              Edit
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-24 h-24 relative mx-auto sm:mx-0">
              <Image
                src={profile?.avatar}
                alt="avatar"
                fill
                className="rounded-full object-cover border shadow"
              />
            </div>

            <div className="flex-1 space-y-4">
              {["name", "email", "contact", "bio"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {field}
                  </label>
                  <p className="mt-1 text-gray-900">
                    {(profile as any)[field]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        // EDIT MODE
        <section className="container mx-auto bg-white p-6 rounded-lg shadow-lg shadow-gray-300 mt-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-24 h-24">
              <Image
                src={profile?.avatar}
                alt="Profile Avatar"
                fill
                className="rounded-full object-cover border"
              />
              <button
                type="button"
                onClick={handleAvatarClick}
                className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow cursor-pointer"
              >
                <BsPencil size={16} />
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSave}>
            <InputField
              label="Full Name"
              value={profile.name}
              onChange={(v) => handleChange("name", v)}
            />
            <InputField
              label="Email"
              type="email"
              value={profile.email}
              onChange={(v) => handleChange("email", v)}
              icon
            />
            <InputField
              label="Contact"
              value={profile.contact}
              onChange={(v) => handleChange("contact", v)}
              icon
            />
            <InputField
              label="Bio"
              value={profile.bio}
              onChange={(v) => handleChange("bio", v)}
            />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 bg-green-100 hover:bg-gray-200 text-gray-700 rounded-md"
              >
                Back To Profile
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Save Changes
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
  className = "",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  icon?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full border rounded-md p-2 pr-8"
        />
        {icon && (
          <AiOutlineCheckCircle className="absolute top-3 right-2 text-green-500" />
        )}
      </div>
    </div>
  );
}
