import { globalVariables } from "../config/contants";

interface RegisterApiRequestBody {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface RegisterApiRequestReturn {
  data: {
    access_token: string;
  } | null;
  error: string | null
}

interface LoginApiRequestBody {
  email: string;
  password: string;
}

export const registerApiRequest = async (data: RegisterApiRequestBody): Promise<RegisterApiRequestReturn> => {
  try {
    const response = await fetch(`${globalVariables.backendApiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("Register Response: ", response);
    if (!response.ok) {
      return {
        data: null,
        error: response.statusText,
      }
    }
    const body = await response.json();
    console.log("Register Response: ", body);
    if (!body.success) {
      return {
        data: null,
        error: body.messages[0],
      }
    }
    return {
      data: body.data,
      error: null,
    };
  } catch (error) {
    console.log("Error with login: ", error);
    return {
      data: null,
      error: "An error occurred while registering",
    }
  }
  
}

export const loginApiRequest = async (data: LoginApiRequestBody): Promise<RegisterApiRequestReturn> => {
  try {
    const response = await fetch(`${globalVariables.backendApiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
      console.log("login Response: ", response);
  
    if (!response.ok) {
      return {
        data: null,
        error: response.statusText,
      }
    }
    const body = await response.json();
    console.log("login body: ", body);
    if (!body.success) {
      return {
        data: null,
        error: body.messages[0],
      }
    }
    return {
      data: body.data,
      error: null,
    };
  } catch (error) {
    console.log("Error with login: ", error);
    return {
      data: null,
      error: "An error occurred while logging in",
    }
  }
  
}