import { getAccounts, getDashboardData } from "@/actions/dashboard";
import CreateAccountDrawer from "@/components/CreateAccountDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import AccountCard from "./_components/account-card";
import { getCurrentBudget } from "@/actions/budget";
import BudgetProgress from "./_components/buget-progress";
import { Suspense } from "react";
import DashBoardOverview from "./_components/transaction-overview";

const DashboardPage = async () => {
  const accounts = await getAccounts();

  const defaultAccount = accounts.serializedAccount?.find((a) => a.isDefault);

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  const { serializeTransaction: transactions } = await getDashboardData();

  // console.log({ transactions });

  // console.log(accounts);

  // console.log({ budgetData });

  return (
    <div className="space-y-8">
      {/* Budget Progess */}
      {defaultAccount && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}
      {/* Overview */}

      <Suspense fallback={"Loading Overview...."}>
        <DashBoardOverview
          accounts={accounts.serializedAccount}
          transactions={transactions || []}
        />
      </Suspense>
      {/* Account Grid */}
      <div className="grid mt-3 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md w-full cursor-pointer trasition-shadow border-dashed ">
            <CardContent className="flex flex-col items-center text-muted-foreground pt-2 w-full h-full justify-center">
              <Plus className="h-10 w-full mb-2"></Plus>
              <p>Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.serializedAccount.length > 0 &&
          accounts.serializedAccount.map((account) => {
            return <AccountCard key={account.id} account={account} />;
          })}
      </div>
    </div>
  );
};

export default DashboardPage;
