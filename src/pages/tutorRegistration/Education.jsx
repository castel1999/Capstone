import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import React, { useState } from "react";
import { app } from "../../firebase";
import {useAuth} from '../../hooks/AuthContext'

const Education = (props) => {
  const currentUser = useAuth().user.decodedToken.UserId;
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
  const [warnings, setWarnings] = useState(
    educations.map(() => ({
      university: "",
      degree: "",
      specialization: "",
      yearStart: "",
      yearEnd: "",
      image: false,
    }))
  );

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
    setWarnings([
      ...warnings,
      {
        university: "",
        degree: "",
        specialization: "",
        yearStart: "",
        yearEnd: "",
        image: false,
      },
    ]);
  };

  const handleEducationChange = (index, field, value) => {
    setEducations((prevEducations) =>
      prevEducations.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
    );

    setWarnings((prevWarnings) =>
      prevWarnings.map((warn, i) =>
        i === index ? { ...warn, [field]: "" } : warn
      )
    );
  };

  const handleImageUpload = async (event, index) => {
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `Tutor registrations/${currentUser}/education${index + 1}`
    );

    if (event.target.files && event.target.files[0]) {
      try {
        await uploadBytes(storageRef, event.target.files[0]);
        const url = await getDownloadURL(storageRef);
        handleEducationChange(index, "image", url);
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }
  };

  const handleImageRemove = async (index) => {
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `User registrations/${currentUser}/education${index + 1}`
    );

    try {
      // await deleteObject(storageRef);
      handleEducationChange(index, "image", null);
    } catch (error) {
      console.error("Error removing file: ", error);
    }
  };

  const removeEducation = (index) => {
    const updatedEducations = educations.slice();
    const updatedWarnings = warnings.slice();
    handleImageRemove(index);
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
    updatedWarnings.splice(index, 1);
    setWarnings(updatedWarnings);
  };

  const handleSubmit = () => {
    const newWarnings = educations.map((edu) => ({
      university: edu.university === "" ? "Bạn cần điền thông tin này" : "",
      degree: edu.degree === "" ? "Bạn cần điền thông tin này" : "",
      specialization:
        edu.specialization === "" ? "Bạn cần điền thông tin này" : "",
      yearStart:
        edu.yearStart === ""
          ? "Bạn cần điền thông tin này"
          : Number(edu.yearStart) > moment().year()
          ? "Năm không hợp lệ"
          : "",
      yearEnd:
        edu.yearEnd === ""
          ? "Bạn cần điền thông tin này"
          : Number(edu.yearEnd) < Number(edu.yearStart) ||
            Number(edu.yearEnd) > moment().year()
          ? "Năm không hợp lệ"
          : "",
    }));

    setWarnings(newWarnings);
    const allFieldsValid = newWarnings.every((warning) =>
      Object.values(warning).every((value) => value === "")
    );

    if (allFieldsValid) {
      console.log("Educations:", educations);
      // setStage(4);  // Proceed to the next stage
    }
  };

  const handleGoback = () => {
    setStage(2);
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
                  clipRule="evenodd"
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
            <div className="flex flex-col mt-4 gap-2" key={index}>
              <div>Trường đại học</div>
              <div className="flex flex-row gap-2">
                <input
                  className={
                    warnings[index].university === ""
                      ? "w-full px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                      : "w-full px-[14px] py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] bg-[#ffe2e0]"
                  }
                  type="text"
                  value={education?.university}
                  onChange={(e) =>
                    handleEducationChange(index, "university", e.target.value)
                  }
                  required
                />

                {educations?.length > 1 ? (
                  <div
                    className="flex w-10 hover:bg-[rgba(18,17,23,.06)] rounded-md cursor-pointer p-2"
                    onClick={() => removeEducation(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                      className="w-full"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16 3H8v2h8zM3 6h18v2h-2v13H5V8H3zm4 2h10v11H7zm2 2h2v7H9zm6 0h-2v7h2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {warnings[index].university === "" ? (
                ""
              ) : (
                <div className="text-[#a3120a]">
                  {warnings[index].university}
                </div>
              )}

              <div className="mt-4">Bằng cấp</div>
              <input
                className={
                  warnings[index].degree === ""
                    ? "px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                    : "w-full px-[14px] py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] bg-[#ffe2e0]"
                }
                type="text"
                value={education.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
                required
              />
              {warnings[index].degree === "" ? (
                ""
              ) : (
                <div className="text-[#a3120a]">{warnings[index].degree}</div>
              )}

              <div className="mt-4">Chuyên môn</div>
              <input
                className={
                  warnings[index].specialization === ""
                    ? "px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                    : "w-full px-[14px] py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] bg-[#ffe2e0]"
                }
                type="text"
                value={education.specialization}
                onChange={(e) =>
                  handleEducationChange(index, "specialization", e.target.value)
                }
                required
              />
              {warnings[index].specialization === "" ? (
                ""
              ) : (
                <div className="text-[#a3120a]">
                  {warnings[index].specialization}
                </div>
              )}

              <div className="mt-4">
                <div>Năm học</div>
                <div className="flex items-center gap-2">
                  <input
                    className={
                      warnings[index].yearStart === ""
                        ? "flex-1 px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                        : "flex-1 px-[14px] py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] bg-[#ffe2e0]"
                    }
                    type="number"
                    min="1900"
                    max="2099"
                    step="1"
                    required
                    value={education.yearStart}
                    onChange={(e) =>
                      handleEducationChange(index, "yearStart", e.target.value)
                    }
                  />{" "}
                  -{" "}
                  <input
                    className={
                      warnings[index].yearStart === ""
                        ? "flex-1 px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                        : "flex-1 px-[14px] py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] bg-[#ffe2e0]"
                    }
                    type="number"
                    min="1900"
                    max="2099"
                    step="1"
                    required
                    value={education.yearEnd}
                    onChange={(e) =>
                      handleEducationChange(index, "yearEnd", e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-row">
                  {warnings[index].yearStart === "" ? (
                    <div className="flex-1"></div>
                  ) : (
                    <div className="text-[#a3120a] flex-1">
                      {warnings[index].yearStart}
                    </div>
                  )}
                  {warnings[index].yearEnd === "" ? (
                    ""
                  ) : (
                    <div className="ml-5 text-[#a3120a] flex-1">
                      {warnings[index].yearEnd}
                    </div>
                  )}
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
                      onChange={(e) => handleImageUpload(e, index)}
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
                        fillRule="evenodd"
                        d="M7.207 5.793a1 1 0 0 0-1.414 1.414L10.586 12l-4.793 4.793a1 1 0 1 0 1.414 1.414L12 13.414l4.793 4.793a1 1 0 0 0 1.414-1.414L13.414 12l4.793-4.793a1 1 0 0 0-1.414-1.414L12 10.586z"
                        clipRule="evenodd"
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
