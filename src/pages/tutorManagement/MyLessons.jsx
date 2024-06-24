import React from "react";

const MyLessons = () => {
  return (
    <div className="flex flex-col px-[10%] w-full bg-[#D6D8DA] h-screen gap-10">
      <div className="flex flex-row px-7 py-5 mt-7 bg-white rounded-md justify-between">
        <div className="flex flex-row gap-2 text-[20px] items-center">
          <div className=" flex items-center justify-center h-8 w-8 rounded-full bg-[#CAD8BE] p-1">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              height="512"
              viewBox="0 0 36 36"
              data-name="Layer 1"
              fill="#5B8F38"
            >
              <path d="m22 28h-18a2 2 0 0 1 -2-2v-16a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v16a2 2 0 0 1 -2 2zm-18-18v16h18v-16zm29 17a1 1 0 0 1 -.707-.293l-6-6a1 1 0 0 1 -.293-.707v-4a1 1 0 0 1 .293-.707l6-6a1 1 0 0 1 1.707.707v16a1 1 0 0 1 -1 1zm-5-7.414 4 4v-11.172l-4 4z" />
            </svg>
          </div>
          Next lesson: <span className="font-semibold">Tuesday, 1 June</span> at{" "}
          <span className="font-semibold">21:00</span> with{" "}
          <img
            className="h-6 w-6 rounded-full"
            src="https://firebasestorage.googleapis.com/v0/b/capstone-c0906.appspot.com/o/defaultAva%2FDefaultAva.png?alt=media&token=7f4275d1-05c3-41ca-9ec4-091800bb5895"
          />{" "}
          <span className="font-semibold">Helen</span>
        </div>

        <div className="p-4 bg-[#2C99AC] rounded-md text-white cursor-pointer">
          Enter classroom
        </div>
      </div>
      <div className="flex flex-col w-full bg-white">
        <div className="text-[25px] px-7 py-5">Active lessons</div>
        <div className="border-t-2 border-[#D6D8DA] w-full" />
        <div className="flex flex-row px-7 py-5 text-[14px] text-[#969696]">
          <div className="basis-1/4">STUDENTS</div>
          <div className="basis-1/4">PREPAID</div>
          <div className="basis-1/6">PRICE PER HOUR</div>
          <div className="flex-1">
            <div className="float-right">ACTIONS</div>
          </div>
        </div>
        <div className="border-t-2 border-[#D6D8DA] w-full" />
        <div className="flex flex-col px-7 py-5">
          <div className="flex flex-row">
            <div className="basis-1/4 flex flex-row gap-5 items-center">
              <div className="h-8 w-8 flex items-center justify-center p-1 hover:bg-blue-gray-50 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g id="_16" data-name="16">
                    <path d="m12 16a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1 -.7.29z" />
                  </g>
                </svg>
              </div>
              <img
                className="h-8 w-8 rounded-full"
                src="https://firebasestorage.googleapis.com/v0/b/capstone-c0906.appspot.com/o/defaultAva%2FDefaultAva.png?alt=media&token=7f4275d1-05c3-41ca-9ec4-091800bb5895"
              />{" "}
              <div className="text-[18px]">Helen</div>
            </div>
            <div className="basis-1/4 text-[18px]">
              21:00 at Tuesday, 1 June
            </div>
            <div className="basis-1/6 text-[18px]">500,000 VND</div>
            <div className="flex-1 text-[18px] w-full">
              <div className="flex flex-row float-right gap-2">
                <div className="flex items-center text-[18px] text-[#729C9E] gap-1 cursor-pointer">
                  <div className="h-8 w-8 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-21 -47 682.66669 682"
                      fill="#729C9E"
                    >
                      <path d="m552.011719-1.332031h-464.023438c-48.515625 0-87.988281 39.464843-87.988281 87.988281v283.972656c0 48.414063 39.300781 87.816406 87.675781 87.988282v128.863281l185.191407-128.863281h279.144531c48.515625 0 87.988281-39.472657 87.988281-87.988282v-283.972656c0-48.523438-39.472656-87.988281-87.988281-87.988281zm50.488281 371.960937c0 27.835938-22.648438 50.488282-50.488281 50.488282h-290.910157l-135.925781 94.585937v-94.585937h-37.1875c-27.839843 0-50.488281-22.652344-50.488281-50.488282v-283.972656c0-27.84375 22.648438-50.488281 50.488281-50.488281h464.023438c27.839843 0 50.488281 22.644531 50.488281 50.488281zm0 0" />
                      <path d="m171.292969 131.171875h297.414062v37.5h-297.414062zm0 0" />
                      <path d="m171.292969 211.171875h297.414062v37.5h-297.414062zm0 0" />
                      <path d="m171.292969 291.171875h297.414062v37.5h-297.414062zm0 0" />
                    </svg>
                  </div>
                  <div>Messages</div>
                </div>
                <div className="h-8 w-8 flex items-center justify-center p-2 hover:bg-blue-gray-50 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Capa_1"
                    enable-background="new 0 0 515.555 515.555"
                    viewBox="0 0 515.555 515.555"
                    fill="#9A9A9A"
                  >
                    <path d="m496.679 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
                    <path d="m303.347 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
                    <path d="m110.014 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLessons;
