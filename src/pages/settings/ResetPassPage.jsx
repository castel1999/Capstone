import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as UserAPI from "../../api/UserAPI";
import { useAuth } from "../../hooks/AuthContext";

const ResetPassPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user } = useAuth();
  console.log('user',user);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    otp: Yup.string().required("Vui lòng nhập OTP"),
    newPassword: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu ít nhất 6 ký tự"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không khớp")
      .required("Vui lòng nhập lại mật khẩu"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: user?.decodedToken?.email,
      otp: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm(formOptions);

  const getOTP = useMutation({
    mutationFn: UserAPI.getOTP,
    onSuccess: async () => {
      toast.success("Đã gửi mã xác thực!");
    },
    onError: (error) => {
      toast.error("Gửi mã xác thực thất bại!");
      console.log(error.message);
    },
  });

  const confirmForgotPass = useMutation({
    mutationFn: UserAPI.confirmForgotPass,
    onSuccess: async () => {
      toast.success("Đổi mật khẩu thành công!");
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

  const onSubmit = (data) => {
    confirmForgotPass.mutate(data);
  };

  const handleGetOTP = () => {
    const email = getValues("email");
    getOTP.mutate({ email });
  };

  return (
    <div className="p-3 flex flex-col gap-6 max-w-[500px]">
      <div className="text-3xl font-bold">Đổi mật khẩu</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="mb-4 relative flex flex-col gap-1">
          <label htmlFor="email" className="text-black font-bold">
            Địa chỉ email
          </label>
          <div className="flex flex-row">
            <input
              {...register("email")}
              id="email"
              readOnly
              className={`border-2 border-r border-black rounded-lg rounded-r-none py-2 px-4 w-full outline-none cursor-not-allowed focus:border-blue-600 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            <div
              onClick={handleGetOTP}
              className="w-32 border-2 border-l border-black rounded-lg rounded-l-none py-2 px-4 outline-none text-white font-semibold bg-blue-600 hover:bg-opacity-90 cursor-pointer"
            >
              Lấy OTP
            </div>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* OTP */}

        {getOTP.isSuccess ? (
          <>
            <div className="mb-4 relative flex flex-col gap-1">
              <label htmlFor="otp" className="text-black font-bold">
                OTP
              </label>

              <input
                {...register("otp")}
                id="otp"
                className={`border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-blue-600 ${
                  errors.otp ? "border-red-500" : ""
                }`}
              />
              {errors.otp && (
                <p className="text-red-500 text-sm">{errors.otp.message}</p>
              )}
            </div>

            <div className="mb-4 relative flex flex-col gap-1">
              <label
                htmlFor="newPassword"
                className="text-black font-bold"
              >
                Mật khẩu mới
              </label>
              <div className="relative">
                <input
                  {...register("newPassword")}
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  className={`border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-blue-600 ${
                    errors.newPassword ? "border-red-500" : ""
                  }`}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer"
                >
                  {showPassword ? (
                    <IoEyeOutline className="size-6" />
                  ) : (
                    <IoEyeOffOutline className="size-6" />
                  )}
                </div>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="mb-4 relative flex flex-col gap-1">
              <label
                htmlFor="confirmNewPassword"
                className="text-black font-bold"
              >
                Nhập lại mật khẩu
              </label>
              <div className="relative">
                <input
                  {...register("confirmNewPassword")}
                  id="confirmNewPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className={`border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-blue-600 ${
                    errors.confirmNewPassword ? "border-red-500" : ""
                  }`}
                />
                <div
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <IoEyeOutline className="size-6" />
                  ) : (
                    <IoEyeOffOutline className="size-6" />
                  )}
                </div>
              </div>
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>

            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-theme hover:opacity-90 px-4 py-3 font-semibold text-white uppercase rounded-lg"
                type="submit"
                disabled={confirmForgotPass.isLoading}
              >
                {confirmForgotPass.isLoading ? (
                  <div className="cursor-progress">Loading</div>
                ) : (
                  "Đặt lại mật khẩu"
                )}
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default ResetPassPage;
