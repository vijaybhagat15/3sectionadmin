import axios from "axios";
import { Edit, Trash2, Eye, Filter, Search, UserPlus, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import {  GET_ALL_SCHOOLADMINS, requestOptions } from "../../Utils/api";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxSelector";
import { RootState } from "../../Redux/Store/store";
import { AllAdminApiResponse, DeleteApiResponse } from "../../Types/superAdmin";
import { setAllAdmins, deleteAdmin } from "../../Redux/Slice/schoolAdminSlice";
import { UserType } from "../../Types/redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ManageAdmins = () => {
  const { allAdmins } = useAppSelector((state: RootState) => state?.schooladmin);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<AllAdminApiResponse>(GET_ALL_SCHOOLADMINS, requestOptions);
      if (response?.data?.success) {
        dispatch(setAllAdmins(response?.data?.data));
        toast.success(response?.data?.message || "Admins loaded successfully.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load admins");
      console.error("Error fetching admins:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAdmins();
  }, [dispatch]);

  const uniqueRoles = allAdmins ? [...new Set(allAdmins.map((admin: UserType) => admin.role))] : [];
  console.log("uniqueRoles", uniqueRoles);


  // const handleDelete = async (id: string) => {
  //   if (!window.confirm("Are you sure you want to delete this admin?")) return;

  //   setIsLoading(true);
  //   try {
  //     const response = await axios.delete<DeleteApiResponse>(`${DELETE_SCHOOLADMIN}/${id}`, requestOptions);
  //     if (response?.data?.success) {
  //       dispatch(deleteAdmin(id));
  //       toast.success(response?.data?.message || "Admin deleted successfully.");
  //     }
  //   } catch (error: any) {
  //     toast.error(error?.response?.data?.message || "Failed to delete admin. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  function handleRoleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = e.target.value;
    if (selectedValue === "all") {
      setRoleFilter("all");
    } else {
      const role = uniqueRoles.find((role) => role === selectedValue);
      if (role) {
        setRoleFilter(role);
      } else {
        console.error(`Invalid role selected: ${selectedValue}`);
      }
    }
  }

  const filteredAdmins = allAdmins ? allAdmins.filter((admin: UserType) => {
    const matchesSearch = searchTerm === "" || admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || admin.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || admin.status === statusFilter;
    const matchesRole = roleFilter === "all" || admin.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  }) : [];

  return (
    <div className="bg-surface rounded-lg shadow-md p-6 w-full">
      <Helmet>
        <title>Manage School Administrators</title>
        <meta name="description" content="Manage School Administrators" />
      </Helmet>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-primary">Manage School Administrators</h2>
        <button onClick={() => navigator("/superadmin/add-school-admin")} className="flex items-center gap-2 px-4 py-2 btn-primary">
          <UserPlus size={18} />
          <span>Add New schoolAdmin</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* total admins */}
        <div className="p-4 rounded-lg border border-color flex flex-col justify-center items-center">
          <h3 className="text-blue-800 text-md font-medium mb-1">Total Admins</h3>
          <p className="text-2xl font-bold text-blue-700">{allAdmins?.length || 0}</p>
        </div>

        {/* active admins */}
        <div className=" p-4 rounded-lg border border-color flex flex-col justify-center items-center">
          <h3 className="text-green-800 text-sm font-medium mb-1">Active Admins</h3>
          <p className="text-2xl font-bold text-green-700">
            {allAdmins?.filter((admin: UserType) => admin.status === "active").length || 0}
          </p>
        </div>

        {/* inactive admins */}
        <div className="p-4 rounded-lg border border-color flex flex-col justify-center items-center">
          <h3 className="text-red-800 text-sm font-medium mb-1">Inactive Admins</h3>
          <p className="text-2xl font-bold text-red-700">
            {allAdmins?.filter((admin: UserType) => admin.status === "inactive").length || 0}
          </p>
        </div>

        {/* unique roles */}
        <div className="p-4 rounded-lg border border-color">
          <h3 className="text-purple-800 text-sm font-medium mb-1">Admin Roles</h3>
          <p className="text-2xl font-bold text-purple-700">{uniqueRoles.length || 0}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-2 border border-color rounded-md focus:outline-none input-field"
          />
        </div>

        {/* Status and Role Filters */}
        <div className="flex gap-2">

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none border bg-surface border-color rounded-md py-2 pl-3 pr-10 input-field"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={handleRoleFilterChange}
              className="appearance-none bg-surface border border-color rounded-md py-2 pl-3 pr-10 input-field"
            >
              <option value="all">All Roles</option>
              {uniqueRoles.map((role) => (
                <option key={role} value={role || "N/A"} className="capitalize">{role}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>

          <button
            onClick={fetchAdmins}
            className="flex items-center gap-1 border border-color cursor-pointer transition p-2 rounded-md"
            title="Refresh"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Admin Table */}
      <div className="overflow-x-auto border border-color rounded-lg">
        <table className="w-full">
          <thead className="bg-surface">
            <tr className="text-left border-b border-color">
              <th className="p-3 font-medium text-secondary">Name</th>
              <th className="p-3 font-medium text-secondary">Email</th>
              <th className="p-3 font-medium text-secondary">Role</th>
              <th className="p-3 font-medium text-secondary">Joined Date</th>
              <th className="p-3 font-medium text-secondary">Status</th>
              <th className="p-3 font-medium text-secondary">Last Login</th>
              <th className="p-3 font-medium text-secondary">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  <div className="flex justify-center items-center">
                    <RefreshCw size={20} className="animate-spin mr-2" />
                    <span>Loading administrators...</span>
                  </div>
                </td>
              </tr>
            ) : filteredAdmins.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-4 text-secondary">
                  No administrators found matching your filters
                </td>
              </tr>
            ) : (
              filteredAdmins.map((admin: UserType) => (
                <tr key={admin._id} className="border-b border-color bg-surface-hover">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-primary font-medium capitalize border border-color">
                        {admin.firstName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{admin.firstName} {admin.lastName || ""}</p>
                        <p className="text-xs text-secondary">{admin?._id?.substring(0, 12) || "N/A"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{admin.email.substring(0, 10) + "..."}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {admin.role}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-secondary">
                    {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${admin.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      {admin.status || "N/A"}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-secondary">
                    {admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : "Never"}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1 text-secondary transition rounded-full hover:bg-blue-50 cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={16} className="hover:text-blue-600 z-20" />
                      </button>
                      <button
                        className="p-1 text-secondary transition rounded-full hover:bg-green-50 cursor-pointer"
                        title="Edit Admin"
                      >
                        <Edit size={16} className="hover:text-green-600 z-20" />
                      </button>
                      <button
                        className="p-1 text-secondary transition rounded-full hover:bg-red-50 cursor-pointer"
                        title="Delete Admin"
                        onClick={() => handleDelete(admin._id || "")}
                      >
                        <Trash2 size={16} className="hover:text-red-600 z-20" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-secondary">
          Showing <span className="font-medium">{filteredAdmins.length}</span> of{" "}
          <span className="font-medium">{allAdmins?.length || 0}</span> administrators
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-md btn-secondary">
            Previous
          </button>
          <button className="px-3 py-1 border rounded-md btn-primary">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmins;