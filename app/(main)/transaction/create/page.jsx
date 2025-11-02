"use server";
import { getAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import React, { Suspense } from "react";
import AddTransactionForm from "../_components/transaction-form";
import { getTransaction } from "@/actions/createtransaction";
import { BarLoader } from "react-spinners";
import { notFound } from "next/navigation";

const AddTransactionPage = async ({ searchParams }) => {
  const editId = searchParams?.edit;
  // console.log(editId);

  const { serializedAccount: accounts } = await getAccounts();

  let initialData = null;

  if (editId) {
    // constuseFetch(getTransaction)
    try {
      initialData = await getTransaction(editId);
    } catch (err) {
      notFound(err);
    }
  }

  // console.log({ accounts });

  // console.log({initialData})
  return (
    <div className="space-y-8 px-5 ">
      <h1 className="text-5xl max-sm:text-3xl gradient text-center">
        {editId ? "Update Transaction" : "Add Transaction"}
      </h1>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AddTransactionForm
          accounts={accounts}
          initialData={initialData}
          editMode={!!editId}
          categories={defaultCategories}
        />
      </Suspense>
    </div>
  );
};

export default AddTransactionPage;
