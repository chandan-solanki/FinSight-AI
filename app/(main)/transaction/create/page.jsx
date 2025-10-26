"use server";
import { getAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import React from "react";
import AddTransactionForm from "../_components/transaction-form";

const AddTransactionPage = async ({}) => {
  
  const { serializedAccount: accounts } = await getAccounts();

  console.log(accounts);
  return (
    <div className="space-y-8 px-5 ">
      <h1 className="text-5xl gradient text-center">Add Transaction</h1>

      <AddTransactionForm accounts={accounts} categories={defaultCategories} />
    </div>
  );
};

export default AddTransactionPage;
