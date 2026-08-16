"use client";
import useAxios from "@/hooks/useAxios";
import { jwtDecode } from "jwt-decode";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineUpload,
} from "react-icons/ai";
import { toast } from "react-toastify";
import avatar from "@/assets/Avatar/male_avatar.png";
import { useRouter } from "next/navigation";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";

type JwtPayload = {
  userId: string;
  role: "student" | "admin";
  exp: number;
  iat: number;
  [key: string]: any;
};

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const axiosSecure = useAxios();

  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    contact: string;
    address: string;
    avatar: StaticImageData | string;
  }>({
    name: "",
    email: "",
    contact: "",
    address: "",
    avatar: avatar,
  });
  const [decoded, setDecoded] = useState({
    userId: "",
  });
  const router = useRouter();
  const fetchProfile = () => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    if (token) {
      const { userId } = jwtDecode<JwtPayload>(token);
      axiosSecure
        .get(`/users/${userId}`)
        .then(({ data }) => {
          console.log(data);
          setDecoded({ userId });
          setProfile({
            name: data.data.name,
            email: data.data.email,
            contact: data.data?.contact,
            address: data.data?.address,
            avatar: data.data?.image || avatar,
          });
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load profile data");
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const { avatar, ...safeProfile } = profile;
    axiosSecure
      .patch(`/users/update-user/${decoded.userId}`, safeProfile)
      .then(({ data }) => {
        if (data.success) {
          toast.success("Student Profile updated");
          router.push("/student/student-dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update profile");
      })
      .finally(() => {
        setIsSaving(false);
      });
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
        const uploadedImageUrl = data.data.url;
        toast.success("Image uploaded successfully!");
        await axiosSecure.patch(`/users/update-user/${decoded.userId}`, {
          image: uploadedImageUrl,
        });
        setProfile((prev) => ({ ...prev, avatar: uploadedImageUrl }));
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.log("Upload error:", error);
    }
  };

  const handleBack = () => {
    setIsEditing(false);
  };

  return (
    <section>
      <DashboardTitle
        blackText="Student"
        greenText="Profile"
        className="text-center mt-10"
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="container max-w-2xl mx-auto ">
          {!isEditing ? (
            // VIEW MODE
            <section className="container mx-auto shadow-lg rounded-lg p-4 sm:p-6 mt-6">
              <div className="w-2xl flex items-end justify-end mb-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-2 sm:mt-0 flex items-center gap-1 text-primary"
                >
                  <AiOutlineEdit size={20} />
                  Edit
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-24 h-24 relative mx-auto sm:mx-0">
                  <Image
                    src={profile?.avatar || avatar}
                    alt="avatar"
                    fill
                    className="rounded-full object-cover border shadow"
                    onError={(e) => {
                      e.currentTarget.src = avatar.src;
                    }}
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="mt-1 text-gray-900">{profile.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-gray-900">{profile.email}</p>
                  </div>
                  {profile.contact && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contact
                      </label>
                      <p className="mt-1 text-gray-900">{profile.contact}</p>
                    </div>
                  )}
                  {profile.address && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <p className="mt-1 text-gray-900">{profile.address}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          ) : (
            // EDIT MODE
            <section className="w-3xl mx-auto bg-white p-6 rounded-lg shadow-xl shadow-[#3748688c] mt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Edit Profile
              </h2>

              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24">
                  <Image
                    src={profile?.avatar || avatar}
                    alt="Profile Avatar"
                    fill
                    className="rounded-full object-cover border"
                    onError={(e) => {
                      e.currentTarget.src = avatar.src;
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow"
                  >
                    <AiOutlineUpload size={16} />
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
                {/* Full Name */}
                <InputField
                  label="Full Name"
                  value={profile.name}
                  onChange={(v) => handleChange("name", v)}
                />

                {/* Email */}
                <InputField
                  label="Email"
                  type="email"
                  value={profile.email}
                  onChange={(v) => handleChange("email", v)}
                  icon
                />

                {/* Number */}
                <InputField
                  label="Contact"
                  value={profile.contact}
                  onChange={(v) => handleChange("contact", v)}
                  icon
                />

                {/* City */}
                <InputField
                  label="Address"
                  value={profile.address}
                  onChange={(v) => handleChange("address", v)}
                />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-2 bg-[#dde1e7] rounded-md"
                  >
                    Back To Profile
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className={`px-6 py-2 rounded-md transition-all duration-300 flex items-center justify-center gap-2 ${
                      isSaving
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-primary text-white hover:bg-[#1d3d7c]"
                    }`}
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </section>
          )}
        </div>
      )}
    </section>
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
          <AiOutlineCheckCircle className="absolute top-3 right-2 text-primary" />
        )}
      </div>
    </div>
  );
}
