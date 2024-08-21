"use client";

import Input from "@/components/Input";
import SelectMenu from "@/components/auth/SelectMenu";
import UserProfileInfo from "@/components/userInfo/UserProfileInfo";
import { USER_INFO_FORM_LABEL } from "@/constants/userConstants";
import { errorAlert } from "@/utils/alertFns";
import { fetcher } from "@/utils/fetchClient";
import { storageGet } from "@/utils/storageFns";
import { getTimestamp } from "@/utils/timestamp";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";

export default function UserInfo() {
  const [userData, setUserData] = useState<{
    image?: string;
    email?: string;
    nickName?: string;
  }>({
    image: undefined,
    email: undefined,
    nickName: undefined,
  });
  const [selectedOption, setSelectedOption] = useState({
    gender: 0,
    activemass: 0,
  });
  const [inputValue, setInputValue] = useState({
    age: 0,
    height: 0,
    weight: 0,
  });
  useEffect(() => {
    setTimeout(async () => {
      const newData = {
        image: await storageGet("profile"),
        email: await storageGet("email"),
        nickName: await storageGet("nickName"),
      };
      setUserData({
        image: newData.image,
        email: newData.email,
        nickName: newData.nickName,
      });
    }, 100);
  }, []);
  const router = useRouter();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetcher("user/info/add", {
      method: "POST",
      body: {
        timestamp: getTimestamp(),
        gender: selectedOption.gender,
        activemass: selectedOption.activemass,
        age: inputValue.age,
        weight: inputValue.weight,
        height: inputValue.height,
      },
    })
      .then((res) => {
        if (res.body.code === 0) {
          fetcher("user/process", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              timestamp: getTimestamp(),
              collect: 1,
            },
          }).then((res) => {
            if (res.body.code === 0) {
              router.replace("/home");
            }
          });
        }
      })
      .catch((e: Error) => {
        errorAlert(
          "프로필 저장에 실패했습니다.",
          "잠시 후 다시 시도해 주세요",
          () => {
            router.refresh();
          }
        );
      });
  }
  return (
    <div className="w-full h-full flex flex-col max-w-[360px] mx-auto p-2 pt-12">
      <UserProfileInfo profileData={userData} />
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
            handleClick={(optionValue) => {
              setSelectedOption((prev) => ({
                ...prev,
                [props.name as keyof typeof selectedOption]: optionValue,
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
