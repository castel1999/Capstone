import { useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { useOutletContext } from "react-router-dom";

const ProfilePage = () => {
  const data = useOutletContext();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);

  return (
    <div className="flex flex-col gap-6 p-3 min-w-[400px]">
      <div className="text-3xl font-bold">Thông tin cá nhân</div>
      <div className="flex">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={file || data?.avatar}
          alt="profile"
          className="object-cover rounded-full"
        />
      </div>

      <div className="flex flex-col gap-4 max-w-[600px]">
        {/*  */}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-bold">
            Họ và tên
          </label>
          <input
            id="username"
            type="text"
            defaultValue={data?.username}
            className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
          />
        </div>

        {/*  */}
        <div className="flex flex-col gap-2">
          <label htmlFor="birthday" className="font-bold">
            Ngày sinh
          </label>
          <input
            id="birthday"
            type="date"
            className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
          />
        </div>

        {/*  */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            id="email"
            type="text"
            defaultValue={data?.email}
            className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
          />
        </div>

        {/*  */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-bold">
            Số điện thoại
          </label>
          <input
            id="phone"
            type="tel"
            defaultValue={data?.phone}
            className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
          />
        </div>

        {/*  */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-bold">
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
          />
        </div>

        {/*  */}
        <div>
          <button
            type="submit"
            className="bg-theme border-2 border-black rounded-lg text-white p-3 hover:opacity-90"
          >
            Cập nhật thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
