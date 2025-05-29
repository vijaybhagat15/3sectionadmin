import React, { useState, useEffect } from "react";
import { CheckSquare, Square, Save, RefreshCw, AlertCircle, Check } from "lucide-react";
import { RolePreset } from "../../Types/superAdmin";
import { permissionsData } from "../../constants/constants";
import { Helmet } from "react-helmet";

export default function PermissionsPage() {
  const [roles, setRoles] = useState<RolePreset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const [activePermissions, setActivePermissions] = useState<number[]>([]);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>("");

  const fetchRoles = async (): Promise<RolePreset[]> => {
    // This would be replaced with an actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "superadmin",
            name: "superadmin",
            description: "Full system access with all permissions",
            permissions: [1, 2, 3, 4, 5, 6, 7, 8]
          },
          {
            id: "readonly",
            name: "readonly",
            description: "View-only access with no editing capabilities",
            permissions: [1]
          }
        ]);
      }, 500);
    });
  };

  // Mock API function to save role permissions
  const saveRolePermissions = async (roleId: string, permissions: number[]): Promise<boolean> => {
    // This would be replaced with an actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Saving permissions for role ${roleId}:`, permissions);
        resolve(true);
      }, 1000);
    });
  };

  // Fetch roles from backend on component mount
  useEffect(() => {
    const loadRoles = async () => {
      try {
        setLoading(true);
        const fetchedRoles = await fetchRoles();
        setRoles(fetchedRoles);

        // Set default selected role
        if (fetchedRoles.length > 0) {
          setSelectedRoleId(fetchedRoles[0].id);
          setActivePermissions(fetchedRoles[0].permissions);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error loading roles:", error);
        setSaveStatus("Failed to load roles from server");
        setLoading(false);
      }
    };

    loadRoles();
  }, []);

  // Get the currently selected role object
  const getSelectedRole = (): RolePreset | undefined => {
    return roles.find(role => role.id === selectedRoleId);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roleId = e.target.value;
    setSelectedRoleId(roleId);

    const selectedRole = roles.find(role => role.id === roleId);
    if (selectedRole) {
      setActivePermissions(selectedRole.permissions);
    } else {
      setActivePermissions([]);
    }

    setIsEdited(false);
    setSaveStatus(null);
  };

  const togglePermission = (permId: number) => {
    const selectedRole = getSelectedRole();
    if (!selectedRole) return;

    // Check if this is a required permission for superadmin
    const isRequiredForSuperAdmin = selectedRole.id === "superadmin" && permissionsData.find(p => p.id === permId)?.required === true;

    if (isRequiredForSuperAdmin) {
      // Show a visual indication that this permission cannot be toggled
      setSaveStatus("Cannot disable required permissions for superadmin role");
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }

    setIsEdited(true);
    if (activePermissions.includes(permId)) {
      setActivePermissions(activePermissions.filter(id => id !== permId));
    } else {
      setActivePermissions([...activePermissions, permId]);
    }
  };

  const resetToDefault = () => {
    const selectedRole = getSelectedRole();
    if (selectedRole) {
      setActivePermissions(selectedRole.permissions);
      setIsEdited(false);
      setSaveStatus(null);
    }
  };

  const handleSaveChanges = async () => {
    if (!selectedRoleId) return;

    try {
      setSaveStatus("Saving changes...");
      const success = await saveRolePermissions(selectedRoleId, activePermissions);

      if (success) {
        setRoles(roles.map(role => role.id === selectedRoleId ? { ...role, permissions: [...activePermissions] } : role));

        setSaveStatus("Changes saved successfully!");
        setIsEdited(false);

        // Clear the success message after 2 seconds
        setTimeout(() => setSaveStatus(null), 2000);
      } else {
        setSaveStatus("Failed to save changes. Please try again.");
        setTimeout(() => setSaveStatus(null), 3000);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      setSaveStatus("An error occurred. Please try again.");
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  // Filter permissions based on search input
  const filteredPermissions = permissionsData.filter(
    perm => perm.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      perm.description.toLowerCase().includes(searchFilter.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 w-full shadow-lg rounded-lg bg-surface flex justify-center items-center">
        <div className="flex items-center gap-2">
          <RefreshCw size={20} className="animate-spin" />
          <span>Loading roles...</span>
        </div>
      </div>
    );
  }

  const selectedRole = getSelectedRole();

  return (
    <div className="p-6 w-full shadow-lg rounded-lg bg-surface">
      <Helmet>
        <title>Manage Permissions</title>
        <meta name="description" content="Manage Permissions" />
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4"> Manage Permissions</h2>
      {/* Role Selection */}
      <div className="flex flex-wrap items-center gap-6 mb-6">
        <div className="flex flex-col">
          <label className="font-medium mb-1">
            Select Role:
          </label>
          <select
            className="p-2 w-56 rounded-lg border border-color bg-surface text-primary input-field"
            value={selectedRoleId}
            onChange={handleRoleChange}
            disabled={roles.length === 0}
          >
            {roles.length === 0 ? (
              <option value="">No roles available</option>
            ) : (
              roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex-1">
          <p className="italic mt-6">
            {selectedRole?.description || ""}
          </p>
        </div>
      </div>

      {/* Search Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search permissions..."
          className="p-2 w-full border border-color rounded-lg input-field"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </div>

      {/* Status Messages */}
      {saveStatus && (
        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${saveStatus.includes("success") ?
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
          saveStatus.includes("Cannot") || saveStatus.includes("Failed") || saveStatus.includes("error") ?
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          }`}>
          {saveStatus.includes("success") ? (
            <Check size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          {saveStatus}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mb-4">
        <button
          className={`flex items-center gap-1 justify-center px-4 border rounded-md py-1.5 border-color ${!isEdited ? "cursor-not-allowed" : "btn-secondary"}`}
          onClick={resetToDefault}
          disabled={!isEdited}
        >
          <RefreshCw size={16} /> Reset
        </button>
        <button
          className={`flex items-center gap-2 px-4 rounded-md  ${isEdited ?
            "btn-primary" : "bg-blue-400 cursor-not-allowed"
            } transition`}
          onClick={handleSaveChanges}
          disabled={!isEdited}
        >
          <Save size={16} /> Save Changes
        </button>
      </div>

      {/* Permissions Table */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full border border-color rounded-lg">
          <thead className="">
            <tr>
              <th className="p-3  border-color text-left">
                Permission Name
              </th>
              <th className="p-3  border-color text-left">
                Description
              </th>
              <th className="p-3  border-color text-center">
                Required
              </th>
              <th className="p-3  border-color text-center">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredPermissions.length > 0 ? (
              filteredPermissions.map((perm) => (
                <tr key={perm.id} className="border border-color bg-surface-hover transition">
                  <td className="p-3">{perm.name}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300 text-sm">{perm.description}</td>
                  <td className="p-3 text-center">
                    {perm.required ? (
                      <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full dark:bg-red-900 dark:text-red-200">
                        Required
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full dark:bg-gray-700 dark:text-gray-300">
                        Optional
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      className={`p-2 ${activePermissions.includes(perm.id) ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-800 dark:hover:text-blue-300 transition cursor-pointer`}
                      onClick={() => togglePermission(perm.id)}
                      disabled={selectedRole?.id === "superadmin" && perm.required}
                      title={selectedRole?.id === "superadmin" && perm.required ? "Required for superadmin" : ""}
                    >
                      {activePermissions.includes(perm.id) ? (
                        <CheckSquare size={20} />
                      ) : (
                        <Square size={20} />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No permissions match your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Help text */}
      {selectedRole?.id === "superadmin" && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
          Note: Required permissions for superadmin cannot be disabled as they are essential for system functionality.
        </p>
      )}
    </div>
  );
}