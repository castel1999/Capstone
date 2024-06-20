import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { app } from "../../firebase";
import { useAuth } from "../../hooks/AuthContext";
import { animateScroll } from "react-scroll";
import { useMutation } from "@tanstack/react-query";
import * as TutorApi from "../../api/TutorApi";
import { toast } from "react-toastify";

const Certification = (props) => {
  const currentUser = useAuth().user.decodedToken.UserId;
  const current = new moment();
  const tutorId = props.tutorId;
  const setStage = props.setStage;
  const setIsStage2Completed = props.setIsStage2Completed;
  const certifications = props.certifications;
  const setCertifications = props.setCertifications;
  const [notHaveCertificate, setNotHaveCertificate] = useState(false);

  const [warnings, setWarnings] = useState([
    {
      certificate: "",
      description: "",
      issuedBy: "",
      yearStart: "",
      yearEnd: "",
      image: false,
    },
  ]);

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        certificate: "",
        description: "",
        issuedBy: "",
        yearStart: "",
        yearEnd: "",
        image: null,
      },
    ]);

    setWarnings([
      ...warnings,
      {
        certificate: "",
        description: "",
        issuedBy: "",
        yearStart: "",
        yearEnd: "",
      },
    ]);
  };

  const handleCertificationChange = (index, field, value) => {
    setCertifications((prevCertifications) =>
      prevCertifications.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      )
    );

    setWarnings((prevWarnings) =>
      prevWarnings.map((warn, i) =>
        i === index ? { ...warn, [field]: "" } : warn
      )
    );
  };

  const handleGoback = () => {
    setStage(1);
  };

  const onImageChange = async (event, index) => {
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `Tutor registrations/${currentUser}/certificate${index + 1}`
    );

    if (event.target.files && event.target.files[0]) {
      try {
        await uploadBytes(storageRef, event.target.files[0]);
        const url = await getDownloadURL(storageRef);

        setCertifications((prevCertifications) =>
          prevCertifications.map((item, idx) =>
            idx === index ? { ...item, image: url } : item
          )
        );
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }
  };

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 400, smooth: true });
  }, []);

  const onImageRemove = async (index) => {
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `Tutor registrations/${currentUser}/certificate${index + 1}`
    );

    try {
      // await deleteObject(storageRef)
      setCertifications((prevCertifications) =>
        prevCertifications.map((item, idx) =>
          idx === index ? { ...item, image: null } : item
        )
      );
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  const removeCertificate = (index) => {
    const updatedCertificates = certifications.slice();
    const updatedWarnings = warnings.slice();
    onImageRemove(index);
    updatedCertificates.splice(index, 1);
    setCertifications(updatedCertificates);
    updatedWarnings.splice(index, 1);
    setWarnings(updatedWarnings);
  };

  const mutation = useMutation({
    mutationFn: (variables) =>
      TutorApi.registerTutorStep2(variables.targetValue, variables.tutorId),
    onSuccess: (data) => {
      setIsStage2Completed(true);
      toast.success("Thêm chứng chỉ thành công !");
      setStage(3);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });

  const submitStep2 = () => {
    let targetValue = [];
    certifications?.map((cert) => {
      targetValue.push({
        imageUrl: cert?.image,
        certificateName: cert?.certificate,
        certificateDescription: cert?.description,
        certificateFrom: cert?.issuedBy,
        startYear: cert?.yearStart,
        endYear: cert?.yearEnd,
      });
    });

    mutation.mutate({ targetValue, tutorId });
  };

  const handleSubmit = () => {
    var newWarnings = [];

    certifications.map((cert) => {
      const newWarning = {
        certificate:
          cert.certificate === "" ? "Thông tin này là bắt buộc." : "",
        description:
          cert.description === "" ? "Thông tin này là bắt buộc." : "",
        issuedBy: cert.issuedBy === "" ? "Thông tin này là bắt buộc." : "",
        yearStart:
          cert.yearStart === ""
            ? "Thông tin này là bắt buộc."
            : Number(cert.yearStart) > current.year() ||
              Number(cert.yearStart) < 1900
            ? "Năm không hợp lệ"
            : "",
        yearEnd:
          cert.yearEnd === ""
            ? "Thông tin này là bắt buộc."
            : Number(cert.yearEnd) > current.year() ||
              Number(cert.yearEnd) < Number(cert.yearEnd) ||
              Number(cert.yearEnd) < 1900
            ? "Năm không hợp lệ"
            : "",
      };
      newWarnings = [...newWarnings, newWarning];
    });

    setWarnings(newWarnings);

    const allFieldsValid = newWarnings.every((warning) =>
      Object.values(warning).every((value) => value === "")
    );

    if (notHaveCertificate) {
      setIsStage2Completed(true);
      setStage(3);
    } else if (allFieldsValid) {
      submitStep2();
    } else animateScroll.scrollToTop({ duration: 400, smooth: true });
  };

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
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        )}
        Tôi không có chứng chỉ giảng dạy
      </div>

      {!notHaveCertificate ? (
        <form>
          {certifications?.map((certificate, index) => (
            <div className="flex flex-col mt-4 gap-2" key={index}>
              <div>Chứng chỉ</div>
              <div className="flex flex-row gap-2">
                <input
                  className={
                    warnings[index].certificate === ""
                      ? "w-full px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                      : "w-full px-[14px] py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] bg-[#ffe2e0]"
                  }
                  type="text"
                  value={certificate?.certificate}
                  onChange={(e) =>
                    handleCertificationChange(
                      index,
                      "certificate",
                      e.target.value
                    )
                  }
                  required
                />

                {certifications?.length > 1 ? (
                  <div
                    className="flex w-10 hover:bg-[rgba(18,17,23,.06)] rounded-md cursor-pointer p-2"
                    onClick={() => removeCertificate(index)}
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
              {warnings[index].certificate === "" ? (
                ""
              ) : (
                <div className="text-[#a3120a]">
                  {warnings[index].certificate}
                </div>
              )}

              <div className="mt-4">Mô tả</div>
              <input
                className={
                  warnings[index].description === ""
                    ? "px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                    : "px-[14px] py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] bg-[#ffe2e0] "
                }
                type="text"
                value={certificate.description}
                onChange={(e) =>
                  handleCertificationChange(
                    index,
                    "description",
                    e.target.value
                  )
                }
                required
              />
              {warnings[index].description === "" ? (
                ""
              ) : (
                <div className="text-[#a3120a]">
                  {warnings[index].description}
                </div>
              )}

              <div className="mt-4">Phát hành bởi</div>
              <input
                className={
                  warnings[index].issuedBy === ""
                    ? "px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                    : "px-[14px] py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] bg-[#ffe2e0] "
                }
                type="text"
                value={certificate.issuedBy}
                onChange={(e) =>
                  handleCertificationChange(index, "issuedBy", e.target.value)
                }
                required
              />
              {warnings[index].issuedBy === "" ? (
                ""
              ) : (
                <div className="text-[#a3120a]">{warnings[index].issuedBy}</div>
              )}

              <div className="flex flex-col gap-2 mt-4">
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
                    value={certificate.yearStart}
                    onChange={(e) =>
                      handleCertificationChange(
                        index,
                        "yearStart",
                        e.target.value
                      )
                    }
                  />{" "}
                  -{" "}
                  <input
                    className={
                      warnings[index].yearEnd === ""
                        ? "flex-1 px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                        : "flex-1 px-[14px] py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] bg-[#ffe2e0]"
                    }
                    type="number"
                    min="1900"
                    max="2099"
                    step="1"
                    required
                    value={certificate.yearEnd}
                    onChange={(e) =>
                      handleCertificationChange(
                        index,
                        "yearEnd",
                        e.target.value
                      )
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
                  Nhận huy hiệu "Chứng chỉ đã được xác minh"
                </div>

                <div>
                  Tải lên chứng chỉ của bạn để tăng uy tín của bạn! Nhóm của
                  chúng tôi sẽ xem xét và thêm huy hiệu vào hồ sơ của bạn. Sau
                  khi được xem xét, các tập tin của bạn sẽ bị xóa.
                </div>

                <div>Định dạng JPG hoặc PNG; kích thước tối đa 20 MB.</div>

                {certificate.image === null ? (
                  <label className="px-4 py-2 border-2 border-black rounded-lg hover:bg-[rgba(18,17,23,.06)] w-fit cursor-pointer">
                    Tải lên
                    <input
                      onChange={(e) => onImageChange(e, index)}
                      type="file"
                      hidden
                    />
                  </label>
                ) : (
                  <div className="w-40 h-40 relative">
                    <img className="w-40 h-40" src={certificate.image} />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                      className="w-6 h-6 absolute -top-2 -right-2 bg-white border-2 border-black rounded-md cursor-pointer"
                      onClick={() => onImageRemove(index)}
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
            onClick={addCertification}
            className="mt-4 text-[18px] font-semibold underline cursor-pointer"
          >
            Thêm chứng chỉ khác
          </div>
        </form>
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

export default Certification;
