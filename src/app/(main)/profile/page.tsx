"use client";

import Input from "@/components/Input";
import SelectMenu from "@/components/auth/SelectMenu";
import UserProfileInfo from "@/components/userInfo/UserProfileInfo";
import { USER_INFO_FORM_LABEL } from "@/constants/userConstants";
import { successAlert } from "@/utils/alertFns";
import { fetcher } from "@/utils/fetchClient";
import { getTimestamp } from "@/utils/timestamp";
import { useEffect, useState } from "react";

interface UserData {
  id: number;
  email: string;
  nickName: string;
  gender: number;
  age: number;
  weight: number;
  height: number;
  bmi: number;
  bmr: number;
  amr: number;
  activemass: number;
  profile: string;
}

export default function Profile() {
  const [isEdit, setIdEdit] = useState(false);
  const [userData, setUserData] = useState<UserData>();
  const [selectedOption, setSelectedOption] = useState({
    gender: 0,
    activemass: 0,
  });
  const [inputValue, setInputValue] = useState({
    nickName: "",
    age: 0,
    height: 0,
    weight: 0,
  });
  useEffect(() => {
    fetcher<UserData>(
      "user/info/search?" +
        new URLSearchParams({
          timestamp: getTimestamp().toString(),
        }),
      {
        method: "GET",
      }
    ).then((res) => {
      if (res.body.code === 0) {
        const { data } = res.body;
        setUserData(data);
        setSelectedOption({
          gender: data.gender,
          activemass: data.activemass,
        });
        setInputValue({
          nickName: data.nickName,
          age: data.age,
          weight: data.weight,
          height: data.height,
        });
      }
    });
    return () => {
      setIdEdit(false);
    };
  }, []);
  function handleEdit() {
    fetcher("user/info/edit", {
      method: "PUT",
      body: {
        timestamp: getTimestamp(),
        height: inputValue.height,
        weight: inputValue.weight,
      },
    }).then((res) => {
      if (res.body.code === 0) {
        successAlert(
          "수정 완료!",
          "프로필 데이터 수정을 완료하였습니다.",
          () => {
            setIdEdit(true);
          }
        );
      }
    });
  }
  const btnClass = "shadow-border p-3 ";
  return (
    <div className="w-full min-h-screen h-max max-w-[360px] mx-auto flex flex-col justify-center p-1 gap-4">
      {userData && (
        <UserProfileInfo
          profileData={{ email: userData.email, image: userData.profile }}
        />
      )}
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
                handleEdit();
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
