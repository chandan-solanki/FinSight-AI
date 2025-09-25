import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

const AccountLayout = ({ children }) => {
  return (
    <div className="px-5">
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        {children}
      </Suspense>
    </div>
  );
};

export default AccountLayout;
