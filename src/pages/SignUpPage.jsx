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
import * as apiClient from "../api/UserAPI";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const phoneRegExp =
    /^(?:\+84|0)(?:[1-9][0-9]{8}|(?:2|3|4|5|6|7|8|9)[0-9]{7,8})$/;

  // form validation rules
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Vui lòng nhập tên")
      .max(20, "Tối đa 20 ký tự"),
    email: Yup.string()
      .email("Không đúng định dạng email")
      .required("Vui lòng nhập email"),
    dateOfBirth: Yup.string().required("Vui lòng chọn ngày tháng năm sinh"),
    phoneNumber: Yup.string()
      .required("Vui lòng nhập số điện thoại")
      .matches(phoneRegExp, "Số điện thoại không đúng định dạng"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$/,
        "Phải có 1 ký tự viết hoa và 1 ký tự đặc biệt"
      ),
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

  const mutation = useMutation({
    mutationFn: apiClient.register,
    onSuccess: async () => {
      toast.success("Đăng ký thành công!");
      navigate("/");
    },
    onError: (error) => {
      toast.error("Đăng ký thất bại!");
      console.log(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    console.log(data);
  });

  return (
    <div className="flex justify-center items-center py-5 bg-theme">
      <div className="flex gap-5 bg-white rounded-lg p-3">
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
          {/* fullName */}
          <div className="mb-2 relative">
            <label
              htmlFor="fullName"
              className="text-black text-sm font-bold mb-2"
            >
              Tên của bạn
            </label>
            <input
              id="fullName"
              className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
              {...register("fullName")}
            />
            {errors.fullName && (
              <ErrorPopup message={errors.fullName?.message} />
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

          {/* DOB */}
          <div className="mb-2 relative">
            <label htmlFor="dob" className="text-black text-sm font-bold mb-2">
              Ngày sinh
            </label>
            <input
              id="dob"
              type="date"
              className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
              {...register("dateOfBirth")}
            />
            {errors.dateOfBirth && (
              <ErrorPopup message={errors.dateOfBirth?.message} />
            )}
          </div>

          {/* Phone */}
          <div className="mb-2 relative">
            <label
              htmlFor="phone"
              className="text-black text-sm font-bold mb-2"
            >
              Số điện thoại
            </label>
            <input
              id="phone"
              type="tel"
              className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <ErrorPopup message={errors.phoneNumber?.message} />
            )}
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
        <div>
          <img
            src={loginBG}
            alt=""
            className="object-cover w-fit h-full rounded-3xl "
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
