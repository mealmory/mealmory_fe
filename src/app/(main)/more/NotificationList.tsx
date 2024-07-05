"use client";

import Pagination from "@/components/main/Pagination";
import { useEffect, useState } from "react";
type Notice = { id: number; title: string; description: string; date: string };
const VIEW_NOTICE_LENGTH = 5;

const NotificationList = () => {
  const [data, setData] = useState<Notice[] | undefined>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:3000/api/dummy/notice/search")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  const noticeList = data?.slice(
    page * VIEW_NOTICE_LENGTH - VIEW_NOTICE_LENGTH,
    page * VIEW_NOTICE_LENGTH
  );

  const pageLength = data ? Math.ceil(data.length / VIEW_NOTICE_LENGTH) : 1;

  return (
    <div className="w-full flex flex-col items-center gap-2 py-3">
      {!noticeList || noticeList.length < 1 ? (
        <div className="w-full rounded-xl shadow-border p-3 sm:p-6 flex justify-center items-center">
          <p>공지사항이 없습니다.</p>
        </div>
      ) : (
        noticeList.map(({ id, title, description, date }) => (
          <div
            key={id}
            className="w-full flex items-center justify-between rounded-xl shadow-border p-3 sm:p-6"
          >
            <div>
              <p className="text-xl sm:text-2xl w-full">{title}</p>
              <p className="sm:text-sm text-xs block w-full max-w-[210px] text-ellipsis">
                {description}
              </p>
            </div>
            <p className="sm:text-sm text-xs text-nowrap">{date}</p>
          </div>
        ))
      )}
      {pageLength ? (
        <Pagination page={page} setPage={setPage} pageLength={pageLength} />
      ) : (
        0
      )}
    </div>
  );
};

export default NotificationList;
