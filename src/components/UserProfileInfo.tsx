import Image from "next/image";

interface UserProfileInfoProps {
  profileData: {
    image?: string;
    nickName?: string;
    email?: string;
  };
}

const UserProfileInfo = ({ profileData }: UserProfileInfoProps) => {
  const { image, email, nickName } = profileData;
  const loading = image === undefined;
  return (
    <div className="flex flex-col items-center gap-2">
      {!loading ? (
        <Image
          src={image === "0" ? "/defaultProfile.jpg" : image}
          width={107}
          height={107}
          className="border border-gray-200 rounded-full "
          alt="프로필 사진"
          quality={100}
          priority
        />
      ) : (
        <div className="w-[107px] h-[96.5px] bg-zinc-500 rounded-full"></div>
      )}
      <div className="text-center text-gray-500 dark:text-white">
        {!loading ? <p>{email}</p> : <SkeletonP className="mb-2" />}
        {!loading ? nickName && <p>{nickName}</p> : <SkeletonP />}
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
