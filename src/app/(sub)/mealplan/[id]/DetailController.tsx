"use client";

import { useRouter } from "next/navigation";

const DetailController = ({
  className,
  id,
}: {
  className: string;
  id: string;
}) => {
  const router = useRouter();

  return (
    <div className={className}>
      <Button
        name="수정"
        handler={() => {
          router.push(`/mealplan/edit/${id}`);
        }}
      />
      <Button
        name="삭제"
        handler={() => {
          // fetch delete
          router.back();
        }}
      />
    </div>
  );
};

const Button = ({ name, handler }: { name: string; handler: () => void }) => {
  return (
    <button
      className=" border-2 font-bold flex-1 p-2 text-gray-400"
      onClick={handler}
    >
      {name}
    </button>
  );
};

export default DetailController;
