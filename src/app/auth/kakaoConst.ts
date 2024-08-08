export const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT;
export const scope = [
  "profile_nickname",
  "profile_image",
  "account_email",
].join(",");
