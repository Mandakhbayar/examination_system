import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { User } from "../../../utils/types";
import Alert from "../../../components/ui/alert";
import LoadingScreen from "../../../components/loading-screen";
import axiosInterceptorInstance from "../../../config/api-interceptor";

const UsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
    fetchUsers();
  }, [page, limit]);

  const handleEdit = (id: number) => {
    // router.push(`/admin/edit-user?id=${id}`);
  };

  const totalPages = Math.ceil(totalUsers / limit);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto p-4">
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
                    {user.phoneNumber}
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleEdit(user.id!)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition-colors duration-300"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-200 transition-colors duration-300"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-200 transition-colors duration-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersPage;
