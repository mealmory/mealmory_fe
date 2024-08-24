"use client";

import Modal from "@/app/@modal/Modal";
import NoticeAddForm from "@/app/(sub)/notice/NoticeAddForm";

export default function NoticeEditModal() {
  return (
    <Modal>
      <NoticeAddForm isEdit />
    </Modal>
  );
}
