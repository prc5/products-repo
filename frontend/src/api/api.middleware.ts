import axios from "axios";

import { appEnvironment } from "../config/environment.config";
import { TOKEN_STORAGE_FIELD } from "../constant/auth.constant";

/**
 * Api middleware.
 * Used to get developer-friendly syntax and provide default parameters
 * to requests
 * @param {{headers: {}, url: string}} params
 * @returns [payload, error, status]
 */

interface ParamsProps {
  headers?: HeadersInit;
  url: string;
  method: "post" | "patch" | "put" | "delete" | "get";
  data?: any;
}

interface ErrorProps {
  message: string;
  response: any;
  request: any;
}

type AbortControllersType = {
  [key: string]: any;
};

const { CancelToken } = axios;
const abortControllers: AbortControllersType = {};

const fetchMiddleware = async (params: ParamsProps): Promise<[any, any, any]> => {
  const token = await localStorage.getItem(TOKEN_STORAGE_FIELD);
  return new Promise((resolve) => {
    const { apiUrl } = appEnvironment;

    const isFormData = params.data instanceof FormData;
    const headers: HeadersInit = handleHeaders(token, params, isFormData);
    const cancelToken = handleCancelDuplicatedRequest(apiUrl, params);
    const completeUrl = apiUrl + params.url;
    const data = handlePrepareData(params.data, isFormData);

    return axios({
      ...params,
      url: completeUrl,
      data,
      headers,
      cancelToken,
    })
      .then(({ data, status }: any) => {
        if (data?.error) {
          return resolve([null, { message: data.error }, { status }]);
        }
        return resolve([data, null, { status }]);
      })
      .catch((err: any) => {
        const status = handleStatus(err);
        const error = handleErrors(err.response?.data || err);
        const isCanceled = err.message === "cancel";

        return resolve([null, error, { status, isCanceled }]);
      });
  });
};

export default fetchMiddleware;

function handlePrepareData(payload: any, isFormData: boolean) {
  let data = undefined;
  if (isFormData) {
    data = payload;
  } else if (payload) {
    data = JSON.stringify(payload);
  }
  return data;
}

function handleHeaders(token: string | null, params: ParamsProps, isFormData: boolean) {
  const headers: HeadersInit = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  Object.assign(headers, params.headers);

  return headers;
}

function handleCancelDuplicatedRequest(apiUrl: string, params: ParamsProps) {
  const abortName = apiUrl + params.url.split("?")[0];

  if (!abortControllers[abortName]) {
    abortControllers[abortName] = CancelToken.source();
  } else {
    abortControllers[abortName].cancel("Request has been canceled");
    delete abortControllers[abortName];
  }

  const abortToken = abortControllers[abortName];

  return abortToken?.token;
}

function handleErrors(error: ErrorProps) {
  if (error.message === "cancel") {
    return new Error("Request canceled");
  } else {
    return error;
  }
}

function handleStatus({ response, request }: ErrorProps) {
  if (response) {
    return response?.status;
  } else if (request) {
    return request?.status;
  }
  return 0;
}
