"use client";

import { fetchServer } from "@/utils/fetchClient";
import { storageSet } from "@/utils/storageFns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
interface LoginResponse {
  email: string;
  nickName: string;
  profile: 0 | string;
  collect: number;
  agreement: number;
}
export default function CallbackKakao() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  useEffect(() => {
    if (code) {
      fetchServer<LoginResponse>("callback", {
        method: "POST",
        body: { code },
        credentials: "same-origin",
      })
        .then((res) => {
          if (res.body.code === 0) {
            const { email, nickName, profile, agreement, collect } =
              res.body.data;
            storageSet("email", email);
            storageSet("nickName", nickName);
            storageSet("profile", String(profile));
            if (agreement === 0) {
              router.replace("/auth/consent");
            } else if (collect === 0) {
              router.replace("/auth/user-info");
            } else {
              router.replace("/home");
            }
          } else {
            throw new Error("로그인 실패");
          }
        })
        .catch((e) => {
          router.replace("/");
        });
    }
  }, [code, router]);
  return <div></div>;
}
