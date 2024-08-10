"use client";

import Modal from "@/components/modal/Modal";
import NoticeAddForm from "@/components/modal/notice/NoticeAddForm";

export default function NoticeEditModal() {
  return (
    <Modal>
      <NoticeAddForm isEdit />
    </Modal>
  );
}
