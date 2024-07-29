import Image from "next/image";

interface UserProfileInfoProps {
  profileData: {
    image: string;
    nickName?: string;
    email: string;
  };
}

const UserProfileInfo = ({ profileData }: UserProfileInfoProps) => {
  const { image, email, nickName } = profileData;
  return (
    <div className="flex flex-col items-center gap-2">
      {image ? (
        <Image
          src={image === "0" ? "/mealmory_logo.svg" : image}
          width={107}
          height={107}
          className=" rounded-full"
          alt="나의 카카오 프로필 사진"
          priority
        />
      ) : (
        <div className="w-[107px] h-[96.5px] bg-zinc-500 rounded-full"></div>
      )}
      <div className=" text-gray-500 text-center dark:text-white">
        {email ? <p>{email}</p> : <SkeletonP className="mb-2" />}
        {nickName ? <p>{nickName}</p> : <SkeletonP />}
      </div>
    </div>
  );
};

export default UserProfileInfo;

const SkeletonP = ({ className }: { className?: string }) => (
  <p
    className={
      "bg-zinc-500 p-2 w-[155px] h-[20px] rounded-lg " + (className ?? "")
    }
  ></p>
);
