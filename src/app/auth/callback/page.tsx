"use client";

import { fetchClient } from "@/utils/fetchClient";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CallbackKakao() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  useEffect(() => {
    if (code) {
      fetchClient("auth/callback", {
        method: "POST",
        body: { code },
        credentials: "same-origin",
      })
        .then((res) => {
          // console.log(res.body);
          router.push("/auth/consent");
        })
        .catch((e) => {
          router.replace("/auth");
        });
    }
  }, [code]);
  return <div></div>;
}
