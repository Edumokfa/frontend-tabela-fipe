import axios, { HttpStatusCode } from "axios";
import { customWarning } from "../utils/messageUtil"

export const HttpStatus = HttpStatusCode;

const apiUrl = () => {
  const host = window.location.hostname;
  const url = `http://${host}:8080/api`
  return url;
};

export const api = axios.create(
  { baseURL: apiUrl() }
);

export const redirectToLogin = () => {
  api.defaults.headers.Authorization = null;
  window.location.href = "/login";
  localStorage.removeItem("access_token");
}

const handleApiError = (error) => {
  if (error.response && error.response.status === HttpStatusCode.Unauthorized) {
    redirectToLogin();
  } else if (error.response && error.response.status === HttpStatusCode.Conflict) {
    customWarning(error.response.data);
  } else {
    console.error(error);
  }
};

export const apiGet = async (url, json) => {
  try {
    const response = await api.get(url, { params: json });
    return response;
  } catch (error) {
    handleApiError(error);
  }
}

export const apiDelete = async (url, json) => {
  try {
    const response = await api.delete(url, { params: json });
    return response;
  } catch (error) {
    handleApiError(error);
  }
}

export const apiPost = async (url, json) => {
  try {
    const response = await api.post(url, json);
    return response;
  } catch (error) {
    handleApiError(error);
  }
}

export const apiPut = async (url, json) => {
  try {
    const response = await api.put(url, json);
    return response;
  } catch (error) {
    handleApiError(error);
  }
}

export const createSession = async (login, password) => {
  const jsonLogin = {
    "login": login,
    "password": password
  };
  return apiPost("/login", jsonLogin);
};

export const testConnection = async () => {
  return await apiGet("/testConnection");
};