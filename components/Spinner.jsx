import React from "react";

const Spinner = () => {
  return (
    <div className="absolute h-full z-100 w-full flex items-center justify-center top-[50%] left-[50%] overlay translate-x-[-50%] translate-y-[-50%]">
      <Loader2 className="h-15 w-15 animate-spin" />
    </div>
  );
};

export default Spinner;
