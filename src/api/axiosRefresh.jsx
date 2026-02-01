import api from "./axios";

let isRefreshing = false;
let queue = [];

export const setupInterceptors = (auth) => {
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        auth.refreshToken
      ) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            queue.push((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const newAccess = await auth.refreshAccessToken();
        isRefreshing = false;

        queue.forEach((cb) => cb(newAccess));
        queue = [];

        if (newAccess) {
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest);
        }
      }

      return Promise.reject(error);
    },
  );
};
