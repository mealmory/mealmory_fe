import returnFetch, {
  FetchArgs,
  ReturnFetchDefaultOptions,
} from "return-fetch";
import Cookies from "js-cookie";
import { getTimestamp } from "./timestamp";
import { redirectUri, scope } from "@/app/auth/kakaoConst";
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

class Fetcher {
  private clientSideBaseUrl: string;
  private serverSideBaseUrl: string;

  constructor() {
    this.clientSideBaseUrl = process.env.NEXT_PUBLIC_BASEURL || "";
    this.serverSideBaseUrl = "http://localhost:3000/api/";
  }

  private async requestClient<T>(
    url: FetchArgs[0],
    init?: JsonRequestInit
  ): Promise<JsonResponse<ApiResponse<T>>> {
    const fetch = returnFetchJson({
      baseUrl: this.clientSideBaseUrl,
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
    return fetch(url, init);
  }
  private async requestServer<T>(
    url: FetchArgs[0],
    init?: JsonRequestInit
  ): Promise<JsonResponse<ApiResponse<T>>> {
    const fetch = returnFetchJson({
      baseUrl: this.serverSideBaseUrl,
    });
    return fetch(url, init);
  }
  private async fetcher<T>(url: FetchArgs[0], init?: JsonRequestInit) {
    const res = await this.requestClient<T>(url, init);
    const { code } = res.body;
    if (code === 1007) {
      const newResponse = await this.requestServer<T>("auth/refresh", {
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

    const fullUrl = leng > 0 ? url + "?" + new URLSearchParams(params) : url;
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
