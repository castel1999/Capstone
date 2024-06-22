import React from "react";
import * as AdminAPI from "../../../api/AdminAPI";
import { useQuery } from "@tanstack/react-query";

const About = ({tutorId}) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tutorRequestStep1"],
    queryFn: () => AdminAPI.getTutorStep1(tutorId),
  });

  const convertToEmbedUrl = (url) => {
    const videoId = url?.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>Step 1</div>
      <img src={data?.imageUrl} alt="Tutor Avatar" className="mb-4" />
      <div>Name: {data?.name}</div>
      <div>Email: {data?.email}</div>
      <div>Subjects: {data?.subjects}</div>
      <iframe
        src={convertToEmbedUrl(data?.videoUrl)}
        title="Video"
        className="mt-4"
      ></iframe>
    </div>
  );
};

export default About;
