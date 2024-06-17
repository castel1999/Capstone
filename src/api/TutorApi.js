const BASE_API_LINK = import.meta.env.VITE_API_LINK;

export const getTutorDetail = async (tutorId) => {
  const response = await fetch(`${BASE_API_LINK}/Admin/get/tutor/${tutorId}`);
  return response.json();
};

export const getTutorDetail2 = async (tutorId) => {
  // const response = await fetch(`${BASE_API_LINK}/Admin/get/tutor/${tutorId}`);
  const response = await fetch(`https://66479db42bb946cf2f9e5c01.mockapi.io/tutor-detail/${tutorId}`);
  return response.json();
};


export const getUserDetail = async (userId) => {
  const response = await fetch(`${BASE_API_LINK}/Account/get/${userId}`);
  return response.json();
};

export const getTutorList = async ({ page = 1, pageSize = 10 } = {}) => {
  const response = await fetch(
    `${BASE_API_LINK}/TutorData/get/all/v2?page=${page}&pageSize=${pageSize}`
  );

  const responseBody = await response.json();

  if (!response.ok) {
    const error = new Error(responseBody.message);
    error.status = response.status; // Add status code to error object
    throw error;
  }

  const tutors = await Promise.all(
    responseBody.results.map(async (tutor) => {
      const tutorDetail = await getTutorDetail(tutor.tutorId);
      const userDetail = await getUserDetail(tutorDetail.userId);
      return {
        ...tutor,
        tutorName: userDetail.value.fullName,
        avatar: userDetail.value.imageUrl,
      };
    })
  );

  return {
    results: tutors,
    pageNumber: responseBody.pageNumber,
    pageSize: responseBody.pageSize,
    totalPages: responseBody.totalPages,
    totalRecords: responseBody.totalRecords,
  };
};

export const getAllSubjects = async () => {
  const response = await fetch(`${BASE_API_LINK}/Subject/get/allSubject`);
  return response.json();
};

export const registerTutorStep1 = async (data, apiUrl) => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errorBody}`);
  }

  const responseBody = await response.json();
  return responseBody;
};

export const registerTutorStep2 = async (data, tutorId) => {
  const response = await fetch(`${BASE_API_LINK}/TutorRegister/register/certificate/${tutorId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errorBody}`);
  }

  const responseBody = await response.json();
  return responseBody;
};

export const registerTutorStep3 = async (data, tutorId) => {
  console.log(data)
  const response = await fetch(`${BASE_API_LINK}/TutorRegister/register/experiences/${tutorId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errorBody}`);
  }

  const responseBody = await response.json();
  return responseBody;
};

export const registerTutorStep4 = async (data, tutorId) => {
  console.log(data)
  const response = await fetch(`${BASE_API_LINK}/TutorRegister/register/sub-tutor/${tutorId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errorBody}`);
  }

  const responseBody = await response.json();
  return responseBody;
};

export const registerTutorStep5 = async (data, tutorId) => {
  console.log(JSON.stringify(data))
  const response = await fetch(`${BASE_API_LINK}/TutorRegister/create/slot-schedule-v2/${tutorId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errorBody}`);
  }

  const responseBody = await response.json();
  return responseBody;
};

export const registerTutorStep6 = async (data) => {
  console.log(JSON.stringify(data))
  const response = await fetch(`${BASE_API_LINK}/TutorRegister/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errorBody}`);
  }

  const responseBody = await response.json();
  return responseBody;
};

