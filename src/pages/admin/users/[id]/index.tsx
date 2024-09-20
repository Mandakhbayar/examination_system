import { useState, useEffect, ReactElement } from "react";
import { useRouter } from "next/router";
import axiosInterceptorInstance from "@/config/api-interceptor";
import LoadingScreen from "@/components/loading-screen";
import Alert from "@/components/ui/alert";
import EditUserForm from "@/components/users/edit-user";
import { User } from "@/utils/types";
import DashboardSidebar from "@/components/layouts/dashboard-sidebar";

const EditUserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await axiosInterceptorInstance.get(`/users/${id}`);
          setUser(response.data);
          setIsLoading(false);
        } catch (err) {
          setError("Error fetching user data");
          setIsLoading(false);
        }
      };
      fetchUser();
    }
  }, [id]);
  if (isLoading) return <LoadingScreen/>;

  return (
    <div className="container p-6">
      {error && <Alert message={error}/>}
      <h1 className="text-2xl font-bold mb-6 text-black">Edit User</h1>

      <EditUserForm user={user}/>
    </div>
  );
};

EditUserPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className="flex">
      <DashboardSidebar className="w-1/5" />
      <div className="w-4/5">{page}</div>
    </div>
  );
};

export default EditUserPage;


