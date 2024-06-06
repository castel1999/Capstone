const BASE_API_LINK = import.meta.env.VITE_API_LINK;

export const getTutorDetail = async (tutorId) => {
  const response = await fetch(`${BASE_API_LINK}/Admin/get/tutor/${tutorId}`);
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
