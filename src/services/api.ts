import axios from 'axios';

import { getSession } from 'next-auth/react';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8443';

const Api = () => {
  const defaultOptions = {
    baseURL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session) {
      console.log(session);
      request.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(`error`, error);
    },
  );

  return instance;
};

export default Api();