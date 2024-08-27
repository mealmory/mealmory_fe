import returnFetch, {
  FetchArgs,
  ReturnFetchDefaultOptions,
} from "return-fetch";
import Cookies from "js-cookie";
import { getTimestamp } from "./timeFns";
import { redirectUri, scope } from "@/app/auth/kakaoConst";
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

export const fetcher = async <T>(url: FetchArgs[0], init?: JsonRequestInit) => {
  const res = await fetchClient<T>(url, init);
  const { code } = res.body;
  if (code === 1007) {
    const newResponse = await fetchServer<T>("auth/refresh", {
      method: "POST",
      credentials: "same-origin",
    });
    if (newResponse.body.code === 0) {
      const secondRes = await fetchClient<T>(url, init);
      if (secondRes.body.code === 0) return secondRes;
      return newResponse;
    } else {
      window.Kakao &&
        window.Kakao.Auth.authorize({
          redirectUri,
          scope,
        });
    }
  }
  return res;
};

function authErrorHandler(code: number) {
  if (code !== 1004 && code !== 1005 && code !== 1006 && code !== 4004) return;
  const authErroTitle =
    code === 1004
      ? "로그인 세션이 만료되었습니다."
      : code === 1005 || code === 1006 || code === 4004
      ? "인증 오류가 발생했습니다."
      : "오류가 발생했습니다.";
  const authErroText = "다시 로그인 해주세요.";
  errorAlert(authErroTitle, authErroText, () => {
    Cookies.remove("rft");
    Cookies.remove("act");
    window.location.href = "/auth";
  });
}

class Fetcher {
  private async fetcher<T>(url: FetchArgs[0], init?: JsonRequestInit) {
    const res = await fetchClient<T>(url, init);
    const { code } = res.body;
    if (code === 1007 || code === 1004) {
      const refreshRes = await this.refresh();
      if (refreshRes.body.code === 0) {
        const secondRes = await fetchClient<T>(url, init);

        if (secondRes.body.code === 0) return secondRes;
      }
    } else if (code === 1005 || code === 1006) {
      authErrorHandler(code);
    }
    return res;
  }

  async refresh() {
    return fetchServer("auth/refresh", {
      method: "POST",
      credentials: "same-origin",
    }).then((res) => {
      const { code } = res.body;
      authErrorHandler(code);
      return res;
    });
  }

  get<T>(
    url: string,
    query?: { [key: string | number]: string | number },
    init?: JsonRequestInit
  ) {
    const params: { [key: string]: string } = {
      timestamp: getTimestamp().toString(),
    };
    let leng = 0;
    for (let key in query) {
      params[key] = String(query[key]);
      leng++;
    }

    const fullUrl = url + "?" + new URLSearchParams(params);

    return this.fetcher<T>(fullUrl, { ...init, method: "GET" });
  }

  post<T>(url: string, body: object, init?: JsonRequestInit) {
    return this.fetcher<T>(url, {
      ...init,
      method: "POST",
      headers: {
        ...(init?.headers || {}),
      },
      body: { timestamp: getTimestamp(), ...body },
    });
  }

  put<T>(url: string, body: object, init?: JsonRequestInit) {
    return this.fetcher<T>(url, {
      ...init,
      method: "PUT",
      headers: {
        ...(init?.headers || {}),
      },
      body: { timestamp: getTimestamp(), ...body },
    });
  }

  delete<T>(url: string, body: object, init?: JsonRequestInit) {
    return this.fetcher<T>(url, {
      ...init,
      method: "DELETE",
      body: { timestamp: getTimestamp(), ...body },
    });
  }
}

export const customFetch = new Fetcher();
