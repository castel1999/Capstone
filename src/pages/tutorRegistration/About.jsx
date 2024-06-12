import React, { useState } from "react";
import question from "../../assets/question.png";
import check from "../../assets/check.svg";
import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../firebase";
import {useAuth} from '../../hooks/AuthContext'

const About = (props) => {
  const currentUser = useAuth().user.decodedToken.UserId;
  console.log(currentUser)
  const setIsStage1Completed = props.setIsStage1Completed;
  const [videoURL, setVideoURL] = useState("");
  const setStage = props.setStage;
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [warning, setWarning] = useState({
    profilePhoto: false,
    fullName: "",
    email: "",
    nationalId: "",
    videoUrl: "",
  });
  const [about, setAbout] = useState({
    profilePhoto: null,
    fullName: "",
    email: "",
    nationalId: "",
    subjects: ["Toán"],
    videoUrl: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setAbout((prev) => ({
      ...prev,
      [id]: value,
    }));
    setWarning((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({}));

  const onImageChange = async (event) => {
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `Tutor registrations/${currentUser}/profilePhoto`
    );
  
    if (event.target.files && event.target.files[0]) {
      try {
        await uploadBytes(storageRef, event.target.files[0]);
        const url = await getDownloadURL(storageRef);
        setAbout({...about, profilePhoto: url });
        setWarning({ ...warning, profilePhoto: false });
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }
  };

  const addSubject = () => {
    setAbout({
      ...about,
      subjects: [...about.subjects, "Toán"],
    });
  };

  const handleSubjectChange = (value, index) => {
    const newSubjects = [...about.subjects];
    newSubjects[index] = value;
    setAbout((prev) => ({
      ...prev,
      subjects: newSubjects,
    }));
  };

  const removeSubject = (index) => {
    const updatedSubjects = about.subjects.filter((_, idx) => idx !== index);
    setAbout({
      ...about,
      subjects: updatedSubjects,
    });
  };

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const videoUrlRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\s*[^\/\n\s]+\/\s*|channel\/|user\/[^\/\n\s]+\/|)|youtu\.be\/)([^\/\n\s?&]+)/;
    const nationalRegex = /(0[0-9]{2}|[0-9]{3})([0-9]{1})([0-9]{2})([0-9]{6})/;

    const newWarnings = {
      profilePhoto: about.profilePhoto === null ? true : false,
      email:
        about.email === ""
          ? "Bạn cần điền thông tin này"
          : !emailRegex.test(about.email)
          ? "Bạn cần điền đúng format email"
          : "",
      fullName: about.fullName === "" ? "Bạn cần điền thông tin này" : "",
      nationalId:
        about.nationalId === ""
          ? "Bạn cần điền thông tin này"
          : !nationalRegex.test(about.nationalId)
          ? "Bạn cần điền đúng CCCD"
          : "",
      videoUrl:
        about.videoUrl === ""
          ? "Bạn cần điền thông tin này"
          : !videoUrlRegex.test(about.videoUrl)
          ? "Bạn cần điền đúng format url Youtube"
          : "",
    };

    setWarning(newWarnings);

    const allFieldsValid = !Object.values(newWarnings).some(
      (value) => value !== false && value !== ""
    );
    console.log(newWarnings);

    if (allFieldsValid) console.log('About information: ', about);
  };

  const extractVideoID = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  return (
    <div className="flex flex-col p-12 gap-6">
      <div className="text-[32px] font-semibold">Thông tin cá nhân</div>
      <div className="text-[16px] ">
        Bắt đầu tạo hồ sơ gia sư công cộng của bạn. Tiến trình của bạn sẽ được
        tự động lưu lại khi bạn hoàn thành mỗi phần. Bạn có thể trở lại bất kỳ
        lúc nào để hoàn thành việc đăng ký của mình.
      </div>
      <form className="flex flex-col gap-4">
        <div>
          <label htmlFor="profilePhoto">Ảnh chân dung</label>
          <div className="flex flex-col py-6 border-y-2 border-[#dcdce5] gap-6">
            <div className="flex flex-row justify-between">
              <label className="">
                {about?.profilePhoto === null ? (
                  <div className="flex text-center items-center cursor-pointer text-[#4D4C5C] bg-[#f4f4f8] w-28 h-28 border-2 border-dashed border-[#121117] rounded-md text-[14px] font-normal">
                    JPG or PNG, max 5MB
                  </div>
                ) : (
                  <img className="w-28 h-28 rounded-md " src={about?.profilePhoto} />
                )}

                <input
                  type="file"
                  id="profilePhoto"
                  onChange={onImageChange}
                  hidden
                />
              </label>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <div className="flex flex-col gap-4 p-2 text-[14px]">
                      <div className="flex flex-row items-center gap-3">
                        <img className="w-4 h-4" src={check} /> Bạn nên đối diện
                        về phía trước.
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <img className="w-4 h-4" src={check} />
                        Cần chụp ảnh từ đầu đến vai.
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <img className="w-4 h-4" src={check} />
                        Bạn nên đứng giữa và thẳng đứng.
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <img className="w-4 h-4" src={check} />
                        Khuôn mặt và mắt của bạn cần phải rõ ràng.
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <img className="w-4 h-4" src={check} />
                        Bạn nên là người duy nhất trong bức ảnh.
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <img className="w-4 h-4" src={check} />
                        Sử dụng ảnh màu có độ phân giải cao và không sử dụng bộ
                        lọc.
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <img className="w-4 h-4" src={check} />
                        Tránh sử dụng logo hoặc thông tin liên lạc.
                      </div>
                    </div>
                  </React.Fragment>
                }
                placement="right"
                arrow
              >
                <img src={question} className="h-6 w-6" />
              </HtmlTooltip>
            </div>
            {warning.profilePhoto ? (
              <div className="flex flex-row px-4 py-3 bg-[#ffe2e0] items-center gap-3 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.291 4.055 12 2 8.709 4.055l-3.78.874-.874 3.78L2 12l2.055 3.291.874 3.78 3.78.874L12 22l3.291-2.055 3.78-.874.874-3.78L22 12l-2.055-3.291-.874-3.78zM10.981 7.2l.126 6.608H12.9l.126-6.608zm.224 9.688q.336.322.798.322.463 0 .784-.322a1.1 1.1 0 0 0 .336-.798q0-.463-.336-.784a1.05 1.05 0 0 0-.784-.336 1.1 1.1 0 0 0-.798.336 1.07 1.07 0 0 0-.322.784q0 .462.322.798"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Tải lên một bức ảnh của bạn để tiếp tục
              </div>
            ) : (
              ""
            )}
          </div>

          <label
            className={
              profilePhoto === null
                ? "flex cursor-pointer mt-3 w-full bg-theme font-semibold justify-center border-2 border-black rounded-lg py-3 hover:bg-[#7E5FF4] text-white"
                : "flex cursor-pointer mt-3 w-full bg-white font-semibold justify-center border-2 border-black rounded-lg py-3 hover:bg-[rgba(18,17,23,.06)]"
            }
          >
            {profilePhoto === null ? (
              <div>Tải ảnh</div>
            ) : (
              <div>Tải ảnh mới</div>
            )}
            <input
              type="file"
              id="profilePhoto"
              onChange={onImageChange}
              hidden
            />
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="fullname">Họ và tên</label>
          <input
            className={
              warning.fullName === ""
                ? "px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                : "px-[14px] py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] bg-[#ffe2e0] "
            }
            type="text"
            id="fullName"
            value={about.fullName}
            onChange={handleChange}
            required
          />
          {warning.fullName === "" ? (
            ""
          ) : (
            <div className="text-[#a3120a]">{warning.fullName}</div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            className={
              warning.email === ""
                ? "px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                : "px-[14px] py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] bg-[#ffe2e0] "
            }
            type="email"
            id="email"
            value={about.email}
            onChange={handleChange}
            required
          />
          {warning.email === "" ? (
            ""
          ) : (
            <div className="text-[#a3120a]">{warning.email}</div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="nationalId">Chứng minh nhân dân (CMCD/CCCD)</label>
          <input
            className={
              warning.nationalId === ""
                ? "px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                : "px-[14px] py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] bg-[#ffe2e0] "
            }
            name="nationalId"
            id="nationalId"
            type="tel"
            pattern="(0[0-9]{2}|[0-9]{3})([0-9]{1})([0-9]{2})([0-9]{6})"
            maxLength={12}
            value={about.nationalId}
            onChange={handleChange}
            required
          />
          {warning.nationalId === "" ? (
            ""
          ) : (
            <div className="text-[#a3120a]">{warning.nationalId}</div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="subjects">Chọn môn học giảng dạy</label>
          {about.subjects.map((subject, index) => (
            <div className="flex flex-row gap-3" key={""}>
              <select
                placeholder="Chọn môn học"
                className="w-full px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                onChange={(e) => handleSubjectChange(e.target.value, index)}
                value={subject}
              >
                <option key={"Toán"} value={"Toán"}>
                  Toán
                </option>
                <option key={"Văn"} value={"Văn"}>
                  Văn
                </option>
                <option key={"Sinh"} value={"Sinh"}>
                  Sinh
                </option>
                <option key={"Vật lý"} value={"Vật lý"}>
                  Vật lý
                </option>
                <option key={"Anh"} value={"Anh"}>
                  Anh
                </option>
                <option key={"Địa lý"} value={"Địa lý"}>
                  Địa lý
                </option>
                <option key={"Lịch sử"} value={"Lịch sử"}>
                  Lịch sử
                </option>
                <option key={"IT"} value={"IT"}>
                  IT
                </option>
              </select>

              {about.subjects.length > 1 ? (
                <div
                  className="flex w-10 hover:bg-[rgba(18,17,23,.06)] rounded-md cursor-pointer p-2"
                  onClick={() => removeSubject(index)}
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
          ))}
          <div
            className="font-semibold underline cursor-pointer"
            onClick={() => addSubject()}
          >
            Thêm môn học khác
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-3">
          <div className="flex justify-between">
            <div className="font-semibold">Dán liên kết tới video của bạn</div>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <div className="flex flex-col gap-4 p-2 text-[14px]">
                    <div className="flex flex-row items-center gap-3">
                      <img className="w-4 h-4" src={check} /> Video của bạn phải
                      dài từ 30 giây đến 2 phút.
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <img className="w-4 h-4" src={check} />
                      Quay ở chế độ ngang và ngang tầm mắt.
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <img className="w-4 h-4" src={check} />
                      Sử dụng bề mặt ổn định để video của bạn không bị rung.
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <img className="w-4 h-4" src={check} />
                      Đảm bảo khuôn mặt và mắt của bạn được nhìn thấy rõ ràng
                      (ngoại trừ lý do tôn giáo).
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <img className="w-4 h-4" src={check} />
                      Làm nổi bật kinh nghiệm giảng dạy của bạn và bất kỳ chứng
                      chỉ giảng dạy có liên quan nào.
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <img className="w-4 h-4" src={check} />
                      Chào đón học sinh của bạn một cách nồng nhiệt và mời họ
                      đăng ký một bài học.
                    </div>
                  </div>
                </React.Fragment>
              }
              placement="right"
              arrow
            >
              <img src={question} className="h-6 w-6" />
            </HtmlTooltip>
          </div>

          {about.videoUrl === "" ? (
            <div className=" flex items-center w-full h-[371px] border-2 border-[#dcdce5] rounded-md justify-center">
              Video của bạn sẽ xuất hiện ở đây
            </div>
          ) : (
            <div className="relative w-full overflow-hidden pt-[56.25%] rounded-md">
              <iframe
                className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
                src={`https://www.youtube.com/embed/${extractVideoID(
                  about.videoUrl
                )}`}
                title="YouTube video player"
                allow=""
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <div className="">
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
            className={
              warning.videoUrl === ""
                ? "px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                : "px-[14px] py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] bg-[#ffe2e0] "
            }
            type="text"
            id="videoUrl"
            placeholder="www.youtube.com/watch?v=l5aZJBLAu1E"
            value={about.videoUrl}
            onChange={handleChange}
            required
          />
          {warning.videoUrl === "" ? (
            ""
          ) : (
            <div className="text-[#a3120a]">{warning.videoUrl}</div>
          )}
        </div>
        <div className="flex flex-row-reverse">
          <div
            onClick={handleSubmit}
            className="px-6 py-2 border-2 border-black rounded-md bg-theme hover:bg-[#7E5FF4] text-white font-semibold cursor-pointer"
          >
            Lưu và tiếp tục
          </div>
        </div>
      </form>
    </div>
  );
};

export default About;
