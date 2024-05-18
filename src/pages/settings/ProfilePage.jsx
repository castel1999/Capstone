import { useRef, useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ErrorPopup from "../../utils/ErrorPopup";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const ProfilePage = () => {
  const data = useOutletContext();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [avatarURL, setAvatarURL] = useState(data?.avatar);

  const phoneRegExp =
    /^(?:\+84|0)(?:[1-9][0-9]{8}|(?:2|3|4|5|6|7|8|9)[0-9]{7,8})$/;

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Vui lòng nhập họ tên"),
    dob: Yup.string().required("Vui lòng chọn ngày tháng năm sinh"),
    email: Yup.string()
      .email("Không đúng định dạng email")
      .required("Vui lòng nhập email"),
    phone: Yup.string().matches(
      phoneRegExp,
      "Số điện thoại không đúng định dạng"
    ),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: data?.username,
      dob: data?.dob.split("T")[0],
      email: data?.email,
      phone: data?.phone,
    },
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm(formOptions);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAvatarURL(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    setValue("avatar", avatarURL);
  }, [avatarURL, setValue]);

  const onSubmit = (formData) => {
    const completeData = { ...formData, avatar: avatarURL };
    console.log(completeData);
  };

  return (
    <form className="">
      <div className="flex flex-row justify-center gap-10 my-5">
        <div className="flex flex-col gap-2 justify-center items-center border border-gray-300 rounded-lg px-10 py-3">
          <div className="font-bold text-gray-400">Tổng tiền đã nạp</div>
          <div className="text-theme text-4xl">0đ</div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center border border-gray-300 rounded-lg px-10 py-3">
          <div className="font-bold text-gray-400">Tổng tiền đã nạp</div>
          <div className="text-theme text-4xl">0đ</div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center border border-gray-300 rounded-lg px-10 py-3">
          <div className="font-bold text-gray-400">Tổng tiền đã nạp</div>
          <div className="text-theme text-4xl">0đ</div>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-3 max-w-[500px]">
        <div className="text-3xl font-bold">Thông tin cá nhân</div>

        {/* avatar */}
        <div className="flex">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            src={avatarURL}
            alt="profile"
            className="object-cover rounded-full size-44"
          />
          <div className="flex flex-col justify-center items-center gap-2">
            <div
              onClick={() => fileRef.current.click()}
              className="self-center border border-black px-3 py-1 ml-5 rounded-lg cursor-pointer hover:bg-theme hover:text-white"
            >
              Thay đổi ảnh đại diện
            </div>
            <div className="text-gray-400 text-sm">JPG, PNG &lt; 2mb</div>
          </div>
        </div>

        <div className="flex flex-col gap-4 max-w-[600px]">
          {/* username */}
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="username" className="font-bold">
              Họ và tên
            </label>
            <input
              id="username"
              type="text"
              className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
              {...register("username")}
            />
            {errors.username && (
              <ErrorPopup message={errors.username?.message} />
            )}
          </div>

          {/* DOB */}
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="dob" className="font-bold">
              Ngày sinh
            </label>
            <input
              id="dob"
              type="date"
              className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
              {...register("dob")}
            />
            {errors.dob && <ErrorPopup message={errors.dob?.message} />}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="email" className="font-bold">
              Địa chỉ email
            </label>
            <input
              id="email"
              className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
              {...register("email")}
            />
            {errors.email && <ErrorPopup message={errors.email?.message} />}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="phone" className="font-bold">
              Số điện thoại
            </label>
            <input
              id="phone"
              type="tel"
              className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
              {...register("phone")}
            />
            {errors.phone && <ErrorPopup message={errors.phone?.message} />}
          </div>

          <div>
            <button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              className="bg-theme border-2 border-black rounded-lg text-white p-3 hover:opacity-90"
            >
              Cập nhật thông tin
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfilePage;
