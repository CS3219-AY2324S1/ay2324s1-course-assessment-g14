import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const questionhttpClient = axios.create({
  baseURL: process.env.REACT_APP_QUESTION_BASE_URL,
});

export const AuthHttpClient = axios.create({
  baseURL: process.env.REACT_APP_AUTH_BASE_URL,
});

export const UserHttpClient = axios.create({
  baseURL: process.env.REACT_APP_USER_BASE_URL,
});

export const MatchingHttpClient = axios.create({
  baseURL: process.env.REACT_APP_MATCHING_BASE_URL,
});

export const CollabHttpClient = axios.create({
  baseURL: process.env.REACT_APP_COLLAB_BASE_URL,
});

export const ChatHttpClient = axios.create({
  baseURL: process.env.REACT_APP_COLLAB_BASE_URL,
});

// export default httpClient;
