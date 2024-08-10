import { isAdmin } from "@/utils/noticeFns";
import { BsPencilSquare } from "@react-icons/all-files/bs/BsPencilSquare";
import { BsXSquare } from "@react-icons/all-files/bs/BsXSquare";

const DetailAdminUseButtons = ({
  handleDeleteClick,
  handleEditClick,
}: {
  handleEditClick: () => void;
  handleDeleteClick: () => void;
}) => {
  return isAdmin ? (
    <div className="flex items-center gap-2 justify-end pr-2 mb-2 text-bold">
      <button
        onClick={handleEditClick}
        className="p-2 rounded-xl bg-cusorange text-white"
        title="수정"
      >
        <BsPencilSquare size={20} />
      </button>
      <button
        onClick={handleDeleteClick}
        className="p-2 rounded-xl bg-red-400 text-white"
        title="삭제"
      >
        <BsXSquare size={20} />
      </button>
    </div>
  ) : null;
};

export default DetailAdminUseButtons;
