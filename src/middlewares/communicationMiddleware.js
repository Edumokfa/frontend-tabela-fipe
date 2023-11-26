import axios, { HttpStatusCode } from "axios";

export const HttpStatus = HttpStatusCode;

const apiUrl = () => {
  const host = window.location.hostname;
  const url = `http://${host}:8080/api`
  return url;
};

export const api = axios.create(
  { baseURL: apiUrl() }
);

export const apiGet = async (url, json) => {
  try {
    const response = await api.get(url, { params: json });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const apiDelete = async (url, json) => {
  try {
    const response = await api.delete(url, { params: json });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const apiPost = async (url, json) => {
  try {
    const response = await api.post(url, json);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const apiPut = async (url, json) => {
  try {
    const response = await api.put(url, json);
    return response;
  } catch (error) {
    console.log(error);
  }
}
