import {
  ChartBarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function DashboardStats({ stats }) {
  const statItems = [
    {
      name: "Total Employees",
      value: stats.totalEmployees,
      icon: UserGroupIcon,
    },
    {
      name: "Active Trainings",
      value: stats.activeTrainings,
      icon: AcademicCapIcon,
    },
    {
      name: "Completed Trainings",
      value: stats.completedTrainings,
      icon: CheckCircleIcon,
    },
    {
      name: "Compliance Rate",
      value: `${stats.complianceRate}%`,
      icon: ChartBarIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <div key={item.name} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <item.icon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{item.name}</p>
              <p className="text-2xl font-semibold text-gray-900">
                {item.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
