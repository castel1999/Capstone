import React, { useState } from "react";
import question from "../../assets/question.png";
import check from "../../assets/check.svg";
import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

const About = (props) => {
  const setIsStage1Completed = props.setIsStage1Completed;
  const setStage = props.setStage;
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [warning, setWarining] = useState(false);

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({}));

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = () => {
    console.log(1)
    setStage(2)
  }

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
          <label htmlFor="profilePhoto">Profile Photo</label>
          <div className="flex flex-col py-6 border-y-2 border-[#dcdce5] gap-6">
            <div className="flex flex-row justify-between">
              <label className="">
                {profilePhoto === null ? (
                  <div className="flex text-center items-center cursor-pointer text-[#4D4C5C] bg-[#f4f4f8] w-28 h-28 border-2 border-dashed border-[#121117] rounded-md text-[14px] font-normal">
                    JPG or PNG, max 5MB
                  </div>
                ) : (
                  <img className="w-28 h-28 rounded-md " src={profilePhoto} />
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
            {warning ? (
              <div className="flex flex-row px-4 py-3 bg-[#ffe2e0] items-center gap-3 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  className="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.291 4.055 12 2 8.709 4.055l-3.78.874-.874 3.78L2 12l2.055 3.291.874 3.78 3.78.874L12 22l3.291-2.055 3.78-.874.874-3.78L22 12l-2.055-3.291-.874-3.78zM10.981 7.2l.126 6.608H12.9l.126-6.608zm.224 9.688q.336.322.798.322.463 0 .784-.322a1.1 1.1 0 0 0 .336-.798q0-.463-.336-.784a1.05 1.05 0 0 0-.784-.336 1.1 1.1 0 0 0-.798.336 1.07 1.07 0 0 0-.322.784q0 .462.322.798"
                    clip-rule="evenodd"
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
        <div className="flex flex-col">
          <label htmlFor="fullname">Họ và tên</label>
          <input
            className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
            type="text"
            id="fullname"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
            type="email"
            id="lastName"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="nationalID">Chứng minh nhân dân (CMCD/CCCD)</label>
          <input
            className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
            name="nationalID"
            id="nationalID"
            type="tel"
            pattern="(0[0-9]{2}|[0-9]{3})([0-9]{1})([0-9]{2})([0-9]{6})"
            maxLength={12}
            required
          />
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
