import Link from "next/link";
import { HiChevronRight } from "@react-icons/all-files/hi/HiChevronRight";

const SERVICE_INFO_ITEMS = [
  { title: "서비스 이용 약관", link: "/service" },
  { title: "개인정보 처리방침", link: "/privacy" },
  { title: "오픈 라이선스", link: "/open-license" },
];

const ServiceInfoList = () => {
  return (
    <div className="w-full py-5 border-t-2 animate-float-2">
      <p className="text-center text-xl sm:text-2xl mb-2">서비스 정보</p>
      <div className="flex flex-col gap-2 w-full">
        {SERVICE_INFO_ITEMS.map(({ title, link }) => (
          <Link
            key={title}
            href={link}
            className=" w-full flex items-center justify-between p-4 rounded-xl shadow-border dark:bg-cusdarkbanana"
          >
            <p>{title}</p>
            <HiChevronRight
              className="text-cusorange font-bold"
              size={25}
              style={{}}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServiceInfoList;
