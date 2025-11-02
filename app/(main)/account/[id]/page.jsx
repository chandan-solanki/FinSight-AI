import { getAccountWithTransaction } from "@/actions/account";
import NotFound from "@/app/not-found";

import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";
import TransactionTable from "../_components/transaction-table";
import AccountChart from "../_components/account-chart";

const AccountPage = async ({ params }) => {
  let p = await params;
  const account = await getAccountWithTransaction(p.id);

  if (!account) {
    NotFound();
  }

  // console.log("Account with transactions", account);

  return (
    <>
      <div className="space-y-8 px-5 max-sm:px-2">
        <div className="flex gap-4 items-center justify-between max-md:flex-col max-md:justify-normal">
          <div className="w-full">
            <h1 className="max-md:text-3xl w-fu text-left text-6xl font-bold capitalize gradient">
              {account.name}
            </h1>
            <p className="text-muted-foreground">
              {account.type.charAt(0).toUpperCase() +
                account.type.slice(1).toLowerCase()}
              {" Account"}
            </p>
          </div>
          <div className="text-right pb-2 max-md:text-left max-md:w-full">
            <div className="text-xl sm:text-2xl font-bold">
              ${parseFloat(account.balance).toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">
              {account._count.transactions} Transactions
            </p>
          </div>
        </div>

        {/* CHARTS SECTION  */}
        <Suspense
          fallback={
            <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
          }
        >
          <AccountChart transactions={account.transactions} />
        </Suspense>
        {/* // TRANSACTION TABLE */}

        <Suspense
          fallback={
            <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
          }
        >
          <TransactionTable transactions={account.transactions} />
        </Suspense>
      </div>
    </>
  );
};

export default AccountPage;
