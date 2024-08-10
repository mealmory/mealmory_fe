const ADMINISTRATORS = [
  process.env.NEXT_PUBLIC_JF as string,
  process.env.NEXT_PUBLIC_JB as string,
];

const userEmail =
  typeof window !== "undefined" ? localStorage.getItem("email") : null;
export const isAdmin =
  typeof userEmail === "string" && ADMINISTRATORS.includes(userEmail);
