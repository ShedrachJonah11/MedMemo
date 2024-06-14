import React from "react";

function page() {
  return (
    <div>
      <section>
        <div></div>

        <div>
          <div className="p-3 rounded-2xl flex flex-col gap-2 bg-white">
            <p className="text-xl font-semibold text-[#343A40]">
              Patient breakdown
            </p>
            <div className="flex gap-3 justify-normal flex-wrap">
              <div className="w-[92px] h-[92px] rounded-[92px] flex flex-col gap-1 justify-center items-center text-center bg-[#007BFF]">
                <span className="text-2xl text-white font-semibold">485</span>
                <span className="text-sm font-medium text-white">Total</span>
              </div>
              <div className="w-[92px] h-[92px] rounded-[92px] flex flex-col gap-1 justify-center items-center text-center bg-[#6A3C1A]">
                <span className="text-2xl text-white font-semibold">150</span>
                <span className="text-sm font-medium text-white">Males</span>
              </div>
              <div className="w-[92px] h-[92px] rounded-[92px] flex flex-col gap-1 justify-center items-center text-center bg-[#BF24CC]">
                <span className="text-2xl text-white font-semibold">185</span>
                <span className="text-sm font-medium text-white">Females</span>
              </div>
              <div className="w-[92px] h-[92px] rounded-[92px] flex flex-col gap-1 justify-center items-center text-center bg-[#00967B]">
                <span className="text-2xl text-white font-semibold">150</span>
                <span className="text-sm font-medium text-white">Others</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold text-[#343A40]">
              Preferred recording styles
            </p>
            <p>Edit the styles to suit your preferences</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
