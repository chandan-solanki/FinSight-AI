"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { endOfDay, format, startOfDay, subDays } from "date-fns";
import { Gruppo } from "next/font/google";
import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DATA_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

const AccountChart = ({ transactions }) => {
  const [dataRange, setDataRange] = useState("6M");

  const filterTransationData = useMemo(() => {
    const range = DATA_RANGES[dataRange];
    const now = new Date();

    console.log({ now });

    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    // const startDate = new Date("Sat Jun 30 2025 00:00:00");

    console.log({ startDate });

    const filterData = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );

    console.log("filterdata , ", filterData);

    const grouped = filterData.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), "MMM dd");

      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }

      if (transaction.type === "INCOME") {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }

      return acc;
    }, {});

    // console.log("grouped : ", grouped);

    return Object.values(grouped).sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }, [dataRange, transactions]);

  const total = useMemo(() => {
    return filterTransationData.reduce(
      (acc, day) => {
        acc.income += day.income;
        acc.expense += day.expense;
        return acc;
      },
      { income: 0, expense: 0 }
    );
  }, [filterTransationData]);

  console.log({ total });

  console.log("filterTransationData ", filterTransationData);

  return (
    <Card>
      <CardHeader className="flex justify-between items-center space-x-0.5">
        <CardTitle className="text-base font-normal">
          Transaction Overview
        </CardTitle>
        <Select defaultValue={dataRange} onValueChange={setDataRange}>
          <SelectTrigger className="w-[160px] cursor-pointer">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(DATA_RANGES).map(([key, { label }]) => {
              return (
                <SelectItem className="cursor-pointer" value={key}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <div className="flex flex-row justify-around mb-7 text-sm">
          <div className="text-center">
            <p className="text-muted-foreground">Total Income</p>
            <p className="font-bold text-lg text-green-500">
              {total.income.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Total Expense</p>
            <p className="font-bold text-lg text-red-500">
              {total.expense.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Total Income</p>
            <p
              className={`font-bold text-lg ${
                total.income - total.expense.toFixed(2) >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {total.income - total.expense.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filterTransationData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, undefined]}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Bar
                dataKey="income"
                name={"Income"}
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="expense"
                name={"Expense"}
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountChart;
