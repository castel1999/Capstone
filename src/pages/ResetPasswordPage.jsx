import React, { useState } from "react";
import logo from "../assets/logo.png";
import loginBG from "../assets/loginBG.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ErrorPopup from "../utils/ErrorPopup";

const ResetPasswordPage = () => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Không đúng định dạng email")
      .required("Vui lòng nhập email"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm(formOptions);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex justify-center items-center h-screen bg-theme">
      <div className="bg-white rounded-lg p-5 relative">
        <form className=" w-[440px]">
          <div className="w-fit">
            <Link to="/login">
              <IoMdArrowRoundBack className="size-8 text-blue" />
            </Link>
          </div>
          <img src={logo} alt="" className="mx-auto mb-4 w-20" />
          <div className="text-center text-2xl font-bold mb-4 text-gray-800">
            Đặt lại mật khẩu
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="email"
              className="text-black text-sm font-bold mb-2"
            >
              Địa chỉ email
            </label>
            <input
              id="email"
              className="border-2 border-black rounded-lg py-2 px-4 w-full outline-none focus:border-theme"
              {...register("email")}
            />
            {errors.email && (
              <ErrorPopup message={errors.email?.message} />
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit(onSubmit)}
              className="transition ease-in-out delay-150 border-2 border-black rounded-lg text-black py-2 px-4 mb-4 shadow-[rgba(0,0,0,1)_4px_5px_4px_0px] hover:-translate-x-[-6px] hover:-translate-y-[-6px] hover:shadow-none hover:bg-theme hover:text-white duration-300"
            >
              Tiếp theo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;