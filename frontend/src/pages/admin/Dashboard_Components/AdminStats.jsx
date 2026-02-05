import React from "react";
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  AlertCircle,
  Archive
} from "lucide-react";

export default function AdminStats({ data = [], label }) {
  
  // Helper to format currency
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // --- LOGIC GENERATORS ---

  const getDonationStats = () => {
    const totalAmount = data.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const receivedAmount = data
      .filter(d => d.status === 'received')
      .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const pendingCount = data.filter(d => d.status === 'pending').length;

    return [
      {
        title: "Total Pledged",
        value: formatMoney(totalAmount),
        icon: <DollarSign size={24} className="text-blue-600" />,
        color: "border-blue-500",
        bg: "bg-blue-100"
      },
      {
        title: "Amount Received",
        value: formatMoney(receivedAmount),
        icon: <CheckCircle size={24} className="text-green-600" />,
        color: "border-green-500",
        bg: "bg-green-100"
      },
      {
        title: "Pending Actions",
        value: pendingCount,
        icon: <Clock size={24} className="text-yellow-600" />,
        color: "border-yellow-500",
        bg: "bg-yellow-100"
      }
    ];
  };

  const getVolunteerStats = () => {
    const newApps = data.filter(v => v.status === 'new').length;
    const onboarded = data.filter(v => v.status === 'onboarded').length;

    return [
      {
        title: "Total Applicants",
        value: data.length,
        icon: <Users size={24} className="text-purple-600" />,
        color: "border-purple-500",
        bg: "bg-purple-100"
      },
      {
        title: "New / Pending",
        value: newApps,
        icon: <AlertCircle size={24} className="text-orange-600" />,
        color: "border-orange-500",
        bg: "bg-orange-100"
      },
      {
        title: "Successfully Onboarded",
        value: onboarded,
        icon: <CheckCircle size={24} className="text-green-600" />,
        color: "border-green-500",
        bg: "bg-green-100"
      }
    ];
  };

  const getEventStats = () => {
    const upcoming = data.filter(e => e.is_upcoming).length;
    const past = data.length - upcoming;

    return [
      {
        title: "Total Events",
        value: data.length,
        icon: <Calendar size={24} className="text-blue-600" />,
        color: "border-blue-500",
        bg: "bg-blue-100"
      },
      {
        title: "Upcoming",
        value: upcoming,
        icon: <TrendingUp size={24} className="text-green-600" />,
        color: "border-green-500",
        bg: "bg-green-100"
      },
      {
        title: "Completed / Past",
        value: past,
        icon: <Archive size={24} className="text-gray-600" />,
        color: "border-gray-500",
        bg: "bg-gray-100"
      }
    ];
  };

  const getGenericStats = () => {
    const activeCount = data.filter(
      (item) => item.is_active || item.status === "active"
    ).length;

    return [
      {
        title: `Total ${label}`,
        value: data.length,
        icon: <Users size={24} className="text-indigo-600" />, // Generic Icon
        color: "border-indigo-500",
        bg: "bg-indigo-100"
      },
      {
        title: "Active / Published",
        value: activeCount,
        icon: <CheckCircle size={24} className="text-green-600" />,
        color: "border-green-500",
        bg: "bg-green-100"
      },
      {
        title: "Inactive / Drafts",
        value: data.length - activeCount,
        icon: <Archive size={24} className="text-gray-600" />,
        color: "border-gray-500",
        bg: "bg-gray-100"
      }
    ];
  };

  // --- RENDERER ---

  let statsToRender = [];

  // Normalize label to lowercase for switching
  const sectionKey = label?.toLowerCase() || "";

  if (sectionKey.includes("pledge") || sectionKey.includes("donation")) {
    statsToRender = getDonationStats();
  } else if (sectionKey.includes("volunteer")) {
    statsToRender = getVolunteerStats();
  } else if (sectionKey.includes("event")) {
    statsToRender = getEventStats();
  } else {
    statsToRender = getGenericStats();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {statsToRender.map((stat, index) => (
        <div 
          key={index}
          className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border-l-4 ${stat.color}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">
                {stat.title}
              </p>
              <p className="text-3xl font-black text-gray-900 mt-2">
                {stat.value}
              </p>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}