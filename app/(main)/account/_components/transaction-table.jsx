"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { categoryColors } from "@/data/categories";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MoreHorizontal,
  RefreshCcw,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fi } from "zod/v4/locales";

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

const TransactionTable = ({ transactions }) => {
  const router = useRouter();
  const filteredAndSortedTransactions = transactions;

  const [selectsId, setSelectsId] = useState([]);


  const[searchTerm , setSearchTerm] = useState("");
  const[typeFilter , settypeFilter] = useState("");
  const[recurringFilter , setrecurringFilter] = useState("");

  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });

  console.log(sortConfig);

  const handleSelectsId = (id) => {
    setSelectsId((prev) => {
      return prev.includes(id)
        ? prev.filter((sid) => sid !== id)
        : [...prev, id];
    });
  };

  const handleSelectsAllId = () => {
    console.log("select all checked..")
    setSelectsId((prev) => {
      return prev.length === filteredAndSortedTransactions.length
        ? []
        : filteredAndSortedTransactions.map((t) => t.id);
    });
  };

  const handleSort = (field) => {
    setSortConfig((prev) => {
      const obj = {
        field,
        direction:
          prev.field === field && prev.direction === "asc" ? "desc" : "asc",
      };
      return obj;
    });
  };

  console.log(selectsId);

  return (
    <div className="space-y-4">
      {/* FILTERS  */}

      {/* TRANSACTIONS */}

      <div className="rounded-md border">
        <Table>
          <TableHeader className="text-muted-foreground">
            <TableRow className="">
              <TableHead className="w-[50px] cursor-pointer">
                <Checkbox
                  className="cursor-pointer"
                  onCheckedChange={() => {
                    handleSelectsAllId();
                  }}
                  checked={
                    selectsId.length === filteredAndSortedTransactions.length &&
                    filteredAndSortedTransactions.length > 0
                  }
                />
              </TableHead>

              <TableHead
                className="cursor-pointer text-muted-foreground"
                onClick={() => handleSort("date")}
              >
                <div className="flex item-center justify-start">
                  Date
                  {sortConfig.field === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>

              <TableHead className="text-muted-foreground">
                <div className="flex item-center justify-start">
                  Description
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer text-muted-foreground"
                onClick={() => handleSort("category")}
              >
                <div className="flex item-center justify-start">
                  Category
                  {sortConfig.field === "category" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer text-muted-foreground"
                onClick={() => handleSort("amount")}
              >
                <div className="flex item-center justify-end">
                  Amount
                  {sortConfig.field === "amount" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>

              <TableHead className={"text-muted-foreground"}>
                Recurring
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {/* RENDER */}
            {filteredAndSortedTransactions.length === 0 ? (
              <TableRow>
                <TableCell
                  className="text-center text-muted-foreground"
                  colSpan={7}
                >
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedTransactions.map((transaction) => {
                return (
                  <TableRow className={"space-y-3"} key={transaction.id}>
                    <TableCell>
                      <Checkbox
                        className={"cursor-pointer"}
                        onCheckedChange={(e) => handleSelectsId(transaction.id)}
                        checked={selectsId.includes(transaction.id)}
                      />
                    </TableCell>
                    <TableCell>
                      {format(new Date(transaction.date), "PP")}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className={"capitalize"}>
                      <span
                        style={{
                          background: categoryColors[transaction.category],
                        }}
                        className="px-2 py-2 rounded text-white text-sm"
                      >
                        {transaction.category}
                      </span>
                    </TableCell>
                    <TableCell
                      className={"text-right font-medium"}
                      style={{
                        color: transaction.type === "EXPENSE" ? "red" : "green",
                      }}
                    >
                      {transaction.type === "EXPENSE" ? "-" : "+"}$
                      {transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {transaction.isRecurring ? (
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge
                              variant="outline"
                              className={
                                "gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200"
                              }
                            >
                              <RefreshCcw className="h-3 w-3" />
                              {
                                RECURRING_INTERVALS[
                                  transaction.recurringInterval
                                ]
                              }
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="flex gap-2 text-sm">
                              <div className="font-medium">Next Date : </div>
                              <div>
                                {format(
                                  new Date(transaction.nextRecurringDate),
                                  "PP"
                                )}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Badge variant="outline" className={"gap-2"}>
                          <Clock className="h-3 w-3" />
                          One Time
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={"ghost"} className="h-8 w-8 p-0">
                            <MoreHorizontal className="cursor-pointer h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Action</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              console.log("Edit Clicked..");
                              router.push(
                                `/transaction/create?edit=${transaction.id}}`
                              );
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => {}}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
