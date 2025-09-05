import CreateAccountDrawer from "@/components/CreateAccountDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

const DashboardPage = () => {
  return (
    <div>
      {/* Budget Progess */}
      {/* Overview */}
      {/* Account Grid */}
      <div className="grid md:gri-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md w-full cursor-pointer trasition-shadow border-dashed ">
            <CardContent className="flex flex-col items-center text-muted-foreground pt-2 w-full h-full justify-center">
              <Plus className="h-10 w-full mb-2"></Plus>
              <p>Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
      </div>
    </div>
  );
};

export default DashboardPage;
