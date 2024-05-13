import React, { useRef, useState } from "react";
import logo from "../assets/logo.png";
import loginBG from "../assets/loginBG.png";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ErrorPopup from "../utils/ErrorPopup";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // form validation rules
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Vui lòng nhập tên")
      .max(20, "Tối đa 20 ký tự"),
    email: Yup.string()
      .email("Không đúng định dạng email")
      .required("Vui lòng nhập email"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm(formOptions);

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => console.log(data);
  const handleOnClick = (e) => {
    e.preventDefault();
    console.log("GOOGLE");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-theme">
      <div className="flex gap-5 bg-white rounded-lg p-3 relative">
        <form className=" w-[440px] pl-5">
          <div className="w-fit">
            <Link to="/">
              <IoMdArrowRoundBack className="size-8 text-blue" />
            </Link>
          </div>
          <img src={logo} alt="" className="mx-auto mb-4 w-20" />
          <div className="text-center text-2xl font-bold mb-4 text-gray-800">
            Tạo tài khoản miễn phí
          </div>
          <div className="text-center mb-4">
            Bạn đã có tài khoản?{" "}
            <Link
              to="/login"
              className="underline hover:text-theme font-semibold"
            >
              Đăng nhập
            </Link>
          </div>
          {/* Login with Google */}
          <button
            onClick={handleOnClick}
            className="flex justify-center items-center gap-2 border-2 border-black rounded-lg text-black py-2 px-4 mb-4 w-full hover:bg-theme hover:text-white"
          >
            <FcGoogle className="size-6" />
            Tiếp tục với Google
          </button>
          <div className="flex justify-center items-center">
            <hr className="w-2/4 my-2 border-[1px] border-black" />
            <div className="mx-2 text-black">Hoặc</div>
            <hr className="w-2/4 my-2 border-[1px] border-black" />
          </div>
          {/* Username */}
          <div className="mb-2 relative">
            <label
              htmlFor="uerName"
              className="text-black text-sm font-bold mb-2"
            >
              Tên của bạn
            </label>
            <input
              id="uerName"
              className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
              {...register("userName")}
            />
            {errors.userName && (
              <ErrorPopup message={errors.userName?.message} />
            )}
          </div>
          {/* Email */}
          <div className="mb-2 relative">
            <label
              htmlFor="email"
              className="text-black text-sm font-bold mb-2"
            >
              Địa chỉ email
            </label>
            <input
              id="email"
              type="email"
              className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
              {...register("email")}
            />
            {errors.email && <ErrorPopup message={errors.email?.message} />}
          </div>
          {/* Password */}
          <div className="mb-2 relative">
            <label
              htmlFor="password"
              className="text-black text-sm font-bold mb-2"
            >
              Mật khẩu
            </label>
            <div className="relative ">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
                {...register("password")}
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer"
              >
                {showPassword ? (
                  <IoEyeOutline className="size-6" />
                ) : (
                  <IoEyeOffOutline className="size-6" />
                )}
              </div>
            </div>
            {errors.password && (
              <ErrorPopup message={errors.password?.message} />
            )}
          </div>
          {/* Confirm Password */}
          <div className="mb-8 relative">
            <label
              htmlFor="confirmPassword"
              className="text-black text-sm font-bold mb-2"
            >
              Nhập lại mật khẩu
            </label>
            <div className="relative ">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
                {...register("confirmPassword")}
              />
              <div
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <IoEyeOutline className="size-6" />
                ) : (
                  <IoEyeOffOutline className="size-6" />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <ErrorPopup message={errors.confirmPassword?.message} />
            )}
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit(onSubmit)}
              className="transition ease-in-out delay-150 border-2 border-black rounded-lg text-black py-2 px-4 mb-4 shadow-[rgba(0,0,0,1)_4px_5px_4px_0px] hover:-translate-x-[-6px] hover:-translate-y-[-6px] hover:shadow-none hover:bg-theme hover:text-white duration-300"
            >
              Tạo tài khoản
            </button>
          </div>
        </form>
        <div className="">
          <img src={loginBG} alt="" className="object-cover w-fit h-fit" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;