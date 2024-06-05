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
      navigate("/login");
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
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm flex flex-col justify-center gap-5">
        <div className="mx-auto text-3xl font-bold">Đăng ký tài khoản</div>
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <label className="mr-1 font-bold">Đăng nhập với</label>
          <button
            type="button"
            className="p-2 rounded-full text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <FcGoogle />
          </button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Hoặc
          </p>
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
            className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-blue-600"
            {...register("fullName")}
          />
          {errors.fullName && <ErrorPopup message={errors.fullName?.message} />}
        </div>
        {/* Email */}
        <div className="mb-2 relative">
          <label htmlFor="email" className="text-black text-sm font-bold mb-2">
            Địa chỉ email
          </label>
          <input
            id="email"
            type="email"
            className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-blue-600"
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
            className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-blue-600"
            {...register("dateOfBirth")}
          />
          {errors.dateOfBirth && (
            <ErrorPopup message={errors.dateOfBirth?.message} />
          )}
        </div>

        {/* Phone */}
        <div className="mb-2 relative">
          <label htmlFor="phone" className="text-black text-sm font-bold mb-2">
            Số điện thoại
          </label>
          <input
            id="phone"
            type="tel"
            className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-blue-600"
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
              className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-blue-600"
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
          {errors.password && <ErrorPopup message={errors.password?.message} />}
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
              className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-blue-600"
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

        {/* Submit btn */}
        {mutation.isPending ? (
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider cursor-wait"
              type="submit"
              disabled
            >
              Loading...
            </button>
          </div>
        ) : (
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Đăng ký
            </button>
          </div>
        )}

        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Đã có tài khoản?{" "}
          <Link
            className="text-red-600 hover:underline hover:underline-offset-4"
            to="/login"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
