import { ReactNode } from "react";

const Section = ({
  children,
  titleHeader,
  className,
}: {
  children: ReactNode;
  titleHeader?: string;
  className?: string;
}) => {
  return (
    <div className={"w-full " + (className ?? "")}>
      {titleHeader && <p>{titleHeader}</p>}
      {children}
    </div>
  );
};

export default Section;
