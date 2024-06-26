import Image from "next/image";

export default function Root() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <Image
        src="/mealmory_logo.svg"
        alt="밀모리 로고"
        width={200}
        height={100}
        className=" mb-4"
      />
      <h1 className=" text-4xl">MealMory</h1>
      <h2 className=" text-xl">식사의 추억</h2>
    </div>
  );
}
