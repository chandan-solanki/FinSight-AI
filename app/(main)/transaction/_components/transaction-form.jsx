"use client";

import { get, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/app/lib/schema";
import useFetch from "@/hooks/use-fetch";
import createTransaction from "@/actions/createtransaction";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import CreateAccountDrawer from "@/components/CreateAccountDrawer";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2, SoapDispenserDroplet } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import ReceiptScanner from "./receipt-scanner";
import { updateTransaction } from "@/actions/createtransaction";

const AddTransactionForm = ({
  accounts,
  categories,
  editMode = false,
  initialData = null,
}) => {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:
      editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description,
            accountId: initialData.accountId,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            category: initialData.category,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval.toString(),
            }),
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id,
            date: new Date(),
            isRecurring: false,
            category: "",
          },
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(editMode ? updateTransaction : createTransaction);

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");
  const category = watch("category");

  const filterdCategories = categories.filter(
    (category) => category.type === type
  );

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };

    if (editMode) {
      transactionFn(editId, formData);
    } else transactionFn(formData);
  };

  useEffect(() => {
    console.log(transactionResult);
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode
          ? "Transaction updated successfully"
          : "Transaction created successfully"
      );
      reset();
      router.push(`/account/${transactionResult.data.accountId}`);
    }
  }, [transactionLoading, transactionResult, editMode]);

  const handleScanComleted = (scanData) => {
    // console.log(scanData);

    if (scanData) {
      setValue("amount", scanData.amount.toString());
      setValue("date", new Date(scanData.date));

      if (scanData.description) {
        setValue("description", scanData.description);
      }

      if (scanData.category) {
        setValue("category", scanData.category);
      }
    }
  };

  // setValue("category", "food");

  // console.log({ accounts: getValues("accountId") });
  // console.log({ category });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* AI RECIPT SCANNER  */}

      {!editMode && <ReceiptScanner onScanComplete={handleScanComleted} />}

      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <Select onValueChange={(value) => setValue("type", value)} value={type}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EXPENSE">Expense</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-sm text-red-500">{errors.type.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2 justify-center">
        <div className="space-y-2 flex-1/2">
          <label htmlFor="" className="text-sm font-medium">
            Amount
          </label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("amount")}
          />
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1 flex-1/2">
          <label htmlFor="" className="text-sm font-medium">
            Account
          </label>
          <Select
            onValueChange={(value) => setValue("accountId", value)}
            defaultValue={getValues("accountId")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => {
                return (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name} (${parseFloat(account.balance).toFixed(2)})
                  </SelectItem>
                );
              })}
              <CreateAccountDrawer>
                <Button
                  variant={"ghost"}
                  className={
                    "w-full select-none items-center text-sm outline-none"
                  }
                >
                  Create Account
                </Button>
              </CreateAccountDrawer>
            </SelectContent>
          </Select>
          {errors.accountId && (
            <p className="text-sm text-red-500">{errors.accountId.message}</p>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col gap-1 ">
        <label htmlFor="" className="text-sm font-medium">
          Category
        </label>
        <Select
          defaultValue={getValues("category")}
          onValueChange={(value) => setValue("category", value)}
          value={category}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {filterdCategories.map((category) => {
              return (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="w-full flex flex-col gap-1 ">
        <label htmlFor="" className="text-sm font-medium">
          Date
        </label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={"w-full pl-2 text-left font-normal"}
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => setValue("date", date)}
              disabled={(date) => {
                return date > new Date() || date < new Date("1900-01-01");
              }}
            />
          </PopoverContent>
        </Popover>

        {errors.date && (
          <p className="text-sm text-red-500">{errors.date.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium"> Description</label>
        <Input placeholder="Enter description" {...register("description")} />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="mt-2 flex flex-row justify-between items-center rounded-lg border p-3">
        <div className="space-y-0.5">
          <label
            className="text-sm font-medium cursor-pointer"
            htmlFor="isRecurring"
          >
            Recurring Transaction
          </label>

          <p className="text-sm text-muted-foreground ">
            Set up a recurring schedule for this transaction
          </p>
        </div>
        <Switch
          id="isRecurring"
          onCheckedChange={(value) => setValue("isRecurring", value)}
          checked={isRecurring}
        />
      </div>

      {isRecurring && (
        <div className="w-full flex flex-col gap-1 ">
          <label className="text-sm font-medium">Recurring Interval</label>
          <Select
            onValueChange={(value) => setValue("recurringInterval", value)}
            defaultValues={getValues("recurringInterval")}
            value={getValues("recurringInterval")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DAILY">Daily</SelectItem>
              <SelectItem value="WEEKLY">Weekly</SelectItem>
              <SelectItem value="MONTHLY">Monthly</SelectItem>
              <SelectItem value="YEARLY">Yearly</SelectItem>
            </SelectContent>
          </Select>
          {errors.recurringInterval && (
            <p className="text-sm text-red-500">
              {errors.recurringInterval.message}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2  gap-2 items-center justify-start">
        <Button
          variant="outline"
          type="button"
          className="w-[100%]"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          className={`w-[100%]`}
          type="submit"
          disabled={transactionLoading}
        >
          {transactionLoading ? (
            <div className="h-[25px] w-[25px] flex gap-4 justify-center items-center">
              <Loader2 className="!w-[100%] !h-[100%] block animate-spin" />
              <span>{editMode ? "Updating..." : "Creating..."}</span>
            </div>
          ) : (
            <span>
              {editMode ? "Update Transaction" : "Create Transaction"}
            </span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
