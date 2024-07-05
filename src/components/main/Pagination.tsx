import page from "@/app/page";
import { BsChevronLeft } from "@react-icons/all-files/bs/BsChevronLeft";
import { BsChevronRight } from "@react-icons/all-files/bs/BsChevronRight";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface PaginationProps {
  pageLength?: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ page, pageLength, setPage }: PaginationProps) => {
  function handlePaginationClick(isNext: boolean) {
    if (pageLength)
      setPage((prev) => {
        if (isNext) {
          if (prev < pageLength) return prev + 1;
        } else {
          if (prev > 1) return prev - 1;
        }
        return prev;
      });
  }
  return (
    <>
      {pageLength && pageLength > 1 ? (
        <div className="w-full flex items-center justify-center gap-2 border-t p-2">
          <Button
            disabled={page <= 1}
            dot={<BsChevronLeft className="text-black" />}
            handleButtonClick={() => handlePaginationClick(false)}
          />
          <ul className="flex gap-2">
            {Array.from({ length: pageLength }, (_, i) => i + 1).map((num) => (
              <li key={num}>
                <Button
                  className={
                    "rounded-lg w-6 sm:block " +
                    (num === page
                      ? "text-white bg-cusorange font-bold block"
                      : "hidden")
                  }
                  dot={num}
                  handleButtonClick={() => setPage(num)}
                />
              </li>
            ))}
          </ul>
          <Button
            disabled={page === pageLength}
            dot={<BsChevronRight className="text-black" />}
            handleButtonClick={() => handlePaginationClick(true)}
          />
        </div>
      ) : null}
    </>
  );
};
export default Pagination;
const Button = ({
  disabled,
  dot,
  handleButtonClick,
  className,
}: {
  disabled?: boolean;
  handleButtonClick: () => void;
  dot: number | ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={"cursor-pointer disabled:invisible " + (className ?? "")}
      disabled={disabled}
      onClick={handleButtonClick}
    >
      {dot}
    </button>
  );
};
