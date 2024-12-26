import axios from "axios";

import { Categories, Questions } from "../types/question";

const API_BASE_URL = "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getCategories = async (): Promise<Categories[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data || [];
  } catch (error) {
    console.error("Erro ao buscar as categories:", error);
    return [];
  }
};

export const getQuestions = async (): Promise<Questions[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/questions`);
    return response.data || [];
  } catch (error) {
    console.error("Erro ao buscar as perguntas:", error);
    return [];
  }
};

export const getQuestionById = async (uuid: string) => {
  const response = await api.get(`/questions/${uuid}`);
  return response.data;
};

export const createQuestion = async (data: Omit<Questions, "uuid">) => {
  const response = await api.post("/questions", data);
  return response.data;
};

export const updateQuestion = async (
  uuid: string,
  data: Omit<Questions, "uuid">
) => {
  const response = await api.put(`/questions/${uuid}`, data);
  return response.data;
};

export const deleteQuestion = async (uuid: string) => {
  await api.delete(`/questions/${uuid}`);
};
