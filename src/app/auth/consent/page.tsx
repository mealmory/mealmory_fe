"use client";

import CheckBox from "@/components/atoms/CheckBox";
import { fetcher, fetchServer } from "@/utils/fetchClient";
import { getTimestamp } from "@/utils/timeFns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { errorAlert } from "@/utils/alertFns";

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

  function handleSubmitConsent() {
    if (agreements.privacy && agreements.terms) {
      fetcher("user/process", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          timestamp: getTimestamp(),
          agreement: 1,
        },
      }).then((res) => {
        if (res.body.code === 0) {
          router.push("/auth/user-info");
        }
        if (res.body.code === 1004) {
          errorAlert(
            "로그인 시간이 만료되었습니다.",
            "다시 로그인 해 주세요.",
            () => {
              router.replace("/auth");
            }
          );
        }
      });
    }
  }

  return (
    <div className="w-full h-screen max-w-5xl p-2 mx-auto text-xl sm:text-base">
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
              <p className="w-full text-sm break-words">{text}</p>
            </div>
          );
        })}
        <button
          className="w-full p-3 font-semibold bg-cuspoint text-cusorange shadow-border rounded-xl"
          onClick={handleSubmitConsent}
          disabled={!agreements.privacy || !agreements.terms}
        >
          동의하고 시작하기
        </button>
      </div>
    </div>
  );
}
