import { getTimestamp } from "@/utils/timestamp";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function NoticeDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const noticeData = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}notice/info?${new URLSearchParams({
      timestamp: getTimestamp().toString(),
      id: id,
    })}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${cookies().get("act")?.value}`,
      },
    }
  )
    .then((res) => res.json())
    .then((body) => {
      if (body.code === 0) return body.data[0];
      throw new Error("존재하지 않는 공지사항");
    })
    .catch((err) => {
      return redirect("/more");
    });

  return (
    <main className="w-full h-full ">
      <div className="w-full h-full min-h-[calc(100vh-55px)] sm:rounded-xl shadow-border overflow-hidden">
        <div className="border-b bg-cusbanana p-5">
          <h1 className=" sm:text-2xl">{noticeData.title}</h1>
          <p>{noticeData.date}</p>
        </div>
        <div className="w-full h-full p-3">
          <p className=" break-words">{noticeData.description}</p>
        </div>
      </div>
    </main>
  );
}
