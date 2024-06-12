import { jwtDecode } from "jwt-decode";

const BASE_API_LINK = import.meta.env.VITE_API_LINK;

export const getTutor = async () => {
  const response = await fetch(
    "https://6639d7581ae792804becf778.mockapi.io/Tutor"
  );
  return response.json();
};

export const login = async (data) => {
  const response = await fetch(`${BASE_API_LINK}/Auth/login-v2`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};


export const register = async (data) => {
  const response = await fetch(`${BASE_API_LINK}/Account/register`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token)
  const response = await fetch(`${BASE_API_LINK}/Account/get/${decode.UserId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};
// Get UserData
export const getUser = async (data) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_API_LINK}/Account/get/${data}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const updateUserProfile = async (data) => {
  const response = await fetch(`${BASE_API_LINK}/Account/update`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const getWallet = async (UserId) => {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token)
  const response = await fetch(`${BASE_API_LINK}/Wallet/get/wallet/user/${UserId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const walletTransaction = async (data) => {
  const response = await fetch(`${BASE_API_LINK}/Transaction/wallet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};

export const updateTransaction = async (data) => {
  const response = await fetch(`${BASE_API_LINK}/Transaction/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};

export const getOTP = async (data) => {
  const response = await fetch(`${BASE_API_LINK}/Mail/otp/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};

export const confirmOTP = async (data) => {
  const response = await fetch(`${BASE_API_LINK}/Auth/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};