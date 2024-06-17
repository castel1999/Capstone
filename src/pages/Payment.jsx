import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import * as UserAPI from "../api/UserAPI";
import { toast } from "react-toastify";

const Payment = () => {
  const queryClient = useQueryClient();

  const updatePayment = useMutation({
    mutationFn: UserAPI.updateTransaction,
    onSuccess: async () => {
      toast.success("Nạp tiền thành công!");
      await queryClient.invalidateQueries("wallet");
      await queryClient.invalidateQueries("transactions");
    },
    onError: (error) => {
      toast.error("Nạp tiền thất bại!");
      console.log(error.message);
    },
  });

  return (
    <div className="flex flex-row justify-center mt-12 gap-16">
      <div className="flex flex-col p-6 border-2 rounded-lg gap-8 w-[400px] h-fit">
        <div className="flex flex-row gap-3">
          <img
            className="w-16 h-16 rounded-md"
            src="https://firebasestorage.googleapis.com/v0/b/capstone-c0906.appspot.com/o/defaultAva%2FDefaultAva.png?alt=media&token=7f4275d1-05c3-41ca-9ec4-091800bb5895"
          />
          <div className="flex flex-col">
            <div className="text-[#6a697c]">Tiếng Anh</div>
            <div className="flex flex-row text-[20px] font-semibold gap-2 items-center">
              <div>Watsica</div>
              <div className="flex flex-row items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  className="h-6 w-6"
                >
                  <path d="M12 3l2.221 5.942 6.338.277-4.965 3.95 1.696 6.112L12 15.78l-5.29 3.501 1.695-6.113-4.965-3.95 6.338-.276L11.999 3z"></path>
                </svg>
                5
              </div>
              <div className="text-[16px] font-normal text-[#121117]">
                (12 đánh giá)
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border-t-2 border-[#dcdce5]"></div>
        <div className="flex flex-col">
          <div className="font-semibold">Thứ hai, 28 tháng 6 vào 12:00</div>
          <div className="text-[#6a697c]">Thời gian mà bạn lựa chọn</div>
        </div>
        <div className="w-full border-t-2 border-[#dcdce5]"></div>
        <div className="flex flex-col gap-4">
          <div className="text-[24px] font-semibold">Đơn hàng của bạn</div>
          <div className="flex justify-between">
            <div className="text-[16px] text-[#6a697c]">Buổi học</div>
            <div className="text-[16px]">₫500,000</div>
          </div>

          <div className="flex justify-between">
            <div className="text-[20px] font-semibold">Tổng tiền</div>
            <div className="text-[20px] font-semibold">₫500,000</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/3 gap-5">
        <div className="text-[32px] font-semibold">Thanh toán bằng ví</div>
        <div className="flex w-full flex-row gap-5 border-2 border-black rounded-lg justify-center">
          <div className="flex w-full flex-col gap-2 px-5 py-7">
            <div className="text-2xl font-semibold">Total Balance</div>
            <div>
              <div className="text-green-500 text-2xl font-semibold tracking-widest">
                +2.000.000
              </div>
              <div className="text-sm text-gray-400">
                Lần giao dịch gần nhất
              </div>
            </div>
            <div className="flex flex-row gap-5">
              {updatePayment.isPending ? (
                <div className="transition ease-in-out delay-150 border-2 bg-theme border-black rounded-lg text-white py-1 px-4 mb-4  cursor-progress">
                  ...Processing
                </div>
              ) : (
                <div
                  // onClick={() => setIsDepositOpen(true)}
                  className="transition ease-in-out delay-150 border-2 bg-theme border-black rounded-lg text-white py-1 px-4 mb-4 shadow-[rgba(0,0,0,1)_4px_5px_4px_0px] hover:-translate-x-[-6px] hover:-translate-y-[-6px] hover:shadow-none hover:bg-green-500 hover:text-white duration-300 cursor-pointer"
                >
                  Nạp tiền
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center bg-theme pr-3 pl-12 rounded-l-full">
            <div className="font-semibold text-white text-3xl">
              {/* {formatCurrency(walletData.amount)} */} 2.000.000
            </div>
            <div className="text-sm text-gray-400">Số dư khả dụng</div>
          </div>
        </div>

        <div className="flex justify-center w-full bg-[#dcdce5] border-2 border-[#121117] rounded-lg py-3 px-6 text-[18px] text-[#6a697c] font-semibold cursor-not-allowed">
          Đồng ý thanh toán
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3 items-center">
              <div className="flex flex-row px-4 py-2 border-2 border-[#dcdce5] gap-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  className="h-6 w-6"
                >
                  <path d="M12 3l2.221 5.942 6.338.277-4.965 3.95 1.696 6.112L12 15.78l-5.29 3.501 1.695-6.113-4.965-3.95 6.338-.276L11.999 3z"></path>
                </svg>
                5
              </div>
              <div className="text-[#121117]">12 đánh giá</div>
            </div>

            <div className="flex flex-row border-2 border-[#dcdce5] rounded-lg">
              <div
                className={
                  "px-4 py-2 border-r-2 border-[#dcdce5] hover:bg-[#ebebf1] cursor-pointer bg-white rounded-s-md"
                }
                onClick={() => {}}
              >
                <svg
                  height="16"
                  viewBox="0 0 8 12"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.268 5.854l4.293 4.292-1.415 1.415L.44 5.854 6.146.146l1.415 1.415z"></path>
                </svg>
              </div>
              <div
                className="px-4 py-2 hover:bg-[#ebebf1] bg-white cursor-pointer rounded-e-md"
                onClick={() => {}}
              >
                <svg
                  height="16"
                  viewBox="0 0 8 12"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.732 5.854L.44 1.56 1.854.146 7.56 5.854 1.854 11.56.439 10.146z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-2 border-[#dcdce5] rounded-lg p-4">
            <div className="flex flex-row gap-2 items-center">
              <img
                className="w-6 h-6 rounded-md"
                src="https://firebasestorage.googleapis.com/v0/b/capstone-c0906.appspot.com/o/defaultAva%2FDefaultAva.png?alt=media&token=7f4275d1-05c3-41ca-9ec4-091800bb5895"
              />
              Paulo Guilherme
            </div>

            <div>
              I highly recommend Julian as a tutor. He adapts the classes to
              meet my expectations and needs. I enjoy taking classes with him
              and his classes are never boring.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
