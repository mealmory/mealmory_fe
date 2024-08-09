"use client";

import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { questionAlert } from "@/utils/alertFns";
import { customFetch } from "@/utils/fetchClient";
import { isAdmin } from "@/utils/noticeFns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const NoticeAddForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!isAdmin) router.back();
    return () => {
      setTitle("");
      setDescription("");
    };
  }, []);
  function handleSaveClick() {
    if (title.length > 0 && description.length > 0) {
      questionAlert({
        title: "공지사항을 추가하시겠습니까?",
        text: "",
        confirmText: "추가",
        afterEffect: () => {
          customFetch
            .post("notice/add", {
              title,
              description,
            })
            .then((res) => {
              if (res.body.code !== 0) {
                throw new Error();
              }
            });
        },
      })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "성공적으로 공지사항을 추가하였습니다.",
              icon: "success",
            });
          }
        })
        .catch((e) => {
          Swal.fire({
            title: "공지사항을 추가하지 못했습니다.",
            icon: "error",
          });
        });
    }
  }
  return (
    <div className="w-full h-full p-1 flex flex-col gap-2">
      <button
        className="mr-2 w-max text-2xl self-end"
        onClick={() => router.back()}
      >
        x
      </button>
      <Input
        type="text"
        label="제목"
        value={title}
        handleChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        value={description}
        label="본문"
        handleChange={(e) => setDescription(e.target.value)}
        className="flex-1"
      />
      <button onClick={handleSaveClick}>추가하기</button>
    </div>
  );
};

export default NoticeAddForm;
