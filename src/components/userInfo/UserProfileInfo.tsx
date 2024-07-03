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
      <Image
        src={image}
        width={107}
        height={107}
        className=" rounded-full"
        alt="나의 카카오 프로필 사진"
        priority
      />
      <div className=" text-gray-500 text-center dark:text-white">
        <p>{email}</p>
        {nickName && <p>{nickName}</p>}
      </div>
    </div>
  );
};

export default UserProfileInfo;
