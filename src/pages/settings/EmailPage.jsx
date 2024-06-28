import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import * as UserAPI from "../../api/UserAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import OTPInput from "react-otp-input";

const EmailPage = () => {
  const data = useOutletContext();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");

  const getOtp = { email: data?.email };
  const sendOtp = { email: data?.email, otp: otp };

  const getOTP = useMutation({
    mutationFn: UserAPI.getOTP,
    onSuccess: async () => {
      toast.success("Đã gửi mã xác thực!");
      setOtp("");
      setShowModal(true);
    },
    onError: (error) => {
      toast.error("Gửi mã xác thực thất bại!");
      console.log(error.message);
    },
  });

  const confirmOTP = useMutation({
    mutationFn: UserAPI.confirmOTP,
    onSuccess: async () => {
      toast.success("Xác thực thành công!");
      setShowModal(false);
      await queryClient.invalidateQueries("getCurrentUser");
    },
    onError: (error) => {
      toast.error("Xác thực thất bại!");
      console.log(error.message);
    },
  });

  const handleOpenModel = (data) => {
    getOTP.mutate(data);
  };

  const handleSubmitModel = (data) => {
    confirmOTP.mutate(data);
  };

  const inputStyle = {
    width: "3rem",
    height: "3rem",
    margin: "1rem",
    fontSize: "2rem",
    borderRadius: "4px",
    border: "1px solid rgba(0, 0, 0, 0.3)",
  };

  return (
    <div className="p-3 flex flex-col gap-6">
      <div className="text-3xl font-bold">Email</div>

      <div className="flex flex-col gap-1">
        <label htmlFor="" className="font-bold">
          Email
        </label>
        <div className="flex flex-row gap-3 items-center">
          <input
            type="text"
            defaultValue={data?.email}
            readOnly
            className="max-w-[370px] border-2 border-black rounded-lg py-2 px-4 w-full outline-none cursor-not-allowed"
          />
          {data?.emailConfirmed === false ? (
            <div>
              <div
                onClick={() => handleOpenModel(getOtp)}
                className="w-fit border-2 border-black rounded-lg py-2 px-3 cursor-pointer hover:bg-green-400 hover:text-white"
              >
                Xác thực
              </div>
              {showModal && (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Nhập mã OTP đã gửi về email
                          </h3>
                        </div>
                        <div className="">
                          <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span></span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={inputStyle}
                          />
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Đóng
                          </button>
                          <button
                            className={`bg-theme text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                            type="button"
                            onClick={() => handleSubmitModel(sendOtp)}
                            disabled={otp.length > 6}
                          >
                            Xác nhận
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              )}
            </div>
          ) : (
            <div className="text-green-400 flex flex-row items-center gap-1 font-semibold text-xl">
              <FaCheck /> Đã xác thực
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailPage;
