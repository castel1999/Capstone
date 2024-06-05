const BASE_API_LINK = import.meta.env.VITE_API_LINK;

export const getUsers = async (data) => {
  const response = await fetch(`${BASE_API_LINK}/Account/update`);

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};
