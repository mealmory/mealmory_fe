"use client";

import Pagination from "@/components/Pagination";
import useAmdin from "@/store/adminStore";
import { customFetch } from "@/utils/fetchClient";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
const AdminUseButton = dynamic(
  () => import("@/app/(main)/_components/AdminUseButton"),
  { ssr: false }
);
type Notice = { id: number; title: string; date: string };
interface NoticeResponse {
  flag: 0 | 1;
  count: number;
  notice: Array<Notice>;
}

const NotificationList = () => {
  const [noticeData, setNoticeData] = useState<Array<Notice>>([]);
  const [newNotice, setNewNotice] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const { isAdmin, checkAdmin } = useAmdin();
  useEffect(() => {
    checkAdmin();
  }, []);
  useEffect(() => {
    customFetch
      .get<NoticeResponse>("notice/search", { page: page })
      .then((res) => {
        if (res.body.code === 0) {
          if (res.body.data.flag === 1) {
            setNewNotice(true);
          }

          setNoticeData(
            res.body.data.notice.toSorted(
              (a, b) => +new Date(b.date) - +new Date(a.date)
            )
          );
          setMaxPage(res.body.data.count);
        }
      });
  }, [page]);

  return (
    <div className="w-full flex flex-col items-center gap-2 py-3 animate-float">
      <div className="w-full relative">
        <p className="text-xl sm:text-2xl mb-2 text-center">공지사항</p>
        {isAdmin && <AdminUseButton />}
      </div>
      {noticeData.length < 1 ? (
        <div className="w-full rounded-xl shadow-border p-3 sm:p-6 flex justify-center items-center">
          <p>공지사항이 없습니다.</p>
        </div>
      ) : (
        noticeData.map(({ id, title, date }, idx) => (
          <Link
            href={`/notice/${id}`}
            key={id}
            className={
              "w-full flex items-center justify-between rounded-xl shadow-border p-3 sm:p-6 dark:bg-cusdarkbanana "
            }
          >
            <div className="flex items-center gap-2">
              <p className="text-lg sm:text-xl w-full point-value">{title}</p>
              {newNotice && idx === 0 ? (
                <div className="bg-cusorange text-white text-xs text-center rounded-[5px] pt-[2px] px-[1px]">
                  <p className="w-[18px] h-[18px]">N</p>
                </div>
              ) : null}
            </div>
            <p className="sm:text-sm text-xs text-nowrap">{date}</p>
          </Link>
        ))
      )}
      {maxPage > 1 && (
        <Pagination page={page} setPage={setPage} pageLength={maxPage} />
      )}
    </div>
  );
};

export default NotificationList;
