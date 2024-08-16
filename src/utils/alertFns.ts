import Swal from "sweetalert2";

type QuestionAlert = {
  afterEffect: () => void;
  title: string;
  text?: string;
  confirmText: string;
  cancelText?: string;
};

export const questionAlert = ({
  afterEffect,
  title,
  text,
  confirmText,
  cancelText,
}: QuestionAlert) => {
  return Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#88858586",
    cancelButtonColor: "#eac407",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText ?? "취소",
    preConfirm: afterEffect,
    allowOutsideClick: () => false,
  });
};

export const errorAlert = (
  errTitle: string,
  errText: string,
  afterEffect?: () => void
) => {
  Swal.fire({
    title: errTitle,
    text: errText,
    icon: "error",
  }).then((result) => {
    afterEffect && afterEffect();
    return result;
  });
};

export const successAlert = (
  title: string,
  text: string,
  afterEffect?: () => void
) => {
  Swal.fire({
    title,
    text,
    icon: "success",
  }).then((result) => {
    afterEffect && afterEffect();
    return result;
  });
};
