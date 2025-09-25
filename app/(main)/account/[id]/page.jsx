import { getAccountWithTransaction } from "@/actions/account";
import NotFound from "@/app/not-found";

import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";
import TransactionTable from "../_components/transaction-table";

const AccountPage = async ({ params }) => {
  const account = await getAccountWithTransaction(params.id);

  if (!account) {
    NotFound();
  }

  console.log("Account with transactions", account);

  return (


    <div className="space-y-8 px-5 ">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold capitalize gradient">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0).toUpperCase() +
              account.type.slice(1).toLowerCase()}
            {" Account"}
          </p>
        </div>
        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* CHARTS SECTION  */}

      {/* // TRANSACTION TABLE */}

      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionTable transactions={account.transactions} />
      </Suspense>
    </div>
  );
};

export default AccountPage;
