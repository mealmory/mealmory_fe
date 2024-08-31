"use client";

import { customFetch } from "@/utils/fetchClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { errorAlert } from "@/utils/alertFns";
import dynamic from "next/dynamic";
import { storageSet } from "@/utils/storageFns";
import useAmdin from "@/store/adminStore";

const DetailAdminUseButtons = dynamic(
  () => import("@/app/(sub)/notice/[id]/DetilAdminUseButtons")
);

interface NoticeDetail {
  title: string;
  date: string;
  description: string;
  id: number;
}

export default function NoticeDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [noticeData, setNoticeData] = useState<NoticeDetail>();
  const { isAdmin, checkAdmin } = useAmdin();
  const router = useRouter();
  useEffect(() => {
    checkAdmin();
    customFetch
      .get<NoticeDetail[]>("notice/info", { id: id })
      .then((res) => {
        if (res.body.code === 0) {
          setNoticeData(res.body.data[0]);
        } else {
          throw new Error("존재하지 않는 공지사항");
        }
      })
      .catch((err) => {
        return router.back();
      });
    return () => {
      setNoticeData(undefined);
    };
  }, []);

  function handleEditClick() {
    if (isAdmin && noticeData) {
      storageSet("ntl", noticeData.title);
      storageSet("nds", noticeData.description);
      storageSet("ndx", noticeData.id.toString());
      storageSet("ndt", noticeData.date);
      router.push("/notice/edit", { scroll: false });
    }
  }

  function handleDeleteClick() {
    if (isAdmin && noticeData) {
      customFetch.delete("notice/delete", { id: noticeData.id }).then((res) => {
        if (res.body.code === 0) router.back();
        else {
          errorAlert("공지사항 삭제에 실패했습니다.", "");
        }
      });
    }
  }

  return (
    <main className="w-full h-full ">
      {isAdmin && (
        <DetailAdminUseButtons
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
        />
      )}
      <div className="w-full h-full min-h-[calc(100vh-55px)] sm:rounded-xl shadow-border overflow-hidden">
        <div className="border-b bg-cusbanana p-5">
          <h1 className=" sm:text-2xl">{noticeData?.title}</h1>
          <p className="text-end">{noticeData?.date}</p>
        </div>
        <div className="w-full h-full p-3">
          <p className=" break-words">{noticeData?.description}</p>
        </div>
      </div>
    </main>
  );
}
