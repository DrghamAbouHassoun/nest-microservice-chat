import { globalVariables } from "../config/contants";
import { IChat } from "../types/chat";

interface ICreateChateBody {
  userId: string;
}

interface ICreateChateReturn {
  error: string | null;
  data: IChat | null;
}

export const createChate = async (body: ICreateChateBody, token: string): Promise<ICreateChateReturn> => {
  console.log("Enter Create Chate")
  const response = await fetch(`${globalVariables.backendApiUrl}/chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    return {
      error: response.statusText,
      data: null,
    }
  }
  const responseBody = await response.json();
  console.log("Repsonse Body: ", responseBody);
  if (!responseBody.success) {
    return {
      error: responseBody.messages[0],
      data: null,
    }
  }
  return {
    error: null,
    data: responseBody.data,
  }
}