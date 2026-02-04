import React from "react";
import { CheckCircle, Clock } from "lucide-react";

export default function AdminStats({ data, label, icon }) {
  const activeCount = data.filter(
    (item) => item.is_active || item.is_upcoming || item.status === "active",
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total {label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {data.length}
            </p>
          </div>
          <div className="p-3 bg-yellow-100 rounded-lg">{icon}</div>
        </div>
      </div>

      {/* Active Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">
              Active / Upcoming
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {activeCount}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <CheckCircle size={20} className="text-green-600" />
          </div>
        </div>
      </div>

      {/* Timestamp Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Last Updated</p>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {data.length > 0 ? "Today" : "No data"}
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <Clock size={20} className="text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
