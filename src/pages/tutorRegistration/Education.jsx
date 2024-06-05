import React, { useState } from "react";

const Education = (props) => {
  const setStage = props.setStage;
  const [notHave, setNotHave] = useState(false);
  const [educations, setEducations] = useState([
    {
      university: "",
      degree: "",
      specialization: "",
      yearStart: "",
      yearEnd: "",
      image: null,
    },
  ]);

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        university: "",
        degree: "",
        specialization: "",
        yearStart: "",
        yearEnd: "",
        image: null,
      },
    ]);
  };

  const handleEducationChange = (index, field, value) => {
    const newEducations = educations.map((edu, i) => {
      if (i === index) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    setEducations(newEducations);
  };

  const handleGoback = () => {
    setStage(2);
  };

  const handleSubmit = () => {
    setStage(4);
  };

  return (
    <div className="flex flex-col p-12 gap-6">
      <div className="text-[32px] font-semibold">Học vấn</div>
      <div className="text-[16px] ">
        Cho học sinh biết thêm về chương trình giáo dục đại học mà bạn đã hoàn
        thành hoặc đang theo học
      </div>

      <div className="flex flex-row gap-2">
        {!notHave ? (
          <div
            className="border-2 border-gray-400 rounded-md w-5 h-5 bg-white"
            onClick={() => setNotHave(!notHave)}
          ></div>
        ) : (
          <div>
            <div
              className=" flex rounded-md w-5 h-5 bg-black items-center justify-center"
              onClick={() => setNotHave(!notHave)}
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
        Tôi không có trình độ học vấn cao hơn
      </div>

      {!notHave ? (
        <div>
          {educations.map((education, index) => (
            <div className="flex flex-col mt-4">
              <div>Trường đại học</div>
              <input
                className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                type="text"
                value={education?.university}
                onChange={(e) =>
                  handleEducationChange(
                    index,
                    "university",
                    e.target.value
                  )
                }
                required
              />

              <div className="mt-4">Bằng cấp</div>
              <input
                className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                type="text"
                value={education.degree}
                onChange={(e) =>
                  handleEducationChange(
                    index,
                    "degree",
                    e.target.value
                  )
                }
                required
              />

              <div className="mt-4">Chuyên môn</div>
              <input
                className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                type="text"
                value={education.specialization}
                onChange={(e) =>
                  handleEducationChange(index, "specialization", e.target.value)
                }
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
                    required
                    value={education.yearStart}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        "yearStart",
                        e.target.value
                      )
                    }
                  />{" "}
                  -{" "}
                  <input
                    className="flex-1 px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                    type="number"
                    min="1900"
                    max="2099"
                    step="1"
                    required
                    value={education.yearEnd}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        "yearEnd",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4 p-6 bg-[#f4f4f8] rounded-lg">
                <div className="text-[20px] font-semibold">
                  Nhận huy hiệu "Bằng cấp đã được xác minh"
                </div>

                <div>
                  Tải lên chứng chỉ của bạn để tăng uy tín của bạn! Nhóm của
                  chúng tôi sẽ xem xét và thêm huy hiệu vào hồ sơ của bạn. Sau
                  khi được xem xét, các tập tin của bạn sẽ bị xóa.
                </div>

                <div>Định dạng JPG hoặc PNG; kích thước tối đa 20 MB.</div>

                {education.image === null ? (
                  <label className="px-4 py-2 border-2 border-black rounded-lg hover:bg-[rgba(18,17,23,.06)] w-fit cursor-pointer">
                    Tải lên
                    <input
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "image",
                          URL.createObjectURL(e.target.files[0])
                        )
                      }
                      type="file"
                      hidden
                    />
                  </label>
                ) : (
                  <div className="w-40 h-40 relative">
                    <img className="w-40 h-40" src={education.image} />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                      className="w-6 h-6 absolute -top-2 -right-2 bg-white border-2 border-black rounded-md cursor-pointer"
                      onClick={() =>
                        handleEducationChange(index, "image", null)
                      }
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.207 5.793a1 1 0 0 0-1.414 1.414L10.586 12l-4.793 4.793a1 1 0 1 0 1.414 1.414L12 13.414l4.793 4.793a1 1 0 0 0 1.414-1.414L13.414 12l4.793-4.793a1 1 0 0 0-1.414-1.414L12 10.586z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div
            onClick={addEducation}
            className="mt-4 text-[18px] font-semibold underline cursor-pointer"
          >
            Thêm chứng chỉ khác
          </div>
        </div>
      ) : (
        ""
      )}

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

export default Education;
