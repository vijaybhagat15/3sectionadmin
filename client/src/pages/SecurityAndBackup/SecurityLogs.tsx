import React, { useState, ChangeEvent } from "react";
import { Helmet } from "react-helmet";
import {
  FaSignInAlt,
  FaTimesCircle,
  FaKey,
  FaExclamationTriangle,
  FaSearch,
  FaDownload,
} from "react-icons/fa";

interface CardData {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface LogEntry {
  id: number;
  timestamp: string;
  event: string;
  user: string;
  ip: string;
  device: string;
  status: "Success" | "Failed";
}
//static card data
const cardsData: CardData[] = [
  {
    title: "Total Logins",
    value: "1248",
    icon: <FaSignInAlt size={30} />,
    color: "text-purple-800",
  },
  {
    title: "Failed Logins",
    value: "261",
    icon: <FaTimesCircle size={30} />,
    color: "text-red-800",
  },
  {
    title: "Password Changes",
    value: "54",
    icon: <FaKey size={30} />,
    color: "text-green-800",
  },
  {
    title: "Suspicious Activity",
    value: "3",
    icon: <FaExclamationTriangle size={30} />,
    color: "text-blue-800",
  },
];

//static logs data
const logs: LogEntry[] = [
  {
    id: 1,
    timestamp: "2025-04-01 11:21:45",
    event: "Login Attempt",
    user: "admin_890",
    ip: "192.168.10.2",
    device: "Chrome on Windows",
    status: "Success",
  },
  {
    id: 2,
    timestamp: "2025-04-13 06:25:01",
    event: "Password Reset",
    user: "user123",
    ip: "172.16.254.3",
    device: "Safari on MacOS",
    status: "Failed",
  },
  {
    id: 3,
    timestamp: "2025-04-13 01:46:54",
    event: "User Account Created",
    user: "user_xyz",
    ip: "172.168.10.3",
    device: "Firefox on Windows",
    status: "Success",
  },
];

const SecurityLogs: React.FC = () => {
  //handling of search
  const [search, setSearch] = useState<string>("");

  const filteredLogs = logs.filter((log) =>
    log.event.toLowerCase().includes(search.toLowerCase())
  );
  //function to handle change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="p-6 w-full text-primary overflow-y-auto">
      <Helmet>
        <title>Security Logs</title>
        <meta name="description" content="Security Logs" />
      </Helmet>
      {/* heading */}
      <h2 className="text-4xl font-extrabold mb-8 flex items-center gap-2">
        🛡️ Security Logs
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border border-blue-100 hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center gap-2  shadow"
          >
            <h3 className={`text-lg font-medium mb-1 ${card.color}`}>
              {card.title}
            </h3>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            <div className="text-green-500 text-3xl">{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Security Alerts */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Recent Security Alerts</h3>
        <div className="space-y-3">
          <div className="bg-surface p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <p className="font-bold">Multiple Failed Logins</p>
              <p className="text-sm">
                From IP 192.168.0.15 - Detected 6 failed attempts in 2 mins
              </p>
            </div>
            <button className="text-sm btn-secondary text-white px-3 py-1 rounded-md">
              Investigate
            </button>
          </div>
          <div className="bg-surface p-4 rounded-lg shadow-sm">
            <p className="font-bold">Unusual Activity</p>
            <p className="text-sm">
              Login from unrecognized device - user456 (Edge on Linux)
            </p>
          </div>
        </div>
      </div>

      {/* Search & Export Logs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by event"
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-surfcae"
            value={search}
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute left-3 top-3 " />
        </div>
        <button className="flex items-center gap-2 btn-primary text-white cursor-pointer px-5 py-2 rounded-lg hover:bg-green-700 transition">
          <FaDownload /> Export Logs
        </button>
      </div>

      {/* User Activity Summary */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">
          📊 User Activity Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-medium mb-2">Active Users Today</h4>
            <p className="text-4xl font-bold text-blue-700">215</p>
          </div>
          <div className="bg-surface p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-medium mb-2">
              Failed Login Attempts (Last 24 hours)
            </h4>
            <p className="text-4xl font-bold text-red-600">45</p>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto border shadow-md rounded-lg">
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-surface uppercase text-xs">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Event</th>
              <th className="p-4">User</th>
              <th className="p-4">IP Address</th>
              <th className="p-4">Device</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="bg-surface">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id} className="border-t">
                  <td className="p-4">{log.timestamp}</td>
                  <td className="p-4">
                    <span className="bg-surface px-2 py-1 rounded text-xs font-medium">
                      {log.event}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-blue-700">{log.user}</td>
                  <td className="p-4 ">{log.ip}</td>
                  <td className="p-4">{log.device}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        log.status === "Failed"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={6}>
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SecurityLogs;
