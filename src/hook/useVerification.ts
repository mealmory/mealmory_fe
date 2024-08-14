import { storageGet } from "@/utils/storageFns";
import { useEffect, useState } from "react";

const ADMINISTRATORS = [
  process.env.NEXT_PUBLIC_JF as string,
  process.env.NEXT_PUBLIC_JB as string,
];

export const useVerification = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    storageGet("email")
      ?.then(
        (email) => typeof email === "string" && ADMINISTRATORS.includes(email)
      )
      .then((flag) => {
        if (flag) setIsAdmin(true);
      });
  }, []);

  return {
    isAdmin,
  };
};
