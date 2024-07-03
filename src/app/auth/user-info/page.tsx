"use client";

import Input from "@/components/Input";
import SelectMenu from "@/components/auth/SelectMenu";
import UserProfileInfo from "@/components/userInfo/UserProfileInfo";
import { USER_INFO_FORM_LABEL } from "@/constants/userConstants";
import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";

export default function UserInfo() {
  const data = {
    image: "/tempImg.png",
    email: "anger@gmail.com",
    nickname: "분노 그 잡채",
  };
  const [selectedOption, setSelectedOption] = useState({
    gender: 0,
    actLevel: 0,
  });
  const [inputValue, setInputValue] = useState({
    age: 0,
    height: 0,
    weight: 0,
  });
  const router = useRouter();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // 값 확인하고 fetch
    router.push("/main");
  }
  return (
    <div className="w-full h-full flex flex-col max-w-[360px] mx-auto p-2 pt-12">
      <UserProfileInfo profileData={data} />
      <form onSubmit={handleSubmit} className="h-full flex flex-col gap-4 pb-2">
        {USER_INFO_FORM_LABEL.inputList.map(({ label, name, type }) => (
          <Input
            key={name}
            label={label}
            type={type}
            value={inputValue[name as keyof typeof inputValue]}
            handleChange={(e) => {
              setInputValue((prev) => ({
                ...prev,
                [name as keyof typeof inputValue]:
                  type === "number" ? Number(e.target.value) : e.target.value,
              }));
            }}
          />
        ))}
        {USER_INFO_FORM_LABEL.selectList.map((props) => (
          <SelectMenu
            key={props.label}
            {...props}
            value={selectedOption[props.name as keyof typeof selectedOption]}
            handleChange={(e) => {
              const event = e as { label: string; value: number };
              setSelectedOption((prev) => ({
                ...prev,
                [props.name as keyof typeof selectedOption]: event.value,
              }));
            }}
          />
        ))}
        <button
          type="submit"
          className="bg-cuspoint text-cusorange shadow-border rounded-xl w-full p-3 font-semibold  mt-4"
        >
          저장하기
        </button>
      </form>
    </div>
  );
}
