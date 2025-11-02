import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

const MainLayout = ({ children }) => {
  return (
    <div className="mx-auto  w-[90%] max-sm:w-[98%] my-32">
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        {children}
      </Suspense>
    </div>
  );
};

export default MainLayout;
