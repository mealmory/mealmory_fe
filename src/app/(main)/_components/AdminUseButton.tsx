import Link from "next/link";

const AdminUseButton = () => {
  return (
    <Link
      className=" absolute right-2 top-1/2 -translate-y-2/3 shadow-border rounded-xl p-2 bg-cusorange text-white"
      href="/notice/add"
      scroll={false}
    >
      공지 추가
    </Link>
  );
};

export default AdminUseButton;
