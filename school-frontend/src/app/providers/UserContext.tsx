"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import useAxios from "@/hooks/useAxios";

type JwtPayload = {
  userId: string;
  role: "student" | "teacher";
  exp: number;
  iat: number;
  [key: string]: any;
};

interface Profile {
  name: string;
  email: string;
  contact: string;
  address: string;
  avatar: string;
}

interface Decoded {
  id: string;
  userId: string;
}

interface UserContextProps {
  profile: Profile;
  decoded: Decoded;
}

const defaultProfile: Profile = {
  name: "",
  email: "",
  contact: "",
  address: "",
  avatar: "",
};

const defaultDecoded: Decoded = {
  id: "",
  userId: "",
};

const UserContext = createContext<UserContextProps>({
  profile: defaultProfile,
  decoded: defaultDecoded,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [decoded, setDecoded] = useState<Decoded>(defaultDecoded);
  const axiosSecure = useAxios();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const { userId } = jwtDecode<JwtPayload>(token);

        axiosSecure
          .get(`/users/${userId}`)
          .then(({ data }) => {
            setProfile((prev) => ({
              ...prev,
              name: data.data.name,
              avatar: data.data?.image,
              email: data.data?.email,
              contact: data.data?.contact,
              address: data.data?.address,
            }));
          })
          .catch((err) => console.error("User fetch error:", err));
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ profile, decoded }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
