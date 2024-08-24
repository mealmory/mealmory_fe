import NoticeAddForm from "@/app/(sub)/notice/NoticeAddForm";
import LikeModalView from "../../LikeModalView";

export default function NoticeEditPage() {
  return (
    <LikeModalView>
      <NoticeAddForm isEdit />
    </LikeModalView>
  );
}
