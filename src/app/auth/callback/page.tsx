"use client";

import { fetchServer } from "@/utils/fetchClient";
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
      fetchServer<LoginResponse>("auth/callback", {
        method: "POST",
        body: { code },
        credentials: "same-origin",
      })
        .then((res) => {
          if (res.body.code === 0) {
            const { email, nickName, profile, agreement, collect } =
              res.body.data;
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("nickName", nickName);
            sessionStorage.setItem("profile", String(profile));

            if (agreement === 1) {
              router.replace("/auth/consent");
            } else if (collect === 1) {
              router.replace("/auth/user-info");
            } else {
              router.back();
            }
          } else {
            throw new Error("로그인 실패");
          }
        })
        .catch((e) => {
          router.replace("/auth");
        });
    }
  }, [code, router]);
  return <div></div>;
}
