import React, { useMemo, useState } from "react";
import { useAppSelector } from "../store";

const LogTable: React.FC = () => {
  const logs = useAppSelector((state) => state.logs.logs);
  const [search, setSearch] = useState("");

  const filteredLogs = useMemo(() => {
    return logs.filter((log) =>
      log.notes?.toLowerCase().includes(search.toLowerCase())
    );
  }, [logs, search]);

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Wellness Logs</h2>
        <input
          type="text"
          placeholder="Search by activity notes..."
          className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredLogs.length === 0 ? (
        <p className="text-gray-500 text-center">No logs found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Mood
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Sleep (hrs)
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Activity Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-4 py-2">{log.mood}</td>
                  <td className="px-4 py-2">{log.sleepHours}</td>
                  <td className="px-4 py-2">{log.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LogTable;
