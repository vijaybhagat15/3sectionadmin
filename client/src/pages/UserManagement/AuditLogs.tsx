import { useEffect, useState } from "react";
import { AuditLog } from "../../Types/superAdmin";
import { dummyLogs } from "../../constants/constants";
import { Helmet } from "react-helmet";

const AuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAdmin, setFilterAdmin] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<"all" | "low" | "medium" | "high">("all");
  const [sortBy, setSortBy] = useState<"timestamp" | "admin" | "severity">("timestamp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [expandedLog, setExpandedLog] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  useEffect(() => {
    setLogs(dummyLogs);
  }, []);

  // Get unique admin names for filter dropdown
  const uniqueAdmins = Array.from(new Set(logs.map(log => log.adminName)));

  // Apply filters and search
  const filteredLogs = logs.filter(log => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.details?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

    const matchesAdmin = filterAdmin === "" || log.adminName === filterAdmin;
    const matchesSeverity = filterSeverity === "all" || log.severity === filterSeverity;

    return matchesSearch && matchesAdmin && matchesSeverity;
  });

  // Apply sorting
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    if (sortBy === "timestamp") {
      return sortOrder === "asc"
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (sortBy === "admin") {
      return sortOrder === "asc"
        ? a.adminName.localeCompare(b.adminName)
        : b.adminName.localeCompare(a.adminName);
    } else {
      // Sort by severity
      const severityValue = { low: 1, medium: 2, high: 3 };
      return sortOrder === "asc"
        ? severityValue[a.severity] - severityValue[b.severity]
        : severityValue[b.severity] - severityValue[a.severity];
    }
  });

  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = sortedLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(sortedLogs.length / logsPerPage);

  const handleSort = (column: "timestamp" | "admin" | "severity") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 shadow w-full rounded-lg bg-surface">
      <Helmet>
        <title>Audit Logs</title>
        <meta name="description" content="Audit Logs" />
      </Helmet>
      <h2 className="text-2xl font-semibold text-primary">Audit Logs</h2>

      <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
        {/* Search bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-color input-field rounded"
          />
        </div>

        {/* Admin filter */}
        <div className="w-full md:w-64">
          <select
            value={filterAdmin}
            onChange={(e) => setFilterAdmin(e.target.value)}
            className="w-full p-2 border border-color input-field bg-surface rounded"
          >
            <option value="">All Admins</option>
            {uniqueAdmins.map((admin) => (
              <option key={admin} value={admin}>{admin}</option>
            ))}
          </select>
        </div>

        {/* Severity filter */}
        <div className="w-full md:w-64">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value as any)}
            className="w-full p-2 border border-color rounded input-field bg-surface"
          >
            <option value="all">All Severities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full border border-color rounded-lg">
          <thead className="bg-surface">
            <tr className="text-left">
              <th className="p-3 border border-color cursor-pointer" onClick={() => handleSort("admin")}>
                <div className="flex items-center">
                  Admin
                  {sortBy === "admin" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
              <th className="p-3 border border-color">Action</th>
              <th className="p-3 border border-color cursor-pointer" onClick={() => handleSort("timestamp")}>
                <div className="flex items-center">
                  Timestamp
                  {sortBy === "timestamp" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
              <th className="p-3 border border-color">IP Address</th>
              <th className="p-3 border border-color cursor-pointer" onClick={() => handleSort("severity")}>
                <div className="flex items-center">
                  Severity
                  {sortBy === "severity" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.map((log,i) => (
              <>
                <tr
                  key={i}
                  className="border border-color bg-surface-hover cursor-pointer"
                  onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                >
                  <td className="p-3">{log.adminName}</td>
                  <td className="p-3">{log.action}</td>
                  <td className="p-3">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="p-3">{log.ipAddress}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                      {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                    </span>
                  </td>
                </tr>
                {expandedLog === log.id && (
                  <tr className="bg-surface-active">
                    <td colSpan={5} className="p-4 border border-gray-200">
                      <div className="text-sm">
                        <h4 className="font-semibold mb-2">Details:</h4>
                        <p>{log.details}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstLog + 1}-{Math.min(indexOfLastLog, sortedLogs.length)} of {sortedLogs.length} logs
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-color btn-secondary disabled:opacity-75"
            >
              Prev..
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-color btn-primary disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;