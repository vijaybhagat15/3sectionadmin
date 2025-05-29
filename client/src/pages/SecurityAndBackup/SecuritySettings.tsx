import React, { useState } from "react";
import { Helmet } from "react-helmet";

const SecuritySettings: React.FC = () => {
  const [specialChar, setSpecialChar] = useState(false);
  const [requireNumber, setRequireNumber] = useState(false);
  const [enable2FA, setEnable2FA] = useState(false);
  const [ipInput, setIpInput] = useState("");
  const [allowedIPs, setAllowedIPs] = useState<string[]>(["192.168.0.1"]);
  //static trusted devices data
  const [trustedDevices, setTrustedDevices] = useState<string[]>([
    "Laptop - Chrome - 192.168.1.10",
    "Mobile - Firefox - 192.168.1.12",
  ]);

  const [editingDeviceIndex, setEditingDeviceIndex] = useState<number | null>(
    null
  );
  const [deviceInput, setDeviceInput] = useState("");
  //handle add ip
  const handleAddIP = () => {
    if (isValidIP(ipInput.trim()) && !allowedIPs.includes(ipInput.trim())) {
      setAllowedIPs([...allowedIPs, ipInput.trim()]);
      setIpInput("");
    } else {
      alert("Please enter a valid IP address.");
    }
  };

  //handle remove ip
  const handleRemoveIP = (ip: string) => {
    setAllowedIPs(allowedIPs.filter((item) => item !== ip));
  };

  //handle edit
  const handleEditDevice = (index: number) => {
    setEditingDeviceIndex(index);
    setDeviceInput(trustedDevices[index]);
  };

  //handle save
  const handleSaveDevice = () => {
    const updatedDevices = [...trustedDevices];
    updatedDevices[editingDeviceIndex!] = deviceInput.trim();
    setTrustedDevices(updatedDevices);
    setEditingDeviceIndex(null);
    setDeviceInput("");
  };
  //handle remove devices
  const handleRemoveDevice = (index: number) => {
    const updatedDevices = trustedDevices.filter((_, i) => i !== index);
    setTrustedDevices(updatedDevices);
  };

  //check valid ip
  const isValidIP = (ip: string) => {
    const regex =
      /^(25[0-5]|2[0-4]\d|1?\d{1,2})(\.(25[0-5]|2[0-4]\d|1?\d{1,2})){3}$/;
    return regex.test(ip);
  };

  const inputStyling =
    "mt-1 px-4 py-2 w-full bg-surface border border-color rounded-md outline-none input-field transition-all bg-surface";

  return (
    <div className="bg-surface rounded-lg shadow-md p-3 w-full">
      <Helmet>
        <title>Security Settings</title>
        <meta name="description" content="Security Settings" />
      </Helmet>
      <div className="p-2 max-w-6xl mx-auto">
        {/* heading */}
        <h1 className="text-3xl font-bold mb-6">🔐 Security Settings</h1>

        {/* Password Policy */}
        <div className="bg-surface border border-color rounded-lg shadow-md w-[100%] p-6 mb-6 space-y-4">
          <h2 className="text-xl font-semibold">Password Policy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Minimum Length
              </label>
              <input
                type="number"
                placeholder="e.g. 8"
                className={inputStyling}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Password Expiry (days)
              </label>
              <input
                type="number"
                placeholder="e.g. 90"
                className={inputStyling}
              />
            </div>
          </div>
          <div className="flex gap-6 mt-4 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={specialChar}
                onChange={() => setSpecialChar(!specialChar)}
                className="h-4 w-4"
              />
              Require Special Characters
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={requireNumber}
                onChange={() => setRequireNumber(!requireNumber)}
                className="h-4 w-4"
              />
              Require Numbers
            </label>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-surface shadow-md border border-color rounded-xl p-5 mb-6 space-y-4">
          <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={enable2FA}
                onChange={() => setEnable2FA(!enable2FA)}
                className="h-4 w-4"
              />
              Enable 2FA
            </label>
            <div>
              <label className="block text-sm font-medium">Method</label>
              <select className={inputStyling}>
                <option>Select Method</option>
                <option>Email</option>
                <option>SMS</option>
                <option>Authenticator App</option>
              </select>
            </div>
          </div>
        </div>

        {/* Login Attempts */}
        <div className="bg-surface shadow-md border border-color rounded-xl p-5 mb-6 space-y-4">
          <h2 className="text-xl font-semibold">Login Attempt Limit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Max Failed Attempts
              </label>
              <input
                type="number"
                placeholder="e.g. 5"
                className={inputStyling}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Lockout Duration (minutes)
              </label>
              <input
                type="number"
                placeholder="e.g. 15"
                className={inputStyling}
              />
            </div>
          </div>
        </div>

        {/* Session Timeout */}
        <div className="bg-surface w-full shadow-md border border-color rounded-xl p-5 mb-6 space-y-4">
          <h2 className="text-xl font-semibold">Session Timeout</h2>
          <div className="w-full ">
            <label className="block text-sm font-medium">
              Timeout Duration (minutes)
            </label>
            <input
              type="number"
              placeholder="e.g. 30"
              className={inputStyling}
            />
          </div>
        </div>

        {/* Trusted Devices */}
        <div className="bg-surface shadow-md border border-color rounded-xl p-5 mb-6 space-y-4">
          <h2 className="text-xl font-semibold">Trusted Devices</h2>
          <p className="text-sm ">
            Manage devices allowed to access the system.
          </p>
          <ul className="divide-y divide-gray-200">
            {trustedDevices.map((device, index) => (
              <li
                key={index}
                className="py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
              >
                {editingDeviceIndex === index ? (
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:items-center">
                    <input
                      type="text"
                      value={deviceInput}
                      onChange={(e) => setDeviceInput(e.target.value)}
                      className={inputStyling}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveDevice}
                        className="text-green-600 hover:underline cursor-pointer"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingDeviceIndex(null)}
                        className="text-gray-500 hover:underline cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span>{device}</span>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEditDevice(index)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveDevice(index)}
                        className="text-red-600 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Allowed IPs */}
        <div className="bg-surface shadow-md border border-color rounded-xl p-5 mb-6 space-y-4">
          <h2 className="text-xl font-semibold">Allowed IPs</h2>
          <input
            type="text"
            value={ipInput}
            onChange={(e) => setIpInput(e.target.value)}
            placeholder="Enter an IP Address"
            className={inputStyling}
          />
          <ul className="mt-4 space-y-2">
            {allowedIPs.map((ip, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-surface p-2 rounded"
              >
                <span>{ip}</span>
                <button
                  onClick={() => handleRemoveIP(ip)}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleAddIP}
            className="mt-2 btn-success text-white px-4 py-2 rounded "
          >
            Add IP
          </button>
        </div>

        {/* Save Button */}
        <div className="text-center mt-6">
          <button className="btn-primary text-primary rounded hover:bg-primary/90 text-sm my-3">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
