import React, { useState } from "react";

const Certification = () => {
  const [notHaveCertificate, setNotHaveCertificate] = useState(false);

  return (
    <div className="flex flex-col p-12 gap-6">
      <div className="text-[32px] font-semibold">Chứng chỉ giảng dạy</div>
      <div className="text-[16px] ">
        Bạn có chứng chỉ giảng dạy không? Nếu có, hãy mô tả chúng để nâng cao độ
        tin cậy của hồ sơ và thu hút nhiều học viên hơn.
      </div>

      <div className="flex flex-row gap-2">
        {!notHaveCertificate ? (
          <div
            className="border-2 border-gray-400 rounded-md w-5 h-5 bg-white"
            onClick={() => setNotHaveCertificate(!notHaveCertificate)}
          ></div>
        ) : (
          <div>
            <div
              className=" flex rounded-md w-5 h-5 bg-black items-center justify-center"
              onClick={() => setNotHaveCertificate(!notHaveCertificate)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
              >
                <path
                  d="M9.923 17.101 6 13.18 7.179 12l2.744 2.744L17.667 7l1.178 1.179z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        )}
        Tôi không có chứng chỉ giảng dạy
      </div>

      {!notHaveCertificate ? (
        <div>
          <div className="flex flex-col">
            <div>Chứng chỉ</div>
            <input
              className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
              type="text"
              required
            />
            <div className="mt-4">Mô tả</div>
            <input
              className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
              type="text"
              required
            />
            <div className="mt-4">Phát hành bởi</div>
            <input
              className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
              type="text"
              required
            />
            <div className="mt-4">
              <div>Năm học</div>
              <div className="flex items-center gap-2">
              <input
                className="flex-1 px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                type="number"
                min="1900"
                max="2099"
                step="1"
              />{" "}
              -{" "}
              <input
                className="flex-1 px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                type="number"
                min="1900"
                max="2099"
                step="1"
              />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4 p-6 bg-[#f4f4f8] round-md">
              <div className="text-[20px] font-semibold">
              Get a “Certificate verified” badge
              </div>
              
            </div>
          </div>

        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Certification;
