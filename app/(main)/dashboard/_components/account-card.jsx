"use client";

import { updateDefaultAccount } from "@/actions/account";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/use-fetch";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";



const AccountCard = ({ account }) => {
  const { id, name, type, balance, isDefault } = (account);

  const {
    data: updatedAccount,
    error,
    loading: updatingDefault,
    fn: updateDefault,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (e) => {
    e.preventDefault();

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return;
    }

    await updateDefault(id);
  };

  useEffect(() => {
    if (updatedAccount && !updatingDefault) {
      toast.success("Default account updated");
    }
  }, [updatedAccount]);

  return (
    <Card className="hover:shadow-md w-full group relative trasition-shadow ">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">
            {name}
          </CardTitle>
          <Switch
            className={"cursor-pointer"}
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updatingDefault}
          />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
            {" Account"}
          </p>
        </CardContent>
        <CardFooter className="flex mt-4 justify-between text-sm text-muted-foreground">
          <div className="flex items-center justify-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            <p>Income</p>
          </div>
          <div className="flex items-center justify-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            <p>Expense</p>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default AccountCard;
