const BASE_API_LINK = import.meta.env.VITE_API_LINK;

export const getUsers = async () => {
  const response = await fetch(`${BASE_API_LINK}/Admin/get/users`);

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};
