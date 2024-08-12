import { ReactNode } from "react";

const LikeModalView = ({
  children,
  maxContent,
  maxWidth,
}: {
  children: ReactNode;
  maxContent?: boolean;
  maxWidth?: boolean;
}) => {
  return (
    <div className="bg-black bg-opacity-35 fixed left-0 top-0 w-screen h-screen flex justify-center items-center">
      <div
        className={
          "w-full h-full overflow-hidden bg-white dark:bg-cusdark sm:rounded-2xl " +
          (maxContent ? "sm:max-h-[680px] sm:h-max " : "sm:h-[680px] ") +
          (maxWidth ? "md:w-max" : "md:w-[360px]")
        }
      >
        {children}
      </div>
    </div>
  );
};

export default LikeModalView;
