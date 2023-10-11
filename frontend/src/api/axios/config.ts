import axios from 'axios'

export const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const questionhttpClient = axios.create({
  baseURL: process.env.REACT_APP_QUESTION_BASE_URL,
})

// export default httpClient;
