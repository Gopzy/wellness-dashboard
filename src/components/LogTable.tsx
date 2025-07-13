import React, { useMemo, useState } from "react";
import { useAppSelector } from "../store";
// import { useAppSelector } from "../../../store";

const LogTable: React.FC = () => {
  const logs = useAppSelector((state) => state.logs.entries);
  const [search, setSearch] = useState("");

  const filteredLogs = useMemo(() => {
    return logs.filter((log) =>
      log.notes?.toLowerCase().includes(search.toLowerCase())
    );
  }, [logs, search]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by notes..."
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-2 px-4 text-left">Mood</th>
              <th className="py-2 px-4 text-left">Sleep Hours</th>
              <th className="py-2 px-4 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="py-2 px-4">{log.mood}</td>
                <td className="py-2 px-4">{log.sleepHours}h</td>
                <td className="py-2 px-4">
                  {log.notes || <span className="text-gray-400">—</span>}
                </td>
              </tr>
            ))}
            {filteredLogs.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-4 text-gray-500 italic"
                >
                  No logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogTable;
