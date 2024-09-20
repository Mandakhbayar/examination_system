import { useState, useEffect, ReactElement } from "react";
import { useRouter } from "next/router";
import { User } from "../../../utils/types";
import Alert from "../../../components/ui/alert";
import LoadingScreen from "../../../components/loading-screen";
import axiosInterceptorInstance from "../../../config/api-interceptor";
import DashboardSidebar from "@/components/layouts/dashboard-sidebar";
import { Routes } from "@/utils/routes";
import CustomButton from "@/components/ui/button";

const UsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInterceptorInstance.get(
        `/users?page=${page}&limit=${limit}`
      );
      setUsers(response.data.users);
      setTotalUsers(response.data.total);
      setIsLoading(false);
    } catch {
      setError("Error fetching users");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  const handleEdit = (id: number) => {
    router.push(Routes.admin.userDetail(id));
  };

  const totalPages = Math.ceil(totalUsers / limit);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-6 text-black">Users</h1>
      {error && <Alert message={error} />}
      {!isLoading && !error && (
        <>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                  ID
                </th>
                <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                  First Name
                </th>
                <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                  Last Name
                </th>
                <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                  Email
                </th>
                <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                  Phone Number
                </th>
                <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-200">
                  <td className="py-3 px-6 text-gray-700">{user.id}</td>
                  <td className="py-3 px-6 text-gray-700">{user.firstname}</td>
                  <td className="py-3 px-6 text-gray-700">{user.lastname}</td>
                  <td className="py-3 px-6 text-gray-700">{user.email}</td>
                  <td className="py-3 px-6 text-gray-700">
                    {user.phone_number}
                  </td>
                  <td className="py-3 px-6">
                    <CustomButton
                      type="next"
                      label="Edit"
                      onClick={() => handleEdit(user.id!)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-between items-center">
            {page > 1 && (
              <button
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-200 transition-colors duration-300"
              >
                Previous
              </button>
            )}
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <button
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-200 transition-colors duration-300"
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className="flex">
      <DashboardSidebar className="w-1/5" />
      <div className="w-4/5">{page}</div>
    </div>
  );
};

export default UsersPage;
