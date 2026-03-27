 
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-[200px]">
      <div
        className="
          w-10 md:w-12 aspect-square rounded-full 
          bg-[#25b09b] 
          [--_m:conic-gradient(#0000_10%,#000),linear-gradient(#000_0_0)_content-box]
          [mask:var(--_m)]
          [mask-composite:subtract] 
          [-webkit-mask:var(--_m)]
          [-webkit-mask-composite:source-out]
          animate-spinCustom
        "
      ></div>
    </div>
  );
};

export default Loader;