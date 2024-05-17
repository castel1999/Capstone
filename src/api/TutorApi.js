export const getTutorDetail = async () => {
  const response = await fetch(`https://66479db42bb946cf2f9e5c01.mockapi.io/tutor-detail/3`);
  return response.json();
}
