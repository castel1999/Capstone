import React, { useState } from "react";

const Video = (props) => {
  const setStage = props.setStage;
  const [videoURL, setVideoURL] = useState("");

  const handleGoback = () => {
    setStage(4);
  };

  const handleSubmit = () => {
    setStage(6);
  };

  const extractVideoID = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  return (
    <div className="flex flex-col p-12 gap-6">
      <div className="text-[32px] font-semibold">Video giới thiệu</div>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col w-[65%] gap-5">
          <div className="text-[24px] font-semibold ">
            Thêm video ngang tối đa 2 phút
          </div>
          <div className="text-[16px]">
            Introduce yourself to students in the language you'll be teaching
          </div>

          {videoURL === "" ? (
            <div className=" flex items-center w-[420px] h-[240px] border-2 border-[#dcdce5] rounded-md justify-center">
              Video của bạn sẽ xuất hiện ở đây
            </div>
          ) : (
            <div className="relative w-full overflow-hidden pt-[56.25%] rounded-md">
              <iframe
                className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
                src={`https://www.youtube.com/embed/${extractVideoID(
                  videoURL
                )}`}
                title="YouTube video player"
                frameborder="0"
                allow=""
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          )}

          <div className="text-[16px] font-semibold">
            Dán liên kết tới video của bạn
          </div>

          <div>
            Tìm hiểu cách tải video lên{" "}
            <a
              href="https://support.google.com/youtube/answer/57407"
              className="font-semibold underline hover:text-theme"
              target="_blank"
            >
              Youtube
            </a>
          </div>

          <input
            className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
            type="text"
            id="videoURL"
            placeholder="www.youtube.com/watch?v=l5aZJBLAu1E"
            onChange={(e) => setVideoURL(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-[33%]">
          <div className="px-6 py-4 bg-[#f4f4f8] rounded-md">
            <div className="text-[24px] font-semibold">Yêu cầu về video</div>
            <div className="text-[16px]">
              Đảm bảo video của bạn đáp ứng các yêu cầu để được phê duyệt
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse items-end gap-2">
        <div
          onClick={handleSubmit}
          className="px-6 py-2 border-2 border-black rounded-md bg-theme hover:bg-[#7E5FF4] text-white font-semibold cursor-pointer"
        >
          Lưu và tiếp tục
        </div>
        <div
          onClick={handleGoback}
          className="px-6 py-2 text-center border-2 border-[#dcdce5] rounded-md w-fit hover:bg-[rgba(18,17,23,.06)] cursor-pointer"
        >
          Trở lại
        </div>
      </div>
    </div>
  );
};

export default Video;
