import Swal from "sweetalert2";

type QuestionAlert = {
  afterEffect: () => void;
  errotEffect?: () => void;
  title: string;
  text?: string;
  confirmText: string;
  cancelText?: string;
};

export const questionAlert = async ({
  afterEffect,
  title,
  text,
  confirmText,
  cancelText,
  errotEffect,
}: QuestionAlert) => {
  try {
    const result = await Swal.fire({
      title,
      text,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#88858586",
      cancelButtonColor: "#eac407",
      confirmButtonText: confirmText,
      cancelButtonText: cancelText ?? "취소",
      allowOutsideClick: () => false,
    });
    if (result.isConfirmed) {
      afterEffect();
    }
  } catch (error) {
    errotEffect && errotEffect();
  }
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
    allowOutsideClick: () => false,
  }).then((result) => {
    if (result.isConfirmed && afterEffect) afterEffect();
    return result;
  });
};
