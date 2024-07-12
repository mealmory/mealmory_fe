"use client";

import Input from "@/components/Input";
import SelectMenu from "@/components/auth/SelectMenu";
import UserProfileInfo from "@/components/userInfo/UserProfileInfo";
import { USER_INFO_FORM_LABEL } from "@/constants/userConstants";
import { useEffect, useState } from "react";

export default function Profile() {
  const [isEdit, setIdEdit] = useState(false);
  useEffect(() => {
    return setIdEdit(false);
  }, []);
  const data = {
    email: "anger@gmail.com",
    nickName: "분노 그 잡채",
    gender: "남",
    age: 20,
    weight: 70,
    height: 180,
    actLevel: 1,
    profile: "/tempImg.png",
  };
  const [selectedOption, setSelectedOption] = useState({
    gender: data.gender === "남" ? 1 : 2,
    actLevel: data.actLevel,
  });
  const [inputValue, setInputValue] = useState({
    nickName: data.nickName,
    age: data.age,
    height: data.height,
    weight: data.weight,
  });
  const btnClass = "shadow-border p-3 ";
  return (
    <div className="w-full min-h-screen h-max max-w-[360px] mx-auto flex flex-col justify-center p-1 gap-4">
      <UserProfileInfo
        profileData={{ email: data.email, image: data.profile }}
      />
      <form className="w-full flex flex-col gap-4">
        {[
          { label: "닉네임", name: "nickName", type: "string" },
          ...USER_INFO_FORM_LABEL.inputList,
        ].map(({ label, name, type }) => {
          const unit =
            name === "height" ? " (cm)" : name === "weight" ? " (kg)" : "";
          return (
            <Input
              key={label}
              label={label + unit}
              type={type}
              value={inputValue[name as keyof typeof inputValue]}
              disabled={!isEdit}
              handleChange={(e) => {
                setInputValue((prev) => ({
                  ...prev,
                  [name as keyof typeof inputValue]:
                    type === "number" ? Number(e.target.value) : e.target.value,
                }));
              }}
            />
          );
        })}
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
            disabled={!isEdit}
          />
        ))}
        {isEdit && (
          <div className="w-full flex gap-2">
            <button
              type="submit"
              className={btnClass + "bg-cuspoint text-cusorange flex-1"}
              onClick={(e) => {
                e.preventDefault();
                setIdEdit(false);
              }}
            >
              저장
            </button>
            <button
              type="button"
              className={btnClass + "text-gray-400 flex-1"}
              onClick={() => {
                setIdEdit(false);
              }}
            >
              취소
            </button>
          </div>
        )}
      </form>
      {!isEdit && (
        <button
          type="button"
          className="bg-cuspoint text-cusorange shadow-border p-3"
          onClick={() => setIdEdit(true)}
        >
          수정하기
        </button>
      )}
    </div>
  );
}
