import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as apiClient from "../api/UserAPI";
import { useAuth } from "../hooks/AuthContext";
import ErrorPopup from "../utils/ErrorPopup";
import logo from "../assets/logo.png";
import loginBG from "../assets/loginBG.png";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Không đúng định dạng email")
      .required("Vui lòng nhập email"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$/,
        "Phải có 1 ký tự viết hoa và 1 ký tự đặc biệt"
      ),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const handleOnClick = (e) => {
    e.preventDefault();
    console.log("GOOGLE");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const mutation = useMutation({
    mutationFn: apiClient.login,
    onSuccess: async (data) => {
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userID", data.userId);
      localStorage.setItem("role", data.role);

      setUser({ role: data.role, userId: data.userId });
      await queryClient.invalidateQueries("getCurrentUser");

      toast.success("Đăng nhập thành công!");
      navigate("/tutor-list");
    },
    onError: (error) => {
      if (error.status === 400) {
        toast.error("Sai tên đăng nhập hoặc mật khẩu!");
      } else if (error.status === 404) {
        toast.error("Tài khoản không tồn tại!");
      } else if (error.status === 500) {
        toast.error("Lỗi máy chủ nội bộ!");
      }
      console.log(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm flex flex-col justify-center gap-5">
        <Link to="/tutor-list">
          <IoMdArrowRoundBack className="size-5" />
        </Link>
        <div className="mx-auto text-3xl font-bold">Đăng nhập</div>
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
            onClick={handleOnClick}
          >
            <FcGoogle />
          </button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Hoặc
          </p>
        </div>
        {/* Email */}
        <div className="mb-4 relative">
          <label htmlFor="email" className="text-black text-sm font-bold mb-2">
            Địa chỉ email
          </label>
          <input
            id="email"
            className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-blue-600"
            {...register("email")}
          />
          {errors.email && <ErrorPopup message={errors.email?.message} />}
        </div>
        {/* Password */}
        <div className="mb-8 relative">
          <label
            htmlFor="password"
            className="text-black text-sm font-bold mb-2"
          >
            Mật khẩu
          </label>
          <div className="relative">
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
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Ghi nhớ tài khoản</span>
          </label>
          <a
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            href="#"
          >
            Quên mật khẩu?
          </a>
        </div>
        {/* Submit btn */}
        {mutation.isLoading ? (
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider cursor-wait"
              type="button"
              disabled
            >
              Loading...
            </button>
          </div>
        ) : (
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="button"
              onClick={onSubmit}
            >
              Đăng nhập
            </button>
          </div>
        )}
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Chưa có tài khoản?{" "}
          <Link
            className="text-red-600 hover:underline hover:underline-offset-4"
            to="/signup"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
