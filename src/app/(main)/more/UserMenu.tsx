"use client";

import { questionAlert, successAlert } from "@/utils/alertFns";
import { fetcher } from "@/utils/fetchClient";
import { getTimestamp } from "@/utils/timestamp";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const UserMenu = () => {
  const router = useRouter();
  const cookies = Cookies;
  function handleSignOut() {
    questionAlert({
      afterEffect: () => {
        fetcher("user/info/delete", {
          method: "DELETE",
          body: {
            timestamp: getTimestamp(),
          },
        }).then((res) => {
          if (res.body.code !== 0) throw new Error("탈퇴 실패");
        });
      },
      title: "정말로 회원 탈퇴를 진행하시겠습니까?",
      text: "회원을 탈퇴하면 기존에 저장된 식단기록을 잃습니다.",
      confirmText: "탈퇴",
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "회원 탈퇴가 성공적으로 완료되었습니다.",
            text: "그동안 밀모리를 이용해 주셔서 감사합니다.",
            icon: "success",
            allowOutsideClick: () => false,
          }).then(() => {
            cookies.remove("act");
            cookies.remove("rft");
            router.replace("/");
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          title: "회원 탈퇴에 실패했습니다.",
          text: "잠시 후 다시 시도해 주세요.",
          icon: "error",
          allowOutsideClick: () => false,
        });
      });
  }
  return (
    <div className="w-full mt-8">
      <button
        className="rounded-xl shadow-border p-3 px-5 sm:mx-0 mx-auto"
        onClick={handleSignOut}
      >
        회원 탈퇴
      </button>
    </div>
  );
};

export default UserMenu;
