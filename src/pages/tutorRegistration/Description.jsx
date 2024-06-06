import React from "react";

const Description = (props) => {
  const setStage = props.setStage;
  
  const handleGoback = () => {
    setStage(3);
  };

  const handleSubmit = () => {
    setStage(5);
  };

  return (
    <div className="flex flex-col p-12 gap-6">
      <div className="text-[32px] font-semibold">Thông tin hồ sơ</div>
      <div className="text-[16px] ">
        Thông tin này sẽ được đăng trên hồ sơ công khai của bạn. Viết bằng ngôn
        ngữ mà bạn sẽ giảng dạy.
      </div>

      <div className="flex flex-col ">
        <div className="text-[24px] font-semibold">Giới thiệu bản thân</div>
        <div className="text-[16px]">
          Hãy cho những sinh viên tiềm năng thấy bạn là ai! Chia sẻ kinh nghiệm
          giảng dạy và niềm đam mê giáo dục của bạn và đề cập ngắn gọn về sở
          thích và đam mê của bạn.
        </div>
        <textarea
          type="textarea"
          rows={4}
          className="mt-2 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
        />

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
          className="mt-2 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
        />

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
          className="mt-2 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
        />

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
          className="mt-2 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
        />
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
