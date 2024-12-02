import axios from "axios";
import { Question } from "../types/question";

const API_BASE_URL = "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Endpoints
export const getQuestions = async () => {
  const response = await api.get("/questions");
  return response.data;
};

export const getQuestionById = async (uuid: string) => {
  const response = await api.get(`/questions/${uuid}`);
  return response.data;
};

export const createQuestion = async (data: Omit<Question, "uuid">) => {
  const response = await api.post("/questions", data);
  return response.data;
};

export const updateQuestion = async (
  uuid: string,
  data: Omit<Question, "uuid">
) => {
  const response = await api.put(`/questions/${uuid}`, data);
  return response.data;
};

export const deleteQuestion = async (uuid: string) => {
  await api.delete(`/questions/${uuid}`);
};
