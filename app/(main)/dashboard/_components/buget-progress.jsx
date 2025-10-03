"use client";

import React, { useEffect, useState } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Ghost, Pencil, X } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { updateBudget } from "@/actions/budget";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const BudgetProgress = ({ initialBudget, currentExpenses }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  // console.log({ initialBudget });
  // console.log({ currentExpenses });

    let percentUsed = initialBudget
      ? (currentExpenses / initialBudget.amount) * 100
      : 0;
  // let percentUsed = 40;

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updateBudgetData,
    error,
  } = useFetch(updateBudget);

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter the valid amount !!");
      return;
    }

    await updateBudgetFn(amount);
  };

  // console.log(updateBudgetData);
  // console.log(isLoading)

  useEffect(() => {
    if (updateBudgetData?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully !");
    }
  }, [updateBudgetData]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget !");
    }
  }, [error]);

  console.log(error);

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader
        className={"flex flex-row justify-between items-center space-y-0 pb-2"}
      >
        <div className="flex-1">
          <CardTitle>Monthly Budget (Default Account)</CardTitle>
          <div className="flex item-center gap-2 mt-2">
            {isEditing ? (
              <div className="flex items-center justify-start gap-2 ">
                <Input
                  type="number"
                  onChange={(e) => setNewBudget(e.target.value)}
                  value={newBudget}
                  className="w-32"
                  placeholder="Enter amount"
                  disabled={isLoading}
                  autofocus
                />
                <Button
                  className="cursor-pointer"
                  variant="ghost"
                  size="icon"
                  disabled={isLoading}
                  onClick={handleUpdateBudget}
                >
                  <Check className="w-4 h-4 text-green-500" />
                </Button>
                <Button
                  className="cursor-pointer "
                  variant="ghost"
                  size="icon"
                  disabled={isLoading}
                  onClick={handleCancel}
                >
                  <X className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                {" "}
                <CardDescription>
                  {initialBudget
                    ? `$${currentExpenses.toFixed(
                        2
                      )} of $${initialBudget.amount.toFixed(2)}`
                    : "No Budget set"}
                </CardDescription>
                <Button
                  className={"h-6 w-6 cursor-pointer "}
                  variant={"ghost"}
                  size="icon"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {initialBudget && (
          <div className="space-y-2">
            <Progress
              value={percentUsed}
              //   extraStyles={"bg-red-500"}
              extraStyles={`${
                percentUsed >= 90
                  ? "bg-red-500"
                  : percentUsed >= 75
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            />
            <p className="text-xs text-muted-foreground text-right">
              {percentUsed.toFixed(1)}% used
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;
