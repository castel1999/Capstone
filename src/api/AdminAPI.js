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

export const getTutorRegisterList = async () => {
  const response = await fetch(
    `${BASE_API_LINK}/TutorRegister/get/tutor-registers`
  );

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};

export const getTutorRegisterDetail = async (tutorId) => {
  const response = await fetch(
    `${BASE_API_LINK}/TutorRegister/get/tutor-register/${tutorId}`
  );

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};

export const getTutorAction = async (tutorId) => {
  const response = await fetch(
    `${BASE_API_LINK}/TutorRegister/get/tutor-actions/${tutorId}?size=1&pageSize=10`
  );

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};

export const getTutorStep1 = async (tutorId) => {
  const response = await fetch(
    `${BASE_API_LINK}/TutorRegister/get/tutor-step1/${tutorId}`
  );

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};

export const getTutorStep2 = async (tutorId) => {
  const response = await fetch(
    `${BASE_API_LINK}/TutorRegister/get/tutor-step2/${tutorId}`
  );

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};

export const getTutorStep3 = async (tutorId) => {
  const response = await fetch(
    `${BASE_API_LINK}/TutorRegister/get/tutor-step3/${tutorId}`
  );

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};

export const getTutorStep4 = async (tutorId) => {
  const response = await fetch(
    `${BASE_API_LINK}/TutorRegister/get/tutor-step4/${tutorId}`
  );

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};

export const getTutorStep5 = async (tutorId) => {
  const response = await fetch(
    `${BASE_API_LINK}/TutorRegister/get/tutor-step5/${tutorId}`
  );

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};

export const getTutorStep6 = async (tutorId) => {
  const response = await fetch(
    `${BASE_API_LINK}/TutorRegister/get/tutor-step6/${tutorId}`
  );

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  return responseBody;
};

export const approveTutorRegister = async (data) => {
  const response = await fetch(`${BASE_API_LINK}/TutorRegister/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status;
    throw error;
  }

  return responseBody;
};

export const denyTutorRegister = async (tutorActionId, denyID, data) => {
  const response = await fetch(
    `${BASE_API_LINK}/TutorRegister/deny/${tutorActionId}/${denyID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status;
    throw error;
  }

  return responseBody;
};
