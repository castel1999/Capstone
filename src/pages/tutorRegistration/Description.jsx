import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { animateScroll } from "react-scroll";
import { toast } from "react-toastify";
import * as TutorApi from "../../api/TutorApi";

const Description = (props) => {
  const setStage = props.setStage;
  const setIsStage4Completed = props.setIsStage4Completed;
  const descriptions = props.descriptions;
  const setDescriptions = props.setDescriptions;
  const tutorId = props.tutorId;
  const [warnings, setWarnings] = useState({
    introduction: "",
    teachingExperience: "",
    motivation: "",
    interestingTitle: "",
  });

  const mutation = useMutation({
    mutationFn: (variables) =>
      TutorApi.registerTutorStep4(variables.targetValue, variables.tutorId),
    onSuccess: (data) => {
      toast.success("Thêm thông tin hồ sơ thành công !");
      setIsStage4Completed(true);
      setStage(5);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });

  const submitStep4 = () => {
    const targetValue = {
      description: descriptions.introduction,
      attractiveTitle: descriptions.interestingTitle,
      motivation: descriptions.motivation,
      educationExperience: descriptions.teachingExperience,
    }
    mutation.mutate({targetValue, tutorId})
  }

  const handleDescriptionChange = (field, value) => {
    setDescriptions({ ...descriptions, [field]: value });
    setWarnings({
      ...warnings,
      [field]: value ? "" : "",
    });
  };

  const handleGoback = () => {
    setStage(3);
  };

  const handleSubmit = () => {
    const newWarnings = {};
    let allValid = true;
    Object.keys(descriptions).forEach((key) => {
      if (descriptions[key] === '') {
        newWarnings[key] = "Thông tin này là bắt buộc.";
        allValid = false;
      } else {
        newWarnings[key] = "";
      }
    });

    setWarnings(newWarnings);
    if (allValid) {
      submitStep4()
      setIsStage4Completed(true);
      setStage(5);
    }
  };

  useEffect(() => {
    animateScroll.scrollToTop({duration: 400,
      smooth: true,});
  },[])

  return (
    <div className="flex flex-col p-12 gap-6">
      <div className="text-[32px] font-semibold">Thông tin hồ sơ</div>
      <div className="text-[16px] ">
        Thông tin này sẽ được đăng trên hồ sơ công khai của bạn. Viết bằng ngôn
        ngữ mà bạn sẽ giảng dạy.
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-[24px] font-semibold">Giới thiệu bản thân</div>
        <div className="text-[16px]">
          Hãy cho những sinh viên tiềm năng thấy bạn là ai! Chia sẻ kinh nghiệm
          giảng dạy và niềm đam mê giáo dục của bạn và đề cập ngắn gọn về sở
          thích và đam mê của bạn.
        </div>
        <textarea
          type="textarea"
          rows={4}
          value={descriptions.introduction}
          onChange={(e) =>
            handleDescriptionChange("introduction", e.target.value)
          }
          className={`mt-2 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] ${
            warnings.introduction ? "border-[#a3120a] bg-[#ffe2e0]" : "hover:border-black"
          }`}
        />
        {warnings.introduction && <div className="text-red-500">{warnings.introduction}</div>}

        <div className="text-[24px] font-semibold mt-10">
          Kinh nghiệm giảng dạy
        </div>
        <div className="text-[16px]">
          Cung cấp mô tả chi tiết về kinh nghiệm giảng dạy có liên quan của bạn.
          Bao gồm các chứng chỉ, phương pháp giảng dạy, trình độ học vấn và kiến
          ​​thức chuyên môn.
        </div>
        <textarea
          type="textarea"
          rows={4}
          value={descriptions.teachingExperience}
          onChange={(e) =>
            handleDescriptionChange("teachingExperience", e.target.value)
          }
          className={`mt-2 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] ${
            warnings.teachingExperience ? "border-[#a3120a] bg-[#ffe2e0]" : "hover:border-black"
          }`}
        />
        {warnings.teachingExperience && <div className="text-red-500">{warnings.teachingExperience}</div>}

        <div className="text-[24px] font-semibold mt-10">
          Tạo động lực cho sinh viên tiềm năng
        </div>
        <div className="text-[16px]">
          Khuyến khích học sinh đăng ký bài học đầu tiên. Nêu bật những lợi ích
          của việc học cùng bạn!
        </div>
        <textarea
          type="textarea"
          rows={4}
          value={descriptions.motivation}
          onChange={(e) =>
            handleDescriptionChange("motivation", e.target.value)
          }
          className={`mt-2 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] ${
            warnings.motivation ? "border-[#a3120a] bg-[#ffe2e0]" : "hover:border-black"
          }`}
        />
        {warnings.motivation && <div className="text-red-500">{warnings.motivation}</div>}

        <div className="text-[24px] font-semibold mt-10">
          Viết một tiêu đề hấp dẫn
        </div>
        <div className="text-[16px]">
          Tiêu đề của bạn là điều đầu tiên sinh viên nhìn thấy về bạn. Làm cho
          nó thu hút sự chú ý, đề cập đến ngôn ngữ giảng dạy cụ thể của bạn và
          khuyến khích học sinh đọc mô tả đầy đủ của bạn.
        </div>
        <textarea
          type="textarea"
          rows={4}
          value={descriptions.interestingTitle}
          onChange={(e) =>
            handleDescriptionChange("interestingTitle", e.target.value)
          }
          className={`mt-2 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] ${
            warnings.interestingTitle ? "border-[#a3120a] bg-[#ffe2e0]" : "hover:border-black"
          }`}
        />
        {warnings.interestingTitle && <div className="text-red-500">{warnings.interestingTitle}</div>}
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

export default Description;
