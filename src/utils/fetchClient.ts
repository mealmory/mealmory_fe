import returnFetch, {
  FetchArgs,
  ReturnFetchDefaultOptions,
} from "return-fetch";
import Cookies from "js-cookie";
import { errorAlert } from "./alertFns";
type JsonRequestInit = Omit<NonNullable<FetchArgs[1]>, "body"> & {
  body?: object;
};

export type ResponseGenericBody<T> = Omit<
  Awaited<ReturnType<typeof fetch>>,
  keyof Body | "clone"
> & {
  body: T;
};

export type JsonResponse<T> = T extends object
  ? ResponseGenericBody<T>
  : ResponseGenericBody<unknown>;

const parseJsonSafely = (text: string): object | string => {
  try {
    return JSON.parse(text);
  } catch (e) {
    if ((e as Error).name !== "SyntaxError") {
      throw e;
    }

    return text.trim();
  }
};
export type ApiResponse<T> = {
  result: string;
  code: number;
  message: string;
  data: T;
};
export const returnFetchJson = (args?: ReturnFetchDefaultOptions) => {
  const fetch = returnFetch(args);

  return async <T>(
    url: FetchArgs[0],
    init?: JsonRequestInit
  ): Promise<JsonResponse<T>> => {
    const response = await fetch(url, {
      ...init,
      body: init?.body && JSON.stringify(init.body),
    });

    const body = parseJsonSafely(await response.text()) as T;

    return {
      headers: response.headers,
      ok: response.ok,
      redirected: response.redirected,
      status: response.status,
      statusText: response.statusText,
      type: response.type,
      url: response.url,
      body,
    } as JsonResponse<T>;
  };
};

export const fetchClient: <T>(
  url: FetchArgs[0],
  init?: JsonRequestInit
) => Promise<JsonResponse<ApiResponse<T>>> = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_BASEURL,
  interceptors: {
    async request(requestArgs) {
      const accessToken = Cookies.get("act");
      if (accessToken) {
        requestArgs[1] = {
          ...requestArgs[1],
          headers: {
            ...requestArgs[1]?.headers,
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      }
      return requestArgs;
    },
  },
});

export const fetchServer: <T>(
  url: FetchArgs[0],
  init?: JsonRequestInit
) => Promise<JsonResponse<ApiResponse<T>>> = returnFetchJson({
  baseUrl: "http://localhost:3000/api/",
});

export const fetcher = async <T>(
  url: FetchArgs[0],
  init?: JsonRequestInit,
  errorEffect?: () => void
) => {
  const res = await fetchClient<T>(url, init);
  const { code } = res.body;
  if (code === 1007) {
    const newResponse = await fetchServer<T>("auth/refresh", {
      method: "POST",
      credentials: "same-origin",
    });
    if (!newResponse.ok) {
      throw new Error("리프레시 요청 실패");
    }
    return newResponse;
  } else if (code === 1004 || code === 1005 || code === 1006) {
    errorEffect &&
      errorAlert(
        "사용자 인증에 실패했습니다. 다시 로그인 해 주세요.",
        "",
        errorEffect
      );
  }
  return res;
};
