import React, { useState, ChangeEvent } from "react";
import { Helmet } from "react-helmet";
import {
  FaCloudUploadAlt,
  FaDownload,
  FaRedo,
  FaTrashAlt,
  FaSearch,
} from "react-icons/fa";

interface Backup {
  id: number;
  date: string;
  time: string;
  type: string;
  size: string;
  status: string;
}

//static backup data
const backups: Backup[] = [
  {
    id: 1,
    date: "2025-04-12",
    time: "10:00 AM",
    type: "Full Backup",
    size: "2.4 GB",
    status: "Completed",
  },
  {
    id: 2,
    date: "2025-04-10",
    time: "2:30 AM",
    type: "Incremental Backup",
    size: "650 MB",
    status: "Completed",
  },
  {
    id: 3,
    date: "2025-04-08",
    time: "6:15 PM",
    type: "Full Backup",
    size: "3.1 GB",
    status: "Failed",
  },
];

const DataBackups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  //handle search backups
  const filteredBackups = backups.filter(
    (backup) =>
      backup.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      backup.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //handle search change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-6 sm:p-10  min-h-screen">
      <Helmet>
        <title>Data Backups</title>
        <meta name="description" content="Data Backups" />
      </Helmet>
      {/* heading */}
      <h2 className="text-4xl font-extrabold mb-6">🔁 Data Backup</h2>

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-3">
        <input
          type="text"
          className="w-[30%] mt-1 p-2 border border-color rounded-md outline-none input-field transition-all"
          placeholder="Search backups..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FaSearch className="" />
      </div>

      {/* Backup History */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">📜 Backup History</h3>
        <div className="space-y-4">
          {filteredBackups.map((backup) => (
            <div
              key={backup.id}
              className="bg-surface shadow rounded-lg p-5 flex justify-between items-center hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-semibold">
                  {backup.date} at {backup.time}
                </p>
                <p className="text-sm ">
                  {backup.type} • {backup.size} •{" "}
                  <span
                    className={`font-medium ${
                      backup.status === "Completed"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {backup.status}
                  </span>
                </p>
              </div>
              <div className="flex gap-4 ">
                <button className="hover:text-blue-400 cursor-pointer">
                  <FaDownload title="Download" />
                </button>
                <button className="hover:text-green-400 cursor-pointer">
                  <FaRedo title="Restore" />
                </button>
                <button className="hover:text-red-400 cursor-pointer">
                  <FaTrashAlt title="Delete" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Backup Scheduling */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold  mb-4">🗓 Backup Scheduling</h3>
        <div className="bg-surface p-6 rounded-lg shadow-md">
          <p className="font-semibold">Schedule your automatic backups</p>
          <div className="mt-4 flex gap-6 flex-wrap">
            <div className="flex flex-col">
              <label className="text-sm ">Backup Type</label>
              <select className="mt-1 px-4 py-2 border border-color rounded-md outline-none input-field transition-all bg-surface">
                <option>Full Backup</option>
                <option>Incremental Backup</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm ">Frequency</label>
              <select className="mt-1 px-4 py-2 border border-color rounded-md outline-none input-field transition-all bg-surface">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm ">Time</label>
              <input
                type="time"
                className="mt-1 px-4 py-2 border border-color rounded-md outline-none input-field transition-all bg-surface"
              />
            </div>
          </div>
          {/* save button */}
          <button className="px-3 py-2 btn-primary text-primary rounded hover:bg-primary/90 text-sm my-3">
            Save Schedule
          </button>
        </div>
      </div>

      {/* Restore from File */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold  mb-4">Restore from File</h3>
        <div className="border-4 border-dashed border-gray-300 p-10 rounded-lg text-center bg-surface hover:border-blue-400 transition">
          <FaCloudUploadAlt
            size={50}
            className="mx-auto mb-4 text-blue-600 cursor-pointer"
          />
          <p className="font-medium ">
            Drag and drop a backup file here, or click to upload
          </p>
        </div>
      </div>

      {/* Admin Action Log */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">📄 Admin Action Log</h3>
        <ul className="bg-surface rounded-lg shadow divide-y divide-gray-200">
          <li className="p-4">[2025-04-12] Admin created full backup.</li>
          <li className="p-4">
            [2025-04-10] Incremental backup completed successfully.
          </li>
          <li className="p-4">
            [2025-04-05] Deleted backup older than 30 days.
          </li>
        </ul>
      </div>

      {/* Backup Health Check */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold  mb-4">⚠️ Backup Health Check</h3>
        <div className="bg-surface p-6 rounded-lg shadow-md">
          <p className="font-semibold ">System Status</p>
          <div className="mt-4">
            <p className="">
              Disk space:{" "}
              <span className="font-medium text-green-500">Healthy</span>
            </p>
            <p className="">
              Backup success rate:{" "}
              <span className="font-medium text-green-500">95%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataBackups;
