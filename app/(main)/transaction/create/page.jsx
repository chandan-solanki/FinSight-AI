"use server";
import { getAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import React from "react";
import AddTransactionForm from "../_components/transaction-form";
import { createServerSearchParamsForMetadata } from "next/dist/server/request/search-params";
import { getTransaction } from "@/actions/createtransaction";
import { IndentIcon } from "lucide-react";

const AddTransactionPage = async ({ searchParams }) => {
  const editId = searchParams?.edit;
  console.log(editId);

  const { serializedAccount: accounts } = await getAccounts();

  let initialData = null;

  if (editId) {
    initialData = await getTransaction(editId);
  }

  // console.log({ accounts });

  // console.log({initialData})
  return (
    <div className="space-y-8 px-5 ">
      <h1 className="text-5xl gradient text-center">
        {editId ? "Update Transaction" : "Add Transaction"}
      </h1>

      <AddTransactionForm
        accounts={accounts}
        initialData={initialData}
        editMode={!!editId}
        categories={defaultCategories}
      />
    </div>
  );
};

export default AddTransactionPage;
