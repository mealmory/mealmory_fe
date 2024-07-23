"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoScript = () => {
  const onLoad = () => {
    setTimeout(() => {
      window.Kakao.init(process.env.NEXT_PUBLIC_JS_SDK_KEY);
    }, 500);
  };

  return (
    <Script
      async
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
      integrity={process.env.NEXT_PUBLIC_INTEGRITY}
      crossOrigin="anonymous"
      onLoad={onLoad}
    />
  );
};

export default KakaoScript;
