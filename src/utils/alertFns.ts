import Swal from "sweetalert2";

type QuestionAlert = {
  afterEffect: () => void;
  title: string;
  text: string;
  confirmText: string;
  successTitle: string;
  successText: string;
};

export const questionAlert = ({
  afterEffect,
  title,
  text,
  confirmText,
  successText,
  successTitle,
}: QuestionAlert) => {
  Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#88858586",
    cancelButtonColor: "#eac407",
    confirmButtonText: confirmText,
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: successTitle,
        text: successText,
        icon: "success",
        allowOutsideClick: () => false,
      }).then((result) => {
        if (result.isConfirmed) {
          afterEffect();
        }
      });
    }
  });
};

export const errorAlert = (
  errTitle: string,
  errText: string,
  afterEffect: () => void
) => {
  Swal.fire({
    title: errTitle,
    text: errText,
    icon: "error",
  }).then(() => {
    afterEffect();
  });
};

export const successAlert = (
  title: string,
  text: string,
  afterEffect: () => void
) => {
  Swal.fire({
    title,
    text,
    icon: "success",
  }).then(() => {
    afterEffect();
  });
};
