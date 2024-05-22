const BASE_API_LINK = import.meta.env.VITE_API_LINK;

export const signIn = async () => {
  const response = await fetch(
    "https://6639d7581ae792804becf778.mockapi.io/User/1"
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
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const register = async (data) => {
  const response = await fetch(`${BASE_API_LINK}/Account/register-account`, {
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
  const response = await fetch(
    `${BASE_API_LINK}/Account/get-user-information?userID=${localStorage.getItem(
      "userID"
    )}`
  );

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};
