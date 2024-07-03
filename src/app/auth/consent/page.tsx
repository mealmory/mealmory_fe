"use client";

import CheckBox from "@/components/auth/CheckBox";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Consent() {
  const consents = [
    { name: "이용 약관", text: Array(100).fill("a").join(""), type: "terms" },
    {
      name: "개인정보 처리 방침",
      text: Array(100).fill("b").join(""),
      type: "privacy",
    },
  ];
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  });
  const router = useRouter();
  function handleCheckAgree(key: keyof typeof agreements) {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="w-full h-screen max-w-5xl mx-auto p-2 text-xl sm:text-base">
      <p className="text-[1.1em] text-center mb-3">
        서비스 약관 및 개인정보 수집 동의
      </p>
      <div className="w-full h-full mx-auto text-balance">
        {consents.map(({ name, type, text }) => {
          const agreeType = type as keyof typeof agreements;
          return (
            <div
              key={type}
              className="mb-3 max-h-[500px] overflow-y-scroll h-2/5"
            >
              <CheckBox
                name={name}
                handleClick={() => handleCheckAgree(agreeType)}
                checked={agreements[agreeType]}
              />
              <p className="text-sm w-full break-words">{text}</p>
            </div>
          );
        })}
        <button
          className="bg-cuspoint text-cusorange shadow-border rounded-xl w-full p-3 font-semibold"
          onClick={() => router.push("/auth/user-info")}
        >
          동의하고 시작하기
        </button>
      </div>
    </div>
  );
}
