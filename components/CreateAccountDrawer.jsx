"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useEffect, useState } from "react";
import { accountSchema } from "@/app/lib/schema";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { Loader2 } from "lucide-react";
import createAccount from "@/actions/dashboard";

const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);
  const {
    data: newAccount,
    loading: createAccountLoading,
    error,
    fn: createAccountFn,
  } = useFetch(createAccount);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: 0,
      isDefault: false,
    },
  });

  useEffect(() => {
    if (newAccount && !createAccountLoading) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [newAccount, createAccountLoading]);

  const onSubmit = async (data) => {
    console.log(data);
    await createAccountFn(data);
  };


  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild className="w-full h-full">
          {children}
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create New Account</DrawerTitle>
          </DrawerHeader>

          <div className="pb-4 px-4">
            <form action="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-2 flex flex-col gap-1">
                <label className="text-sm font-medium" htmlFor="name">
                  Account Name
                </label>
                <Input
                  id="name"
                  placeholder="e.g. My Main Account"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="mt-2 flex flex-col gap-1">
                <label className="text-sm font-medium" htmlFor="type">
                  Account Type
                </label>
                <Select
                  onValueChange={(value) => setValue("type", value)}
                  defaultValues={watch("type")}
                >
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CURRENT">CURRENT</SelectItem>
                    <SelectItem value="SAVINGS">SAVINGS</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type.message}</p>
                )}
              </div>

              <div className="mt-2 flex flex-col gap-1">
                <label className="text-sm font-medium" htmlFor="balance">
                  Initial Balance
                </label>
                <Input
                  id="balance"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("balance", { valueAsNumber: true })}
                />
                {errors.balance && (
                  <p className="text-sm text-red-500">
                    {errors.balance.message}
                  </p>
                )}
              </div>

              <div className="mt-2 flex flex-row justify-between items-center rounded-lg border p-3">
                <div className="space-y-0.5">
                  <label
                    className="text-sm font-medium cursor-pointer"
                    htmlFor="isDefault"
                  >
                    Set as Default Account
                  </label>

                  <p className="text-sm text-muted-foreground ">
                    This account will be selected by default for transaction{" "}
                  </p>
                </div>
                <Switch
                  id="isDefault"
                  onCheckedChange={(value) => setValue("isDefault", value)}
                  checked={watch("isDefault")}
                />
              </div>

              <div className="mt-4 flex w-full items-center">
                <DrawerClose asChild>
                  <Button
                    type="button"
                    variant={"outline"}
                    className={"flex-1"}
                  >
                    Cancel
                  </Button>
                </DrawerClose>

                <Button type="submit" className={"flex-1 ml-2"}>
                  {createAccountLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Creating...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CreateAccountDrawer;
