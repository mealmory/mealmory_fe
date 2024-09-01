"use client";

import CheckBox from "@/components/atoms/CheckBox";
import { customFetch } from "@/utils/fetchClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { errorAlert } from "@/utils/alertFns";
import PrivacyDocument from "@/components/PrivacyDocument";
import ServiceDocument from "@/components/\bServiceDocument";

export default function Consent() {
  const consents = [
    {
      name: "이용 약관",
      type: "terms",
      mandatory: true,
    },
    {
      name: "개인정보 처리 방침",
      type: "privacy",
      mandatory: true,
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
      customFetch
        .put("user/process", {
          agreement: 1,
        })
        .then((res) => {
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
    <div className="w-full h-screen max-w-5xl p-2 mx-auto text-xl sm:text-base overflow-y-hidden">
      <p className="text-[1.1em] text-center mb-3">약관동의</p>
      <div className="w-full h-full mx-auto text-balance">
        {consents.map(({ name, type, mandatory }) => {
          const agreeType = type as keyof typeof agreements;
          const mandatoryText = mandatory ? "(필수)" : "(선택)";
          return (
            <div key={type} className="mb-3 max-h-[500px] h-2/5">
              <CheckBox
                name={`${mandatoryText} ${name}`}
                handleClick={() => handleCheckAgree(agreeType)}
                checked={agreements[agreeType]}
              />
              <div className="h-[calc(100%-24px)] mt-1 overflow-y-scroll scroll-visible rounded-lg border p-2">
                {type === "privacy" ? <PrivacyDocument /> : <ServiceDocument />}
              </div>
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
