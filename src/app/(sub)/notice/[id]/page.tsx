export default function NoticeDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = {
    title: "4월 공지사항",
    date: "2024-04-05",
    description:
      "adsffasdfsadfadsfhgjavrewouiyfrbeavbaeuiybvaeirubaehbkvuayerbvafliuarbefilaubfilawifuhwaikfb",
  };
  return (
    <main className="w-full h-full ">
      <div className="w-full h-full min-h-[calc(100vh-55px)] sm:rounded-xl shadow-border overflow-hidden">
        <div className="border-b bg-cusbanana p-5">
          <h1 className=" sm:text-2xl">{data.title}</h1>
          <p>{data.date}</p>
        </div>
        <div className="w-full h-full p-3">
          <p className=" break-words">{data.description}</p>
        </div>
      </div>
    </main>
  );
}
