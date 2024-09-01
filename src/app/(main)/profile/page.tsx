"use client";

import Input from "@/components/atoms/Input";
import SelectMenu from "@/components/SelectMenu";
import UserProfileInfo from "@/components/UserProfileInfo";
import { USER_INFO_FORM_LABEL } from "@/constants/userConstants";
import { errorAlert, successAlert } from "@/utils/alertFns";
import { customFetch } from "@/utils/fetchClient";
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
    customFetch.get<UserData>("user/info/search").then((res) => {
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
    const changedInput = (() => {
      const result: { [key: string]: number | string } = {};
      Object.entries(inputValue).forEach(([key, value]) => {
        const Key = key as keyof typeof inputValue;
        if (userData && userData[Key] !== value) {
          result[Key] = value;
        }
      });
      Object.entries(selectedOption).forEach(([key, value]) => {
        const Key = key as keyof typeof selectedOption;
        if (userData && userData[Key] !== value) {
          result[Key] = value;
        }
      });
      return result;
    })();
    const editDTO = {
      ...changedInput,
    };
    customFetch.put("user/info/edit", { ...editDTO }).then((res) => {
      if (res.body.code === 0) {
        successAlert(
          "수정 완료!",
          "프로필 데이터 수정을 완료하였습니다.",
          () => {
            setIdEdit(false);
          }
        );
      } else {
        errorAlert("수정에 실패했습니다.", "잠시 후 다시 시도해주세요.", () => {
          setIdEdit(false);
        });
      }
    });
  }
  const btnClass = "shadow-border p-3 ";
  return (
    <div className="w-full min-h-screen h-max max-w-[360px] mx-auto flex flex-col justify-center p-1 gap-4">
      <UserProfileInfo
        profileData={{ email: userData?.email, image: userData?.profile }}
      />
      <form
        className="flex flex-col w-full gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit();
        }}
      >
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
            handleClick={(optionValue) => {
              setSelectedOption((prev) => ({
                ...prev,
                [props.name as keyof typeof selectedOption]: optionValue,
              }));
            }}
            disabled={!isEdit}
          />
        ))}
        {isEdit && (
          <div className="flex w-full gap-2">
            <button
              type="submit"
              className={btnClass + "bg-cuspoint text-cusorange flex-1"}
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
          className="p-3 bg-cuspoint text-cusorange shadow-border"
          onClick={() => setIdEdit(true)}
        >
          수정하기
        </button>
      )}
    </div>
  );
}
